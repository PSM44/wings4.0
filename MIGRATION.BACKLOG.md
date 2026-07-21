# Wings4.0 Backlog

## Governance reconciliation and proof

| ID | Item | Priority | Status | Acceptance criteria |
|---|---|---:|---|---|
| GOV-003 | Reconcile Wings4.0 canonical definition | P0 | COMPLETED | HUMAN, Q&A, principles, decisions, glossary, runbook, BATON, README, and technical debt reflect the listen/decide/intervene/resynchronize model. |
| GOV-004 | Define active-project listening cycle | P0 | COMPLETED | Runbook contains a bounded cycle for receiving HUMAN, creating a portfolio card, comparing, deciding, intervening, and verifying. |
| GOV-005 | Define cross-HUMAN conflict model | P0 | NEXT | Conflict types, severity, evidence, confidence, and blocking rules are documented. |
| GOV-006 | Define portfolio decision package | P0 | NOT_STARTED | Facts, interpretations, options, recommendation, user decision, and verification criteria are standardized. |
| GOV-007 | Define project intervention prompt contract | P0 | NOT_STARTED | Every prompt states project identity, approved decision, exact change, preserved content, exclusions, acceptance evidence, and rollback. |
| GOV-008 | Define resynchronization verification | P0 | NOT_STARTED | Updated HUMAN and bounded evidence can be compared against an approved decision. |

## Operational pilots

| ID | Item | Priority | Status | Acceptance criteria |
|---|---|---:|---|---|
| PILOT-001 | Assimilate first active project | P0 | NOT_STARTED | Identity verified, HUMAN interpreted, evidence cited, portfolio card approved. |
| PILOT-002 | Execute first pairwise review | P0 | NOT_STARTED | Two projects compared with an evidence-traceable overlap/conflict conclusion. |
| PILOT-003 | Produce first approved intervention prompts | P0 | NOT_STARTED | User-approved prompts are created separately for each affected project. |
| PILOT-004 | Verify first resynchronization | P0 | NOT_STARTED | Updated HUMAN files satisfy the approved decision or remaining conflict is explicit. |

## Portfolio visualization

| ID | Item | Priority | Status | Acceptance criteria |
|---|---|---:|---|---|
| PROD-001 | Define portfolio visualization data contract | P1 | DEFERRED | Only fields proven useful in pilots are included. |
| PROD-002 | Populate governed project records | P1 | NOT_STARTED | Approved portfolio cards exist for the selected scope. |
| PROD-003 | Generate portfolio diagrams and dashboard | P1 | NOT_STARTED | Generated views explain each project, relationships, conflicts, and decisions without inventing integration. |

## Legacy assimilation

| ID | Item | Priority | Status | Acceptance criteria |
|---|---|---:|---|---|
| MIG-001 | Review Wings3.0 top-level legacy layers | P0 | COMPLETED | Each layer classified KEEP/EXTRACT/ARCHIVE/REJECT. |
| MIG-002 | Review and classify every 01_PROJECTS child | P1 | DISCOVERED | Type, lifecycle, owner, HUMAN, and path validated. |
| MIG-003 | Define portfolio capability ownership | P1 | NOT_STARTED | Major capabilities have human-approved primary owners. |
| MIG-004 | Resolve HIA/Wings4 boundary | P1 | NOT_STARTED | Governance and project-execution responsibilities are separated. |
| MIG-005 | Decompose IA.Standars | P2 | IN_PROGRESS | Useful doctrine/tools mapped to appropriate current layers. |
| MIG-006 | Define root Git boundary and ignore policy | P1 | COMPLETED | Safe versioning design approved and initialized. |
| MIG-007 | Decide physical migration project by project | P2 | NOT_STARTED | Each project has explicit RETAIN/MOVE/ARCHIVE decision. |
| MIG-008 | Resolve HIA dirty state before migration planning | P1 | BLOCKED | HIA worktree is clean or explicitly baselined. |
| MIG-009 | Secret review for VentasReport .env | P0 | NOT_STARTED | Secrets identified, rotated if necessary, and excluded. |
| MIG-010 | Resolve REValuation dirty state | P1 | BLOCKED | Worktree is clean or explicitly baselined. |
| MIG-011 | Confirm portfolio relevance of provisional entities | P2 | NOT_STARTED | Human decisions recorded in registry. |
| MIG-012 | Extract useful content from rejected/legacy entities | P2 | NOT_STARTED | Reusable content preserved before archive/delete. |
| MIG-013 | Execute Wave 1 root governance extraction | P0 | COMPLETED | Approved extraction and destination map exists. |
| MIG-014 | Build reusable doctrine register | P0 | COMPLETED | Useful principles mapped without importing obsolete doctrine wholesale. |
| MIG-015 | Build root archive and rejection register | P2 | NOT_STARTED | Snapshots, logs, exports, staging, and metadata have dispositions. |
| MIG-016 | Integrate approved legacy doctrine | P1 | NOT_STARTED | Adopted doctrine is incorporated without whole-folder copying. |
| MIG-017 | Review CIS as bounded tool or GRC candidate | P2 | NOT_STARTED | Security, correctness, tests, ownership, and present need evaluated. |
| MIG-018 | Review RADAR legacy skill and scripts | P2 | NOT_STARTED | Reusable elements mapped to current ownership. |
| MIG-019 | Define IA.History snapshot policy | P1 | NEXT | History retention, privacy, indexing, and root placement approved. |
| MIG-020 | Route legacy Portafolio transcript outside governance canon | P2 | NOT_STARTED | Personal/career destination decided. |

