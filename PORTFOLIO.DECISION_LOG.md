# Portfolio Decision Log

## Foundation and legacy

- **DEC-W4-001** — Wings4.0 is the canonical Portfolio Architecture and Governance Repository.
- **DEC-W4-002** — Wings3.0 remains intact as a legacy source estate during foundation.
- **DEC-W4-003** — Governance migration precedes physical migration.
- **DEC-W4-004** — No legacy file becomes canonical merely by being copied or referenced.
- **DEC-W4-005** — Each major capability should have one primary owner after explicit human review.
- **DEC-W4-006** — `T.Wings4.0` is disposable staging and never canonical.
- **DEC-W4-007** — No commit or push is performed without explicit authorization.
- **DEC-W4-008** — Portfolio entities are classified before physical migration.
- **DEC-W4-009** — Dirty Git repositories are ineligible for physical migration until resolved.
- **DEC-W4-010** — `.env` files are potentially secret-bearing and must not enter canon without review.
- **DEC-W4-011** — Test fixtures, generated evidence, and empty placeholders are not canonical portfolio projects.
- **DEC-W4-012** — Classification confidence must be explicit.
- **DEC-W4-013** — Wings3.0 assimilation is executed in controlled waves.
- **DEC-W4-014** — No whole legacy folder is copied merely to preserve it.
- **DEC-W4-015** — Wings3.0 retirement requires final disposition for every entity.
- **DEC-W4-016** — Legacy doctrine is adopted only through explicit item-level classification.
- **DEC-W4-017** — Wings4.0 rejects AI-first readability, monotonic documentation growth, and universal prohibition of human editing.
- **DEC-W4-018** — CIS is a legacy tool candidate, not a mandatory universal mechanism.
- **DEC-W4-019** — Empty legacy directories do not require migration.
- **DEC-W4-020** — The legacy Portafolio folder is outside portfolio-governance canon.

## Active portfolio governance

- **DEC-W4-021** — Wings4.0 listens to project HUMAN files; it does not control or silently rewrite them.
- **DEC-W4-022** — Pablo is the final portfolio decision authority.
- **DEC-W4-023** — Approved portfolio decisions are implemented through project-specific controlled prompts.
- **DEC-W4-024** — Each affected project evaluates and applies changes under its own local governance.
- **DEC-W4-025** — Wings4.0 verifies resynchronization after local changes.
- **DEC-W4-026** — Not all projects require integration; `UNRELATED` is valid.
- **DEC-W4-027** — Consolidation is reviewed when problem, user, outcome, capability, canon, or responsibility materially overlap.
- **DEC-W4-028** — An open-source alternative triggers build-versus-adopt review, not automatic termination.
- **DEC-W4-029** — The initial operational proof is a complete governance cycle, not a dashboard.
- **DEC-W4-030** — HUMAN is canonical declaration; BATON and bounded evidence support consistency checks without replacing HUMAN.
- **DEC-W4-031** — `20260716_AI.History.md` is high-value noncanonical collaboration history and must not act as session canon.
- **DEC-W4-032** — Governance course-correction freeze: no new `PORTFOLIO.CONTRACTS`, schema, or Ring-style protocol work is authorized until `PILOT-001` through `PILOT-004` (`MIGRATION.BACKLOG.md`) close with evidence. Rationale: after ~20 `GOV-01x`/`MB-SM-07x` minibattles, `TECH_DEBT.md` (TD-015, TD-016, TD-018, TD-019) and `HUMAN/HUMAN.WINGS4.md` ("Current limitations") still showed the foundational governance cycle unproven; effort had shifted toward coordination-protocol construction instead of closing that gap. Also: `00_STATE/BATON.WINGS4.ACTIVE.md`'s header was found stale by 12 days relative to its own body, and `W4_015M_R3.ps1` was found as untracked cruft in the canonical repo root instead of in disposable staging; both were corrected as part of this decision.
- **DEC-W4-033** — Wings4.0 applies `PR-PORT-006` to its own tooling. Repeated bespoke, single-use PowerShell verification scripts (e.g. three successive revisions of `W4_015M_R3.ps1` fixing the same stdout/stderr-mixing defect) are a signal to consolidate into reusable, tested tooling rather than reauthoring per minibattle. No specific tool is adopted by this decision; `WINGS4_GOV_016` scopes the follow-up review.
- **DEC-W4-034** — Ring 1 / `00_WINGS4_COORD` protocol reassessment (read-only review, no execution). Ring 1 execution, Brainy mutation, portfolio rollout, and push remain unauthorized (unchanged from `WINGS4_GOV_014P`), and are now additionally subordinated to `DEC-W4-032`: no Ring 1 work proceeds before `PILOT-001`–`PILOT-004` close. Evidence gathered during `PILOT-002` shows PS.SkillsMachine already maintains a working, reusable local Git pre-commit hook and a naming-validation script (`SyS/A_Tools/Validation/Install-PreCommitHook.ps1`, `Validate-SkillMachineNaming.ps1`) — i.e. a sibling project already solved an adjacent "verify-before-commit" problem the reusable way. Any future Ring 1 design should evaluate reusing or extending that existing pattern before authoring new bespoke coordination-verification scripts, consistent with `PR-PORT-006` and `PORTFOLIO.PRINCIPLES.md` #17.

## DEC-W4-PAIR-001 — Brainy purpose ownership and tool-neutral review

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-07-19
Scope: Portfolio interpretation only

Decision:

- Brainy is the leading candidate to own the durable product purpose currently shared with PS.HermesObsidianIntegration.
- Wings4.0 shall not prescribe Brainy's internal architecture.
- Hermes, Obsidian and future tools remain implementation candidates subject to explicit comparative evaluation.
- Existing use does not constitute strategic approval.
- Useful capabilities may later be absorbed into Brainy, but no tool adoption, migration, fusion or archive action is approved by this decision.
- Skills/GRC opportunities shall be recorded and routed to the applicable governance system rather than implemented directly by Wings4.0.

Next gate:

WINGS4_GOV_005_TOOL_VALUE_COMPARATIVE_REVIEW

## DEC-W4-PAIR-002 — Sequential resolution of Hermes and Brainy

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-07-19
Scope: Portfolio sequencing

Decision:

- First determine the disposition of PS.HermesObsidianIntegration relative to Brainy.
- Do not yet perform a broad market-tool assessment for Brainy.
- Do not yet decide Brainy's implementation, application or final tooling.
- After the Hermes–Brainy disposition is resolved and implemented, evaluate Brainy as the consolidated project under PR-PORT-006.
- Projects are solutions, investigations or developments; they are not assumed to be applications.

Immediate next minibattle:

WINGS4_GOV_005_DECIDE_HERMES_BRAINY_DISPOSITION

## DEC-W4-PAIR-003 — Selective absorption of PS.HermesObsidianIntegration into Brainy

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-07-19
Scope: Portfolio disposition

Decision:

- Brainy is the durable solution owner.
- PS.HermesObsidianIntegration is designated as a research and pilot project for selective knowledge absorption.
- Useful knowledge, requirements, privacy findings, evidence and unresolved questions shall be classified before transfer.
- Hermes, Obsidian and plugins remain unevaluated tools and are not adopted by this decision.
- The source project may be archived only after transfer, local project updates, resynchronization and explicit human approval.
- No external project is modified by this decision record.

Disposition:

ABSORB_KNOWLEDGE_AND_CLOSE_PROJECT

Next minibattle:

WINGS4_GOV_006_PREPARE_HERMES_TO_BRAINY_TRANSFER_INVENTORY

## DEC-W4-PAIR-004 — Approval of Hermes-to-Brainy transfer inventory

Status: APPROVED
Date: 2026-07-19
Scope: Portfolio transfer review

Decision:

- The artifact-level transfer inventory is approved.
- All former REVIEW_REQUIRED items now have final treatment.
- Tool adoption remains deferred.
- No external project is modified by this decision.
- The next step is to prepare two separate project-local transfer packets:
  1. Brainy intake/review packet.
  2. PS.HermesObsidianIntegration close/transition packet.
- Archive remains unauthorized until project-local updates and resynchronization pass.

Next minibattle:

WINGS4_GOV_008_PREPARE_PROJECT_LOCAL_TRANSFER_PACKETS

## DEC-W4-PAIR-005 — Project-local transfer execution model

Status: APPROVED
Date: 2026-07-19
Scope: Transfer execution governance

Decision:

- Wings4.0 prepares instructions but does not directly modify Brainy or PS.HermesObsidianIntegration.
- Brainy must evaluate and implement durable requirements under Brainy-local governance.
- PS.HermesObsidianIntegration must prepare its own transition and close records under source-project-local governance.
- Results return to Wings4.0 as consolidated evidence.
- Archive remains unauthorized until both project-local results are validated and resynchronized.

Next minibattle:

WINGS4_GOV_009_EXECUTE_BRAINY_PROJECT_LOCAL_ABSORPTION_REVIEW

## DEC-W4-PAIR-005 — Brainy absorption validated

HISTORICAL_ID_COLLISION_NOTE: This ID also appears above as "Project-local transfer execution model". Both historical entries are preserved; no silent rename in this update. Future unique IDs must avoid repeating PAIR-005.

Date: 2026-07-19
Status: ACTIVE

Decision:

- Accept Brainy commit a3e4073828655bc6c9955a865a5c691c4cf043cd as the validated execution result of WINGS4_GOV_009.
- Confirm Brainy as durable owner of the approved Hermes-derived requirements.
- Confirm no Hermes, Obsidian or plugin adoption occurred.
- Confirm PS.HermesObsidianIntegration remains unchanged.
- Keep source-project archive/deletion unauthorized.
- Open a separate portfolio disposition minibattle before any archival action.

## DEC-W4-PAIR-006 — Freeze and archive Hermes

Date: 2026-07-19
Status: ACTIVE
Human authorization: APPROVE_FREEZE_AND_ARCHIVE

Decision:

- Set PS.HermesObsidianIntegration status to FROZEN_ARCHIVE.
- Retain the source project physically in its current location.
- Retain all historical evidence and SHA-256 inventory.
- Confirm Brainy as durable owner of the approved requirements.
- Prohibit new Hermes-local development, CIS execution and workflows.
- Prohibit plugin enablement, vault traversal, routing and write-back.
- Do not move, compress or delete the source project.
- Require a new explicit Wings4 decision for any future reactivation or physical disposition.

