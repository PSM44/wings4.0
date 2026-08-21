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

const State = new StateSchema({
  input: z.string(),
  checkpointed: z.boolean().optional(),
  resumed: z.boolean().optional(),
  result: z.string().optional(),
});

function markCheckpoint(state) {
  return { checkpointed: true };
}

function waitForResume(state) {
  const resumeValue = interrupt({
    question: "resume this lab thread",
    input: state.input,
  });
  return { resumed: resumeValue === true };
}

function produceResult(state) {
  return { result: `LAB03:${state.input}:resumed=${state.resumed}` };
}

export function buildLab03Graph(checkpointer = new MemorySaver()) {
  const graph = new StateGraph(State)
    .addNode("mark_checkpoint", markCheckpoint)
    .addNode("wait_for_resume", waitForResume)
    .addNode("produce_result", produceResult)
    .addEdge(START, "mark_checkpoint")
    .addEdge("mark_checkpoint", "wait_for_resume")
    .addEdge("wait_for_resume", "produce_result")
    .addEdge("produce_result", END)
    .compile({ checkpointer });
  return { graph, checkpointer };
}

export async function pauseLab03(input, threadId, checkpointer) {
  const { graph } = buildLab03Graph(checkpointer);
  const config = { configurable: { thread_id: threadId } };
  const paused = await graph.invoke({ input }, config);
  return { graph, paused, config };
}

export async function resumeLab03(graph, config) {
  return graph.invoke(new Command({ resume: true }), config);
}
