# Wings4 Push-First Briefing — S2 Runtime Specification

Status: S2_IMPLEMENTED
Authority: Pablo explicit implementation authorization `20260818.175139_W4_EXECUTOR_IMPLEMENT_BRIEFING_RUNTIME_S2_039` (Option A)
Design record: `PORTFOLIO.ARCHITECTURE/WINGS4.PUSH_FIRST_BRIEFING.DESIGN.md` (DEC-W4-078)
Planning record: `PORTFOLIO.ARCHITECTURE/WINGS4.P4.PUSH_FIRST_BRIEFING.RUNTIME.PLANNING.md` (DEC-W4-079)
Implementation: `PRODUCT/PUSH_FIRST_BRIEFING_RUNTIME/briefing.runtime.js`
Tests: `PRODUCT/PUSH_FIRST_BRIEFING_RUNTIME/briefing.runtime.logical.test.js`
Open-decision contract: `PORTFOLIO.ARCHITECTURE/WINGS4.OPEN_DECISION.CONTRACT.md` (DEC-W4-083; design canonized; runtime catalog consumption not implemented)
Open-decision consumption design: `PORTFOLIO.ARCHITECTURE/WINGS4.OPEN_DECISION.RUNTIME.CONSUMPTION.DESIGN.md` (DEC-W4-085 planning; DEC-W4-086 DESIGN_STATUS=APPROVED D1–D5; DEC-W4-087 HARDENING_STATUS=PASS; S2.4 not authorized; runtime catalog consumption not implemented)
Canonical product roadmap: `PORTFOLIO.ROADMAP.md` (DEC-W4-088; sequencing/status only)
Approved future catalog path: `00_STATE/WINGS4.OPEN_DECISION.CATALOG.md` (not created; absence remains UNKNOWN)

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

Empty `MATERIAL_CHANGES` sentence `No Wings-held material change recorded` is emitted only after a verified operative-decision anchor and a successful empty Git range over governed paths. An unknown, malformed, nonexistent, or non-ancestor anchor must emit structured `UNKNOWN`, not the empty sentence.

S2 durable slice-identity value (header and evidence limits; not a substitute for parsed current state):

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

Human options: at least two, generated from current findings. None execute product or child mutation. Options must not preserve obsolete fixed OPTION_A/B/C wording. When contradictions or derivation failures exist, include a reject/request-correction option. Generated options must not authorize S3 or S4.

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
| No evidenced material changes after a verified anchor and successful empty Git range | Emit canonical empty-state wording |
| Decision anchor missing, malformed, nonexistent, non-ancestor, or unverifiable | Structured `UNKNOWN` for material changes; do not emit the empty sentence |
| START_HERE and BATON `NEXT_PRODUCT_ACTION` conflict | Structured `UNKNOWN` with both source pointers; do not silently choose a winner |
| No explicit `OPEN_DECISION_*` instance catalog | Structured `UNKNOWN` with why stating that the current open-decision state cannot be determined; do not describe the set as empty; do not infer a catalog from prose |

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
| BR-05 | Empty | Canonical empty-state wording only after a verified anchor and a successful empty Git range; post-anchor relevant commits must be listed; unknown anchor must produce `UNKNOWN`, not the empty FACT |
| BR-06 | Boundary | Skills, AI.History, and child paths are rejected/not read |
| BR-07 | Boundary | No network/live-web symbols or calls exist |
| BR-08 | Boundary | Required non-monitoring, non-RADAR, non-live-web, and no-child-read wording is present |
| BR-09 | Stale | Confirmed non-ancestor BATON generation commit produces `STALE_BATON_HEAD` |
| BR-10 | Stale | Confirmed non-ancestor START_HERE generation commit produces `STALE_SESSION_CONTINUE` |
| BR-11 | Human | At least two safe, non-mutating, findings-derived options are shown; obsolete literal OPTION_A/OPTION_B content is not required |
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

## 11. S2.3 current-state derivation

Operational current-state claims are derived from governed Wings-held evidence. Frozen assembly catalogs and silent defaults for current state are prohibited.

### 11.1 Source precedence

1. Runtime Git state from this repository only.
2. Explicit `KEY=VALUE` state in START_HERE and BATON.
3. Structured decision-log heading, Status, and commit fields.
4. S2 specification constants only for durable slice identity and boundaries.
5. Structured `UNKNOWN` when governed evidence is missing, malformed, contradictory, or unverifiable.

