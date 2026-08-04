# Wings3 RADAR to Wings4 Assessment

STATUS: READ_ONLY_ASSESSMENT_COMPLETE
MINIBATTLE: WINGS4_RADAR_001
GENERATED_AT: 2026-08-04T12:32:22-04:00
SOURCE_HEAD_WINGS4: fbbbbef459ec0158ee9b79cf0f257c5da1f7ed91
IMPLEMENTATION_AUTHORIZED: NO
ASSESSMENT_SCOPE=READ_ONLY_FOR_SELECTIVE_ABSORPTION
ABSORPTION_PERFORMED=NO
CHILD_PROJECT_MUTATION: NO
AI_HISTORY_INSPECTED: NO

## 01. Purpose

Assess legacy Wings3.0 RADAR artifacts for selective absorption into a future Wings4.0 project-local RADAR. This document is evidence only. It does not authorize implementation, copying, deletion or commit.

## 02. Source inventory

Primary source root: `C:\01. GitHub\Wings3.0\02_RADAR`

| Path | Size bytes | Role |
|---|---:|---|
| RADAR.CORE.txt | 408349 | Full-text consolidation of readable files |
| RADAR.FULL.txt | 410862 | INDEX + CORE concatenation |
| RADAR.INDEX.txt | 2315 | Per-file inventory with size and timestamps |
| _SCRIPTS\RADAR.ps1 | 4177 | Generator script (PowerShell) |
| _SNAPSHOTS\ | dir | Snapshot accumulation area present |

Secondary sources were not required for the minimum assessment. `IA.History` / `AI.History` variants were not inspected.

## 03. Element dispositions

| Element | Disposition | Rationale |
|---|---|---|
| INDEX/CORE/FULL conceptual split | ADAPT_FOR_WINGS4 | Useful separation of concerns; Wings4 purposes differ (INDEX=minimal structure/pointers; CORE=bounded textual evidence; FULL default disabled). |
| Hardcoded `$ROOT = C:\01. GitHub\Wings3.0` | ADAPT_FOR_WINGS4 | Must resolve from Git project root at runtime for Wings4.0 only. |
| Extension exclusion list | ADAPT_FOR_WINGS4 | Keep binary/media exclusions; extend for Wings4 anti-sprawl needs. |
| Folder exclusion list | ADAPT_FOR_WINGS4 | Must include `AI.History/`, generated RADAR outputs, `.git`, and similar; current list omits history folders. |
| INDEX per-file size/timestamp inventory | REJECT_OBSOLETE for AI.History; ADAPT_FOR_WINGS4 elsewhere | Wings4 INDEX must be minimal structure/pointers. AI.History may have at most one folder-level reference with no inventory/hash/timestamp/summary/tracking. |
| CORE full-content dump of all readable files | REIMPLEMENT_MINIMAL | Unbounded content consolidation (~400KB+) is incompatible with bounded textual evidence and anti-sprawl. |
| FULL always-on generation | REJECT_OBSOLETE | Wings4 requires `RADAR_FULL_DEFAULT=DISABLED`. |
| `_SNAPSHOTS` history accumulation | REJECT_OBSOLETE as default | History accumulation must be NO_BY_DEFAULT. |
| Generator role ("NO evalúa, NO decide, NO interpreta") | ADOPT_AS_IS | Aligns with Wings4 evidence model. |
| PowerShell 5.1 basic script shape | ADAPT_FOR_WINGS4 | Compatible baseline, but needs heartbeat, stricter exclusions, deterministic bounded outputs, and safer encoding writes. |
| Heartbeat support | REIMPLEMENT_MINIMAL | Not present in legacy script. |
| Deterministic output / idempotence | REIMPLEMENT_MINIMAL | Timestamped full regenerations and self-inclusion of prior RADAR outputs undermine determinism and create sprawl. |
| Error handling | ADAPT_FOR_WINGS4 | Legacy catches unreadable files; Wings4 needs explicit fail/skip policy and non-zero exits on hard failures. |
| Runtime cost / dependency footprint | ADAPT_FOR_WINGS4 | Recursing and reading all text content is expensive; Wings4 must bound paths and size. |
| Compatibility with HUMAN/BATON/evidence | ADAPT_FOR_WINGS4 | Concept fits; outputs must remain regenerable evidence, not canon. |
| SkillsMachine RADAR Skill (if any) | DEFER_INSUFFICIENT_EVIDENCE for content; ADOPT boundary | Consult only as reusable guidance; no authority/intervention rights (`DEC-W4-044`). |
| AI.History exclusion controls | REIMPLEMENT_MINIMAL | Legacy script does not implement DEC-W4-040 / DEC-W4-044 AI.History rules. |

