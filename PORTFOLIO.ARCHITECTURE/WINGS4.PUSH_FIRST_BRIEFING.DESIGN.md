# Wings4 Push-First Briefing — Bounded Design

Status: DESIGN_ONLY
Authority: DEC-W4-077 Option B, DEC-W4-078, Q-095, HUMAN/HUMAN.WINGS4.md push-first interaction
Authorization: `W4_PUSH_FIRST_BRIEFING_DESIGN_ONLY_027`
Runtime: NOT_AUTHORIZED / NOT_IMPLEMENTED

This document designs a bounded briefing. It does not implement a product surface, scheduler, scanner, or runtime. It does not reopen MD1.

## Purpose

Answer three operator questions from Wings-held state only, before pull exploration:

1. What changed?
2. What matters?
3. What needs a human decision next?

The briefing is **push-first** in the identity sense: Wings should surface material Wings-held change, desynchronization, open decisions, and unknowns first. It is **pull-supported**: Pablo may still request the same briefing on demand.

Daily user outcome (bounded): before Pablo starts work, Wings can present a single structured briefing of already-held portfolio/product state, with UNKNOWN where evidence is missing.

## Non-goals

This design does **not** authorize or specify:

- briefing runtime, UI, or auto-display in Ring0;
- MARKET_MONITORING (no schedule, crawl, watch, or background discovery);
- RADAR;
- live web search or live web monitoring;
- child-repository read or mutation, including `C:\01. GitHub\Skills`;
- independent resynchronization beyond Ring2 return verification;
- Ring3+;
- capture form;
- auto-delivery;
- temp-path write;
- COPY lifecycle change;
- polling, file watching, git hooks on child roots, or network calls;
- Market Check generalization beyond the bounded Ring0 runtime/demo (DEC-W4-071);
- SESSION_CONTINUE/canon refresh (separate deferred work);
- WHOAMI/`finding_class` overlay or second-entity diagnostic.

Presentations, BATON, architecture, and this design file alone are not product functionality. Runtime remains a later human-authorized slice.

## Current bounded context (do not treat as live child intelligence)

- `MARKET_CHECK_RUNTIME_COMPLETE=YES` for the bounded Ring0 runtime/demo only. Do not generalize.
- GAP_01 and GAP_02 addressed (DEC-W4-073).
- GAP_03 fact-fallback and class help addressed (DEC-W4-074); WHOAMI/class-code overlay deferred (DEC-W4-055).
- GAP_04 transfer help addressed (DEC-W4-075); COPY lifecycle unchanged.
- GAP_05 = `ACCEPTED_LIMITATION_FOR_RING0` (DEC-W4-076 Option A). Fixture/Wings-held evidence is not a live child-repository read.
- DEC-W4-077 Option B selected: bounded push-first briefing **design-only**.
- MD1 remains closed. Historical GAP list in DEC-W4-062 is not rewritten.
- Ring3, RADAR, MARKET_MONITORING, live web, and child read remain unauthorized.

## Allowed evidence sources

Only Wings-held, already-local sources:

- `HUMAN/HUMAN.WINGS4.md` and other Wings4 HUMAN canon already in this repository;
- `PORTFOLIO.DECISION_LOG.md`;
- `PORTFOLIO.PRINCIPLES.md`;
- `00_STATE/BATON.WINGS4.ACTIVE.md`;
- `MIGRATION.BACKLOG.md`;
- `PORTFOLIO.ARCHITECTURE/` files in this repository;
- Wings4.0 local git state for **this** repository only (branch, HEAD, dirty/index as observed in the current session);
- Ring0 fixture / Wings-held diagnostic records already stored under `PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/` (fixture JSON is Wings-held, not a live child read);
- recorded Market Check results already held in that fixture/demo state.

Every briefing claim must name its source. Missing source = UNKNOWN.

## Forbidden evidence sources

- `C:\01. GitHub\Skills` and any other child-project root;
- `AI.History/`;
- live web, search, crawl, or scrape;
- RADAR outputs or RADAR invocation;
- MARKET_MONITORING schedules, watches, or discovery engines;
- inferred external facts (prices, tool fitness, live market status, live child HEAD, live working-tree of another project);
- operator free-text “shopping” intake;
- network calls.

