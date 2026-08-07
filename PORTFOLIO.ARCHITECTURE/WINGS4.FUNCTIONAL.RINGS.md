# Wings4 Functional Rings

Status: ACTIVE_DEFINITION
Authority: DEC-W4-049, DEC-W4-056, DEC-W4-058, DEC-W4-061, Q-072, Q-079, Q-084, Q-089, Q-092, Q-098, Q-103
Scope: Wings4-local product ring model

## Rings

| Ring | Name | Intent | Implementation status |
|---|---|---|---|
| Ring0 | Diagnosis | Interactive actionable diagnosis of a selected portfolio entity/project | Committed baseline (`1e8315d`) |
| Ring1 | Decision lifecycle + minimal intervention package | Track decisions; prepare governed exportable intervention package | Committed in cumulative baseline (`03a589d`); W4P005 live PASS |
| Ring2 | Return verification | Correlate and verify target return evidence against package; update Wings4-local state | Committed in cumulative baseline (`03a589d`) as RETURN VERIFICATION — not full independent resynchronization |
| Ring3 | Independent resynchronization automation | Fresh independent evidence and outcome comparison beyond return verification | Not authorized / not implemented |
| Ring4 | Combined analysis | Multi-entity combined diagnosis | Not authorized |
| Ring5 | Market monitoring | Continuous/proactive external-solution monitoring | Not authorized |

## MARKET_CHECK vs MARKET_MONITORING

| Capability | Meaning | Status |
|---|---|---|
| MARKET_CHECK | Bounded, on-demand diagnostic when a material capability/project/build decision may already have internal or external solutions | Core product diagnostic direction (not deferred solely because Ring5 is unauthorized); runtime productization may still be incomplete |
| MARKET_MONITORING | Proactive/continuous/scheduled external discovery | Separate future capability; unauthorized; do not invent a monitoring engine here |

Historical wording that placed all market-tool review exclusively under Ring5 is clarified: Ring5 refers to MARKET_MONITORING. On-demand MARKET_CHECK belongs to current diagnostic/direction semantics under DEC-W4-061 / Q-098.

## Clarifications

- SkillsMachine is the first analyzed project and first intervention/return pilot target.
- Generic target/route/verification logic must not be hard-coded exclusively to SkillsMachine.
- Package generation and Ring2 verification do not mutate the target project and are not EXECUTOR authorization.
- A target return is evidence but not sufficient independent proof for final intervention closure (Q-103).
- Product rings are distinct from historical coordination Ring0/Ring1 (W4C/00_WINGS4_COORD).
- Internal product rings are not automatically separate management deliveries; see Management Delivery #1 in the Incremental Delivery Model.

## Prohibitions

- No SkillsMachine mutation by Wings4.
- No RADAR implementation via this ring model.
- No MARKET_MONITORING implementation via this minibattle.
- No autonomous agents.
- No commit/push without separate authorization.
