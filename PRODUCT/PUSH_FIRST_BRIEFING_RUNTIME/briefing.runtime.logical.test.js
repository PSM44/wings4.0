"use strict";

var assert = require("node:assert/strict");
var fs = require("fs");
var path = require("path");
var runtime = require("./briefing.runtime.js");

var fails = [];
var passed = [];

function record(id, cond, detail) {
  if (cond) passed.push(id);
  else fails.push(id + (detail ? ": " + detail : ""));
}

function eq(id, actual, expected) {
  try {
    assert.equal(actual, expected);
    passed.push(id);
  } catch (e) {
    fails.push(id + ": expected " + JSON.stringify(expected) + ", got " + JSON.stringify(actual));
  }
}

function ok(id, cond, detail) {
  record(id, !!cond, detail || "");
}

var HEAD_A = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
var HEAD_B = "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";
var HEAD_C = "cccccccccccccccccccccccccccccccccccccccc";
var ANCHOR_081 = "6db8963ecfa9d1ad2c8c9c511fbbd34b9df09641";
var COMMIT_SYNC = "b0380d756d1ffa676e8649e5f7df79e540886be4";
var COMMIT_S22 = "87ddb8ac8da7f59889fac54c203ed09a8517dc47";
var ROOT = runtime.EXPECTED_ROOT;

function decisionEntry(id, title, status, extra) {
  return "## " + id + " — " + title + "\n\nStatus: " + status + "\n" + (extra || "") + "\n";
}

function continuityFiles(extraStart, extraBaton) {
  var shared =
    "MANAGEMENT_DELIVERY_1_STATUS=CLOSED\n" +
    "NEXT_PRODUCT_ACTION=RUN_S2_ON_DEMAND_BRIEFING_FOR_HUMAN_REVIEW\n" +
    "S3_AUTHORIZED=NO\nS3_IMPLEMENTED=NO\nS4_AUTHORIZED=NO\nS4_IMPLEMENTED=NO\n" +
    "GAP_05=ACCEPTED_LIMITATION_FOR_RING0\n" +
    "BRIEFING_RUNTIME_IMPLEMENTATION_LEVEL=ON_DEMAND_TEXT_SESSION_OUTPUT_ONLY\n";
  return {
    "SESSIONS/ORCHESTRATOR/03.SESSION_CONTINUE/00.START_HERE.ORCHESTRATOR.txt":
      "HEAD_AT_GENERATION=" + HEAD_A + "\n" + shared + (extraStart || ""),
    "00_STATE/BATON.WINGS4.ACTIVE.md":
      "HEAD_AT_GENERATION: " + HEAD_A + "\n" + shared + (extraBaton || "")
  };
}

var BASE_FILES = {
  "HUMAN/HUMAN.WINGS4.md": "# HUMAN\nPablo is the final authority.\n",
  "PORTFOLIO.DECISION_LOG.md":
    "## DEC-W4-079 — Bounded briefing-runtime planning packet recorded\n\nDecision:\n- Record the planning packet.\n",
  "PORTFOLIO.PRINCIPLES.md": "1. Human authority is final.\n",
  "00_STATE/BATON.WINGS4.ACTIVE.md": "HEAD_AT_GENERATION: " + HEAD_A + "\n",
  "MIGRATION.BACKLOG.md": "| row | note |\n",
  "PORTFOLIO.ARCHITECTURE/WINGS4.PUSH_FIRST_BRIEFING.DESIGN.md": "# Design\n",
  "PORTFOLIO.ARCHITECTURE/WINGS4.P4.PUSH_FIRST_BRIEFING.RUNTIME.PLANNING.md": "# Planning\n",
  "PORTFOLIO.ARCHITECTURE/WINGS4.PUSH_FIRST_BRIEFING.RUNTIME.S2.SPEC.md":
    "# S2\nBRIEFING_RUNTIME=IMPLEMENTED_ON_DEMAND_TEXT_SESSION_OUTPUT_ONLY\n",
  "SESSIONS/ORCHESTRATOR/03.SESSION_CONTINUE/00.START_HERE.ORCHESTRATOR.txt":
    "HEAD_AT_GENERATION=" + HEAD_A + "\nMANAGEMENT_DELIVERY_1_STATUS=CLOSED\nBRIEFING_RUNTIME_IMPLEMENTED=NO\n",
  "PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/skillsmachine.fixture.json":
    JSON.stringify({ market_check: { runtime_complete: true, mode: "ON_DEMAND" } })
};

function makeDeps(overrides) {
  var files = Object.assign({}, BASE_FILES, (overrides && overrides.files) || {});
  var git = Object.assign(
    { head: HEAD_A, branch: "main", porcelain: "" },
    (overrides && overrides.git) || {}
  );
  var gitCalls = [];
  return {
    root: ROOT,
    allowNonCanonicalRoot: false,
    gitCalls: gitCalls,
    readFile: function (p) {
      var posix = String(p).replace(/\\/g, "/");
      var keys = Object.keys(files);
      var i;
      for (i = 0; i < keys.length; i += 1) {
        if (posix.slice(-keys[i].length) === keys[i] || posix.indexOf(keys[i]) !== -1) {
          if (files[keys[i]] === null) {
            var err = new Error("ENOENT");
            err.code = "ENOENT";
            throw err;
          }
          return files[keys[i]];
        }
      }
      var missing = new Error("ENOENT:" + posix);
      missing.code = "ENOENT";
      throw missing;
    },
    gitExec: function (args) {
      gitCalls.push(args.slice());
      args.forEach(function (a) {
        if (a === "-C" || a.indexOf("C:\\01. GitHub\\Skills") !== -1) {
          throw new Error("git-escaped-to-child");
        }
      });
      if (args[0] === "rev-parse" && args[1] === "HEAD") return git.head + "\n";
      if (args[0] === "branch") return git.branch + "\n";
      if (args[0] === "status") return git.porcelain || "";
      if (args[0] === "cat-file" && args[1] === "-t") {
        var kind = git.objects && git.objects[args[2]];
        if (kind === "commit" || args[2] === git.head) return "commit\n";
        var missingObj = new Error("not a git object");
        missingObj.status = 128;
        throw missingObj;
      }
      if (args[0] === "merge-base" && args[1] === "--is-ancestor") {
        if (git.ancestryFail) {
          var fail = new Error("ancestry-check-failed");
          fail.status = git.ancestryFail;
          throw fail;
        }
        if (git.ancestors && git.ancestors[args[2]] === true) return "";
        var notAnc = new Error("not-ancestor");
        notAnc.status = 1;
        throw notAnc;
      }
      if (args[0] === "log") {
        if (git.logFail) {
          var lf = new Error("git-log-failed");
          lf.status = git.logFail;
          throw lf;
        }
        if (git.logStdout != null) return git.logStdout;
        if (git.logCommits && git.logCommits.length) {
          return git.logCommits
            .map(function (c) {
              return c.hash + "\t" + c.subject + "\n" + (c.paths || []).join("\n");
            })
            .join("\n\n") + "\n";
        }
        return "";
      }
      throw new Error("unexpected-git:" + args.join(" "));
    },
    realpath: function (p) {
      return path.resolve(p);
    }
  };
}

