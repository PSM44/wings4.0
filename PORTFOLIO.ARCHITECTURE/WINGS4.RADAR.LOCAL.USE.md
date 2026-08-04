# Wings4.0 — RADAR Local Use Specification

STATUS: CLOSED_PASS_DESIGN_LOCAL_USE
IMPLEMENTATION_AUTHORIZED: NO
RADAR_IMPLEMENTATION_AUTHORIZED: NO
DOCUMENT_TYPE: PROJECT_LOCAL_CONFIGURATION_AND_USE
OWNER: Wings4.0
CREATED_FOR: WINGS4_RADAR_002 (corrected minimum local-use scope)
TRACE: DEC-W4-040; DEC-W4-044; DEC-W4-045; Q-038; Q-039; Q-043; Q-044; Q-045..Q-061
WINGS4_RADAR_002_STATUS: CLOSED_PASS_DESIGN_LOCAL_USE
APPROVED_BY: DEC-W4-045
CONTROL_ROOM_RELATION: NOT_THIS_DELIVERABLE_DISPOSABLE_PROOF_ONLY

## 1. Purpose

Wings4-local RADAR exists so ORCHESTRATOR AI and EXECUTOR AI can obtain bounded, current, physical evidence from the local project root when cloud AI cannot directly see:

- the complete project-root location and structure;
- the contents of the relevant Core;
- whether declared changes were actually executed.

RADAR is AI-only infrastructure. It has no direct human or management purpose and is not a management deliverable.

## 2. Local identity

| Field | Value |
|---|---|
| Local owner | Wings4.0 |
| Project root | `C:\01. GitHub\Wings4.0` |
| Unit of analysis | This project root only |
| Users | ORCHESTRATOR AI; EXECUTOR AI |
| Behavior | Monitor only; never edits |
| Execution | On demand, when an AI needs it |
| Output lifecycle | Disposable |
| Output principle | Minimum useful machine evidence |

## 3. Source hierarchy

1. **Semantic authority:** HUMAN definition or latest human-approved version.
2. **Physical execution evidence:** Git state, runtime facts and local files under the project root.
3. **Unresolved discrepancies:** explicit CONFLICT or UNKNOWN. Unverifiable evidence must be marked UNKNOWN.
4. Runtime evidence may prove execution state. It must not silently redefine HUMAN intent.

## 4. Wings4-local configuration and use boundaries

Wings4 may define only:

- project-local ownership and root scope;
- when AI may request RADAR;
- which local exclusions apply;
- how disposable outputs are consumed by ORCHESTRATOR/EXECUTOR sessions;
- how UNKNOWN and CONFLICT are labeled in session evidence.

Wings4 must not:

- redesign reusable RADAR Skills/GRC canon;
- invent universal signal classes, severity levels, stop behavior or pilot breadth;
- copy Wings3 RADAR scripts or outputs;
- treat RADAR as a dashboard, project, product or executive deliverable.

## 5. Mandatory exclusions

- `.git` internals as appropriate for safe monitoring (no destructive or write access).
- Generated outputs and self-ingestion loops.
- `AI.History/`:
  - full exclusion from RADAR.CORE;
  - at most one folder-level reference in RADAR.INDEX;
  - no per-file inventory, hash, timestamp, summary or change tracking;
  - no content inspection.
- Child-project roots outside Wings4.0 are out of scope for Wings4-local RADAR.

## 6. SkillsMachine dependency

Reusable RADAR Skills/GRC definitions are owned by SkillsMachine (`Q-037`, `Q-044`, `Q-055`).

If SkillsMachine menu or canonical RADAR guidance is unavailable in this repository:

- register the dependency as OPEN;
- do not invent substitute generic RADAR capability inside Wings4;
- Wings4 work remains limited to local configuration/use specification.

OPEN_DEPENDENCY: `SKILLSMACHINE_RADAR_CANON_AND_MENU_GUIDANCE`

## 7. Default FULL output posture

If FULL output mode already exists in reusable SkillsMachine guidance, Wings4 default for local use is **disabled** until explicitly authorized. This document does not authorize enabling FULL output and does not define a Wings4-local FULL schema.

## 8. Explicit non-goals

- Management visualization or gerencia reporting.
- Human decision substitution.
- Portfolio-wide or global RADAR ownership.
- Generator implementation in this design task.
- Child-project mutation.
- Commit/push authorization.

## 9. Open items (do not invent)

| Item | State |
|---|---|
| Signal classes | UNKNOWN unless SkillsMachine canon provides them |
| Severity levels | UNKNOWN unless SkillsMachine canon provides them |
| Stop behavior | UNKNOWN unless SkillsMachine canon provides them |
| Pilot breadth | UNKNOWN unless SkillsMachine canon provides them |

## 10. Acceptance for this design artifact

- Local owner, root, AI users, monitor-only behavior and disposable minimum-output principle are explicit.
- Source hierarchy and AI.History exclusions are explicit.
- SkillsMachine reusable-ownership boundary is explicit.
- No reusable capability reinvention.
- `IMPLEMENTATION_AUTHORIZED=NO`.
