import { z } from "zod";
import { StateSchema, StateGraph, START, END } from "@langchain/langgraph";

export const LAB02_MAX_RETRIES = 3;

const State = new StateSchema({
  input: z.string(),
  retries: z.number().default(0),
  status: z.string().optional(),
  result: z.string().optional(),
});

function validateInput(state) {
  const ok = state.input === "VALID";
  return { status: ok ? "valid" : "invalid" };
}

function correctInput(state) {
  const retries = (state.retries ?? 0) + 1;
  return { retries, status: "correcting" };
}

function produceResult(state) {
  return { result: `LAB02:${state.input}`, status: "ok" };
}

function failClosed(state) {
  return {
    status: "failed",
    result: `LAB02_FAIL_AFTER_${state.retries}_RETRIES`,
  };
}

function routeAfterValidate(state) {
  if (state.status === "valid") return "produce_result";
  if ((state.retries ?? 0) < LAB02_MAX_RETRIES) return "correct_input";
  return "fail_closed";
}

export function buildLab02Graph() {
  return new StateGraph(State)
    .addNode("validate_input", validateInput)
    .addNode("correct_input", correctInput)
    .addNode("produce_result", produceResult)
    .addNode("fail_closed", failClosed)
    .addEdge(START, "validate_input")
    .addConditionalEdges("validate_input", routeAfterValidate, [
      "produce_result",
      "correct_input",
      "fail_closed",
    ])
    .addEdge("correct_input", "validate_input")
    .addEdge("produce_result", END)
    .addEdge("fail_closed", END)
    .compile();
}

export async function runLab02(input) {
  const graph = buildLab02Graph();
  return graph.invoke({ input, retries: 0 });
}
