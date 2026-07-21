# Project Document and Interaction Model

Status: PROPOSED_FOR_GOV014_HUMAN_REVIEW
Wings4 minibattle: WINGS4_GOV_014
Generated: 2026-07-20 18:04:04 -04:00

## 01. Purpose

Define a portfolio-wide, human-first and machine-auditable model for project identity, use, boundaries, communication, evidence, alarms and governance.

This model does not modify project-local architecture and does not authorize implementation.

## 02. Core separation

HUMAN_ROLE=HUMAN_FIRST_PROJECT_CONSTITUTION
USEMANUAL_ROLE=HUMAN_OPERATIONAL_GUIDE
PROJECT_CONTRACT_ROLE=AI_AND_TECH_AUDITABLE_DECLARATION
PROJECT_INTERFACE_ROLE=CROSS_PROJECT_INTERACTION_CONTRACT
BATON_STATE_ROLE=CURRENT_CONTINUITY_AND_NEXT_ACTION
EVIDENCE_ROLE=PROOF_OF_DECLARED_BEHAVIOR

HUMAN_SEMANTIC_AUTHORITY=YES
PROJECT_CONTRACT_OPERATIONAL_AUTHORITY=YES
AUTOMATIC_HUMAN_REWRITE=NO
AUTOMATIC_CONTRACT_REWRITE=NO
HUMAN_CONTRACT_DRIFT_REQUIRES_REVIEW=YES

## 03. HUMAN

HUMAN should answer:

1. What is this project?
2. Why does it exist?
3. What human problem does it solve?
4. For whom does it exist?
5. What valuable outcome should it produce?
6. Which principles must it not violate?
7. What is clearly in and out of scope?
8. Who makes the important decisions?
9. How does it relate, at a high level, to other projects?
10. When should it change, split, consolidate, freeze or close?

Rules:

- Human-readable first.
- Understandable without framework knowledge.
- Avoid machine-oriented field accumulation.
- Avoid Git, path and validator details unless essential.
- A new human reader should understand the project in approximately ten minutes.
- HUMAN is not a database, log, contract schema, BATON or runbook.

## 04. USEMANUAL

USEMANUAL should answer:

1. When should a person use this project?
2. When should a person not use it?
3. What prerequisites exist?
4. What inputs must be provided?
5. What basic steps should be followed?
6. What outputs should be expected?
7. Which decisions remain human?
8. Which common mistakes and risks should be avoided?
9. How is successful completion recognized?
10. Where are status, recovery and support instructions found?

Rules:

- Explain use, not project philosophy.
- Stay task-oriented and human-readable.
- Link to runbooks for detailed operations.
- Do not duplicate HUMAN or BATON.

## 05. PROJECT.CONTRACT

Purpose:

Translate approved human intent into a structured declaration that AI and technical validators can evaluate.

Minimum domains:

- identity;
- lifecycle;
- purpose code;
- primary user;
- primary outcome;
- owned capabilities;
- explicitly excluded capabilities;
- prohibited behavior;
- upstream and downstream relationships;
- accepted inputs;
- published outputs;
- authority boundaries;
- canonical source references;
- contract version and source hashes.

PROJECT.CONTRACT must not silently redefine HUMAN.

## 06. PROJECT.INTERFACE

Purpose:

Declare how a project communicates with other projects.

Minimum domains:

- accepted message types;
- rejected message types;
- provided outputs or services;
- consumed inputs;
- source and destination project;
- modification permissions;
- canon impact;
- human authorization requirements;
- expected evidence;
- alarm destination;
- trace identifier.

PROJECT.INTERFACE is an organizational and semantic contract. It is not necessarily a software API.

## 07. BATON / STATE

Purpose:

Record current state, completed work, blockers, next action and resume instruction.

Rules:

- Current-state header must remain current.
- Append-only history must not make current state ambiguous.
- Historical evidence should be separated when growth creates ambiguity.
- BATON must not redefine HUMAN or PROJECT.CONTRACT.

## 08. EVIDENCE

Purpose:

Prove whether declared behavior and boundaries are respected.

Evidence may include:

- Git root, branch, HEAD and status;
- validators;
- tests;
- decision records;
- output hashes;
- controlled execution reports;
- dependency evidence;
- cross-project transfer records;
- local self-attestation;
- Wings4 audit result.

DECLARATION_IS_EVIDENCE=NO

## 09. Three-line governance model

First line — project self-control:

- HUMAN;
- USEMANUAL;
- PROJECT.CONTRACT;
- PROJECT.INTERFACE;
- BATON / STATE;
- local evidence;
- local readiness and boundary checks.

Second line — Wings4 portfolio audit:

- read project declarations;
- compare contracts and interfaces;
- validate reciprocal relationships;
- detect ownership conflicts and boundary drift;
- receive project attestations;
- review evidence;
- issue alerts;
- request project-local correction;
- verify portfolio resynchronization.

Third line — human decision:

- purpose;
- ownership;
- exceptions;
- consolidation;
- separation;
- freeze, archive or close;
- tool adoption;
- implementation authorization;
- accepted risk.

PROJECT_SELF_CHECK_TO_WINGS4_TO_HUMAN=YES

