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

var rBuild = run("F-MC-001", "MCQ-BUILD_VS_ADOPT");
eq(rBuild.recommendation, "BUILD_RESIDUAL", "MC-17 BUILD winner");
eq(rBuild.evidence_level, "WINGS_HELD", "MC-17 BUILD winner is Wings-held");
ok((rBuild.alternatives || []).some(function (a) {
  return a.evidence_level === "HUMAN_PROVIDED" && a.evidence_reliability === "HUMAN_PROVIDED_SAMPLE";
}), "MC-19 HUMAN_PROVIDED sample visible and not production winner");
ok(rBuild.recommendation !== "UNKNOWN", "MC-17 BUILD is not UNKNOWN");

var rInt = run("F-MC-002", "MCQ-INTEGRATE_OR_BUILD");
eq(rInt.recommendation, "INTEGRATE", "MC-18 INTEGRATE winner");
eq(rInt.evidence_level, "WINGS_HELD", "MC-18 INTEGRATE winner is Wings-held");
ok((rInt.alternatives || []).some(function (a) {
  return a.eval_class === "RESIDUAL_CUSTOM" && (a.status === "UNKNOWN" || a.status === "NOT_EVIDENCED");
}), "MC-18 BUILD remains UNKNOWN on integrate finding");
var extAlt = (rInt.alternatives || []).filter(function (a) { return a.evidence_level === "EXTERNAL_CHECKED"; })[0];
ok(extAlt && extAlt.status === "UNKNOWN", "MC-20 EXTERNAL_CHECKED pending, not a live scan winner");
eq(extAlt && extAlt.check_method, "MANUAL_RECORD", "MC-20 EXTERNAL_CHECKED method is manual record");
ok(fixture.market_check.external_checked_policy && fixture.market_check.external_checked_policy.live_web_search === false, "MC-20 no live web in policy");
ok(fixture.market_check.runtime_complete === false, "MC-20 complete remains false");

function runCustom(findingId, questionId, catalog) {
  return engine.runMarketCheck({
    finding: { finding_id: findingId, title: "Synthetic intake case" },
    question_id: questionId,
    market_check: {
      questions: fixture.market_check.questions,
      evaluation_order: fixture.market_check.evaluation_order,
      catalog: catalog
    }
  });
}

var hpProdIntake = {
  evidence_id: "MCEV-SYN-HP-001",
  evidence_level: "HUMAN_PROVIDED",
  source_type: "HUMAN_DECISION",
  source_label: "Synthetic human decision",
  source_date: "2026-08-15",
  captured_by: "Pablo",
  summary: "Complete HUMAN_PROVIDED production intake.",
  confidence: "MEDIUM",
  limitations: "Manual fixture record only.",
  approval_required: true,
  authority: "Pablo",
  review_status: "CURRENT"
};

var rHpProd = runCustom("SYN-HP-PROD", "MCQ-BUILD_VS_ADOPT", [{
  entry_id: "SYN-HP-PROD",
  applies_to_finding_ids: ["SYN-HP-PROD"],
  applies_to_questions: ["MCQ-BUILD_VS_ADOPT"],
  eval_class: "RESIDUAL_CUSTOM",
  title: "Build remaining gap from human decision",
  disposition_if_selected: "BUILD_RESIDUAL",
  fit: "HIGH",
  confidence: "MEDIUM",
  evidence_status: "PRESENT",
  evidence_level: "HUMAN_PROVIDED",
  production_evidence: true,
  intake: hpProdIntake,
  summary: "Complete HUMAN_PROVIDED production record.",
  evidence: [{ label: "Intake", pointer: "synthetic", excerpt: "metadata present" }]
}]);
eq(rHpProd.recommendation, "BUILD_RESIDUAL", "MC-21 HUMAN_PROVIDED production with intake can win");
eq(rHpProd.evidence_level, "HUMAN_PROVIDED", "MC-21 winner level HUMAN_PROVIDED");
ok((rHpProd.alternatives || []).some(function (a) { return a.intake_status === "VALID" && a.production_evidence === true; }), "MC-21 valid intake is production");

