import path from "node:path";
import { fileURLToPath } from "node:url";

export const LAB_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const FIXTURES_ROOT = path.join(LAB_ROOT, "fixtures");
export const PRODUCT_RUNTIME_FORBIDDEN = path.join(
  LAB_ROOT,
  "..",
  "..",
  "PRODUCT",
  "PUSH_FIRST_BRIEFING_RUNTIME"
);

export function assertLabIsolation() {
  if (process.env.WINGS4_LAB_ALLOW_PRODUCT_IMPORT === "YES") {
    throw new Error("product import override is not authorized in this laboratory");
  }
}