Do not use free-form AI interpretation of prose as a state machine. Conflicting explicit sources produce `UNKNOWN` with both source pointers. Do not silently select a winner.

### 11.2 Explicit-state parsing

Parse `KEY=VALUE` lines from START_HERE and BATON. First `;` segment is the value. Known equivalent encodings may be canonicalized only by documented rules (for example GAP_05 values that contain `ACCEPTED_LIMITATION_FOR_RING0` or the equivalent fixture-held token collapse to `ACCEPTED_LIMITATION_FOR_RING0`). Unrecognized or conflicting values remain `UNKNOWN`.

`PROJECT_STATE` operational fields:

- `root` from the validated repository root
- `branch` and `HEAD` from Git
- `md1_status` from explicit `MANAGEMENT_DELIVERY_1_STATUS` (no `CLOSED` default)
- `gap_05` from explicit `GAP_05`
- `briefing_runtime` from consistent explicit S2/continuity keys, mapped to the durable S2 level when the value is an authorized S2 implementation token
- S3/S4 authorization and implementation from explicit `S3_*` / `S4_*` keys

Durable S2 identity constants must not masquerade as parsed current state.

### 11.3 Operative-decision selection

Parse `## DEC-W4-N —` headings deterministically. Select the highest operative numeric DEC-W4 entry. Exclude an entry only when it is explicitly marked historical/non-operative (`Status: HISTORICAL_NON_OPERATIVE` or `ENTRY_HISTORICAL_NON_OPERATIVE=YES`). `HISTORICAL_NON_OPERATIVE_NOTE` is not an exclusion flag.

An entry with missing or conflicting Status lines is heading/status drift and is not operative. Fail closed with structured `UNKNOWN`.

### 11.4 Anchor validation

Parse Implementation commit, Correction commit, and Runtime HEAD forty-hex fields. Accept only a unique valid 40-hex commit object that is an ancestor of runtime HEAD (or equals HEAD). Missing, malformed, nonexistent, non-commit, non-ancestor, ambiguous, or unverifiable anchors produce structured `UNKNOWN`. Never emit the empty MATERIAL_CHANGES sentence when the anchor is `UNKNOWN`.

### 11.5 Material-change Git range and path scope

Inspect `anchor..HEAD` with this-repository Git only:

```
git log --reverse --pretty=format:%H%x09%s --name-only <anchor>..<HEAD> -- <governed-paths>
```

Do not use the network, another repository, RADAR, AI.History, or a child path.

Path scope:

- governed allowlist files
- `PRODUCT/PUSH_FIRST_BRIEFING_RUNTIME/**`
- `PORTFOLIO.ARCHITECTURE/WINGS4.PUSH_FIRST_BRIEFING.RUNTIME.S2.SPEC.md`

Continuity-only and tests-only commits are included when they fall within this Wings-held scope.

Ordering is deterministic oldest-to-newest. Each listed commit includes hash, subject, and governed path evidence.

`MAX_MATERIAL_COMMITS=10`. If truncated, state the displayed count and emit structured `UNKNOWN` for the omitted remainder.

Emit `No Wings-held material change recorded` only when:

1. the anchor is valid;
2. Git history inspection succeeds; and
3. zero relevant commits exist after the anchor.

### 11.6 Open-decision classifications

Do not emit a frozen open-decision catalog.
Do not consume `PORTFOLIO.ARCHITECTURE/WINGS4.OPEN_DECISION.CONTRACT.md` as an instance catalog.

Parse explicit non-meta `OPEN_DECISION_*` keys when present in START_HERE/BATON. `OPEN_DECISION_CONTRACT`, `OPEN_DECISION_CATALOG`, and `OPEN_DECISION_RUNTIME_CONSUMPTION` are status flags, not instance items. Classify instance values:

`OPEN`, `DEFERRED`, `NOT_SELECTED`, `COMPLETED`, `SUPERSEDED`, `UNAUTHORIZED`, `UNKNOWN`.

If a key value is a `DEC-W4-*` identifier, classify from that entry’s structured Status.

`COMPLETED`, `SUPERSEDED`, and `NOT_SELECTED` must not be presented as currently open. S3/S4 unauthorized state is a boundary, not automatically an open decision. DEC-W4-055 and DEC-W4-075 must not be labeled open merely because residual subjects remain deferred. `SESSION_CONTINUE_CANON_REFRESH` must not appear as `DEFERRED` after the completed continuity-sync commit.

Distinguish set states:

