# Wings4 Functional Rings

Status: ACTIVE_DEFINITION
Authority: DEC-W4-049, DEC-W4-056, DEC-W4-058, Q-072, Q-079, Q-084, Q-089, Q-092
Scope: Wings4-local product ring model

## Rings

| Ring | Name | Intent | Implementation status |
|---|---|---|---|
| Ring0 | Diagnosis | Interactive actionable diagnosis of a selected project | Committed baseline (`1e8315d`) |
| Ring1 | Decision lifecycle + minimal intervention package | Track decisions; prepare governed exportable intervention package | Authorized (DEC-W4-056/057); W4P005 live PASS |
| Ring2 | Return evidence verification | Correlate and verify target-project return evidence against package; update Wings4-local state | Authorized under DEC-W4-058 |
| Ring3 | Resynchronization automation | Broader portfolio resync automation beyond local verification | Not authorized |
| Ring4 | Combined analysis | Multi-project combined diagnosis | Not authorized |
| Ring5 | Market | Market-tool replacement/complement review | Not authorized |

## Clarifications

- SkillsMachine is the first analyzed project and first intervention/return pilot target.
- Generic target/route/verification logic must not be hard-coded exclusively to SkillsMachine.
- Package generation and Ring2 verification do not mutate the target project and are not EXECUTOR authorization.
- Product rings are distinct from historical coordination Ring0/Ring1 (W4C/00_WINGS4_COORD).

## Prohibitions

- No SkillsMachine mutation by Wings4.
- No RADAR implementation via this ring model.
- No autonomous agents.
- No commit/push without separate authorization.
