# Wings4 Push-First Briefing — S2 Runtime Specification

Status: S2_IMPLEMENTED
Authority: Pablo explicit implementation authorization `20260818.175139_W4_EXECUTOR_IMPLEMENT_BRIEFING_RUNTIME_S2_039` (Option A)
Design record: `PORTFOLIO.ARCHITECTURE/WINGS4.PUSH_FIRST_BRIEFING.DESIGN.md` (DEC-W4-078)
Planning record: `PORTFOLIO.ARCHITECTURE/WINGS4.P4.PUSH_FIRST_BRIEFING.RUNTIME.PLANNING.md` (DEC-W4-079)
Implementation: `PRODUCT/PUSH_FIRST_BRIEFING_RUNTIME/briefing.runtime.js`
Tests: `PRODUCT/PUSH_FIRST_BRIEFING_RUNTIME/briefing.runtime.logical.test.js`

This file records the implemented S2 contract only. It does not rewrite or supersede the design or planning packet.

DEC-W4-078 remains DESIGN_RECORDED and is not a runtime authorization token.
DEC-W4-079 remains PLANNING_RECORDED and is not a runtime authorization token.
Runtime authorization for this slice is Pablo’s named S2 decision in task `039`.

## 1. Scope

Implemented:

- `ON_DEMAND_TEXT_ONLY / SESSION_OUTPUT_ONLY`
- Trigger: `ON_DEMAND_REQUEST` only
- Output: one deterministic Markdown briefing to stdout / current session
- Persistence: none

Not implemented and not authorized by this spec:

- S3 `AFTER_RECORDED_HUMAN_DECISION`
- S4 Ring0 visible panel / UX
- `SESSION_START` / `SESSION_START_PRESENTATION`
- Automatic refresh, timers, watchers, page-load execution
- UI, browser panel, browser proof
- Briefing persistence, Temp write, continuation-package write
- Ring3, RADAR, MARKET_MONITORING, Market Watch, live web
- Capture form, auto-delivery
- Child-repository read or mutation
- COPY lifecycle change
- MD1 reopen
- Generic Cambridge C1 product doctrine
- Any Wings4-complete or production-complete claim

`BRIEFING_RUNTIME=IMPLEMENTED_ON_DEMAND_TEXT_SESSION_OUTPUT_ONLY`

That value does not imply session-start presentation, after-decision refresh, UI, browser integration, persistence, auto-delivery, monitoring, Ring3, RADAR, Market Monitoring, live web, child-repository access, or full Wings4 completion.

`WINGS4_COMPLETE=NO`
`PRODUCTION_COMPLETE=NO`
`S3_AUTHORIZED=NO`
`S3_IMPLEMENTED=NO`
`S4_AUTHORIZED=NO`
`S4_IMPLEMENTED=NO`

Cambridge C1 English coaching remains Pablo-specific collaboration context. It is not briefing product doctrine and is not a briefing UX requirement.

## 2. Trigger contract

Valid trigger: `ON_DEMAND_REQUEST`

The runtime must not execute when:

- imported as a module
- a page loads
- a session starts
- a human decision is recorded
- a timer or watcher fires
- the trigger is absent
- the trigger has any other value

Unsupported or missing triggers fail closed with a deterministic error and non-zero CLI exit code.

## 3. Entrypoint

Function:

- `runBriefing({ trigger: "ON_DEMAND_REQUEST", deps? })`
- Deterministic. No side effects on `require`.
- Returns `{ markdown, model, exitCode: 0 }` on success.
- Throws with `exitCode` 2 for CLI/trigger/argument failures and `exitCode` 1 for whole-run abort.

CLI:

```
node "C:\01. GitHub\Wings4.0\PRODUCT\PUSH_FIRST_BRIEFING_RUNTIME\briefing.runtime.js" --trigger ON_DEMAND_REQUEST
```

The repository root is resolved from the runtime file location (`PRODUCT/PUSH_FIRST_BRIEFING_RUNTIME` → repository root). Arbitrary `--root`, scan paths, URLs, output-file paths, persistence destinations, child-project paths, and unknown arguments are rejected.

## 4. Input classes

| Class | Sources | Missing behavior |
|---|---|---|
| Required | This-repository Git snapshot (branch, HEAD, worktree, index) | Abort whole run |
| Optional governed | Closed allowlist files below | Continue with structured `UNKNOWN` |
| Historical generation HEAD | BATON / START_HERE `HEAD_AT_GENERATION` | Classify by Git ancestry (below); do not treat hash inequality as stale |
| Confirmed non-ancestor | Generation commit exists and is not an ancestor of runtime HEAD | Emit existing `STALE_BATON_HEAD` / `STALE_SESSION_CONTINUE` |
| Missing, malformed, or unverifiable generation HEAD | Absent field, malformed value, non-commit object, or ancestry-check failure | Structured `UNKNOWN`; no base `STALE_*` |
| Unsupported | Any path outside the allowlist, child roots, `AI.History/`, URLs, free-text scan targets | Reject or `UNKNOWN` / `NOT_LIVE_CHILD_STATE`; never read |

