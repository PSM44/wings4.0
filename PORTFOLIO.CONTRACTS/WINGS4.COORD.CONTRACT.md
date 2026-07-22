# WINGS4.COORD.CONTRACT

CONTRACT_VERSION=1.0.0
STATUS=APPROVED_FOR_PILOT
OWNER=Wings4.0
DELIVERY_MESSENGER=PS.SkillsMachine
COORDINATION_MODEL=HUB_AND_SPOKE
GENERATED_AT=2026-07-22 11:24:26 -04:00

## 01. Purpose

Define the minimum coordination interface between Wings4 and each governed project.

This contract governs development coordination. It does not authorize runtime integration, repository mutation, project merger or cross-project implementation.

## 02. Required local path

<PROJECT_ROOT>\00_WINGS4_COORD

## 03. Required files

1. COORD.CONTRACT.md
2. OUTBOUND.SIGNAL.md
3. INBOUND.DIRECTIVE.md
4. COORD.STATE.md

No subfolders are required in version 1.0.0.

## 04. Authority

WINGS4:
- coordination hub;
- validates portfolio relevance;
- routes signals;
- issues project directives;
- detects conflicts and duplication;
- escalates to HUMAN.

SKILLSMACHINE:
- delivery messenger;
- creates the approved coordination surface;
- validates schema and required fields;
- repairs missing or malformed coordination files;
- applies approved schema updates;
- packages outbound signals;
- does not decide routing;
- does not issue Wings4 directives;
- does not manage project architecture or backlog.

PROJECT:
- local authority over HUMAN, architecture, functional baseline, implementation, local data and local lifecycle;
- emits signals to Wings4;
- executes authorized Wings4 directives;
- returns results to Wings4.

HUMAN:
- final authority.

## 05. Development communication

ALLOWED:
- PROJECT -> WINGS4
- WINGS4 -> PROJECT
- HUMAN -> PROJECT
- HUMAN -> WINGS4
- approved SkillsMachine delivery operations

PROHIBITED_BY_DEFAULT:
- PROJECT -> PROJECT governance directive
- PROJECT -> PROJECT backlog assignment
- PROJECT -> PROJECT architecture decision
- PROJECT -> PROJECT implementation authorization
- SkillsMachine-originated Wings4 directive
- automatic cross-project integration

## 06. File semantics

### COORD.CONTRACT.md

Required fields:

- COORD_SCHEMA_VERSION
- PROJECT_ID
- PROJECT_ROOT
- WINGS4_ROOT
- COORDINATION_MODE
- DEVELOPMENT_PROJECT_TO_PROJECT_COMMUNICATION
- DEPLOYMENT_INTEGRATION_OPTIONAL
- RETURN_TARGET
- AUTHORITY_BOUNDARIES
- READ_WRITE_BOUNDARIES

### OUTBOUND.SIGNAL.md

Required fields:

- SIGNAL_ID
- SOURCE_PROJECT
- TARGET_PROJECT
- SIGNAL_TYPE
- CURRENT_STATUS
- REQUESTED_ACTION
- PORTFOLIO_IMPACT
- EVIDENCE_REFERENCES
- AUTHORIZATION_REQUIRED
- GENERATED_AT

TARGET_PROJECT must be Wings4.0.

### INBOUND.DIRECTIVE.md

Required fields:

- DIRECTIVE_ID
- SOURCE_PROJECT
- TARGET_PROJECT
- AUTHORIZED_SCOPE
- PROHIBITED_SCOPE
- NEXT_MINIBATTLE
- EXPECTED_DELIVERABLE
- RETURN_TARGET
- ISSUED_AT

SOURCE_PROJECT and RETURN_TARGET must be Wings4.0.

Only Wings4 or HUMAN may authorize the semantic content of a directive.

### COORD.STATE.md

Required fields:

- COORD_SCHEMA_VERSION
- LAST_OUTBOUND_SIGNAL_ID
- LAST_INBOUND_DIRECTIVE_ID
- LAST_SYNC_AT
- CURRENT_COORDINATION_STATUS
- PENDING_PROJECT_ACTION
- PENDING_WINGS4_DECISION
- DIRECT_PROJECT_CONTACT_ALLOWED

DIRECT_PROJECT_CONTACT_ALLOWED must be NO during development unless HUMAN grants an explicit exception.

## 07. Delivery behavior

CREATE_PROJECT:
- create the coordination surface;
- populate contract and empty active-state templates.

CONTINUE_SESSION:
- validate identity;
- read COORD.STATE;
- read active INBOUND.DIRECTIVE;
- do not infer cross-project work from foreign packages.

CLOSE_SESSION:
- prepare the active OUTBOUND.SIGNAL;
- update COORD.STATE;
- set RETURN_TARGET=Wings4.0.

REPAIR_PROJECT:
- validate presence, uniqueness and schema;
- repair only against an approved contract version.

UPDATE_PROJECT:
- apply only an approved Wings4 contract migration;
- preserve project-local authority;
- remain idempotent and reversible.

## 08. Storage and duplication

COORD_FOLDER_PURPOSE=INTERFACE_ONLY
PROJECT_HISTORY_STORAGE=NO
FULL_EXTERNAL_PACKAGES=NO
LOCAL_CANON_DUPLICATION=NO
REFERENCE_BY_ID_PATH_HASH=YES
ACTIVE_STATE_ONLY=YES

## 09. Deployment integration

Direct runtime integration may be authorized after deployment readiness when:

- PROJECT.INTERFACE is approved;
- ownership is explicit;
- data boundaries are explicit;
- privacy and security constraints are explicit;
- failure behavior is explicit;
- rollback is explicit;
- reversibility is explicit;
- standalone operability is known;
- HUMAN authorization exists.

## 10. Pilot scope

PILOT_PROJECTS:
- Brainy
- PS.SkillsMachine

PORTFOLIO_ROLLOUT_AUTHORIZED=NO
PILOT_IMPLEMENTATION_AUTHORIZED=NO
SKILLSMACHINE_ASSESSMENT_AUTHORIZED=YES