If a needed fact is not in an allowed source, the briefing must say UNKNOWN. It must not guess.

## Not monitoring / not RADAR / not live web

Required wording in every briefing instance (runtime, when later authorized) and in this design:

- This briefing is **not MARKET_MONITORING**.
- This briefing is **not RADAR**.
- This briefing is **not live web monitoring** and does **not** search the web.
- This briefing does **not** read or mutate child repositories.
- Evidence is Wings-held only. GAP_05 remains an accepted Ring0 limitation: fixture/Wings-held is not live child-repository intelligence.
- Bounded Market Check complete (DEC-W4-071) is not live market intelligence and is not Wings4 complete.

## Trigger model

Triggers are **human-session or human-request events**, not machines watching the world.

| Trigger | Allowed in this design | Meaning |
|---|---|---|
| SESSION_START_PRESENTATION | YES (design) | When an operator/ORCHESTRATOR session starts, the briefing may be the first structured output, built from Wings-held sources at that moment. |
| ON_DEMAND_REQUEST | YES (design) | Pablo asks for the briefing. Same schema. No free-text scan target. |
| AFTER_RECORDED_HUMAN_DECISION | YES (design) | After a new Wings4 decision is recorded in `PORTFOLIO.DECISION_LOG.md`, a later briefing may include that record as Wings-held change. |

Forbidden triggers (now and until separately authorized):

- cron / interval / scheduled job;
- filesystem watchers;
- child-repository fetch, pull, or status;
- web polling;
- RADAR request;
- MARKET_MONITORING profile;
- auto-run on page load of the Ring0 demo.

Push-first does **not** mean background surveillance. It means: when the human is here, Wings speaks first from what it already holds.

## Briefing sections (first schema)

A briefing instance contains **exactly** these sections, in this order. No additional sections in v0.

### 1. PROJECT_STATE

Wings4-local operating snapshot.

| Field | Rule |
|---|---|
| `root` | Must be `C:\01. GitHub\Wings4.0` |
| `branch` | From Wings4 git |
| `head` | Runtime git HEAD |
| `md1_status` | CLOSED unless evidence says otherwise; do not reopen |
| `market_check_runtime_complete` | YES bounded Ring0 demo only, or UNKNOWN |
| `gap_05` | `ACCEPTED_LIMITATION_FOR_RING0` |
| `briefing_runtime` | NOT_IMPLEMENTED until a later authorization |

### 2. SINCE_LAST_DECISION

What Wings already recorded since the previous briefing or, if none, since the last closed decision cited.

| Field | Rule |
|---|---|
| `last_decision_id` | Latest DEC-W4-* from the decision log, or UNKNOWN |
| `last_decision_summary` | One sentence from the log; do not invent |
| `source` | Pointer into `PORTFOLIO.DECISION_LOG.md` |

### 3. MATERIAL_CHANGES

Only changes evidenced in allowed sources (new decisions, BATON next-action changes, backlog status changes, Wings4 git HEAD movement observed in-session).

| Field | Rule |
|---|---|
| `changes[]` | Each item: fact, source pointer, confidence |
| `empty_means` | If none evidenced: state “No Wings-held material change recorded” — do not scan children to fill the list |

### 4. OPEN_DECISIONS

Decisions still pending, deferred, or separately authorized later. Include deferred items that this slice must not absorb:

- WHOAMI/`finding_class` terminology (DEC-W4-055);
- COPY-as-export vs clipboard-only (DEC-W4-075);
- SESSION_CONTINUE/canon refresh;
- second-entity diagnostic (DEC-W4-077 Option A, not selected).

| Field | Rule |
|---|---|
| `open[]` | id, status, why it remains open, source |
| `not_this_slice` | Items this briefing must not convert into implementation |

### 5. RISKS_AND_BOUNDARIES

Contamination, overclaim, and authorization risks.

Required bullets when applicable:

