---
title: Documentation Responsibility Map and Migration Itinerary
generated_by: Wings4.0
generated_at: 2026-07-31
---

# Documentation Responsibility Map & Migration Itinerary

## Purpose and scope

This file is canonical for the documentation responsibility map and the incremental migration itinerary of Wings4.0.

It does not replace the authoritative sources for principles, decisions, architecture, current evidence, roadmap or operational continuity.

Human-facing and pedagogical documentation may be extensive, explanatory and deliberately repetitive when that improves comprehension. Pedagogical restatement is permitted when the authoritative source is explicitly identified. Conflicting or independently maintained duplicate canon is prohibited.

HUMAN remains the transitional human-first entry point. BATON remains outside HUMAN.

## 1. Documentation responsibility map

| Role | Current source | Intended responsibility | Migration state | Canon and pedagogical-repetition control |
|---|---|---|---|---|
| Project Handbook | `HUMAN/HUMAN.WINGS4.md` as the transitional human-first entry point | A comprehensive human-facing handbook that may include extensive explanation, context, examples and deliberate pedagogical repetition | PHASE_01 | May explain and restate governed material, but must identify authoritative sources and must not silently redefine them |
| Product Overview | `README.md` and relevant HUMAN content | Human-readable explanation of what Wings4.0 is, why it exists, its scope, boundaries, actors and expected use; it may be extensive when required for comprehension | PHASE_01 | Explain and link to authoritative sources; do not create conflicting product canon |
| Constitution | `PORTFOLIO.PRINCIPLES.md` | Stable, non-negotiable portfolio principles and governance doctrine | STABLE | Principles remain authoritative in their governed source; pedagogical explanation must identify that source |
| Current Status | Transitional status explanations distributed across HUMAN and governed state artifacts | Comprehensive, human-readable explanation of the present state, including context, known limitations and links to supporting evidence | PHASE_02 | May summarize and explain BATON or other evidence, but must not replace BATON as operational continuity or create conflicting state claims |
| Architecture Documentation | `PORTFOLIO.RELATIONSHIP_MAP.yaml` and `PORTFOLIO.CAPABILITY_MAP.yaml` | Human-readable architecture overview, ownership explanations and pointers to governed technical representations | PHASE_04 | Preserve authoritative technical maps; explanatory restatement is allowed with explicit attribution |
| Roadmap | `MIGRATION.BACKLOG.md` | Human-readable future direction, priorities and migration sequencing | PHASE_03 | Distinguish future direction from operational continuity; do not present BATON as roadmap |
| User Guide, Tutorials and How-to Guides | Distributed project-specific and repository-local documentation; no governed portfolio-wide index yet | Comprehensive instructional documentation, tutorials, procedures, examples and troubleshooting material | PHASE_05 | Pedagogical repetition is allowed; project-local authoritative instructions must be linked and not silently overridden |
| Q&A or FAQ | `HUMAN/Q_AND_A.md` | Human-facing questions, answers, clarifications and provenance | PHASE_05 | May repeat explanatory context; decisions and principles must retain their authoritative sources |
| Decision Log | `PORTFOLIO.DECISION_LOG.md` | Canonical record of material portfolio decisions, provenance and supporting evidence | STABLE | The Decision Log remains authoritative for recorded portfolio decisions |
| BATON | `00_STATE/BATON.WINGS4.ACTIVE.md` | Operational continuity, immediate state transfer, handoff context and next actions | REMAINS_OUTSIDE_HUMAN | BATON is not the Project Handbook, Product Overview, Current Status document, Architecture Documentation or Roadmap |

## 2. Six-phase migration itinerary

### Phase 01 — Project Handbook entry and documentation map

**Objective:** Establish the transitional human entry point, the canonical documentation responsibility map and the foundation for a comprehensive Project Handbook.

**Minimum action implemented by this pilot:** Create `HUMAN/DOCUMENTATION.MAP.md` and add the entry-point references in `HUMAN/HUMAN.WINGS4.md`.

