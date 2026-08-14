# Wings4 Market Check — Bounded On-Demand Runtime Spec

Status: ACTIVE_BOUNDED_SLICE
Authority: DEC-W4-061, DEC-W4-063, Q-098, Q-099, Q-101, PR-PORT-006
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
4. OPEN_SOURCE — suitable open-source option
5. COMMERCIAL — suitable commercial option
6. RESIDUAL_CUSTOM — justified remaining custom build

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

## Result record (Wings4-local)

- `check_id`, `finding_id`, `question_id`
- `invoked_on_demand=YES`
- `recommendation`, `recommendation_label`, `confidence`
- `fact`, `inference`
- `alternatives` (always before relying on the recommendation)
- `scope`, `authority`, `limits`
- `unknown_reason`, `required_evidence`, `next_action` when UNKNOWN
- `limits` must include: NOT_MARKET_MONITORING, NOT_RADAR, NOT_RING3, NO_CHILD_REPOSITORY_ACCESS, NO_LIVE_WEB_SCAN

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
- Claiming MARKET_CHECK_RUNTIME_COMPLETE or Wings4 complete.
