import { runLab01 } from "./lab01_deterministic.js";
const out = await runLab01("hello");
process.stdout.write(`${out.result}\n`);
