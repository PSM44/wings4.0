import path from "node:path";
import { requireLabOutputDir } from "./lab09_durable.js";
import { runLab10History } from "./lab10_timetravel.js";

const outputDir = requireLabOutputDir(process.env.LANGGRAPH_LAB_OUTPUT_DIR);
const out = await runLab10History("lab10-demo", path.join(outputDir, "lab10-demo.sqlite"));
process.stdout.write(`${JSON.stringify({ final: out.finalState, replayed: out.replayed, history: out.history.length })}\n`);