var rHpMissing = runCustom("SYN-HP-MISS", "MCQ-BUILD_VS_ADOPT", [{
  entry_id: "SYN-HP-MISS",
  applies_to_finding_ids: ["SYN-HP-MISS"],
  applies_to_questions: ["MCQ-BUILD_VS_ADOPT"],
  eval_class: "RESIDUAL_CUSTOM",
  title: "Claimed production without intake",
  disposition_if_selected: "BUILD_RESIDUAL",
  fit: "HIGH",
  confidence: "HIGH",
  evidence_status: "PRESENT",
  evidence_level: "HUMAN_PROVIDED",
  production_evidence: true,
  summary: "Missing intake metadata.",
  evidence: []
}]);
eq(rHpMissing.recommendation, "UNKNOWN", "MC-22 missing HUMAN_PROVIDED intake cannot win");
ok((rHpMissing.alternatives || []).some(function (a) {
  return a.intake_status === "PENDING" && a.production_evidence === false && a.confidence === "UNKNOWN";
}), "MC-22 missing metadata stays PENDING and cannot upgrade confidence");

var rEcProd = runCustom("SYN-EC-PROD", "MCQ-BUILD_VS_ADOPT", [{
  entry_id: "SYN-EC-PROD",
  applies_to_finding_ids: ["SYN-EC-PROD"],
  applies_to_questions: ["MCQ-BUILD_VS_ADOPT"],
  eval_class: "OPEN_SOURCE",
  title: "Manual named external record",
  disposition_if_selected: "ADOPT_OPEN_SOURCE",
  fit: "MEDIUM",
  confidence: "MEDIUM",
  evidence_status: "PRESENT",
  evidence_level: "EXTERNAL_CHECKED",
  check_method: "MANUAL_RECORD",
  production_evidence: true,
  intake: {
    evidence_id: "MCEV-SYN-EC-001",
    evidence_level: "EXTERNAL_CHECKED",
    source_type: "MANUAL_EXTERNAL_RECORD",
    source_label: "Named prior check held in Wings",
    source_date: "2026-08-15",
    captured_by: "Pablo",
    summary: "Manual record only.",
    confidence: "MEDIUM",
    limitations: "No live scan.",
    approval_required: true,
    authority: "Pablo",
    review_status: "CURRENT"
  },
  summary: "Complete EXTERNAL_CHECKED manual record.",
  evidence: [{ label: "Manual record", pointer: "synthetic", excerpt: "source metadata present" }]
}]);
eq(rEcProd.recommendation, "ADOPT_OPEN_SOURCE", "MC-23 EXTERNAL_CHECKED with source metadata can be represented");
eq(rEcProd.evidence_level, "EXTERNAL_CHECKED", "MC-23 winner level EXTERNAL_CHECKED");
ok((rEcProd.alternatives || []).some(function (a) {
  return a.check_method === "MANUAL_RECORD" && a.intake_status === "VALID";
}), "MC-23 method remains MANUAL_RECORD");

var rEcMiss = runCustom("SYN-EC-MISS", "MCQ-BUILD_VS_ADOPT", [{
  entry_id: "SYN-EC-MISS",
  applies_to_finding_ids: ["SYN-EC-MISS"],
  applies_to_questions: ["MCQ-BUILD_VS_ADOPT"],
  eval_class: "OPEN_SOURCE",
  title: "External claim without source",
  disposition_if_selected: "ADOPT_OPEN_SOURCE",
  fit: "HIGH",
  confidence: "HIGH",
  evidence_status: "PRESENT",
  evidence_level: "EXTERNAL_CHECKED",
  production_evidence: true,
  summary: "No source metadata.",
  evidence: []
}]);
eq(rEcMiss.recommendation, "UNKNOWN", "MC-24 EXTERNAL_CHECKED without source metadata cannot win");
ok((rEcMiss.alternatives || []).some(function (a) {
  return a.evidence_level === "EXTERNAL_CHECKED" && a.intake_status === "PENDING" && a.production_evidence === false;
}), "MC-24 missing EXTERNAL_CHECKED source stays PENDING");

