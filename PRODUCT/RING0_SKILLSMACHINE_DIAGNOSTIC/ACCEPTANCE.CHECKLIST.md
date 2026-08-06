# Ring0 Acceptance Checklist

Scope: `PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/`
Authority: DEC-W4-049..055, Q-072..Q-087
Purpose: Concise Wings4-local acceptance for management demo and deploy-readiness review.

## Functionality

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

## Stability

- [ ] Missing/invalid fixture shows a clear user-visible error.
- [ ] Corrupted or unavailable localStorage fails gracefully.
- [ ] Demo remains operable after reset.

## Real / representative data

- [ ] Each finding is labelled canonical-derived or representative non-canonical.
- [ ] Source paths remain available for audit.
- [ ] No claim that representative records are SkillsMachine local canon.

## Repeatability

- [ ] Static-server open path works.
- [ ] 5-minute demo path in `README.RING0.DEMO.md` can be repeated.
- [ ] Reset restores a clean decision state.

## Third-party usability

- [ ] Visible UI is English only (C1 professional target).
- [ ] Operator does not need repository literacy to run the demo.
- [ ] Product vs project relationship wording is clear.
- [ ] First-use orientation is present and concise.

## Management demo

- [ ] Live path: project → finding → evidence → decision → state → export.
- [ ] Scope boundary stated: no SkillsMachine mutation.
- [ ] Human manual browser validation of the 15 functional checks remains PASS.
- [ ] Deploy readiness remains a separate management declaration.

## Record

| Field | Value |
|---|---|
| HUMAN_MANUAL_BROWSER_VALIDATION | PASS |
| RING0_HARDENED_FUNCTIONAL_ACCEPTANCE | PASS |
| BROWSER_AUTOMATION | NOT_RUN unless separately evidenced |
| LOCAL_DEPLOY_READINESS | PASS_FOR_SINGLE_USER_LOCAL_RING0 |
