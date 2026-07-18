# Wings3.0 Assimilation Runbook

## 1. Operating boundaries

- C:\01. GitHub\Wings3.0 is a read-only legacy source unless a task explicitly authorizes a change.
- C:\01. GitHub\Wings4.0 is the portfolio governance canon.
- C:\Users\aazcl\Downloads\T.Wings4.0 is disposable staging and must be cleaned before each controlled run.
- Project-local repositories remain authoritative for project-local execution.

## 2. Per-item assimilation lifecycle

1. **Discover** — inventory structure, Git state, size, HUMAN, secrets, dependencies, and active use.
2. **Classify** — determine entity type, lifecycle, owner, confidence, and risks.
3. **Map** — identify destination for doctrine, tools, evidence, history, or executable content.
4. **Extract** — copy only approved semantic units into staging.
5. **Validate** — compare source and extracted content, verify hashes when appropriate, and check for secrets.
6. **Integrate** — write or merge into the declared canon.
7. **Commit** — create a controlled local commit after explicit authorization.
8. **Retain or migrate** — keep the source in place unless physical migration has independent approval.
9. **Archive or delete** — only after acceptance criteria and rollback evidence are satisfied.

## 3. Mandatory gates

### Governance gate
- owner identified;
- purpose and boundaries understood;
- target canonical layer identified;
- conflicts recorded.

### Technical gate
- Git state known;
- dependencies and absolute paths assessed;
- generated content excluded;
- secrets scan passed;
- migration rollback defined.

### Human gate
- HUMAN entry identified or created;
- human confirms relevance;
- provisional classification approved or corrected.

## 4. Stop conditions

Stop and require escalation when:
- a source is an active dirty Git repository;
- secrets or credentials may be present;
- the target capability owner is disputed;
- copying would create duplicate canon;
- source meaning cannot be reliably reconstructed;
- a third failure occurs for the same assimilation objective.

## 5. Evidence standard

Every assimilation action must record:
- source path;
- target path;
- action type;
- files included and excluded;
- hashes where material;
- semantic changes;
- validation result;
- commit identity, when committed;
- rollback method.
