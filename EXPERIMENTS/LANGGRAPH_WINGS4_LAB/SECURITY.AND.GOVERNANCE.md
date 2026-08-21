# LangGraph lab security and governance

LAB_ID=LANGGRAPH_WINGS4_LAB
AUTHORITY_DECISION=DEC-W4-091
LANGGRAPH_VERSION=1.4.12
LICENSE_LANGGRAPH=MIT
RETRIEVAL_DATE=2026-08-21

## HUMAN remains above runtime

HUMAN authority outranks LangGraph state, interrupts, checkpoints, and this laboratory.

`interrupt()` is a mechanism. It is not Pablo's authority and it is not a DEC-W4 decision.

Persistent or in-memory graph state is not canon. Canon remains the decision log, roadmap, architecture, and accepted S2 runtime.

## Secrets policy

- Core exercises and automated tests require no API keys.
- Do not commit `.env`.
- Optional real-model integration is unauthorized in this recording and must stay disabled by default.
- Automated tests must not call external LLM APIs.

## Filesystem boundaries

- Fixture loader accepts only a basename under `fixtures/`.
- No child-project repository access.
- No live web.
- No mutation of Wings4 product state.
- No creation of `00_STATE/WINGS4.OPEN_DECISION.CATALOG.md`.

## Tool allowlists

Allowed in this lab:

- local Node graph invoke/test;
- reading lab fixtures;
- writing lab-local ignored scratch if later needed.

Forbidden:

- product runtime mutation;
- HUMAN/ mutation;
- child-repo reads;
- network model calls in tests.

## Idempotency and replay

Official JS interrupt docs: on resume the node restarts from the beginning, so code before `interrupt()` runs again. Side-effecting work belongs after approval. LAB_04 uses an `applied` flag.

## Replay risks

- Replaying a node can repeat pre-interrupt work.
- `MemorySaver` is lost on process restart.
- Do not treat lab checkpoints as audit evidence.

## Dependency and license evidence

- `@langchain/langgraph@1.4.12` MIT, retrieved 2026-08-21 from npm and https://docs.langchain.com/oss/javascript/langgraph/overview
- `@langchain/core@1.2.9`
- `zod@4.4.3` (peer of LangGraph)

## No production mutation

This lab must not be imported by `PRODUCT/PUSH_FIRST_BRIEFING_RUNTIME`.
LangGraph product adoption is not authorized.
S2/S2.3 remain accepted.
S2.4/S3/S4 remain unauthorized.