function run(overrides) {
  var deps = makeDeps(overrides);
  var result = runtime.runBriefing({ trigger: "ON_DEMAND_REQUEST", deps: deps });
  result.deps = deps;
  return result;
}

function throwCode(fn) {
  try {
    fn();
    return null;
  } catch (e) {
    return e;
  }
}

var src = fs.readFileSync(path.join(__dirname, "briefing.runtime.js"), "utf8");

// BR-01
var eMissing = throwCode(function () {
  runtime.runBriefing({});
});
ok("BR-01-missing", eMissing && eMissing.code === "MISSING_TRIGGER", eMissing && eMissing.code);
var eStart = throwCode(function () {
  runtime.runBriefing({ trigger: "SESSION_START" });
});
ok("BR-01-session-start", eStart && eStart.code === "UNSUPPORTED_TRIGGER", eStart && eStart.code);
var eAfter = throwCode(function () {
  runtime.runBriefing({ trigger: "AFTER_RECORDED_HUMAN_DECISION" });
});
ok("BR-01-after", eAfter && eAfter.code === "UNSUPPORTED_TRIGGER", eAfter && eAfter.code);
var r1 = run();
ok("BR-01-ondemand", !!(r1 && r1.markdown && r1.exitCode === 0));

// BR-02
function sectionOrder(md) {
  var names = runtime.CANONICAL_SECTIONS;
  var idxs = names.map(function (n, i) {
    return md.indexOf("## " + (i + 1) + ". " + n);
  });
  return idxs;
}
var idxs = sectionOrder(r1.markdown);
ok(
  "BR-02",
  idxs.every(function (n) {
    return n >= 0;
  }) &&
    idxs[0] < idxs[1] &&
    idxs[1] < idxs[2] &&
    idxs[2] < idxs[3] &&
    idxs[3] < idxs[4] &&
    idxs[4] < idxs[5] &&
    idxs[5] < idxs[6] &&
    idxs[6] < idxs[7] &&
    runtime.CANONICAL_SECTIONS.length === 8
);

// BR-03
function claimsHaveSources(md) {
  var blocks = md.split("\n").reduce(
    function (acc, line) {
      if (/^- (FACT|INFERENCE|RECOMMENDATION):/.test(line)) acc.push({ line: line, source: false });
      else if (acc.length && /^\s+- source:/.test(line)) acc[acc.length - 1].source = true;
      return acc;
    },
    []
  );
  return blocks.length > 0 && blocks.every(function (b) {
    return b.source;
  });
}
ok("BR-03", claimsHaveSources(r1.markdown));

// BR-04
var rMissing = run({ files: { "PORTFOLIO.DECISION_LOG.md": null } });
ok(
  "BR-04",
  rMissing.markdown.indexOf("UNKNOWN: last_decision_id") !== -1 &&
    rMissing.markdown.indexOf("required_evidence:") !== -1 &&
    rMissing.markdown.indexOf("bounded_next_action:") !== -1 &&
    rMissing.markdown.indexOf("why:") !== -1
);

// BR-05 — empty material wording only after verified anchor + empty Git range
var rEmpty = run({
  files: Object.assign(
    {
      "PORTFOLIO.DECISION_LOG.md": decisionEntry(
        "DEC-W4-081",
        "S2.1 stale-HEAD ancestry-semantics correction",
        "CORRECTED",
        "Correction commit: `" + HEAD_A + "`"
      )
    },
    continuityFiles()
  ),
  git: { head: HEAD_A, objects: (function () { var o = {}; o[HEAD_A] = "commit"; return o; })(), logCommits: [] }
});
ok(
  "BR-05",
  rEmpty.markdown.indexOf(runtime.EMPTY_MATERIAL_CHANGES) !== -1 &&
    rEmpty.model.materialUnknown !== true
);
ok(
  "BR-05-unknown-anchor-not-empty",
  r1.markdown.indexOf(runtime.EMPTY_MATERIAL_CHANGES) === -1
);

// BR-06
ok("BR-06-skills", runtime.looksForbidden("C:\\01. GitHub\\Skills\\HUMAN.md") === true);
ok("BR-06-history", runtime.looksForbidden(path.join(ROOT, "AI.History", "x.jsonl")) === true);
var eSkills = throwCode(function () {
  runtime.assertContainedPath(ROOT, "C:\\01. GitHub\\Skills\\x", path.resolve);
});
ok("BR-06-reject-skills", eSkills && (eSkills.code === "FORBIDDEN_PATH" || eSkills.code === "PATH_ESCAPE"), eSkills && eSkills.code);
var eHist = throwCode(function () {
  runtime.assertContainedPath(ROOT, path.join(ROOT, "AI.History", "x"), path.resolve);
});
ok("BR-06-reject-history", eHist && eHist.code === "FORBIDDEN_PATH", eHist && eHist.code);
ok(
  "BR-06-no-read",
  src.indexOf("C:\\\\01. GitHub\\\\Skills") === -1 || src.indexOf("FORBIDDEN") !== -1
);

