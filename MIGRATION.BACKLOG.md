# Migration Backlog

| ID | Item | Priority | Status | Acceptance criteria |
|---|---|---:|---|---|
| MIG-001 | Review Wings3.0 top-level legacy layers | P0 | DISCOVERED | Each layer classified KEEP/EXTRACT/ARCHIVE/REJECT. |
| MIG-002 | Review and classify every 01_PROJECTS child | P0 | DISCOVERED | Type, lifecycle, owner, HUMAN, and path validated. |
| MIG-003 | Define portfolio capability ownership | P0 | NOT_STARTED | All major capabilities have one primary owner. |
| MIG-004 | Resolve HIA/Wings4 boundary | P0 | NOT_STARTED | Governance and project-factory responsibilities separated. |
| MIG-005 | Decompose IA.Standars | P1 | NOT_STARTED | Useful doctrine/tools mapped to HUMAN, AI_ENVIRONMENT, SKILLS_GRCS, or history. |
| MIG-006 | Define root Git boundary and ignore policy | P1 | NOT_STARTED | Safe versioning design approved before Git initialization. |
| MIG-007 | Decide physical migration project by project | P2 | NOT_STARTED | Each project has explicit RETAIN/MOVE/ARCHIVE decision. |
| MIG-008 | Resolve HIA dirty state before migration planning | P0 | BLOCKED | HIA worktree is clean or explicitly baselined. |
| MIG-009 | Secret review for VentasReport .env | P0 | NOT_STARTED | Secrets identified, rotated if necessary, and excluded from migration. |
| MIG-010 | Resolve REValuation dirty state | P1 | BLOCKED | Worktree is clean or explicitly baselined. |
| MIG-011 | Confirm portfolio relevance of provisional entities | P1 | NOT_STARTED | Human decisions recorded in registry. |
| MIG-012 | Extract useful content from rejected/legacy entities | P2 | NOT_STARTED | Reusable content preserved before archive/delete decision. |