Closed allowlist (repository-relative):

- `HUMAN/HUMAN.WINGS4.md`
- `PORTFOLIO.DECISION_LOG.md`
- `PORTFOLIO.PRINCIPLES.md`
- `00_STATE/BATON.WINGS4.ACTIVE.md`
- `MIGRATION.BACKLOG.md`
- `PORTFOLIO.ARCHITECTURE/WINGS4.PUSH_FIRST_BRIEFING.DESIGN.md`
- `PORTFOLIO.ARCHITECTURE/WINGS4.P4.PUSH_FIRST_BRIEFING.RUNTIME.PLANNING.md`
- `PORTFOLIO.ARCHITECTURE/WINGS4.PUSH_FIRST_BRIEFING.RUNTIME.S2.SPEC.md`
- `SESSIONS/ORCHESTRATOR/03.SESSION_CONTINUE/00.START_HERE.ORCHESTRATOR.txt`
- `PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/skillsmachine.fixture.json`

Git state is this repository only. The Ring0 fixture is Wings-held evidence, not a live child-repository read (`GAP_05`).

## 5. Output contract

Exactly one deterministic Markdown artifact.

Canonical eight sections, in this order (from DEC-W4-078 / design):

1. `PROJECT_STATE`
2. `SINCE_LAST_DECISION`
3. `MATERIAL_CHANGES`
4. `OPEN_DECISIONS`
5. `RISKS_AND_BOUNDARIES`
6. `RECOMMENDED_NEXT_ACTION`
7. `HUMAN_DECISION_OPTIONS`
8. `EVIDENCE_LIMITS`

Headings and field order are stable. No JSON second artifact.

Provenance: every evidence claim names a governed source pointer.

Classification: `FACT`, `INFERENCE`, `RECOMMENDATION`, and `UNKNOWN` remain distinct (principle 12).

Missing evidence `UNKNOWN` includes:

1. What is unknown
2. Why it is unknown
3. Required evidence
4. A bounded next action where applicable

Empty `MATERIAL_CHANGES`: `No Wings-held material change recorded`

S2 `PROJECT_STATE.briefing_runtime` / limits value:

`BRIEFING_RUNTIME=IMPLEMENTED_ON_DEMAND_TEXT_SESSION_OUTPUT_ONLY`

Required limits wording:

- `NOT_MARKET_MONITORING`
- `NOT_RADAR`
- `NOT_LIVE_WEB`
- `NO_CHILD_REPOSITORY_READ`
- `NO_CHILD_PROJECT_MUTATION`
- `GAP_05_ACCEPTED_LIMITATION_FOR_RING0`

Stale codes, when applicable (confirmed non-ancestor only for HEAD codes):

- `STALE_BATON_HEAD`
- `STALE_SESSION_CONTINUE`
- `NOT_LIVE_CHILD_STATE`
- `NOT_LIVE_MARKET`
- `FIXTURE_HELD_NOT_LIVE`

### Generation-hash semantics (S2.1)

`HEAD_AT_GENERATION` is historical evidence. Runtime Git HEAD is current truth.

| Condition | Classification | Base `STALE_*` |
|---|---|---|
| Generation HEAD equals runtime HEAD | `CURRENT` | No |
| Generation HEAD is an older ancestor of runtime HEAD | `VALID_HISTORICAL_ANCESTOR` | No |
| Generation HEAD exists as a commit and is not an ancestor | `DIVERGED_NON_ANCESTOR` | Yes, applicable existing code |
| Generation field absent | Structured `UNKNOWN` | No |
| Generation value malformed | Structured `UNKNOWN` | No |
| Forty-hex value is not a Git commit object | Structured `UNKNOWN` | No |
| Git ancestry check cannot be completed | Structured `UNKNOWN` | No |

Ancestry validation is this-repository `git merge-base --is-ancestor <generation-head> <runtime-head>` after `git cat-file -t` confirms a commit:

- Exit `0`: valid ancestor.
- Exit `1`: confirmed non-ancestor.
- Any other failure: structured `UNKNOWN`, not divergence.

A different but ancestral hash is valid. Only a confirmed non-ancestor produces `STALE_BATON_HEAD` or `STALE_SESSION_CONTINUE`. Hash inequality alone is not stale.