## 04. Assessment against required criteria

1. Project-root scoping: hardcoded Wings3 path — ADAPT.
2. Output types/size: INDEX small; CORE/FULL very large — REIMPLEMENT bounds.
3. INDEX vs CORE vs FULL responsibilities: present but misaligned with Wings4 purposes — ADAPT.
4. Exclusion controls: partial — ADAPT and extend.
5. AI.History complete exclusion from CORE: missing — REIMPLEMENT.
6. Optional minimal folder-level INDEX reference for AI.History: missing — REIMPLEMENT.
7. No per-file inventory/hashes/timestamps/summaries/tracking for AI.History: violated by INDEX design if applied — REIMPLEMENT.
8. Repository-bound execution: intended but hardcoded — ADAPT.
9. Generated output lifecycle: overwrite in place + snapshots — ADAPT/REJECT default accumulation.
10. History accumulation/anti-sprawl: weak — REJECT default accumulation.
11. PowerShell 5.1 compatibility: yes as baseline — ADOPT/ADAPT.
12. Heartbeat support: absent — REIMPLEMENT.
13. Deterministic output: weak — REIMPLEMENT.
14. Error handling: minimal — ADAPT.
15. Idempotence: weak — REIMPLEMENT.
16. Runtime cost: high due to full content read — REIMPLEMENT bounds.
17. Dependency footprint: low (native PowerShell) — ADOPT.
18. HUMAN/BATON/evidence compatibility: conceptual yes — ADAPT placement and semantics.
19. SkillsMachine Skill: guidance only, no authority — boundary ADOPT.
20. Residual gap requiring new development: Wings4-local generator with project-root resolve, AI.History policy, bounded CORE, minimal INDEX, FULL disabled, heartbeat, deterministic overwrite without default snapshot sprawl.

## 05. Boundary proposal

```
RADAR_OWNER=WINGS4.0
RADAR_SCOPE=C:\01. GitHub\Wings4.0
RADAR_EXECUTION=PROJECT_LOCAL
RADAR_INDEX_PURPOSE=MINIMAL_STRUCTURE_AND_POINTERS
RADAR_CORE_PURPOSE=BOUNDED_TEXTUAL_EVIDENCE
RADAR_FULL_DEFAULT=DISABLED
AI_HISTORY_CORE=FULL_EXCLUSION
AI_HISTORY_INDEX=OPTIONAL_SINGLE_FOLDER_REFERENCE_ONLY
AI_HISTORY_CONTENT_INSPECTION=PROHIBITED
AI_HISTORY_FILE_INVENTORY=PROHIBITED
AI_HISTORY_HASHING=PROHIBITED
AI_HISTORY_TIMESTAMPS=PROHIBITED
AI_HISTORY_CHANGE_TRACKING=PROHIBITED
HISTORY_ACCUMULATION=NO_BY_DEFAULT
OUTPUT_ROOT_PROPOSAL=C:\01. GitHub\Wings4.0\02_RADAR
IMPLEMENTATION_AUTHORIZED=NO
```

## 06. Recommendation

Do not copy Wings3 RADAR outputs or script as-is into Wings4.0. Authorize a later Wings4-local minibattle to implement a minimal adapted generator under the boundary above after explicit human authorization. Keep SkillsMachine consulted only for reusable Skill/GRC guidance if a RADAR Skill exists later.

## 07. Explicit non-actions

- No files copied from Wings3.0 into Wings4.0.
- No Wings3.0 mutation.
- No AI.History / IA.History inspection.
- No implementation, staging, commit or push.
