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
