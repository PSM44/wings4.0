# HUMAN — Wings4.0

## 1. Identity

Wings4.0 is Pablo's portfolio architecture and governance system.

Distinguish:

- PRODUCTO_WINGS4: what the user operates (interactive diagnosis, decision recording, portfolio understanding).
- PROYECTO_WINGS4: the development process that builds and evolves that product.
- REPOSITORIO_WINGS4: the versioned logical unit where ORCHESTRATOR and EXECUTOR develop and govern Wings4.
- ROOT_WINGS4: the physical location of that repository on disk.
- ROOT_ACTUAL: `C:\01. GitHub\Wings4.0`.

It is not a governed child project, delivery factory, monorepo, or replacement for project-local governance. Wings4.0 is the portfolio governance product and the repository used to develop and operate that product.

<!-- Documentation Standardization pointer (Track B) -->
HUMAN remains the transitional human-first entry point. See `HUMAN/DOCUMENTATION.MAP.md` for the documentation responsibility map and incremental migration itinerary. Operational continuity (BATON) is maintained in `00_STATE/BATON.WINGS4.ACTIVE.md`, which remains outside HUMAN.

## 2. Purpose

Wings4 maintains an integrated, current and actionable understanding of the complete portfolio. It detects conflicts, discrepancies, interference, omissions, duplication and opportunities; checks whether existing portfolio capabilities or external solutions can replace or complement planned development; recommends and prioritizes action; coordinates controlled execution through the appropriate project authority; and independently verifies the resulting state while preserving human authority and project-local governance.

Wings4.0 exists to make the complete portfolio understandable and coordinated by:

- listening to the canonical HUMAN of each portfolio entity;
- consolidating identity, purpose, boundaries, capabilities, and relationships across portfolio entities;
- detecting conflicts, discrepancies, interferences, omissions, duplication, overlap, ambiguity, and missing ownership within entities and across the portfolio;
- identifying opportunities for optional integration;
- performing bounded on-demand MARKET_CHECK when material build/project decisions may already have internal or external solutions;
- presenting evidence, alternatives, risks, and recommendations to the human authority;
- preparing project-specific intervention requests after human approval;
- verifying returned intervention evidence (Ring2 return verification) and, when later authorized, obtaining fresh independent evidence for full resynchronization.

Daily user outcome: before Pablo starts work in individual projects, Wings should make clear whether the portfolio is synchronized; what materially changed; what projects interfere or overlap; what requires a decision; what remains UNKNOWN; and what relevant internal or external alternatives could reduce or replace planned work.

Presentations, reports, BATON, RADAR, GRC, architecture, promises and planning alone are not product functionality. Product value requires operable demonstrated behavior.

## 3. Human interaction

Pablo is the initial operational user, portfolio sponsor, and final decision authority.

Wings presents one unified user-facing product. ORCHESTRATOR, EXECUTOR, workers, tools or subagents may remain internal implementation roles; Pablo should not manually coordinate multiple Wings personas.

Gerencia represents the consumer's eyes: reviews live demonstrations and declares readiness for deploy. Gerencia is not the initial operational user unless later decided.

Wings is push-first and pull-supported: it should proactively surface material changes, desynchronization, conflicts, duplication, opportunities, unknowns, external solutions and decisions requiring attention, while still allowing pull exploration.

### Interaction language / Cambridge C1 coaching

Durable user-interaction preference (transversal continuity; distinct from Ring0 UI language DEC-W4-055 / Q-086):

- PRIMARY_INTERACTION_LANGUAGE=ENGLISH
- CAMBRIDGE_C1_COACHING=ACTIVE
- ENGLISH_CORRECTION_MODE=CONTINUOUS_NON_BLOCKING
- PERIODIC_LANGUAGE_WEAKNESS_REVIEW=YES
- SPANISH_ONLY_ON_HUMAN_REQUEST=YES

Conduct substantive Wings4 conversation in English by default. The human may write imperfect English. Continuously monitor grammar, vocabulary, spelling, phrasing, register, and professional writing quality; correct important errors concisely without interrupting project work; explain recurring mistakes; periodically identify areas to reinforce. Do not switch to Spanish unless the human explicitly requests it.

