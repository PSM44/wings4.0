import { z } from "zod";
import { StateSchema, StateGraph, START, END } from "@langchain/langgraph";
import path from "node:path";
import { openSqliteSaver } from "./lab09_durable.js";

const State = new StateSchema({
  n: z.number(),
  step: z.string().optional(),
});

export function buildLab10Graph(checkpointer) {
  return new StateGraph(State)
    .addNode("step_a", (state) => ({ step: "A", n: state.n + 1 }))
    .addNode("step_b", (state) => ({ step: "B", n: state.n + 1 }))
    .addEdge(START, "step_a")
    .addEdge("step_a", "step_b")
    .addEdge("step_b", END)
    .compile({ checkpointer });
}

export async function runLab10History(threadId, dbPath) {
  if (typeof dbPath !== "string" || !dbPath.trim() || !path.isAbsolute(dbPath)) {
    throw new Error("runLab10History requires an explicit absolute dbPath");
  }
  const checkpointer = openSqliteSaver(dbPath);
  const graph = buildLab10Graph(checkpointer);
  const config = { configurable: { thread_id: threadId } };
  const finalState = await graph.invoke({ n: 0 }, config);
  const history = [];
  for await (const snap of graph.getStateHistory(config)) {
    history.push({
      next: snap.next,
      values: snap.values,
      checkpoint_id: snap.config?.configurable?.checkpoint_id,
      config: snap.config,
    });
  }
  const beforeB = history.find((snap) => Array.isArray(snap.next) && snap.next.includes("step_b"));
  let replayed = null;
  if (beforeB) {
    replayed = await graph.invoke(null, beforeB.config);
  }
  return { dbPath, finalState, history, beforeB, replayed };
}
