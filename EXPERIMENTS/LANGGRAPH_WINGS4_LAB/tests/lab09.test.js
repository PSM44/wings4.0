import assert from "node:assert/strict";
import fs from "node:fs";
import { test } from "node:test";
import {
  pauseLab09Sqlite,
  resumeLab09Sqlite,
  sqlitePath,
  compareMemorySaverCannotSurviveReconstruction,
  LAB09_PRODUCTION_READY,
} from "../src/lab09_durable.js";

test("LAB_09 sqlite checkpoint survives reconstructed saver on same thread_id", async () => {
  const dbPath = sqlitePath("lab09-test.sqlite");
  if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
  const threadId = "lab09-persist";
  const { paused } = await pauseLab09Sqlite("persist", threadId, dbPath);
  assert.ok(paused.__interrupt__);
  assert.ok(fs.existsSync(dbPath));
  const resumed = await resumeLab09Sqlite(threadId, dbPath);
  assert.equal(resumed.result, "LAB09:persist:resumed=true");
  assert.equal(LAB09_PRODUCTION_READY, false);
});

test("LAB_09 MemorySaver reconstruction cannot resume the same thread", async () => {
  const memory = await compareMemorySaverCannotSurviveReconstruction("ram", "lab09-memory");
  assert.equal(memory.pausedHasInterrupt, true);
  assert.equal(memory.reconstructedError, null);
  assert.equal(memory.reconstructed.result, undefined);
  assert.equal(Boolean(memory.reconstructed.__interrupt__), false);
});