The operating cycle is:

1. Wings4.0 receives or reads a portfolio-entity HUMAN or equivalent evidence.
2. Wings4.0 interprets the declared purpose, boundaries, capabilities, and relationships.
3. Wings4.0 compares the entity with the governed portfolio.
4. Wings4.0 separates facts from interpretations and records confidence.
5. Wings4.0 presents conflicts, duplication candidates, integration opportunities, and alternatives.
6. Pablo approves, rejects, modifies, or defers a portfolio decision.
7. Wings4.0 prepares a focalized request for each affected project/entity.
8. Each affected project evaluates the approved intervention under its own local governance and implements only the locally accepted changes consistent with the portfolio decision.
9. Wings4.0 verifies return evidence and, when later authorized, obtains fresh independent evidence to confirm resynchronization.

## 4. Authority model

- Pablo is the final authority for portfolio decisions.
- Wings4.0 observes, consolidates, compares, explains, recommends, records, and verifies.
- Wings4.0 does not silently redefine project-local canon.
- Wings4.0 does not directly modify another project without a separately approved intervention.
- Each project retains its own local canon for project-specific matters.
- Portfolio decisions become effective only after explicit human approval and controlled implementation in affected projects.

## 5. Project independence

Each principal product or system should remain independently understandable and operable.

Optional integration is allowed and encouraged when it creates real value, but it must be explicit and contractual.

Not all projects need to integrate. `UNRELATED` is a valid portfolio relationship when no natural or valuable integration exists.

Modules, adapters, plugins, standards, Skills, and GRCs may intentionally depend on a host or consuming context, but that dependency must be declared.

## 6. Duplication and consolidation

Projects become consolidation candidates when they materially overlap in:

- problem solved;
- primary user;
- primary outcome;
- core capabilities;
- owned data or canon;
- roadmap or responsibility.

Shared technology alone is not evidence of duplication.

Wings4.0 does not merge or retire projects automatically. It prepares a review and Pablo decides.

## 7. Build, adopt, integrate, or retire

Before material custom development, Wings should evaluate when relevant:

1. existing capability in the same project;
2. reusable capability elsewhere in the portfolio;
3. reusable Skills/GRC;
4. suitable open-source solution;
5. suitable commercial solution;
6. justified residual custom development.

MARKET_CHECK is the bounded on-demand diagnostic for this review. Continuous/proactive MARKET_MONITORING is a separate future capability and remains unauthorized. Discovery alone does not authorize adoption.

The existence of an external solution does not automatically terminate a project. It triggers an evidence-based review of:

- functional coverage;
- maturity and maintenance;
- security and privacy;
- license;
- integration cost;
- total cost of ownership;
- reversibility;
- strategic differentiation.

Possible outcomes are `CONTINUE_BUILD`, `ADOPT`, `ADOPT_AND_EXTEND`, `INTEGRATE`, `MIGRATE_AND_RETIRE`, or `DEFER`.

## 8. Evidence model

- HUMAN is the canonical declarative voice of a project.
- BATON describes dynamic operational continuity.
- RADAR is project-local AI evidence infrastructure: it monitors the project root, never edits, and produces disposable machine-oriented evidence for ORCHESTRATOR/EXECUTOR AI. It is not a management deliverable, dashboard, human decision engine or portfolio product.
- Each project owns, configures, executes and governs its own RADAR.
- Wings4.0 must have a project-local RADAR scoped to `C:\01. GitHub\Wings4.0`.
- SkillsMachine owns reusable RADAR Skills/GRC canon; Wings4 defines only project-local configuration, boundaries and use, and must not redesign those reusable assets locally.
- There is no global RADAR owner and none is required.
- Wings4.0 may use bounded descendant evidence to identify possible drift, but it must not silently replace the HUMAN interpretation.
- Every material finding should preserve source, evidence, interpretation, confidence, and human decision.
- Core finding classes include CONFLICT, DISCREPANCY, INTERFERENCE, OMISSION, DUPLICATION, OPPORTUNITY and EXTERNAL_SOLUTION.
- FACT, INFERENCE and RECOMMENDATION must remain distinguishable.
- UNKNOWN must state why evidence is insufficient, what evidence would resolve it and a bounded next action; UNKNOWN must never be silently converted to certainty.
- Dynamic operational state belongs in BATON and session outputs, not in HUMAN.

