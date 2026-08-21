import { MemorySaver } from "@langchain/langgraph";
import { startLab06, resumeLab06 } from "./lab06_pilot.js";
const checkpointer = new MemorySaver();
const { graph, config } = await startLab06("lab06-demo", checkpointer);
const out = await resumeLab06(graph, config, "approve");
process.stdout.write(`${out.briefing}\n`);