Semantic continuity lag is a separate content-level condition. HEAD divergence is Git-lineage-level. Valid ancestry does not prove semantic freshness and does not imply semantic staleness. Semantic status requires separate governed evidence. Semantic continuity lag is assessed independently from HEAD divergence; a valid historical ancestor is not stale solely because runtime HEAD is newer. It is not inferred from hash inequality and is not a HEAD-stale warning. S2.1 does not add a new warning code.

Human options: at least two. None execute product or child mutation.

## 6. Failure table

| Failure | Required behavior |
|---|---|
| Unsupported or missing trigger | Reject; non-zero CLI exit |
| Unknown CLI argument | Reject; non-zero CLI exit |
| Arbitrary/free-text scan target | Reject; non-zero CLI exit |
| Root is not the expected Wings4 repository | Abort whole run |
| Wings4 Git state cannot be read | Abort whole run |
| Assembler throws an unrecoverable error | Abort whole run |
| Optional governed source missing | Continue with structured `UNKNOWN` |
| Optional source unreadable or unparsable | Continue with structured `UNKNOWN` |
| Child-project evidence unavailable | `UNKNOWN` / `NOT_LIVE_CHILD_STATE`; never read child root |
| Confirmed non-ancestor BATON or START_HERE generation commit | Continue with existing `STALE_BATON_HEAD` / `STALE_SESSION_CONTINUE` |
| Missing, malformed, non-commit, or unverifiable generation HEAD | Structured `UNKNOWN`; no base `STALE_*` |
| Valid ancestral generation HEAD differing from runtime HEAD | No base stale warning |
| No evidenced material changes | Emit canonical empty-state wording |

No network retries, repair routines, background retries, or dependency recovery.

## 7. No-persistence guarantee

The runtime performs no write. It creates no file, directory, cache, log, report, continuation package, Temp artifact, or localStorage record. It persists no briefing instance.

## 8. Boundary enforcement

Enforced in code:

- Node built-ins only; no package installation
- No `fetch`, HTTP, HTTPS, socket, browser, or network logic
- No path read outside the Wings4 repository
- No `AI.History/` read
- No `C:\01. GitHub\Skills` or other child-root read
- Symlink/path-resolution escape rejected
- No RADAR invocation
- No Market Watch / Market Monitoring
- No Market Check engine require/import
- No Ring0 UI / page-load / localStorage
- This-repository Git only
- Closed allowlist

## 9. Acceptance matrix BR-01 through BR-20

| ID | Class | Required assertion |
|---|---|---|
| BR-01 | Unit | Entrypoint runs only with `trigger=ON_DEMAND_REQUEST` |
| BR-02 | Contract | Output contains exactly eight canonical sections in canonical order |
| BR-03 | Contract | Every evidence claim contains a governed source pointer |
| BR-04 | Negative | Missing source becomes structured `UNKNOWN` |
| BR-05 | Empty | No evidenced changes produces canonical empty-state wording |
| BR-06 | Boundary | Skills, AI.History, and child paths are rejected/not read |
| BR-07 | Boundary | No network/live-web symbols or calls exist |
| BR-08 | Boundary | Required non-monitoring, non-RADAR, non-live-web, and no-child-read wording is present |
| BR-09 | Stale | Confirmed non-ancestor BATON generation commit produces `STALE_BATON_HEAD` |
| BR-10 | Stale | Confirmed non-ancestor START_HERE generation commit produces `STALE_SESSION_CONTINUE` |
| BR-11 | Human | At least two options are shown and none executes mutation |
| BR-12 | Semantics | FACT, INFERENCE, RECOMMENDATION, and UNKNOWN remain distinct |
| BR-13 | Overclaim | GAP_05 remains bounded; no Wings4-complete claim |
| BR-14 | Isolation | Runtime produces no persisted briefing or worktree mutation |
| BR-15 | Exclusion | SESSION_START and AFTER_RECORDED_HUMAN_DECISION are not implemented |
| BR-16 | Exclusion | Ring0 UI, page-load, localStorage, fixture writes, and Market Check engine are unused |
| BR-17 | Git | Snapshot is limited to the current Wings4 repository |
| BR-18 | Negative | Free-text/arbitrary scan targets are rejected |
| BR-19 | Clean tree | Test execution creates no tracked or untracked files |
| BR-20 | Authority | DEC-W4-078/079 are not treated as authorization tokens |

## 10. Explicit remaining exclusions

S3 and S4 remain unimplemented and unauthorized.
This slice does not make Wings4 complete or production-complete.
Cambridge C1 remains Pablo-specific collaboration context, not briefing product doctrine.
Semantic continuity lag is assessed independently from HEAD divergence. Valid ancestry does not prove semantic freshness and does not imply semantic staleness. Semantic status requires separate governed evidence. Semantic continuity lag is not a HEAD-stale warning.