## 9. Legacy relation

Wings3.0 is the legacy predecessor of Wings4.0 and a selective source estate. Its content is not automatically canonical in Wings4.0.

Wings4.0 must selectively absorb useful content and capabilities from Wings3.0 under governed assessment. Wings3.0 should eventually be retired and physically removed only after complete governed extraction, validation, disposition and explicit human authorization.

Legacy assimilation remains selective and reversible:

1. discover;
2. classify;
3. assess;
4. map;
5. extract approved meaning;
6. validate;
7. integrate only after authorization;
8. migrate physically only when independently justified;
9. retire and remove only after explicit human authorization.

## 10. Core operating principle

Wings4.0 reads, analyzes, coordinates, and recommends.
Pablo approves, rejects, modifies, or defers portfolio decisions.
Wings4.0 prepares evidence-backed intervention requests.
Each affected project evaluates and implements accepted changes under its own local canon and governance.
Wings4.0 verifies returned evidence and, when later authorized, obtains fresh independent evidence for full resynchronization.

Preferred governed-work execution uses Bounded Outcome Loops: outcome, success condition, mutation boundary, readable context, prohibitions, evidence contract and escalation path; maximum six iterations; one mutation owner per artifact/workstream; cross-boundary discoveries escalate rather than mutate outside ownership.

Wings must reduce net human effort, elapsed delivery time, errors, duplicated work and unnecessary development. If repeated real cases require equal or greater effort than direct project operation, redesign, scope reduction or replacement must be considered.

## 11. Architecture and deploy constraints

- Memory, persistent context and confidential information remain local.
- AI may be local or cloud and must remain provider-neutral.
- Local agents are optional according to machine capacity and human decision.
- First deploy is local and for a single user.
- Initial deploy means a non-development user can operate the product functionally.
- Minimum deploy criteria: functionality, stability, real data and repeatability.
- Gerencia declares deploy readiness.

## 12. Current limitations

- Foundational Brainy governance cycle for Skill-boundary scope is closed (`PC-012=CLOSED_RESOLVED`, `PILOT-004=COMPLETED_RESYNCHRONIZED`, `DEC-W4-046`).
- PC-013 is resolved as capability unassigned until a real use case (`DEC-W4-054`); Hermes remains `FROZEN_ARCHIVE` and must not be reactivated without separate authorization.
- Capability ownership and relationship maps remain intentionally incomplete pending further human approvals.
- Existing project HUMAN files vary in quality and structure.
- Open-source substitution review has not yet been exercised on a real product decision.
- Wings4.0 project-local RADAR is required as AI-only local evidence infrastructure but is not yet implemented; implementation remains unauthorized.
- Product Ring0 (SkillsMachine interactive diagnosis) is committed and accepted as the first cumulative functional baseline; it does not mutate SkillsMachine.
- Product Ring1 (decision lifecycle + minimal controlled intervention package export) is committed in the cumulative Ring1/Ring2 baseline (`03a589d`) and live-validated under W4P005; it does not mutate SkillsMachine.
- Product Ring2 is committed as RETURN VERIFICATION (return-evidence correlation/verification) in the same baseline; it is Wings4-local only and is not full independent child-state resynchronization. Human negative-path PASS and browser-automated valid-return VERIFIED_PASS are recorded.
- Independent resynchronization beyond Ring2 return verification remains unimplemented.
- Rings 3..5 and proactive MARKET_MONITORING remain unauthorized; bounded on-demand MARKET_CHECK is part of current product diagnostic direction and must not be deferred solely because Ring5 monitoring is unauthorized.
- Dynamic state (HEAD, worktree, next minibattle) is intentionally excluded from this HUMAN file.

## External solutions before material custom development

Before developing a new capability or materially expanding an existing one, the portfolio should consider whether an external solution, especially a suitable open-source solution, can replace, complement or integrate with the proposed work.

