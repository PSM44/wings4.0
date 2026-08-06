# Wings4 Product Identity

Status: ACTIVE
Authority: DEC-W4-048, Q-065..Q-071, Q-082, Q-083
Scope: Wings4-local only — not a universal portfolio standard

## Definitions

| Term | Meaning |
|---|---|
| PRODUCTO_WINGS4 | What the user operates: portfolio understanding, conflict/discrepancy detection, interactive diagnosis, decision recording and export. |
| PROYECTO_WINGS4 | The development process that builds and evolves that product. |
| REPOSITORIO_WINGS4 | Versioned logical unit where ORCHESTRATOR and EXECUTOR develop and govern Wings4. |
| ROOT_WINGS4 | Physical location of the repository. |
| ROOT_ACTUAL | `C:\01. GitHub\Wings4.0` |

## Users and audience

- Initial operational user: Pablo.
- Gerencia: represents the consumer's eyes; reviews live demos; declares deploy readiness.
- Gerencia is not the initial operational user unless later decided.

## Primary function

Detect conflicts, discrepancies, interferences and omissions within projects and across the portfolio. Also detect market tools that may replace, complement or reduce own development.

## Architecture

- Memory, persistent context and confidential information remain local.
- AI may be local or cloud and must be provider-neutral.
- Local agents are optional.
- First deploy is local for one user.
- Deploy readiness means a non-development user can operate the product with functionality, stability, real data and repeatability.
- Gerencia declares deploy readiness.

## Privacy

No confidential content leaves the local machine unless the human explicitly authorizes a specific transfer. AI.History inspection remains prohibited.

## Non-goals of this identity file

- Not a universal schema for other projects.
- Not authorization for Ring2..Ring5, RADAR implementation, WPI/SMDI rollout or child-project mutation.