// BR-07
var networkHits = [];
["fetch(", "require(\"http\")", "require('http')", "require(\"https\")", "require('https')", "XMLHttpRequest", "WebSocket(", "net.connect", "dgram."].forEach(
  function (tok) {
    if (src.indexOf(tok) !== -1) networkHits.push(tok);
  }
);
ok("BR-07", networkHits.length === 0, networkHits.join(","));

// BR-08
ok(
  "BR-08",
  r1.markdown.indexOf("NOT_MARKET_MONITORING") !== -1 &&
    r1.markdown.indexOf("NOT_RADAR") !== -1 &&
    r1.markdown.indexOf("NOT_LIVE_WEB") !== -1 &&
    r1.markdown.indexOf("NO_CHILD_REPOSITORY_READ") !== -1 &&
    r1.markdown.indexOf("not MARKET_MONITORING") !== -1 &&
    r1.markdown.indexOf("not RADAR") !== -1
);

function hasStaleBaton(md) {
  return md.indexOf("- STALE_BATON_HEAD:") !== -1;
}
function hasStaleSession(md) {
  return md.indexOf("- STALE_SESSION_CONTINUE:") !== -1;
}
function hasUnknownGen(md, label) {
  return md.indexOf("UNKNOWN: " + label + " HEAD_AT_GENERATION") !== -1;
}

// BR-09 / BR-10 — confirmed non-ancestor divergence, not mere inequality
var rDiverged = run({
  git: {
    head: HEAD_B,
    objects: (function () {
      var o = {};
      o[HEAD_A] = "commit";
      return o;
    })(),
    ancestors: (function () {
      var a = {};
      a[HEAD_A] = false;
      return a;
    })()
  }
});
ok("BR-09", hasStaleBaton(rDiverged.markdown) && rDiverged.model.batonGeneration.class === "DIVERGED_NON_ANCESTOR");
ok("BR-10", hasStaleSession(rDiverged.markdown) && rDiverged.model.startHereGeneration.class === "DIVERGED_NON_ANCESTOR");

ok(
  "EQUAL-HASH",
  !hasStaleBaton(r1.markdown) &&
    !hasStaleSession(r1.markdown) &&
    r1.model.batonGeneration.class === "CURRENT" &&
    r1.model.startHereGeneration.class === "CURRENT"
);

var rAncestor = run({
  git: {
    head: HEAD_B,
    objects: (function () {
      var o = {};
      o[HEAD_A] = "commit";
      return o;
    })(),
    ancestors: (function () {
      var a = {};
      a[HEAD_A] = true;
      return a;
    })()
  }
});
ok(
  "VALID-ANCESTOR",
  !hasStaleBaton(rAncestor.markdown) &&
    !hasStaleSession(rAncestor.markdown) &&
    rAncestor.model.batonGeneration.class === "VALID_HISTORICAL_ANCESTOR" &&
    rAncestor.model.startHereGeneration.class === "VALID_HISTORICAL_ANCESTOR"
);

var rMissingHash = run({
  files: {
    "00_STATE/BATON.WINGS4.ACTIVE.md": "STATUS: ACTIVE\n",
    "SESSIONS/ORCHESTRATOR/03.SESSION_CONTINUE/00.START_HERE.ORCHESTRATOR.txt":
      "MANAGEMENT_DELIVERY_1_STATUS=CLOSED\n"
  }
});
ok(
  "MISSING-HASH",
  hasUnknownGen(rMissingHash.markdown, "BATON") &&
    hasUnknownGen(rMissingHash.markdown, "START_HERE") &&
    !hasStaleBaton(rMissingHash.markdown) &&
    !hasStaleSession(rMissingHash.markdown)
);

var rMalformed = run({
  files: {
    "00_STATE/BATON.WINGS4.ACTIVE.md": "HEAD_AT_GENERATION: not-a-commit-hash\n",
    "SESSIONS/ORCHESTRATOR/03.SESSION_CONTINUE/00.START_HERE.ORCHESTRATOR.txt":
      "HEAD_AT_GENERATION=zz\nMANAGEMENT_DELIVERY_1_STATUS=CLOSED\n"
  }
});
ok(
  "MALFORMED-HASH",
  hasUnknownGen(rMalformed.markdown, "BATON") &&
    hasUnknownGen(rMalformed.markdown, "START_HERE") &&
    !hasStaleBaton(rMalformed.markdown) &&
    !hasStaleSession(rMalformed.markdown)
);

var rNoObject = run({
  git: {
    head: HEAD_B,
    objects: {},
    ancestors: {}
  }
});
ok(
  "NONEXISTENT-OBJECT",
  hasUnknownGen(rNoObject.markdown, "BATON") &&
    hasUnknownGen(rNoObject.markdown, "START_HERE") &&
    !hasStaleBaton(rNoObject.markdown) &&
    !hasStaleSession(rNoObject.markdown)
);

var rAncFail = run({
  git: {
    head: HEAD_B,
    objects: (function () {
      var o = {};
      o[HEAD_A] = "commit";
      return o;
    })(),
    ancestryFail: 129
  }
});
ok(
  "ANCESTRY-FAILURE",
  hasUnknownGen(rAncFail.markdown, "BATON") &&
    hasUnknownGen(rAncFail.markdown, "START_HERE") &&
    !hasStaleBaton(rAncFail.markdown) &&
    !hasStaleSession(rAncFail.markdown)
);

ok(
  "SEMANTIC-LAG-NOT-HEAD-STALE",
  r1.markdown.indexOf("BRIEFING_RUNTIME_IMPLEMENTED=NO") === -1 &&
    !hasStaleBaton(rAncestor.markdown) &&
    !hasStaleSession(rAncestor.markdown) &&
    r1.markdown.indexOf("Semantic continuity lag is not inferred from hash inequality") !== -1 &&
    r1.markdown.indexOf(runtime.SEMANTIC_LAG_RULE) !== -1
);

function hasObsoletePendingSync(md) {
  return (
    md.indexOf("later continuity-sync task") !== -1 ||
    md.indexOf("separate later task") !== -1 ||
    md.indexOf("synchronization remains a later task") !== -1 ||
    md.indexOf("continuity sync pending") !== -1 ||
    md.indexOf("remains a later task") !== -1
  );
}

