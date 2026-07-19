# Technical Debt Register

| ID | Category | Condition | Impact | Status | Linked backlog |
|---|---|---|---|---|---|
| TD-001 | Repository | Wings3.0 root is not a Git repository. | Legacy portfolio governance lacks versioned global history. | IDENTIFIED | MIG-006 |
| TD-002 | Structure | Wings3.0 mixes environments, legacy, projects, backups, and governance. | Discovery and migration are noisy and expensive. | IDENTIFIED | MIG-001, MIG-002 |
| TD-003 | Naming | Legacy names include IA.Standars and inconsistent HUMAN/BATON conventions. | Ambiguity and broken automation risk. | IDENTIFIED | MIG-005 |
| TD-004 | Security | VentasReport contains a local `.env` file. | Potential credentials or secrets exposure. | IDENTIFIED | MIG-009 |
| TD-005 | Repository state | HIA and REValuation have dirty Git worktrees. | Physical migration cannot be safely baselined. | IDENTIFIED | MIG-008, MIG-010 |
| TD-006 | Portfolio taxonomy | Several Wings3 entries are tests, evidence, references, or domain models rather than projects. | Inflated and misleading inventory. | IDENTIFIED | MIG-011 |
| TD-007 | Governance | Legacy authority models contradict one another. | Silent import could invert human-first governance. | MITIGATED | GOV-003, MIG-016 |
| TD-008 | Documentation | Legacy doctrine mandates monotonic growth and indefinite preservation. | Documentation sprawl and inability to retire obsolete rules. | MITIGATED | MIG-016 |
| TD-009 | Tooling | CIS lacks demonstrated modern tests and contains rigid assumptions. | Unsafe universal adoption risk. | IDENTIFIED | MIG-017 |
| TD-010 | Structure | Legacy governance mixes canon, scripts, reports, backups, PDFs, ZIPs, and generated RADAR. | No clean migration boundary. | IDENTIFIED | MIG-017, MIG-018, MIG-019 |
| TD-011 | Encoding | PowerShell here-strings previously generated NUL characters. | Corrupted Markdown/YAML and unreliable parsing. | RESOLVED | W4-SG-008 |
| TD-012 | Canon freshness | README and BATON previously described pre-commit Wave 1 state. | Misrepresented current phase and repository status. | RESOLVED_IN_GOV_001 | GOV-003 |
| TD-013 | Continuity | Wings4.0 originally lacked active BATON and accumulated registers. | Continuity depended on chat context. | RESOLVED | W4-SG-010 |
| TD-014 | Product | No portfolio visualization exists. | No visual management surface. | DEFERRED_BY_DESIGN | PROD-001, PROD-003 |
| TD-015 | Portfolio data | Capability and relationship maps remain placeholders. | Ownership and dependencies are not operational. | ACCEPTED_PENDING_PILOTS | GOV-005, PILOT-001, PILOT-002 |
| TD-016 | Governance validation | The active-project governance cycle has not been proven end-to-end. | Wings4.0 remains conceptually strong but operationally unvalidated. | IDENTIFIED | PILOT-001 to PILOT-004 |
| TD-017 | AI history | `20260716_AI.History.md` is large, noncanonical, untracked, and stored at root. | Worktree noise, privacy risk, and potential misuse as canon. | IDENTIFIED | MIG-019 |
| TD-018 | HUMAN heterogeneity | Project HUMAN files vary in structure, completeness, and freshness. | Cross-project comparison may produce low-confidence conclusions. | IDENTIFIED | GOV-004, GOV-005 |
| TD-019 | Open-source review | No real build-versus-adopt review has been executed. | Project retirement recommendations remain untested. | IDENTIFIED | GOV-006, PILOT-002 |
