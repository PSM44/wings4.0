import { z } from "zod";
import { StateSchema, StateGraph, START, END } from "@langchain/langgraph";

const State = new StateSchema({
  input: z.string(),
  valid: z.boolean().optional(),
  result: z.string().optional(),
});

function validateInput(state) {
  const valid = typeof state.input === "string" && state.input.trim().length > 0;
  return { valid };
}

function produceResult(state) {
  if (!state.valid) {
    throw new Error("produce_result requires valid input");
  }
  return { result: `LAB01:${state.input.trim()}` };
}

export function buildLab01Graph() {
  return new StateGraph(State)
    .addNode("validate_input", validateInput)
    .addNode("produce_result", produceResult)
    .addEdge(START, "validate_input")
    .addEdge("validate_input", "produce_result")
    .addEdge("produce_result", END)
    .compile();
}

export async function runLab01(input) {
  const graph = buildLab01Graph();
  return graph.invoke({ input });
}