## WINGS4_GOV_005_TOOL_VALUE_COMPARATIVE_REVIEW

Priority: P1
Status: DEFERRED
Predecessor: WINGS4_GOV_008_RESYNCHRONIZE_HERMES_BRAINY

Reason for deferral:

The portfolio must first resolve whether PS.HermesObsidianIntegration is absorbed by Brainy, partially absorbed, retained, redefined or archived. A broad tool-value review before that decision would mix project disposition with implementation selection.

Future objective:

Evaluate Brainy as the consolidated project under PR-PORT-006 and determine whether its purpose can be fulfilled through existing market tools, configuration, integration, Skills/GRCs or only residual custom development.

Current out of scope:

- selecting Hermes, Obsidian or alternatives;
- designing Brainy architecture;
- modifying Brainy;
- modifying PS.HermesObsidianIntegration;
- approving development.


## WINGS4_GOV_005_DECIDE_HERMES_BRAINY_DISPOSITION

Priority: P0
Status: COMPLETED
Predecessor: DEC-W4-PAIR-002
Decision: DEC-W4-PAIR-003

Result:

ABSORB_KNOWLEDGE_AND_CLOSE_PROJECT

Notes:

- Brainy owns the durable purpose.
- Tool adoption remains deferred.
- Archive remains conditional.


## WINGS4_GOV_006_PREPARE_HERMES_TO_BRAINY_TRANSFER_INVENTORY

Priority: P0
Status: COMPLETED
Predecessor: DEC-W4-PAIR-003

Result:

- 115 text artifacts inventoried.
- Artifact-level dispositions prepared.
- No external project modified.
- Archive remains unauthorized.

Outputs:

- PORTFOLIO.REVIEWS/HERMES_TO_BRAINY_TRANSFER_INVENTORY.md
- PORTFOLIO.REVIEWS/HERMES_TO_BRAINY_TRANSFER_INVENTORY.csv


## WINGS4_GOV_007_REVIEW_AND_APPROVE_HERMES_TRANSFER_INVENTORY

Priority: P0
Status: COMPLETED
Decision: DEC-W4-PAIR-004

Result:

- Artifact-level inventory approved.
- REVIEW_REQUIRED count reduced to zero.
- Tool decisions remain deferred.
- Archive remains unauthorized.


## WINGS4_GOV_008_PREPARE_PROJECT_LOCAL_TRANSFER_PACKETS

Priority: P0
Status: COMPLETED
Decision: DEC-W4-PAIR-005

Result:

- Brainy project-local packet prepared.
- PS.HermesObsidianIntegration transition packet prepared.
- No external project modified.
- Archive remains unauthorized.


## WINGS4_GOV_009_EXECUTE_BRAINY_PROJECT_LOCAL_ABSORPTION_REVIEW

Priority: P0
Status: READY
Predecessor: DEC-W4-PAIR-005

Objective:

Execute the Brainy-local packet inside the Brainy project, evaluate the 12 curated requirements against Brainy's existing architecture, apply only justified Brainy-local changes, resynchronize Brainy and return consolidated evidence.

