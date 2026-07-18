# Technical Debt Register

| ID | Category | Condition | Impact | Status | Linked backlog |
|---|---|---|---|---|---|
| TD-001 | Repository | Wings3.0 root is not a Git repository. | Portfolio governance lacks versioned global history. | IDENTIFIED | MIG-006 |
| TD-002 | Structure | Wings3.0 mixes generated environments, legacy, projects, backups, and governance. | Discovery and migration are noisy and expensive. | IDENTIFIED | MIG-001, MIG-002 |
| TD-003 | Naming | Legacy names include IA.Standars and inconsistent HUMAN/BATON conventions. | Ambiguity and broken automation risk. | IDENTIFIED | MIG-005 |
| TD-004 | Security | VentasReport contains a local .env file. | Potential credentials or secrets exposure. | IDENTIFIED | MIG-009 |
| TD-005 | Repository state | HIA and REValuation have dirty Git worktrees. | Physical migration cannot be safely baselined. | IDENTIFIED | MIG-008, MIG-010 |
| TD-006 | Portfolio taxonomy | Several Wings3 entries are tests, generated evidence, references, or domain models rather than projects. | Inflated and misleading project inventory. | IDENTIFIED | MIG-011 |