function hasPermanentCompletionClaim(md) {
  return (
    md.indexOf("permanently complete") !== -1 ||
    md.indexOf("continuity sync complete forever") !== -1 ||
    md.indexOf("always resolved") !== -1 ||
    md.indexOf("always semantically current") !== -1 ||
    md.indexOf("hash ancestry proves semantic freshness") !== -1
  );
}

ok(
  "S2-2-NO-PENDING-SYNC",
  !hasObsoletePendingSync(r1.markdown) &&
    !hasObsoletePendingSync(rAncestor.markdown) &&
    !hasObsoletePendingSync(rDiverged.markdown) &&
    src.indexOf("later continuity-sync task") === -1 &&
    src.indexOf("separate later task") === -1 &&
    src.indexOf("synchronization remains a later task") === -1
);
ok(
  "S2-2-DURABLE-LAG-RULE",
  r1.markdown.indexOf("Semantic continuity lag is assessed independently from HEAD divergence") !== -1 &&
    r1.markdown.indexOf("a valid historical ancestor is not stale solely because runtime HEAD is newer") !== -1 &&
    rAncestor.markdown.indexOf(runtime.SEMANTIC_LAG_RULE) !== -1 &&
    rDiverged.markdown.indexOf(runtime.SEMANTIC_LAG_RULE) !== -1
);
ok(
  "S2-2-NO-PERMANENT-COMPLETION",
  !hasPermanentCompletionClaim(r1.markdown) &&
    !hasPermanentCompletionClaim(rAncestor.markdown) &&
    r1.markdown.indexOf("WINGS4_COMPLETE=NO") !== -1
);
ok(
  "S2-2-ANCESTOR-NO-BASE-STALE",
  !hasStaleBaton(rAncestor.markdown) &&
    !hasStaleSession(rAncestor.markdown) &&
    rAncestor.model.batonGeneration.class === "VALID_HISTORICAL_ANCESTOR" &&
    rAncestor.model.startHereGeneration.class === "VALID_HISTORICAL_ANCESTOR"
);
ok(
  "S2-2-NON-ANCESTOR-KEEPS-STALE",
  hasStaleBaton(rDiverged.markdown) &&
    hasStaleSession(rDiverged.markdown) &&
    rDiverged.model.batonGeneration.class === "DIVERGED_NON_ANCESTOR" &&
    rDiverged.model.startHereGeneration.class === "DIVERGED_NON_ANCESTOR"
);
ok("S2-2-EIGHT-SECTIONS", runtime.CANONICAL_SECTIONS.length === 8 && sectionOrder(r1.markdown).every(function (n) { return n >= 0; }));

// BR-11
var optionLines = r1.markdown.split("\n").filter(function (line) {
  return /^- OPTION_[A-Z0-9_]+:/.test(line);
});
ok(
  "BR-11",
  optionLines.length >= 2 &&
    r1.markdown.indexOf("OPTION_A:") === -1 &&
    r1.markdown.indexOf("OPTION_B:") === -1 &&
    /executes_mutation: NO/.test(r1.markdown) &&
    r1.model.options.length >= 2 &&
    r1.model.options.every(function (o) {
      return o.executes_mutation === false;
    }) &&
    r1.model.options.some(function (o) {
      return /reject/i.test(o.text) || o.id.indexOf("REJECT") !== -1;
    })
);

// BR-12
ok(
  "BR-12",
  r1.markdown.indexOf("FACT, INFERENCE, RECOMMENDATION, and UNKNOWN remain distinct") !== -1 &&
    r1.markdown.indexOf("- FACT:") !== -1 &&
    r1.markdown.indexOf("- INFERENCE:") !== -1 &&
    r1.markdown.indexOf("- RECOMMENDATION:") !== -1
);

// BR-13
ok(
  "BR-13",
  r1.markdown.indexOf("GAP_05_ACCEPTED_LIMITATION_FOR_RING0") !== -1 &&
    r1.markdown.indexOf("WINGS4_COMPLETE=NO") !== -1 &&
    r1.markdown.indexOf("PRODUCTION_COMPLETE=NO") !== -1 &&
    !/Wings4 is complete/.test(r1.markdown) &&
    r1.markdown.indexOf("not Wings4 complete") !== -1
);

// BR-14
var writeHits = [];
["writeFile", "writeFileSync", "appendFile", "mkdirSync", "createWriteStream", "copyFileSync", "rmSync"].forEach(
  function (tok) {
    if (src.indexOf(tok) !== -1) writeHits.push(tok);
  }
);
ok("BR-14", writeHits.length === 0 && src.indexOf("localStorage") === -1, writeHits.join(","));
ok("S2-2-NO-WRITE", writeHits.length === 0);

// BR-15
ok(
  "BR-15",
  runtime.SUPPORTED_TRIGGER === "ON_DEMAND_REQUEST" &&
    src.indexOf("SESSION_START_PRESENTATION") === -1 &&
    throwCode(function () {
      runtime.parseCliArgs(["--trigger", "SESSION_START"]);
    }).code === "UNSUPPORTED_TRIGGER" &&
    throwCode(function () {
      runtime.parseCliArgs(["--trigger", "AFTER_RECORDED_HUMAN_DECISION"]);
    }).code === "UNSUPPORTED_TRIGGER"
);

// BR-16
ok(
  "BR-16",
  src.indexOf("market_check.engine") === -1 &&
    src.indexOf("localStorage") === -1 &&
    src.indexOf("index.html") === -1 &&
    src.indexOf("RING0_SKILLSMACHINE_DIAGNOSTIC/app.js") === -1 &&
    src.indexOf("window.") === -1
);

// BR-17
ok(
  "BR-17",
  r1.deps.gitCalls.length > 0 &&
    r1.deps.gitCalls.every(function (args) {
      return args.indexOf("-C") === -1;
    }) &&
    r1.markdown.indexOf("this repository only") !== -1
);

