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
  proposal: z.string(),
  decision: z.string().optional(),
  editedProposal: z.string().optional(),
  sideEffectCount: z.number().default(0),
  applied: z.boolean().optional(),
  outcome: z.string().optional(),
});

function prepareProposal(state) {
  return { proposal: state.proposal };
}

function humanReview(state) {
  const decision = interrupt({
    proposal: state.proposal,
    options: ["approve", "edit", "reject"],
  });
  if (typeof decision === "string") {
    return { decision };
  }
  return {
    decision: decision.action,
    editedProposal: decision.editedProposal,
  };
}

function applyAfterApproval(state) {
  if (state.decision === "reject") {
    return { applied: false, outcome: "REJECTED" };
  }
  if (state.decision === "edit" && !state.editedProposal) {
    return { applied: false, outcome: "EDIT_MISSING" };
  }
  if (state.applied) {
    return { outcome: "IDEMPOTENT_SKIP", applied: true };
  }
  const text = state.decision === "edit" ? state.editedProposal : state.proposal;
  return {
    applied: true,
    sideEffectCount: (state.sideEffectCount ?? 0) + 1,
    outcome: `APPLIED:${text}`,
  };
}

export function buildLab04Graph(checkpointer = new MemorySaver()) {
  const graph = new StateGraph(State)
    .addNode("prepare_proposal", prepareProposal)
    .addNode("human_review", humanReview)
    .addNode("apply_after_approval", applyAfterApproval)
    .addEdge(START, "prepare_proposal")
    .addEdge("prepare_proposal", "human_review")
    .addEdge("human_review", "apply_after_approval")
    .addEdge("apply_after_approval", END)
    .compile({ checkpointer });
  return { graph, checkpointer };
}

export async function proposeLab04(proposal, threadId, checkpointer) {
  const { graph } = buildLab04Graph(checkpointer);
  const config = { configurable: { thread_id: threadId } };
  const paused = await graph.invoke({ proposal, sideEffectCount: 0 }, config);
  return { graph, paused, config };
}

export async function resumeLab04(graph, config, decision) {
  return graph.invoke(new Command({ resume: decision }), config);
}
