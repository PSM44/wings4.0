# HUMAN — Wings4.0

## 1. Identity

Wings4.0 is Pablo's portfolio architecture and governance repository.

It is not a project, product, runtime, delivery factory, monorepo, or replacement for project-local governance.

## 2. Purpose

Wings4.0 exists to make the complete portfolio understandable and coordinated by:

- listening to the canonical HUMAN of each portfolio entity;
- consolidating project identity, purpose, boundaries, capabilities, and relationships;
- detecting conflicts, duplication, overlap, ambiguity, and missing ownership;
- identifying opportunities for optional integration;
- evaluating whether existing open-source or commercial solutions reduce the need to build;
- presenting evidence, alternatives, risks, and recommendations to the human authority;
- preparing project-specific intervention prompts after human approval;
- verifying whether affected projects became synchronized after local changes.

## 3. Human interaction

Pablo is the primary user, portfolio sponsor, and final decision authority.

The operating cycle is:

1. Wings4.0 receives or reads a project HUMAN.
2. Wings4.0 interprets the declared purpose, boundaries, capabilities, and relationships.
3. Wings4.0 compares the project with the governed portfolio.
4. Wings4.0 separates facts from interpretations and records confidence.
5. Wings4.0 presents conflicts, duplication candidates, integration opportunities, and alternatives.
6. Pablo approves, rejects, modifies, or defers a portfolio decision.
7. Wings4.0 prepares a focalized prompt for each affected project.
8. Each project evaluates and applies the approved change under its own local governance.
9. Wings4.0 listens again to the updated HUMAN and verifies resynchronization.

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

Before building a capability, Wings4.0 may require review of existing open-source or commercial alternatives.

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
- RADAR and repository evidence describe physical or generated state.
- Wings4.0 may use bounded descendant evidence to identify possible drift, but it must not silently replace the HUMAN interpretation.
- Every material finding should preserve source, evidence, interpretation, confidence, and human decision.

## 9. Legacy relation

Wings3.0 is a legacy source estate. Its content is not automatically canonical in Wings4.0.

Legacy assimilation remains selective and reversible:

1. discover;
2. classify;
3. assess;
4. map;
5. extract approved meaning;
6. validate;
7. integrate only after authorization;
8. migrate physically only when independently justified.

## 10. Core operating principle

Wings4.0 recommends.
Pablo decides.
Each project implements locally.
Wings4.0 verifies portfolio resynchronization.

## 11. Current limitations

- The active-project listening cycle has not yet been proven through a full real pilot.
- Capability ownership and relationship maps remain intentionally incomplete.
- Existing project HUMAN files vary in quality and structure.
- Open-source substitution review has not yet been exercised on a real decision.
- Automated portfolio scoring and dashboards remain deferred until the governance cycle is validated.

## External solutions before material custom development

Before developing a new capability or materially expanding an existing one, the portfolio should consider whether an external solution, especially a suitable open-source solution, can replace, complement or integrate with the proposed work.

The review may begin in any project. Each affected project evaluates local functional and technical fit. Wings4 coordinates when the candidate affects multiple projects, creates duplication, changes capability ownership, changes project purpose or lifecycle, or could replace a portfolio project.

External discovery and evaluation do not authorize adoption or implementation. The final decision remains with the human owner.

## Project implementation modes and governed Flavors

Projects may be implemented through different valid modes:

- autonomous and independently operable systems;
- complementary systems that provide value without becoming mandatory dependencies;
- explicitly integrated systems governed by interfaces and contracts;
- unrelated systems when no useful relationship exists;
- governed Flavors that combine existing external components with project-specific configuration, integration and residual proprietary development.

A Flavor is a governed, project-specific implementation composition. It may include open-source tools, justified commercial tools, configuration, adapters, reusable Skills and GRCs, shared services and proprietary components.

Project identity, purpose, ownership and lifecycle remain distinct from the replaceable technical composition used to implement the project.

The portfolio follows these rules:

- project independence is the default;
- integration is optional, explicit and reversible;
- shared technology does not by itself justify project consolidation;
- use of external components does not remove project identity;
- a project may remain completely autonomous;
- a project may complement other projects without requiring merger;
- a project may support multiple Flavors when they preserve the same approved purpose and ownership;
- external components should remain replaceable where reasonably possible;
- residual custom development should focus on unmet requirements, differentiation and governed integration;
- Wings4 governs portfolio relationships and disposition, not detailed child-project architecture;
- Pablo remains the final authority for adoption, integration, replacement, retirement and project disposition.

The term Flavor is provisional until validated through a real pilot. The concept is approved; final naming and detailed schema fields remain subject to evidence.

## Hub-and-spoke portfolio coordination

Wings4 is the single coordination hub for the project portfolio during development.

The development communication model is:

PROJECT -> WINGS4 -> PROJECT

Direct project-to-project coordination, governance handoffs and instructions are prohibited by default during development.

A project that detects a dependency, reusable capability, conflict, duplication, external-solution opportunity or portfolio impact must emit a signal to Wings4 and stop at that boundary. Wings4 decides whether another project must be involved.

SkillsMachine is the preferred delivery messenger for distributing and maintaining the approved Wings4 coordination surface inside project deliveries. SkillsMachine is not the coordination hub and does not acquire authority over project routing, portfolio directives, project architecture or cross-project decisions.

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
- no project manages another project's backlog, HUMAN, architecture or implementation.

During deployment, projects may optionally integrate or operate together when an approved PROJECT.INTERFACE defines ownership, data boundaries, failure modes, rollback, reversibility and standalone operability.

Deployment integration does not change Wings4's role as the portfolio coordination hub for material cross-project changes.

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
