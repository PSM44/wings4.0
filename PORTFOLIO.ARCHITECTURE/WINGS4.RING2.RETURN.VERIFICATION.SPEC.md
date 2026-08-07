# Wings4 Ring2 — Return Evidence Verification Spec

Status: ACTIVE
Authority: DEC-W4-058, Q-092
Prototype: `PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/` (cumulative Ring0+Ring1+Ring2 surface)

## Purpose

After a target project returns evidence for a Wings4 Intervention Package, Ring2 correlates by `INTERVENTION_PACKAGE_ID`, verifies identity/scope/output/evidence/commit/push/conflicts, classifies the result, and updates Wings4-local state only.

## Non-goals

- Child-project mutation or repository access.
- Ring3 portfolio resynchronization automation.
- RADAR, market scanning, product-to-product live integration.
- Fabricating PASS/FAIL when evidence is missing.

## Inputs

Minimal accepted user-facing controls:
1. One **Return evidence** textarea (pasteable).
2. Optional **IMPORT TXT** (UTF-8 text into the textarea).
3. **VERIFY RETURN** (parses current textarea content).

Accepted content shapes:
1. Pasted return AI block (`---AI_START---` … `---AI_END---`).
2. Full TXT containing that block.

No JSON editing is required. Duplicate AI blocks are rejected as ambiguous.

## Correlation key

`INTERVENTION_PACKAGE_ID` is mandatory and must match a previously generated Wings4 package.

## Verification record (Wings4-local)

- `verification_id`
- `intervention_package_id`
- `decision_id` / `finding_id` / `route_id`
- `verified_at`
- `overall_result`
- `reason_summary`
- `expected` vs `actual` field map
- `checks` (identity, root, scope, prohibited, output, evidence, commit, push, conflicts)

## Result vocabulary

| Result | Meaning |
|---|---|
| VERIFIED_PASS | Required checks pass; no prohibited-scope violation |
| VERIFIED_PASS_WITH_GAP | Materially acceptable with non-blocking gaps |
| RETURN_INCOMPLETE | Required return fields/evidence missing |
| SCOPE_CONFLICT | Authorized/prohibited scope not satisfied |
| IDENTITY_MISMATCH | Package ID / project / root mismatch |
| UNVERIFIABLE | Present but insufficient to classify safely |
| FAILED | Explicit failure or policy breach (e.g. unauthorized push when forbidden) |

## Required return AI block fields

INTERVENTION_PACKAGE_ID, OVERALL_STATUS, PROJECT_ID, PROJECT_ROOT, BRANCH, HEAD_BEFORE, HEAD_AFTER, WORKTREE_CLEAN_FINAL, INDEX_CLEAN_FINAL, FILES_CHANGED, AUTHORIZED_SCOPE_COMPLIANCE, PROHIBITED_SCOPE_VIOLATION, EXPECTED_OUTPUT_STATUS, RETURN_EVIDENCE_STATUS, CANONICAL_CONFLICT_COUNT, COMMIT, PUSH, RETURN_EVIDENCE_FILE, NEXT_ACTION

## Acceptance

- Parser extracts exact AI block.
- Unknown/missing package ID rejected.
- Missing evidence classified as incomplete/unverifiable, not invented PASS.
- Prohibited-scope violation blocks VERIFIED_PASS.
- Unauthorized push surfaces conflict/failure per package push policy.
- Wings4-local state/history updated; no child mutation.
