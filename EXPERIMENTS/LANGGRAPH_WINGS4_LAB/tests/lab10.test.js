import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { test } from "node:test";

const execFileAsync = promisify(execFile);

async function runLab10(outputDir) {
  return execFileAsync(process.execPath, ["src/run_lab10.js"], {
    cwd: path.resolve("."),
    env: { ...process.env, LANGGRAPH_LAB_OUTPUT_DIR: outputDir },
  });
}

test("LAB_10 time travel replays from a prior sqlite checkpoint", async () => {
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), "20260822.103000_W4_LANGGRAPH_ISOLATION-lab10-"));
  const { stdout } = await runLab10(outputDir);
  const out = JSON.parse(stdout);
  assert.equal(out.final.n, 2);
  assert.equal(out.final.step, "B");
  assert.equal(out.replayed.n, 2);
  assert.equal(out.replayed.step, "B");
  assert.ok(out.history >= 3);
  assert.ok(fs.existsSync(path.join(outputDir, "lab10-demo.sqlite")));
});
