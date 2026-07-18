# Legacy Doctrine Register

## Purpose

This register records reusable principles discovered in Wings3.0 without granting canonical status to the original files.

Source estate remains read-only:

C:\01. GitHub\Wings3.0

## Classification vocabulary

- **ADOPT** — compatible with Wings4.0 and suitable for incorporation.
- **ADAPT** — useful principle requiring narrower wording or modernized scope.
- **HISTORY** — valuable as historical context, not current doctrine.
- **REJECT** — incompatible with Wings4.0 governance.
- **TOOL_CANDIDATE** — potentially reusable implementation requiring separate technical review.

## Reusable doctrine

| ID | Legacy concept | Source | Decision | Wings4 destination | Rationale |
|---|---|---|---|---|---|
| LD-001 | Human is final authority | 00_SYSTEM\HUMAN.README.txt; CANON.GLOBAL.txt | ADOPT | HUMAN/HUMAN.WINGS4.md; PORTFOLIO.PRINCIPLES.md | Consistent with current authority model. |
| LD-002 | Files retain durable memory; chat context is temporary | 00_SYSTEM\HUMAN.README.txt; CANON.GLOBAL.txt | ADAPT | HUMAN standard and AI environment | Keep distinction, but allow governed external memory systems and repositories. |
| LD-003 | BATON summarizes current state but does not create truth | 00_SYSTEM\BATON.STATE.txt | ADOPT | Future BATON standard | Clear separation between canon and dynamic state. |
| LD-004 | Continuity must be explicit and reproducible | BATON.HANDOFF.txt; FRAME.OPERACION | ADOPT | Assimilation runbook and future continuity standard | Valid operational principle. |
| LD-005 | Observation and correction must remain separate | FRAME.RADAR.ERROR; RADAR.Full | ADOPT | RADAR standard | Prevents automated action based on incomplete evidence. |
| LD-006 | Relevant changes require traceability and rollback | FRAME.ERRORS; CIS materials | ADOPT | Runbook, decisions, audit and technical change controls | Core portfolio requirement. |
| LD-007 | Errors should produce structural prevention | FRAME.ERRORS | ADAPT | TECH_DEBT, AUDIT, Skills/GRC opportunities | Preserve learning, but do not require permanent duplication of every error artifact. |
| LD-008 | Generated inventory is evidence, not canon | RADAR.Full | ADOPT | RADAR and ARTIFACTS policy | Already aligned with Wings4.0. |
| LD-009 | Context should be curated for the task | BATON.HANDOFF.txt; ORCHESTRATOR.SPEC.txt | ADAPT | AI_ENVIRONMENT | Avoid universal denial of direct source access; apply least-context-needed pragmatically. |
| LD-010 | Under uncertainty, stop rather than execute destructive change | multiple legacy governance files | ADOPT | Assimilation runbook | Appropriate for irreversible or high-risk operations. |
| LD-011 | Fatigue and urgency increase governance risk | HUMAN and FRAME.OPERACION | ADAPT | Human operating guidance | Use as risk indicator, not absolute prohibition on all work. |
| LD-012 | Tools and scripts must not silently redefine governance | BATON.MAP; RADAR.Full | ADOPT | AGENTS, Skills/GRC governance | Maintains authority boundaries. |

## Rejected or non-canonical doctrine

| ID | Legacy rule | Source | Decision | Reason |
|---|---|---|---|---|
| LR-001 | CANON outranks HUMAN | IA.Standars\00.00_CANON.txt | REJECT | Wings4.0 is human-first; doctrine cannot outrank the human authority layer. |
| LR-002 | Priority IA over human readability | IA.Standars\00.00_CANON.txt | REJECT | Directly conflicts with HUMAN-first design. |
| LR-003 | Every existing file contains valid knowledge until explicitly rejected | IA.Standars\00.00_CANON.txt | REJECT | Files may be generated, duplicated, obsolete, unsafe, empty, or wrong. |
| LR-004 | Knowledge must only grow and never decrease | CANON and editing frame | REJECT | Causes documentation sprawl and prevents controlled correction, consolidation, and retirement. |
| LR-005 | New versions may never have fewer headings or less text | CANON and editing frame | REJECT | Structure and length are not proxies for semantic completeness. |
| LR-006 | Manual editing of canonical files is universally prohibited | HUMAN and CIS material | REJECT | Git-governed human editing can be safe, traceable, reviewable, and necessary. |
| LR-007 | CIS is the sole valid mechanism for all relevant change | FRAME.OPERACION and CIS | REJECT | A single legacy mechanism cannot govern a heterogeneous portfolio universally. |
| LR-008 | Any delivery without specific FDT/checkpoint formatting is invalid | FRAME.OPERACION and TXT format | REJECT | Overly rigid and tied to historical chat transport constraints. |
| LR-009 | All errors and false positives must be preserved indefinitely | FRAME.ERRORS and RADAR | REJECT | Preserve material evidence proportionately; avoid permanent noise. |
| LR-010 | The orchestrator may not analyze deeply or evaluate output quality | ORCHESTRATOR.SPEC | REJECT | Artificial role restriction incompatible with modern AI-assisted workflows. |

## Tool candidates requiring separate review

| ID | Candidate | Preliminary disposition | Required review |
|---|---|---|---|
| LT-001 | 09.00_CIS\09.01_CIS.CORE.ps1 | TOOL_CANDIDATE | Parser correctness, backup behavior, security, portability, tests, and current usefulness. |
| LT-002 | 09.00_CIS\09.01_CIS.EDITOR.py | TOOL_CANDIDATE | Operation parser defects, path safety, atomicity, rollback, tests, and semantic limitations. |
| LT-003 | 10.00_Tools\IAStandards.StructureAssistant.ps1 | TOOL_CANDIDATE | Determine whether functionality duplicates current tooling. |
| LT-004 | RADAR scripts and 07.01_RADAR.Full.txt | TOOL_CANDIDATE | Compare with current RADAR conventions and Skills/GRC ownership. |
| LT-005 | CIS templates | HISTORY / TEMPLATE_CANDIDATE | Extract useful schema ideas only after evaluating current HUMAN standard. |

## Structural defects observed

1. 07_HUMAN.README is empty and cannot serve as a source layer.
2. IAPlan.History.Itheration is empty.
3. Portafolio contains only a transcript about GitHub profile presentation; it is personal career reference material, not portfolio governance.
4. IA.Standars combines doctrine, HUMAN guidance, scripts, reports, backups, generated RADAR, chat PDFs, ZIP files, and state.
5. Two zero-byte HUMAN files exist in IA.Standars.
6. 08.00_FRAME.GOVERNANCE.txt begins with template content and then appends governance fragments, indicating structural corruption or failed injection.
7. IA.Standars contains extensive duplicated CIS injection backups.
8. Large generated RADAR files dominate the source and must not be migrated into canon.
9. Naming is inconsistent: IA.Standars versus embedded references to IA.Standards.
10. The legacy system contains mutually contradictory authority models.

## Wave 1 conclusion

The legacy governance estate is valuable as evidence and as a source of selected principles. It is not suitable for whole-folder migration or direct canonical adoption.
