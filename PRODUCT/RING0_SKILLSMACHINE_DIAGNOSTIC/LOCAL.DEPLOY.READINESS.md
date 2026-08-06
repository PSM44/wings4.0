# Ring0 Local Deploy Readiness Spec

Status: PASS_FOR_SINGLE_USER_LOCAL_RING0
Scope: First deploy readiness for Wings4 Ring0 only
Authorization: `RING0_HARDENED_FUNCTIONAL_ACCEPTANCE_PASS_AND_LOCAL_COMMIT_AUTHORIZATION`
Authority to declare readiness: Gerencia (management) for broader deploy; human operational acceptance for this local Ring0 posture is recorded below.

## Target posture

| Criterion | Required now |
|---|---|
| Local operation | YES |
| Single user | YES |
| Mandatory cloud AI | NO |
| Multi-user concurrency | NO |
| Child-repo mutation (SkillsMachine) | NO |
| Commit/push as part of deploy | NO |

## Technical PASS criteria

PASS when all are true:

1. Ring0 opens via local static files or a local static server.
2. SkillsMachine diagnosis flow is operable end-to-end without repository literacy.
3. Visible UI is English only.
4. Decision actions ACCEPT / REJECT / MODIFY / POSTPONE work and update local state only.
5. Fixture load and localStorage failures are handled with clear user-visible messages.
6. Decision JSON export validates required fields.
7. Reset demo works with confirmation.
8. No SkillsMachine repository read/write occurs.
9. No Ring1+ product ring implementation beyond the decision actions already included in Ring0.
10. Static validation of HTML/CSS/JS/JSON and path allowlist succeeds.

## Technical FAIL criteria

FAIL when any are true:

1. Core diagnosis/decision flow is broken.
2. Visible Spanish or mixed-language UI remains in human-facing strings.
3. DEFER remains as the visible action label instead of POSTPONE.
4. SkillsMachine mutation is required or performed.
5. Cloud service or multi-user dependency is introduced as mandatory.
6. Fixture cannot load and no clear error is shown.
7. Export omits required decision fields.

## Human acceptance (PRODUCT_003)

- `RING0_FUNCTIONAL_DEMO=PASS`
- `RING0_HARDENED_FUNCTIONAL_ACCEPTANCE=PASS`
- Human confirmed the hardened Ring0 works and that all requested final live checks pass.
- Recorded under authorization `RING0_HARDENED_FUNCTIONAL_ACCEPTANCE_PASS_AND_LOCAL_COMMIT_AUTHORIZATION`.

## Current assessment

- `LOCAL_DEPLOY_READINESS=PASS_FOR_SINGLE_USER_LOCAL_RING0`
- This means a non-development local single-user operator can run Ring0 functionally.
- This does **not** mean enterprise/production multi-user, cloud, autonomous-agent, or full Wings4 product completion.
- Broader portfolio deploy readiness beyond Ring0 remains a management declaration.
