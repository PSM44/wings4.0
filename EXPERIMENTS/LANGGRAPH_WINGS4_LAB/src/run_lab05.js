import { runLab05, writeLog } from "./lab05_subgraphs.js";
const out = await runLab05("unit-1");
process.stdout.write(`${out.integrated} writes=${writeLog.length}\n`);
