# Wings4 Market Check — Bounded On-Demand Runtime Spec

Status: ACTIVE_BOUNDED_SLICE
Authority: DEC-W4-061, DEC-W4-063, DEC-W4-066, DEC-W4-067, DEC-W4-068, DEC-W4-069, DEC-W4-070, DEC-W4-071, DEC-W4-072, Q-098, Q-099, Q-101, PR-PORT-006
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
| HUMAN_PROVIDED | Named evidence supplied by the human and already held in this repository | YES, only if a manual intake record exists; sample cannot become production; no free-text shopping |
| EXTERNAL_CHECKED | Wings-held manual record that a prior human-authorized named check already happened | Defined as MANUAL_RECORD only; production requires source metadata; not a live web search |
| UNKNOWN | Evidence is missing or insufficient | YES; required when any other level cannot be proven |

EXTERNAL_CHECKED never authorizes crawling, scheduling, RADAR, or MARKET_MONITORING. Allowed method in this slice: `MANUAL_RECORD` of a named prior check already held in Wings. If required source metadata is missing, the record stays PENDING/UNKNOWN.

## Manual evidence-intake contract

Manual intake only. No live web search, no monitoring, no RADAR, no Ring3, no child-project mutation, and no operator free-text shopping form.

Required fields:

- `evidence_id`
- `evidence_level`
- `source_type` (`HUMAN_NOTE` | `HUMAN_DECISION` | `MANUAL_EXTERNAL_RECORD` | `WINGS_CANON`)
- `source_label`
- `source_date`
- `captured_by`
- `summary`
- `confidence`
- `limitations`
- `approval_required`
- `authority`
- `review_status` (`CURRENT` | `PENDING_REVIEW` | `EXPIRED` | `SAMPLE`)

Rules:

- Missing or invalid fields become `PENDING` or `UNKNOWN`. Do not invent values. Do not silently upgrade confidence.
- `HUMAN_PROVIDED` sample (`HUMAN_PROVIDED_SAMPLE` / `review_status=SAMPLE`) cannot become production evidence.
- `HUMAN_PROVIDED` production requires a complete intake with `source_type` `HUMAN_NOTE` or `HUMAN_DECISION` and `review_status=CURRENT`.
- `EXTERNAL_CHECKED` production requires `check_method=MANUAL_RECORD`, `source_type=MANUAL_EXTERNAL_RECORD`, and complete source metadata. A live-scan method is invalid.
- `expiry_date` is optional; `review_status=EXPIRED` makes the record non-production.

This contract does not create an evidence-capture desk. Bounded runtime complete (DEC-W4-071) does not create a capture form and does not authorize live web search.

## Completion criteria (`MARKET_CHECK_RUNTIME_COMPLETE=YES`)

All of the following are required. Meeting a subset does not allow the flag.

1. On-demand only: no auto-run, no background watch, no MARKET_MONITORING, no RADAR, no Ring3.
2. Governed evidence levels above are in the runtime and visible on the operator result.
3. Result always includes: target, question, alternatives before recommendation, evidence level, UNKNOWN handling, authority, scope limits, confidence.
4. Logical tests exercise the option set: USE_EXISTING, BUILD, INTEGRATE, DEFER, REJECT/KILL, UNKNOWN — as a winning recommendation or as an explicit catalog alternative.
5. UNKNOWN is produced when evidence is missing; no fabricated buy/build/price/fitness.
6. Human-live validation PASS for on-demand invoke and for the UNKNOWN recommendation path.
7. No child-repository access; no live web scan; discovery does not authorize adoption.

Current status: **MARKET_CHECK_RUNTIME_COMPLETE=YES** for the bounded Ring0 Market Check runtime/demo slice only (DEC-W4-071). This is not Wings4 complete, not a capture form, and not future production-system complete.

Recorded live UI evidence (DEC-W4-067; HEAD `3063dad`):

- F-MC-001 BUILD live UI validation = PASS
- F-MC-002 INTEGRATE live UI validation = PASS
- UNKNOWN remains available
- Method: LOCAL_CHROME_CDP (Cursor browser MCP unavailable)

Recorded evidence-intake badge-fix live UI (DEC-W4-069; HEAD `d2bb845`):

- DEC-W4-069 / `d2bb845` verified the evidence-intake badge fix.
- WINGS_HELD / default alternatives no longer show “Valid manual intake”.
- HUMAN_PROVIDED still shows sample/not production, pending intake, or valid manual intake with source metadata where applicable.
- EXTERNAL_CHECKED still shows pending/manual no-live-scan or valid manual external metadata where applicable.
- UNKNOWN handling remains available (F-SM-002 / MCQ-BUILD_VS_ADOPT).
- LOGICAL_TESTS=PASS; CASES=30
- Live UI validation PASS via Cursor browser MCP at `http://127.0.0.1:8786/`.
- NOT_MARKET_MONITORING / NOT_RADAR / NOT_RING3 / not live web monitoring.

Bounded completion accepted (DEC-W4-071; Option A BOUNDED_COMPLETE_ACCEPTED):

Pablo accepted fixture-held HUMAN_PROVIDED and EXTERNAL_CHECKED production examples as sufficient for this bounded Ring0 Market Check runtime/demo. Numbered criteria 1–7 are met for that slice.

Recorded live UI after complete flag (DEC-W4-072; HEAD `ad53a94`; `W4_MARKET_CHECK_BOUNDED_COMPLETE_LIVE_UI_VALIDATION_010`):

- STATUS=PASS
- LOGICAL_TESTS=PASS; CASES=31
- UI_VALIDATION_METHOD=CURSOR_BROWSER_MCP
- SERVER_URL=`http://127.0.0.1:8787/`
- BROWSER_STORAGE_CLEARED=YES
- MARKET_CHECK_AUTO_RUN=NO
- MARKET_CHECK_CALLABLE_ON_DEMAND=YES
- F-SM-001 USE_EXISTING validated
- F-MC-001 BUILD validated
- F-MC-002 INTEGRATE validated
- F-SM-002 UNKNOWN validated
- HUMAN_PROVIDED sample/pending/valid display validated
- EXTERNAL_CHECKED pending/valid and no-live-scan display validated
- WINGS_HELD does not show Valid manual intake
- Alternatives before recommendation; authority and scope limits visible
- NOT_MARKET_MONITORING / NOT_RADAR / NOT_RING3 visible
- No capture form; no live web; no child-project mutation
- Product behavior unchanged

UI badge limitation:

- No dedicated `MARKET_CHECK_RUNTIME_COMPLETE=YES` badge is visible in the UI.
- Status is coherent because the fixture loads, Market Check is ready, and nothing displays incomplete.
- This task does not add that badge.

Still true and unchanged:

- Sample HUMAN_PROVIDED notes cannot become production. Incomplete intake stays PENDING/UNKNOWN.
- EXTERNAL_CHECKED remains MANUAL_RECORD only. Live-scan methods are invalid.
- A capture form is not authorized.
- Live web search, MARKET_MONITORING, RADAR, Ring3, and child-project mutation remain out of scope.
- Future operator-captured production intake remains a separate rule.
- Bounded completion remains Ring0 demo only. It must not be generalized into Wings4 product completion, operator production intake, market monitoring, RADAR, or Ring3 readiness.

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
- Claiming Wings4 complete, portfolio-wide automation complete, or future production-system complete from this bounded Market Check runtime flag.
- Operator capture form, live web search, MARKET_MONITORING, RADAR, Ring3, or child-project mutation.
