import fs from "node:fs";
import path from "node:path";
import { FIXTURES_ROOT } from "./isolation.js";

export function loadLabFixture(name) {
  if (typeof name !== "string" || name.length === 0) {
    throw new Error("fixture name required");
  }
  if (path.isAbsolute(name) || name.includes("..") || name.includes("\\") || name.includes("/")) {
    throw new Error("filesystem boundary: fixture name must be a basename inside fixtures/");
  }
  const resolved = path.resolve(FIXTURES_ROOT, name);
  const fixturesRoot = path.resolve(FIXTURES_ROOT);
  if (resolved !== path.join(fixturesRoot, name)) {
    throw new Error("filesystem boundary: path escaped fixtures/");
  }
  if (!resolved.startsWith(fixturesRoot)) {
    throw new Error("filesystem boundary: fixture outside lab fixtures");
  }
  const raw = fs.readFileSync(resolved, "utf8");
  return JSON.parse(raw);
}
