import { z } from "zod";
import { StateSchema, StateGraph, START, END } from "@langchain/langgraph";

const State = new StateSchema({
  input: z.string(),
  validated: z.boolean().optional(),
  result: z.string().optional(),
});

export function buildLab07Graph() {
  return new StateGraph(State)
    .addNode("validate_input", (state) => ({
      validated: state.input.trim().length > 0,
    }))
    .addNode("produce_result", (state) => ({
      result: `LAB07:${state.input}`,
    }))
    .addEdge(START, "validate_input")
    .addEdge("validate_input", "produce_result")
    .addEdge("produce_result", END)
    .compile();
}

export async function streamLab07(input) {
  const graph = buildLab07Graph();
  const updates = [];
  for await (const event of await graph.stream(
    { input },
    { streamMode: "updates" }
  )) {
    updates.push(event);
  }
  const finalState = await graph.invoke({ input });
  return { updates, finalState };
}
