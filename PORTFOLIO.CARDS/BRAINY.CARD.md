# Portfolio Card — Brainy

STATUS: APPROVED_WITH_AMENDMENTS
CARD_ID: CARD-BRAINY-001
GENERATED_BY: Wings4.0
GENERATED_AT: 2026-07-30
MINIBATTLE: PILOT-001 (first active-project assimilation)

This is the first evidence-traceable portfolio card produced by Wings4.0, closing the gap identified in `HUMAN/HUMAN.AUDIT.md` ("Required next validation", item 2) and `TECH_DEBT.md` (TD-015). It is a draft interpretation for Pablo's review, not a final or self-approved record — no card is canonical until explicitly approved per `HUMAN/HUMAN.WINGS4.md` section 3.

## 01. Identity (fact)

- Name: Brainy
- Canonical root: `C:\01. GitHub\Brainy`
- Entity type: independent product/system (confirmed independent under `WINGS4_GOV_014A` thick-boundary review)
- Git identity at assimilation time:
  - `rev-parse --show-toplevel` = `C:/01. GitHub/Brainy`
  - branch = `main`
  - HEAD = `a3e4073828655bc6c9955a865a5c691c4cf043cd`
  - worktree = CLEAN (0 pending changes)
  - last commit date = 2026-07-19 12:49:25 -0400
- HEAD matches the commit already recorded in `PORTFOLIO.DECISION_LOG.md` (`DEC-W4-PAIR-005`) as the validated result of `WINGS4_GOV_009`. No drift since that decision.
- Canonical HUMAN source read: `92_HUMAN/HUMAN_BRAINY_README.md`, `HUMAN_0001_BRAINY_OVERVIEW.md`, `HUMAN_0002_BRAINY_OPERATING_MODEL.md`, `HUMAN_0007_BRAINY_MVP_AND_MINIBATTLES.md`, and root `README.md`.

## 02. Purpose (fact, as declared by Brainy's own HUMAN)

Brainy is a cognitive-operational continuity system for Pablo: capture, recall, prioritization, and operational awareness across personal, academic, professional, and work fronts. Its stated primary goal is "MAINTAIN CONTINUITY." It explicitly promotes mature ideas into HIA rather than executing projects itself.

Brainy's own canon explicitly disclaims being a dashboard, ERP, ticketing system, or "high-maintenance bureaucracy," and names "Overengineering too early" as its own Risk 01 (`HUMAN_0007`, section 12).

## 03. What Brainy owns (fact)

- Personal capture/continuity workflow (Daily Brief, Where You Left Off, Waiting For, Risks & Drift, Collab, Quick Capture, Raw Ideas).
- A `Skill layer` described as a "procedural learning layer" storing Pablo's/Brainy's own operational patterns and continuity heuristics (`HUMAN_0002`, section 10). See section 06 below — this is flagged, not resolved.
- The Brainy→HIA promotion path (idea maturation).

## 04. What Brainy does not own (fact, per its own HUMAN)

