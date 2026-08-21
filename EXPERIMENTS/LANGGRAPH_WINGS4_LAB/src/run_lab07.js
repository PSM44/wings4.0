import { streamLab07 } from "./lab07_streaming.js";
const out = await streamLab07("stream-demo");
process.stdout.write(`${JSON.stringify(out.updates)}\n${out.finalState.result}\n`);
