import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { MemorySaver } from "@langchain/langgraph";
import { runLab01, buildLab01Graph } from "../src/lab01_deterministic.js";
import { runLab02, LAB02_MAX_RETRIES } from "../src/lab02_conditional.js";
import { pauseLab03, resumeLab03 } from "../src/lab03_persistence.js";
import { proposeLab04, resumeLab04 } from "../src/lab04_hitl.js";
import { runLab05, writeLog } from "../src/lab05_subgraphs.js";
import { startLab06, resumeLab06 } from "../src/lab06_pilot.js";
import { loadLabFixture } from "../src/fixtures.js";

const LAB_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPO_ROOT = path.resolve(LAB_ROOT, "..", "..");

test("LAB_01 deterministic graph", async () => {
  const a = await runLab01("alpha");
  const b = await runLab01("alpha");
  assert.equal(a.result, "LAB01:alpha");
  assert.deepEqual(a, b);
});

test("LAB_01 empty input still reaches produce with valid=false and throws", async () => {
  await assert.rejects(() => runLab01("   "), /produce_result requires valid input/);
});

test("LAB_02 valid input routes to result", async () => {
  const out = await runLab02("VALID");
  assert.equal(out.status, "ok");
  assert.equal(out.result, "LAB02:VALID");
  assert.equal(out.retries, 0);
});

test("LAB_02 invalid input retries then fail-closed at max", async () => {
  const out = await runLab02("INVALID");
  assert.equal(out.status, "failed");
  assert.equal(out.retries, LAB02_MAX_RETRIES);
  assert.match(out.result, /LAB02_FAIL_AFTER_3_RETRIES/);
});

test("LAB_03 checkpoint and resume with thread_id", async () => {
  const checkpointer = new MemorySaver();
  const { graph, paused, config } = await pauseLab03("persist-me", "thread-03", checkpointer);
  assert.ok(paused.__interrupt__);
  const state = await graph.getState(config);
  assert.equal(state.values.checkpointed, true);
  const resumed = await resumeLab03(graph, config);
  assert.equal(resumed.resumed, true);
  assert.equal(resumed.result, "LAB03:persist-me:resumed=true");
});

test("LAB_04 approve applies side effect after interrupt", async () => {
  const checkpointer = new MemorySaver();
  const { graph, paused, config } = await proposeLab04("change-a", "t-approve", checkpointer);
  assert.ok(paused.__interrupt__);
  assert.equal(paused.applied, undefined);
  const out = await resumeLab04(graph, config, "approve");
  assert.equal(out.applied, true);
  assert.equal(out.sideEffectCount, 1);
  assert.equal(out.outcome, "APPLIED:change-a");
});

test("LAB_04 reject does not apply side effect", async () => {
  const checkpointer = new MemorySaver();
  const { graph, config } = await proposeLab04("change-b", "t-reject", checkpointer);
  const out = await resumeLab04(graph, config, "reject");
  assert.equal(out.applied, false);
  assert.equal(out.sideEffectCount, 0);
  assert.equal(out.outcome, "REJECTED");
});

test("LAB_04 edit applies edited proposal", async () => {
  const checkpointer = new MemorySaver();
  const { graph, config } = await proposeLab04("change-c", "t-edit", checkpointer);
  const out = await resumeLab04(graph, config, { action: "edit", editedProposal: "edited-c" });
  assert.equal(out.outcome, "APPLIED:edited-c");
  assert.equal(out.sideEffectCount, 1);
});

test("LAB_04 replay is idempotent after apply", async () => {
  const checkpointer = new MemorySaver();
  const { graph, config } = await proposeLab04("change-d", "t-replay", checkpointer);
  const first = await resumeLab04(graph, config, "approve");
  assert.equal(first.sideEffectCount, 1);
  const second = await graph.invoke(null, config);
  assert.equal(second.sideEffectCount, 1);
  assert.equal(second.applied, true);
});

test("LAB_05 subgraphs serialize through one integrator", async () => {
  const out = await runLab05("u1");
  assert.equal(out.workerA, "A:u1");
  assert.equal(out.workerB, "B:u1");
  assert.equal(out.integrated, "SERIAL:A:u1|B:u1");
  assert.equal(writeLog.length, 1);
  assert.equal(writeLog[0].at, 1);
});