The review may begin in any project. Each affected project evaluates local functional and technical fit. Wings4 coordinates when the candidate affects multiple projects, creates duplication, changes capability ownership, changes project purpose or lifecycle, or could replace a portfolio project.

External discovery and evaluation do not authorize adoption or implementation. The final decision remains with the human owner.

## Project implementation modes and governed Stack

Projects may be implemented through different valid modes:

- autonomous and independently operable systems;
- complementary systems that provide value without becoming mandatory dependencies;
- explicitly integrated systems governed by interfaces and contracts;
- unrelated systems when no useful relationship exists;
- governed Stacks that combine existing external components with project-specific configuration, integration and residual proprietary development.

A Stack is a governed, project-specific implementation composition. It may include open-source tools, justified commercial tools, configuration, adapters, reusable Skills and GRCs, shared services and proprietary components.

Project identity, purpose, ownership and lifecycle remain distinct from the replaceable technical composition used to implement the project.

The portfolio follows these rules:

- project independence is the default;
- integration is optional, explicit and reversible;
- shared technology does not by itself justify project consolidation;
- use of external components does not remove project identity;
- a project may remain completely autonomous;
- a project may complement other projects without requiring merger;
- a project may support multiple Stacks when they preserve the same approved purpose and ownership;
- external components should remain replaceable where reasonably possible;
- residual custom development should focus on unmet requirements, differentiation and governed integration;
- Wings4 governs portfolio relationships and disposition, not detailed child-project architecture;
- Pablo remains the final authority for adoption, integration, replacement, retirement and project disposition.

The canonical term is Stack. Flavor remains only as a legacy alias. No mass rename of historical records is authorized by this HUMAN file.

## Hub-and-spoke portfolio coordination

Wings4 is the single coordination hub for the project portfolio during development.

The development communication model is:

PROJECT -> WINGS4 -> PROJECT

Direct project-to-project coordination, governance handoffs and instructions are prohibited by default during development.

A project that detects a dependency, reusable capability, conflict, duplication, external-solution opportunity or portfolio impact must emit a signal to Wings4 and stop at that boundary. Wings4 decides whether another project must be involved.

SkillsMachine is the canonical owner of reusable Skills/GRC canon and the preferred delivery messenger for distributing and maintaining the approved Wings4 coordination surface inside project deliveries. SkillsMachine does not intervene in other projects' governance, architecture, backlog, RADAR ownership or execution. SkillsMachine is not the coordination hub and does not acquire authority over project routing, portfolio directives, project architecture or cross-project decisions.

Each governed project may contain a minimal local coordination surface:

<PROJECT_ROOT>\00_WINGS4_COORD

The local surface is an interface only. It must not become a second HUMAN, BATON, backlog, evidence archive or copy of Wings4.

Minimum files:

- COORD.CONTRACT.md
- OUTBOUND.SIGNAL.md
- INBOUND.DIRECTIVE.md
- COORD.STATE.md

During development:

- projects emit outbound signals only to Wings4;
- Wings4 emits inbound directives to projects;
- projects return results only to Wings4;
- SkillsMachine may create, validate, repair and update the interface through approved delivery workflows;
- SkillsMachine may package project signals but may not originate Wings4 portfolio directives;
- direct project-to-project instructions are not authoritative;
- no project manages another project's backlog, HUMAN, architecture, RADAR or implementation.

During deployment, projects may optionally integrate or operate together when an approved PROJECT.INTERFACE defines ownership, data boundaries, failure modes, rollback, reversibility and standalone operability.

Deployment integration does not change Wings4's role as the portfolio coordination hub for material cross-project changes.

## Project-local RADAR ownership

- Every project owns its own RADAR as monitor-only, on-demand AI evidence infrastructure over the project root.
- Wings4.0 owns its project-local RADAR configuration, boundaries, use and eventual execution; reusable RADAR capability design remains SkillsMachine-owned.
- A reusable RADAR Skill/GRC in SkillsMachine does not transfer ownership or execution authority and must not be redesigned inside Wings4.
- Global RADAR ownership is not applicable.
- RADAR outputs are disposable and machine-oriented; RADAR is not a human or management deliverable (`Q-045`..`Q-056`).
- `AI.History/` remains fully excluded from RADAR.CORE; RADAR.INDEX may hold at most one minimal folder-level reference with no content inspection, inventory, hashing, timestamps or change tracking (`DEC-W4-040`, `DEC-W4-044`).
- Signal classes, severity, stop behavior and pilot breadth remain UNKNOWN unless sourced from SkillsMachine canon (`Q-057`).

