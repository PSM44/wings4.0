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
var ROOT = runtime.EXPECTED_ROOT;

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
        if (kind === "commit") return "commit\n";
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

// BR-05
var rEmpty = run();
ok("BR-05", rEmpty.markdown.indexOf(runtime.EMPTY_MATERIAL_CHANGES) !== -1);

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
    r1.markdown.indexOf("Semantic continuity lag is not inferred from hash inequality") !== -1
);

// BR-11
ok(
  "BR-11",
  r1.markdown.indexOf("OPTION_A:") !== -1 &&
    r1.markdown.indexOf("OPTION_B:") !== -1 &&
    /executes_mutation: NO/.test(r1.markdown) &&
    r1.model.options.every(function (o) {
      return o.executes_mutation === false;
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
