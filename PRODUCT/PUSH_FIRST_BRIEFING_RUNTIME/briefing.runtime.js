"use strict";

var fs = require("fs");
var path = require("path");
var childProcess = require("child_process");

var EXPECTED_ROOT = "C:\\01. GitHub\\Wings4.0";
var SUPPORTED_TRIGGER = "ON_DEMAND_REQUEST";
var BRIEFING_RUNTIME_LEVEL = "IMPLEMENTED_ON_DEMAND_TEXT_SESSION_OUTPUT_ONLY";
var EMPTY_MATERIAL_CHANGES = "No Wings-held material change recorded";
var AUTHORIZATION_TASK = "20260818.175139_W4_EXECUTOR_IMPLEMENT_BRIEFING_RUNTIME_S2_039";
var SEMANTIC_LAG_RULE =
  "Semantic continuity lag is assessed independently from HEAD divergence; a valid historical ancestor is not stale solely because runtime HEAD is newer.";
var MAX_MATERIAL_COMMITS = 10;

var CANONICAL_SECTIONS = [
  "PROJECT_STATE",
  "SINCE_LAST_DECISION",
  "MATERIAL_CHANGES",
  "OPEN_DECISIONS",
  "RISKS_AND_BOUNDARIES",
  "RECOMMENDED_NEXT_ACTION",
  "HUMAN_DECISION_OPTIONS",
  "EVIDENCE_LIMITS"
];

var ALLOWLIST = [
  { id: "HUMAN", rel: "HUMAN/HUMAN.WINGS4.md", cls: "OPTIONAL" },
  { id: "DECISION_LOG", rel: "PORTFOLIO.DECISION_LOG.md", cls: "OPTIONAL" },
  { id: "PRINCIPLES", rel: "PORTFOLIO.PRINCIPLES.md", cls: "OPTIONAL" },
  { id: "BATON", rel: "00_STATE/BATON.WINGS4.ACTIVE.md", cls: "OPTIONAL" },
  { id: "BACKLOG", rel: "MIGRATION.BACKLOG.md", cls: "OPTIONAL" },
  { id: "DESIGN", rel: "PORTFOLIO.ARCHITECTURE/WINGS4.PUSH_FIRST_BRIEFING.DESIGN.md", cls: "OPTIONAL" },
  { id: "PLANNING", rel: "PORTFOLIO.ARCHITECTURE/WINGS4.P4.PUSH_FIRST_BRIEFING.RUNTIME.PLANNING.md", cls: "OPTIONAL" },
  { id: "S2_SPEC", rel: "PORTFOLIO.ARCHITECTURE/WINGS4.PUSH_FIRST_BRIEFING.RUNTIME.S2.SPEC.md", cls: "OPTIONAL" },
  { id: "START_HERE", rel: "SESSIONS/ORCHESTRATOR/03.SESSION_CONTINUE/00.START_HERE.ORCHESTRATOR.txt", cls: "OPTIONAL" },
  { id: "FIXTURE", rel: "PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/skillsmachine.fixture.json", cls: "OPTIONAL" }
];

var ALLOWLIST_BY_ID = {};
ALLOWLIST.forEach(function (item) {
  ALLOWLIST_BY_ID[item.id] = item;
});

var FORBIDDEN_MARKERS = [
  "AI.History",
  "ai.history",
  "C:\\01. GitHub\\Skills",
  "C:/01. GitHub/Skills"
];

function RuntimeError(message, code, exitCode) {
  var err = new Error(message);
  err.code = code;
  err.exitCode = exitCode;
  return err;
}

function normPath(p) {
  return path.normalize(String(p || "")).replace(/[\\/]+$/, "");
}

function toPosix(p) {
  return String(p || "").replace(/\\/g, "/");
}

function lower(p) {
  return toPosix(p).toLowerCase();
}

function isInsideRoot(root, candidate) {
  var r = lower(normPath(root));
  var c = lower(normPath(candidate));
  return c === r || c.indexOf(r + "/") === 0;
}

function looksForbidden(p) {
  var n = lower(p);
  if (n.indexOf("ai.history") !== -1) return true;
  if (n.indexOf("/01. github/skills") !== -1) return true;
  if (n.indexOf("c:/01. github/skills") === 0) return true;
  return false;
}

function realPathOrResolve(p, realpathFn) {
  try {
    return realpathFn(p);
  } catch (e) {
    return path.resolve(p);
  }
}

function assertContainedPath(root, candidate, realpathFn) {
  if (!root) {
    throw RuntimeError("ROOT_REQUIRED", "ROOT_REQUIRED", 1);
  }
  if (looksForbidden(candidate) || looksForbidden(root)) {
    throw RuntimeError("FORBIDDEN_PATH", "FORBIDDEN_PATH", 2);
  }
  var realRoot = realPathOrResolve(root, realpathFn);
  var realCandidate = realPathOrResolve(candidate, realpathFn);
  if (!isInsideRoot(realRoot, realCandidate)) {
    throw RuntimeError("PATH_ESCAPE", "PATH_ESCAPE", 2);
  }
  if (looksForbidden(realCandidate)) {
    throw RuntimeError("FORBIDDEN_PATH", "FORBIDDEN_PATH", 2);
  }
  return realCandidate;
}

function resolveRepositoryRoot(deps) {
  if (deps && deps.root) return normPath(deps.root);
  return normPath(path.join(__dirname, "..", ".."));
}

function assertExpectedRoot(root, deps) {
  if (deps && deps.allowNonCanonicalRoot) return;
  var realpathFn = (deps && deps.realpath) || fs.realpathSync;
  var realRoot = realPathOrResolve(root, realpathFn);
  if (lower(realRoot) !== lower(EXPECTED_ROOT) && lower(normPath(root)) !== lower(EXPECTED_ROOT)) {
    throw RuntimeError(
      "ROOT_MISMATCH: resolved root is not C:\\01. GitHub\\Wings4.0",
      "ROOT_MISMATCH",
      1
    );
  }
}

function parseCliArgs(argv) {
  var args = argv.slice();
  var trigger = null;
  var i;
  for (i = 0; i < args.length; i += 1) {
    var a = args[i];
    if (a === "--trigger") {
      i += 1;
      if (i >= args.length) {
        throw RuntimeError("MISSING_TRIGGER_VALUE", "MISSING_TRIGGER", 2);
      }
      trigger = args[i];
    } else if (a.indexOf("--trigger=") === 0) {
      trigger = a.slice("--trigger=".length);
    } else if (
      a === "--root" ||
      a.indexOf("--root=") === 0 ||
      a === "--scan" ||
      a.indexOf("--scan=") === 0 ||
      a === "--out" ||
      a.indexOf("--out=") === 0 ||
      a === "--output" ||
      a.indexOf("--output=") === 0 ||
      a === "--path" ||
      a.indexOf("--path=") === 0
    ) {
      throw RuntimeError("ARBITRARY_SCAN_TARGET_REJECTED", "ARBITRARY_SCAN_TARGET", 2);
    } else if (/^[a-z][a-z0-9+.-]*:\/\//i.test(a) || a === "--url" || a.indexOf("--url=") === 0) {
      throw RuntimeError("URL_TARGET_REJECTED", "ARBITRARY_SCAN_TARGET", 2);
    } else {
      throw RuntimeError("UNKNOWN_CLI_ARGUMENT:" + a, "UNKNOWN_CLI_ARGUMENT", 2);
    }
  }
  if (!trigger) {
    throw RuntimeError("MISSING_TRIGGER", "MISSING_TRIGGER", 2);
  }
  if (trigger !== SUPPORTED_TRIGGER) {
    throw RuntimeError("UNSUPPORTED_TRIGGER:" + trigger, "UNSUPPORTED_TRIGGER", 2);
  }
  return { trigger: trigger };
}

