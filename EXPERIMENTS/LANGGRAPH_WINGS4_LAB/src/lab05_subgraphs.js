import { z } from "zod";
import { StateSchema, StateGraph, START, END } from "@langchain/langgraph";

export const writeLog = [];

const WorkerState = new StateSchema({
  unitId: z.string(),
  finding: z.string().optional(),
});

function readOnlyWorker(label) {
  return (state) => ({ finding: `${label}:${state.unitId}` });
}

export function buildWorkerGraph(label) {
  return new StateGraph(WorkerState)
    .addNode("read_only", readOnlyWorker(label))
    .addEdge(START, "read_only")
    .addEdge("read_only", END)
    .compile();
}

const ParentState = new StateSchema({
  unitId: z.string(),
  finding: z.string().optional(),
  workerA: z.string().optional(),
  workerB: z.string().optional(),
  integrated: z.string().optional(),
});

function integrateSerial(state) {
  writeLog.push({
    at: writeLog.length + 1,
    unitId: state.unitId,
    workerA: state.workerA,
    workerB: state.workerB,
  });
  return {
    integrated: `SERIAL:${state.workerA}|${state.workerB}`,
  };
}

function mapA(state) {
  return { workerA: state.finding };
}

function mapB(state) {
  return { workerB: state.finding };
}

export function buildLab05Graph() {
  writeLog.length = 0;
  const workerA = buildWorkerGraph("A");
  const workerB = buildWorkerGraph("B");
  return new StateGraph(ParentState)
    .addNode("worker_a", workerA)
    .addNode("map_a", mapA)
    .addNode("worker_b", workerB)
    .addNode("map_b", mapB)
    .addNode("integrate_serial", integrateSerial)
    .addEdge(START, "worker_a")
    .addEdge("worker_a", "map_a")
    .addEdge("map_a", "worker_b")
    .addEdge("worker_b", "map_b")
    .addEdge("map_b", "integrate_serial")
    .addEdge("integrate_serial", END)
    .compile();
}

export async function runLab05(unitId) {
  const graph = buildLab05Graph();
  return graph.invoke({ unitId });
}
