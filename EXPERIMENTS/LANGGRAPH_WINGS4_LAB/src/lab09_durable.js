import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import {
  StateSchema,
  StateGraph,
  START,
  END,
  interrupt,
  Command,
  MemorySaver,
} from "@langchain/langgraph";
import { SqliteSaver } from "@langchain/langgraph-checkpoint-sqlite";

export const LAB09_SOURCE_URL =
  "https://docs.langchain.com/oss/javascript/langgraph/checkpointers";
export const LAB09_RETRIEVAL_DATE = "2026-08-21";
export const LAB09_SQLITE_PACKAGE = "@langchain/langgraph-checkpoint-sqlite@1.0.4";
export const LAB09_PRODUCTION_READY = false;

const LAB_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const CHECKPOINTS_DIR = path.join(LAB_ROOT, "checkpoints");

const State = new StateSchema({
  input: z.string(),
  resumed: z.boolean().optional(),
  result: z.string().optional(),
});

function waitNode(state) {
  const ok = interrupt({ question: "resume durable lab thread", input: state.input });
  return { resumed: ok === true };
}

function doneNode(state) {
  return { result: `LAB09:${state.input}:resumed=${state.resumed}` };
}

export function buildLab09Graph(checkpointer) {
  return new StateGraph(State)
    .addNode("wait_for_resume", waitNode)
    .addNode("produce_result", doneNode)
    .addEdge(START, "wait_for_resume")
    .addEdge("wait_for_resume", "produce_result")
    .addEdge("produce_result", END)
    .compile({ checkpointer });
}

export function sqlitePath(name) {
  fs.mkdirSync(CHECKPOINTS_DIR, { recursive: true });
  return path.join(CHECKPOINTS_DIR, name);
}

export function openSqliteSaver(dbPath) {
  return SqliteSaver.fromConnString(dbPath);
}

export async function pauseLab09Sqlite(input, threadId, dbPath) {
  const checkpointer = openSqliteSaver(dbPath);
  const graph = buildLab09Graph(checkpointer);
  const config = { configurable: { thread_id: threadId } };
  const paused = await graph.invoke({ input }, config);
  return { paused, config, dbPath };
}

export async function resumeLab09Sqlite(threadId, dbPath) {
  const checkpointer = openSqliteSaver(dbPath);
  const graph = buildLab09Graph(checkpointer);
  const config = { configurable: { thread_id: threadId } };
  return graph.invoke(new Command({ resume: true }), config);
}

export async function compareMemorySaverCannotSurviveReconstruction(input, threadId) {
  const first = new MemorySaver();
  const graph1 = buildLab09Graph(first);
  const config = { configurable: { thread_id: threadId } };
  const paused = await graph1.invoke({ input }, config);
  const second = new MemorySaver();
  const graph2 = buildLab09Graph(second);
  let reconstructedError = null;
  let reconstructed = null;
  try {
    reconstructed = await graph2.invoke(new Command({ resume: true }), config);
  } catch (err) {
    reconstructedError = String(err && err.message ? err.message : err);
  }
  return {
    pausedHasInterrupt: Boolean(paused.__interrupt__),
    reconstructed,
    reconstructedError,
  };
}