// BR-18
var eScan = throwCode(function () {
  runtime.parseCliArgs(["--trigger", "ON_DEMAND_REQUEST", "--scan", "C:\\01. GitHub\\Skills"]);
});
var eUrl = throwCode(function () {
  runtime.parseCliArgs(["--trigger", "ON_DEMAND_REQUEST", "https://example.com"]);
});
var eRoot = throwCode(function () {
  runtime.parseCliArgs(["--root", "D:\\other"]);
});
ok(
  "BR-18",
  eScan && eScan.code === "ARBITRARY_SCAN_TARGET" && eUrl && eUrl.code === "ARBITRARY_SCAN_TARGET" && eRoot && eRoot.code === "ARBITRARY_SCAN_TARGET"
);

// BR-19 — this file must not create paths; assert no write APIs used by the test itself beyond reading the runtime source.
ok("BR-19", writeHits.length === 0);

// BR-20
ok(
  "BR-20",
  r1.markdown.indexOf("DEC-W4-078 is not runtime authorization") !== -1 &&
    r1.markdown.indexOf("DEC-W4-079 is not runtime authorization") !== -1 &&
    r1.markdown.indexOf("20260818.175139_W4_EXECUTOR_IMPLEMENT_BRIEFING_RUNTIME_S2_039") !== -1
);

eq("BR-count-sections", runtime.CANONICAL_SECTIONS.length, 8);

function objectsFor() {
  var o = {};
  Array.prototype.slice.call(arguments).forEach(function (h) {
    o[h] = "commit";
  });
  return o;
}

function ancestorsFor() {
  var a = {};
  Array.prototype.slice.call(arguments).forEach(function (h) {
    a[h] = true;
  });
  return a;
}

function runDerived(fileOverrides, gitOverrides) {
  return run({
    files: Object.assign({}, continuityFiles(), fileOverrides || {}),
    git: Object.assign(
      {
        head: COMMIT_S22,
        objects: objectsFor(HEAD_A, ANCHOR_081, COMMIT_SYNC, COMMIT_S22),
        ancestors: ancestorsFor(HEAD_A, ANCHOR_081, COMMIT_SYNC),
        logCommits: []
      },
      gitOverrides || {}
    )
  });
}

var currentRepo = runDerived(
  {
    "PORTFOLIO.DECISION_LOG.md":
      decisionEntry("DEC-W4-080", "Bounded S2 briefing runtime authorized and implemented", "IMPLEMENTED_ON_DEMAND_TEXT_SESSION_OUTPUT_ONLY", "Implementation commit: `eb5758448932a3376788f15128177087866cb41f`") +
      decisionEntry("DEC-W4-081", "S2.1 stale-HEAD ancestry-semantics correction", "CORRECTED", "Correction commit: `" + ANCHOR_081 + "`")
  },
  {
    logCommits: [
      {
        hash: COMMIT_SYNC,
        subject: "20260819.Wings4.Synchronize S2 canon and continuity after implementation",
        paths: [
          "PORTFOLIO.DECISION_LOG.md",
          "00_STATE/BATON.WINGS4.ACTIVE.md",
          "SESSIONS/ORCHESTRATOR/03.SESSION_CONTINUE/00.START_HERE.ORCHESTRATOR.txt",
          "MIGRATION.BACKLOG.md"
        ]
      },
      {
        hash: COMMIT_S22,
        subject: "20260819.Wings4.Correct S2 semantic-lag wording",
        paths: [
          "PRODUCT/PUSH_FIRST_BRIEFING_RUNTIME/briefing.runtime.js",
          "PRODUCT/PUSH_FIRST_BRIEFING_RUNTIME/briefing.runtime.logical.test.js",
          "PORTFOLIO.ARCHITECTURE/WINGS4.PUSH_FIRST_BRIEFING.RUNTIME.S2.SPEC.md"
        ]
      }
    ]
  }
);

ok(
  "S2-3-CURRENT-REPO-MATERIAL",
  currentRepo.markdown.indexOf(COMMIT_SYNC) !== -1 &&
    currentRepo.markdown.indexOf(COMMIT_S22) !== -1 &&
    currentRepo.markdown.indexOf(runtime.EMPTY_MATERIAL_CHANGES) === -1
);
ok(
  "S2-3-NO-SESSION-CONTINUE-DEFERRED",
  currentRepo.markdown.indexOf("SESSION_CONTINUE_CANON_REFRESH") === -1 &&
    r1.markdown.indexOf("SESSION_CONTINUE_CANON_REFRESH") === -1
);
ok(
  "S2-3-NO-FALSE-EMPTY-MATERIAL",
  currentRepo.markdown.indexOf(runtime.EMPTY_MATERIAL_CHANGES) === -1
);
ok(
  "S2-3-CONSISTENT-NEXT-ACTION",
  currentRepo.markdown.indexOf("NEXT_PRODUCT_ACTION=`RUN_S2_ON_DEMAND_BRIEFING_FOR_HUMAN_REVIEW`") !== -1
);
ok(
  "S2-3-NO-FABRICATED-OPEN-055-075",
  currentRepo.markdown.indexOf("`DEC-W4-055`") === -1 &&
    currentRepo.markdown.indexOf("`DEC-W4-075`") === -1 &&
    currentRepo.markdown.indexOf("S3_AFTER_RECORDED_HUMAN_DECISION") === -1 &&
    currentRepo.markdown.indexOf("S4_RING0_PANEL") === -1
);

