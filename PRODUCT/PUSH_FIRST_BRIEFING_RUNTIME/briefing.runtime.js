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
      root: EXPECTED_ROOT,
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
  if (!text) return null;
  var re = /##\s+(DEC-W4-(\d+))\s+[—-]\s+([^\r\n]+)/g;
  var best = null;
  var m;
  while ((m = re.exec(text))) {
    var num = parseInt(m[2], 10);
    if (!best || num > best.num) {
      best = { id: m[1], summary: m[3].trim().replace(/\s+/g, " "), num: num };
    }
  }
  return best;
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
  var latest = parseLatestDecision(textOf("DECISION_LOG"));
  var fixtureMc = textOf("FIXTURE") ? parseFixtureMarketCheck(textOf("FIXTURE")) : { present: false };

  if (batonClass.class === "DIVERGED_NON_ANCESTOR") {
    warnings.push("STALE_BATON_HEAD");
    changes.push(
      claim(
        "FACT",
        "BATON HEAD_AT_GENERATION is not an ancestor of runtime git HEAD (confirmed divergence). Runtime git is HEAD truth.",
        src("BATON") + "; Wings4.0 local git state (this repository only)",
        "HIGH"
      )
    );
  } else if (batonClass.unknown) {
    unknowns.push(batonClass.unknown);
  }

  if (startHereClass.class === "DIVERGED_NON_ANCESTOR") {
    warnings.push("STALE_SESSION_CONTINUE");
    changes.push(
      claim(
        "FACT",
        "START_HERE HEAD_AT_GENERATION is not an ancestor of runtime git HEAD (confirmed divergence). Runtime git is HEAD truth.",
        src("START_HERE") + "; Wings4.0 local git state (this repository only)",
        "HIGH"
      )
    );
  } else if (startHereClass.unknown) {
    unknowns.push(startHereClass.unknown);
  }

  if (fixtureMc.present && fixtureMc.runtime_complete) {
    warnings.push("FIXTURE_HELD_NOT_LIVE");
  }

  var md1 = "CLOSED";
  var startHereText = textOf("START_HERE") || "";
  if (startHereText && /MANAGEMENT_DELIVERY_1_STATUS=CLOSED/.test(startHereText)) {
    md1 = "CLOSED";
  }

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
  } else {
    marketCheckField = "YES bounded Ring0 demo only";
    if (!fixtureMc.runtime_complete) marketCheckField = "UNKNOWN";
  }

  var lastDecision = {
    last_decision_id: latest ? latest.id : "UNKNOWN",
    last_decision_summary: latest ? latest.summary : "UNKNOWN",
    source: src("DECISION_LOG")
  };
  if (!latest) {
    unknowns.push(
      unknownBlock(
        "last_decision_id",
        byId.DECISION_LOG && byId.DECISION_LOG.status !== "OK"
          ? "Decision log missing or unreadable"
          : "No DEC-W4-* heading found in the decision log",
        "Readable PORTFOLIO.DECISION_LOG.md with a DEC-W4-* heading",
        "Supply the decision log or keep UNKNOWN"
      )
    );
  }

  var open = [
    {
      id: "DEC-W4-055",
      status: "DEFERRED",
      why: "WHOAMI/finding_class terminology overlay remains a separate later decision.",
      source: src("DECISION_LOG") + "; " + src("START_HERE"),
      not_this_slice: true
    },
    {
      id: "DEC-W4-075",
      status: "DEFERRED",
      why: "COPY-as-export versus clipboard-only remains a separate workflow decision. COPY lifecycle is unchanged.",
      source: src("DECISION_LOG") + "; " + src("START_HERE"),
      not_this_slice: true
    },
    {
      id: "SESSION_CONTINUE_CANON_REFRESH",
      status: "DEFERRED",
      why: "SESSION_CONTINUE/canon refresh remains separate later work. This S2 slice does not refresh START_HERE or BATON.",
      source: src("START_HERE") + "; " + src("DESIGN"),
      not_this_slice: true
    },
    {
      id: "DEC-W4-077-OPTION-A",
      status: "NOT_SELECTED",
      why: "Second-entity diagnostic (DEC-W4-077 Option A) was not selected.",
      source: src("DECISION_LOG"),
      not_this_slice: true
    },
    {
      id: "S3_AFTER_RECORDED_HUMAN_DECISION",
      status: "UNAUTHORIZED_UNIMPLEMENTED",
      why: "S3 remains unauthorized and unimplemented.",
      source: src("S2_SPEC") + "; " + src("PLANNING"),
      not_this_slice: true
    },
    {
      id: "S4_RING0_PANEL",
      status: "UNAUTHORIZED_UNIMPLEMENTED",
      why: "S4 Ring0 panel remains unauthorized and unimplemented. Page-load auto-run remains forbidden.",
      source: src("S2_SPEC") + "; " + src("PLANNING"),
      not_this_slice: true
    }
  ];

  var projectState = {
    root: EXPECTED_ROOT,
    branch: git.branch,
    head: git.head,
    md1_status: md1,
    market_check_runtime_complete: marketCheckField,
    gap_05: "ACCEPTED_LIMITATION_FOR_RING0",
    briefing_runtime: BRIEFING_RUNTIME_LEVEL
  };

  var recommended = {
    classification: "RECOMMENDATION",
    text: "Keep briefing runtime bounded to ON_DEMAND_TEXT_ONLY / SESSION_OUTPUT_ONLY. Do not implement S3 or S4 without a separate named authorization. Use this briefing as Wings-held decision support only.",
    source: src("S2_SPEC") + "; " + src("PLANNING"),
    confidence: "HIGH",
    fact: claim(
      "FACT",
      "S2 on-demand text session-output runtime is implemented at BRIEFING_RUNTIME=" + BRIEFING_RUNTIME_LEVEL + ".",
      src("S2_SPEC"),
      "HIGH"
    ),
    inference: claim(
      "INFERENCE",
      "Further briefing surfaces (session-start presentation, after-decision refresh, Ring0 panel) would expand beyond this authorized slice.",
      src("PLANNING") + "; " + src("S2_SPEC"),
      "MEDIUM"
    )
  };

  var options = [
    {
      id: "A",
      text: "Accept this on-demand briefing as a Wings-held snapshot and keep S3/S4 unauthorized.",
      executes_mutation: false
    },
    {
      id: "B",
      text: "Defer any further briefing-runtime work and keep UNKNOWN items unknown.",
      executes_mutation: false
    },
    {
      id: "C",
      text: "Request missing governed evidence listed as UNKNOWN; do not read child repositories, AI.History, or the live web to fill gaps.",
      executes_mutation: false
    }
  ];

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
    startHereGeneration: startHereClass
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
  return [
    "- " + c.classification + ": " + c.text,
    "  - source: " + c.source,
    "  - confidence: " + c.confidence
  ].join("\n");
}

