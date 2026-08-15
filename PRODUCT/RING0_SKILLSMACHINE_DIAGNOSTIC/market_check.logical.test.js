"use strict";

var fs = require("fs");
var path = require("path");
var engine = require("./market_check.engine.js");

var fixturePath = path.join(__dirname, "skillsmachine.fixture.json");
var fixture = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
var fails = [];

function eq(actual, expected, name) {
  if (actual !== expected) fails.push(name + ": expected " + JSON.stringify(expected) + ", got " + JSON.stringify(actual));
}

function ok(cond, name) {
  if (!cond) fails.push(name);
}

function run(findingId, questionId) {
  var finding = (fixture.findings || []).filter(function (f) { return f.finding_id === findingId; })[0];
  return engine.runMarketCheck({
    finding: finding || { finding_id: findingId },
    question_id: questionId,
    market_check: fixture.market_check
  });
}

function hasLimit(result, code) {
  return (result.limits || []).indexOf(code) >= 0;
}

var r1 = run("F-SM-001", "MCQ-BUILD_VS_ADOPT");
eq(r1.invoked_on_demand, true, "MC-01 invoked_on_demand");
eq(r1.recommendation, "REUSE_SAME_PROJECT", "MC-01 recommendation");
ok(r1.alternatives && r1.alternatives.length >= 2, "MC-01 alternatives before recommendation");
ok(hasLimit(r1, "NOT_MARKET_MONITORING") && hasLimit(r1, "NOT_RADAR") && hasLimit(r1, "NOT_RING3"), "MC-01 limits");
ok(r1.scope && r1.authority && r1.confidence, "MC-01 scope/authority/confidence");
ok(r1.recommendation_label && r1.recommendation_label.indexOf("project") >= 0, "MC-01 management-readable label");

var r2 = run("F-SM-002", "MCQ-BUILD_VS_ADOPT");
eq(r2.recommendation, "UNKNOWN", "MC-02 UNKNOWN when catalog missing");
ok(r2.unknown_reason && r2.unknown_reason.length > 0, "MC-02 unknown_reason");
ok(r2.required_evidence && r2.next_action, "MC-02 required evidence and next action");
ok(r2.recommendation !== "ADOPT_OPEN_SOURCE" && r2.recommendation !== "BUILD_RESIDUAL", "MC-02 does not fabricate a buy/build");

var r3 = run("F-SM-002", "MCQ-KILL_OR_DEFER");
eq(r3.recommendation, "DEFER", "MC-03 defer/stop path");
ok(r3.alternatives && r3.alternatives.length >= 1, "MC-03 alternatives present");

var r4 = run("F-SM-003", "MCQ-KILL_OR_DEFER");
eq(r4.recommendation, "KILL", "MC-04 stop Hermes reactivation");

var r5 = run("F-SM-004", "MCQ-BUILD_VS_ADOPT");
eq(r5.recommendation, "REUSE_SAME_PROJECT", "MC-05 updater stays SkillsMachine-local");
var unknownAlt = (r5.alternatives || []).filter(function (a) { return a.status === "UNKNOWN"; })[0];
ok(unknownAlt, "MC-05 open-source/commercial remains UNKNOWN alternative");

var r6 = engine.runMarketCheck({
  finding: { finding_id: "F-SM-001" },
  question_id: "MCQ-NOT-A-QUESTION",
  market_check: fixture.market_check
});
eq(r6.recommendation, "UNKNOWN", "MC-06 invalid question is UNKNOWN");

ok(r1.not_radar && r1.not_ring3 && r1.not_market_monitoring, "MC-07 capability flags");
ok(fixture.market_check && fixture.market_check.mode === "ON_DEMAND", "MC-08 fixture mode on-demand");
ok((fixture.market_check.not || []).indexOf("RADAR") >= 0, "MC-09 fixture forbids RADAR");
ok(r1.finding_id === "F-SM-001" && r1.question_label && r1.authority && r1.scope, "MC-10 target/intent/authority/scope");
ok(r1.alternatives[0] && r1.recommendation_label, "MC-10 alternatives exist as first-class output before relying on recommendation");

eq(r1.evidence_level, "WINGS_HELD", "MC-11 winner evidence_level WINGS_HELD");
ok(r1.alternatives.every(function (a) { return a.evidence_level; }), "MC-11 alternatives carry evidence_level");
eq(r2.evidence_level, "UNKNOWN", "MC-12 UNKNOWN path evidence_level");
ok((fixture.market_check.evidence_levels || []).indexOf("EXTERNAL_CHECKED") >= 0, "MC-13 evidence levels include EXTERNAL_CHECKED");
ok(fixture.market_check.runtime_complete === false, "MC-13 runtime_complete remains false");

var integrateAlt = (r5.alternatives || []).filter(function (a) { return a.eval_class === "INTEGRATE"; })[0];
ok(integrateAlt && integrateAlt.status === "CONSIDERED", "MC-14 INTEGRATE exercised as considered alternative");
eq(integrateAlt && integrateAlt.evidence_level, "WINGS_HELD", "MC-14 INTEGRATE evidence is Wings-held");
eq(r5.recommendation, "REUSE_SAME_PROJECT", "MC-14 INTEGRATE is not a fabricated winner");

var buildAlt = (r5.alternatives || []).filter(function (a) { return a.eval_class === "RESIDUAL_CUSTOM"; })[0];
ok(buildAlt && (buildAlt.status === "UNKNOWN" || buildAlt.status === "NOT_EVIDENCED"), "MC-15 BUILD exercised without fabricating a build winner");
eq(engine.EVIDENCE_LEVELS.indexOf("HUMAN_PROVIDED") >= 0, true, "MC-16 HUMAN_PROVIDED defined");
ok((r1.limits || []).indexOf("NO_LIVE_WEB_SCAN") >= 0, "MC-16 no live web scan");

if (fails.length) {
  console.error("MARKET_CHECK_LOGICAL_TEST=FAIL");
  fails.forEach(function (f) { console.error(" - " + f); });
  process.exit(1);
}
console.log("MARKET_CHECK_LOGICAL_TEST=PASS");
console.log("CASES=16");
console.log("VALIDATION_RESULT=LOGICALLY_TESTED");