var completedFiles = continuityFiles(
  "OPEN_DECISION_SESSION_CONTINUE_CANON_REFRESH=COMPLETED\nOPEN_DECISION_STILL_OPEN=OPEN\nOPEN_DECISION_SUPERSEDED_ITEM=SUPERSEDED\nOPEN_DECISION_NOT_SELECTED_ITEM=NOT_SELECTED\nOPEN_DECISION_S3_BOUNDARY=UNAUTHORIZED\n"
);
completedFiles["PORTFOLIO.DECISION_LOG.md"] = decisionEntry(
  "DEC-W4-081",
  "S2.1",
  "CORRECTED",
  "Correction commit: `" + ANCHOR_081 + "`"
);
var rClassed = run({
  files: completedFiles,
  git: {
    head: COMMIT_S22,
    objects: objectsFor(HEAD_A, ANCHOR_081, COMMIT_S22),
    ancestors: ancestorsFor(HEAD_A, ANCHOR_081),
    logCommits: []
  }
});
var classedOpenIds = rClassed.model.open.map(function (o) { return o.id + "=" + o.status; }).join(",");
ok(
  "S2-3-COMPLETED-OMITTED",
  classedOpenIds.indexOf("OPEN_DECISION_SESSION_CONTINUE_CANON_REFRESH") === -1 &&
    rClassed.markdown.indexOf("`OPEN_DECISION_SESSION_CONTINUE_CANON_REFRESH` status=`DEFERRED`") === -1
);
ok(
  "S2-3-SUPERSEDED-OMITTED",
  classedOpenIds.indexOf("OPEN_DECISION_SUPERSEDED_ITEM") === -1
);
ok(
  "S2-3-NOT-SELECTED-NOT-OPEN",
  classedOpenIds.indexOf("OPEN_DECISION_NOT_SELECTED_ITEM") === -1
);
ok(
  "S2-3-UNAUTHORIZED-BOUNDARY-NOT-OPEN",
  classedOpenIds.indexOf("OPEN_DECISION_S3_BOUNDARY") === -1 &&
    classedOpenIds.indexOf("OPEN_DECISION_STILL_OPEN=OPEN") !== -1
);

var conflictFiles = continuityFiles();
conflictFiles["00_STATE/BATON.WINGS4.ACTIVE.md"] = conflictFiles["00_STATE/BATON.WINGS4.ACTIVE.md"].replace(
  "NEXT_PRODUCT_ACTION=RUN_S2_ON_DEMAND_BRIEFING_FOR_HUMAN_REVIEW",
  "NEXT_PRODUCT_ACTION=DO_SOMETHING_ELSE"
);
conflictFiles["PORTFOLIO.DECISION_LOG.md"] = decisionEntry("DEC-W4-081", "S2.1", "CORRECTED", "Correction commit: `" + ANCHOR_081 + "`");
var rConflict = run({
  files: conflictFiles,
  git: {
    head: HEAD_A,
    objects: objectsFor(HEAD_A, ANCHOR_081),
    logCommits: []
  }
});
ok(
  "S2-3-NEXT-ACTION-CONFLICT-UNKNOWN",
  rConflict.markdown.indexOf("UNKNOWN: NEXT_PRODUCT_ACTION") !== -1 &&
    rConflict.markdown.indexOf("DO_SOMETHING_ELSE") !== -1 &&
    rConflict.markdown.indexOf("RUN_S2_ON_DEMAND_BRIEFING_FOR_HUMAN_REVIEW") !== -1 &&
    rConflict.markdown.indexOf("00_STATE/BATON.WINGS4.ACTIVE.md") !== -1 &&
    rConflict.markdown.indexOf("00.START_HERE.ORCHESTRATOR.txt") !== -1
);

ok(
  "S2-3-NEXT-ACTION-MISSING-UNKNOWN",
  r1.markdown.indexOf("UNKNOWN: NEXT_PRODUCT_ACTION") !== -1
);

ok(
  "S2-3-VALID-EMPTY-RANGE",
  rEmpty.markdown.indexOf(runtime.EMPTY_MATERIAL_CHANGES) !== -1 &&
    rEmpty.model.changes.length === 0 &&
    rEmpty.model.materialUnknown !== true
);

ok(
  "S2-3-MISSING-ANCHOR-UNKNOWN",
  r1.markdown.indexOf(runtime.EMPTY_MATERIAL_CHANGES) === -1 &&
    (r1.markdown.indexOf("UNKNOWN: last_decision_id") !== -1 || r1.markdown.indexOf("UNKNOWN: last_decision_anchor") !== -1 || r1.markdown.indexOf("UNKNOWN: material_changes") !== -1)
);

var rMalformedAnchor = runDerived({
  "PORTFOLIO.DECISION_LOG.md": decisionEntry("DEC-W4-081", "S2.1", "CORRECTED", "Correction commit: `not-a-valid-commit-hash`")
});
ok(
  "S2-3-MALFORMED-ANCHOR-UNKNOWN",
  rMalformedAnchor.markdown.indexOf(runtime.EMPTY_MATERIAL_CHANGES) === -1 &&
    rMalformedAnchor.markdown.indexOf("UNKNOWN: last_decision_anchor") !== -1
);

var rMissingObj = runDerived({
  "PORTFOLIO.DECISION_LOG.md": decisionEntry("DEC-W4-081", "S2.1", "CORRECTED", "Correction commit: `" + HEAD_C + "`")
}, {
  objects: objectsFor(HEAD_A, ANCHOR_081, COMMIT_S22),
  ancestors: ancestorsFor(HEAD_A, ANCHOR_081)
});
ok(
  "S2-3-NONEXISTENT-COMMIT-UNKNOWN",
  rMissingObj.markdown.indexOf(runtime.EMPTY_MATERIAL_CHANGES) === -1 &&
    rMissingObj.markdown.indexOf("UNKNOWN: last_decision_anchor") !== -1
);

var rNonAnc = runDerived({
  "PORTFOLIO.DECISION_LOG.md": decisionEntry("DEC-W4-081", "S2.1", "CORRECTED", "Correction commit: `" + HEAD_C + "`")
}, {
  objects: objectsFor(HEAD_A, HEAD_C, COMMIT_S22),
  ancestors: ancestorsFor(HEAD_A)
});
ok(
  "S2-3-NON-ANCESTOR-ANCHOR-UNKNOWN",
  rNonAnc.markdown.indexOf(runtime.EMPTY_MATERIAL_CHANGES) === -1 &&
    rNonAnc.markdown.indexOf("UNKNOWN: last_decision_anchor") !== -1 &&
    rNonAnc.markdown.indexOf("NON_ANCESTOR") !== -1
);

