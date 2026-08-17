# Wings4 Push-First Briefing — Bounded Runtime Planning Packet

Status: PLANNING_ONLY
Authority: DEC-W4-077 Option B, DEC-W4-078 (design record only), DEC-W4-079
Authorization: `20260817.233000_W4_RECORD_BRIEFING_RUNTIME_PLANNING_PACKET_ONLY_033`
Runtime: NOT_AUTHORIZED / NOT_IMPLEMENTED
Source design: `PORTFOLIO.ARCHITECTURE/WINGS4.PUSH_FIRST_BRIEFING.DESIGN.md`

This file records a bounded planning packet. It is not product functionality. It does not implement a runtime, UI, scheduler, scanner, or test. It does not reopen MD1.

## 1. PACKET_STATUS

- PACKET_STATUS=PLANNING_ONLY
- NO_IMPLEMENTATION=YES
- NO_RUNTIME_AUTHORIZATION=YES
- DEC-W4-078 remains a design record only and is not converted into runtime authorization
- This planning packet does not authorize runtime
- BRIEFING_RUNTIME=NOT_AUTHORIZED / NOT_IMPLEMENTED
- Presentations, BATON, architecture, design, and this planning file alone are not product functionality

## 2. PURPOSE

If a later separate human authorization exists, a briefing runtime would eventually produce one structured briefing from already-held Wings4 state, before pull exploration, answering:

1. What changed?
2. What matters?
3. What needs a human decision next?

Push-first means: when Pablo is present, Wings surfaces material Wings-held change, desynchronization, open decisions, and unknowns first. Pull-supported means: Pablo may request the same schema on demand.

The briefing must not:

- decide for Pablo
- mutate product code, child projects, or COPY lifecycle
- schedule, watch, crawl, or poll
- read `C:\01. GitHub\Skills` or any other child root
- inspect `AI.History/`
- invoke RADAR
- run MARKET_MONITORING or live web search/monitoring
- auto-deliver packages
- treat Market Check bounded Ring0 demo complete as Wings4 complete
- reopen MD1
- display a fake completeness badge
- convert UNKNOWN into certainty

## 3. SCOPE_BOUNDARY

Included as planning concept only:

- the eight-section briefing schema already designed: PROJECT_STATE, SINCE_LAST_DECISION, MATERIAL_CHANGES, OPEN_DECISIONS, RISKS_AND_BOUNDARIES, RECOMMENDED_NEXT_ACTION, HUMAN_DECISION_OPTIONS, EVIDENCE_LIMITS
- human-session triggers only
- Wings-held sources only
- mandatory stale-data warnings
- FACT / INFERENCE / RECOMMENDATION / UNKNOWN
- later-authorized runtime as a bounded product increment, not a new ring

Excluded now:

- briefing runtime, UI, tests, or product code
- Ring3+
- RADAR
- MARKET_MONITORING
- live web
- child-repository read or mutation
- capture form
- auto-delivery
- temp-path write
- COPY lifecycle change
- independent resynchronization beyond Ring2 return verification
- second-entity diagnostic
- WHOAMI / `finding_class` overlay
- a full SESSION_CONTINUE / canon refresh beyond the authorized continuity record of this packet

Explicit non-goals:

- a monitoring product
- live child intelligence
- Market Check generalization beyond the bounded Ring0 runtime/demo (DEC-W4-071)
- a WINGS4_COMPLETE claim
- package or library selection
- MD1 reopen

## 4. AUTHORITY_MODEL

- Pablo remains the final human decision authority (DEC-W4-022; `HUMAN/HUMAN.WINGS4.md`).
- ORCHESTRATOR and EXECUTOR are internal roles, not user-facing products (DEC-W4-061 Q-095).
- DEC-W4-077 Option B authorized bounded push-first briefing design-only.
- DEC-W4-078 recorded that design. It does not authorize briefing runtime, UI, or product mutation.
- DEC-W4-079 records this planning packet only. It does not authorize runtime.
- A later named explicit human authorization is required before any runtime code, UI, or runtime tests.