var rEcLive = runCustom("SYN-EC-LIVE", "MCQ-BUILD_VS_ADOPT", [{
  entry_id: "SYN-EC-LIVE",
  applies_to_finding_ids: ["SYN-EC-LIVE"],
  applies_to_questions: ["MCQ-BUILD_VS_ADOPT"],
  eval_class: "OPEN_SOURCE",
  title: "Claimed live scan",
  disposition_if_selected: "ADOPT_OPEN_SOURCE",
  fit: "HIGH",
  confidence: "HIGH",
  evidence_status: "PRESENT",
  evidence_level: "EXTERNAL_CHECKED",
  check_method: "LIVE_WEB_SCAN",
  production_evidence: true,
  intake: {
    evidence_id: "MCEV-SYN-EC-LIVE",
    evidence_level: "EXTERNAL_CHECKED",
    source_type: "MANUAL_EXTERNAL_RECORD",
    source_label: "Invalid live scan claim",
    source_date: "2026-08-15",
    captured_by: "fixture",
    summary: "Must not become production.",
    confidence: "HIGH",
    limitations: "Live scan is forbidden.",
    approval_required: true,
    authority: "Pablo",
    review_status: "CURRENT"
  },
  summary: "Live scan method is invalid.",
  evidence: []
}]);
eq(rEcLive.recommendation, "UNKNOWN", "MC-25 live-scan method cannot become EXTERNAL_CHECKED production");

ok(fixture.market_check.evidence_intake_contract && fixture.market_check.evidence_intake_contract.mode === "MANUAL_ONLY", "MC-26 intake contract is manual only");
ok(fixture.market_check.evidence_intake_contract.live_web_search === false, "MC-26 no live web in intake contract");
ok((engine.INTAKE_REQUIRED_FIELDS || []).indexOf("evidence_id") >= 0, "MC-26 evidence_id required");
ok((rBuild.alternatives || []).some(function (a) { return a.entry_id === "MC-MC-001-HUMAN-INCOMPLETE" && a.intake_status === "PENDING"; }), "MC-27 incomplete HUMAN_PROVIDED fixture stays PENDING");
ok((rBuild.alternatives || []).some(function (a) { return a.entry_id === "MC-MC-001-HUMAN-PRODUCTION" && a.intake_status === "VALID" && a.production_evidence === true; }), "MC-27 complete HUMAN_PROVIDED fixture is valid and not the winner");
eq(rBuild.recommendation, "BUILD_RESIDUAL", "MC-27 F-MC-001 winner remains Wings-held BUILD");
eq(rBuild.evidence_level, "WINGS_HELD", "MC-27 F-MC-001 winner evidence remains WINGS_HELD");
ok((rInt.alternatives || []).some(function (a) { return a.entry_id === "MC-MC-002-EXTERNAL-MANUAL" && a.intake_status === "VALID"; }), "MC-28 complete EXTERNAL_CHECKED manual record is visible");
eq(rInt.recommendation, "INTEGRATE", "MC-28 F-MC-002 winner remains INTEGRATE");
ok(hasLimit(rHpProd, "MANUAL_EVIDENCE_INTAKE_ONLY") && hasLimit(rHpProd, "NOT_RADAR") && hasLimit(rHpProd, "NOT_MARKET_MONITORING"), "MC-29 intake path keeps monitoring/RADAR limits");
ok(fixture.market_check.runtime_complete === false, "MC-29 runtime_complete remains false");

if (fails.length) {
  console.error("MARKET_CHECK_LOGICAL_TEST=FAIL");
  fails.forEach(function (f) { console.error(" - " + f); });
  process.exit(1);
}
console.log("MARKET_CHECK_LOGICAL_TEST=PASS");
console.log("CASES=29");
console.log("VALIDATION_RESULT=LOGICALLY_TESTED");