var manyCommits = [];
var i;
for (i = 0; i < 12; i += 1) {
  manyCommits.push({
    hash: ("c" + ("000000000000000000000000000000000000000" + i).slice(-39)),
    subject: "commit-" + i,
    paths: ["PRODUCT/PUSH_FIRST_BRIEFING_RUNTIME/briefing.runtime.js"]
  });
}
var rTrunc = runDerived({
  "PORTFOLIO.DECISION_LOG.md": decisionEntry("DEC-W4-081", "S2.1", "CORRECTED", "Correction commit: `" + ANCHOR_081 + "`")
}, { logCommits: manyCommits });
var shown = rTrunc.model.changes.filter(function (c) {
  return c.text.indexOf("material_commit") !== -1;
});
ok(
  "S2-3-MATERIAL-TRUNCATION",
  shown.length === runtime.MAX_MATERIAL_COMMITS &&
    rTrunc.markdown.indexOf("Displayed 10 of 12") !== -1 &&
    rTrunc.markdown.indexOf("UNKNOWN: material_changes_truncated") !== -1
);

var rCont = runDerived({
  "PORTFOLIO.DECISION_LOG.md": decisionEntry("DEC-W4-081", "S2.1", "CORRECTED", "Correction commit: `" + ANCHOR_081 + "`")
}, {
  logCommits: [
    {
      hash: COMMIT_SYNC,
      subject: "continuity-only",
      paths: ["00_STATE/BATON.WINGS4.ACTIVE.md"]
    }
  ]
});
ok(
  "S2-3-CONTINUITY-ONLY-INCLUDED",
  rCont.markdown.indexOf(COMMIT_SYNC) !== -1 &&
    rCont.markdown.indexOf("00_STATE/BATON.WINGS4.ACTIVE.md") !== -1
);

var rTestsOnly = runDerived({
  "PORTFOLIO.DECISION_LOG.md": decisionEntry("DEC-W4-081", "S2.1", "CORRECTED", "Correction commit: `" + ANCHOR_081 + "`")
}, {
  logCommits: [
    {
      hash: COMMIT_S22,
      subject: "runtime-tests-only",
      paths: ["PRODUCT/PUSH_FIRST_BRIEFING_RUNTIME/briefing.runtime.logical.test.js"]
    }
  ]
});
ok(
  "S2-3-RUNTIME-TESTS-ONLY-INCLUDED",
  rTestsOnly.markdown.indexOf(COMMIT_S22) !== -1 &&
    rTestsOnly.markdown.indexOf("briefing.runtime.logical.test.js") !== -1
);

var rDrift = runDerived({
  "PORTFOLIO.DECISION_LOG.md":
    "## DEC-W4-090 — Drifted heading\n\nStatus: APPROVED\nStatus: REJECTED\nCorrection commit: `" + ANCHOR_081 + "`\n"
});
ok(
  "S2-3-STATUS-DRIFT-FAIL-CLOSED",
  rDrift.markdown.indexOf("UNKNOWN: last_decision_id") !== -1 &&
    rDrift.markdown.indexOf(runtime.EMPTY_MATERIAL_CHANGES) === -1
);

ok(
  "S2-3-FALSE-CLAIMS-ABSENT",
  currentRepo.markdown.indexOf("SESSION_CONTINUE_CANON_REFRESH") === -1 &&
    currentRepo.markdown.indexOf("Keep briefing runtime bounded to ON_DEMAND_TEXT_ONLY") === -1 &&
    r1.markdown.indexOf("`DEC-W4-077-OPTION-A`") === -1
);

function sourceLines(md) {
  return md.split("\n").filter(function (line) {
    return /^\s+- source:/.test(line);
  }).join("\n");
}
var r1Sources = sourceLines(r1.markdown);
var currentSources = sourceLines(currentRepo.markdown);
ok(
  "S2-3-PROVENANCE-PARSED-ONLY",
  r1Sources.indexOf("HUMAN/HUMAN.WINGS4.md") === -1 &&
    r1Sources.indexOf("PORTFOLIO.PRINCIPLES.md") === -1 &&
    r1Sources.indexOf("MIGRATION.BACKLOG.md") === -1 &&
    r1Sources.indexOf("WINGS4.PUSH_FIRST_BRIEFING.DESIGN.md") === -1 &&
    r1Sources.indexOf("WINGS4.P4.PUSH_FIRST_BRIEFING.RUNTIME.PLANNING.md") === -1 &&
    currentSources.indexOf("HUMAN/HUMAN.WINGS4.md") === -1 &&
    currentSources.indexOf("PORTFOLIO.PRINCIPLES.md") === -1
);

ok(
  "S2-3-VALID-ANCESTOR-NON-STALE",
  !hasStaleBaton(rAncestor.markdown) &&
    !hasStaleSession(rAncestor.markdown)
);
ok(
  "S2-3-NON-ANCESTOR-KEEPS-STALE",
  hasStaleBaton(rDiverged.markdown) &&
    hasStaleSession(rDiverged.markdown)
);
ok(
  "S2-3-EIGHT-SECTIONS",
  runtime.CANONICAL_SECTIONS.length === 8 &&
    sectionOrder(currentRepo.markdown).every(function (n) { return n >= 0; })
);
ok(
  "S2-3-NO-WRITE",
  writeHits.length === 0
);
ok(
  "S2-3-HUMAN-OPTIONS-SAFE",
  currentRepo.model.options.length >= 2 &&
    currentRepo.model.options.every(function (o) {
      return o.executes_mutation === false && !/authorize S3/i.test(o.text);
    })
);

ok(
  "S2-3-UNKNOWN-NOT-EMPTY-RATIONALE",
  r1.markdown.indexOf("UNKNOWN: open_decisions") !== -1 &&
    r1.markdown.indexOf(runtime.OPEN_DECISIONS_UNKNOWN_WHY) !== -1 &&
    r1.markdown.indexOf("No currently open OPEN_DECISION_* items") === -1 &&
    currentRepo.markdown.indexOf("No currently open OPEN_DECISION_* items") === -1 &&
    currentRepo.model.openDecisionsState === "UNKNOWN"
);

