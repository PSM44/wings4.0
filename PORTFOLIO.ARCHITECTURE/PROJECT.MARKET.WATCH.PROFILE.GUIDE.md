# PROJECT.MARKET.WATCH.PROFILE Guide

Status: PROPOSED_PENDING_HUMAN_REVIEW  
Minibattle: WINGS4_GOV_014D_DEFINE_PROJECT_MARKET_WATCH_PROFILE

## 1. Purpose

A `PROJECT.MARKET.WATCH.PROFILE` is a lightweight project-local declaration describing:

- which capabilities should be monitored;
- which categories of external solutions are relevant;
- which constraints apply;
- when a review must start;
- who owns local evaluation;
- when findings must escalate to Wings4.

It is not a crawler, search engine, adoption decision or implementation authorization.

## 2. Operating model

```text
PROJECT.MARKET.WATCH.PROFILE
→ reusable monitoring Skill/GRC or service
→ external-solution signal
→ project-local evaluation
→ Wings4 escalation when portfolio relevant
→ human decision
```

## 3. Where a review starts

A review may start:

- by explicit human request in any project;
- before major custom development;
- before architecture expansion;
- when cost, maintenance, security or privacy conditions change;
- through periodic or event-driven monitoring;
- when Wings4 detects overlap or duplication.

The starting project owns preliminary classification and local fit evaluation.

## 4. Mandatory escalation to Wings4

Escalation is required when a candidate:

- could replace the project or a major capability;
- affects several projects;
- changes capability ownership;
- changes project purpose or primary outcome;
- changes lifecycle or disposition;
- creates a shared portfolio capability;
- materially changes a project relationship.

Local implementation improvements that do not create portfolio impact may remain local.

## 5. Separation of responsibilities

PROJECT:

- declares the watch profile;
- evaluates local functional and technical fit;
- records evidence and recommendation.

SKILLSMACHINE OR REUSABLE SERVICE:

- owns reusable monitoring method;
- avoids duplicated crawlers and evaluation mechanics;
- provides repeatable search, scoring and evidence templates.

WINGS4:

- coordinates portfolio-relevant reviews;
- deduplicates work;
- compares cross-project impact;
- prepares portfolio decision packages.

HUMAN:

- approves adoption, integration, replacement, retirement or rejection.

## 6. Governance constraints

- Monitoring does not authorize implementation.
- Discovery does not authorize ingestion, installation or data exposure.
- Tool evaluation must respect license, privacy, security, architecture, cost and reversibility constraints.
- Project-local architecture remains locally governed.
- Portfolio changes require Wings4 review and human decision.
- Profiles must remain small and declarative.

## 7. GOV-014D boundary

This minibattle creates only:

- the generic profile JSON schema;
- this guide;
- a reusable Skill/GRC opportunity transfer record;
- a backlog entry.

It does not:

- create profiles for the six projects;
- build a market-monitoring engine;
- perform live tool searches;
- modify child projects;
- commit or push.

## 8. Human decision

Available decisions:

- `APPROVE_GOV014D_PROJECT_MARKET_WATCH_PROFILE`
- `APPROVE_GOV014D_PROJECT_MARKET_WATCH_PROFILE_WITH_CHANGES`
- `REJECT_GOV014D_PROJECT_MARKET_WATCH_PROFILE`

## GOV-014D Human Approval

APPROVAL_DATE: 2026-07-21 13:07:42 -04:00
DECISION: APPROVE_GOV014D_PROJECT_MARKET_WATCH_PROFILE
STATUS: APPROVED

Approved scope:

- Generic PROJECT.MARKET.WATCH.PROFILE schema and guide approved.
- Project-local watch profiles remain declarative and lightweight.
- Reusable monitoring logic should not be duplicated across projects.
- Market reviews may start in any project context.
- Portfolio-relevant findings escalate to Wings4.
- Monitoring does not authorize adoption or implementation.
- No concrete project profiles, monitoring engine or child-project changes are authorized.
