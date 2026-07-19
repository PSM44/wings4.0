# Brainy Project-Local Packet — Hermes Knowledge Absorption

Status: READY_FOR_PROJECT_LOCAL_EXECUTION
Portfolio decision basis: DEC-W4-PAIR-003 and DEC-W4-PAIR-004
Target project: Brainy
Expected project root: C:\01. GitHub\Brainy

## 01. Purpose

Provide Brainy with a curated set of durable requirements and source evidence derived from PS.HermesObsidianIntegration.

Brainy must evaluate these requirements against its own architecture and governance. Wings4.0 does not prescribe internal file structure, implementation, tooling or migration mechanics.

## 02. Mandatory project identity gate

Before any Brainy change:

- Confirm active project is Brainy.
- Confirm expected root is C:\01. GitHub\Brainy.
- Confirm operative root shown by commands and outputs.
- Confirm active branch and HEAD.
- Confirm target artifacts are Brainy-local.
- On mismatch, stop with PROJECT_CONTEXT_MISMATCH.

## 03. Durable requirements to evaluate

BR-HT-001 — Human owns structural and privacy decisions.
BR-HT-002 — Personal and Work domains require explicit boundaries.
BR-HT-003 — Work/corporate content is sensitive by default.
BR-HT-004 — Personal-to-Work promotion requires suitability review.
BR-HT-005 — Intake source must be explicitly selected or supplied.
BR-HT-006 — Hidden scans and automatic traversal are prohibited by default.
BR-HT-007 — Use minimum necessary context.
BR-HT-008 — Sensitive content requires approved routing.
BR-HT-009 — Capture passes through privacy, classification and sanitization gates.
BR-HT-010 — Promotion or write-back requires explicit authorization.
BR-HT-011 — Processing generates traceable evidence and next action.
BR-HT-012 — Tool-specific implementation remains replaceable and deferred.

## 04. Source evidence classes

Brainy should use the Wings4.0 inventory and approval package as source evidence:

- HERMES_TO_BRAINY_TRANSFER_INVENTORY.csv
- HERMES_TO_BRAINY_TRANSFER_INVENTORY.md
- HERMES_TO_BRAINY_TRANSFER_REVIEW_APPROVAL.md
- HERMES_TO_BRAINY_ABSORPTION_MAP.md

## 05. Required Brainy-local workflow

1. Inspect current Brainy architecture, canon and active BATON.
2. Map each BR-HT requirement to:
   - already satisfied;
   - partially satisfied;
   - missing;
   - conflicting;
   - not applicable.
3. Identify duplication and avoid copying Hermes files verbatim.
4. Propose Brainy-local changes only where a demonstrated gap exists.
5. Apply changes under Brainy governance, rollback and failure-escalation rules.
6. Produce a Brainy-local evidence package.
7. Resynchronize Brainy canon and BATON.
8. Return a consolidated upload artifact to Wings4.0.

## 06. Explicit prohibitions

- Do not adopt Hermes because it appeared in the source project.
- Do not adopt Obsidian because it appeared in the source project.
- Do not select plugins in this step.
- Do not copy historical release state into Brainy.
- Do not copy stale backlog items as active tasks.
- Do not import the 89 archive-only items into active Brainy canon.
- Do not import the full AI history into active Brainy canon.
- Do not modify PS.HermesObsidianIntegration.
- Do not archive or delete any source project.

## 07. Required output

Brainy must return one consolidated AI-readable file containing:

- identity gate;
- branch and HEAD before/after;
- architecture assessment;
- requirement-by-requirement mapping;
- changes proposed and applied;
- files modified;
- rollback evidence;
- validation results;
- resynchronization result;
- unresolved conflicts;
- next action;
- commit/push status.

## 08. Completion gate

BRAINY_REQUIREMENT_MAPPING_COMPLETE=YES
BRAINY_GAPS_DECIDED=YES
BRAINY_LOCAL_CHANGES_VALIDATED=YES
BRAINY_RESYNCHRONIZATION_PASS=YES
CONSOLIDATED_OUTPUT_CREATED=YES

Archive of the Hermes source project remains unauthorized until Wings4.0 validates the Brainy result.
