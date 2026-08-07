# Wings4 Ring1 — Decision Lifecycle and Minimal Intervention Spec

Status: ACTIVE
Authority: DEC-W4-056, Q-089
Prototype: `PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/` (cumulative Ring0+Ring1 surface)
Hardening baseline: Ring0 commit `1e8315d`

## User outcome

After a decision, Wings4 tracks it and can prepare a governed intervention package.

## Non-goals

- Child-project mutation (including SkillsMachine).
- Return / resynchronization automation.
- Market scanning.
- RADAR implementation.
- Product-to-product live integration.
- Ring2+ implementation.
- Organizational RBAC.
- Mandatory scheduling automation.

## Decision lifecycle states

Minimal states:

| State | Meaning |
|---|---|
| OPEN | Finding has no recorded decision yet |
| DECIDED | ACCEPT/MODIFY/REJECT recorded; awaiting lifecycle next step |
| POSTPONED | POSTPONE recorded; keep finding open and decide later |
| IN_ACTION | Intervention package prepared/exported; awaiting target-project handling |
| CLOSED | Decision closed in Wings4 local state (does not claim child implementation) |
| REOPENED | Previously closed/postponed decision reopened; history preserved |

## Decision record

Required fields:

- `decision_id`
- `finding_id`
- `action` (`ACCEPT` \| `REJECT` \| `MODIFY` \| `POSTPONE`)
- `owner` (default `Pablo`)
- `status`
- `created_at`
- `updated_at`
- `next_action` (one concise next action)
- `review_date` (optional ISO date)
- `rationale_or_modification`
- evidence/finding traceability via `finding_id` + fixture evidence pointers

## Event model

Minimal immutable-style events:

- `event_id`
- `decision_id`
- `finding_id`
- `event_type`
- `timestamp`
- `actor`
- `note`

Local/browser-only persistence.

## Owner model

Initial owner defaults to Pablo. Local edit allowed. No RBAC.

## Next action model

Exactly one concise next action per active decision. Not a mini-backlog.

## Review date model

Optional. No mandatory reminders or automation.

## Close semantics

A decision may be closed when the user marks local Wings4 tracking complete.

Close does **not** claim that the target project implemented the decision unless return evidence exists (Ring2+/resync not implemented).

Package generation alone must not auto-close as “implemented”.

## Reopen semantics

Closed or postponed decisions may be reopened. History is preserved. Status becomes `REOPENED` with an event entry; user may then record a new action or continue lifecycle edits.

## Intervention trigger

| Action | Intervention package eligible by default |
|---|---|
| ACCEPT | YES |
| MODIFY | YES |
| REJECT | NO |
| POSTPONE | NO |

## Intervention package identity

- `package_id`
- `source_project=Wings4.0`
- `target_project` (generic; pilot default `SkillsMachine`)
- `finding_id`
- `decision_id`
- `generated_at`
- `destination_role=ORCHESTRATOR`

## Authority banner (required in UI and export)

```
NOT_EXECUTOR_AUTHORIZATION
TARGET_PROJECT_RETAINS_LOCAL_AUTHORITY
NO_CROSS_REPO_MUTATION
```

Human decision exists; Wings4 prepares the request; target project evaluates under local governance.

## Package contents

1. Identity and authority
2. Human decision and finding summary
3. Exact requested outcome / scope
4. Evidence pointers + data classification
5. Exclusions
6. Acceptance criteria
7. Required return evidence
8. Stop conditions

### Return evidence minimum

- project / root
- HEAD before / after
- files changed
- validation
- commit
- push
- conflicts
- resync ready

### Stop conditions

- canonical conflict
- unknown dirty state
- scope expansion
- local authorization absence
- evidence-loss risk

## Export format

Single UTF-8 TXT download by default. Optional JSON metadata only if already part of local state export. No multi-file package by default. Browser download only; no repository write.

## Language

Human-facing UI remains English only, Cambridge C1 professional standard (Ring0 local language rule continues).

## Acceptance

- Ring0 flow preserved.
- Decision lifecycle visible and editable for recorded decisions.
- History events recorded.
- Close/reopen available with correct semantics.
- ACCEPT/MODIFY can preview and export intervention TXT.
- REJECT/POSTPONE ineligible by default.
- No SkillsMachine mutation.