## 5. TRIGGER_MODEL

Allowed in the existing design, not implemented now:

| Trigger | Design status | Meaning |
|---|---|---|
| SESSION_START_PRESENTATION | YES (design) | When an operator/ORCHESTRATOR session starts, the briefing may be the first structured output from Wings-held sources at that moment. |
| ON_DEMAND_REQUEST | YES (design) | Pablo asks for the briefing. Same schema. No free-text scan target. |
| AFTER_RECORDED_HUMAN_DECISION | YES (design) | After a new Wings4 decision is recorded in `PORTFOLIO.DECISION_LOG.md`, a later briefing may include that record as Wings-held change. |

Forbidden now and until separately authorized:

- cron / interval / scheduled job
- filesystem watchers
- child-repository fetch, pull, or status
- web polling
- RADAR request
- MARKET_MONITORING profile
- auto-run on page load of the Ring0 demo
- autonomous delivery

Push-first is not background surveillance. It means: when the human is here, Wings speaks first from what it already holds.

Recommended first future slice, if Pablo later authorizes implementation: ON_DEMAND_TEXT_ONLY / SESSION_OUTPUT_ONLY. That recommendation is not implementation authorization.

## 6. DATA_AND_EVIDENCE_MODEL

Allowed sources, already local to Wings4.0:

- `HUMAN/HUMAN.WINGS4.md` and other Wings4 HUMAN canon already in this repository
- `PORTFOLIO.DECISION_LOG.md`
- `PORTFOLIO.PRINCIPLES.md`
- `00_STATE/BATON.WINGS4.ACTIVE.md`
- `MIGRATION.BACKLOG.md`
- `PORTFOLIO.ARCHITECTURE/` files in this repository
- Wings4.0 local git state for this repository only (branch, HEAD, dirty/index as observed in the current session)
- Ring0 fixture / Wings-held diagnostic records already stored under `PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/`
- recorded Market Check results already held in that fixture/demo state

Forbidden sources:

- `C:\01. GitHub\Skills` and any other child-project root
- `AI.History/`
- live web, search, crawl, or scrape
- RADAR outputs or RADAR invocation
- MARKET_MONITORING schedules, watches, or discovery engines
- inferred external facts (prices, tool fitness, live market status, live child HEAD, live working-tree of another project)
- operator free-text shopping intake
- network calls

Contract:

- every claim names a source
- missing source = UNKNOWN, with why evidence is insufficient, what evidence would resolve it, and a bounded next action
- FACT, INFERENCE, RECOMMENDATION, and UNKNOWN remain distinct (principle 12; DEC-W4-061 Q-100 / Q-101)
- never silently upgrade confidence

Mandatory visible stale-data warnings when applicable:

| Condition | Warning code | Behavior |
|---|---|---|
| BATON `HEAD_AT_GENERATION` ≠ runtime git HEAD | `STALE_BATON_HEAD` | Runtime git is HEAD truth; cite BATON as historical bootstrap only |
| SESSION_CONTINUE `HEAD_AT_GENERATION` ≠ runtime git HEAD | `STALE_SESSION_CONTINUE` | Warn; do not treat generation hash as current |
| A claim would require live child state | `NOT_LIVE_CHILD_STATE` | Set that claim UNKNOWN; cite GAP_05 |
| A claim would require live web or market scan | `NOT_LIVE_MARKET` | Set that claim UNKNOWN; cite DEC-W4-071 bounded-demo limit |
| Fixture/Wings-held Market Check used as if live | `FIXTURE_HELD_NOT_LIVE` | Label as Wings-held / fixture |
| Briefing consumed as if a running product feature | `DESIGN_ONLY_NOT_RUNTIME` | State runtime is not implemented |

Never repair staleness by reading a child repository or the web.

