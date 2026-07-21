# Market Monitoring Skill/GRC Opportunity

Status: CANDIDATE_FOR_SKILLSMACHINE_ASSESSMENT  
Source: WINGS4_GOV_014D_DEFINE_PROJECT_MARKET_WATCH_PROFILE

## Opportunity

Create or perfect a reusable mechanism that allows projects to monitor open-source, commercial and other market solutions without implementing separate crawlers or evaluation logic in every repository.

## Candidate scope

Possible reusable artifacts:

- `SKILL.EXTERNAL_SOLUTION_DISCOVERY`
- `SKILL.BUILD_VS_ADOPT_EVALUATION`
- `GRC.EXTERNAL_SOLUTION_REVIEW_GATE`
- `GRC.MARKET_MONITORING_PRIVACY_LICENSE_SECURITY`
- shared evidence and scoring templates;
- on-demand and optionally periodic monitoring workflows.

## Required behavior

- consume a project-local `PROJECT.MARKET.WATCH.PROFILE`;
- search only when explicitly authorized;
- preserve source URLs, dates and evidence;
- distinguish discovery from recommendation and decision;
- evaluate license, privacy, security, maturity, maintenance, cost and reversibility;
- emit `EXTERNAL_SOLUTION_SIGNAL`;
- avoid automatic installation, adoption, ingestion or write-back;
- escalate portfolio-relevant candidates to Wings4;
- remain reusable across projects.

## Ownership

Wings4 role:

- transfer the opportunity;
- provide portfolio interface requirements;
- make no SkillsMachine canonization decision.

SkillsMachine role:

- assess relevance;
- deduplicate;
- decide Skill/GRC decomposition;
- validate and canonize if approved.

## Current authorization

SKILLSMACHINE_MODIFICATION_AUTHORIZED=NO
MONITORING_ENGINE_BUILD_AUTHORIZED=NO
TRANSFER_PACKAGE_CREATION_AUTHORIZED=NO

## GOV-014D Human Classification

CLASSIFIED_AT: 2026-07-21 13:07:42 -04:00
STATUS: APPROVED_AS_CANDIDATE
DESTINATION: PS.SkillsMachine
TRANSFER_AUTHORIZED: NO
CANONIZATION_AUTHORIZED: NO
IMPLEMENTATION_AUTHORIZED: NO

Wings4 has approved the opportunity as a candidate only.
SkillsMachine must separately assess relevance, duplication, decomposition and canonization.
