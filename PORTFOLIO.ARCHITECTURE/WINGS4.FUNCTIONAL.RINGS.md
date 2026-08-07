# Wings4 Functional Rings

Status: ACTIVE_DEFINITION
Authority: DEC-W4-049, DEC-W4-056, Q-072, Q-079, Q-084, Q-089
Scope: Wings4-local product ring model

## Rings

| Ring | Name | Intent | Implementation status |
|---|---|---|---|
| Ring0 | Diagnosis | Interactive actionable diagnosis of a selected project | Committed baseline (`1e8315d`) |
| Ring1 | Decision lifecycle + minimal intervention package | Track decisions after Ring0 action; prepare governed exportable intervention package for target ORCHESTRATOR | Authorized now under DEC-W4-056 |
| Ring2 | Controlled intervention execution/resync prep | Broader intervention/return automation beyond package export | Not authorized |
| Ring3 | Resynchronization | Verify return evidence and portfolio resync | Not authorized |
| Ring4 | Combined analysis | Multi-project combined diagnosis | Not authorized |
| Ring5 | Market | Market-tool replacement/complement review | Not authorized |

## Clarifications

- SkillsMachine is the first analyzed project for Ring0 and the first intervention-package pilot target for Ring1.
- Generic Ring1 target-project logic must not be hard-coded exclusively to SkillsMachine.
- SkillsMachine is not a universal dependency of Ring2.
- Ring1 package generation does not mutate the target project and is not EXECUTOR authorization.
- Later rings remain design/definition only until separate human authorization.
- Product rings are distinct from historical coordination Ring0/Ring1 (W4C/00_WINGS4_COORD), which remain separately constrained by DEC-W4-046.

## Prohibitions

- No SkillsMachine mutation by Wings4.
- No RADAR implementation via this ring model.
- No autonomous agents.
- No commit/push without separate authorization.