- `UNKNOWN` when no valid instance catalog is available, or governed instance evidence is missing, malformed, or conflicting. Rationale must state that the current open-decision state cannot be determined. Do not describe this set as empty.
- `VALIDATED_EMPTY` only when a valid instance KEY=VALUE catalog exists and contains zero currently active items.
- `POPULATED` when a valid instance catalog exists and contains one or more currently active items.

Do not infer a catalog from narrative prose. Aligning runtime classification to the DEC-W4-083 lifecycle (`PROPOSED`/`OPEN`/`BLOCKED`/`RESOLVED`/`SUPERSEDED`/`CANCELLED`) requires a later authorized S2.4 consumption slice (DEC-W4-086 design approved; DEC-W4-087 hardening recorded; implementation unauthorized). Future S2.4 `OPEN_DECISIONS` values are exactly `UNKNOWN|EMPTY|POPULATED` with separate `CATALOG_VALIDATION`. Current accepted S2.3 may still emit `VALIDATED_EMPTY` on the START_HERE/BATON instance-key path; that is not a fourth future `OPEN_DECISIONS` state and is not catalog consumption.

Future S2.4 implementation requirements (not authorized by this spec change):

- Extend `OPEN_DECISION_META_KEYS` before adding any new singular `OPEN_DECISION_*` continuity flags. Preserve plural `OPEN_DECISIONS_*` flags until that denylist is deployed.
- On the catalog path, do not emit `VALIDATED_EMPTY` as an `OPEN_DECISIONS` state.
- Do not create the operative catalog. Catalog absence remains UNKNOWN / NOT_AVAILABLE.
- Exact catalog path only. The architecture contract is never an instance catalog.
- Parser grammar, size caps, lifecycle graph, and security rules are in `WINGS4.OPEN_DECISION.RUNTIME.CONSUMPTION.DESIGN.md` section 22.

### 11.7 Next-action conflict handling

Parse `NEXT_PRODUCT_ACTION` from START_HERE and BATON.

- Both present and consistent: emit that governed action.
- One absent: use the other and disclose the available source.
- Conflict: `UNKNOWN` with both source pointers.
- Neither parseable: `UNKNOWN`.

Do not hardcode “keep S3/S4 unauthorized” as the current next action. S3/S4 remain unauthorized unless explicit governed evidence says otherwise.

### 11.8 Fail-closed UNKNOWN and claim-level provenance

Structured `UNKNOWN` is required when governed evidence is missing, malformed, contradictory, or unverifiable. Every current-state claim must cite evidence actually parsed for that claim. Unused allowlist inputs may remain allowed, but they must not be represented as supporting a claim unless their content was used.

### 11.9 Dynamic human options

Generate at least two mutually intelligible, non-mutating options tied to the current briefing. Include an option to reject/request correction when contradictions or derivation failures exist. Do not preserve fixed OPTION_A/B/C wording. Selecting an option must not execute mutation. Do not authorize S3 or S4 through generated options.

When `OPEN_DECISIONS` is `UNKNOWN` or the governed `NEXT_PRODUCT_ACTION` is `HUMAN_REVIEW_S2_3_AND_DECIDE_OPEN_DECISION_GOVERNANCE` or `RERUN_BOUNDED_READ_ONLY_S2_ACCEPTANCE_VALIDATION`, options must distinguish at least:

1. Accept the derived snapshot while preserving `OPEN_DECISIONS=UNKNOWN`.
2. Authorize bounded `OPEN_DECISION_*` governance work without authorizing S3/S4.
3. Keep `UNKNOWN` and defer governance/runtime changes.

When the governed `NEXT_PRODUCT_ACTION` is `HUMAN_DECIDE_WHETHER_TO_AUTHORIZE_S2_4_IMPLEMENTATION`, future S2.4 implementation (not this recording) must distinguish at least:

1. Authorize bounded S2.4 implementation.
2. Keep S2.4 unauthorized.
3. Request additional design correction.
4. Select another governed priority.

When the governed `NEXT_PRODUCT_ACTION` is `HUMAN_REVIEW_HARDENED_S2_4_AND_CANONICAL_ROADMAP`, options must distinguish accepting, correcting, or rejecting the hardened design and canonical roadmap. The briefing may recommend. It must not select a human option.

When the governed `NEXT_PRODUCT_ACTION` is `IMPLEMENT_AUTHORIZED_WORKFLOW_FOUNDATION`, the briefing must not treat that as S2.4 authorization. S2.4 remains a separate later human decision.