- Project execution, delivery, or lifecycle governance (explicitly HIA's job).
- Reusable, portfolio-wide Skill/GRC canon (not claimed anywhere in Brainy's HUMAN).

## 05. Interpretation (Wings4.0, confidence: HIGH)

- Brainy is materially healthier, in doctrine, than Wings4.0's current practice: it has an explicit anti-bureaucracy design rule and names overengineering as its top risk, while still shipping MVP phases (MB-001, MB-002 COMPLETED; MB-002.1 ACTIVE). This is worth Wings4.0 learning from, not just governing.
- Brainy's HUMAN documentation is more internally consistent and current (dated MVP phase tracking, explicit STATUS per minibattle) than Wings4.0's own `BATON` was found to be during this same pilot (see `PORTFOLIO.DECISION_LOG.md` DEC-W4-032).

## 06. Flagged ambiguity (interpretation, confidence: MEDIUM — routed to `PORTFOLIO.CONFLICT_REGISTER.md` as PC-012)

Brainy's "Skill layer" (`HUMAN_0002`, section 10: "procedural learning layer... operational patterns, useful assistance methods, prioritization behavior, continuity heuristics") uses the word "Skill" for a concept that is not the same as PS.SkillsMachine's canonical, portfolio-wide reusable Skills/GRC library, but nothing in either project's HUMAN currently disambiguates the two, and nothing prevents Brainy's Skill layer from organically growing into a second, parallel capability canon. See `PORTFOLIO.REVIEWS/PAIRWISE.BRAINY_VS_SKILLSMACHINE.md` (PILOT-002) for the full comparison.

## 07. Relationships (fact + interpretation)

- Brainy ↔ HIA: declared, asymmetric, non-overlapping (Brainy incubates, HIA executes). No conflict found.
- Brainy ↔ PS.HermesObsidianIntegration: previously resolved (`DEC-W4-PAIR-001` through `DEC-W4-PAIR-006`); Brainy is durable purpose owner, Hermes is FROZEN_ARCHIVE. Unchanged by this card.
- Brainy ↔ PS.SkillsMachine: no prior formal review existed before this pilot. See PILOT-002 pairwise review for first evidence-based comparison.

## 08. Confidence and evidence caveats

- Confidence on purpose/ownership facts: HIGH (directly sourced from Brainy's own canonical HUMAN files, not inferred).
- Confidence on the Skill-layer ambiguity being a real future risk (vs. harmless naming coincidence): MEDIUM — it has not yet caused a duplication incident; it is a preventable-if-flagged-now risk.
- This card does not evaluate Brainy's UX/UI, technology stack choices, or MVP execution quality — out of scope for a portfolio card per `HUMAN/HUMAN.STANDARD.v1.md`.

## 09. Recommendation (Wings4.0 → Pablo)

1. Approve, amend, or reject this card as the first canonical portfolio card.
2. Decide on PC-012 (see conflict register and PILOT-002 pairwise review): should Brainy's Skill layer explicitly declare itself as personal/local-only and non-canonical for reuse, deferring any reusable capability to PS.SkillsMachine?
3. No modification to Brainy is authorized by this card. Any resulting change is proposed separately in `PORTFOLIO.REVIEWS/PILOT_INTERVENTION_PROMPT_DRAFT.BRAINY_SKILL_LAYER.md` (PILOT-003), pending approval.

## 10. Human decision
STATUS: APPROVED_WITH_AMENDMENTS
DECISION: APPROVED_WITH_AMENDMENTS (pending Brainy local application under Brainy governance; Wings4.0 did NOT modify Brainy)

## 11. Approved amendments (normative wording)
The following normative wording is recorded as part of the APPROVED_WITH_AMENDMENTS decision. Brainy will apply the corresponding clarification locally under its own governance and report back to Wings4.0 with resynchronization evidence. Wings4.0 does not modify Brainy directly.

- Terminology: where the term 'Skill layer' appears in Brainy's documentation or in Wings4.0 descriptions, interpret it as "Brainy-local procedural heuristics (no-canonical)". This usage does NOT imply ownership or canonization of Skills/GRC at the portfolio level.

- Ownership declarations (approved-with-amendments):
  - Brainy owns durable personal and work memory.
  - Brainy owns memory-specific capabilities and operations.
  - Brainy owns project-local adapters, prompts and workflows required for Brainy operation.
  - Brainy may propose candidates for reusable capabilities; such candidates do NOT become portfolio canon by default and require explicit evaluation and promotion by PS.SkillsMachine.

- SkillsMachine ownership (approved):
  - PS.SkillsMachine owns reusable Skills, GRCs, templates, validators and governed reusable patterns.
  - PS.SkillsMachine is responsible for evaluation, versioning and promotion of reusable candidates.

- Clarifications (mandatory):
  - Brainy DOES NOT own the portfolio-level reusable Skills/GRC canon.
  - PS.SkillsMachine DOES NOT own Brainy's product, memory data, or local implementation.
  - No code transfer, repository mutation, architecture redesign, commit or push is authorized as part of this approval.
