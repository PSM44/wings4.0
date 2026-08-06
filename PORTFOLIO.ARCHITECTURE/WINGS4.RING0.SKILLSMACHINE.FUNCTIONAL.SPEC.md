# Wings4 Ring0 — SkillsMachine Functional Spec

Status: ACTIVE
Authority: DEC-W4-049..051, DEC-W4-055, Q-072..Q-074, Q-084..Q-087
Prototype: `PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/`
Hardening: `WINGS4_PRODUCT_002_RING0_HARDENING_AND_LOCAL_DEPLOY_READINESS`

## Goal

Deliver the first operable Wings4 product flow: interactive actionable diagnosis of SkillsMachine without mutating SkillsMachine.

## Flow

1. Open the product (`index.html`).
2. See Wings4 definition / problem / how it works.
3. SkillsMachine is the selected project.
4. View project identity and purpose.
5. View findings list.
6. Select a finding.
7. Open evidence (distinguished from interpretation).
8. Review impact.
9. Review alternatives.
10. View recommendation.
11. Register decision: ACCEPT / REJECT / MODIFY / POSTPONE.
12. Update Wings4-local prototype state (localStorage).
13. Export decision as downloadable JSON.
14. Never write the SkillsMachine repository.

## Visible decision actions

| Visible label | Meaning | Internal persisted value (acceptable) |
|---|---|---|
| ACCEPT | Accept the recommendation | `ACCEPT` |
| REJECT | Reject the recommendation | `REJECT` |
| MODIFY | Accept with an explicit modification or alternate rationale | `MODIFY` |
| POSTPONE | Keep the finding open and decide later | `POSTPONE` (legacy `DEFER` / status `DEFERRED` may remain for compatibility) |

POSTPONE does not equal REJECT. The finding remains open for a later decision.

## Language (Ring0-local)

Human-facing Ring0 UI must be English only, at approximately Cambridge C1 professional standard: clear, natural, concise and executive-friendly. Canonical IDs, filenames, codes and literal source names stay unchanged for traceability. This rule is Ring0-local and is not a portfolio-wide language standard.

## Acceptance

- SkillsMachine visible as selected project.
- At least 3 findings (current baseline: 4).
- Evidence distinguishable from interpretation.
- Four decision actions available (ACCEPT / REJECT / MODIFY / POSTPONE).
- Decision updates local state.
- Decision JSON export works.
- Reset demo clears local state after confirmation.
- No SkillsMachine mutation.
- Operable from local files without repository literacy.
- Visible UI English only.

## Non-goals

- Reading or writing `C:\01. GitHub\Skills`.
- Ring1-as-separate-ring beyond the decision actions already included in the Ring0 pilot flow.
- Ring2..Ring5 implementation.
- RADAR implementation.
- Real product-product SkillsMachine integration.
- Commit/push.
- Cloud services.
- Autonomous agents.

## Data policy

Fixture records must be marked:

- `CANONICAL_DERIVED` when grounded in Wings4-held canon/evidence;
- `REPRESENTATIVE_NONCANONICAL` when illustrative and not claimed as SkillsMachine canon.

## PRODUCT_001 task-count correction

Historical correction for `WINGS4_PRODUCT_001` summaries:

- Incorrect summary seen in some prior result packaging: `18 PASS + 1 PASS_WITH_GAP` for 20 tasks.
- Reconciled factual count from the detailed task results: `19 PASS + 1 PASS_WITH_GAP` for 20 tasks.
- This note corrects the summary without rewriting disposable external TEMP result files.

## Human manual browser validation

- Date recorded: 2026-08-06 (PRODUCT_002 hardening session).
- Human approved all 15 Ring0 functional checks manually in the browser.
- Semantics: `HUMAN_MANUAL_BROWSER_VALIDATION=PASS`.
- This is not an automated browser validation claim.

## Hardened final live acceptance (PRODUCT_003)

- Authorization: `RING0_HARDENED_FUNCTIONAL_ACCEPTANCE_PASS_AND_LOCAL_COMMIT_AUTHORIZATION`.
- `RING0_FUNCTIONAL_DEMO=PASS`.
- `RING0_HARDENED_FUNCTIONAL_ACCEPTANCE=PASS`.
- Human confirmed the hardened Ring0 final live checks pass.
- Local deploy posture for this Ring0 baseline: `PASS_FOR_SINGLE_USER_LOCAL_RING0` (not enterprise/multi-user/cloud/full-product completion).
