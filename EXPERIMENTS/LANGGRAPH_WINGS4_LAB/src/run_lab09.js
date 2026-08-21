import fs from "node:fs";
import {
  pauseLab09Sqlite,
  resumeLab09Sqlite,
  sqlitePath,
  compareMemorySaverCannotSurviveReconstruction,
} from "./lab09_durable.js";

const dbPath = sqlitePath("lab09-demo.sqlite");
if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
const threadId = "lab09-demo";
await pauseLab09Sqlite("durable", threadId, dbPath);
const out = await resumeLab09Sqlite(threadId, dbPath);
process.stdout.write(`${out.result}\n`);
const memory = await compareMemorySaverCannotSurviveReconstruction("ram", "lab09-memory");
process.stdout.write(`MEMORY_RECONSTRUCT_ERROR=${Boolean(memory.reconstructedError)}\n`);
