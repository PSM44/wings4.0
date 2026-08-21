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
import { loadLabFixture } from "./fixtures.js";
import { assertLabIsolation } from "./isolation.js";

const State = new StateSchema({
  trigger: z.string(),
  snapshot: z.any().optional(),
  facts: z.array(z.string()).optional(),
  inferences: z.array(z.string()).optional(),
  recommendations: z.array(z.string()).optional(),
  unknowns: z.array(z.string()).optional(),
  classificationsValid: z.boolean().optional(),
  humanDecision: z.string().optional(),
  briefing: z.string().optional(),
});

function loadGovernedFixture(state) {
  assertLabIsolation();
  if (state.trigger !== "ON_DEMAND_REQUEST") {
    throw new Error("lab06 accepts only ON_DEMAND_REQUEST");
  }
  const snapshot = loadLabFixture("governed_snapshot.json");
  return { snapshot };
}

function deriveBriefing(state) {
  const snapshot = state.snapshot;
  return {
    facts: snapshot.facts,
    inferences: snapshot.inferences,
    recommendations: snapshot.recommendations,
    unknowns: snapshot.unknowns,
  };
}

function validateClassifications(state) {
  const ok =
    Array.isArray(state.facts) &&
    Array.isArray(state.inferences) &&
    Array.isArray(state.recommendations) &&
    Array.isArray(state.unknowns) &&
    state.snapshot.OPEN_DECISIONS === "UNKNOWN" &&
    state.snapshot.S2_4_AUTHORIZED === "NO";
  return { classificationsValid: ok };
}

function humanReview(state) {
  const decision = interrupt({
    kind: "HUMAN_REVIEW",
    facts: state.facts,
    inferences: state.inferences,
    recommendations: state.recommendations,
    unknowns: state.unknowns,
  });
  return { humanDecision: decision };
}

function returnTextSession(state) {
  const briefing = [
    "LAB06_WINGS4_READ_ONLY_PILOT",
    "NOT_EQUIVALENT_TO_ACCEPTED_S2_RUNTIME",
    `TRIGGER=${state.trigger}`,
    `HUMAN_DECISION=${state.humanDecision}`,
    `CLASSIFICATIONS_VALID=${state.classificationsValid}`,
    "FACT:",
    ...(state.facts ?? []).map((line) => `- ${line}`),
    "INFERENCE:",
    ...(state.inferences ?? []).map((line) => `- ${line}`),
    "RECOMMENDATION:",
    ...(state.recommendations ?? []).map((line) => `- ${line}`),
    "UNKNOWN:",
    ...(state.unknowns ?? []).map((line) => `- ${line}`),
    "OPEN_DECISIONS=UNKNOWN",
    "S2_4_AUTHORIZED=NO",
  ].join("\n");
  return { briefing };
}

export function buildLab06Graph(checkpointer = new MemorySaver()) {
  const graph = new StateGraph(State)
    .addNode("load_governed_fixture", loadGovernedFixture)
    .addNode("derive_briefing", deriveBriefing)
    .addNode("validate_classifications", validateClassifications)
    .addNode("human_review", humanReview)
    .addNode("return_text_session", returnTextSession)
    .addEdge(START, "load_governed_fixture")
    .addEdge("load_governed_fixture", "derive_briefing")
    .addEdge("derive_briefing", "validate_classifications")
    .addEdge("validate_classifications", "human_review")
    .addEdge("human_review", "return_text_session")
    .addEdge("return_text_session", END)
    .compile({ checkpointer });
  return { graph, checkpointer };
}

export async function startLab06(threadId, checkpointer) {
  const { graph } = buildLab06Graph(checkpointer);
  const config = { configurable: { thread_id: threadId } };
  const paused = await graph.invoke({ trigger: "ON_DEMAND_REQUEST" }, config);
  return { graph, paused, config };
}

export async function resumeLab06(graph, config, decision) {
  return graph.invoke(new Command({ resume: decision }), config);
}