## DEC-W4-PAIR-007 — Transfer all Hermes Skills/GRC opportunities

Date: 2026-07-19
Status: ACTIVE
Human authorization: TRANSFER_ALL_OPPORTUNITIES

Decision:

- Transfer all 13 opportunities to PS.SkillsMachine as candidates.
- Wings4 does not evaluate relevance, quality, duplication or canonical disposition.
- SkillsMachine owns subsequent assessment, deduplication, consolidation, rejection and canonization.
- No candidate is preapproved for implementation.
- No SkillsMachine file is modified by GOV-011.

## DEC-W4-PAIR-008 — Deliver opportunity package to SkillsMachine

Date: 2026-07-19
Status: ACTIVE

Decision:

- Accept the GOV-012 single-file delivery package as complete.
- Confirm all 13 opportunities were included with no filtering by Wings4.
- Confirm SkillsMachine and Hermes were not modified.
- Confirm SkillsMachine owns all subsequent relevance and canon decisions.
- Close GOV-012 after local Wings4 commit.

## WINGS4_GOV_015C_SCOPE_BOUNDARY_HUMAN_DECISION

- Status: APPROVED
- Generated at: 2026-07-28 16:36:31 -04:00
- DeveFact remains an internal HIA component.
- AIX owns generic operational AI execution.
- Nightshift owns comparative agent experimentation.
- C:\01. GitHub\Nightshift is canonical.
- C:\01. GitHub\Skills\99.LABS\Nightshift is frozen pending read-only comparison.
- Brainy owns durable memory and cognitive continuity.
- Hermes–Obsidian owns tool integration only.
- SkillsMachine owns reusable Skills/GRC canon.
- Project-local reconciliation packets are authorized.
- Direct cross-project mutation remains prohibited.
- Push not performed.

## DEC-W4-035 — Approve Brainy portfolio card with amendments and authorize prompt delivery (limited)

Status: APPROVED_WITH_AMENDMENTS
Date: 2026-07-30
Scope: Wings4.0 portfolio decision; delivery artifact authorized for Brainy local evaluation only.

Decision:

