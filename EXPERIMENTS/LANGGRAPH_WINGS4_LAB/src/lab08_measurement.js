import { performance } from "node:perf_hooks";
import { runLab01 } from "./lab01_deterministic.js";
import { runLab02 } from "./lab02_conditional.js";
import { MemorySaver } from "@langchain/langgraph";
import { proposeLab04, resumeLab04 } from "./lab04_hitl.js";

function percentile(sorted, p) {
  if (sorted.length === 0) return null;
  const idx = Math.min(sorted.length - 1, Math.max(0, Math.ceil((p / 100) * sorted.length) - 1));
  return sorted[idx];
}

async function timeMany(label, n, fn) {
  const samples = [];
  for (let i = 0; i < n; i += 1) {
    const t0 = performance.now();
    await fn(i);
    samples.push(performance.now() - t0);
  }
  const sorted = [...samples].sort((a, b) => a - b);
  return {
    label,
    n,
    min_ms: Number(sorted[0].toFixed(3)),
    median_ms: Number(percentile(sorted, 50).toFixed(3)),
    p95_ms: Number(percentile(sorted, 95).toFixed(3)),
    max_ms: Number(sorted[sorted.length - 1].toFixed(3)),
  };
}

export async function measureLabPerformance({ iterations = 25 } = {}) {
  const lab01 = await timeMany("LAB_01_invoke", iterations, async (i) => {
    await runLab01(`m${i}`);
  });
  const lab02 = await timeMany("LAB_02_fail_closed", Math.min(10, iterations), async () => {
    await runLab02("INVALID");
  });
  const lab04 = await timeMany("LAB_04_approve", Math.min(10, iterations), async (i) => {
    const checkpointer = new MemorySaver();
    const { graph, config } = await proposeLab04(`p${i}`, `thread-m-${i}`, checkpointer);
    await resumeLab04(graph, config, "approve");
  });
  return {
    measured_at: new Date().toISOString(),
    runtime: "node",
    langgraph: "1.4.12",
    note: "Wall-clock of isolated lab graphs. Not a product SLA. MemorySaver is in-process only.",
    results: [lab01, lab02, lab04],
  };
}