**Remaining action before full phase closure:** Develop and obtain human approval for the substantive Project Handbook to the depth needed for human understanding.

**Acceptance evidence for this pilot:** The map exists, its repository references resolve and the human accepts the documentation responsibility boundaries.

**Rollback rule:** Remove the map and its entry-point references without changing existing substantive canon.

**Human approval:** Required.

**Status:** `IMPLEMENTED_BY_THIS_PILOT_PENDING_ACCEPTANCE`

### Phase 02 — Stable principles versus current status

**Objective:** Distinguish stable constitutional principles from comprehensive human-readable current-state documentation.

**Minimum action:** Establish explicit responsibilities and references for Constitution and Current Status without treating BATON as the Current Status document.

**Acceptance evidence:** Audit confirms that principles, present-state explanation and operational continuity are distinguishable.

**Rollback rule:** Remove the new labels and references without moving authoritative content.

**Human approval:** Required.

**Status:** `PLANNED`

### Phase 03 — Roadmap versus operational continuity

**Objective:** Separate future direction and priorities from immediate operational continuity.

**Minimum action:** Establish a human-readable Roadmap responsibility linked to `MIGRATION.BACKLOG.md`, while BATON remains outside HUMAN.

**Acceptance evidence:** Roadmap and BATON responsibilities are separately defined and human-approved.

**Rollback rule:** Remove roadmap references without modifying BATON.

**Human approval:** Required.

**Status:** `PLANNED`

### Phase 04 — Architecture-documentation responsibilities

**Objective:** Establish understandable architecture documentation and clarify ownership of its governed sources.

**Minimum action:** Create a human-readable Architecture Overview and define references to the relationship and capability maps.

**Acceptance evidence:** Architecture responsibilities and authoritative sources are explicitly identified and human-approved.

**Rollback rule:** Remove the overview and references without changing authoritative architecture maps.

**Human approval:** Required.

**Status:** `PLANNED`

### Phase 05 — User-facing guides and operating documentation

**Objective:** Establish a governed index and structure for user guides, tutorials, how-to guides, examples and troubleshooting material.

**Minimum action:** Identify existing documentation, its paths and its authority boundaries. Author assignment is future work and must not be assumed.

**Acceptance evidence:** The governed index exists, references resolve and authority boundaries are explicit.

**Rollback rule:** Remove the portfolio-wide index without deleting project-local documentation.

**Human approval:** Required.

**Status:** `PLANNED`

### Phase 06 — Controlled retirement of the HUMAN umbrella

**Objective:** Retire portions of the transitional HUMAN umbrella only after replacement documentation is proven usable.

**Minimum action:** Apply an approved retirement checklist to the first eligible section.

**Acceptance evidence:** Replacement documentation is usable, linked, accepted and supported by a reversible evidence bundle.

**Rollback rule:** Restore the prior HUMAN entry structure until final closure is explicitly approved.

**Human approval:** Required.

**Status:** `PLANNED`

## 3. Governance and rollback

- Migration is incremental, evidence-based and reversible.
- Existing authoritative sources are not silently overridden.
- Human-facing documentation may explain and repeat governed material when the authoritative source is explicit.
- Conflicting or independently maintained duplicate canon is prohibited.
- BATON remains outside HUMAN.
- Content relocation or retirement requires evidence and human approval.
- HUMAN is retired only after replacement documentation is proven understandable and operationally usable.

## 4. Reviewer checklist

- `HUMAN/DOCUMENTATION.MAP.md` defines the documentation responsibilities and six migration phases.
- `HUMAN/HUMAN.WINGS4.md` points to the documentation map and BATON.
- `HUMAN/HUMAN.AUDIT.md` contains five Track B acceptance checks.
- `MIGRATION.BACKLOG.md` contains six compact phase entries referencing this map.
- Referenced repository paths resolve.
- Current Status and BATON remain separate responsibilities.
- Pedagogical explanation and repetition are permitted with authoritative-source attribution.
- No conflicting or independently maintained duplicate canon is introduced.