test("LAB_06 fixture-only pilot preserves classifications", async () => {
  const checkpointer = new MemorySaver();
  const { graph, paused, config } = await startLab06("t-pilot", checkpointer);
  assert.ok(paused.__interrupt__);
  const out = await resumeLab06(graph, config, "approve");
  assert.equal(out.classificationsValid, true);
  assert.match(out.briefing, /FACT:/);
  assert.match(out.briefing, /INFERENCE:/);
  assert.match(out.briefing, /RECOMMENDATION:/);
  assert.match(out.briefing, /UNKNOWN:/);
  assert.match(out.briefing, /OPEN_DECISIONS=UNKNOWN/);
  assert.match(out.briefing, /NOT_EQUIVALENT_TO_ACCEPTED_S2_RUNTIME/);
  assert.equal(out.snapshot.S2_4_AUTHORIZED, "NO");
});

test("filesystem boundary rejects traversal", () => {
  assert.throws(() => loadLabFixture("../package.json"), /filesystem boundary/);
  assert.throws(() => loadLabFixture("a/b.json"), /filesystem boundary/);
  const snap = loadLabFixture("governed_snapshot.json");
  assert.equal(snap.OPEN_DECISIONS, "UNKNOWN");
});

test("product runtime does not import the lab", () => {
  const runtime = fs.readFileSync(
    path.join(REPO_ROOT, "PRODUCT", "PUSH_FIRST_BRIEFING_RUNTIME", "briefing.runtime.js"),
    "utf8"
  );
  assert.equal(runtime.includes("LANGGRAPH_WINGS4_LAB"), false);
  assert.equal(runtime.includes("@langchain/langgraph"), false);
  assert.equal(fs.existsSync(path.join(REPO_ROOT, "package.json")), false);
});

test("lab sources do not import product runtime", () => {
  const srcDir = path.join(LAB_ROOT, "src");
  for (const name of fs.readdirSync(srcDir)) {
    const text = fs.readFileSync(path.join(srcDir, name), "utf8");
    assert.equal(/import\s+.*PUSH_FIRST_BRIEFING_RUNTIME|from\s+['"][^'"]*PUSH_FIRST_BRIEFING_RUNTIME/.test(text), false, name);
    assert.equal(text.includes("00_STATE/WINGS4.OPEN_DECISION.CATALOG"), false, name);
  }
});

test("dependency isolation: lab package is local", () => {
  const labPkg = JSON.parse(fs.readFileSync(path.join(LAB_ROOT, "package.json"), "utf8"));
  assert.equal(labPkg.dependencies["@langchain/langgraph"], "1.4.12");
  assert.equal(labPkg.dependencies["@langchain/langgraph-checkpoint-sqlite"], "1.0.4");
  assert.equal(fs.existsSync(path.join(REPO_ROOT, "package.json")), false);
});

test("LAB_01 compiled graph exists for static inspection", () => {
  const graph = buildLab01Graph();
  assert.ok(graph);
});

test("LAB_07 streams node updates then matches invoke", async () => {
  const { streamLab07 } = await import("../src/lab07_streaming.js");
  const { updates, finalState } = await streamLab07("streamed");
  assert.equal(updates.length, 2);
  assert.ok(Object.prototype.hasOwnProperty.call(updates[0], "validate_input"));
  assert.ok(Object.prototype.hasOwnProperty.call(updates[1], "produce_result"));
  assert.equal(finalState.result, "LAB07:streamed");
});

test("LAB_08 measurement returns bounded numeric samples", async () => {
  const { measureLabPerformance } = await import("../src/lab08_measurement.js");
  const report = await measureLabPerformance({ iterations: 8 });
  assert.equal(report.results.length, 3);
  for (const row of report.results) {
    assert.equal(typeof row.median_ms, "number");
    assert.equal(Number.isNaN(row.median_ms), false);
    assert.ok(row.n >= 8 || row.label !== "LAB_01_invoke");
  }
  const lab01 = report.results.find((row) => row.label === "LAB_01_invoke");
  assert.ok(lab01.median_ms < 1000);
});
