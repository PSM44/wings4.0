import { MemorySaver } from "@langchain/langgraph";
import { proposeLab04, resumeLab04 } from "./lab04_hitl.js";
const checkpointer = new MemorySaver();
const { graph, config } = await proposeLab04("lab-change", "lab04-demo", checkpointer);
const out = await resumeLab04(graph, config, "approve");
process.stdout.write(`${out.outcome}\n`);
