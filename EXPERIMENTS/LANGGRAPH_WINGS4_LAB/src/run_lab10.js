import { runLab10History } from "./lab10_timetravel.js";
const out = await runLab10History("lab10-demo");
process.stdout.write(`${JSON.stringify({ final: out.finalState, replayed: out.replayed, history: out.history.length })}\n`);