## 7. MINIMUM_RUNTIME_ARCHITECTURE_CONCEPTUAL_ONLY

Conceptual components only. No code. No package or library selection. No runtime behavior is claimed as present.

1. Wings4-local git snapshot reader (this repository only)
2. Allowed-source extractor
3. Stale-data comparator
4. Eight-section assembler
5. FACT / INFERENCE / RECOMMENDATION / UNKNOWN classifier
6. Mandatory limits and warning emitter
7. Non-executing human-option presenter

What would later need separate implementation authorization:

- any runtime code
- any UI
- any tests of runtime behavior
- any persistence of briefing instances
- any Ring0 panel
- any session auto-presentation wiring

This is not a ring, not RADAR, and not MARKET_MONITORING.

## 8. UX_BOUNDARY

- Visible output concept: one structured push-first briefing; same schema on demand.
- Minimal user input: request the briefing or choose among presented options; no free-text scan target.
- Contextual help: required wording that the briefing is not MARKET_MONITORING, not RADAR, not live web, and does not read or mutate child repositories; stale warnings must not be buried in prose.
- No fake completeness badge. Do not display Wings4-complete or live-monitoring-complete.
- No live monitoring claims.
- Cambridge C1 English coaching is Pablo's personal collaboration preference only. It is not Wings4 product doctrine and is not a briefing UX requirement.
- Ring0 English-only UI (DEC-W4-055) is Ring0-local. Whether a later briefing UI inherits that rule remains UNKNOWN until Pablo decides.

Recommended first future surface, if later authorized: SESSION_OUTPUT_ONLY. An additive Ring0 panel would require extra UX authorization. Ring0 page-load auto-run remains forbidden.

## 9. RISK_CONTROLS

- Runtime authorization gate: no code, UI, or runtime tests without a new named human/DEC authorization distinct from DEC-W4-078 and from this packet.
- Source boundary gate: only the allowed Wings-held list.
- Stale evidence gate: emit warning codes; runtime git is HEAD truth; BATON / START_HERE generation hashes are historical.
- Unknown evidence gate: insufficient evidence stays UNKNOWN; no guess.
- Child-read prohibition gate: any child-root path aborts that claim to UNKNOWN / `NOT_LIVE_CHILD_STATE`; no Skills read.
- Implementation stop gate: stop if asked to implement runtime, UI, monitoring, RADAR, Ring3, live web, child mutation, commit/push, or MD1 reopen under this packet.
- Overclaim gate: `MARKET_CHECK_RUNTIME_COMPLETE=YES` is bounded Ring0 demo only and is not Wings4 complete.

## 10. ACCEPTANCE_CRITERIA_FOR_FUTURE_RUNTIME

Positive criteria, only after a later separate authorization:

1. Exactly the eight designed sections, in order.
2. Wings-held sources only, with source pointers.
3. Triggers limited to the three human-session events.
4. Stale warnings visible when conditions hold.
5. Required not-monitoring / not-RADAR / not-live-web wording present.
6. FACT / INFERENCE / RECOMMENDATION / UNKNOWN remain distinct.
7. At least two human options; the briefing does not self-execute.
8. GAP_05 remains labeled `ACCEPTED_LIMITATION_FOR_RING0`.
9. Live human or existing browser proof that claims are not presented as live child or live-web intelligence.
10. Static presence is not FUNCTIONAL_PASS.

Negative criteria:

- `BRIEFING_RUNTIME_IMPLEMENTED` remains NO until the positive criteria and a separate authorization exist
- no cron or watchers
- no child HEAD presented as live
- no live web
- no RADAR
- no MARKET_MONITORING
- no Ring3
- no auto-run on Ring0 page load
- no COMPLETE / Wings4-complete badge
- no MD1 reopen
- no child mutation
- no capture form
- no auto-delivery
- Market Check bounded complete must not be generalized

## 11. HUMAN_DECISIONS_REQUIRED_BEFORE_IMPLEMENTATION