function assertTrigger(trigger) {
  if (!trigger) {
    throw RuntimeError("MISSING_TRIGGER", "MISSING_TRIGGER", 2);
  }
  if (trigger !== SUPPORTED_TRIGGER) {
    throw RuntimeError("UNSUPPORTED_TRIGGER:" + trigger, "UNSUPPORTED_TRIGGER", 2);
  }
}

function defaultGitExec(root, gitArgs) {
  return childProcess.execFileSync("git", gitArgs, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true
  });
}

function runGit(root, args, deps) {
  if (deps && typeof deps.gitExecStatus === "function") {
    return deps.gitExecStatus(args);
  }
  try {
    var stdout = (deps && typeof deps.gitExec === "function")
      ? deps.gitExec(args)
      : defaultGitExec(root, args);
    return { exitCode: 0, stdout: String(stdout || "") };
  } catch (e) {
    var status = e && typeof e.status === "number" ? e.status : 128;
    return {
      exitCode: status,
      stdout: String((e && e.stdout) || ""),
      stderr: String((e && e.stderr) || e.message || e)
    };
  }
}

function readGitSnapshot(root, deps) {
  var gitExec = (deps && deps.gitExec) || function (args) {
    return defaultGitExec(root, args);
  };
  try {
    var head = String(gitExec(["rev-parse", "HEAD"]) || "").trim();
    var branch = String(gitExec(["branch", "--show-current"]) || "").trim();
    var porcelain = String(gitExec(["status", "--porcelain=v1"]) || "");
    if (!/^[0-9a-f]{40}$/i.test(head)) {
      throw RuntimeError("GIT_HEAD_UNREADABLE", "GIT_UNREADABLE", 1);
    }
    return {
      root: root,
      branch: branch || "UNKNOWN",
      head: head.toLowerCase(),
      worktree_clean: porcelain.trim() === "",
      index_clean: porcelain.indexOf("\n") === -1 ? porcelain.charAt(0) !== "M" && porcelain.charAt(0) !== "A" && porcelain.charAt(1) !== "M" : porcelain.indexOf("M  ") === -1 && porcelain.indexOf("A  ") === -1,
      source: "Wings4.0 local git state (this repository only)"
    };
  } catch (e) {
    if (e && e.code === "GIT_UNREADABLE") throw e;
    throw RuntimeError("GIT_UNREADABLE:" + (e && e.message ? e.message : e), "GIT_UNREADABLE", 1);
  }
}

function readGovernedFile(root, item, deps) {
  var realpathFn = (deps && deps.realpath) || fs.realpathSync;
  var readFileFn = (deps && deps.readFile) || function (p) {
    return fs.readFileSync(p, "utf8");
  };
  var rel = item.rel;
  if (rel.indexOf("..") !== -1 || path.isAbsolute(rel)) {
    throw RuntimeError("UNSUPPORTED_RELATIVE_PATH", "FORBIDDEN_PATH", 2);
  }
  var candidate = path.join(root, rel.split("/").join(path.sep));
  try {
    assertContainedPath(root, candidate, realpathFn);
  } catch (e) {
    return {
      id: item.id,
      rel: rel,
      status: "UNSUPPORTED",
      unknown: {
        what: item.id + " path",
        why: "Path is forbidden or escapes the repository root",
        required_evidence: "Governed Wings4-local file " + rel,
        bounded_next_action: "Keep UNKNOWN; do not read child roots, AI.History, or the web"
      }
    };
  }
  try {
    var text = readFileFn(candidate);
    if (text == null) {
      throw new Error("empty-read");
    }
    return { id: item.id, rel: rel, status: "OK", text: String(text) };
  } catch (e) {
    if (e && (e.code === "FORBIDDEN_PATH" || e.code === "PATH_ESCAPE")) {
      throw e;
    }
    return {
      id: item.id,
      rel: rel,
      status: "MISSING",
      unknown: {
        what: item.id,
        why: "Optional governed source missing, unreadable, or unparsable: " + rel,
        required_evidence: "Readable file " + rel + " inside C:\\01. GitHub\\Wings4.0",
        bounded_next_action: "Supply the governed file or keep UNKNOWN"
      }
    };
  }
}

