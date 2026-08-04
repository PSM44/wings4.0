# HUMAN Q&A

| ID | Question | Current answer | Status | Affected sections |
|---|---|---|---|---|
| Q-001 | Should Wings3.0 be transformed in place? | No. Wings4.0 is the new governance canon; Wings3.0 remains a legacy source estate. | DECIDED | HUMAN.WINGS4 / Legacy relation |
| Q-002 | Are projects moved immediately? | No. Governance migration precedes physical migration. | DECIDED | Legacy assimilation |
| Q-003 | Is WHOAMI mandatory? | No. Stable identity belongs in HUMAN; dynamic continuity belongs in BATON. | DECIDED | HUMAN Standard |
| Q-004 | Does Wings4.0 control project HUMAN files? | No. It listens to, interprets, consolidates, and compares them. | DECIDED | Authority model |
| Q-005 | Who makes final portfolio decisions? | Pablo is the final decision authority. | DECIDED | Human interaction / Authority |
| Q-006 | Does Wings4.0 directly modify another project? | No. A separate approved intervention is required. | DECIDED | Authority model |
| Q-007 | How are portfolio decisions implemented? | Wings4.0 prepares focalized prompts for each affected project after Pablo approves the decision. | DECIDED | Operating cycle |
| Q-008 | How is synchronization verified? | Wings4.0 listens again to the updated project HUMAN and verifies whether the approved conflict or boundary issue was resolved. | DECIDED | Operating cycle |
| Q-009 | Must all projects integrate? | No. `UNRELATED` is a valid portfolio relationship when integration is not natural or valuable. | DECIDED | Project independence |
| Q-010 | Must every entity be completely standalone? | Principal products and systems should be independently operable; modules, adapters, plugins, Skills, and GRCs may have declared hosts or consumers. | DECIDED | Project independence |
| Q-011 | When should consolidation be evaluated? | When projects materially overlap in problem, user, outcome, capabilities, canon, or responsibility. | DECIDED | Duplication and consolidation |
| Q-012 | Does an existing open-source solution automatically eliminate a project? | No. It triggers a build/adopt/extend/integrate/retire review. | DECIDED | Build/adopt/integrate |
| Q-013 | Is the first product of Wings4.0 a dashboard? | No. The first proof is a complete governance cycle over real projects. Visualization follows validated data and decisions. | DECIDED | Purpose / Current limitations |
| Q-014 | What evidence does Wings4.0 use? | HUMAN is canonical declaration; BATON and bounded technical evidence help detect possible drift without silently replacing HUMAN. | DECIDED | Evidence model |
| Q-015 | Is project-context isolation mandatory for sessions? | Yes. PROJECT_CONTEXT_ISOLATION=MANDATORY — each GPT Project and Cursor workspace represents exactly one governed project; sessions must not develop other projects. | DECIDED | Session model / Isolation |
| Q-016 | Are ORCHESTRATOR and EXECUTOR separate sessions with distinct contexts? | Yes. ORCHESTRATOR and EXECUTOR are separate and do not share chat context; each governs the active project only. | DECIDED | Session model |
| Q-017 | May a Wings4 session modify or develop another project (e.g., SkillsMachine, Brainy, HIA)? | No. Developing or materially designing another project inside Wings4.0 is prohibited; cross-project needs must follow the transfer package workflow. | DECIDED | Project boundaries |
| Q-018 | Where should obsolete or superseded artifacts be placed? | In C:\\01. GitHub\\Wings4.0\\97.LEGACY only when directly superseded by this task, reversible, and explicitly reported. | DECIDED | Artifact lifecycle |
| Q-019 | What are the pilot session metrics? | SESSION_CONTINUE_TARGET_MINUTES=5; SESSION_CONTINUE_UNACCEPTABLE_OVER_MINUTES=10; SESSION_CLOSE_TARGET_MINUTES=10; SESSION_CLOSE_UNACCEPTABLE_OVER_MINUTES=20. | DECIDED | Pilot metrics |
| Q-020 | Which paths are authorized for this local sessions model implementation? | SESSIONS/ORCHESTRATOR/*, SESSIONS/EXECUTOR/*, HUMAN/Q_AND_A.md, HUMAN/Q_AND_A.COMPILED.md, 00_STATE/BATON.WINGS4.ACTIVE.md (only if necessary), PORTFOLIO.DECISION_LOG.md (only to record isolation/pilot decisions). | HISTORICAL_OPERATIONAL_DECISION | Scope |
| Q-021 | May SkillsMachine usecases or source be copied into Wings4.0? | No. Do not copy SkillsMachine usecase content or source; session files must be compact, pointer-based contracts only. | DECIDED | SkillsMachine boundary |
| Q-022 | Should Q_AND_A.COMPILED consolidate decided items with traceability? | Yes. Q_AND_A.COMPILED.md must consolidate current decisions, cite Q&A IDs, and mark AI inferences as PROPOSED_PENDING_HUMAN_CONFIRMATION. | DECIDED | Evidence consolidation |
| Q-023 | Who authorizes commits and pushes resulting from sessions work? | Human explicit authorization required; COMMIT_PERFORMED and PUSH_PERFORMED must be recorded and default to NO until human approval. | DECIDED | Change control |
| Q-024 | May a HISTORY directory be created for sessions? | No. Do not create a HISTORY directory. | DECIDED | Artefact hygiene |
| Q-025 | Is developing Project B inside Project A permitted? | No. Developing Project B inside Project A is prohibited; use transfer package workflow. | DECIDED | Cross-project policy |
| Q-026 | Should session artifacts be minimal and pointer-based? | Yes. Session files must be minimal, current, and use source pointers instead of full history. | DECIDED | Context efficiency |
| Q-027 | What is the execution root for the next minibattle? | Historical answer pointed to SkillsMachine. Superseded for current Wings4-local work: execution root is C:\\01. GitHub\\Wings4.0 unless an explicit transfer authorizes otherwise. | SUPERSEDED | Next execution root |
| Q-028 | What is the assigned next minibattle? | Historical answer pointed to SKILLSMACHINE_SMDI_GOVERNED_THIN_PILOT_DESIGN_001. Current Wings4-local next work is governed by BATON after CORE_010 / RADAR_001. | SUPERSEDED | Next minibattle |
| Q-029 | What are the STOP conditions for implementing the sessions model? | Stop if root mismatch, required cross-repo modification, overlapping dirty state on intended paths, missing required decisions, or would require implementing SkillsMachine in Wings4.0. | DECIDED | Safety gates |
| Q-030 | What validations are required after implementation? | Directory existence, exactly intended files present, no HISTORY, no SkillsMachine content, Q-001..Q-014 preserved, Q-015..Q-034 present, Q_AND_A.COMPILED contains required sections, git diff limited to authorized scope. | HISTORICAL_OPERATIONAL_DECISION | Validation |
| Q-031 | Must Q-001 through Q-014 remain preserved? | Yes. Do not rewrite or remove Q-001..Q-014; preserve ID, question, current answer, status, and affected sections. | DECIDED | Preservation |
| Q-032 | When may BATON.WINGS4.ACTIVE.md be modified? | Only if necessary to record the current work and next step; modifications must be minimal, reversible, and explicitly reported. | DECIDED | BATON handling |
| Q-033 | SESSION_CONTINUE pilot metrics — how to treat them in Q&A? | Record SESSION_CONTINUE_TARGET_MINUTES and SESSION_CONTINUE_UNACCEPTABLE_OVER_MINUTES as PILOT_METRIC to reflect provisional measurement. | PILOT_METRIC | Pilot metrics |
| Q-034 | SESSION_CLOSE pilot metrics — how to treat them in Q&A? | Record SESSION_CLOSE_TARGET_MINUTES and SESSION_CLOSE_UNACCEPTABLE_OVER_MINUTES as PILOT_METRIC to reflect provisional measurement. | PILOT_METRIC | Pilot metrics |
| Q-035 | Should session health be evaluated periodically during an active session? | Every 10 user messages within the same session: perform an internal context-health evaluation. Only show a brief notice when opening a new session is actually recommended. If the session remains healthy, show no health-status notice. | DECIDED | Session governance / Health policy |
| Q-036 | Does SkillsMachine intervene in other projects? | No. SkillsMachine does not intervene in other projects. | DECIDED | SkillsMachine boundary |
| Q-037 | What does SkillsMachine canonically own? | SkillsMachine is the canonical owner of reusable Skills/GRC canon only. | DECIDED | SkillsMachine boundary |
| Q-038 | Who owns each project's RADAR? | Each project owns, configures, executes and governs its own RADAR. | DECIDED | Project-local RADAR |
| Q-039 | Must Wings4.0 have its own RADAR? | Yes. Wings4.0 must have a project-local RADAR owned by Wings4.0. | DECIDED | Project-local RADAR |
| Q-040 | What is Wings3.0 relative to Wings4.0? | Wings3.0 is the legacy predecessor and selective source estate for Wings4.0. | DECIDED | Wings3 assimilation |
| Q-041 | Must Wings4.0 absorb useful Wings3.0 content? | Yes. Wings4.0 must selectively absorb useful content and capabilities from Wings3.0 under governed assessment. | DECIDED | Wings3 assimilation |
| Q-042 | When may Wings3.0 be retired and physically removed? | Only after complete governed extraction, validation, disposition and explicit human authorization. | DECIDED | Wings3 retirement |
| Q-043 | Is a global RADAR owner required? | No. No global RADAR owner exists or is required. | DECIDED | Project-local RADAR |
| Q-044 | Does a reusable RADAR Skill in SkillsMachine transfer ownership of project-local RADAR? | No. A reusable RADAR Skill is guidance only and does not transfer ownership or execution authority. | DECIDED | SkillsMachine boundary / RADAR |