Recording this packet does not authorize implementation.

Pablo must still answer before any implementation can be authorized:

1. Authorize a future implementation slice at all? YES / NO / DEFER
2. If yes, confirm the first slice is ON_DEMAND_TEXT_ONLY / SESSION_OUTPUT_ONLY, or name a different first slice.
3. Confirm remaining prohibitions stay in force: no child read, no live web, no RADAR, no MARKET_MONITORING, no Ring3, no auto-delivery, no Ring0 page-load auto-run.
4. Separately: authorize exact staging/commit/push of this planning-packet write set? That is a continuity decision, not runtime authorization.

Answers to (1)–(3) are not implementation authorization unless a later named decision explicitly authorizes implementation.

## 12. PROPOSED_IMPLEMENTATION_SLICES_FOR_LATER_NOT_AUTHORIZED_NOW

All slices below are NOT_AUTHORIZED_NOW.

- S0. Record this planning packet in canon — recording is the scope of DEC-W4-079; it is not runtime.
- S1. Text assembler from Wings-held sources — NOT_AUTHORIZED_NOW
- S2. On-demand same-schema request, session output only — NOT_AUTHORIZED_NOW; recommended first future slice if Pablo later authorizes implementation
- S3. After-recorded-decision refresh — NOT_AUTHORIZED_NOW
- S4. Optional Ring0 visible panel — NOT_AUTHORIZED_NOW; extra UX authorization required; page-load auto-run remains forbidden
- S5. Continuity alignment of BATON / backlog / START_HERE beyond this authorized record — NOT_AUTHORIZED_NOW except the exact write set of task 033

## 13. CANON_UPDATE_SCOPE

This recording task may update only:

- `PORTFOLIO.ARCHITECTURE/WINGS4.P4.PUSH_FIRST_BRIEFING.RUNTIME.PLANNING.md` (this file)
- `PORTFOLIO.DECISION_LOG.md`
- `00_STATE/BATON.WINGS4.ACTIVE.md`
- `MIGRATION.BACKLOG.md`
- `SESSIONS/ORCHESTRATOR/03.SESSION_CONTINUE/00.START_HERE.ORCHESTRATOR.txt`

No other file is in scope. No staging, commit, or push is authorized by this packet.

`HUMAN/HUMAN.WINGS4.md` and `PORTFOLIO.PRINCIPLES.md` are not required to change for this recording. Whether HUMAN current-limitations should later mention briefing runtime remains UNKNOWN.

## 14. OPEN_GAPS_AND_UNKNOWN_EVIDENCE

- Host surface beyond the recommended SESSION_OUTPUT_ONLY first slice remains UNKNOWN until Pablo decides.
- Persistence of briefing instances remains UNKNOWN.
- Whether a later briefing UI inherits Ring0 English-only remains UNKNOWN.
- Whether HUMAN current-limitations must mention briefing runtime remains UNKNOWN.
- Task 032 (planning-packet draft) has no backlog row in this recording; exact 032 row text was not supplied.

This packet does not fill those unknowns by guessing.

## Explicit prohibitions

- `BRIEFING_RUNTIME_IMPLEMENTED=NO`
- `BRIEFING_RUNTIME_AUTHORIZED=NO`
- `MARKET_MONITORING_IMPLEMENTED=NO`
- `RADAR_IMPLEMENTED=NO`
- `LIVE_WEB_MONITORING=NO`
- `CHILD_REPOSITORY_READ=NO`
- `RING3_IMPLEMENTED=NO`
- `CAPTURE_FORM_IMPLEMENTED=NO`
- `AUTO_DELIVERY_IMPLEMENTED=NO`
- `MD1_REOPENED=NO`
- `WINGS4_COMPLETE=NO`
- `DEC_W4_078_IS_NOT_RUNTIME_AUTHORIZATION=YES`
- `CAMBRIDGE_C1_GENERIC_WINGS4_PRODUCT_DOCTRINE=NO`