- Ring0 fixture is not live child state (GAP_05);
- Market Check bounded complete is not Wings4 complete;
- SESSION_CONTINUE may be stale vs runtime HEAD;
- design-only briefing must not be treated as runtime.

### 6. RECOMMENDED_NEXT_ACTION

One recommended next action. Must be within current authorization. Must distinguish FACT / INFERENCE / RECOMMENDATION. If evidence is insufficient: UNKNOWN.

### 7. HUMAN_DECISION_OPTIONS

Pablo decides. The briefing never executes a product or child change.

Each instance must offer at least two options, typically:

- accept the recommended next action;
- defer;
- request missing evidence / keep UNKNOWN.

No option may imply child read, live web, RADAR, MARKET_MONITORING, or briefing runtime unless a **separate** later decision already authorized that work.

### 8. EVIDENCE_LIMITS

Always present.

Must include:

- `NOT_MARKET_MONITORING`
- `NOT_RADAR`
- `NOT_LIVE_WEB`
- `NO_CHILD_REPOSITORY_READ`
- `NO_CHILD_PROJECT_MUTATION`
- `GAP_05_ACCEPTED_LIMITATION_FOR_RING0`
- `BRIEFING_RUNTIME=NOT_IMPLEMENTED` until separately authorized
- stale-data warnings from the rules below

## Human decision contract

1. The briefing recommends; it does not decide.
2. FACT, INFERENCE, RECOMMENDATION, and UNKNOWN stay distinct (principle 12).
3. Pablo’s choice is recorded in `PORTFOLIO.DECISION_LOG.md` by a later authorized task, not silently.
4. Selecting a briefing option does not mutate product code, child projects, or COPY lifecycle.
5. Missing evidence stays UNKNOWN. Do not convert UNKNOWN into certainty.

## Stale-data warning rules

Emit a visible warning, and do not hide it in prose, when any of these hold:

| Condition | Warning code | Briefing behavior |
|---|---|---|
| BATON `HEAD_AT_GENERATION` ≠ runtime git HEAD | `STALE_BATON_HEAD` | Use runtime git as truth for HEAD; cite BATON as historical bootstrap only |
| SESSION_CONTINUE `HEAD_AT_GENERATION` ≠ runtime git HEAD | `STALE_SESSION_CONTINUE` | Warn; do not refresh SESSION_CONTINUE in this design (separate deferred work) |
| A claim would require live child state | `NOT_LIVE_CHILD_STATE` | Set that claim UNKNOWN; cite GAP_05 |
| A claim would require live web or market scan | `NOT_LIVE_MARKET` | Set that claim UNKNOWN; cite DEC-W4-071 bounded-demo limit |
| Fixture/Wings-held Market Check used as if live | `FIXTURE_HELD_NOT_LIVE` | Label as Wings-held / fixture |
| Briefing consumed as if a running product feature | `DESIGN_ONLY_NOT_RUNTIME` | State runtime is not implemented |

Never repair staleness by reading a child repository or the web.

## Acceptance criteria (design)

This design is accepted when:

1. The three operator questions are answered only from allowed Wings-held sources.
2. The schema has exactly the eight sections above.
3. Non-goals and forbidden sources are explicit.
4. Triggers exclude polling, child watches, RADAR, and MARKET_MONITORING.
5. Stale-data warnings are defined and mandatory.
6. Required “not monitoring / not RADAR / not live web” wording is specified.
7. Human decision options are required; the briefing cannot self-execute.
8. Runtime, UI, tests, README, acceptance, and product code remain unchanged by this slice.

Validation of this design is a separate read-only review (`PUSH_FIRST_BRIEFING_DESIGN_VALIDATION`). Validation is not implementation.

## Explicit prohibitions

- `BRIEFING_RUNTIME_IMPLEMENTED=NO`
- `MARKET_MONITORING_IMPLEMENTED=NO`
- `RADAR_IMPLEMENTED=NO`
- `LIVE_WEB_MONITORING=NO`
- `CHILD_REPOSITORY_READ=NO`
- `RING3_IMPLEMENTED=NO`
- `CAPTURE_FORM_IMPLEMENTED=NO`
- `MD1_REOPENED=NO`