Out of scope:

- direct Wings4.0 edits to Brainy;
- PS.HermesObsidianIntegration transition execution;
- tool selection;
- source-project archive authorization.

## WINGS4_GOV_009 — COMPLETE

Status: COMPLETE

Outcome:

- Brainy requirement mapping completed.
- Brainy-local gaps applied and validated.
- Brainy commit: a3e4073828655bc6c9955a865a5c691c4cf043cd
- Strict readiness gate: PASS.
- Brainy worktree: CLEAN.
- No push performed.
- No tool adoption.
- No source-project archive authorization.

Next:

WINGS4_GOV_010_DECIDE_HERMES_SOURCE_PROJECT_FINAL_DISPOSITION

## WINGS4_GOV_010 — COMPLETE

Status: COMPLETE

Outcome:

- Human approved FREEZE_AND_ARCHIVE.
- Hermes closed as FROZEN_ARCHIVE.
- Brainy confirmed as durable owner.
- Archive manifest and SHA-256 inventory created.
- Physical move: NO.
- Deletion: NO.
- Plugin enablement: NO.
- Vault mutation: NO.
- Source-project deletion authorization: NO.

Next:

WINGS4_GOV_011_REVIEW_SKILLS_GRC_OPPORTUNITY_TRANSFER

## WINGS4_GOV_011 — TRANSFER PACKAGE READY

Status: READY_FOR_LOCAL_COMMIT

- All 13 Hermes Skills/GRC opportunities transferred as candidates.
- No opportunity was withheld.
- No relevance judgment was made by Wings4.
- No SkillsMachine canon was modified.
- Package: PORTFOLIO.TRANSFERS/HERMES_TO_SKILLSMACHINE_SKILLS_GRC_OPPORTUNITIES.md
- Next: close GOV-011 locally, then open destination-owned SkillsMachine assessment minibattle.

## WINGS4_GOV_012 — DELIVERY COMPLETE

Status: READY_FOR_LOCAL_COMMIT

- Single IA-readable package generated in T.Wings4.0.
- All 13 opportunities included.
- No Wings4 relevance judgment.
- No SkillsMachine or Hermes modification.
- Destination assessment remains unauthorized until opened under SkillsMachine governance.

## WINGS4_GOV_014 — PROJECT CONTRACT AND INTERACTION MODEL

Status: PROPOSED_PENDING_HUMAN_REVIEW

Objective:

Define a human-first and machine-auditable portfolio model separating HUMAN, USEMANUAL, PROJECT.CONTRACT, PROJECT.INTERFACE, BATON/STATE and EVIDENCE.

Approved direction:

- HUMAN remains the semantic constitution for humans.
- USEMANUAL explains correct human use.
- PROJECT.CONTRACT translates approved intent into a structured declaration.
- PROJECT.INTERFACE governs cross-project communication and boundaries.
- Projects self-audit first.
- Wings4 performs independent portfolio audit second.
- Human remains final decision authority.
- Governance must be proportional to project risk and integration level.

Current artifact:

- PORTFOLIO.ARCHITECTURE/PROJECT_DOCUMENT_AND_INTERACTION_MODEL.md

Next human decision:

- APPROVE_GOV014_MODEL
- APPROVE_GOV014_MODEL_WITH_CHANGES
- REJECT_GOV014_MODEL

## WINGS4_GOV_014A — PILOT PROJECT THICK BOUNDARIES

Status: PROPOSED_PENDING_HUMAN_REVIEW

- Six independent projects identified: Wings4, Brainy, SkillsMachine, HIA, AIX and Nightshift.
- DeveFact classified as an HIA internal component at $DeveFactRoot.
- Canonical Nightshift root confirmed as $NightshiftRoot.
- Skills\99.LABS\Nightshift classified as a SkillsMachine test fixture with zero portfolio priority.
- Thick boundaries, ownership matrix, conflicts and interfaces proposed.
- No child project modified; no implementation, commit or push authorized.

Artifact: $ProposalRelative

Human decision:
- APPROVE_GOV014A_THICK_BOUNDARIES
- APPROVE_GOV014A_THICK_BOUNDARIES_WITH_CHANGES
- REJECT_GOV014A_THICK_BOUNDARIES

