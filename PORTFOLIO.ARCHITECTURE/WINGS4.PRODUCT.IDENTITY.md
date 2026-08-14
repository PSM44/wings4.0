# Wings4 Product Identity

Status: ACTIVE
Authority: DEC-W4-048, DEC-W4-061, Q-065..Q-071, Q-082, Q-083, Q-095..Q-109
Scope: Wings4-local only — not a universal portfolio standard

## Definitions

| Term | Meaning |
|---|---|
| PRODUCTO_WINGS4 | The one unified user-facing product Pablo operates: portfolio understanding, diagnosis, decision support, governed intervention preparation and return verification. |
| PROYECTO_WINGS4 | The development process that builds and evolves that product. |
| REPOSITORIO_WINGS4 | Versioned logical unit where ORCHESTRATOR and EXECUTOR develop and govern Wings4. |
| ROOT_WINGS4 | Physical location of the repository. |
| ROOT_ACTUAL | `C:\01. GitHub\Wings4.0` |

## One user-facing Wings

Wings presents one product surface. ORCHESTRATOR, EXECUTOR, workers, tools or subagents may exist as internal implementation roles; Pablo should not manually coordinate multiple Wings personas.

## Portfolio entity model

Wings governs the complete relevant portfolio, not only git repositories:

- active projects;
- potential projects;
- initiatives;
- investigations;
- businesses;
- ideas;
- work not yet formalized as repositories.

Software/AI is the initial priority. Repository existence is not required for portfolio inclusion.

## Users and audience

- Initial operational user: Pablo.
- Gerencia: represents the consumer's eyes; reviews live demos; declares deploy readiness.
- Gerencia is not the initial operational user unless later decided.

## Product North Star

Wings4 maintains an integrated, current and actionable understanding of the complete portfolio. It detects conflicts, discrepancies, interference, omissions, duplication and opportunities; checks whether existing portfolio capabilities or external solutions can replace or complement planned development; recommends and prioritizes action; coordinates controlled execution through the appropriate project authority; and independently verifies the resulting state while preserving human authority and project-local governance.

## Primary functions

- Detect CONFLICT, DISCREPANCY, INTERFERENCE, OMISSION, DUPLICATION, OPPORTUNITY and EXTERNAL_SOLUTION findings.
- Preserve FACT vs INFERENCE vs RECOMMENDATION.
- Handle UNKNOWN without silently converting it to certainty.
- Operate push-first and pull-supported.
- Perform bounded on-demand MARKET_CHECK when material build/project decisions may already have internal or external solutions. Bounded runtime: `PORTFOLIO.ARCHITECTURE/WINGS4.MARKET_CHECK.RUNTIME.SPEC.md`.
- Treat continuous MARKET_MONITORING as a separate future capability (unauthorized now).

## Architecture

- Memory, persistent context and confidential information remain local.
- AI may be local or cloud and must be provider-neutral.
- Local agents are optional.
- First deploy is local for one user.
- Deploy readiness means a non-development user can operate the product with functionality, stability, real data and repeatability.
- Gerencia declares deploy readiness.
- Preferred governed-work execution uses Bounded Outcome Loops (max 6 iterations; one mutation owner per artifact).

## Privacy

No confidential content leaves the local machine unless the human explicitly authorizes a specific transfer. AI.History inspection remains prohibited.

## Non-goals of this identity file

- Not a universal schema for other projects.
- Not authorization for Ring3+, proactive MARKET_MONITORING, RADAR implementation, WPI/SMDI rollout or child-project mutation.
- Not a claim that full independent resynchronization is already implemented; current Ring2 is RETURN VERIFICATION.
