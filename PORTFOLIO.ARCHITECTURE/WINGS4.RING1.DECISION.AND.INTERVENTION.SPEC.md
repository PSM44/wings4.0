# Wings4 Ring1 — Decision Lifecycle and Minimal Intervention Spec

Status: ACTIVE
Authority: DEC-W4-056, DEC-W4-057, Q-089, Q-090
Prototype: `PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/` (cumulative Ring0+Ring1 surface)
Hardening baseline: Ring0 commit `1e8315d`; Ring1 commit `16b28d1`

## User outcome

After a decision, Wings4 tracks it and can prepare a governed intervention package.

Desired flow:

Finding → Recommendation → Human decision → Optional Decision note → Wings4 derives governed route → Wings4 prepares intervention package → Human downloads package.

The user should not design Wings4's workflow.

## Minimal user input contract

User may:
- choose ACCEPT / REJECT / MODIFY / POSTPONE;
- enter one Decision note (optional except MODIFY, where a meaningful modification note is required);
- if multiple governed targets exist for a finding, select among those options;
- close/reopen a decision;
- download the intervention package when eligible.

User may not:
- edit Owner;
- author Next Action;
- enter a generic Review Date;
- type an arbitrary Target Project;
- expand route scope arbitrarily.

## Decision note semantics

One bounded text field: Decision note.
- Optional for ACCEPT / REJECT / POSTPONE.
- Required for MODIFY to state the modification.

## Owner visibility

Owner is not user-editable in the current single-user UI. Internal attribution defaults to Pablo.

## System-derived Next Action

Next Action is read-only and derived from decision + route status.

## Review date

Generic Review Date input is removed from normal Ring1 UI. A future contextual date may appear only when a real workflow deadline requires it (not implemented now).

## Governed target selection

Target is never free text.
- When the finding/project context is deterministic, preselect that project (current pilot: SkillsMachine).
- Otherwise select from fixture/canon governed options already represented by Wings4.
- Do not invent portfolio projects in code.

## Package UI

- Preview package button is removed.
- Package/route content remains visible for eligible decisions.
- Primary action: DOWNLOAD INTERVENTION PACKAGE.

## Non-goals

- Child-project mutation (including SkillsMachine).
- Market scanning.
- RADAR implementation.
- Product-to-product live integration.
- Ring3+ implementation (Ring2 is specified separately under DEC-W4-058).
- Organizational RBAC.
- Mandatory scheduling automation.

## Decision lifecycle states

| State | Meaning |
|---|---|
| OPEN | Finding has no recorded decision yet |
| DECIDED | ACCEPT/MODIFY/REJECT recorded; awaiting lifecycle next step |
| POSTPONED | POSTPONE recorded; keep finding open and decide later |
| IN_ACTION | Intervention package prepared/exported; awaiting target-project handling |
| CLOSED | Decision closed in Wings4 local state (does not claim child implementation) |
| REOPENED | Previously closed/postponed decision reopened; history preserved |

## Decision record

- `decision_id`, `finding_id`, `action`, `status`
- `owner` (system/default; not UI-editable)
- `created_at`, `updated_at`
- `next_action` (system-derived)
- `rationale_or_modification` (Decision note)
- `target_project` (governed)
- `route` (governed route object)
- events / intervention metadata

## Governed route model

Every cross-project intervention route has:

| Field | Derivation |
|---|---|
| `route_id` | Deterministic from source + destination + finding + decision |
| `SOURCE` | Wings4 |
| `DESTINATION` | Governed target |
| `DESTINATION_ROLE` | ORCHESTRATOR (default for governed project transfer) |
| `PURPOSE` | From finding + decision |
| `AUTHORIZED_SCOPE` | From finding/decision; not user-expanded |
| `PROHIBITED_SCOPE` | Auto exclusions |
| `INPUT_EVIDENCE` | Finding evidence pointers |
| `EXPECTED_OUTPUT` | Bounded target-project output |
| `RETURN_EVIDENCE` | Required return evidence set |
| `AUTHORITY_BOUNDARY` | Not EXECUTOR authorization; target retains local authority; no cross-repo mutation |
| `EXECUTION_STATUS` | Package preparation/export stage only (not target execution monitoring) |

Current pilot: SOURCE=Wings4, DESTINATION=SkillsMachine, DESTINATION_ROLE=ORCHESTRATOR. Data model remains generic.

## Intervention trigger

| Action | Intervention package eligible by default |
|---|---|
| ACCEPT | YES |
| MODIFY | YES |
| REJECT | NO |
| POSTPONE | NO |

## Close / reopen

Close tracks Wings4-local completion only. Package generation alone does not claim child implementation. Reopen preserves history.

## Intervention package identity (hardened under DEC-W4-058)

- Unique `INTERVENTION_PACKAGE_ID` pattern: `W4IP-YYYYMMDD-NNNN`.
- Real ID assigned no later than PACKAGE_READY (before visible render/download); never remain `W4IP-PENDING-ASSIGNMENT` once ready.
- Visible header form: `WINGS4_CONTROLLED_INTERVENTION_PACKAGE ID: W4IP-...` plus machine-readable `INTERVENTION_PACKAGE_ID=` line.
- `PACKAGE_SCHEMA_VERSION` present in export.
- Source/target project + root + destination role included as metadata only.
- Temp/minimization policies included when applicable (SkillsMachine known temp metadata: `C:\Users\aazcl\Downloads\Temp.SkillMachine`; metadata does not authorize Wings4 access).
- Required return AI block template embedded; same package ID mandatory in return.
- Authority banners: NOT_EXECUTOR_AUTHORIZATION; TARGET_PROJECT_RETAINS_LOCAL_AUTHORITY; NO_CROSS_REPO_MUTATION_BY_WINGS4.

Ring2 return verification is implemented under `PORTFOLIO.ARCHITECTURE/WINGS4.RING2.RETURN.VERIFICATION.SPEC.md`.

## Acceptance

- Ring0 flow preserved.
- Ring1 lifecycle preserved with simplified UX.
- Governed route visible and system-derived.
- Export derives from route; arbitrary targets blocked.
- Package self-sufficient with unique ID and return AI block template.
- No SkillsMachine mutation.