## WINGS4_GOV_013_014_014A — APPROVED LOCAL CLOSE

Status: READY_FOR_LOCAL_COMMIT
Approved at: 2026-07-21 12:14:49 -04:00

Decisions:

- GOV-013: APPROVED_WITH_CHANGES.
- GOV-014: APPROVED.
- GOV-014A: APPROVED.
- Six independent projects plus DeveFact as an HIA internal component.
- Canonical Nightshift root confirmed.
- SkillsMachine Nightshift fixture classified with zero portfolio priority.
- No child-project modification authorized.

Artifacts:

- PORTFOLIO.REVIEWS/BRAINY_CONSOLIDATED_PROJECT_REVIEW.md
- PORTFOLIO.ARCHITECTURE/PROJECT_DOCUMENT_AND_INTERACTION_MODEL.md
- PORTFOLIO.ARCHITECTURE/PILOT_PROJECT_THICK_BOUNDARIES.md

Next:

WINGS4_GOV_014B_DEFINE_PROJECT_CONTRACT_SCHEMA

## WINGS4_GOV_014B — PROJECT.CONTRACT SCHEMA

Status: PROPOSED_PENDING_HUMAN_REVIEW

Outputs:

- PORTFOLIO.ARCHITECTURE/PROJECT.CONTRACT.schema.json
- PORTFOLIO.ARCHITECTURE/PROJECT.CONTRACT.GUIDE.md

Scope:

- Defines a generic project-contract schema.
- Preserves HUMAN as semantic authority.
- Adds a two-level external-solution review: Wings4 portfolio triage plus project-local evaluation.
- Does not create child-project contracts.
- Does not define PROJECT.INTERFACE.
- Does not modify child projects.
- No commit or push authorized.

Human decision:

- APPROVE_GOV014B_PROJECT_CONTRACT_SCHEMA
- APPROVE_GOV014B_PROJECT_CONTRACT_SCHEMA_WITH_CHANGES
- REJECT_GOV014B_PROJECT_CONTRACT_SCHEMA

## WINGS4_GOV_014B — APPROVED

Status: APPROVED
Approved at: 2026-07-21 12:34:19 -04:00

- PROJECT.CONTRACT generic schema approved.
- HUMAN remains semantic authority.
- Child contract rollout remains unauthorized.
- Next: WINGS4_GOV_014C_DEFINE_PROJECT_INTERFACE_SCHEMA.

## WINGS4_GOV_014C — PROJECT.INTERFACE SCHEMA

Status: PROPOSED_PENDING_HUMAN_REVIEW

Outputs:

- PORTFOLIO.ARCHITECTURE/PROJECT.INTERFACE.schema.json
- PORTFOLIO.ARCHITECTURE/PROJECT.INTERFACE.GUIDE.md

Key decision:

- External-solution monitoring uses project-local watch profiles.
- Search and monitoring logic should be reusable, not duplicated per project.
- Reviews may start in any project context.
- Portfolio-relevant candidates escalate to Wings4.

No child projects modified. No commit or push authorized.

## WINGS4_GOV_014B_014C — APPROVED LOCAL CLOSE

Status: READY_FOR_LOCAL_COMMIT
Approved at: 2026-07-21 12:45:14 -04:00

Decisions:

- GOV-014B: APPROVED.
- GOV-014C: APPROVED.
- HUMAN remains semantic authority.
- PROJECT.CONTRACT generic schema approved.
- PROJECT.INTERFACE generic schema approved.
- Market-monitoring model approved as distributed sensing plus centralized coordination.
- Review may start in any project.
- Reusable monitoring logic should not be duplicated per project.
- Portfolio-relevant findings escalate to Wings4.
- No child contracts, real interfaces, automated monitoring or child-project changes authorized.

Artifacts:

- PORTFOLIO.ARCHITECTURE/PROJECT.CONTRACT.GUIDE.md
- PORTFOLIO.ARCHITECTURE/PROJECT.CONTRACT.schema.json
- PORTFOLIO.ARCHITECTURE/PROJECT.INTERFACE.GUIDE.md
- PORTFOLIO.ARCHITECTURE/PROJECT.INTERFACE.schema.json

Next:

WINGS4_GOV_014D_DEFINE_PROJECT_MARKET_WATCH_PROFILE
