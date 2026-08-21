# Wings4 LangGraph Laboratory

LAB_ID=LANGGRAPH_WINGS4_LAB
PRODUCTION=NO
PRODUCT_ADOPTION_AUTHORIZED=NO
LANGUAGE=JavaScript
LANGGRAPH_VERSION=1.4.12
LANGCHAIN_CORE_VERSION=1.2.9
ZOD_VERSION=4.4.3
RETRIEVAL_DATE=2026-08-21
OFFICIAL_OVERVIEW=https://docs.langchain.com/oss/javascript/langgraph/overview
AUTHORITY_DECISION=DEC-W4-091

## Purpose

Isolated educational laboratory for Pablo to learn and evaluate LangGraph against the current governed Wings4 approach.

This laboratory is not the S2/S2.3 product runtime.
It does not wrap, replace, or become a dependency of `PRODUCT/PUSH_FIRST_BRIEFING_RUNTIME`.

## Non-production boundary

- Do not add `@langchain/langgraph` to a repository-root package.
- Do not import this folder from product code.
- Do not call paid LLM APIs in automated tests.
- Do not read live child repositories.
- Do not create `00_STATE/WINGS4.OPEN_DECISION.CATALOG.md`.
- Do not implement S2.4, S3, or S4 here.
- `MemorySaver` is RAM-only. Official docs: it does not persist across process restart. It is not production durability.

## Prerequisites

- Node.js 20 or newer
- Network only for the one-time lab `npm install`
- No API keys required for core exercises

## Setup

```text
cd EXPERIMENTS/LANGGRAPH_WINGS4_LAB
npm install
```

Dependencies stay inside this folder's `node_modules`.

## Exercise order

1. LAB_01 deterministic graph
2. LAB_02 conditional routing
3. LAB_03 persistence and thread_id
4. LAB_04 human-in-the-loop
5. LAB_05 subgraphs and serial integration
6. LAB_06 Wings4 read-only fixture pilot

## How to run

```text
npm run lab01
npm run lab02
npm run lab03
npm run lab04
npm run lab05
npm run lab06
```

## How to test

```text
npm test
```

Automated tests must not call external LLM APIs.

## How to inspect graph/state

- LAB_03 and LAB_04/06 compile with `MemorySaver`.
- After a pause, `graph.getState({ configurable: { thread_id } })` shows checkpointed values.
- Interrupt payloads appear on `__interrupt__`.
- Resume with `new Command({ resume })`.

## How to reset lab state

- Stop the Node process. `MemorySaver` state is gone.
- Delete any local `checkpoints/`, `*.sqlite`, `.tmp/`, or `lab-output/` if created.
- Re-run `npm test`.

## Official references retrieved 2026-08-21

- https://docs.langchain.com/oss/javascript/langgraph/overview
- https://docs.langchain.com/oss/javascript/concepts/products
- https://docs.langchain.com/oss/javascript/langgraph/persistence
- https://docs.langchain.com/oss/javascript/langgraph/checkpointers
- https://docs.langchain.com/oss/javascript/langgraph/interrupts
- https://docs.langchain.com/oss/javascript/langgraph/graph-api
- https://www.npmjs.com/package/@langchain/langgraph
