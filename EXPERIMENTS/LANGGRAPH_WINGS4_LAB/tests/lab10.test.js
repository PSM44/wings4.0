import assert from "node:assert/strict";
import { test } from "node:test";
import { runLab10History } from "../src/lab10_timetravel.js";

test("LAB_10 time travel replays from a prior sqlite checkpoint", async () => {
  const out = await runLab10History("lab10-history", "lab10-test.sqlite");
  assert.equal(out.finalState.n, 2);
  assert.equal(out.finalState.step, "B");
  assert.ok(out.beforeB);
  assert.deepEqual(out.beforeB.next, ["step_b"]);
  assert.equal(out.replayed.n, 2);
  assert.equal(out.replayed.step, "B");
  assert.ok(out.history.length >= 3);
});
