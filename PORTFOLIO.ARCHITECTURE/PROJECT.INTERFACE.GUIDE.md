# PROJECT.INTERFACE Guide

Status: PROPOSED_PENDING_HUMAN_REVIEW  
Minibattle: WINGS4_GOV_014C_DEFINE_PROJECT_INTERFACE_SCHEMA

## 1. Purpose

`PROJECT.INTERFACE` defines how portfolio entities exchange requests, declarations, evidence, decisions and results.

It does not:

- authorize writes by itself;
- replace HUMAN or PROJECT.CONTRACT;
- redefine local architecture;
- permit commit or push without explicit authorization.

## 2. Interface principles

- Every message identifies sender, recipient and canonical roots.
- Every message has a correlation ID and auditable evidence.
- Facts and interpretations remain separated.
- Requested action, scope, exclusions and acceptance criteria are explicit.
- Write, architecture, commit and push authorizations are explicit booleans.
- The recipient may accept, reject, defer or request clarification.
- Reciprocal interfaces must agree on meaning before automation.

## 3. Core portfolio interfaces

- Brainy → HIA: `PROJECT_PROMOTION_REQUEST`
- Projects → SkillsMachine: `SKILL_GRC_OPPORTUNITY`
- SkillsMachine → projects: `APPROVED_REUSABLE_METHOD`
- HIA → AIX: `AUTHORIZED_EXECUTION_REQUEST`
- AIX → requester: `PROJECT_EXECUTION_RESULT`
- Nightshift → consumers: `ASSESSMENT_RESULT`
- Projects → Wings4: `PROJECT_DECLARATION_UPDATE`
- Wings4 → projects: `PORTFOLIO_DECISION` or `PROJECT_LOCAL_INTERVENTION_REQUEST`
- Projects → Wings4: `RESYNCHRONIZATION_EVIDENCE`

## 4. External-solution monitoring model

The portfolio uses distributed sensing with centralized coordination.

### 4.1 Project-local watch profile

Each project may maintain a lightweight declaration containing:

- capabilities to monitor;
- exclusions;
- privacy, license and architecture constraints;
- review triggers;
- local evaluation owner;
- escalation conditions.

Projects should not implement independent market crawlers.

### 4.2 Reusable monitoring mechanism

Market discovery should be implemented once as a reusable Skill, GRC or service governed outside project-local canon, preferably through SkillsMachine.

It may run:

- on explicit human request;
- periodically when authorized;
- when a project reaches a build-versus-adopt gate;
- when a relevant external-solution signal appears.

### 4.3 Starting point

The user may initiate the review in any project context.

The receiving project emits `EXTERNAL_SOLUTION_SIGNAL` and classifies it as:

- `LOCAL_ONLY`
- `PORTFOLIO_RELEVANT`
- `POTENTIAL_REPLACEMENT`
- `POTENTIAL_COMPLEMENT`
- `POTENTIAL_SHARED_CAPABILITY`
- `IRRELEVANT`

A local-only candidate remains in the project unless it changes project purpose, ownership, lifecycle or portfolio relationships.

A portfolio-relevant candidate is escalated to Wings4.

### 4.4 Evaluation flow

```text
EXTERNAL_SOLUTION_SIGNAL
→ local preliminary classification
→ optional Wings4 triage
→ EXTERNAL_SOLUTION_EVALUATION_REQUEST
→ project-local evaluation
→ EXTERNAL_SOLUTION_EVALUATION_RESULT
→ PORTFOLIO_EXTERNAL_SOLUTION_DECISION
```

Wings4 coordinates and deduplicates. Each affected project evaluates local fit. Pablo decides.

## 5. GOV-014C boundary

This minibattle creates only:

- the generic PROJECT.INTERFACE JSON schema;
- this guide;
- approval record for GOV-014B;
- backlog updates.

It does not modify child projects, create real interfaces, automate monitoring, commit or push.

## 6. Human decision

- `APPROVE_GOV014C_PROJECT_INTERFACE_SCHEMA`
- `APPROVE_GOV014C_PROJECT_INTERFACE_SCHEMA_WITH_CHANGES`
- `REJECT_GOV014C_PROJECT_INTERFACE_SCHEMA`

## GOV-014C Human Approval

APPROVAL_DATE: 2026-07-21 12:45:14 -04:00
DECISION: APPROVE_GOV014C_PROJECT_INTERFACE_SCHEMA
STATUS: APPROVED

Approved scope:

- Generic PROJECT.INTERFACE schema and guide approved.
- External-solution reviews may start in any project context.
- Project-local watch profiles provide distributed sensing.
- Reusable monitoring logic should not be duplicated per project.
- Portfolio-relevant findings escalate to Wings4.
- No real interfaces, automated monitoring or child-project modifications are authorized.
