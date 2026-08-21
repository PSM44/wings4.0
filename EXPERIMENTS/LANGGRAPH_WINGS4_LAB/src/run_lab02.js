import { runLab02 } from "./lab02_conditional.js";
const out = await runLab02(process.argv[2] || "VALID");
process.stdout.write(`${out.status} ${out.result}\n`);
