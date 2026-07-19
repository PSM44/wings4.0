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
