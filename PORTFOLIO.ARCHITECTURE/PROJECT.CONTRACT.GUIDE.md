# PROJECT.CONTRACT Guide

Status: PROPOSED_PENDING_HUMAN_REVIEW  
Minibattle: WINGS4_GOV_014B_DEFINE_PROJECT_CONTRACT_SCHEMA

## 1. Purpose

`PROJECT.CONTRACT` is the structured, machine-readable and technically auditable translation of human-approved project intent.

It does not replace `HUMAN`.

Authority order:

```text
HUMAN = semantic authority
PROJECT.CONTRACT = structured operational translation
BATON / STATE = current continuity
EVIDENCE = proof
```

A contract that contradicts HUMAN is not self-correcting. It triggers human review.

## 2. Contract rules

- Every contract must reference at least one HUMAN source.
- Purpose may not be silently rewritten.
- Portfolio interpretation must remain separate from project declaration.
- Contract drift requires human review.
- Adoption by a child project requires separate authorization.
- The contract records boundaries; it does not prescribe child architecture.
- `PROJECT.INTERFACE` remains outside GOV-014B.

## 3. External open-source or market solution review

When a market tool could replace or complement a portfolio capability, the review uses two governance levels.

### 3.1 Wings4 portfolio triage

Wings4:

- records the candidate;
- identifies affected projects and capabilities;
- classifies the hypothesis as replacement, complement, integration or irrelevant;
- prevents duplicate evaluations;
- assigns each local evaluation owner;
- defines the evidence required;
- prepares the final portfolio decision package.

Wings4 does not perform the complete local technical evaluation.

### 3.2 Project-local evaluation

Each affected project evaluates:

- functional coverage;
- purpose alignment;
- architecture and integration;
- security and privacy;
- license;
- maturity and maintenance;
- cost and total cost of ownership;
- migration;
- reversibility;
- roadmap impact;
- pilot results.

The project returns evidence and a recommendation.

### 3.3 Portfolio decision

Wings4 consolidates the local evidence and proposes one of:

- `CONTINUE_BUILD`
- `ADOPT`
- `ADOPT_AND_EXTEND`
- `INTEGRATE`
- `MIGRATE_AND_RETIRE`
- `DEFER`
- `REJECT`

Pablo decides. The project implements locally. Wings4 verifies resynchronization.

## 4. Minimum contract fields

- identity and entity type;
- canonical root and parent;
- HUMAN and USEMANUAL sources;
- root question, purpose, user and outcome;
- owned and excluded responsibilities;
- inputs and outputs;
- upstream, downstream, overlaps and conflicts;
- authority model;
- write boundaries;
- lifecycle;
- evidence and confidence;
- external-solution review state;
- human approval.

## 5. GOV-014B boundary

This minibattle creates only:

- the generic JSON schema;
- this guide;
- a backlog entry.

It does not:

- create contracts for the six projects;
- create `PROJECT.INTERFACE`;
- modify child repositories;
- authorize implementation;
- commit or push.

## 6. Human decision

Available decisions:

- `APPROVE_GOV014B_PROJECT_CONTRACT_SCHEMA`
- `APPROVE_GOV014B_PROJECT_CONTRACT_SCHEMA_WITH_CHANGES`
- `REJECT_GOV014B_PROJECT_CONTRACT_SCHEMA`

## GOV-014B Human Approval

APPROVAL_DATE: 2026-07-21 12:34:19 -04:00
DECISION: APPROVE_GOV014B_PROJECT_CONTRACT_SCHEMA
STATUS: APPROVED

Approval scope:

- Generic PROJECT.CONTRACT schema and guide approved.
- HUMAN remains semantic authority.
- External-solution review uses Wings4 portfolio triage plus project-local evaluation.
- No child contracts or child-project changes are authorized.
