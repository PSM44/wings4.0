# Technical Debt Register

| ID | Category | Condition | Impact | Status | Linked backlog |
|---|---|---|---|---|---|
| TD-001 | Repository | Wings3.0 root is not a Git repository. | Portfolio governance lacks versioned global history. | IDENTIFIED | MIG-006 |
| TD-002 | Structure | Wings3.0 mixes generated environments, legacy, projects, backups, and governance. | Discovery and migration are noisy and expensive. | IDENTIFIED | MIG-001, MIG-002 |
| TD-003 | Naming | Legacy names include IA.Standars and inconsistent HUMAN/BATON conventions. | Ambiguity and broken automation risk. | IDENTIFIED | MIG-005 |
| TD-004 | Security | VentasReport contains a local .env file. | Potential credentials or secrets exposure. | IDENTIFIED | MIG-009 |
| TD-005 | Repository state | HIA and REValuation have dirty Git worktrees. | Physical migration cannot be safely baselined. | IDENTIFIED | MIG-008, MIG-010 |
| TD-006 | Portfolio taxonomy | Several Wings3 entries are tests, generated evidence, references, or domain models rather than projects. | Inflated and misleading project inventory. | IDENTIFIED | MIG-011 |
| TD-007 | Governance | Legacy authority models contradict each other. | Silent import could invert human-first governance. | IDENTIFIED | MIG-016 |
| TD-008 | Documentation | IA.Standars mandates monotonic growth and indefinite preservation. | Documentation sprawl and inability to correct or retire obsolete rules. | IDENTIFIED | MIG-016 |
| TD-009 | Tooling | CIS source lacks demonstrated modern tests and contains rigid assumptions. | Unsafe universal adoption risk. | IDENTIFIED | MIG-017 |
| TD-010 | Structure | Legacy governance estate mixes canon, scripts, reports, backups, PDFs, ZIPs, and generated RADAR. | No clean migration boundary. | IDENTIFIED | MIG-017, MIG-018, MIG-019 |
| TD-011 | Encoding | PowerShell double-quoted here-strings converted backtick-zero sequences into NUL characters. | Corrupted Markdown/YAML paths and unreliable parsing. | RESOLVED_IN_SESSION_CLOSE | W4-SG-008 |
| TD-012 | Canon freshness | README still reports FOUNDATION_001 and contains a literal `$TargetRoot`. | Misrepresents current phase and path. | IDENTIFIED | PROD-001 |
| TD-013 | Continuity | Wings4.0 had no active BATON or accumulated idea/opportunity registers. | Session continuation depended on chat context. | RESOLVED_IN_SESSION_CLOSE | W4-SG-010 |
| TD-014 | Product | No visible management-facing output exists. | Governance work has no direct managerial consumption surface. | IDENTIFIED | PROD-001, PROD-003, PROD-004 |
| TD-015 | Portfolio data | Capability and relationship maps remain placeholders. | Ownership and dependency governance are not operational. | IDENTIFIED | GOV-001, GOV-002 |
