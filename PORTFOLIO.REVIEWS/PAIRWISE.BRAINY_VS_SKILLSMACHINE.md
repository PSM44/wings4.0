# Pairwise Review — Brainy vs PS.SkillsMachine

STATUS: HUMAN_DECISION_COMPLETE_IMPLEMENTATION_PENDING
SUPERSEDED_DRAFT_STATUS: DRAFT_PENDING_HUMAN_APPROVAL (historical)
DECISION_REF: DEC-W4-035
RECONCILED_AT: 2026-08-04
MINIBATTLE: PILOT-002 (first evidence-traceable pairwise review)
GENERATED_BY: Wings4.0
GENERATED_AT: 2026-07-30

Both projects are named as the pilot targets in `PORTFOLIO.CONTRACTS/WINGS4.COORD.CONTRACT.md` section 10, but no pairwise comparison between them existed before this review.

## 01. Reviewed entities

- Brainy — `C:\01. GitHub\Brainy` (git: `main` @ `a3e4073828655bc6c9955a865a5c691c4cf043cd`, worktree CLEAN)
- PS.SkillsMachine — `C:\01. GitHub\Skills` (git: `main` @ `df7e9d18293503ec03ed0bbee51d8fec86941f35`, worktree has 1 pending change — evidence caveat, see section 07)

## 02. Facts (from each project's own canonical HUMAN)

| Dimension | Brainy | PS.SkillsMachine |
|---|---|---|
| Primary user | Pablo directly, daily | Any AI/agent operating across the portfolio |
| Primary outcome | Personal continuity, focus, recall, prioritization | Reusable, governed Skills/GRC canon consumed by other projects |
| Canon format | Structured Markdown, numbered `HUMAN_00xx` files | Terse `KEY=VALUE`/narrative `.txt`, hierarchy `HUMAN > GRC > SKILLS > USECASES > TOOLS` |
| Core discipline | "Reduce cognitive load, not increase it"; MVP/minibattle-gated; explicitly names "overengineering too early" as Risk 01 | "Usecase-first focus gate" before any technical work; explicit anti-patterns list including "crear microSkills o microGRC sin... aprobación humana" |
| Existing engineering hygiene | Filesystem/HUMAN/BATON bootstrap only (pre-MVP) | Already has a working local Git pre-commit hook and a naming-validation script (`SyS/A_Tools/Validation/Install-PreCommitHook.ps1`, `Validate-SkillMachineNaming.ps1`) |

## 03. Overlap assessment (per `PORTFOLIO.PRINCIPLES.md` #8 criteria: problem, user, outcome, capability, canon, roadmap)

- Problem solved: DIFFERENT (personal cognitive continuity vs. portfolio-wide reusable capability governance).
- Primary user: DIFFERENT (Pablo directly vs. the ecosystem of AI agents/projects).
- Primary outcome: DIFFERENT.
- Canon/authority model: SAME PATTERN, independently developed (both declare "HUMAN decides, IA proposes" and both already use the word "minibattle" for bounded units of work — this is portfolio-wide convergent convention, not evidence of duplication).
- **Capability-name collision (real finding):** Brainy's `HUMAN_0002` section 10 names an internal "Skill layer" (procedural/continuity heuristics, local to Brainy). PS.SkillsMachine's entire purpose is to be the canonical, portfolio-wide "Skills" library. Nothing in either HUMAN currently states that Brainy's Skill layer is out of scope for SkillsMachine's canon, or vice versa.

Conclusion: **NOT a duplication candidate at the project level.** Both are legitimately independent per `PORTFOLIO.PRINCIPLES.md` #3–#5. There is one real, narrow, evidence-based ambiguity (the "Skill" term), not a project-level conflict.

## 04. Conflict registered

`PORTFOLIO.CONFLICT_REGISTER.md` PC-012 — see that file for the formal entry. Severity: LOW (no incident yet), Confidence: MEDIUM (plausible future drift, not yet observed duplication).

## 05. Wings4.0 boundary (per `HUMAN/HUMAN.WINGS4.md` section 4)

Wings4.0 may: detect the naming overlap, present it, recommend a disambiguating clarification, and record whatever Pablo decides.

Wings4.0 must not: rename Brainy's Skill layer, edit SkillsMachine's canon, or decide unilaterally which project "owns" the word Skill.

## 06. Recommendation (Wings4.0 → Pablo)

Add one clarifying sentence to Brainy's `HUMAN_0002` (or an equivalent boundary note) stating that Brainy's Skill layer is personal/local operational heuristics, not a reusable capability canon, and that anything intended for reuse beyond Brainy should be proposed to PS.SkillsMachine instead. See the draft intervention prompt (PILOT-003) for the exact proposed change, pending approval.

Separately, and independent of this specific conflict: PS.SkillsMachine's existing pre-commit hook / naming-validator pattern is concrete, reusable evidence that Wings4.0's own tooling (see `WINGS4_GOV_016` reassessment) does not need to keep reinventing bespoke one-off PowerShell scripts — a sibling project in the same portfolio already solved an adjacent problem the reusable way.

## 07. Evidence caveats

- PS.SkillsMachine's worktree had 1 pending change at assimilation time; this review did not inspect its content (out of scope — read-only identity check only). It does not affect the purpose/overlap conclusion above, which is based on committed canonical HUMAN files.
- This review does not evaluate SkillsMachine's actual Skill/GRC catalog content (`00.CATALOG`, `SkillsLake`, `GRCLake`) in depth — only its declared HUMAN purpose and hierarchy. A deeper capability-level review is a separate, larger minibattle if Pablo wants it.

## 08. Human decision

STATUS: COMPLETED
DECISION: APPROVE_WITH_CHANGES (recorded in DEC-W4-035)
HISTORICAL_CHECKBOX_STATE: PENDING (superseded; do not re-open as undecided)
IMPLEMENTATION_STATUS: PENDING_BRAINY_LOCAL_EXECUTION_AND_WINGS4_RESYNC
NOTE: This review artifact remains historical evidence. Current conflict tracking is PC-012 in PORTFOLIO.CONFLICT_REGISTER.md.
