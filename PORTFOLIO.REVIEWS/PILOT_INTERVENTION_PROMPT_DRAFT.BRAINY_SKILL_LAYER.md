# Intervention Prompt (Draft) — Brainy Skill-layer boundary clarification

STATUS: AUTHORIZED_FOR_DELIVERY_TO_BRAINY_FOR_LOCAL_EVALUATION
MINIBATTLE: PILOT-003 (first draft intervention prompt)
GENERATED_BY: Wings4.0
GENERATED_AT: 2026-07-30
DEPENDS_ON: Human decision on PC-012 (`PORTFOLIO.CONFLICT_REGISTER.md`) and on `PORTFOLIO.REVIEWS/PAIRWISE.BRAINY_VS_SKILLSMACHINE.md`

This prompt is a draft only. Per `HUMAN/HUMAN.WINGS4.md` section 4, Wings4.0 does not directly modify another project without a separately approved intervention, and per `AGENTS.md` no commit/push is authorized without explicit human authorization. **This prompt has not been delivered to Brainy and no Brainy file has been modified.**

## Target project

Brainy — `C:\01. GitHub\Brainy`

## Approved decision this prompt would implement

None yet. This section will reference the decision ID once Pablo approves, amends, or rejects PC-012.

## Exact proposed change (if approved as-is)

Add the following clarifying note to `92_HUMAN/HUMAN_0002_BRAINY_OPERATING_MODEL.md`, section 10 ("SKILL LAYER"), immediately after the existing paragraph "This layer stores... The skill layer should evolve over time.":

```
Scope note: this Skill layer is personal and local to Brainy's own operation.
It is not a reusable, portfolio-wide capability canon. Anything intended for
reuse beyond Brainy should be proposed to PS.SkillsMachine instead of being
canonized here.

Application instructions (for Brainy local governance):
- Wings4.0 does NOT modify Brainy directly.
- Brainy may apply or reject this wording under its own local governance.
- No code transfer, architecture redesign, repository restructuring, commit or push is authorized by Wings4.0 as part of this prompt.
```

## Preserved content

Everything else in `HUMAN_0002` and every other Brainy file remains untouched.

## Exclusions

- No rename of "Skill layer."
- No change to PS.SkillsMachine.
- No change to Brainy's architecture, MVP plan, or minibattle backlog.

## Acceptance evidence (for PILOT-004 resynchronization, once executed)

- Updated `HUMAN_0002_BRAINY_OPERATING_MODEL.md` contains the scope note verbatim (or an approved variant).
- No other line in the file changed (diff limited to the one insertion).
- Brainy's own local governance authorizes and commits the change (Wings4.0 does not commit inside Brainy's repository).

## Rollback

Trivial: remove the inserted paragraph. No structural or irreversible change is involved.

## Human decision required before delivery

STATUS: PENDING
DECISION: [ ] APPROVE_AS_DRAFTED  [ ] APPROVE_WITH_CHANGES  [ ] REJECT  [ ] DEFER