function parseHeadAtGeneration(text) {
  if (text == null || String(text).trim() === "") {
    return { status: "MISSING" };
  }
  var m = String(text).match(/HEAD_AT_GENERATION(?![A-Z_])\s*[:=]\s*`?([^\r\n`]*)`?/i);
  if (!m) return { status: "MISSING" };
  var raw = String(m[1] || "").trim();
  if (!raw) return { status: "MISSING" };
  if (!/^[0-9a-f]{40}$/i.test(raw)) {
    return { status: "MALFORMED", raw: raw };
  }
  return { status: "VALID_40_HEX", hash: raw.toLowerCase() };
}

function inspectCommitObject(hash, root, deps) {
  var result = runGit(root, ["cat-file", "-t", hash], deps);
  if (result.exitCode !== 0) {
    return { status: "UNKNOWN", reason: "NOT_A_COMMIT_OBJECT" };
  }
  var kind = String(result.stdout || "").trim();
  if (kind === "commit") return { status: "COMMIT" };
  return { status: "UNKNOWN", reason: "NOT_A_COMMIT_OBJECT" };
}

function inspectAncestry(generationHead, runtimeHead, root, deps) {
  var result = runGit(root, ["merge-base", "--is-ancestor", generationHead, runtimeHead], deps);
  if (result.exitCode === 0) return { status: "ANCESTOR" };
  if (result.exitCode === 1) return { status: "NON_ANCESTOR" };
  return { status: "UNKNOWN", reason: "ANCESTRY_CHECK_FAILED" };
}

function classifyGenerationHead(parsed, runtimeHead, label, rel, root, deps) {
  if (!parsed || parsed.status === "MISSING") {
    return {
      class: "UNKNOWN",
      unknown: unknownBlock(
        label + " HEAD_AT_GENERATION",
        "Generation HEAD field is absent",
        "Readable HEAD_AT_GENERATION forty-hex commit in " + rel,
        "Keep UNKNOWN; do not treat absence as HEAD divergence"
      )
    };
  }
  if (parsed.status === "MALFORMED") {
    return {
      class: "UNKNOWN",
      unknown: unknownBlock(
        label + " HEAD_AT_GENERATION",
        "Generation HEAD value is malformed",
        "HEAD_AT_GENERATION as a 40-character hex commit hash in " + rel,
        "Keep UNKNOWN; do not treat a malformed value as HEAD divergence"
      )
    };
  }
  var hash = parsed.hash;
  if (hash === runtimeHead) {
    return { class: "CURRENT", hash: hash };
  }
  var obj = inspectCommitObject(hash, root, deps);
  if (obj.status !== "COMMIT") {
    return {
      class: "UNKNOWN",
      hash: hash,
      unknown: unknownBlock(
        label + " HEAD_AT_GENERATION",
        "Forty-hex value is not a Git commit object in this repository",
        "HEAD_AT_GENERATION that exists as a commit in C:\\01. GitHub\\Wings4.0",
        "Keep UNKNOWN; do not treat a missing object as confirmed divergence"
      )
    };
  }
  var anc = inspectAncestry(hash, runtimeHead, root, deps);
  if (anc.status === "ANCESTOR") {
    return { class: "VALID_HISTORICAL_ANCESTOR", hash: hash };
  }
  if (anc.status === "NON_ANCESTOR") {
    return { class: "DIVERGED_NON_ANCESTOR", hash: hash };
  }
  return {
    class: "UNKNOWN",
    hash: hash,
    unknown: unknownBlock(
      label + " HEAD_AT_GENERATION",
      "Git ancestry check could not be completed",
      "Successful git merge-base --is-ancestor in this repository only",
      "Keep UNKNOWN; do not treat ancestry-check failure as confirmed divergence"
    )
  };
}

function parseLatestDecision(text) {
  var op = parseOperativeDecision(text);
  if (!op || !op.id) return null;
  return { id: op.id, summary: op.summary, num: op.num };
}

function escapeRegExp(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parseKeyedValues(text, key) {
  if (!text) return [];
  var re = new RegExp("(?:^|[\\n\\r])\\s*-?\\s*" + escapeRegExp(key) + "=([^\\r\\n]+)", "g");
  var out = [];
  var m;
  while ((m = re.exec(String(text)))) {
    var raw = String(m[1] || "").trim();
    if (!raw) continue;
    var core = raw.split(";")[0].trim();
    if (core && out.indexOf(core) === -1) out.push(core);
  }
  return out;
}

function firstKeyed(text, key) {
  var vals = parseKeyedValues(text, key);
  return vals.length ? vals[0] : null;
}

function consistentKeyed(aText, bText, key) {
  var a = parseKeyedValues(aText, key);
  var b = parseKeyedValues(bText, key);
  if (!a.length && !b.length) return { status: "MISSING", values: [] };
  if (!a.length) return { status: "ONE", value: b[0], sources: ["B"] };
  if (!b.length) return { status: "ONE", value: a[0], sources: ["A"] };
  if (a.length > 1 || b.length > 1) {
    var all = a.concat(b).filter(function (v, i, arr) { return arr.indexOf(v) === i; });
    if (all.length > 1) return { status: "CONFLICT", values: all, sources: ["A", "B"] };
  }
  if (a[0] === b[0]) return { status: "CONSISTENT", value: a[0], sources: ["A", "B"] };
  return { status: "CONFLICT", values: [a[0], b[0]], sources: ["A", "B"] };
}

function canonicalizeGap05(raw) {
  var s = String(raw || "");
  if (s.indexOf("ACCEPTED_LIMITATION_FOR_RING0") !== -1) return "ACCEPTED_LIMITATION_FOR_RING0";
  if (s.indexOf("FIXTURE_OR_WINGS_HELD_EVIDENCE_NOT_LIVE_CHILD_REPOSITORY_READ") !== -1) {
    return "ACCEPTED_LIMITATION_FOR_RING0";
  }
  return s.split(";")[0].trim();
}

function canonicalizeBriefingLevel(raw) {
  var s = String(raw || "").trim();
  if (s === "ON_DEMAND_TEXT_SESSION_OUTPUT_ONLY" || s === "IMPLEMENTED_ON_DEMAND_TEXT_SESSION_OUTPUT_ONLY" || s === "YES_S2_ONLY") {
    return BRIEFING_RUNTIME_LEVEL;
  }
  return s;
}

function parseDecisionEntries(text) {
  if (!text) return [];
  var re = /^##\s+(DEC-W4-(\d+))\s+[—-]\s+([^\r\n]+)\s*$/gm;
  var marks = [];
  var m;
  while ((m = re.exec(text))) {
    marks.push({
      id: m[1],
      num: parseInt(m[2], 10),
      summary: String(m[3] || "").trim().replace(/\s+/g, " "),
      index: m.index,
      headerEnd: m.index + m[0].length
    });
  }
  return marks.map(function (mark, i) {
    var body = text.slice(mark.headerEnd, i + 1 < marks.length ? marks[i + 1].index : text.length);
    var statusLines = [];
    var smRe = /^\s*Status:\s*(.*)\s*$/gm;
    var sm;
    while ((sm = smRe.exec(body))) {
      var st = String(sm[1] || "").trim();
      if (statusLines.indexOf(st) === -1) statusLines.push(st);
    }
    var status = statusLines.length === 1 ? statusLines[0] : "";
    var statusDrift = statusLines.length !== 1 || !status;
    var hashes = [];
    var cre = /(?:Implementation commit|Correction commit|Runtime HEAD[^\r\n:]{0,80}):\s*`?([0-9a-f]{40})`?/gi;
    var cm;
    while ((cm = cre.exec(body))) {
      var h = cm[1].toLowerCase();
      if (hashes.indexOf(h) === -1) hashes.push(h);
    }
    var historical = false;
    var stU = status.toUpperCase();
    if (stU === "HISTORICAL_NON_OPERATIVE" || stU === "HISTORICAL") historical = true;
    if (/^\s*ENTRY_HISTORICAL_NON_OPERATIVE\s*=\s*YES\s*$/im.test(body)) historical = true;
    return {
      id: mark.id,
      num: mark.num,
      summary: mark.summary,
      status: status,
      statusDrift: statusDrift,
      hashes: hashes,
      historical: historical,
      body: body
    };
  });
}

function parseOperativeDecision(text) {
  var entries = parseDecisionEntries(text);
  var operative = entries.filter(function (e) { return !e.historical && !e.statusDrift; });
  if (!operative.length) return null;
  var best = operative[0];
  operative.forEach(function (e) {
    if (e.num > best.num) best = e;
  });
  return best;
}

function classifyDecisionStatus(status) {
  var u = String(status || "").trim().toUpperCase();
  if (!u) return "UNKNOWN";
  if (u === "OPEN") return "OPEN";
  if (u === "DEFERRED") return "DEFERRED";
  if (u === "NOT_SELECTED" || u === "REJECTED") return "NOT_SELECTED";
  if (u === "SUPERSEDED" || u.indexOf("SUPERSEDED") !== -1) return "SUPERSEDED";
  if (u === "UNAUTHORIZED" || u === "UNAUTHORIZED_UNIMPLEMENTED") return "UNAUTHORIZED";
  if (
    u === "COMPLETED" ||
    u === "CLOSED" ||
    u === "IMPLEMENTED" ||
    u === "CORRECTED" ||
    u === "EVIDENCE_RECORDED" ||
    u === "ACTIVE" ||
    u.indexOf("APPROVED") === 0 ||
    u.indexOf("IMPLEMENTED") === 0
  ) {
    return "COMPLETED";
  }
  return "UNKNOWN";
}

function parseOpenDecisionKeys(text) {
  if (!text) return [];
  var re = /(?:^|[\n\r])\s*-?\s*OPEN_DECISION_([A-Z0-9_]+)=([^\r\n]+)/g;
  var out = [];
  var m;
  while ((m = re.exec(String(text)))) {
    out.push({
      id: "OPEN_DECISION_" + m[1],
      raw: String(m[2] || "").trim()
    });
  }
  return out;
}

function classifyOpenRaw(raw, entries) {
  var u = String(raw || "").trim().toUpperCase().split(";")[0].trim();
  if (u === "OPEN") return "OPEN";
  if (u === "DEFERRED") return "DEFERRED";
  if (u === "NOT_SELECTED") return "NOT_SELECTED";
  if (u === "COMPLETED") return "COMPLETED";
  if (u === "SUPERSEDED") return "SUPERSEDED";
  if (u === "UNAUTHORIZED" || u === "UNAUTHORIZED_UNIMPLEMENTED") return "UNAUTHORIZED";
  if (u === "UNKNOWN") return "UNKNOWN";
  var dm = u.match(/^(DEC-W4-\d+)$/i);
  if (dm && entries && entries.length) {
    var hits = entries.filter(function (e) {
      return e.id.toUpperCase() === dm[1].toUpperCase();
    });
    if (hits.length !== 1) return "UNKNOWN";
    return classifyDecisionStatus(hits[0].status);
  }
  return "UNKNOWN";
}

function isCurrentlyOpenClass(cls) {
  return cls === "OPEN" || cls === "DEFERRED";
}

function materialPathInScope(rel) {
  var p = String(rel || "").replace(/\\/g, "/");
  if (p.indexOf("PRODUCT/PUSH_FIRST_BRIEFING_RUNTIME/") === 0) return true;
  if (p === "PRODUCT/PUSH_FIRST_BRIEFING_RUNTIME") return true;
  var i;
  for (i = 0; i < ALLOWLIST.length; i += 1) {
    if (p === ALLOWLIST[i].rel) return true;
  }
  if (p === "PORTFOLIO.ARCHITECTURE/WINGS4.PUSH_FIRST_BRIEFING.RUNTIME.S2.SPEC.md") return true;
  return false;
}

function materialPathspecs() {
  var paths = ALLOWLIST.map(function (item) { return item.rel; });
  paths.push("PRODUCT/PUSH_FIRST_BRIEFING_RUNTIME");
  paths.push("PORTFOLIO.ARCHITECTURE/WINGS4.PUSH_FIRST_BRIEFING.RUNTIME.S2.SPEC.md");
  return paths;
}

function parseGitLogNameOnly(stdout) {
  var commits = [];
  var current = null;
  String(stdout || "").split(/\r?\n/).forEach(function (line) {
    if (/^[0-9a-f]{40}\t/i.test(line)) {
      if (current) commits.push(current);
      var tab = line.indexOf("\t");
      current = {
        hash: line.slice(0, tab).toLowerCase(),
        subject: line.slice(tab + 1),
        paths: []
      };
      return;
    }
    var trimmed = String(line || "").trim();
    if (!trimmed || !current) return;
    current.paths.push(trimmed.replace(/\\/g, "/"));
  });
  if (current) commits.push(current);
  return commits.filter(function (c) {
    c.paths = c.paths.filter(materialPathInScope);
    return c.paths.length > 0;
  });
}

function readMaterialCommits(root, anchor, head, deps) {
  var args = ["log", "--reverse", "--pretty=format:%H%x09%s", "--name-only", anchor + ".." + head, "--"].concat(materialPathspecs());
  var result = runGit(root, args, deps);
  if (result.exitCode !== 0) {
    return { status: "UNKNOWN", reason: "GIT_LOG_FAILED", commits: [] };
  }
  return { status: "OK", commits: parseGitLogNameOnly(result.stdout) };
}

function validateAnchor(hash, runtimeHead, root, deps) {
  if (!hash || !/^[0-9a-f]{40}$/i.test(hash)) {
    return { status: "MALFORMED", hash: hash || "" };
  }
  var h = hash.toLowerCase();
  var obj = inspectCommitObject(h, root, deps);
  if (obj.status !== "COMMIT") return { status: "NONEXISTENT", hash: h };
  if (h === runtimeHead) return { status: "VALID", hash: h, class: "CURRENT" };
  var anc = inspectAncestry(h, runtimeHead, root, deps);
  if (anc.status === "ANCESTOR") return { status: "VALID", hash: h, class: "VALID_HISTORICAL_ANCESTOR" };
  if (anc.status === "NON_ANCESTOR") return { status: "NON_ANCESTOR", hash: h };
  return { status: "UNVERIFIABLE", hash: h };
}

function parseFixtureMarketCheck(text) {
  try {
    var data = JSON.parse(text);
    var mc = data && data.market_check;
    if (!mc) return { present: false };
    return {
      present: true,
      runtime_complete: mc.runtime_complete === true,
      mode: mc.mode || null
    };
  } catch (e) {
    return { present: false, unparsable: true };
  }
}

function unknownBlock(what, why, required, next) {
  return {
    classification: "UNKNOWN",
    what: what,
    why: why,
    required_evidence: required,
    bounded_next_action: next
  };
}

function claim(classification, text, source, confidence) {
  return {
    classification: classification,
    text: text,
    source: source,
    confidence: confidence || "HIGH"
  };
}

function assemble(git, sources, deps) {
  var warnings = [];
  var unknowns = [];
  var changes = [];
  var byId = {};
  sources.forEach(function (s) {
    byId[s.id] = s;
    if (s.status !== "OK" && s.unknown) unknowns.push(s.unknown);
  });

  function src(id) {
    var item = ALLOWLIST_BY_ID[id];
    var got = byId[id];
    if (got && got.status === "OK") return "`" + item.rel + "`";
    return "`" + (item ? item.rel : id) + "`";
  }

  function textOf(id) {
    return byId[id] && byId[id].status === "OK" ? byId[id].text : null;
  }

  var root = (deps && deps.root) || git.root || EXPECTED_ROOT;
  var batonClass = classifyGenerationHead(
    parseHeadAtGeneration(textOf("BATON")),
    git.head,
    "BATON",
    ALLOWLIST_BY_ID.BATON.rel,
    root,
    deps
  );
  var startHereClass = classifyGenerationHead(
    parseHeadAtGeneration(textOf("START_HERE")),
    git.head,
    "START_HERE",
    ALLOWLIST_BY_ID.START_HERE.rel,
    root,
    deps
  );
  var latest = parseOperativeDecision(textOf("DECISION_LOG"));
  var decisionEntries = parseDecisionEntries(textOf("DECISION_LOG") || "");
  var fixtureMc = textOf("FIXTURE") ? parseFixtureMarketCheck(textOf("FIXTURE")) : { present: false };
  var startHereText = textOf("START_HERE") || "";
  var batonText = textOf("BATON") || "";

  if (batonClass.class === "DIVERGED_NON_ANCESTOR") {
    warnings.push("STALE_BATON_HEAD");
  } else if (batonClass.unknown) {
    unknowns.push(batonClass.unknown);
  }

  if (startHereClass.class === "DIVERGED_NON_ANCESTOR") {
    warnings.push("STALE_SESSION_CONTINUE");
  } else if (startHereClass.unknown) {
    unknowns.push(startHereClass.unknown);
  }

  if (fixtureMc.present && fixtureMc.runtime_complete) {
    warnings.push("FIXTURE_HELD_NOT_LIVE");
  }

  function citePair(ids) {
    return ids.map(function (id) { return src(id); }).join("; ");
  }

  function keyedState(key, canonicalize) {
    var result = consistentKeyed(startHereText, batonText, key);
    var canon = function (v) { return canonicalize ? canonicalize(v) : v; };
    if (result.status === "MISSING") {
      return { status: "MISSING" };
    }
    if (result.status === "CONFLICT") {
      var left = result.values.map(canon).filter(function (v, i, arr) { return arr.indexOf(v) === i; });
      if (left.length === 1) {
        return { status: "CONSISTENT", value: left[0], source: citePair(["START_HERE", "BATON"]) };
      }
      return {
        status: "CONFLICT",
        values: result.values,
        source: citePair(["START_HERE", "BATON"])
      };
    }
    var srcIds = result.sources.map(function (tag) { return tag === "A" ? "START_HERE" : "BATON"; });
    return { status: "OK", value: canon(result.value), source: citePair(srcIds) };
  }

  var md1State = keyedState("MANAGEMENT_DELIVERY_1_STATUS");
  var gapState = keyedState("GAP_05", canonicalizeGap05);
  var briefingLevelState = keyedState("BRIEFING_RUNTIME_IMPLEMENTATION_LEVEL", canonicalizeBriefingLevel);
  if (briefingLevelState.status === "MISSING") {
    briefingLevelState = keyedState("BRIEFING_RUNTIME_IMPLEMENTED", canonicalizeBriefingLevel);
  }
  var s3Auth = keyedState("S3_AUTHORIZED");
  var s3Impl = keyedState("S3_IMPLEMENTED");
  var s4Auth = keyedState("S4_AUTHORIZED");
  var s4Impl = keyedState("S4_IMPLEMENTED");
  var nextAction = keyedState("NEXT_PRODUCT_ACTION");

  var marketCheckField = "UNKNOWN";
  if (fixtureMc.present && fixtureMc.runtime_complete) {
    marketCheckField = "YES bounded Ring0 demo only";
  } else if (byId.FIXTURE && byId.FIXTURE.status !== "OK") {
    unknowns.push(
      unknownBlock(
        "market_check_runtime_complete",
        "Ring0 fixture missing or unreadable",
        "Readable PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/skillsmachine.fixture.json",
        "Keep UNKNOWN; do not scan live markets or child repositories"
      )
    );
  } else if (fixtureMc.unparsable) {
    unknowns.push(
      unknownBlock(
        "market_check_runtime_complete",
        "Ring0 fixture unparsable",
        "Parsable Wings-held fixture JSON",
        "Keep UNKNOWN"
      )
    );
  } else if (!fixtureMc.present) {
    unknowns.push(
      unknownBlock(
        "market_check_runtime_complete",
        "Fixture has no market_check record",
        "Wings-held market_check.runtime_complete in the Ring0 fixture",
        "Keep UNKNOWN; do not treat absence as live market intelligence"
      )
    );
  } else if (!fixtureMc.runtime_complete) {
    marketCheckField = "UNKNOWN";
    unknowns.push(
      unknownBlock(
        "market_check_runtime_complete",
        "Fixture market_check.runtime_complete is not true",
        "Wings-held market_check.runtime_complete=true in the Ring0 fixture",
        "Keep UNKNOWN; do not scan live markets"
      )
    );
  }

  function pushKeyedUnknown(what, state, required) {
    if (state.status === "MISSING") {
      unknowns.push(unknownBlock(what, "Explicit KEY=" + what + " is absent from START_HERE and BATON", required, "Keep UNKNOWN; do not assume a silent default"));
    } else if (state.status === "CONFLICT") {
      unknowns.push(unknownBlock(what, "Conflicting explicit values in START_HERE and BATON: " + (state.values || []).join(" | "), required, "Resolve the KEY=VALUE conflict; do not silently choose a winner"));
    }
  }

  pushKeyedUnknown("md1_status", md1State, "MANAGEMENT_DELIVERY_1_STATUS in START_HERE and/or BATON");
  pushKeyedUnknown("gap_05", gapState, "GAP_05 KEY=VALUE in START_HERE and/or BATON");
  pushKeyedUnknown("briefing_runtime", briefingLevelState, "BRIEFING_RUNTIME_IMPLEMENTATION_LEVEL in START_HERE and/or BATON");
  pushKeyedUnknown("S3_AUTHORIZED", s3Auth, "S3_AUTHORIZED KEY=VALUE in START_HERE and/or BATON");
  pushKeyedUnknown("S3_IMPLEMENTED", s3Impl, "S3_IMPLEMENTED KEY=VALUE in START_HERE and/or BATON");
  pushKeyedUnknown("S4_AUTHORIZED", s4Auth, "S4_AUTHORIZED KEY=VALUE in START_HERE and/or BATON");
  pushKeyedUnknown("S4_IMPLEMENTED", s4Impl, "S4_IMPLEMENTED KEY=VALUE in START_HERE and/or BATON");

  var lastDecision = {
    last_decision_id: latest ? latest.id : "UNKNOWN",
    last_decision_summary: latest ? latest.summary : "UNKNOWN",
    last_decision_status: latest && latest.status ? latest.status : "UNKNOWN",
    last_decision_anchor: "UNKNOWN",
    anchorValidation: null,
    source: src("DECISION_LOG")
  };
  if (!latest) {
    var driftWhy = decisionEntries.some(function (e) { return e.statusDrift; })
      ? "Latest DEC-W4 heading has missing or conflicting Status fields"
      : byId.DECISION_LOG && byId.DECISION_LOG.status !== "OK"
        ? "Decision log missing or unreadable"
        : "No operative DEC-W4-* heading found in the decision log";
    unknowns.push(
      unknownBlock(
        "last_decision_id",
        driftWhy,
        "Readable PORTFOLIO.DECISION_LOG.md with an operative DEC-W4-* heading and exactly one Status line",
        "Supply the decision log or keep UNKNOWN"
      )
    );
  }

  var anchorValidation = null;
  if (latest) {
    if (!latest.hashes.length) {
      unknowns.push(
        unknownBlock(
          "last_decision_anchor",
          "Operative decision " + latest.id + " has no Implementation commit, Correction commit, or Runtime HEAD forty-hex field",
          "Structured commit field on " + latest.id + " in PORTFOLIO.DECISION_LOG.md",
          "Keep UNKNOWN; do not emit empty MATERIAL_CHANGES"
        )
      );
    } else if (latest.hashes.length > 1) {
      unknowns.push(
        unknownBlock(
          "last_decision_anchor",
          "Operative decision " + latest.id + " has ambiguous commit fields: " + latest.hashes.join(", "),
          "Exactly one unique forty-hex Implementation/Correction/Runtime HEAD commit on " + latest.id,
          "Keep UNKNOWN; do not emit empty MATERIAL_CHANGES"
        )
      );
    } else {
      anchorValidation = validateAnchor(latest.hashes[0], git.head, root, deps);
      lastDecision.anchorValidation = anchorValidation;
      if (anchorValidation.status === "VALID") {
        lastDecision.last_decision_anchor = anchorValidation.hash;
      } else {
        unknowns.push(
          unknownBlock(
            "last_decision_anchor",
            "Decision anchor " + latest.hashes[0] + " failed validation: " + anchorValidation.status,
            "Forty-hex commit object that is an ancestor of runtime HEAD",
            "Keep UNKNOWN; do not emit empty MATERIAL_CHANGES"
          )
        );
      }
    }
  }

  var materialUnknown = false;
  if (!anchorValidation || anchorValidation.status !== "VALID") {
    materialUnknown = true;
  } else {
    var logResult = readMaterialCommits(root, anchorValidation.hash, git.head, deps);
    if (logResult.status !== "OK") {
      materialUnknown = true;
      unknowns.push(
        unknownBlock(
          "material_changes",
          "Git log of " + anchorValidation.hash + ".." + git.head + " failed",
          "Successful this-repository git log over governed paths",
          "Keep UNKNOWN; do not emit empty MATERIAL_CHANGES"
        )
      );
    } else {
      var total = logResult.commits.length;
      var shown = logResult.commits.slice(0, MAX_MATERIAL_COMMITS);
      shown.forEach(function (c) {
        changes.push(
          claim(
            "FACT",
            "material_commit `" + c.hash + "` " + c.subject + " paths=" + c.paths.map(function (p) { return "`" + p + "`"; }).join(", "),
            "Wings4.0 local git log " + anchorValidation.hash + ".." + git.head + " (this repository only); anchor from " + src("DECISION_LOG"),
            "HIGH"
          )
        );
      });
      if (total > MAX_MATERIAL_COMMITS) {
        unknowns.push(
          unknownBlock(
            "material_changes_truncated",
            "Displayed " + shown.length + " of " + total + " relevant commits after the decision anchor",
            "Full git log " + anchorValidation.hash + ".." + git.head + " over governed paths",
            "Review omitted remainder from Git; do not scan child repositories"
          )
        );
      }
    }
  }
  if (materialUnknown && !unknowns.some(function (u) { return u.what.indexOf("material") === 0 || u.what === "last_decision_anchor"; })) {
    unknowns.push(
      unknownBlock(
        "material_changes",
        "No valid operative-decision anchor is available",
        "Structured forty-hex Implementation/Correction commit on the latest operative DEC-W4 entry",
        "Keep UNKNOWN; do not emit empty MATERIAL_CHANGES"
      )
    );
  }

  var open = [];
  var openKeys = parseOpenDecisionKeys(startHereText).concat(parseOpenDecisionKeys(batonText));
  var openById = {};
  openKeys.forEach(function (k) {
    var cls = classifyOpenRaw(k.raw, decisionEntries);
    if (!openById[k.id]) openById[k.id] = [];
    openById[k.id].push(cls);
  });
  var openIds = Object.keys(openById);
  if (!openIds.length) {
    unknowns.push(
      unknownBlock(
        "open_decisions",
        "No explicit OPEN_DECISION_* KEY=VALUE contract in START_HERE or BATON",
        "OPEN_DECISION_* keys in START_HERE and/or BATON",
        "Keep UNKNOWN; do not infer a catalog from narrative prose"
      )
    );
  } else {
    openIds.forEach(function (id) {
      var classes = openById[id].filter(function (v, i, arr) { return arr.indexOf(v) === i; });
      if (classes.length !== 1) {
        unknowns.push(
          unknownBlock(
            id,
            "Conflicting OPEN_DECISION classifications: " + classes.join(" | "),
            "Consistent " + id + " KEY=VALUE in START_HERE and BATON",
            "Keep UNKNOWN; do not silently choose a winner"
          )
        );
        return;
      }
      var cls = classes[0];
      if (!isCurrentlyOpenClass(cls)) return;
      open.push({
        id: id,
        status: cls,
        why: "Explicit OPEN_DECISION_* contract classifies this item as " + cls + ".",
        source: citePair(["START_HERE", "BATON"]),
        not_this_slice: true
      });
    });
  }

  var projectState = {
    root: git.root || root,
    branch: git.branch,
    head: git.head,
    md1_status: md1State.status === "OK" || md1State.status === "CONSISTENT" ? md1State.value : "UNKNOWN",
    md1_source: md1State.source || "",
    market_check_runtime_complete: marketCheckField,
    gap_05: gapState.status === "OK" || gapState.status === "CONSISTENT" ? gapState.value : "UNKNOWN",
    gap_05_source: gapState.source || "",
    briefing_runtime: briefingLevelState.status === "OK" || briefingLevelState.status === "CONSISTENT" ? briefingLevelState.value : "UNKNOWN",
    briefing_runtime_source: briefingLevelState.source || "",
    s3_authorized: s3Auth.status === "OK" || s3Auth.status === "CONSISTENT" ? s3Auth.value : "UNKNOWN",
    s3_authorized_source: s3Auth.source || "",
    s3_implemented: s3Impl.status === "OK" || s3Impl.status === "CONSISTENT" ? s3Impl.value : "UNKNOWN",
    s3_implemented_source: s3Impl.source || "",
    s4_authorized: s4Auth.status === "OK" || s4Auth.status === "CONSISTENT" ? s4Auth.value : "UNKNOWN",
    s4_authorized_source: s4Auth.source || "",
    s4_implemented: s4Impl.status === "OK" || s4Impl.status === "CONSISTENT" ? s4Impl.value : "UNKNOWN",
    s4_implemented_source: s4Impl.source || ""
  };

  var recommended;
  if (nextAction.status === "OK" || nextAction.status === "CONSISTENT") {
    recommended = {
      classification: "RECOMMENDATION",
      text: "Follow governed NEXT_PRODUCT_ACTION=`" + nextAction.value + "`. S3 and S4 remain unauthorized unless explicit governed evidence says otherwise.",
      source: nextAction.source,
      confidence: "HIGH",
      fact: claim("FACT", "NEXT_PRODUCT_ACTION=`" + nextAction.value + "`", nextAction.source, "HIGH"),
      inference: claim(
        "INFERENCE",
        "This next action is explicit START_HERE/BATON state. It is not S3 or S4 authorization.",
        nextAction.source,
        "MEDIUM"
      )
    };
  } else if (nextAction.status === "CONFLICT") {
    unknowns.push(
      unknownBlock(
        "NEXT_PRODUCT_ACTION",
        "Conflicting NEXT_PRODUCT_ACTION values: " + (nextAction.values || []).join(" | "),
        "Consistent NEXT_PRODUCT_ACTION in START_HERE and BATON",
        "Keep UNKNOWN; do not silently choose a winner"
      )
    );
    recommended = {
      classification: "RECOMMENDATION",
      text: "Do not invent a next product action while NEXT_PRODUCT_ACTION conflicts. Do not implement S3 or S4.",
      source: nextAction.source,
      confidence: "HIGH",
      fact: null,
      inference: claim(
        "INFERENCE",
        "Conflicting NEXT_PRODUCT_ACTION values do not authorize S3 or S4.",
        nextAction.source,
        "MEDIUM"
      ),
      unknown: true
    };
  } else {
    unknowns.push(
      unknownBlock(
        "NEXT_PRODUCT_ACTION",
        "NEXT_PRODUCT_ACTION is absent from START_HERE and BATON",
        "NEXT_PRODUCT_ACTION KEY=VALUE in START_HERE and/or BATON",
        "Keep UNKNOWN; do not hardcode a next action"
      )
    );
    recommended = {
      classification: "RECOMMENDATION",
      text: "Do not invent a next product action. Do not implement S3 or S4 unless explicit governed evidence says otherwise.",
      source: "no NEXT_PRODUCT_ACTION KEY=VALUE parsed",
      confidence: "HIGH",
      fact: null,
      inference: claim(
        "INFERENCE",
        "Missing NEXT_PRODUCT_ACTION does not authorize S3 or S4.",
        "no NEXT_PRODUCT_ACTION KEY=VALUE parsed",
        "MEDIUM"
      ),
      unknown: true
    };
  }

  var derivationGap = unknowns.length > 0 || materialUnknown || projectState.md1_status === "UNKNOWN" || projectState.gap_05 === "UNKNOWN";
  var options = [
    {
      id: "ACCEPT_DERIVED_SNAPSHOT",
      text: "Accept this derived on-demand briefing as a Wings-held snapshot. Keep S3/S4 unauthorized.",
      executes_mutation: false
    }
  ];
  if (derivationGap) {
    options.push({
      id: "REJECT_FOR_DERIVATION_GAP",
      text: "Reject this briefing because governed current-state evidence is incomplete or contradictory, and request a bounded S2 derivation follow-up. Do not implement S3 or S4.",
      executes_mutation: false
    });
    options.push({
      id: "SUPPLY_GOVERNED_EVIDENCE",
      text: "Supply missing explicit KEY=VALUE evidence listed as UNKNOWN; do not read child repositories, AI.History, or the live web.",
      executes_mutation: false
    });
  } else {
    options.push({
      id: "NO_FURTHER_RUNTIME_CHANGE",
      text: "Make no further briefing-runtime change. Keep S3/S4 unauthorized.",
      executes_mutation: false
    });
  }

  return {
    projectState: projectState,
    lastDecision: lastDecision,
    changes: changes,
    open: open,
    recommended: recommended,
    options: options,
    warnings: warnings,
    unknowns: unknowns,
    git: git,
    batonGeneration: batonClass,
    startHereGeneration: startHereClass,
    materialUnknown: materialUnknown,
    nextActionStatus: nextAction.status
  };
}

function renderUnknown(u) {
  return [
    "- UNKNOWN: " + u.what,
    "  - why: " + u.why,
    "  - required_evidence: " + u.required_evidence,
    "  - bounded_next_action: " + u.bounded_next_action
  ].join("\n");
}

function renderClaim(c) {
  if (!c) return "";
  return [
    "- " + c.classification + ": " + c.text,
    "  - source: " + c.source,
    "  - confidence: " + c.confidence
  ].join("\n");
}

function renderStateField(lines, unknowns, what, label, value, source) {
  if (value === "UNKNOWN") {
    var u = unknowns.filter(function (item) {
      return item.what === what;
    })[0];
    if (u) lines.push(renderUnknown(u));
    else {
      lines.push(
        renderUnknown(
          unknownBlock(
            what,
            "Governed " + label + " is not evidenced",
            "Explicit KEY=VALUE for " + label,
            "Keep UNKNOWN; do not assume a silent default"
          )
        )
      );
    }
    return;
  }
  lines.push("- FACT: " + label + " = `" + value + "`");
  lines.push("  - source: " + (source || "governed KEY=VALUE"));
  lines.push("  - confidence: HIGH");
}

function renderMarkdown(model) {
  var lines = [];
  var ps = model.projectState;
  lines.push("# Wings4 Push-First Briefing");
  lines.push("");
  lines.push("Trigger: `" + SUPPORTED_TRIGGER + "`");
  lines.push("BRIEFING_RUNTIME=`" + BRIEFING_RUNTIME_LEVEL + "`");
  lines.push("Authorization: Pablo explicit S2 implementation authorization (`" + AUTHORIZATION_TASK + "`). DEC-W4-078 is not runtime authorization. DEC-W4-079 is not runtime authorization.");
  lines.push("Classification: FACT, INFERENCE, RECOMMENDATION, and UNKNOWN remain distinct.");
  lines.push("Cambridge C1 coaching is Pablo-specific collaboration context and is not briefing product doctrine.");
  lines.push("");

  lines.push("## 1. PROJECT_STATE");
  lines.push("");
  lines.push("- FACT: root = `" + ps.root + "`");
  lines.push("  - source: Wings4.0 local git state (this repository only)");
  lines.push("  - confidence: HIGH");
  lines.push("- FACT: branch = `" + ps.branch + "`");
  lines.push("  - source: Wings4.0 local git state (this repository only)");
  lines.push("  - confidence: HIGH");
  lines.push("- FACT: head = `" + ps.head + "`");
  lines.push("  - source: Wings4.0 local git state (this repository only)");
  lines.push("  - confidence: HIGH");
  renderStateField(lines, model.unknowns, "md1_status", "md1_status", ps.md1_status, ps.md1_source);
  if (ps.market_check_runtime_complete === "UNKNOWN") {
    var uMc = model.unknowns.filter(function (u) {
      return u.what === "market_check_runtime_complete";
    })[0];
    if (uMc) {
      lines.push(renderUnknown(uMc));
    } else {
      lines.push(
        renderUnknown(
          unknownBlock(
            "market_check_runtime_complete",
            "Wings-held Market Check complete flag is not evidenced",
            "Readable Ring0 fixture market_check.runtime_complete",
            "Keep UNKNOWN; do not scan live markets"
          )
        )
      );
    }
  } else {
    lines.push("- FACT: market_check_runtime_complete = `" + ps.market_check_runtime_complete + "`");
    lines.push("  - source: `" + ALLOWLIST_BY_ID.FIXTURE.rel + "` (Wings-held fixture; not live child state)");
    lines.push("  - confidence: HIGH");
  }
  renderStateField(lines, model.unknowns, "gap_05", "gap_05", ps.gap_05, ps.gap_05_source);
  renderStateField(lines, model.unknowns, "briefing_runtime", "briefing_runtime", ps.briefing_runtime, ps.briefing_runtime_source);
  renderStateField(lines, model.unknowns, "S3_AUTHORIZED", "s3_authorized", ps.s3_authorized, ps.s3_authorized_source);
  renderStateField(lines, model.unknowns, "S3_IMPLEMENTED", "s3_implemented", ps.s3_implemented, ps.s3_implemented_source);
  renderStateField(lines, model.unknowns, "S4_AUTHORIZED", "s4_authorized", ps.s4_authorized, ps.s4_authorized_source);
  renderStateField(lines, model.unknowns, "S4_IMPLEMENTED", "s4_implemented", ps.s4_implemented, ps.s4_implemented_source);
  lines.push("");

  lines.push("## 2. SINCE_LAST_DECISION");
  lines.push("");
  if (model.lastDecision.last_decision_id === "UNKNOWN") {
    var uLast = model.unknowns.filter(function (u) {
      return u.what === "last_decision_id";
    })[0];
    if (uLast) lines.push(renderUnknown(uLast));
    else {
      lines.push(
        renderUnknown(
          unknownBlock(
            "last_decision_id",
            "Latest DEC-W4-* could not be read",
            "Readable PORTFOLIO.DECISION_LOG.md",
            "Keep UNKNOWN"
          )
        )
      );
    }
  } else {
    lines.push("- FACT: last_decision_id = `" + model.lastDecision.last_decision_id + "`");
    lines.push("  - source: " + model.lastDecision.source);
    lines.push("  - confidence: HIGH");
    lines.push("- FACT: last_decision_summary = " + model.lastDecision.last_decision_summary);
    lines.push("  - source: " + model.lastDecision.source);
    lines.push("  - confidence: HIGH");
    lines.push("- FACT: last_decision_status = `" + model.lastDecision.last_decision_status + "`");
    lines.push("  - source: " + model.lastDecision.source);
    lines.push("  - confidence: HIGH");
    if (model.lastDecision.last_decision_anchor === "UNKNOWN") {
      var uAnchor = model.unknowns.filter(function (u) {
        return u.what === "last_decision_anchor";
      })[0];
      if (uAnchor) lines.push(renderUnknown(uAnchor));
    } else {
      lines.push("- FACT: last_decision_anchor = `" + model.lastDecision.last_decision_anchor + "`");
      lines.push("  - source: " + model.lastDecision.source + "; Wings4.0 local git state (this repository only)");
      lines.push("  - confidence: HIGH");
    }
  }
  lines.push("");

  lines.push("## 3. MATERIAL_CHANGES");
  lines.push("");
  if (model.materialUnknown) {
    var uMat = model.unknowns.filter(function (u) {
      return u.what === "material_changes" || u.what === "last_decision_anchor";
    })[0];
    if (uMat) lines.push(renderUnknown(uMat));
    else {
      lines.push(
        renderUnknown(
          unknownBlock(
            "material_changes",
            "No valid operative-decision anchor is available",
            "Structured forty-hex Implementation/Correction commit on the latest operative DEC-W4 entry",
            "Keep UNKNOWN; do not emit empty MATERIAL_CHANGES"
          )
        )
      );
    }
  } else if (!model.changes.length) {
    lines.push("- FACT: " + EMPTY_MATERIAL_CHANGES);
    lines.push("  - source: Wings4.0 local git log of the verified decision-anchor range over governed paths (this repository only)");
    lines.push("  - confidence: HIGH");
  } else {
    model.changes.forEach(function (c) {
      lines.push(renderClaim(c));
    });
    var uTrunc = model.unknowns.filter(function (u) {
      return u.what === "material_changes_truncated";
    })[0];
    if (uTrunc) lines.push(renderUnknown(uTrunc));
  }
  lines.push("");

  lines.push("## 4. OPEN_DECISIONS");
  lines.push("");
  if (!model.open.length) {
    var uOpen = model.unknowns.filter(function (u) {
      return u.what === "open_decisions";
    })[0];
    if (uOpen) lines.push(renderUnknown(uOpen));
    else {
      lines.push(
        renderUnknown(
          unknownBlock(
            "open_decisions",
            "No currently open OPEN_DECISION_* items",
            "OPEN_DECISION_* keys in START_HERE and/or BATON",
            "Keep UNKNOWN; do not infer a catalog from narrative prose"
          )
        )
      );
    }
  } else {
    model.open.forEach(function (o) {
      lines.push("- FACT: `" + o.id + "` status=`" + o.status + "`");
      lines.push("  - why: " + o.why);
      lines.push("  - source: " + o.source);
      lines.push("  - not_this_slice: " + (o.not_this_slice ? "YES" : "NO"));
      lines.push("  - confidence: HIGH");
    });
  }
  lines.push("");

  lines.push("## 5. RISKS_AND_BOUNDARIES");
  lines.push("");
  lines.push("- FACT: Ring0 fixture is not live child state (GAP_05 current value = `" + ps.gap_05 + "`).");
  lines.push("  - source: " + (ps.gap_05_source || ("`" + ALLOWLIST_BY_ID.FIXTURE.rel + "`")) + "; `" + ALLOWLIST_BY_ID.FIXTURE.rel + "`");
  lines.push("  - confidence: HIGH");
  lines.push("- FACT: Market Check bounded complete is not Wings4 complete and is not live market intelligence.");
  lines.push("  - source: `" + ALLOWLIST_BY_ID.FIXTURE.rel + "`");
  lines.push("  - confidence: HIGH");
  lines.push("- FACT: HEAD_AT_GENERATION is historical evidence. Runtime git HEAD is current truth. A different ancestral hash is valid and is not a stale-HEAD warning. " + SEMANTIC_LAG_RULE + " Semantic continuity lag is not inferred from hash inequality.");
  lines.push("  - source: `" + ALLOWLIST_BY_ID.START_HERE.rel + "`; `" + ALLOWLIST_BY_ID.BATON.rel + "`; Wings4.0 local git state (this repository only)");
  lines.push("  - confidence: HIGH");
  lines.push("- FACT: DEC-W4-078 and DEC-W4-079 are design/planning records, not runtime authorization tokens. S2 authorization is Pablo's explicit task `" + AUTHORIZATION_TASK + "`.");
  lines.push("  - source: `" + ALLOWLIST_BY_ID.S2_SPEC.rel + "`");
  lines.push("  - confidence: HIGH");
  lines.push("- FACT: S3 authorized=`" + ps.s3_authorized + "` implemented=`" + ps.s3_implemented + "`; S4 authorized=`" + ps.s4_authorized + "` implemented=`" + ps.s4_implemented + "`. This S2 slice does not authorize S3 or S4.");
  var s3s4unique = [];
  [ps.s3_authorized_source, ps.s3_implemented_source, ps.s4_authorized_source, ps.s4_implemented_source].forEach(function (part) {
    String(part || "").split("; ").forEach(function (bit) {
      var t = String(bit || "").trim();
      if (t && s3s4unique.indexOf(t) === -1) s3s4unique.push(t);
    });
  });
  lines.push("  - source: " + (s3s4unique.length ? s3s4unique.join("; ") : "S2 specification durable unauthorized boundary"));
  lines.push("  - confidence: HIGH");
  lines.push("");

  lines.push("## 6. RECOMMENDED_NEXT_ACTION");
  lines.push("");
  if (model.recommended.unknown) {
    var uNext = model.unknowns.filter(function (u) {
      return u.what === "NEXT_PRODUCT_ACTION";
    })[0];
    if (uNext) lines.push(renderUnknown(uNext));
  } else if (model.recommended.fact) {
    lines.push(renderClaim(model.recommended.fact));
  }
  if (model.recommended.inference) lines.push(renderClaim(model.recommended.inference));
  lines.push(renderClaim(model.recommended));
  lines.push("");

  lines.push("## 7. HUMAN_DECISION_OPTIONS");
  lines.push("");
  lines.push("The briefing recommends; it does not decide. Selecting an option does not mutate product code, child projects, or COPY lifecycle.");
  model.options.forEach(function (o) {
    lines.push("- OPTION_" + o.id + ": " + o.text);
    lines.push("  - executes_mutation: NO");
  });
  lines.push("");

  lines.push("## 8. EVIDENCE_LIMITS");
  lines.push("");
  lines.push("- NOT_MARKET_MONITORING");
  lines.push("- NOT_RADAR");
  lines.push("- NOT_LIVE_WEB");
  lines.push("- NO_CHILD_REPOSITORY_READ");
  lines.push("- NO_CHILD_PROJECT_MUTATION");
  lines.push("- GAP_05_ACCEPTED_LIMITATION_FOR_RING0");
  lines.push("- BRIEFING_RUNTIME=" + BRIEFING_RUNTIME_LEVEL);
  lines.push("- S3_AUTHORIZED=NO");
  lines.push("- S3_IMPLEMENTED=NO");
  lines.push("- S4_AUTHORIZED=NO");
  lines.push("- S4_IMPLEMENTED=NO");
  lines.push("- WINGS4_COMPLETE=NO");
  lines.push("- PRODUCTION_COMPLETE=NO");
  lines.push("- This briefing is **not MARKET_MONITORING**.");
  lines.push("- This briefing is **not RADAR**.");
  lines.push("- This briefing is **not live web monitoring** and does **not** search the web.");
  lines.push("- This briefing does **not** read or mutate child repositories.");
  lines.push("- Evidence is Wings-held only. GAP_05 remains an accepted Ring0 limitation: fixture/Wings-held is not live child-repository intelligence.");
  lines.push("- HEAD_AT_GENERATION is historical evidence; runtime Git HEAD is current truth.");
  lines.push("- A different ancestral hash is valid. Only a confirmed non-ancestor produces STALE_BATON_HEAD or STALE_SESSION_CONTINUE.");
  lines.push("- " + SEMANTIC_LAG_RULE);
  lines.push("- Semantic continuity lag is not inferred from hash inequality.");
  if (model.warnings.indexOf("STALE_BATON_HEAD") !== -1) {
    lines.push("- STALE_BATON_HEAD: BATON HEAD_AT_GENERATION is not an ancestor of runtime git HEAD.");
  }
  if (model.warnings.indexOf("STALE_SESSION_CONTINUE") !== -1) {
    lines.push("- STALE_SESSION_CONTINUE: START_HERE HEAD_AT_GENERATION is not an ancestor of runtime git HEAD.");
  }
  if (model.warnings.indexOf("FIXTURE_HELD_NOT_LIVE") !== -1) {
    lines.push("- FIXTURE_HELD_NOT_LIVE: Market Check complete flag is Wings-held fixture state, not live market or live child intelligence.");
  }
  lines.push("- NOT_LIVE_CHILD_STATE applies to any claim that would require a child repository.");
  lines.push("- NOT_LIVE_MARKET applies to any claim that would require live web or market scan.");
  model.unknowns.forEach(function (u) {
    if (u.what === "last_decision_id") return;
    lines.push(renderUnknown(u));
  });
  lines.push("");
  return lines.join("\n");
}

function runBriefing(input) {
  var opts = input || {};
  var deps = opts.deps || {};
  assertTrigger(opts.trigger);
  var root = resolveRepositoryRoot(deps);
  assertExpectedRoot(root, deps);
  var realpathFn = deps.realpath || fs.realpathSync;
  assertContainedPath(root, root, realpathFn);
  var git = readGitSnapshot(root, deps);
  var sources = ALLOWLIST.map(function (item) {
    return readGovernedFile(root, item, deps);
  });
  var model = assemble(git, sources, deps);
  var markdown = renderMarkdown(model);
  return {
    markdown: markdown,
    model: model,
    exitCode: 0
  };
}

function main(argv) {
  try {
    var parsed = parseCliArgs(argv);
    var result = runBriefing({ trigger: parsed.trigger });
    process.stdout.write(result.markdown);
    if (result.markdown.charAt(result.markdown.length - 1) !== "\n") {
      process.stdout.write("\n");
    }
    process.exitCode = 0;
  } catch (e) {
    var code = e && e.exitCode ? e.exitCode : 1;
    process.stderr.write(String(e && e.message ? e.message : e) + "\n");
    process.exit(code);
  }
}

var api = {
  EXPECTED_ROOT: EXPECTED_ROOT,
  SUPPORTED_TRIGGER: SUPPORTED_TRIGGER,
  BRIEFING_RUNTIME_LEVEL: BRIEFING_RUNTIME_LEVEL,
  EMPTY_MATERIAL_CHANGES: EMPTY_MATERIAL_CHANGES,
  SEMANTIC_LAG_RULE: SEMANTIC_LAG_RULE,
  MAX_MATERIAL_COMMITS: MAX_MATERIAL_COMMITS,
  CANONICAL_SECTIONS: CANONICAL_SECTIONS,
  ALLOWLIST: ALLOWLIST,
  FORBIDDEN_MARKERS: FORBIDDEN_MARKERS,
  parseCliArgs: parseCliArgs,
  runBriefing: runBriefing,
  renderMarkdown: renderMarkdown,
  assertContainedPath: assertContainedPath,
  looksForbidden: looksForbidden,
  isInsideRoot: isInsideRoot,
  parseHeadAtGeneration: parseHeadAtGeneration,
  classifyGenerationHead: classifyGenerationHead,
  inspectCommitObject: inspectCommitObject,
  inspectAncestry: inspectAncestry,
  parseLatestDecision: parseLatestDecision,
  parseOperativeDecision: parseOperativeDecision,
  parseDecisionEntries: parseDecisionEntries,
  parseKeyedValues: parseKeyedValues,
  consistentKeyed: consistentKeyed,
  classifyOpenRaw: classifyOpenRaw,
  parseOpenDecisionKeys: parseOpenDecisionKeys,
  parseGitLogNameOnly: parseGitLogNameOnly,
  validateAnchor: validateAnchor
};

module.exports = api;

if (require.main === module) {
  main(process.argv.slice(2));
}