function renderMarkdown(model) {
  var lines = [];
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
  lines.push("- FACT: root = `" + model.projectState.root + "`");
  lines.push("  - source: Wings4.0 local git state (this repository only)");
  lines.push("  - confidence: HIGH");
  lines.push("- FACT: branch = `" + model.projectState.branch + "`");
  lines.push("  - source: Wings4.0 local git state (this repository only)");
  lines.push("  - confidence: HIGH");
  lines.push("- FACT: head = `" + model.projectState.head + "`");
  lines.push("  - source: Wings4.0 local git state (this repository only)");
  lines.push("  - confidence: HIGH");
  lines.push("- FACT: md1_status = `" + model.projectState.md1_status + "`");
  lines.push("  - source: `" + ALLOWLIST_BY_ID.START_HERE.rel + "`; `" + ALLOWLIST_BY_ID.DECISION_LOG.rel + "`");
  lines.push("  - confidence: HIGH");
  if (model.projectState.market_check_runtime_complete === "UNKNOWN") {
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
    lines.push("- FACT: market_check_runtime_complete = `" + model.projectState.market_check_runtime_complete + "`");
    lines.push("  - source: `" + ALLOWLIST_BY_ID.FIXTURE.rel + "` (Wings-held fixture; not live child state)");
    lines.push("  - confidence: HIGH");
  }
  lines.push("- FACT: gap_05 = `" + model.projectState.gap_05 + "`");
  lines.push("  - source: `" + ALLOWLIST_BY_ID.DECISION_LOG.rel + "`");
  lines.push("  - confidence: HIGH");
  lines.push("- FACT: briefing_runtime = `" + model.projectState.briefing_runtime + "`");
  lines.push("  - source: `" + ALLOWLIST_BY_ID.S2_SPEC.rel + "`");
  lines.push("  - confidence: HIGH");
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
  }
  lines.push("");

  lines.push("## 3. MATERIAL_CHANGES");
  lines.push("");
  if (!model.changes.length) {
    lines.push("- FACT: " + EMPTY_MATERIAL_CHANGES);
    lines.push("  - source: Wings-held allowlist only; child repositories were not scanned");
    lines.push("  - confidence: HIGH");
  } else {
    model.changes.forEach(function (c) {
      lines.push(renderClaim(c));
    });
  }
  lines.push("");

  lines.push("## 4. OPEN_DECISIONS");
  lines.push("");
  model.open.forEach(function (o) {
    lines.push("- FACT: `" + o.id + "` status=`" + o.status + "`");
    lines.push("  - why: " + o.why);
    lines.push("  - source: " + o.source);
    lines.push("  - not_this_slice: " + (o.not_this_slice ? "YES" : "NO"));
    lines.push("  - confidence: HIGH");
  });
  lines.push("");

  lines.push("## 5. RISKS_AND_BOUNDARIES");
  lines.push("");
  lines.push("- FACT: Ring0 fixture is not live child state (GAP_05 = ACCEPTED_LIMITATION_FOR_RING0).");
  lines.push("  - source: `" + ALLOWLIST_BY_ID.DECISION_LOG.rel + "`; `" + ALLOWLIST_BY_ID.FIXTURE.rel + "`");
  lines.push("  - confidence: HIGH");
  lines.push("- FACT: Market Check bounded complete is not Wings4 complete and is not live market intelligence.");
  lines.push("  - source: `" + ALLOWLIST_BY_ID.DECISION_LOG.rel + "`; `" + ALLOWLIST_BY_ID.FIXTURE.rel + "`");
  lines.push("  - confidence: HIGH");
  lines.push("- FACT: HEAD_AT_GENERATION is historical evidence. Runtime git HEAD is current truth. A different ancestral hash is valid and is not a stale-HEAD warning. " + SEMANTIC_LAG_RULE + " Semantic continuity lag is not inferred from hash inequality.");
  lines.push("  - source: `" + ALLOWLIST_BY_ID.START_HERE.rel + "`; `" + ALLOWLIST_BY_ID.BATON.rel + "`; Wings4.0 local git state (this repository only)");
  lines.push("  - confidence: HIGH");
  lines.push("- FACT: DEC-W4-078 and DEC-W4-079 are design/planning records, not runtime authorization tokens. S2 authorization is Pablo's explicit task `" + AUTHORIZATION_TASK + "`.");
  lines.push("  - source: `" + ALLOWLIST_BY_ID.DECISION_LOG.rel + "`; `" + ALLOWLIST_BY_ID.S2_SPEC.rel + "`");
  lines.push("  - confidence: HIGH");
  lines.push("- FACT: S3 and S4 remain unauthorized and unimplemented.");
  lines.push("  - source: `" + ALLOWLIST_BY_ID.S2_SPEC.rel + "`");
  lines.push("  - confidence: HIGH");
  lines.push("");

  lines.push("## 6. RECOMMENDED_NEXT_ACTION");
  lines.push("");
  lines.push(renderClaim(model.recommended.fact));
  lines.push(renderClaim(model.recommended.inference));
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
    if (u.what !== "last_decision_id") lines.push(renderUnknown(u));
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
  parseLatestDecision: parseLatestDecision
};

module.exports = api;

if (require.main === module) {
  main(process.argv.slice(2));
}
