# Ring0 + Ring1 Acceptance Checklist

Scope: `PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/`
Authority: DEC-W4-049..056, Q-072..Q-089
Purpose: Concise Wings4-local acceptance for management demo and deploy-readiness review.

## Ring0 functionality (must remain)

- [ ] SkillsMachine appears as the selected project.
- [ ] At least three findings are listed (baseline: four).
- [ ] Selecting a finding shows Detail, Evidence, Impact, Alternatives, Recommendation and Decision.
- [ ] Evidence is distinguishable from recommendation/interpretation.
- [ ] Decision actions available: ACCEPT, REJECT, MODIFY, POSTPONE.
- [ ] MODIFY requires an explicit modification/rationale.
- [ ] POSTPONE keeps the finding open (not equivalent to REJECT).
- [ ] Decision updates Wings4-local state only.
- [ ] Decision JSON export downloads with required fields.
- [ ] Reset demo clears local state after confirmation.

## Ring1 decision lifecycle

- [ ] Decision ID, status, owner, next action, optional review date, created/updated timestamps visible.
- [ ] Minimal event history recorded chronologically.
- [ ] Close marks Wings4-local completion only (no child-implementation claim).
- [ ] Reopen preserves history.
- [ ] POSTPONE sets postponed lifecycle status.
- [ ] REJECT closes by default and remains intervention-ineligible.

## Ring1 intervention package

- [ ] ACCEPT/MODIFY are intervention-eligible.
- [ ] REJECT/POSTPONE are not eligible by default.
- [ ] Target project field defaults to SkillsMachine but remains generic.
- [ ] Preview shows authority, scope, evidence, exclusions, acceptance, return evidence, stop conditions.
- [ ] TXT export downloads; no repository write.
- [ ] Exported/visible banner includes NOT_EXECUTOR_AUTHORIZATION / TARGET_PROJECT_RETAINS_LOCAL_AUTHORITY / NO_CROSS_REPO_MUTATION.
- [ ] Package generation records an event and sets In action without claiming implementation complete.

## Stability / data / usability

- [ ] Missing/invalid fixture shows a clear user-visible error.
- [ ] Corrupted or unavailable localStorage fails gracefully.
- [ ] Schema v1 Ring0 records migrate into Ring1 structure.
- [ ] Visible UI is English only (C1 professional target).
- [ ] Product vs project relationship wording is clear.
- [ ] No SkillsMachine mutation.

## Record

| Field | Value |
|---|---|
| HUMAN_MANUAL_BROWSER_VALIDATION (Ring0) | PASS |
| RING0_HARDENED_FUNCTIONAL_ACCEPTANCE | PASS |
| HUMAN_RING1_LIVE_VALIDATION | PENDING |
| BROWSER_AUTOMATION | NOT_RUN unless separately evidenced |
| LOCAL_DEPLOY_READINESS | PASS_FOR_SINGLE_USER_LOCAL_RING0 (Ring0); Ring1 pending live review |
| STATE_SCHEMA_VERSION | 2 |
