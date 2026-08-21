# Lab measurement evidence

MEASUREMENT_ID=W4_LANGGRAPH_LAB08_20260821
PRODUCT_ADOPTION_AUTHORIZED=NO
NOT_A_PRODUCT_SLA=YES
HOST=local Node.js
LANGGRAPH_VERSION=1.4.12
MEASURED_AT=2026-08-21T16:55:01.942Z

Command: `node src/run_lab08.js` inside `EXPERIMENTS/LANGGRAPH_WINGS4_LAB`.

| LABEL | N | MIN_MS | MEDIAN_MS | P95_MS | MAX_MS |
|---|---|---|---|---|---|
| LAB_01_invoke | 15 | 2.830 | 3.749 | 34.192 | 34.192 |
| LAB_02_fail_closed | 10 | 7.858 | 8.955 | 12.084 | 12.084 |
| LAB_04_approve | 10 | 5.091 | 5.629 | 21.584 | 21.584 |

Notes:

- FACT: These are wall-clock samples of isolated lab graphs on this machine.
- INFERENCE: Cold-start / first-sample inflation is visible in p95=max for LAB_01 and LAB_04.
- RECOMMENDATION: Do not treat these numbers as an S2 replacement SLA.
- UNKNOWN: No comparable instrumented S2 CLI latency series was collected in this run (lab isolation: no product-runtime import).
- MemorySaver remains RAM-only and is not durability evidence.
