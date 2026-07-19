# Wings4.0 Assimilation and Governance Runbook

## 1. Operating boundaries

- `C:\01. GitHub\Wings3.0` is a read-only legacy source unless a task explicitly authorizes a change.
- `C:\01. GitHub\Wings4.0` is the portfolio governance canon.
- `C:\Users\aazcl\Downloads\T.Wings4.0` is disposable staging.
- Project-local repositories remain authoritative for project-local execution.
- Wings4.0 does not silently edit another project's HUMAN.

## 2. Track A — Legacy assimilation

Use this track for legacy sources, doctrine, historical structures, and migration candidates.

1. **Discover** — inventory structure, Git state, size, HUMAN, secrets, dependencies, and active use.
2. **Classify** — determine entity type, lifecycle, owner, confidence, and risks.
3. **Map** — identify destination for doctrine, tools, evidence, history, or executable content.
4. **Extract** — copy only approved semantic units into staging.
5. **Validate** — compare source and extracted content, verify hashes when material, and check for secrets.
6. **Integrate** — write or merge into declared canon after approval.
7. **Commit** — create a controlled local commit only after explicit authorization.
8. **Retain or migrate** — keep source in place unless physical migration has independent approval.
9. **Archive or delete** — only after acceptance criteria and rollback evidence are satisfied.

## 3. Track B — Active-project governance cycle

Use this track to listen to and coordinate active independent projects.

1. **Identity gate**
   - confirm project name, root, repository identity, current HUMAN path, and target objective;
   - stop on `PROJECT_CONTEXT_MISMATCH`.

2. **Receive HUMAN**
   - obtain the current canonical HUMAN;
   - record path, hash or version, and review date;
   - do not substitute chat memory for project canon.

3. **Interpret**
   - extract identity, problem, purpose, users, interaction, scope, non-scope, capabilities, dependencies, integrations, canon, risks, and lifecycle;
   - distinguish explicit statements from inference.

4. **Create portfolio card**
   - summarize the project briefly;
   - preserve source evidence and confidence;
   - identify missing or ambiguous declarations.

5. **Compare**
   - compare against relevant governed projects;
   - do not compare every project pair indiscriminately;
   - evaluate problem, user, outcome, capability, canon, data, responsibility, roadmap, and integration.

6. **Classify findings**
   - record `FACT`, `INTERPRETATION`, `CONFIDENCE`, `IMPACT`, and `REVIEW_REQUIRED`;
   - classify conflict, overlap, duplication candidate, optional integration, open-source review, or unrelated.

7. **Prepare options**
   - include maintain independent, limit scope, integrate optionally, consolidate, pause, replace, retire, or defer;
   - include pros, cons, risks, and reversibility.

8. **Human decision**
   - Pablo approves, rejects, modifies, or defers;
   - Wings4.0 does not auto-resolve portfolio authority.

9. **Prepare intervention prompts**
   - create one prompt per affected project;
   - state project identity, approved decision, exact requested change, content to preserve, exclusions, acceptance criteria, evidence, and rollback;
   - do not request broad HUMAN rewrites when a focalized patch is sufficient.

10. **Project-local implementation**
    - each project processes the prompt under its own governance;
    - Wings4.0 does not assume successful implementation.

11. **Resynchronize**
    - receive updated HUMAN and bounded evidence;
    - verify the approved decision;
    - record `SYNCHRONIZED`, `PARTIALLY_SYNCHRONIZED`, `CONFLICT_REMAINS`, or `UPDATE_FAILED`.

12. **Update portfolio**
    - update approved cards, relationships, conflicts, decisions, and capability ownership;
    - do not populate maps with unapproved inference.

## 4. Mandatory gates

### Governance gate

- owner and decision authority identified;
- purpose and boundaries understood;
- local HUMAN located;
- facts separated from interpretations;
- conflicts recorded rather than silently resolved.

### Technical gate

- Git state known;
- dependencies and absolute paths assessed when relevant;
- generated content excluded from canon;
- secrets risk reviewed;
- rollback defined before changes.

### Human gate

- provisional interpretation presented;
- relevant human decision recorded;
- intervention prompt approved before delivery;
- project-local updates reviewed before declaring synchronization.

## 5. Stop conditions

Stop and require escalation when:

- project identity, root, MB_ID, or target artifacts do not match;
- a source is an active dirty Git repository and physical change is requested;
- secrets or credentials may be present;
- target capability ownership is disputed and no human decision exists;
- copying would create duplicate canon;
- source meaning cannot be reliably reconstructed;
- a third failure occurs for the same objective.

## 6. Evidence standard

Every material action or finding records:

- source project and path;
- source version or hash when material;
- evidence excerpt or precise reference;
- fact versus interpretation;
- confidence;
- conflict or opportunity type;
- human decision;
- target project prompt;
- validation result;
- rollback method;
- commit identity when committed.
