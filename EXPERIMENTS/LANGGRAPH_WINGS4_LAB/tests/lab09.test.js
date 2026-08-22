import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { test } from "node:test";
import {
  compareMemorySaverCannotSurviveReconstruction,
  LAB09_PRODUCTION_READY,
} from "../src/lab09_durable.js";

const execFileAsync = promisify(execFile);

async function runLab09(outputDir) {
  return execFileAsync(process.execPath, ["src/run_lab09.js"], {
    cwd: path.resolve("."),
    env: { ...process.env, LANGGRAPH_LAB_OUTPUT_DIR: outputDir },
  });
}

test("LAB_09 sqlite checkpoint survives reconstructed saver on same thread_id", async () => {
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), "20260822.103000_W4_LANGGRAPH_ISOLATION-lab09-"));
  const { stdout } = await runLab09(outputDir);
  assert.match(stdout, /LAB09:durable:resumed=true/);
  assert.match(stdout, /MEMORY_RECONSTRUCT_ERROR=false/);
  assert.ok(fs.existsSync(path.join(outputDir, "lab09-demo.sqlite")));
  assert.equal(LAB09_PRODUCTION_READY, false);
});

test("LAB_09 MemorySaver reconstruction cannot resume the same thread", async () => {
  const memory = await compareMemorySaverCannotSurviveReconstruction("ram", "lab09-memory");
  assert.equal(memory.pausedHasInterrupt, true);
  assert.equal(memory.reconstructedError, null);
  assert.equal(memory.reconstructed.result, undefined);
  assert.equal(Boolean(memory.reconstructed.__interrupt__), false);
});