## Project lifecycle, retirement and retained memory

Wings4 governs the complete portfolio lifecycle, not only active project operations.

Projects may enter, evolve, pause, merge, be superseded, be replaced by an external solution, retire, archive, decommission or be purged.

Project retirement and physical deletion are different decisions. The default sequence is:

ACTIVE -> RETIREMENT_PROPOSED -> RETIRED -> ARCHIVED

Direct deletion is prohibited by default. Purge requires explicit HUMAN approval and a minimum tombstone when the project, evaluation or decision affected the portfolio.

When a project is merged or superseded, one canonical successor must be identified, unresolved migration items must remain visible, new backlog must stop unless reactivated, coordination must become inactive, and the terminal state must retain successor and reactivation references.

External-solution research follows:

RETAIN_DECISION
COMPACT_EVIDENCE
PURGE_RAW_SEARCH

Git is for source control and small governance records. It must not become a data lake for raw web pages, large binaries, repeated exports, growing logs, models, databases or rebuildable generated outputs.

The 00_WINGS4_COORD surface stores current interface state and terminal pointers only.

The preferred pilot format is structured UTF-8 text with strict KEY=VALUE fields and delimited narrative blocks. Free-form Markdown is not approved as a machine dependency.

## SM070R1 implementation-contract review

Wings4 reviewed the SkillsMachine read-only implementation contract for the 00_WINGS4_COORD delivery mechanism.

The implementation contract is sufficient for a future Ring 0 synthetic-fixture implementation, but this review does not authorize implementation.

The initial implementation boundary, if later approved, is restricted to synthetic fixtures outside canonical repositories, reversible operations, no physical purge, no SkillsMachine self-application, no Brainy mutation and no portfolio rollout.

SkillsMachine remains a delivery messenger and implementation mechanism. It does not become lifecycle, routing, successor-selection, purge or directive authority.

A separate HUMAN authorization is required before MB-SM-070A and Ring 0.

## Ring 0 implementation authorization

HUMAN explicitly authorized Ring 0 for the SkillsMachine delivery integration.

Authorization is limited to a synthetic disposable fixture and the minimum reusable implementation needed to exercise the approved coordination contract.

The authorization does not extend to:

- applying the surface to SkillsMachine itself;
- modifying Brainy;
- modifying any other project;
- portfolio rollout;
- physical purge;
- irreversible mutation;
- Ring 1 or Ring 2;
- push.

SkillsMachine may implement and canonize the approved minimum core in its own repository, execute Ring 0, and create one local commit only after the complete Ring 0 acceptance rubric passes.

All results return to Wings4.0.

## Ring 0 accepted and Stack terminology adopted

Wings4 accepts MB-SM-070A as CLOSED_PASS_WITH_REPORTING_CORRECTION.

The substantive Ring 0 evidence passed. RING0_STATUS=BLOCKED was caused by a non-blocking reporting scope defect and does not alter acceptance. The historical output must not be rewritten.

Technical debt:
- SM070A-TD-001: rename exported PowerShell commands that use unapproved verbs before Ring 1.
- SM070A-TD-002: correct the Ring 0 reporting variable scope before the next execution.

The canonical term is now Stack. Flavor remains only as a legacy alias. No mass rename is authorized.

Ring 1, Brainy mutation, portfolio rollout and push remain unauthorized.

## Ring 1 readiness decision

Ring 1 is ready for design, but not for execution.

The authorized next step is limited to designing and preparing the two technical-debt corrections, the self-application procedure, rollback, crash recovery and the acceptance rubric.

Ring 1 execution requires a separate HUMAN authorization after Wings4 reviews that design.

The target, if later approved, is SkillsMachine only.

Brainy, other projects, portfolio rollout, physical purge, irreversible mutation and push remain prohibited.
