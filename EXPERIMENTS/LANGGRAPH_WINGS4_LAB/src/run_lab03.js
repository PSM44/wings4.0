import { MemorySaver } from "@langchain/langgraph";
import { pauseLab03, resumeLab03 } from "./lab03_persistence.js";
const checkpointer = new MemorySaver();
const { graph, config } = await pauseLab03("thread-demo", "lab03-demo", checkpointer);
const out = await resumeLab03(graph, config);
process.stdout.write(`${out.result}\n`);