## 10. Communication types

- DECLARATION_CHANGE
- BOUNDARY_CHANGE
- INTERFACE_CHANGE
- STATUS_CHANGE
- PORTFOLIO_DECISION_REQUEST
- PROJECT_PROMOTION_REQUEST
- SKILL_OR_GRC_OPPORTUNITY
- TOOL_REVIEW_REQUEST
- BOUNDARY_EXCEPTION_REQUEST
- PROJECT_RESULT
- CONTEXT_HANDOFF
- VALIDATION_EVIDENCE
- ASSESSMENT_RESULT
- ALERT

Every cross-project message should preserve:

- source;
- destination;
- type;
- purpose;
- authorized scope;
- prohibited actions;
- input artifact;
- expected output;
- canon impact;
- required human authorization;
- trace ID.

## 11. Alert taxonomy

INFO:
- declaration updated;
- interface updated;
- lifecycle changed;
- dependency declared.

WARNING:
- stale HUMAN, USEMANUAL, contract or interface;
- HUMAN and contract drift;
- undeclared adjacent capability;
- unresolved reciprocal relationship;
- BATON current-state ambiguity.

HIGH:
- competing primary ownership;
- capability implemented outside declared scope;
- skipped build-versus-adopt gate;
- undeclared cross-project dependency;
- unapproved tool adoption;
- project modifies another project without contract.

CRITICAL:
- privacy breach;
- unauthorized cross-project write;
- project-context mismatch;
- unauthorized deletion, archival or canon change;
- evidence integrity failure;
- operation against explicit prohibition.

## 12. Monitoring division

SCRIPT_OR_VALIDATOR:
- deterministic facts;
- required files;
- IDs;
- hashes;
- branches;
- HEAD;
- declared relationships;
- contract freshness;
- prohibited path changes;
- reciprocal interface declarations.

AI_OR_TECH_REVIEW:
- semantic overlap;
- purpose conflict;
- capability drift;
- excessive scope expansion;
- likely duplication;
- build-versus-adopt need;
- HUMAN-contract inconsistency explanation.

HUMAN:
- purpose;
- ownership;
- exception;
- consolidation;
- split;
- closure;
- adoption;
- implementation;
- risk acceptance.

SCRIPT_FACTS_AI_INTERPRETATION_HUMAN_DECISION=YES

## 13. Proportional governance

LEVEL_0_EXPLORATION:
- HUMAN_LITE;
- owner;
- purpose;
- lifecycle;
- no unauthorized cross-project write.

LEVEL_1_LOCAL_PROJECT:
- HUMAN;
- USEMANUAL where operational use exists;
- PROJECT.CONTRACT;
- BATON;
- identity gate;
- local validation.

LEVEL_2_INTEGRATED_PROJECT:
- PROJECT.INTERFACE;
- declared dependencies;
- portfolio catalog registration;
- boundary audit;
- resynchronization.

LEVEL_3_CRITICAL_PROJECT:
- policy-as-code controls;
- security and privacy gates;
- formal compliance evidence;
- change approval;
- independent review.

NOT_ALL_PROJECTS_REQUIRE_LEVEL_3=YES

## 14. GOV-014 pilot recommendation

Pilot projects:

1. Wings4.0
2. Brainy
3. SkillsMachine
4. HIA
5. DeveFactory
6. AIX
7. Nightshift

Pilot sequence:

1. Define thick human boundaries.
2. Create draft contracts and interfaces without modifying child projects.
3. Compare overlaps and missing ownership.
4. Present human decisions.
5. Prepare project-local adoption packets.
6. Let each project evaluate and apply locally.
7. Return evidence to Wings4.
8. Verify resynchronization.

## 15. Implementation boundary

MODIFIES_CHILD_PROJECTS=NO
AUTHORIZES_PROJECT_CONTRACT_CREATION_IN_CHILD_PROJECTS=NO
AUTHORIZES_AUTOMATION=NO
AUTHORIZES_MONITORING_ENGINE=NO
AUTHORIZES_POLICY_AS_CODE_PLATFORM=NO
AUTHORIZES_COMMIT=NO
AUTHORIZES_PUSH=NO

## 16. Human decisions required

- APPROVE_GOV014_MODEL
- APPROVE_GOV014_MODEL_WITH_CHANGES
- REJECT_GOV014_MODEL

Recommended sequence after approval:

1. GOV014A_DEFINE_THICK_BOUNDARIES_FOR_PILOT_PROJECTS
2. GOV014B_DEFINE_PROJECT_CONTRACT_SCHEMA
3. GOV014C_DEFINE_PROJECT_INTERFACE_SCHEMA

## GOV-014 Human Approval

APPROVAL_DATE: 2026-07-21 12:14:49 -04:00
DECISION: APPROVE_GOV014_MODEL
STATUS: APPROVED

Approved scope:

- HUMAN remains semantic authority.
- USEMANUAL remains the human operational guide.
- PROJECT.CONTRACT is the structured operational translation.
- PROJECT.INTERFACE defines cross-project boundaries and communication.
- BATON/STATE preserves current continuity.
- EVIDENCE proves compliance.
- No child-project rollout is authorized by this approval.