- Approve `PORTFOLIO.CARDS/BRAINY.CARD.md` as `APPROVED_WITH_AMENDMENTS`. The approval includes normative wording clarifying Brainy-local vs portfolio-level Skills ownership (recorded in the card's amendments section). Wings4.0 does NOT modify Brainy.
- Authorize `PORTFOLIO.REVIEWS/PILOT_INTERVENTION_PROMPT_DRAFT.BRAINY_SKILL_LAYER.md` for delivery to Brainy for local evaluation and application under Brainy's governance. Delivery does NOT authorize Wings4.0 to mutate Brainy's repository.
- PC-012 remains OPEN_PENDING_IMPLEMENTATION until Brainy applies the approved insertion locally and returns resynchronization evidence to Wings4.0.
- Capability and relationship map entries remain PROPOSED_PENDING_RESYNCHRONIZATION; no canonical ownership change occurs until evidence of local application and human confirmation.

Next action:

- Deliver prompt artifact to Brainy owner for local application and request evidence (diff/commit-id) for closure of PC-012. Do not commit or push any Wings4.0 changes to remote until human confirms.

## DEC-W4-036 — WPI & SMDI conceptual approvals (material record)
Status: APPROVED_CONCEPTUAL_PENDING_IMPLEMENTATION
Date: 2026-07-31

Decision (conceptual approvals; implementation pending):
- Approve the Wings4 Portfolio Interface (WPI) as the general contractual direction between Wings4 and autonomous portfolio projects (conceptual approval, v0.1).
- Classify SkillsMachine as PROJECT_TYPE=PORTFOLIO_ENABLING_PRODUCT.
- Record SkillsMachine portfolio role as ROLE=REUSABLE_WORK_CAPABILITY_PROVIDER.
- Approve the conceptual boundary between WPI and SMDI. (SMDI = SkillsMachine Distribution Interface.)
- WPI exposes the portfolio relationship REUSABLE_ASSET_GOVERNANCE_AND_DISTRIBUTION.
- SMDI governs distribution, installation, update and feedback contracts between SkillsMachine and consuming projects.
- Approved distribution model: VERSIONED_LOCAL_COPIES.
- Generic reusable canon remains canonically owned by SkillsMachine.
- Installed GENERIC_IMPORTED assets are locally immutable.
- Promotion applies only to PROJECT_LOCAL or REUSABLE_CANDIDATE assets; promotion to SkillsMachine canon requires explicit human authorization.
- A project must not alter an imported generic asset while retaining the same source identity, version or source hash.
- A project must not redistribute imported generic assets as portfolio canon.
- Local installation and activation authority belongs to the consuming project.
- Runtime dependency on Wings4 is prohibited.
- Runtime dependency on SkillsMachine is prohibited.
- Direct cross-repository mutation is prohibited.
- Preserve and reuse the existing SkillsMachine updater, baseline contract, registries, schemas, test runner, acceptance evidence and SM-UPD identifiers; do not redesign or duplicate proven mechanisms.
- Execute a controlled TEST_ technical fixture before onboarding a real consumer; Brainy remains the first real consumer after technical fixture acceptance.
- Version 0.1 is operator-mediated file exchange only: file-based JSON feedback receipts, no API, no central receipt service.
- Canonical WPI and SMDI implementation remain pending; DEC-W4-036 does not authorize commit or push.

Next action:
- Continue in a new Cursor session rooted at C:\01. GitHub\Skills using SKILLSMACHINE_SMDI_GOVERNED_THIN_PILOT_DESIGN_001, read-only first.
- Return verified evidence to Wings4 for later resynchronization.
- No commit or push is authorized by this decision.

## DEC-W4-037 — Modular control plane and governed stable core

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-02
Scope: Wings4.0 local architecture and session continuity only

Decision:

- Adopt Wings4.0 as a modular portfolio-governance control plane using federated governance.
- Do not split Wings4.0 into additional projects at this stage.
- Use logical bounded contexts inside Wings4.0 and permit progressive extraction only after evidence-based ownership, lifecycle, consumer, interface and net-value gates pass.
- Adopt the continuity layers `L0_GOVERNED_STABLE_CORE`, `L1_CURRENT_OPERATIONAL_HANDOFF`, and `L2_CANONICAL_DETAIL_ON_DEMAND`.
- The L0 core must preserve identity, purpose, authority, local-canon boundaries, prohibitions, operating cycle, source hierarchy and project-isolation rules.
- The operational handoff does not replace canonical project documentation.
- Questions concerning project identity, authority, ownership or core purpose must consult L0 and relevant canonical L2 sources rather than rely on conversational memory alone.
- Align PC-012 with `DEC-W4-035`: human decision is complete; Brainy-local implementation and Wings4 resynchronization remain pending.
- Register the conflict between the frozen Hermes project and later active tool-integration ownership wording; no ownership reassignment or project reactivation is approved by this decision.
- No child project mutation, new project creation, commit or push is authorized.

Architecture direction:

- `KEEP_IN_WINGS`: portfolio identity, governance, architecture, cross-project coordination, conflict management, decision support, intervention routing and resynchronization.
- `MODULARIZE_IN_WINGS`: strategic sourcing policy, AI delivery strategy, Wings-local session continuity, observability and evidence.
- Existing owners remain authoritative where already approved: AIX for generic operational AI execution, Nightshift for comparative agent experimentation, SkillsMachine for reusable Skills/GRC canon, and Brainy for durable memory and cognitive continuity.

Next action:

Apply and validate the minimum Wings4-local canon and handoff reconciliation. Defer physical folder reorganization and capability extraction.


## DEC-W4-038 — Distinguish stable continuation contracts from generated active handoffs

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-02
Scope: Wings4.0 project-local session continuity

Decision:

- Reserve `ORCHESTRATOR.CONTINUE.ACTIVE.txt` and `EXECUTOR.CONTINUE.ACTIVE.txt` for the single current generated handoff of each role.
- Rename the stable role-specific generation contracts to `ORCHESTRATOR.CONTINUE.CONTRACT.txt` and `EXECUTOR.CONTINUE.CONTRACT.txt`.
- Do not retain generic `SESSION_CONTINUE.ACTIVE.txt` files after references are reconciled.
- Do not accumulate historical handoffs.
- Compact the active BATON to current identity, state, continuity evidence, blockers, next action and canonical pointers.
- Historical portfolio decisions remain in `PORTFOLIO.DECISION_LOG.md`; roadmap and execution history remain in `MIGRATION.BACKLOG.md`.
- No historical BATON copy is created because the removed content is duplicative rather than the sole canonical evidence.
- No child project mutation, commit or push is authorized by this decision.
## DEC-W4-039 — Commit-independent active-state semantics

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-02
Scope: Wings4.0 local canon and session continuity

Decision:

- Versioned active canon expresses logical lifecycle state, not a future commit transition.
- `READY_FOR_LOCAL_COMMIT` and `PENDING_COMMIT` are valid only as transient execution evidence, not durable post-commit state.
- Generated handoffs use `HEAD_AT_GENERATION` as evidence of their creation baseline.
- Every resumed session resolves `CURRENT_HEAD_AT_RESUME` directly from Git and validates ancestry and expected worktree state.
- Stable contracts require runtime Git resolution and must not imply that an embedded hash remains current.
- Durable commit and push policies remain versioned; one-time `COMMIT=YES/NO` and `PUSH=YES/NO` belong in execution evidence.
- Historical backlog records remain immutable unless independently proven incorrect.
- No child-project mutation, commit or push is authorized by this decision.

## DEC-W4-040 — AI.History exclusion and RADAR visibility boundary

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-02
Scope: Wings4.0 local chat-session exports and RADAR governance

Decision:

- `AI.History/` contains exported chat-session history.
- `AI.History/` must remain untracked by Git and must not be published to GitHub.
- `AI.History/` must not be ingested, parsed, summarized, hashed, monitored or change-tracked by `RADAR.CORE`.
- `RADAR.INDEX` may include, at most, one minimal existence/location reference for `AI.History/`.
- Any `RADAR.INDEX` reference must omit file contents, file-level inventory, hashes, summaries, timestamps and change tracking.
- The current Wings4.0 repository contains no active RADAR implementation or configuration; enforcement inside RADAR must occur in the repository or configuration that owns RADAR.
- This decision does not authorize inspection of exported chat contents.
- No child-project mutation, commit or push is authorized by this decision.

## DEC-W4-041 — Minimal Orchestrator session-close package

Status: APPROVED_FOR_LOCAL_APPLICATION
Date: 2026-08-03
Scope: Wings4.0 Orchestrator continuity

Decision:

- A new Orchestrator session must resume from Git-resolved current state, not from embedded historical assumptions.
- The minimal startup package consists of the active Orchestrator continuation handoff, its stable contract and the external RADAR transfer only while that dependency remains unresolved.
- BATON is optional startup context and should be uploaded only when the active handoff is insufficient.
- Historical execution reports and AI.History/ are excluded from the startup package.
- CORE_003, CORE_004, CORE_005 and CORE_006 are closed local baselines and must not be reopened without new contradictory evidence.
- The unresolved RADAR owner is a transfer dependency, not a reason to retain the current session.
- No child-project mutation, staging, commit or push is authorized by this decision.
## DEC-W4-042 — Session continuation folders are self-contained outputs

Status: APPROVED_FOR_LOCAL_APPLICATION
Date: 2026-08-03
Scope: Wings4.0 session continuity

Decision:

- SESSIONS/ORCHESTRATOR/03.SESSION_CONTINUE is an output bundle, not a canonical source layer.
- The folder must be upload-ready and self-contained.
- The user may upload every file in the folder without writing an additional prompt.
- 00.START_HERE.ORCHESTRATOR.txt is the mandatory package entrypoint.
- Duplication is allowed for transport snapshots when it reduces startup friction.
- BATON.WINGS4.ACTIVE.md and W4C006_RADAR_TRANSFER.txt may be duplicated into the folder.
- Snapshot copies do not supersede their canonical or source files.
- CONTINUE.MANIFEST.txt must record provenance and hashes.
- External file lookup must not be required to start the next session.
- AI.History/ remains fully excluded.
- No staging, commit or push is authorized by this decision.
## DEC-W4-043 — Orchestrator continuation output uses one consolidated file

Status: APPROVED_FOR_LOCAL_APPLICATION
Date: 2026-08-03

Decision:

- 03.SESSION_CONTINUE is a regenerable output, not canon.
- Default target is one consolidated upload-ready file.
- Separate manifest, BATON snapshot, contract snapshot, active handoff and transfer snapshot are prohibited when their minimum required content can be consolidated safely.
- Uploading the full folder must be equivalent to uploading the single file.
- Additional prompt is not required.
- Runtime Git validation remains mandatory.
- HEAD_AT_GENERATION must equal the current committed HEAD at generation time.
- Duplication is allowed only when consolidation would lose essential semantics.
- AI.History remains fully excluded.
- No staging, commit or push is authorized by this decision.

## DEC-W4-044 — Project-local RADAR ownership and Wings3 absorption direction

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-04
Scope: Wings4.0 RADAR ownership model and Wings3 predecessor relationship

Decision:

- Every project owns, configures, executes and governs its own RADAR.
- SkillsMachine owns reusable Skills/GRC canon only; it does not intervene in other projects and does not own or operate other projects' RADAR.
- Wings4.0 owns its own future project-local RADAR implementation and execution.
- No global RADAR owner exists or is required.
- A reusable RADAR Skill in SkillsMachine, if present, is consultable guidance only and does not transfer ownership or execution authority.
- Wings3.0 is the legacy predecessor and selective source for Wings4.0.
- Useful RADAR components may be absorbed only after read-only assessment (`WINGS4_RADAR_001`).
- Wings3.0 retirement remains a governed end-state, not an immediate deletion authorization.
- Ownership ambiguity previously carried as `RADAR_OWNER=UNRESOLVED` in active continuity is superseded for current state by this decision; historical records remain unchanged.
- `DEC-W4-040` AI.History exclusion semantics remain in force.
- No child-project mutation, staging, commit or push is authorized by this decision.

Clarification (CORE_010A, 2026-08-04):

- `WINGS4_RADAR_001` was assessment only for selective absorption readiness.
- No absorption, copying or RADAR implementation occurred under RADAR_001.
- `WINGS4_RADAR_002` is design-only and is not implementation authorization.
- Wings3.0 retirement and physical removal remain unauthorized until complete governed absorption and explicit human authorization.

## DEC-W4-045 — RVF visual proof acceptance and RADAR_002 design close

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-04
Scope: Wings4.0 local RVF close; no RADAR implementation; no child-project mutation

Decision:

- Control Room interactive human validation passed.
- Control Room is accepted as NONCANONICAL_INTERNAL_FUNCTIONAL_PROOF.
- Control Room remains disposable and outside canon (KEEP_DISPOSABLE_ONLY).
- WINGS4_RADAR_002 local-use design is approved and closed as CLOSED_PASS_DESIGN_LOCAL_USE.
- RADAR implementation remains unauthorized.
- Brainy is the next external project for foundational cycle closure (PILOT-004 / PC-012).
- SkillsMachine follows after Brainy closure.
- DEC-W4-032 freeze remains active until foundational cycle closure.
- No push, no child-project mutation, and no Control Room canonization are authorized by this decision.

## DEC-W4-046 — Close PC-012 / PILOT-004 after Brainy resync; limited DEC-W4-032 freeze lift

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-05
Scope: Wings4.0 foundational cycle close; limited freeze-lift conditions; no SkillsMachine mutation

Decision:

- Validate Brainy commit `845c8766aee1043a3405a21cb3f935415f9facc1` as DEC-W4-035 return evidence for the Brainy Skill-boundary clarification and related chat-history exclusion policy.
- Close PC-012 as `CLOSED_RESOLVED`.
- Close PILOT-004 as `COMPLETED_RESYNCHRONIZED` / closed foundational resynchronization step.
- Record the foundational governance cycle (PILOT-001 through PILOT-004) as complete for the Brainy Skill-boundary scope.
- Accept Brainy historical-chat policy as PASS: folder `89_LEGACY\Z1_IA history` is ignored, untracked, content-inspection prohibited, RADAR.CORE excluded, RADAR.INDEX at most one folder-level reference.
- Classify prior Brainy RADAR ACTIVE file-level references as `NON_BLOCKING_STALE_DISPOSABLE_OUTPUT`.
- Lift the active freeze state of DEC-W4-032 only under limited conditions. DEC-W4-032 historical rationale remains preserved and is not rewritten.
- Limited lift ALLOWS: record already-proven foundational closes; perform SkillsMachine read-only reconciliation; prepare evidence-based next-step proposals; continue project-local observation/resynchronization; prepare a future controlled SkillsMachine package only after separate human approval.
- Limited lift still PROHIBITS: SkillsMachine implementation/mutation; Ring 1 execution; WPI/SMDI rollout; `00_WINGS4_COORD` portfolio deployment; new schemas or contracts; new portfolio-wide protocols; RADAR implementation; child-project mutation; push; architecture work without a concrete validated use case.
- Approve SkillsMachine read-only reconciliation as the next spoke (`WINGS4_SKILLSMACHINE_READ_ONLY_RECONCILIATION`).
- SkillsMachine mutation, SkillsMachine execution, Ring work, rollout, new schemas/contracts, RADAR implementation and push remain unauthorized by this decision.


## DEC-W4-047 — SkillsMachine WHOAMI→HUMAN absorption request (governed transfer)

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-05
Scope: Wings4.0 portfolio record and controlled transfer preparation; no SkillsMachine mutation by Wings4

Decision:

- Record the human directive that SkillsMachine must absorb useful WHOAMI context/data into HUMAN under SkillsMachine-local governance.
- Preserve HUMAN as primary semantic authority; WHOAMI must not remain competing semantic canon.
- Preserve Skills/GRC accumulated learning in Skills/GRCs; do not move reusable learning into WHOAMI or bury it only in code.
- Keep transient operational state in BATON/current state, not HUMAN.
- Wings4 prepares a governed transfer package for SkillsMachine ORCHESTRATOR evaluation; Wings4 does not decide exact SkillsMachine file edits.
- SkillsMachine must consult its HUMAN and prior Q&A before implementation and must return evidence to Wings4 after local execution.
- This decision is the separate human approval contemplated by DEC-W4-046 for preparing a controlled SkillsMachine package.
- SkillsMachine mutation by Wings4 remains prohibited.
- Child-project dirty technical workstreams (DCA, SMDI harness, transcript Skill, session-close retention) are out of scope for this transfer.
- Push remains unauthorized by this decision.
- Transfer package: PORTFOLIO.TRANSFERS/SKILLSMACHINE_WHOAMI_TO_HUMAN_TRANSFER_PACKAGE.md

## DEC-W4-048 — Product, Project, Repository and Root differentiation

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-06
Scope: Wings4.0 product identity; Q-065..Q-071, Q-082, Q-083

Decision:

- PRODUCTO_WINGS4 is what the user operates.
- PROYECTO_WINGS4 is the development process of that product.
- REPOSITORIO_WINGS4 is the versioned logical unit used by ORCHESTRATOR/EXECUTOR.
- ROOT_WINGS4 is the physical repository location; ROOT_ACTUAL=`C:\01. GitHub\Wings4.0`.
- Initial operational user is Pablo; gerencia reviews demos and declares deploy readiness.
- Primary function: detect conflicts/discrepancies/interferences/omissions within and across projects, and detect market tools that may replace/complement/reduce own development.
- Architecture is local-first for memory/confidentiality, AI-provider-neutral, with optional local agents; first deploy is local single-user.

## DEC-W4-049 — First product pilot target and SkillsMachine as first analyzed project

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-06
Scope: Product Ring0 target; Q-072, Q-079, Q-084

Decision:

- FIRST_PROJECT_ANALYZED=SkillsMachine.
- Authorize Wings4-local Product Ring0 diagnostic under `WINGS4_LOCAL_PRODUCT_RING0_AND_CANON_RECONCILIATION`.
- SkillsMachine is the first analyzed project, not a universal dependency for later rings.
- Rings 2..5 remain unauthorized for implementation by this decision.
- This authorization does not permit Wings4 to read or mutate `C:\01. GitHub\Skills` during Ring0 prototype construction; fixture data must come from Wings4-held evidence or clearly marked noncanonical representatives.

## DEC-W4-050 — Approved Ring0 output is interactive actionable diagnosis

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-06
Scope: Product Ring0 output; Q-073

Decision:

- APPROVED_OUTPUT=interactive actionable diagnosis.
- The first flow must let a user understand SkillsMachine, inspect findings, open evidence, review alternatives, see a recommendation, and act.

## DEC-W4-051 — Human decision updates Wings4 state without automatic project mutation

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-06
Scope: Product Ring0 decision flow; Q-074

Decision:

- APPROVED_DECISION_FLOW=register human decision and update Wings4 state.
- Allowed actions: ACCEPT, REJECT, MODIFY, DEFER.
- Export of the decision is required.
- Automatic mutation of the analyzed project is prohibited.

Amendment note (2026-08-06, DEC-W4-055): the visible Ring0 UI label is now POSTPONE rather than DEFER. Internal DEFER/DEFERRED semantics may remain for compatibility when the mapping is explicit.

## DEC-W4-052 — Cumulative management deliveries

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-06
Scope: Management delivery model; Q-075, Q-076

Decision:

- Each delivery must explain what Wings4 is, what it solves and how it works; demonstrate real live functionality; preserve/improve prior functionality; and add new functionality unless an authorized delivery focuses on refining an existing one.
- Presentations, reports, BATON, RADAR, GRC, architecture, promises and planning alone do not count as product functionality.
- Deliveries continue until gerencia declares deploy readiness.

## DEC-W4-053 — Wings4–SkillsMachine product vs project relationship

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-06
Scope: Cross-product and cross-project boundaries; Q-077, Q-078

Decision:

- As products: Wings4 may optionally integrate with SkillsMachine for reusable Skills/GRC discovery/consultation/request/distribution/feedback; that integration is not mandatory for every Wings4 function.
- As projects: Wings4 does not develop or modify SkillsMachine; needs transfer via governed request; SkillsMachine evaluates/implements locally; Wings4 receives evidence and verifies resynchronization.

## DEC-W4-054 — Resolve PC-013 without reactivating Hermes

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-06
Scope: PC-013; Q-080

Decision:

- Set PC-013=`RESOLVED_CAPABILITY_UNASSIGNED_UNTIL_REAL_USECASE`.
- Hermes remains `FROZEN_ARCHIVE`.
- Generic tool-integration capability stays unassigned until a concrete real use case exists.
- If Brainy later needs the capability, Brainy is the preferred local-evaluation candidate.
- Do not reactivate Hermes.
- Do not create a successor without concrete need.

## DEC-W4-055 — Ring0 visible POSTPONE label and English-only UI

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-06
Scope: Ring0 UX hardening; Q-085, Q-086; authorization `WINGS4_LOCAL_RING0_HARDENING_AND_DEPLOY_READINESS`

Decision:

- Visible decision actions for Ring0: ACCEPT, REJECT, MODIFY, POSTPONE.
- Visible label POSTPONE replaces DEFER. Meaning: keep the finding open and decide later. POSTPONE is not rejection.
- Internal persistence may retain DEFER/DEFERRED equivalence when the UI mapping is explicit.
- Ring0 human-facing UI must be English only at approximately Cambridge C1 professional standard.
- Preserve canonical IDs, filenames, codes and literal source names for traceability.
- This language rule is Ring0-local and does not create a portfolio-wide language standard by itself.
- Ring1+ implementation and SkillsMachine mutation remain unauthorized by this decision.

## DEC-W4-056 — Authorize Ring1 decision lifecycle plus minimal intervention package

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-06
Scope: Ring1 product increment; Q-089; authorization `RING1_A_PLUS_MINIMAL_B_APPROVED`

Decision:

- RING1_SCOPE=`DECISION_LIFECYCLE_PLUS_MINIMAL_CONTROLLED_INTERVENTION_PACKAGE`.
- OPTION_A: decision lifecycle after Ring0 decision (owner, status, next action, optional review date, history, close/reopen, traceability).
- MINIMAL_OPTION_B: generate an exportable controlled intervention package for the target project's ORCHESTRATOR after ACCEPT or MODIFY only.
- Preserve Ring0 completely as the cumulative baseline.
- REJECT and POSTPONE do not create intervention packages by default.
- Package is NOT EXECUTOR authorization; target project retains local authority; no cross-repo mutation.
- First pilot target project remains SkillsMachine; generic target model required.
- Not authorized: child-project mutation, return/resync automation, product-to-product live integration, market scanning, Ring2+, RADAR.
- PUSH remains unauthorized unless separately approved.

## DEC-W4-057 — Ring1 UX simplification and governed routing

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-06
Scope: Ring1 UX; Q-090; authorization `RING1_UX_SIMPLIFICATION_AND_GOVERNED_ROUTING`

Decision:

- Minimize user free text to one Decision note field.
- Owner is not user-editable in the current single-user UI (internal attribution may remain).
- Next Action is system-derived and read-only.
- Generic Review Date input is removed from the normal Ring1 UI.
- Target Project is never free text; it is preselected from finding evidence or selected from governed options already represented by Wings4.
- Preview package control is removed; package content remains visible; primary eligible action is DOWNLOAD INTERVENTION PACKAGE.
- Wings4 derives a Governed Route for eligible decisions: SOURCE, DESTINATION, DESTINATION_ROLE, PURPOSE, AUTHORIZED_SCOPE, PROHIBITED_SCOPE, INPUT_EVIDENCE, EXPECTED_OUTPUT, RETURN_EVIDENCE, AUTHORITY_BOUNDARY, EXECUTION_STATUS.
- Intervention export must derive from the governed route and cannot target arbitrary projects.
- Ring2 remains design-only (return-evidence/resynchronization contract may be defined, not implemented).
- No staging/commit/push in W4P005 without separate authorization after live validation.

## DEC-W4-058 — Intervention package hardening and Ring2 return verification

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-07
Scope: Intervention contract + Ring2; Q-091, Q-092; authorization `INTERVENTION_PACKAGE_HARDENING_PLUS_RING2_IMPLEMENTATION`

Decision:

- W4P005_HUMAN_LIVE_VALIDATION=PASS.
- Harden Intervention Package: unique INTERVENTION_PACKAGE_ID (pattern `W4IP-YYYYMMDD-NNNN`), schema version, source/target project and root metadata, destination role, temp/minimization policies when applicable, mandatory return AI block with the same package ID, authority banners.
- Package must be self-sufficient for a target ORCHESTRATOR without additional explanation.
- Implement Ring2: ingest return evidence / AI block, correlate by package ID, verify identity/root/scope/prohibitions/output/evidence/commit/push/conflicts, classify missing evidence separately from failure, update Wings4-local state only.
- Paths and temp metadata are metadata only; they do not authorize Wings4 to read or mutate the target repository.
- Ring3+ and RADAR remain unauthorized.
- No staging/commit/push in W4P006 without separate authorization after live validation.

## DEC-W4-059 — W4P006A Ring2 functional recovery after human-detected gaps

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-07
Scope: W4P006A recovery + Ring2 backlog; Q-093; authorization `W4P006A_RING2_FUNCTIONAL_RECOVERY_PLUS_BACKLOG`

Decision:

- Preserve `W4P005_HUMAN_LIVE_VALIDATION=PASS` and accepted Ring0/Ring1 UX constraints.
- Record W4P006 static-validation false positive without rewriting historical report files:
  - prior claim `INTERVENTION_PACKAGE_ID_IMPLEMENTED=YES` contradicted by human export showing `W4IP-PENDING-ASSIGNMENT`;
  - prior claim `RING2_RETURN_INPUT=PASS` contradicted by absent usable textarea / TXT import / VERIFY wiring.
- Assign a real persistent `W4IP-YYYYMMDD-NNNN` no later than PACKAGE_READY; visible header must show `WINGS4_CONTROLLED_INTERVENTION_PACKAGE ID: W4IP-...`; machine-readable `INTERVENTION_PACKAGE_ID=` remains; never leave pending once ready/exported.
- SkillsMachine temp metadata resolves to `C:\Users\aazcl\Downloads\Temp.SkillMachine` when applicable; metadata does not authorize Wings4 access/mutation.
- Ring2 minimal UI: one Return evidence textarea, optional IMPORT TXT, VERIFY RETURN; no JSON editing required.
- Useful Ring2 parser/classifier/state-safety backlog is authorized; Ring3+, RADAR, child mutation, staging/commit/push remain unauthorized.
- Interactive functions must not be marked PASS solely from static/code presence.

## DEC-W4-060 — W4P006B Ring2 UX hardening and baseline-prep gate

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-07
Scope: W4P006B UX/hardening/close-prep; Q-094; authorization `W4P006B_RING2_UX_HARDENING_BASELINE_PREP`

Decision:

- Human negative-path Ring2 tests PASS: unknown ID, incomplete return, scope conflict (even when OVERALL_STATUS=PASS), unauthorized PUSH=YES.
- Add COPY PACKAGE adjacent to DOWNLOAD; copy and download must use identical canonical package text; copy must not regenerate package ID.
- Widen detail/package/Ring2 geometry; wrap/break long paths and machine-readable lines; keep UI minimal (no graph framework).
- Angle-bracket template placeholders (`<PASS|...>`, `<YES|NO>`, `<n>`, etc.) are missing/invalid evidence, not real values.
- Do not mark `HUMAN_RING2_LIVE_VALIDATION=PASS` until valid-return VERIFIED_PASS is proven by human or existing browser automation.
- Product baseline commit authorized only after that valid-return proof plus static/logical gates; PUSH remains unauthorized.
- Ring3+, RADAR, SkillsMachine read/write, child mutation remain unauthorized.

## DEC-W4-061 — Product North Star, operating model and success contract

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-07
Scope: Product North Star / operating model; Q-095..Q-109; authorization `WINGS4_PRODUCT_NORTH_STAR_AND_MANAGEMENT_DELIVERY_PREP`

Decision:

- Canonize one unified user-facing Wings; internal roles may exist but Pablo does not manually coordinate multiple personas (Q-095).
- Portfolio scope includes active/potential projects, initiatives, investigations, businesses, ideas and not-yet-repository work; software/AI is the initial priority (Q-096).
- Wings is push-first and pull-supported (Q-097).
- Distinguish core on-demand MARKET_CHECK from future unauthorized proactive MARKET_MONITORING (Q-098).
- Before material custom development, evaluate same-project, portfolio-reusable, Skills/GRC, open-source, commercial, then residual custom options; discovery alone does not authorize adoption (Q-099).
- Core finding classes: CONFLICT, DISCREPANCY, INTERFERENCE, OMISSION, DUPLICATION, OPPORTUNITY, EXTERNAL_SOLUTION; preserve FACT/INFERENCE/RECOMMENDATION (Q-100).
- UNKNOWN must explain insufficiency, required evidence and bounded next action; never silently convert to certainty (Q-101).
- Progressive low-risk automation is preferred early; high-risk/strategic/irreversible/material cross-project changes remain human-gated unless separately authorized (Q-102).
- Target return evidence is not sufficient independent proof for final closure; current Ring2 is RETURN VERIFICATION, not full independent resynchronization (Q-103).
- Human acceptance remains required for residual subjective/visual/experiential/business judgment (Q-104).
- Preferred execution model is Bounded Outcome Loops with max 6 iterations, one mutation owner per artifact, and cross-boundary escalation rather than unauthorized mutation (Q-105..Q-108).
- Wings must reduce net human effort/time/errors/duplication/unnecessary development or be redesigned/reduced/replaced (Q-109).
- This decision does not authorize Ring3+, RADAR, MARKET_MONITORING implementation, child mutation, staging, commit or push.

## DEC-W4-062 — Management Delivery #1 accepted by gerencia (bounded MD1)

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-13
Scope: MANAGEMENT_DELIVERY_1 gerencia acceptance; bounded MD1 only; authorization `WINGS4_MD1_GERENCIA_ACCEPTANCE_AND_SESSION_CLOSE`

Decision:

- MANAGEMENT_READY=YES
- MANAGEMENT_READY_SCOPE=BOUNDED_MD1
- MANAGEMENT_DELIVERY_1=ACCEPTED_BY_GERENCIA
- MANAGEMENT_DELIVERY_1_STATUS=CLOSED
- GERENCIA_DECISION_DATE=2026-08-13
- GERENCIA_ACCEPTANCE_BASIS=READY_FOR_GERENCIA_ACCEPTANCE_WITH_NON_BLOCKING_GAPS
- BLOCKING_GAP_COUNT=0
- NET_MANAGEMENT_VALUE_AT_ACCEPTANCE=PARTIAL
- The committed Ring0+Ring1+Ring2 Management Delivery #1 is accepted as sufficiently useful for bounded management use and incremental learning.
- MANAGEMENT_READY does not mean Wings4 is feature-complete or production-complete across future capabilities.
- This decision does not authorize or claim: WINGS4_COMPLETE; PORTFOLIO_WIDE_AUTOMATION_COMPLETE; INDEPENDENT_RESYNCHRONIZATION_COMPLETE; MARKET_CHECK_RUNTIME_COMPLETE; MULTI_PROJECT_ANALYSIS_COMPLETE; PUSH_FIRST_BRIEFING_COMPLETE; RADAR_COMPLETE; PRODUCTION_COMPLETE_FOR_ALL_FUTURE_CAPABILITIES.

Accepted non-blocking MD1 limitations (remain visible; not blockers):

- GAP_01=STAGE_INDICATORS_LOOK_CLICKABLE_BUT_ARE_NOT_NAVIGATION
- GAP_02=ABOUT_ORIENTATION_PARTLY_COLLAPSED_OR_HIDDEN
- GAP_03=RESIDUAL_JARGON_AND_FACT_FALLBACK_IN_SOME_FINDINGS
- GAP_04=MANUAL_INTERVENTION_PACKAGE_TRANSFER
- GAP_05=FIXTURE_OR_WINGS_HELD_EVIDENCE_NOT_LIVE_CHILD_REPOSITORY_READ

Future/unimplemented capabilities remain unimplemented and are not MD1 blockers:

- INDEPENDENT_RESYNCHRONIZATION_IMPLEMENTED=NO
- MARKET_CHECK_RUNTIME_IMPLEMENTED=NO
- MULTI_PROJECT_COMBINED_ANALYSIS_IMPLEMENTED=NO
- PUSH_FIRST_PORTFOLIO_BRIEFING_IMPLEMENTED=NO
- RING3_IMPLEMENTED=NO
- RADAR_IMPLEMENTED=NO
- MARKET_MONITORING_IMPLEMENTED=NO

Compact gerencia-review basis (do not re-score from this decision):

- GERENCIA_READY_REVIEW=PASS_WITH_GAP
- GERENCIA_READY_VERDICT=READY_FOR_GERENCIA_ACCEPTANCE_WITH_NON_BLOCKING_GAPS
- G1_PRODUCT_COMPREHENSION=PASS_WITH_GAP
- G2_DECISION_USEFULNESS=PASS_WITH_GAP
- G3_CONTROLLED_ACTION=PASS_WITH_GAP
- G4_RETURN_VERIFICATION=PASS
- DEPLOY_FUNCTIONALITY=PASS
- DEPLOY_STABILITY=PASS_WITH_GAP
- DEPLOY_REAL_DATA=PASS_WITH_GAP
- DEPLOY_REPEATABILITY=PASS
- HUMAN_MD1_ACCEPTANCE=PASS_8_OF_8
- NON_BLOCKING_GAP_COUNT=5

Next product minibattle is not authorized by this closure:

- NEXT_PRODUCT_MINIBATTLE=HUMAN_DECISION_REQUIRED
- NEXT_CANDIDATE_1=BOUNDED_OPERATOR_UX_FRICTION_CLEANUP (VALUE=LOW_TO_MEDIUM; EFFORT=LOW; RISK=LOW)
- NEXT_CANDIDATE_2=MARKET_CHECK_RUNTIME_BOUNDED_PRODUCTIZATION (VALUE=HIGH; EFFORT=HIGH; RISK=MEDIUM; STATUS=DIRECTION_CANONIZED_RUNTIME_NOT_AUTHORIZED)
- NEXT_CANDIDATE_3=INDEPENDENT_RESYNCHRONIZATION_BEYOND_RING2 (VALUE=HIGH; EFFORT=HIGH; RISK=HIGHER; STATUS=NOT_AUTHORIZED)

This decision does not authorize Ring3+, RADAR, MARKET_MONITORING, MARKET_CHECK runtime, independent resynchronization, child mutation, or push.

## DEC-W4-063 — Bounded on-demand Market Check runtime slice

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-13
Scope: MARKET_CHECK_RUNTIME_BOUNDED_PRODUCTIZATION_ONLY; authorization `W4_MARKET_CHECK_RUNTIME_BOUNDED_PRODUCTIZATION_001`

Decision:

- Authorize the smallest on-demand Market Check runtime slice inside the existing Ring0+Ring1+Ring2 product surface.
- MARKET_CHECK remains a diagnostic capability, not a new ring, not MARKET_MONITORING, not RADAR, and not Ring3.
- Operator invokes Market Check on demand from a finding, using governed questions only.
- Evidence is Wings-held/fixture only. Do not read child repositories. Do not scan the live web.
- UNKNOWN is required when evidence is missing; do not fabricate alternatives, fitness, or prices.
- Evaluation order remains Q-099 / PR-PORT-006. Discovery does not authorize adoption.
- This slice does not reopen MD1 and does not rewrite historical Ring0/Ring1/Ring2 acceptance evidence.
- This decision does not claim MARKET_CHECK_RUNTIME_COMPLETE, Wings4 complete, or production-complete future capabilities.
- MARKET_MONITORING, RADAR, Ring3, independent resynchronization, child mutation, and push remain unauthorized.

Spec: `PORTFOLIO.ARCHITECTURE/WINGS4.MARKET_CHECK.RUNTIME.SPEC.md`
Prototype: `PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/`

## DEC-W4-064 — Market Check bounded human-live validation recorded

Status: EVIDENCE_RECORDED
Date: 2026-08-15
Scope: RECORD_ONLY; authorizations `W4_MARKET_CHECK_HUMAN_LIVE_VALIDATION_001`, `W4_MARKET_CHECK_UNKNOWN_BROWSER_VALIDATION_002`, `W4_MARKET_CHECK_HUMAN_LIVE_VALIDATION_STATE_RECORD_003`
Runtime HEAD: `5a6714db6e9392f0dab216cfa93e766061dedcd9`

Recorded evidence:

- MARKET_CHECK_HUMAN_LIVE_VALIDATION=PASS
- UNKNOWN_PATH_BROWSER_VALIDATION=PASS
- MARKET_CHECK_RUNTIME_SCOPE=BOUNDED_ON_DEMAND
- LOGICAL_VALIDATION=PASS
- F-SM-001_BROWSER_VALIDATION=PASS
- F-SM-002_UNKNOWN_BROWSER_VALIDATION=PASS
- MARKET_CHECK_AUTO_RUN=NO
- MARKET_CHECK_CALLABLE_ON_DEMAND=YES
- ALTERNATIVES_BEFORE_RECOMMENDATION=YES
- UNKNOWN_HANDLING_VISIBLE=YES
- UNKNOWN_RECOMMENDATION_VISIBLE=YES
- SCOPE_LIMITS_VISIBLE=YES
- AUTHORITY_VISIBLE=YES
- MANAGEMENT_READABLE=YES
- MD1_REOPENED=NO
- CHILD_PROJECT_MUTATION=NO
- AI_HISTORY_INSPECTED=NO
- RING3_IMPLEMENTED=NO
- RADAR_IMPLEMENTED=NO
- MARKET_MONITORING_IMPLEMENTED=NO

Known limitations:

- Evidence remains fixture/Wings-held only.
- Cursor browser MCP was unavailable; validation used local Chrome CDP against the same demo UI (`http://127.0.0.1:8765/`).
- This is bounded human-live validation, not live market intelligence.
- This record does not claim MARKET_CHECK_RUNTIME_COMPLETE.

This decision does not authorize Ring3+, RADAR, MARKET_MONITORING, independent resynchronization, child mutation, MD1 reopening, or push.

## DEC-W4-065 — Market Check completion criteria and coverage slice

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-15
Scope: COMPLETION_CRITERIA_AND_COVERAGE_ONLY; authorization `W4_MARKET_CHECK_COMPLETION_CRITERIA_AND_NEXT_RUNTIME_SLICE_001`

Decision:

- Record explicit completion criteria for `MARKET_CHECK_RUNTIME_COMPLETE=YES` in `WINGS4.MARKET_CHECK.RUNTIME.SPEC.md`.
- Keep `MARKET_CHECK_RUNTIME_COMPLETE=NO` until those criteria are met. Do not overclaim.
- Governed evidence levels are: WINGS_HELD, HUMAN_PROVIDED, EXTERNAL_CHECKED, UNKNOWN.
- EXTERNAL_CHECKED is a Wings-held record of a prior authorized named check. It is not live web search, RADAR, or MARKET_MONITORING.
- Catalog/tests must exercise USE_EXISTING, BUILD, INTEGRATE, DEFER, REJECT/KILL, and UNKNOWN as a winner or as an explicit alternative.
- INTEGRATE as a winning recommendation is deferred: current findings still have an earlier evidenced class (same-project). INTEGRATE is exercised as a considered Wings-held alternative (DEC-W4-053).
- BUILD as a winning recommendation is deferred: no justified remaining custom gap is evidenced. BUILD is exercised as UNKNOWN/not-evidenced.
- This slice does not reopen MD1 and does not authorize Ring3, RADAR, MARKET_MONITORING, child mutation, live web scan, or push.

Spec: `PORTFOLIO.ARCHITECTURE/WINGS4.MARKET_CHECK.RUNTIME.SPEC.md`
Prototype: `PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/`

## DEC-W4-066 — Market Check BUILD/INTEGRATE logical winners and evidence-path contracts

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-15
Scope: BUILD_INTEGRATE_LOGICAL_WINNERS_AND_EVIDENCE_PATHS_ONLY; authorization `W4_MARKET_CHECK_REAL_EVIDENCE_AND_BUILD_INTEGRATE_PATHS_001`

Decision:

- Add honest logical winning paths: BUILD on `F-MC-001` (remaining Market Check result-note gap) and INTEGRATE on `F-MC-002` (optional Skills/GRC product integration per DEC-W4-053).
- Those winners are LOGICALLY_TESTED only. They do not reopen MD1 and are not human-live validated in this slice.
- HUMAN_PROVIDED is usable as `HUMAN_PROVIDED_SAMPLE` / `PENDING_HUMAN_CONFIRMATION`. Sample notes are not production evidence and cannot win.
- EXTERNAL_CHECKED is a `MANUAL_RECORD` contract. No live web search, monitoring, or RADAR. Pending until a named human-authorized record exists.
- Keep `MARKET_CHECK_RUNTIME_COMPLETE=NO`.
- Integration means governed product/service integration. It does not authorize child-project mutation.

Spec: `PORTFOLIO.ARCHITECTURE/WINGS4.MARKET_CHECK.RUNTIME.SPEC.md`
Prototype: `PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/`

## DEC-W4-067 — Market Check BUILD/INTEGRATE live UI validation recorded

Status: EVIDENCE_RECORDED
Date: 2026-08-15
Scope: RECORD_ONLY; authorizations `W4_MARKET_CHECK_BUILD_INTEGRATE_LIVE_UI_VALIDATION_001`, `W4_RECORD_BUILD_INTEGRATE_LIVE_UI_VALIDATION_002`
Runtime HEAD: `3063dad5bba4368cac4c3a2df6240e84eae3be01`

Recorded evidence:

- TASK_ID=W4_MARKET_CHECK_BUILD_INTEGRATE_LIVE_UI_VALIDATION_001
- STATUS=PASS
- LOGICAL_TESTS=PASS; CASES=20
- UI_VALIDATION_METHOD=LOCAL_CHROME_CDP
- CURSOR_BROWSER_MCP=UNAVAILABLE
- SERVER_URL=http://127.0.0.1:8785/
- BROWSER_STORAGE_CLEARED=YES
- F-MC-001_BUILD_UI_VALIDATED=YES
- F-MC-002_INTEGRATE_UI_VALIDATED=YES
- UNKNOWN_HANDLING_AVAILABLE=YES
- HUMAN_PROVIDED_SAMPLE_NOT_PRODUCTION=YES
- EXTERNAL_CHECKED_MANUAL_PENDING=YES
- MARKET_CHECK_RUNTIME_COMPLETE=NO
- NOT_MARKET_MONITORING=YES
- NOT_RADAR=YES
- NOT_RING3=YES
- MD1_REOPENED=NO
- CHILD_PROJECT_MUTATION=NO
- AI_HISTORY_INSPECTED=NO

This record supersedes the live-validation gap in DEC-W4-066 for F-MC-001 BUILD and F-MC-002 INTEGRATE. It does not rewrite DEC-W4-066. UNKNOWN remains available (F-SM-002 / MCQ-BUILD_VS_ADOPT). HUMAN_PROVIDED remains sample/not production. EXTERNAL_CHECKED remains a manual-record contract pending a named human-authorized check; it is not a live web scan.

Known limitations:

- Evidence remains fixture/Wings-held only.
- Cursor browser MCP was unavailable; validation used local Chrome CDP against the demo UI (`http://127.0.0.1:8785/`).
- This is bounded live UI validation, not live market intelligence.
- This record does not claim MARKET_CHECK_RUNTIME_COMPLETE.

This decision does not authorize product behavior changes, fixture/UI changes, Ring3+, RADAR, MARKET_MONITORING, independent resynchronization, child mutation, MD1 reopening, or push.

## DEC-W4-068 — Market Check manual evidence-intake contract

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-15
Scope: MANUAL_EVIDENCE_INTAKE_CONTRACT_ONLY; authorization `W4_MARKET_CHECK_EVIDENCE_INTAKE_CONTRACT_001`

Decision:

- Add the smallest manual evidence-intake contract for `HUMAN_PROVIDED` and `EXTERNAL_CHECKED`.
- Required fields: evidence_id, evidence_level, source_type, source_label, source_date, captured_by, summary, confidence, limitations, approval_required, authority, review_status.
- Manual intake only. Missing fields become UNKNOWN or PENDING. Do not invent metadata. Do not silently upgrade confidence.
- HUMAN_PROVIDED sample cannot become production evidence. HUMAN_PROVIDED production requires complete intake metadata.
- EXTERNAL_CHECKED means a human-authorized manual named record already held in Wings, with source metadata. It is not automated checking, live web search, RADAR, or MARKET_MONITORING.
- Keep `MARKET_CHECK_RUNTIME_COMPLETE=NO`. This slice does not create a capture form, monitoring, Ring3, or child mutation.
- C1 English coaching remains user-specific collaboration continuity only; it is not a product ring.

Spec: `PORTFOLIO.ARCHITECTURE/WINGS4.MARKET_CHECK.RUNTIME.SPEC.md`
Prototype: `PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/`

## DEC-W4-069 — Market Check intake badge scoped and live UI recorded

Status: EVIDENCE_RECORDED
Date: 2026-08-15
Scope: BADGE_FIX_AND_LIVE_UI_RECORD; authorization `W4_MARKET_CHECK_INTAKE_BADGE_FIX_RECORD_AND_PUSH_004`

Recorded evidence:

- WINGS_HELD / default alternatives no longer show “Valid manual intake”.
- HUMAN_PROVIDED still shows sample/not production, pending intake, or valid manual intake with source metadata.
- EXTERNAL_CHECKED still shows pending/manual no-live-scan or valid manual external metadata.
- UNKNOWN/PENDING handling remains available (F-SM-002 / MCQ-BUILD_VS_ADOPT).
- Live UI validation PASS via Cursor browser MCP at `http://127.0.0.1:8786/`.
- LOGICAL_TESTS=PASS; CASES=30
- MARKET_CHECK_RUNTIME_COMPLETE=NO
- NOT_MARKET_MONITORING=YES
- NOT_RADAR=YES
- NOT_RING3=YES

This decision does not authorize a capture form, live web search, monitoring, Ring3, RADAR, child mutation, MD1 reopening, or force push.

## DEC-W4-070 — Market Check completion decision gate

Status: HUMAN_DECISION_PENDING
Date: 2026-08-16
Scope: RECORD_ONLY_DECISION_PACKET; authorization `W4_MARKET_CHECK_COMPLETION_DECISION_PACKET_008`
Runtime HEAD at packet: `f59f06a8269431c1820825f58c20d9ff01038686`

This packet does not choose for Pablo. It does not set `MARKET_CHECK_RUNTIME_COMPLETE=YES`. It does not mutate product code, UI, fixture, or tests. It does not authorize a capture form, live web search, MARKET_MONITORING, RADAR, Ring3, child-project mutation, or MD1 reopening.

Contradiction extracted (`W4_MARKET_CHECK_COMPLETION_READINESS_AUDIT_007`):

- Numbered completion criteria 1–7 in `WINGS4.MARKET_CHECK.RUNTIME.SPEC.md` are largely evidenced (on-demand invoke; evidence levels visible; required result fields; option-set coverage as winner or alternative; UNKNOWN when evidence is missing; live UI for invoke, UNKNOWN, BUILD, and INTEGRATE; no child-repository access or live web scan).
- Spec remaining-reasons still block `MARKET_CHECK_RUNTIME_COMPLETE=YES`.
- Fixture `runtime_complete=false` is enforced by logical tests MC-13/MC-20/MC-29 and by `app.js` `validateFixture`.
- `HUMAN_PROVIDED` and `EXTERNAL_CHECKED` production examples are fixture-held manual-contract records, not operator-captured production intake. Sample notes still cannot become production.
- No human authorization exists to flip COMPLETE.

Pablo decides among exactly these options:

### Option A — BOUNDED_COMPLETE_ACCEPTED

Treat fixture-held `HUMAN_PROVIDED` and `EXTERNAL_CHECKED` production examples as sufficient for this bounded Ring0 Market Check runtime. Authorize a later coordinated flag/test/fixture/spec update.

- Risk: later readers may treat fixture examples as operator production intake.
- Required next mutation if selected: coordinated update of fixture `runtime_complete`, logical tests that currently assert false, `validateFixture`, spec remaining-reasons, and state/acceptance records. Not authorized by this packet.

### Option B — OPERATOR_INTAKE_REQUIRED

Require a minimal manual operator evidence-intake path before completion. Do not flip COMPLETE.

- Risk: the path can become a capture desk; live web search and monitoring must remain forbidden.
- Required next mutation if selected: a separate design authorization. Selecting B does not automatically authorize a capture form.

### Option C — DEFER_COMPLETE_AND_MOVE_ON

Keep `MARKET_CHECK_RUNTIME_COMPLETE=NO` and move to the next Wings4 product minibattle.

- Risk: the complete-claim remains unresolved while other product work proceeds.
- Required next mutation if selected: none for the Market Check complete flag. A separate product minibattle must be chosen.

Current status remains `MARKET_CHECK_RUNTIME_COMPLETE=NO`. If Option A is later selected, a separate coordinated mutation is required.

Selection recorded in DEC-W4-071. Historical packet body preserved.

Spec: `PORTFOLIO.ARCHITECTURE/WINGS4.MARKET_CHECK.RUNTIME.SPEC.md`
Prototype: `PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/`
Audit: `W4_MARKET_CHECK_COMPLETION_READINESS_AUDIT_007`

## DEC-W4-071 — Bounded Market Check runtime completion accepted

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-16
Scope: BOUNDED_RING0_MARKET_CHECK_RUNTIME_DEMO_ONLY; authorization `W4_MARKET_CHECK_BOUNDED_COMPLETE_ACCEPTANCE_009`
Human decision: Pablo selects DEC-W4-070 Option A: BOUNDED_COMPLETE_ACCEPTED

Decision:

- Fixture-held `HUMAN_PROVIDED` and `EXTERNAL_CHECKED` production examples are accepted as sufficient for this bounded Ring0 Market Check runtime/demo slice.
- Set `MARKET_CHECK_RUNTIME_COMPLETE=YES` for that bounded slice only.
- This does not authorize a capture form.
- This does not authorize live web search, MARKET_MONITORING, RADAR, Ring3, or child-project mutation.
- This does not generalize to future production systems or operator-captured production intake.
- Future production evidence rules remain separate.
- Sample `HUMAN_PROVIDED` notes still cannot become production. Incomplete intake remains PENDING/UNKNOWN. `EXTERNAL_CHECKED` live-scan methods remain invalid.
- MD1 is not reopened.

Required coordinated mutation (authorized here): fixture `runtime_complete=true`; logical tests that previously asserted false; `app.js` fixture validator; spec/BATON/backlog/acceptance/README status. Product Market Check run behavior is unchanged.

Spec: `PORTFOLIO.ARCHITECTURE/WINGS4.MARKET_CHECK.RUNTIME.SPEC.md`
Prototype: `PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/`

## DEC-W4-072 — Bounded Market Check complete live UI validation recorded

Status: EVIDENCE_RECORDED
Date: 2026-08-16
Scope: RECORD_ONLY; authorization `W4_MARKET_CHECK_BOUNDED_COMPLETE_LIVE_UI_RECORD_011`
Runtime HEAD: `ad53a94e32a282f537ced8f7ba9754a4003659dc`
Source validation: `W4_MARKET_CHECK_BOUNDED_COMPLETE_LIVE_UI_VALIDATION_010`

Recorded evidence:

- TASK_ID=W4_MARKET_CHECK_BOUNDED_COMPLETE_LIVE_UI_VALIDATION_010
- STATUS=PASS
- LOGICAL_TESTS=PASS; CASES=31
- UI_VALIDATION_METHOD=CURSOR_BROWSER_MCP
- SERVER_URL=http://127.0.0.1:8787/
- BROWSER_STORAGE_CLEARED=YES
- MARKET_CHECK_AUTO_RUN=NO
- MARKET_CHECK_CALLABLE_ON_DEMAND=YES
- F-SM-001_USE_EXISTING_VALIDATED=YES
- F-MC-001_BUILD_VALIDATED=YES
- F-MC-002_INTEGRATE_VALIDATED=YES
- F-SM-002_UNKNOWN_VALIDATED=YES
- HUMAN_PROVIDED_DISPLAY_VALIDATED=YES
- EXTERNAL_CHECKED_DISPLAY_VALIDATED=YES
- WINGS_HELD_MANUAL_BADGE_ABSENT=YES
- ALTERNATIVES_BEFORE_RECOMMENDATION=YES
- AUTHORITY_VISIBLE=YES
- SCOPE_LIMITS_VISIBLE=YES
- CAPTURE_FORM_PRESENT=NO
- LIVE_WEB_TRIGGERED=NO
- CHILD_PROJECT_MUTATION=NO
- NOT_MARKET_MONITORING=YES
- NOT_RADAR=YES
- NOT_RING3=YES
- MARKET_CHECK_RUNTIME_COMPLETE=YES (BOUNDED_RING0_RUNTIME_DEMO; DEC-W4-071)
- MARKET_CHECK_RUNTIME_COMPLETE_DISPLAY=NOT_VISIBLE
- MD1_REOPENED=NO
- AI_HISTORY_INSPECTED=NO
- PRODUCT_BEHAVIOR_CHANGED=NO

This record does not rewrite DEC-W4-071. Product Market Check run behavior is unchanged. The live UI has no dedicated `MARKET_CHECK_RUNTIME_COMPLETE=YES` badge. Status is coherent because the fixture loads, Market Check is ready, and nothing displays incomplete.

Known limitations:

- No dedicated `MARKET_CHECK_RUNTIME_COMPLETE=YES` badge is visible in the UI.
- Bounded completion remains Ring0 demo only.
- This must not be generalized into Wings4 product completion, operator production intake, market monitoring, RADAR, or Ring3 readiness.
- Evidence remains fixture/Wings-held only.
- This is bounded live UI validation, not live market intelligence.

This decision does not authorize a UI badge, capture form, live web search, MARKET_MONITORING, RADAR, Ring3, child-project mutation, MD1 reopening, or force push. Next product minibattle remains a human decision.

Spec: `PORTFOLIO.ARCHITECTURE/WINGS4.MARKET_CHECK.RUNTIME.SPEC.md`
Prototype: `PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/`

## DEC-W4-073 — Bounded operator UX friction cleanup (GAP_01, GAP_02)

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-16
Scope: BOUNDED_OPERATOR_UX_FRICTION_CLEANUP_ONLY; authorization `W4_BOUNDED_OPERATOR_UX_FRICTION_CLEANUP_013`
Human decision: W4_NEXT_PRODUCT_MINIBATTLE_SELECTION_AUDIT_012 recommended option A

Decision:

- Address GAP_01: workflow stage markers are status only, not navigation. They must not look or behave like clickable tabs.
- Address GAP_02: Path and Limit remain visible without opening About this view, and remain visible at the selected-finding decision moment.
- This is an additive post-MD1 operator UX slice. It does not reopen MD1.
- Do not rewrite the historical GAP_01/GAP_02 list in DEC-W4-062.
- No capture form, live web search, MARKET_MONITORING, RADAR, Ring3, independent resynchronization, or child-project mutation.

Prototype: `PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/`

## DEC-W4-074 — Bounded GAP_03 fact-fallback and class-help microcopy

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-16
Scope: BOUNDED_GAP_03_FACT_INFERENCE_MICROCOPY_ONLY; authorization `W4_GAP_03_BOUNDED_FACT_INFERENCE_MICROCOPY_016`
Human decision: W4_GAP_03_OPERATOR_LANGUAGE_DECISION_AUDIT_015 recommended option A

Decision:

- Address the fact-fallback part of GAP_03: F-SM-002, F-SM-003, and F-SM-004 must have explicit operator Fact and Inference. Fact must not fall back to a raw evidence excerpt.
- Add help chips for OMISSION, OPPORTUNITY, and DISCREPANCY. Keep existing DUPLICATION and INTERFERENCE help.
- Do not remap finding_class codes. Do not rename WHOAMI, HUMAN, or ORCHESTRATOR. Remaining class-code and WHOAMI operator-noun jargon stays deferred under DEC-W4-055.
- BATON label `GAP_03_JARGON_REWRITE` does not authorize a broad jargon rewrite.
- This is an additive post-MD1 operator copy slice. It does not reopen MD1. Do not rewrite the historical GAP_03 list in DEC-W4-062.
- Market Check bounded complete remains YES. Market Check decision logic, questions, winners, intake badges, recommendations, alternatives, and catalog are unchanged.
- No capture form, live web search, MARKET_MONITORING, RADAR, Ring3, independent resynchronization, or child-project mutation.

Prototype: `PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/`

## DEC-W4-075 — Bounded GAP_04 manual package-transfer help

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-16
Scope: BOUNDED_GAP_04_TRANSFER_HELP_ONLY; authorization `W4_GAP_04_BOUNDED_TRANSFER_HELP_018`
Human decision: W4_GAP_04_MANUAL_PACKAGE_TRANSFER_DECISION_AUDIT_017 recommended option A

Decision:

- Address the operator-help part of GAP_04: the Act panel must state that Wings prepares the intervention package but does not send it. The human must copy or download the package and give it to the destination project authority. Return evidence is pasted in Verification.
- Replace header wording that said “send a controlled request” so it does not imply automatic delivery.
- Keep destination role label as Project authority.
- Do not change COPY PACKAGE lifecycle. COPY must not set PACKAGE_EXPORTED or IN_ACTION.
- Do not change DOWNLOAD INTERVENTION PACKAGE identity, canonical text, or export/IN_ACTION behavior.
- Do not mention Temp.SkillMachine, a Cursor session, or any required folder procedure as the transfer method.
- This is an additive post-MD1 operator copy slice. It does not reopen MD1. Do not rewrite the historical GAP_04 list in DEC-W4-062.
- Manual package transfer remains the approved v0.1 model. This slice does not authorize auto-delivery, temp-path write, live product-to-product integration, or child-project mutation.
- Market Check bounded complete remains YES. Market Check decision logic, questions, winners, intake badges, recommendations, alternatives, and catalog are unchanged.
- No capture form, live web search, MARKET_MONITORING, RADAR, Ring3, independent resynchronization, or child-project mutation.

Prototype: `PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/`

## DEC-W4-076 — GAP_05 evidence-source decision gate

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-16
Scope: RECORD_ONLY_DECISION_PACKET; authorization `W4_GAP_05_EVIDENCE_SOURCE_DECISION_PACKET_022`; selection `W4_GAP_05_OPTION_A_RECORD_COMMIT_AND_PUSH_023`
Runtime HEAD at packet: `54704c7ecf3bb693a392ca993d5cfcd8fcc0f6d9`
Human decision: Pablo selects DEC-W4-076 Option A: ACCEPT_FIXTURE_HELD_AS_DURABLE_MD1_LIMIT

Historical packet body preserved below. This update records the selection. It does not rewrite the historical GAP_05 list in DEC-W4-062. It does not authorize live child-repository read. It does not mutate product code, UI, fixture, tests, README, or acceptance.

Contradiction extracted (`W4_POST_GAP04_NEXT_SCOPE_SELECTION_AUDIT_021`):

- GAP_05 means the bounded Ring0 demo diagnoses SkillsMachine from fixture or Wings-held evidence. It does not open, read, or watch the live child repository `C:\01. GitHub\Skills`. DEC-W4-062 recorded this as an accepted non-blocking MD1 limitation: `FIXTURE_OR_WINGS_HELD_EVIDENCE_NOT_LIVE_CHILD_REPOSITORY_READ`.
- Live child-repository read is currently forbidden. DEC-W4-049 authorized Ring0 only with Wings4-held evidence or clearly marked noncanonical representatives and does not permit Wings4 to read or mutate `C:\01. GitHub\Skills` during Ring0 prototype construction. The Ring0 footer states: evidence is Wings-held; Wings does not read or write that path. The fixture note states: no direct read of that path; records are grounded in Wings4-held evidence or explicitly marked representative.
- The legal evidence model inside the bounded Ring0 demo is therefore fixture JSON plus Wings4-local pointers (`CANONICAL_DERIVED` or representative). Market Check in this slice is also fixture/Wings-held only. Ring2 verifies returned evidence; it is not a live child-state read and not independent resynchronization.
- BATON still names `NEXT_CANDIDATE_1=GAP_05_FIXTURE_OR_WINGS_HELD_EVIDENCE_NOT_LIVE_CHILD_REPOSITORY_READ` after GAP_04 help closed. Closing GAP_05 by implementing a live git read would contradict DEC-W4-049. No human authorization exists to live-read the child repository.

Pablo decided among exactly these options:

### Option A — ACCEPT_FIXTURE_HELD_AS_DURABLE_MD1_LIMIT

Keep GAP_05 as an accepted fixture/Wings-held limitation for bounded MD1. No child read. No implementation.

- Risk: later readers may treat the Ring0 demo as live child-repository intelligence.
- Required next mutation if selected: record-only status that GAP_05 remains an accepted limitation. Authorized by `W4_GAP_05_OPTION_A_RECORD_COMMIT_AND_PUSH_023`.

### Option B — AUTHORIZE_LATER_BOUNDED_METADATA_DESIGN_ONLY

Do not read the child repo now. A later design may define a Wings-held metadata refresh model that is still not live git read, not mutation, not Ring3, and not monitoring.

- Risk: “metadata refresh” can be misread as live child access or Ring3. The later design must stay Wings-held and non-mutating.
- Required next mutation if selected: a separate design authorization. Selecting B does not authorize reading `C:\01. GitHub\Skills`.

### Option C — DEFER_GAP_05_AND_CHOOSE_ANOTHER_SLICE

Leave GAP_05 open. Next slice is not GAP_05 implementation.

- Risk: the last MD1 non-blocking gap stays unresolved while other product work proceeds.
- Required next mutation if selected: none for GAP_05. A separate product minibattle must be chosen.

Decision:

- Pablo selected Option A: ACCEPT_FIXTURE_HELD_AS_DURABLE_MD1_LIMIT.
- GAP_05 is accepted as a bounded Ring0 fixture/Wings-held evidence-source limitation.
- Live child-repository read remains unauthorized.
- `C:\01. GitHub\Skills` was not read.
- GAP_05 is not a product implementation task in this slice.
- Market Check bounded runtime remains YES for the bounded Ring0 demo only.
- MD1 remains closed.
- This does not authorize Ring3, RADAR, MARKET_MONITORING, live web search, capture form, auto-delivery, temp-path write, COPY lifecycle change, or child-project mutation.

Current status: `GAP_05=ACCEPTED_LIMITATION_FOR_RING0`. Live child-repository read remains unauthorized.

Audit: `W4_POST_GAP04_NEXT_SCOPE_SELECTION_AUDIT_021`
Prototype: `PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/`

## DEC-W4-077 — First post-MD1 product increment decision gate

Status: APPROVED_HUMAN_DIRECTION
Date: 2026-08-16
Scope: RECORD_ONLY_DECISION_PACKET; authorization `W4_POST_MD1_NEXT_PRODUCT_SLICE_DECISION_PACKET_025`; selection `W4_DEC_077_OPTION_B_RECORD_COMMIT_AND_PUSH_026`
Runtime HEAD at packet: `facf8aee4b485a6c2fb2877ecdd4104decc22bf7`
Human decision: Pablo selects DEC-W4-077 Option B: AUTHORIZE_BOUNDED_PUSH_FIRST_BRIEFING_DESIGN_ONLY

Historical packet body preserved below. This update records the selection. It does not rewrite the historical GAP_01–GAP_05 list in DEC-W4-062. It does not authorize briefing runtime, MARKET_MONITORING, RADAR, live web, Ring3, child-repository read, or product mutation.

This packet does not choose for Pablo. It does not implement a product slice. It does not mutate product code, UI, fixture, tests, README, or acceptance. It does not authorize a capture form, live web search, MARKET_MONITORING, RADAR, Ring3, auto-delivery, temp-path write, COPY lifecycle change, child-repository read, child-project mutation, or MD1 reopening.

Context confirmed (`W4_POST_MD1_GAP_CLOSURE_NEXT_SLICE_AUDIT_024`):

- GAP_01 and GAP_02 are addressed additively by DEC-W4-073 (stage markers are status, not navigation; Path and Limit remain visible without opening About).
- GAP_03 is addressed for fact fallback and class help by DEC-W4-074. Remaining WHOAMI/HUMAN/ORCHESTRATOR and `finding_class` overlay stays deferred under DEC-W4-055 and is a separate terminology decision, not this packet’s implementation.
- GAP_04 is addressed for manual transfer help by DEC-W4-075. COPY-as-export versus clipboard-only remains a separate workflow decision. COPY lifecycle is unchanged.
- GAP_05 is accepted as a bounded Ring0 fixture/Wings-held evidence-source limitation by DEC-W4-076 Option A (`ACCEPTED_LIMITATION_FOR_RING0`). GAP_05 must not be reopened as implementation. Live child-repository read remains unauthorized.
- MD1 remains closed. Historical GAP_01–GAP_05 list in DEC-W4-062 is not rewritten.
- Market Check bounded runtime remains YES for the bounded Ring0 runtime/demo only and must not be generalized into full Wings4 completion.
- `C:\01. GitHub\Skills` was not read.

Pablo decided among exactly these options:

### Option A — AUTHORIZE_BOUNDED_SECOND_ENTITY_DIAGNOSTIC_DESIGN_ONLY

Design-only extension of Ring0 diagnosis to another Wings-held portfolio entity. No live child-repository read. No second-product implementation in this packet.

- Risk: “second entity” can be misread as live child-repository access, a second product surface, or Ring4 combined analysis.
- Required next mutation if selected: a separate design authorization. Selecting A does not authorize reading `C:\01. GitHub\Skills` or mutating any child project.

### Option B — AUTHORIZE_BOUNDED_PUSH_FIRST_BRIEFING_DESIGN_ONLY

Design-only bounded “what changed / what needs a decision” briefing. Not MARKET_MONITORING, not RADAR, not live web.

- Risk: “what changed” can be misread as continuous monitoring, RADAR, or live web scanning.
- Required next mutation if selected: record-only status that the next slice is bounded push-first briefing design-only. Authorized by `W4_DEC_077_OPTION_B_RECORD_COMMIT_AND_PUSH_026`. Runtime implementation is not authorized by this selection.

### Option C — DEFER_NEW_INCREMENT_AND_REFRESH_CANON_CONTINUITY

No new product increment. Later authorized work may align README/spec/SESSION_CONTINUE with GAP_05 accepted limitation and current HEAD. Not a jargon rewrite.

- Risk: canon lag (README/spec/SESSION_CONTINUE still describing GAP_01–GAP_05 as open) continues until a later authorized refresh.
- Required next mutation if selected: a separate continuity/canon alignment authorization. Selecting C does not authorize a terminology rewrite, COPY lifecycle change, or product implementation.

Decision:

- Pablo selected Option B: AUTHORIZE_BOUNDED_PUSH_FIRST_BRIEFING_DESIGN_ONLY.
- Next slice is bounded push-first briefing design-only.
- This does not authorize briefing runtime implementation.
- This is not MARKET_MONITORING, not RADAR, not live web, and not Ring3.
- The briefing must summarize Wings-held state and decisions only.
- It must not read or mutate child repositories.
- MD1 remains closed.
- GAP_01–GAP_04 remain addressed (DEC-W4-073, DEC-W4-074, DEC-W4-075).
- GAP_05 remains `ACCEPTED_LIMITATION_FOR_RING0` (DEC-W4-076 Option A).
- WHOAMI/`finding_class` overlay, COPY-as-export lifecycle, SESSION_CONTINUE/canon refresh, and second-entity diagnostic remain separate later decisions.
- This does not authorize a capture form, auto-delivery, temp-path write, or COPY lifecycle change.

Current status: `NEXT_SLICE=BOUNDED_PUSH_FIRST_BRIEFING_DESIGN_ONLY`. Runtime implementation remains unauthorized.

Audit: `W4_POST_MD1_GAP_CLOSURE_NEXT_SLICE_AUDIT_024`
Prototype: `PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/`
