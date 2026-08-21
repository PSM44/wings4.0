import { measureLabPerformance } from "./lab08_measurement.js";
const out = await measureLabPerformance({ iterations: 15 });
process.stdout.write(`${JSON.stringify(out, null, 2)}\n`);
