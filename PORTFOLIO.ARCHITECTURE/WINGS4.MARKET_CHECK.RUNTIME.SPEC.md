# Wings4 Market Check — Bounded On-Demand Runtime Spec

Status: ACTIVE_BOUNDED_SLICE
Authority: DEC-W4-061, DEC-W4-063, DEC-W4-066, DEC-W4-067, Q-098, Q-099, Q-101, PR-PORT-006
Prototype: `PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/`
Engine: `PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/market_check.engine.js`

## Purpose

Market Check is an on-demand decision-support slice. When a material build/project decision may already have an internal or external solution, the operator can ask Wings to compare bounded, Wings-held evidence and recommend whether to reuse, adopt, integrate, build a residual gap, defer, or stop.

It is **not**:

- MARKET_MONITORING (no schedule, crawl, watch, or background discovery);
- RADAR;
- Ring3 / independent resynchronization;
- live web search;
- child-repository read or mutation;
- autonomous adoption or portfolio automation.

Discovery does not authorize adoption. The human decides.

## User outcome

From the existing diagnosis surface, the operator:

1. selects a finding;
2. chooses one governed Market Check question (no free-text question);
3. clicks **Run Market Check**;
4. reads a management-facing result: target, question, alternatives first, then recommendation, confidence, scope, authority, limits;
5. sees **UNKNOWN** when evidence is missing, with what is missing and a bounded next action.

Market Check does not add a fifth workflow stage. It sits inside Understand, after finding alternatives and before the finding recommendation.

## Evaluation order (Q-099 / PR-PORT-006)

1. SAME_PROJECT — already exists in this project
2. PORTFOLIO_REUSABLE — reusable elsewhere in the portfolio
3. SKILL_GRC — reusable Skill or GRC
4. INTEGRATE — integrate an existing named solution
5. OPEN_SOURCE — suitable open-source option
6. COMMERCIAL — suitable commercial option
7. RESIDUAL_CUSTOM — justified remaining custom build (BUILD)

First evidenced class in this order becomes the recommendation unless the question is defer/stop.

## Recommendation vocabulary

| Code | Management label |
|---|---|
| REUSE_SAME_PROJECT | Use what this project already has |
| REUSE_PORTFOLIO | Reuse a portfolio capability |
| ADOPT_SKILL_GRC | Adopt a Skill or GRC |
| ADOPT_OPEN_SOURCE | Adopt a suitable open-source tool |
| ADOPT_COMMERCIAL | Adopt a suitable commercial tool |
| BUILD_RESIDUAL | Build only the remaining gap |
| INTEGRATE | Integrate an existing solution |
| DEFER | Defer this work |
| KILL | Stop this work |
| UNKNOWN | Unknown — evidence is missing |

## UNKNOWN contract (Q-101)

If catalog evidence is absent, incomplete, or marked missing:

- do not invent a market, tool, price, or fitness score;
- set recommendation = UNKNOWN;
- state why evidence is insufficient;
- state what evidence would resolve it;
- state a bounded next action (collect evidence, keep UNKNOWN, or use the finding path).

## Evidence policy

- Source: Wings-held canon/fixture catalog only (`CANONICAL_DERIVED` or explicitly `REPRESENTATIVE_NONCANONICAL`).
- GAP_05 remains: fixture/Wings-held evidence is not a live child-repository read.
- No network calls. No SkillsMachine file access.

## Evidence levels (governed)

| Level | Meaning | Allowed now |
|---|---|---|
| WINGS_HELD | Named evidence already in Wings canon/fixture | YES |
| HUMAN_PROVIDED | Named evidence supplied by the human and already held in this repository | YES, only if the record exists; do not prompt free-text market shopping |
| EXTERNAL_CHECKED | Wings-held record that a prior human-authorized named check already happened | Defined; MANUAL_RECORD pending; not a live web search |
| UNKNOWN | Evidence is missing or insufficient | YES; required when any other level cannot be proven |

EXTERNAL_CHECKED never authorizes crawling, scheduling, RADAR, or MARKET_MONITORING. Allowed method in this slice: `MANUAL_RECORD` of a named prior check already held in Wings. If no such record exists, the level is pending and the alternative stays UNKNOWN.

## Completion criteria (`MARKET_CHECK_RUNTIME_COMPLETE=YES`)

All of the following are required. Meeting a subset does not allow the flag.

1. On-demand only: no auto-run, no background watch, no MARKET_MONITORING, no RADAR, no Ring3.
2. Governed evidence levels above are in the runtime and visible on the operator result.
3. Result always includes: target, question, alternatives before recommendation, evidence level, UNKNOWN handling, authority, scope limits, confidence.
4. Logical tests exercise the option set: USE_EXISTING, BUILD, INTEGRATE, DEFER, REJECT/KILL, UNKNOWN — as a winning recommendation or as an explicit catalog alternative.
5. UNKNOWN is produced when evidence is missing; no fabricated buy/build/price/fitness.
6. Human-live validation PASS for on-demand invoke and for the UNKNOWN recommendation path.
7. No child-repository access; no live web scan; discovery does not authorize adoption.

Current status: **MARKET_CHECK_RUNTIME_COMPLETE=NO**.

Recorded live UI evidence (DEC-W4-067; HEAD `3063dad`):

- F-MC-001 BUILD live UI validation = PASS
- F-MC-002 INTEGRATE live UI validation = PASS
- UNKNOWN remains available
- Method: LOCAL_CHROME_CDP (Cursor browser MCP unavailable)

Reasons this slice does not claim complete:

- HUMAN_PROVIDED remains `HUMAN_PROVIDED_SAMPLE` / not production evidence.
- EXTERNAL_CHECKED remains a `MANUAL_RECORD` contract pending a named human-authorized check. No live web search.
- Meeting a subset of the criteria above does not allow `MARKET_CHECK_RUNTIME_COMPLETE=YES`.

## Result record (Wings4-local)

- `check_id`, `finding_id`, `question_id`
- `invoked_on_demand=YES`
- `recommendation`, `recommendation_label`, `confidence`
- `fact`, `inference`
- `alternatives` (always before relying on the recommendation)
- `scope`, `authority`, `limits`
- `evidence_level` (`WINGS_HELD` | `HUMAN_PROVIDED` | `EXTERNAL_CHECKED` | `UNKNOWN`)
- `unknown_reason`, `required_evidence`, `next_action` when UNKNOWN
- `limits` must include: NOT_MARKET_MONITORING, NOT_RADAR, NOT_RING3, NO_CHILD_REPOSITORY_ACCESS, NO_LIVE_WEB_SCAN
- each alternative includes `status` and `evidence_level`

## Acceptance (this slice)

- Invoked only on demand (no background run).
- Governed question select; no free-text question.
- Alternatives listed before the recommendation.
- Output is management-readable.
- Scope, authority, limits, and confidence are visible.
- UNKNOWN is produced when evidence is missing.
- Monitoring / RADAR / Ring3 remain unauthorized and unimplemented.

## Non-goals

- MARKET_MONITORING engine or PROJECT.MARKET.WATCH.PROFILE runtime.
- RADAR implementation.
- Ring3+.
- Multi-project combined analysis.
- Live market crawl or child-project mutation.
- Claiming MARKET_CHECK_RUNTIME_COMPLETE or Wings4 complete before the completion criteria above are met.