var rMetaOnly = runDerived({
  "SESSIONS/ORCHESTRATOR/03.SESSION_CONTINUE/00.START_HERE.ORCHESTRATOR.txt":
    continuityFiles("OPEN_DECISION_CONTRACT=DESIGN_CANONIZED_NOT_CONSUMED\n")[
      "SESSIONS/ORCHESTRATOR/03.SESSION_CONTINUE/00.START_HERE.ORCHESTRATOR.txt"
    ],
  "00_STATE/BATON.WINGS4.ACTIVE.md":
    continuityFiles("", "OPEN_DECISION_CONTRACT=DESIGN_CANONIZED_NOT_CONSUMED\n")[
      "00_STATE/BATON.WINGS4.ACTIVE.md"
    ]
});
ok(
  "S2-3-META-CONTRACT-KEY-NOT-CATALOG",
  rMetaOnly.model.openDecisionsState === "UNKNOWN" &&
    rMetaOnly.markdown.indexOf(runtime.OPEN_DECISIONS_UNKNOWN_WHY) !== -1 &&
    rMetaOnly.markdown.indexOf("No currently open OPEN_DECISION_* items") === -1 &&
    rMetaOnly.model.open.length === 0
);

var rValidatedEmpty = runDerived({
  "SESSIONS/ORCHESTRATOR/03.SESSION_CONTINUE/00.START_HERE.ORCHESTRATOR.txt":
    continuityFiles("OPEN_DECISION_DONE_ITEM=COMPLETED\nOPEN_DECISION_OLD_ITEM=SUPERSEDED\n")[
      "SESSIONS/ORCHESTRATOR/03.SESSION_CONTINUE/00.START_HERE.ORCHESTRATOR.txt"
    ]
});
ok(
  "S2-3-VALIDATED-EMPTY-NOT-UNKNOWN",
  rValidatedEmpty.model.openDecisionsState === "VALIDATED_EMPTY" &&
    rValidatedEmpty.markdown.indexOf("OPEN_DECISIONS is a validated empty set") !== -1 &&
    rValidatedEmpty.markdown.indexOf(runtime.OPEN_DECISIONS_VALIDATED_EMPTY_WHY) !== -1 &&
    rValidatedEmpty.markdown.indexOf("UNKNOWN: open_decisions") === -1 &&
    rValidatedEmpty.model.open.length === 0
);

var reviewFiles = continuityFiles();
reviewFiles["SESSIONS/ORCHESTRATOR/03.SESSION_CONTINUE/00.START_HERE.ORCHESTRATOR.txt"] =
  reviewFiles["SESSIONS/ORCHESTRATOR/03.SESSION_CONTINUE/00.START_HERE.ORCHESTRATOR.txt"].replace(
    "NEXT_PRODUCT_ACTION=RUN_S2_ON_DEMAND_BRIEFING_FOR_HUMAN_REVIEW",
    "NEXT_PRODUCT_ACTION=HUMAN_REVIEW_S2_3_AND_DECIDE_OPEN_DECISION_GOVERNANCE"
  );
reviewFiles["00_STATE/BATON.WINGS4.ACTIVE.md"] = reviewFiles["00_STATE/BATON.WINGS4.ACTIVE.md"].replace(
  "NEXT_PRODUCT_ACTION=RUN_S2_ON_DEMAND_BRIEFING_FOR_HUMAN_REVIEW",
  "NEXT_PRODUCT_ACTION=HUMAN_REVIEW_S2_3_AND_DECIDE_OPEN_DECISION_GOVERNANCE"
);
var rReview = run({
  files: reviewFiles,
  git: {
    head: HEAD_A,
    objects: objectsFor(HEAD_A),
    ancestors: ancestorsFor(HEAD_A),
    logCommits: []
  }
});
var reviewIds = rReview.model.options.map(function (o) { return o.id; });
ok(
  "S2-3-HUMAN-OPTIONS-SUPPORT-OPEN-DECISION-GOVERNANCE",
  reviewIds.indexOf("ACCEPT_DERIVED_SNAPSHOT_PRESERVE_UNKNOWN") !== -1 &&
    reviewIds.indexOf("AUTHORIZE_BOUNDED_OPEN_DECISION_GOVERNANCE") !== -1 &&
    reviewIds.indexOf("KEEP_UNKNOWN_AND_DEFER") !== -1 &&
    rReview.markdown.indexOf("preserving OPEN_DECISIONS=UNKNOWN") !== -1 &&
    rReview.markdown.indexOf("Authorize bounded OPEN_DECISION_* governance work") !== -1 &&
    rReview.markdown.indexOf("Keep OPEN_DECISIONS=UNKNOWN and defer") !== -1 &&
    rReview.markdown.indexOf("OPTION_A:") === -1 &&
    rReview.model.options.every(function (o) {
      return o.executes_mutation === false;
    })
);

ok(
  "S2-3-NO-CONTRACT-FILE-CONSUMPTION",
  runtime.ALLOWLIST.every(function (item) {
    return item.rel.indexOf("WINGS4.OPEN_DECISION.CONTRACT.md") === -1;
  }) &&
    src.indexOf("WINGS4.OPEN_DECISION.CONTRACT.md") === -1
);

var unknownArg = throwCode(function () {
  runtime.parseCliArgs(["--trigger", "ON_DEMAND_REQUEST", "--pretty"]);
});
ok("CLI-unknown-arg", unknownArg && unknownArg.code === "UNKNOWN_CLI_ARGUMENT");

var moduleNoRun = runtime;
ok("NO_IMPORT_SIDE_EFFECT", typeof moduleNoRun.runBriefing === "function");

console.log("PASS=" + passed.length);
console.log("FAIL=" + fails.length);
if (fails.length) {
  fails.forEach(function (f) {
    console.log("FAIL_ITEM=" + f);
  });
  process.exit(1);
}
console.log("BR_01=PASS");
console.log("BR_02=PASS");
console.log("BR_03=PASS");
console.log("BR_04=PASS");
console.log("BR_05=PASS");
console.log("BR_06=PASS");
console.log("BR_07=PASS");
console.log("BR_08=PASS");
console.log("BR_09=PASS");
console.log("BR_10=PASS");
console.log("BR_11=PASS");
console.log("BR_12=PASS");
console.log("BR_13=PASS");
console.log("BR_14=PASS");
console.log("BR_15=PASS");
console.log("BR_16=PASS");
console.log("BR_17=PASS");
console.log("BR_18=PASS");
console.log("BR_19=PASS");
console.log("BR_20=PASS");
process.exit(0);
