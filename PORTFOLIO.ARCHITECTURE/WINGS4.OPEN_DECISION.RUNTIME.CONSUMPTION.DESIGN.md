# Wings4 OPEN_DECISION_* Runtime Consumption — Design and Planning

DESIGN_STATUS=APPROVED
DESIGN_APPROVAL=HUMAN_APPROVED_D1_TO_D5
DESIGN_APPROVAL_DECISION_ID=DEC-W4-086
HUMAN_SELECTION=OPTION_A_APPROVE_D1_TO_D5
D1_CATALOG_LOCATION=00_STATE/WINGS4.OPEN_DECISION.CATALOG.md
D2_SLICE_IDENTIFIER=S2.4
D3_ABSENT_CATALOG_RESULT=OPEN_DECISIONS_UNKNOWN
D4_EMPTY_STATE=OPEN_DECISIONS_EMPTY_WITH_CATALOG_VALIDATION_PASS
D5_OPEN_DECISION_ID_PATTERN=OD-W4-NNNN
IMPLEMENTATION_AUTHORIZED=NO
IMPLEMENTATION_COMPLETED=NO
RUNTIME_CONSUMPTION_IMPLEMENTED=NO
OPERATIVE_CATALOG_CREATED=NO
S2_4_AUTHORIZED=NO
S2_4_IMPLEMENTED=NO
S3_AUTHORIZED=NO
S4_AUTHORIZED=NO
Authority: Pablo; Post-S2 Option A (DEC-W4-085); Option A approve D1–D5 (DEC-W4-086)
Authorization: `20260820.164500_W4_EXECUTOR_FINALIZE_OPEN_DECISION_CONSUMPTION_DESIGN`
Prior design/planning record: DEC-W4-085
Contract: `PORTFOLIO.ARCHITECTURE/WINGS4.OPEN_DECISION.CONTRACT.md`
S2 spec: `PORTFOLIO.ARCHITECTURE/WINGS4.PUSH_FIRST_BRIEFING.RUNTIME.S2.SPEC.md`
S2 runtime: `PRODUCT/PUSH_FIRST_BRIEFING_RUNTIME/briefing.runtime.js`

This file is the bounded non-operative design and implementation-planning packet for future S2.4 consumption of a governed `OPEN_DECISION_*` instance catalog. It is implementation-ready and not product functionality. It does not implement runtime. It does not create an operative catalog. It does not select a human option. It does not authorize S2.4, S3, or S4.

---

## 0. Status labels and document roles

| Label | Value |
|---|---|
| DESIGN_STATUS | APPROVED |
| DESIGN_APPROVAL | HUMAN_APPROVED_D1_TO_D5 |
| DESIGN_APPROVAL_DECISION_ID | DEC-W4-086 |
| IMPLEMENTATION_AUTHORIZED | NO |
| IMPLEMENTATION_COMPLETED | NO |
| RUNTIME_CONSUMPTION_IMPLEMENTED | NO |
| S2_4_AUTHORIZED | NO |
| OPERATIVE_CATALOG_CREATED | NO |
| S2_HUMAN_ACCEPTANCE | ACCEPTED |
| S2_3_HUMAN_ACCEPTANCE | ACCEPTED |
| OPEN_DECISIONS | UNKNOWN |
| S3_AUTHORIZED | NO |
| S4_AUTHORIZED | NO |
| WINGS4_COMPLETE | NO |
| PRODUCTION_COMPLETE | NO |

Document roles:

- This file: approved consumption design plus bounded future S2.4 implementation plan. S2.4 remains unauthorized.
- `WINGS4.OPEN_DECISION.CONTRACT.md`: approved field/lifecycle contract. Not an instance catalog. Not consumption authorization.
- `WINGS4.PUSH_FIRST_BRIEFING.RUNTIME.S2.SPEC.md`: accepted implemented S2/S2.3 behavior. Unchanged by this recording.
- `WINGS4.P4.PUSH_FIRST_BRIEFING.RUNTIME.PLANNING.md`: historical briefing-runtime planning. Not this slice.

No duplicate consumption-design document existed before this file. Existing contract, S2 spec, and P4 planning are not replaced.

---

## 1. Current accepted facts

FACT:

- Bounded S2 is implemented as `ON_DEMAND_TEXT_ONLY / SESSION_OUTPUT_ONLY` (DEC-W4-080).
- S2.1 ancestry semantics, S2.2 wording, and S2.3 derivation are accepted (DEC-W4-081, DEC-W4-082, DEC-W4-084).
- The `OPEN_DECISION_*` field/lifecycle contract is canonized (DEC-W4-083).
- Contract-driven runtime catalog consumption is not implemented (DEC-W4-083, DEC-W4-084).
- No operative instance catalog exists. Absence of a catalog is not an empty set.
- Current derived briefing value is `OPEN_DECISIONS=UNKNOWN`.
- Current S2.3 parses explicit non-meta `OPEN_DECISION_*` KEY=VALUE lines in START_HERE/BATON. Meta keys (`OPEN_DECISION_CONTRACT`, `OPEN_DECISION_CATALOG`, `OPEN_DECISION_RUNTIME_CONSUMPTION`) are status flags, not instance items.
- Any other `OPEN_DECISION_<TOKEN>=` line in START_HERE/BATON is treated as an instance item. If such flags exist and none classify as currently open, S2.3 emits `VALIDATED_EMPTY`. Continuity status flags must therefore use the existing `OPEN_DECISIONS_*` (plural) prefix, or a listed meta key, until a later authorized consumption slice extends the denylist.
- Current S2.3 lifecycle classes are `OPEN`, `DEFERRED`, `NOT_SELECTED`, `COMPLETED`, `SUPERSEDED`, `UNAUTHORIZED`, `UNKNOWN`. They are not silently rewritten to the DEC-W4-083 lifecycle.
- Current empty-set internal token is `VALIDATED_EMPTY`.
- BATON and START_HERE are derived continuity/state surfaces.
- `PORTFOLIO.DECISION_LOG.md` is decision authority and is not replaced by a catalog.
- S3 and S4 remain unauthorized and unimplemented.
- Pablo selected Post-S2 Option A: authorize bounded design and planning (DEC-W4-085).
- Pablo selected Option A and approved D1–D5 (DEC-W4-086). DESIGN_STATUS is now APPROVED. S2.4 implementation remains unauthorized.

INFERENCE:

- Until a separately authorized S2.4 implementation exists, current S2 must continue to fail closed to `OPEN_DECISIONS=UNKNOWN` when no valid instance catalog is available.

RECOMMENDATION:

- Human next action is whether to authorize S2.4 implementation. This document does not authorize it.

UNKNOWN:

- Whether Pablo will authorize S2.4 implementation.
- Whether an operative catalog will later be authorized as a separate act.

---

## 2. Purpose and non-goals

Purpose: define how a later-authorized S2 briefing runtime may discover, validate, and consume one governed `OPEN_DECISION_*` instance catalog, and emit exactly one of:

- `STATE_UNKNOWN` → `OPEN_DECISIONS=UNKNOWN`
- `STATE_EMPTY` → `OPEN_DECISIONS=EMPTY` plus `OPEN_DECISION_ACTIVE_COUNT=0` plus `CATALOG_VALIDATION=PASS`
- `STATE_POPULATED` → `OPEN_DECISIONS=POPULATED` plus `OPEN_DECISION_ACTIVE_COUNT=<N>` where N > 0 plus `CATALOG_VALIDATION=PASS`

`OPEN_DECISIONS` has exactly three values: `UNKNOWN` | `EMPTY` | `POPULATED`. `VALIDATED_EMPTY` is not a fourth `OPEN_DECISIONS` state.

Validation is a separate dimension: `CATALOG_VALIDATION=PASS|FAIL|NOT_AVAILABLE`.

Non-goals / not authorized by this document:

- Runtime implementation or product-code mutation
- Test mutation
- Creation of an operative catalog
- Migration of narrative decisions into structured records
- Automatic human-decision selection
- S3 `AFTER_RECORDED_HUMAN_DECISION`
- S4 Ring0 panel / UX
- Child-repository read or mutation
- `AI.History/` inspection
- Live web, RADAR, MARKET_MONITORING, capture form, auto-delivery
- COPY lifecycle change
- Staging, commit, or push
- A Wings4-complete or production-complete claim

---

## 3. Authoritative input location and file format

### 3.1 One catalog

Exactly one canonical instance catalog. No duplicated catalogs. No generated runtime state treated as canon. No live-web or child-repository dependency.

The architecture contract file remains a contract, not the catalog.

BATON and START_HERE remain derived continuity. They must not become competing catalog authorities.

The decision log remains decision authority. It verifies human-evidence citations. It does not become the instance catalog.

### 3.2 Viable locations

| ID | Path | Trade-off |
|---|---|---|
| L1 | `00_STATE/WINGS4.OPEN_DECISION.CATALOG.md` | Operational instance data beside BATON, with a distinct filename. Fits `00_STATE` as current-state, not architecture. Risk: operators may confuse it with BATON unless headers forbid BATON substitution. |
| L2 | `PORTFOLIO.ARCHITECTURE/WINGS4.OPEN_DECISION.CATALOG.md` | Adjacent to the contract. Risk: architecture folder currently holds contracts/specs/designs; S2 already forbids treating the contract as a catalog. |
| L3 | Embed records in `PORTFOLIO.DECISION_LOG.md` | One file for decisions. Rejected as a competing replacement of decision-log authority and a parser-hostile mix of historical DEC-W4 prose with instance records. |
| L4 | JSON under `PORTFOLIO.ARCHITECTURE/` matching `PROJECT.CONTRACT.schema.json` style | Machine-strict. Weaker human review. Conflicts with HUMAN preferred KEY=VALUE pilot format. |

### 3.3 Approved catalog location (D1)

APPROVED_CATALOG_PATH=`00_STATE/WINGS4.OPEN_DECISION.CATALOG.md`

APPROVED_FORMAT=structured UTF-8 KEY=VALUE catalog with a header block plus zero or more delimited records.

Historical context: DEC-W4-085 recommended L1 over L2/L3/L4. DEC-W4-086 approved L1. L2 remains a documented non-selected alternative. L3 and L4 remain rejected.

Rationale:

- HUMAN prefers structured UTF-8 KEY=VALUE with delimited narrative blocks; free-form Markdown is not approved as a machine dependency.
- Current S2 already consumes KEY=VALUE.
- `00_STATE` is the operational-state folder; BATON stays a different file.
- The file is human-reviewable, deterministic, and version-controlled in Wings4 only.

The catalog does not yet exist and must not be created by this design. No duplicate catalog is permitted. Generated runtime output is not canon.

### 3.4 Proposed catalog header

Required header keys:

| Key | Rule |
|---|---|
| `CATALOG_KIND` | Must equal `OPEN_DECISION_INSTANCE_CATALOG` |
| `CATALOG_FORMAT_VERSION` | Exact token `1` until a later decision versions the format |
| `CATALOG_STATUS` | `OPERATIVE` or `NON_OPERATIVE` |
| `PROJECT_ID` | Must equal `Wings4.0` |
| `AUTHORITY_DECISION_ID` | Exact `DEC-W4-NNN` that authorized this catalog instance |
| `CATALOG_CREATED_AT` | ISO-8601 timestamp; evidence only; not freshness |
| `RECORD_SEPARATOR` | Exact token `---` |
| `DECLARED_RECORD_COUNT` | Non-negative integer matching parsed record count |

Header narrative is not instance data.

### 3.5 Proposed record encoding

Each record is a KEY=VALUE block bounded by `RECORD_SEPARATOR`. Field order inside a record is canonical and must match the contract:

1. `OPEN_DECISION_ID`
2. `TITLE`
3. `STATUS`
4. `OWNER`
5. `CREATED_AT`
6. `SOURCE_DECISION_ID`
7. `SCOPE`
8. `OPTIONS` (see structured encoding below)
9. `RECOMMENDED_OPTION`
10. `BLOCKS`
11. `EVIDENCE_REQUIRED`
12. `SELECTED_OPTION`
13. `RESOLUTION_DECISION_ID`
14. `RESOLVED_AT`
15. `SUPERSEDED_BY`
16. `NOTES`

Empty values use a visible empty token: the value after `=` is zero-length. Do not omit a required key.

`OPEN_DECISION_ID` pattern (D5, DEC-W4-086): `OD-W4-NNNN`

- Project-scoped to Wings4
- Immutable
- Sequential
- Zero-padded to four digits (`OD-W4-0001`, `OD-W4-0002`)
- Unique within the authoritative catalog
- Duplicate IDs fail validation closed
- IDs are never reused after `RESOLVED`, `SUPERSEDED`, or `CANCELLED`
- The ID itself does not encode lifecycle state
- Distinct from `DEC-W4-*` decision-log IDs

Required match: `^OD-W4-[0-9]{4}$`

Structured multi-value fields use indexed keys, not free-form CSV:

- `OPTIONS_COUNT=<n>`
- `OPTION_<i>_ID=<TOKEN>`
- `OPTION_<i>_LABEL=<text>`
- `BLOCKS_COUNT=<n>`
- `BLOCK_<i>=<token or text>`
- `EVIDENCE_REQUIRED_COUNT=<n>`
- `EVIDENCE_REQUIRED_<i>=<token or text>`

`OPTIONS` in the contract is satisfied by `OPTIONS_COUNT` plus `OPTION_<i>_*`. Runtime must fail closed if counts and indexed keys disagree.

`NOTES` is non-authoritative. Notes cannot change lifecycle, selection, or set-state.

Do not invent additional instance fields in the first consumption slice.

---

## 4. Input discovery rules

Future runtime must use exact-path discovery, not directory enumeration:

1. Resolve repository root as today’s S2 does (`PRODUCT/PUSH_FIRST_BRIEFING_RUNTIME` → Wings4 root).
2. Read exactly `00_STATE/WINGS4.OPEN_DECISION.CATALOG.md` (D1 approved path).
3. Add that exact relative path to the S2 closed allowlist.
4. Do not glob `**/*OPEN_DECISION*`.
5. Do not treat `WINGS4.OPEN_DECISION.CONTRACT.md` as a catalog.
6. Do not treat BATON, START_HERE, the decision log, backlog, or this design file as a catalog.
7. Do not read `AI.History/`, child roots, URLs, or any path outside the allowlist.
8. Symlink/path-resolution escape remains rejected by existing S2 boundary code.

Discovery outcomes:

| Condition | Result |
|---|---|
| Canonical file absent | `OPEN_DECISIONS=UNKNOWN`; `CATALOG_VALIDATION=NOT_AVAILABLE` |
| File present but unreadable | `OPEN_DECISIONS=UNKNOWN`; `CATALOG_VALIDATION=FAIL` |
| Multiple candidate catalog files found by any extra heuristic | Prohibited; exact path only. Extra files are not catalogs. |
| File present and readable | Continue schema validation |

Filesystem readdir order must not affect outcome.

---

## 5. Schema validation rules

Fail closed to `STATE_UNKNOWN` when any of the following hold. Do not repair by inference.

- Missing catalog file
- Non-UTF-8 or unreadable content
- Missing or unequal `CATALOG_KIND`, `CATALOG_FORMAT_VERSION`, `PROJECT_ID`
- `CATALOG_STATUS` not in `{OPERATIVE, NON_OPERATIVE}`
- `AUTHORITY_DECISION_ID` missing, malformed, or not a unique operative `DEC-W4-*` heading
- `DECLARED_RECORD_COUNT` missing, non-integer, or unequal to parsed record count
- Record missing any contract-required field key
- `OPEN_DECISION_ID` not matching `^OD-W4-[0-9]{4}$`
- Duplicate keys inside one record
- Unknown keys inside a record (closed field set)
- `OPEN_DECISION_ID` duplicate across records
- `OPEN_DECISION_ID` empty or mutable-in-place (ID string in the file must be unique)
- `STATUS` not in the canonical lifecycle
- Indexed count fields disagree with present `OPTION_*` / `BLOCK_*` / `EVIDENCE_REQUIRED_*` keys
- `OPTIONS_COUNT` not an integer >= 0
- Active records (`OPEN`, `BLOCKED`) with `OPTIONS_COUNT=0` or `EVIDENCE_REQUIRED_COUNT=0`

`NON_OPERATIVE` catalog status yields `STATE_UNKNOWN`, not empty. A withdrawn catalog is not a validated empty set.

---

## 6. Lifecycle-state validation

Canonical lifecycle (DEC-W4-083):

`PROPOSED` `OPEN` `BLOCKED` `RESOLVED` `SUPERSEDED` `CANCELLED`

Active statuses: `OPEN` and `BLOCKED` only.

`PROPOSED`, `RESOLVED`, `SUPERSEDED`, and `CANCELLED` must not increment `OPEN_DECISION_ACTIVE_COUNT` and must not appear as currently open items.

Runtime is a validator of a snapshot. It is not a transition engine. It does not rewrite STATUS.

Field consistency:

| STATUS | Required extra fields | Forbidden populated fields |
|---|---|---|
| `PROPOSED` | `SOURCE_DECISION_ID` | `SELECTED_OPTION`, `RESOLUTION_DECISION_ID`, `RESOLVED_AT`, `SUPERSEDED_BY` |
| `OPEN` | bounded `OPTIONS_*`, `EVIDENCE_REQUIRED_*`, `SOURCE_DECISION_ID` | `SELECTED_OPTION`, `RESOLUTION_DECISION_ID`, `RESOLVED_AT`, `SUPERSEDED_BY` |
| `BLOCKED` | same as `OPEN`, plus `BLOCKS_COUNT>=1` | same as `OPEN` |
| `RESOLVED` | `SELECTED_OPTION`, `RESOLUTION_DECISION_ID`, `RESOLVED_AT` | `SUPERSEDED_BY` |
| `SUPERSEDED` | `SUPERSEDED_BY` | `SELECTED_OPTION` unless a prior resolution exists and is cited |
| `CANCELLED` | `RESOLUTION_DECISION_ID` or other explicit human-decision citation in `SOURCE_DECISION_ID`/`RESOLUTION_DECISION_ID` | `SELECTED_OPTION` unless the cancelling decision names it |

Any invalid combination fails closed to `STATE_UNKNOWN` for the whole set. Do not drop the bad record and continue.

`PROPOSED` is not active. It requires governed authority before becoming `OPEN` or `BLOCKED`. Runtime must not promote `PROPOSED`.

---

## 7. Human-authority validation

- Pablo remains human decision authority (DEC-W4-022).
- `OWNER` is responsibility, not authority.
- `RECOMMENDED_OPTION` is a Wings recommendation and is not a selection.
- `SELECTED_OPTION` may be populated only when an explicit human decision is cited and verified in `PORTFOLIO.DECISION_LOG.md`.
- `RESOLVED` requires `RESOLUTION_DECISION_ID` plus `RESOLVED_AT`. The cited ID must exist as an operative DEC-W4 entry and must not be marked historical/non-operative.
- `SUPERSEDED` requires `SUPERSEDED_BY` pointing to a later `OPEN_DECISION_ID` in the same catalog or to an explicit DEC-W4 ID. If the pointer cannot be verified, fail closed.
- `CANCELLED` requires an explicit human decision citation. Narrative prose is not cancellation.
- Wings4 may classify, recommend, and present options. Future runtime must not select, resolve, cancel, or supersede a record.
- Runtime must not write `SELECTED_OPTION`.

Verification method: parse DEC-W4 headings with the existing S2.3 operative-decision parser. Do not interpret decision-log prose as catalog mutations. Use the log only to confirm that a cited ID exists and is operative.

If the cited human decision is missing, duplicated, historical/non-operative, or status-conflicting, fail closed to `STATE_UNKNOWN`.

---

## 8. Conflict detection and precedence

Contract precedence:

1. Latest explicit human decision
2. Valid decision-log record
3. Valid `OPEN_DECISION_*` contract/catalog
4. BATON/START_HERE derived state
5. Narrative prose

Runtime application without turning narrative into catalog data:

1. Catalog records are the only instance-data source for set-state once a catalog file exists.
2. Decision-log entries are authority evidence for citations (`SOURCE_DECISION_ID`, `RESOLUTION_DECISION_ID`, `SUPERSEDED_BY` when it is a DEC-W4 ID). The log does not synthesize records.
3. If a later explicit human decision contradicts a catalog record about the same `OPEN_DECISION_ID` (for example the log records cancellation and the catalog still says `OPEN`), fail closed to `STATE_UNKNOWN` and emit both identifiers. Do not silently prefer the catalog. Do not silently rewrite the catalog.
4. BATON/START_HERE may echo derived flags (`OPEN_DECISIONS=UNKNOWN|EMPTY|POPULATED`). Those flags are not instance records. If a validated catalog set-state and the derived flags disagree, fail closed to `STATE_UNKNOWN`.
5. Non-meta `OPEN_DECISION_*` instance keys in BATON/START_HERE are not catalog authority after a catalog file exists. If they are present and disagree with the catalog, fail closed.
6. Narrative prose in HUMAN, BATON, START_HERE, backlog, architecture, or the decision-log body never creates, resolves, cancels, or supersedes records.
7. This design file and the contract file are never instance evidence.

Conflict between two valid governed instance sources fails closed. Precedence is not a silent-winner rule. Precedence identifies which sources may count as governed evidence; disagreement among those sources is `UNKNOWN`.

Narrative never wins and is never ingested as a record.

---

## 9. UNKNOWN, EMPTY, and POPULATED output semantics

### STATE_UNKNOWN

Use when:

- No authoritative catalog exists
- The catalog cannot be read
- Schema validation fails
- Required governed evidence is missing
- Valid governed sources conflict
- Decision authority cannot be verified
- Catalog freshness or applicability cannot be established under this contract
- `CATALOG_STATUS=NON_OPERATIVE`

Required output:

```
OPEN_DECISIONS=UNKNOWN
CATALOG_VALIDATION=NOT_AVAILABLE
```

when the catalog file is absent.

```
OPEN_DECISIONS=UNKNOWN
CATALOG_VALIDATION=FAIL
```

when a catalog file is present but unreadable, invalid, conflicting, inapplicable, or authority cannot be verified.

Do not emit `OPEN_DECISION_ACTIVE_COUNT` as a known integer in this state.

UNKNOWN must never be described as:

- No open decisions
- Empty
- Zero items
- None pending

Required UNKNOWN rationale shape (preserve S2.3 discipline):

1. What is unknown: current open-decision set state
2. Why: name the concrete validation failure
3. Required evidence: a valid applicable catalog, or correction of the named conflict/missing citation
4. Bounded next action: keep UNKNOWN; do not infer from narrative; do not implement S3/S4

### STATE_EMPTY

Use only when all of the following hold:

- Authoritative catalog exists
- All required validation passes
- Catalog is applicable to current Wings4 state
- Zero records have `STATUS=OPEN` or `STATUS=BLOCKED`

Required output:

```
OPEN_DECISIONS=EMPTY
OPEN_DECISION_ACTIVE_COUNT=0
CATALOG_VALIDATION=PASS
```

EMPTY is a known validated result. It must not be represented as UNKNOWN.

Historical mapping: DEC-W4-083 used condition name `VALIDATED_EMPTY`. DEC-W4-086 approves `EMPTY` as the public `OPEN_DECISIONS` token. `VALIDATED_EMPTY` is not a fourth `OPEN_DECISIONS` state. Current accepted S2.3 runtime may still emit `VALIDATED_EMPTY` until S2.4 is separately authorized.

### STATE_POPULATED

Use only when all of the following hold:

- Authoritative catalog exists
- All required validation passes
- Catalog is applicable
- One or more records have `STATUS=OPEN` or `STATUS=BLOCKED`

Required output:

```
OPEN_DECISIONS=POPULATED
OPEN_DECISION_ACTIVE_COUNT=<validated integer greater than zero>
CATALOG_VALIDATION=PASS
```

Only `OPEN` and `BLOCKED` count as active.

---

## 10. Invalid and missing evidence behavior

| Case | Behavior |
|---|---|
| Missing catalog | `OPEN_DECISIONS=UNKNOWN`; `CATALOG_VALIDATION=NOT_AVAILABLE`; continue the rest of the briefing |
| Unreadable catalog | `OPEN_DECISIONS=UNKNOWN`; `CATALOG_VALIDATION=FAIL` |
| Schema/lifecycle/authority failure | `OPEN_DECISIONS=UNKNOWN`; `CATALOG_VALIDATION=FAIL`; do not partial-render records |
| Duplicate IDs | `OPEN_DECISIONS=UNKNOWN`; `CATALOG_VALIDATION=FAIL` |
| Invalid status combination | `OPEN_DECISIONS=UNKNOWN`; `CATALOG_VALIDATION=FAIL` |
| Missing mandatory fields | `OPEN_DECISIONS=UNKNOWN`; `CATALOG_VALIDATION=FAIL` |
| Conflicting valid governed records | `OPEN_DECISIONS=UNKNOWN`; `CATALOG_VALIDATION=FAIL` with both identifiers |
| `SELECTED_OPTION` without verified human decision | `OPEN_DECISIONS=UNKNOWN`; `CATALOG_VALIDATION=FAIL` |
| Narrative-only “open decisions” | Ignore as instance data; do not create records |
| Child/web/AI.History evidence offered | Reject; `NOT_LIVE_CHILD_STATE` / existing S2 limits; never read |
| Whole-run Git/root failure | Existing S2 abort; unchanged |

No network retries. No repair. No background recovery. No catalog rewrite.

---

## 11. Deterministic ordering and rendering

- Sort active records by `OPEN_DECISION_ID` ascending ASCII.
- Tie-break is prohibited because IDs are unique; a tie is a duplicate-ID failure.
- Do not sort by filesystem order, parse-encounter order, or `NOTES`.
- `CREATED_AT` is not the sort key.
- Render only active records (`OPEN`, `BLOCKED`) in section `## 4. OPEN_DECISIONS`.
- Do not list `PROPOSED`, `RESOLVED`, `SUPERSEDED`, or `CANCELLED` as open items.
- Field render order per record follows section 3.5.
- Repeated execution against unchanged governed inputs must produce identical Markdown.
- Headings and the eight-section S2 schema remain unchanged.
- Do not emit a second JSON artifact.
- Every catalog claim must cite the catalog path plus, where used, the decision-log citation.

Recommended FACT lines for populated state:

- `OPEN_DECISIONS=POPULATED`
- `OPEN_DECISION_ACTIVE_COUNT=<n>`
- one FACT per active record: ID, TITLE, STATUS, OWNER, SCOPE, OPTIONS IDs, RECOMMENDED_OPTION, BLOCKS, EVIDENCE_REQUIRED
- `SELECTED_OPTION` omitted or shown empty for active records
- Classification remains FACT / INFERENCE / RECOMMENDATION / UNKNOWN
- Human options remain generated, non-mutating, and must not select a catalog option

---

## 12. Temporal and Git-state behavior

- Runtime Git HEAD is current Git truth.
- Historical acceptance and decision commits remain valid ancestors when they are ancestors of runtime HEAD.
- Hash inequality alone is not stale.
- Confirmed non-ancestry of BATON/START_HERE `HEAD_AT_GENERATION` keeps existing `STALE_BATON_HEAD` / `STALE_SESSION_CONTINUE`.
- Semantic continuity lag is assessed separately from HEAD divergence. Catalog applicability is not inferred from those HEAD codes.
- Catalog applicability cannot be inferred solely from timestamps. `CATALOG_CREATED_AT` is attribution, not freshness.
- Applicability requires: `PROJECT_ID=Wings4.0`, `CATALOG_STATUS=OPERATIVE`, `AUTHORITY_DECISION_ID` is an operative DEC-W4 entry, and no later explicit human decision withdraws the catalog.
- If applicability cannot be established, `STATE_UNKNOWN`.
- Deterministic ordering must not depend on filesystem enumeration order.
- Runtime execution must not mutate repository state, the catalog, BATON, START_HERE, tests, or any other file.

---

## 13. Auditability and evidence attribution

Every catalog-derived claim must include:

- source pointer to the canonical catalog path
- `OPEN_DECISION_ID` when record-level
- cited `SOURCE_DECISION_ID` / `RESOLUTION_DECISION_ID` when authority is asserted
- classification FACT or UNKNOWN as appropriate

Runtime must not attribute catalog claims to BATON, START_HERE, this design file, or narrative.

Missing attribution fails closed.

---

## 14. Runtime boundaries and prohibited evidence sources

Allowed for this future slice, Wings4-local only:

- Canonical catalog path (after human confirmation)
- `PORTFOLIO.DECISION_LOG.md` for citation verification
- Existing S2 allowlist for the rest of the briefing
- This-repository Git snapshot

Prohibited:

- `WINGS4.OPEN_DECISION.CONTRACT.md` as instance catalog
- This design/planning file as instance catalog
- BATON/START_HERE as catalog authority after a catalog exists
- Narrative prose as instance data
- Generated briefing output as later input
- `AI.History/`
- Child repositories, including `C:\01. GitHub\Skills`
- Live web, RADAR, MARKET_MONITORING, Market Watch
- Network calls
- Free-text scan targets
- Automatic option selection
- Persistence of briefing instances
- S3 or S4 behavior

Existing S2 no-persistence guarantee remains: no write, cache, log, Temp artifact, or localStorage.

---

## 15. Backward compatibility with accepted S2/S2.3

Until implementation is separately authorized, current S2/S2.3 behavior remains the operative runtime:

- No catalog consumption
- Meta keys are not instance items
- Missing instance catalog → `OPEN_DECISIONS=UNKNOWN` with non-empty rationale
- START_HERE/BATON non-meta instance keys may still classify under the S2.3 class set
- `VALIDATED_EMPTY` remains the current internal empty token for that S2.3 path
- 77 accepted tests and BR-01 through BR-20 remain the regression baseline
- Eight-section schema, trigger, CLI, allowlist (except a later exact catalog add), Git semantics, and no-persistence remain

Recommended implementation compatibility rule is superseded by D3 (DEC-W4-086).

Approved S2.4 rule:

- If the canonical catalog file is absent: `OPEN_DECISIONS=UNKNOWN` and `CATALOG_VALIDATION=NOT_AVAILABLE`. Do not treat START_HERE/BATON instance keys as a catalog substitute. Absence must never mean EMPTY, zero, none, or no pending decisions.
- If the catalog file exists and fails validation, conflicts, or is inapplicable: `OPEN_DECISIONS=UNKNOWN` and `CATALOG_VALIDATION=FAIL`.
- If the catalog file exists and validates: catalog validation is exclusive for set-state. BATON/START_HERE instance keys are not catalog authority.

Current accepted S2.3 runtime remains unchanged until S2.4 is separately authorized. S2.3 may still classify START_HERE/BATON instance keys and may still emit `VALIDATED_EMPTY` on that historical path. That is existing accepted behavior, not the approved S2.4 consumption contract.

Future consumption must not authorize S3 or S4. It must not change the trigger. It must not add UI.

Aligning S2.3 classes (`DEFERRED`, `COMPLETED`, …) to the DEC-W4-083 lifecycle happens only on the catalog path after S2.4 is authorized. Do not silently rewrite existing S2.3 classes in the current accepted runtime.

---

## 16. Proposed design for briefing integration

Future integration point: `assemble()` open-decision block in `PRODUCT/PUSH_FIRST_BRIEFING_RUNTIME/briefing.runtime.js` (today approximately the `parseOpenDecisionKeys` / `openDecisionsState` path) and `## 4. OPEN_DECISIONS` rendering.

Proposed parser/validator responsibility: a dedicated module

`PRODUCT/PUSH_FIRST_BRIEFING_RUNTIME/open.decision.catalog.js`

exported functions (conceptual names):

- `discoverCatalog(root, deps)` — exact-path read; no glob
- `parseCatalog(text)` — header + records
- `validateCatalog(parsed, decisionEntries)` — schema, lifecycle, authority, uniqueness
- `classifySetState(validated)` — UNKNOWN / EMPTY / POPULATED plus `CATALOG_VALIDATION`
- `sortActiveRecords(records)` — ID ascending
- `activeCount(records)` — OPEN+BLOCKED only

Future S2.4 must extend the S2.3 meta-key denylist before any new singular `OPEN_DECISION_*` continuity flags are added to BATON/START_HERE. Until then, status flags use `OPEN_DECISIONS_*` (plural) so they are not parsed as instance records. Read-only validation of this design recording confirmed that `OPEN_DECISION_RUNTIME_CONSUMPTION_DESIGNED` and sibling singular keys would otherwise be classified as instance items and incorrectly emit `VALIDATED_EMPTY`.

Error and UNKNOWN rendering reuse `unknownBlock()` / `renderUnknown()`.

Human options after consumption, if set-state is UNKNOWN, must still distinguish keep-UNKNOWN / authorize-later-work / defer, and must not select catalog options. If EMPTY or POPULATED, options must still be non-mutating and must not auto-select `SELECTED_OPTION`.

---

## 17. Explicit non-authorization of implementation

IMPLEMENTATION_AUTHORIZED=NO

This document, DEC-W4-085, and DEC-W4-086 do not authorize:

- S2.4 runtime code
- tests
- an operative catalog
- S3 or S4
- commit or push

A separate explicit human decision is required before S2.4 implementation.

---

## 18. Approved design dispositions (D1–D5)

MATERIAL_OPEN_DESIGN_DECISION_COUNT=0

DEC-W4-085 recorded five proposed choices. DEC-W4-086 approved all five. They are no longer unresolved.

| ID | Subject | Historical DEC-W4-085 proposal | DEC-W4-086 approved value |
|---|---|---|---|
| D1 | Authoritative catalog location | Recommend L1 `00_STATE/WINGS4.OPEN_DECISION.CATALOG.md` | `00_STATE/WINGS4.OPEN_DECISION.CATALOG.md` (file not created) |
| D2 | Future slice identifier | Recommend `S2.4` | `S2.4`. Not S3. Not S4. No parallel `ODC-1` lineage. Implementation unauthorized. |
| D3 | Absent-catalog result | Proposed keeping S2.3 START_HERE/BATON instance-key parsing while the catalog file is absent | `OPEN_DECISIONS=UNKNOWN` with `CATALOG_VALIDATION=NOT_AVAILABLE`. Absence never means EMPTY. |
| D4 | Empty-set semantics | Proposed public token `EMPTY`; asked whether to migrate S2.3 `VALIDATED_EMPTY` | `OPEN_DECISIONS=EMPTY` only with `CATALOG_VALIDATION=PASS` and zero active records. No fourth `VALIDATED_EMPTY` `OPEN_DECISIONS` state. |
| D5 | `OPEN_DECISION_ID` pattern | Proposed `OD-W4-NNN` | `OD-W4-NNNN` (`OD-W4-0001`, `OD-W4-0002`). Distinct from `DEC-W4-*`. Never reused. |

Remaining UNKNOWN (not D1–D5):

- Whether Pablo will authorize S2.4 implementation.
- Whether an operative catalog will later be authorized as a separate act.

---

## 19. Bounded future implementation plan

PLAN_STATUS=PLANNING_ONLY
FUTURE_SLICE_ID=S2.4
IMPLEMENTATION_AUTHORIZED=NO
OPERATIVE_CATALOG_IN_SLICE=NO

### 19.1 Preconditions

- DEC-W4-084 remains accepted bounded S2/S2.3 human acceptance.
- DEC-W4-085 remains the historical design/planning record.
- DEC-W4-086 remains the D1–D5 design-approval record. It does not authorize S2.4 implementation.
- A later named human authorization explicitly authorizes S2.4 implementation.
- Worktree clean except the authorized implementation write set.
- S3 and S4 remain unauthorized.
- No operative catalog is required for S2.4 machinery. Catalog creation is a separate human authorization.

### 19.2 Exact bounded outcome

If later authorized, S2.4 would:

1. Add a parser/validator module for the confirmed catalog path.
2. Integrate set-state classification into the existing OPEN_DECISIONS section.
3. Emit UNKNOWN / EMPTY / POPULATED with separate `CATALOG_VALIDATION` per this design.
4. Preserve ON_DEMAND_TEXT_ONLY / SESSION_OUTPUT_ONLY.
5. Preserve no-persistence, no S3/S4, no child/web/RADAR evidence, no automatic selection.
6. Keep BR-01..BR-20 passing.
7. Add direct unit, logical/contract, negative, and CLI tests.
8. Leave `OPEN_DECISIONS=UNKNOWN` in live continuity until a separately authorized operative catalog exists.

S2.4 would not:

- create `00_STATE/WINGS4.OPEN_DECISION.CATALOG.md`
- migrate narrative decisions into records
- select options
- implement S3 or S4

### 19.3 Candidate write set (future only)

Create:

- `PRODUCT/PUSH_FIRST_BRIEFING_RUNTIME/open.decision.catalog.js`

Modify:

- `PRODUCT/PUSH_FIRST_BRIEFING_RUNTIME/briefing.runtime.js` (allowlist add; assemble/render OPEN_DECISIONS)
- `PRODUCT/PUSH_FIRST_BRIEFING_RUNTIME/briefing.runtime.logical.test.js` (additive tests; S2.4 must not keep `VALIDATED_EMPTY` as an `OPEN_DECISIONS` state)
- `PORTFOLIO.ARCHITECTURE/WINGS4.PUSH_FIRST_BRIEFING.RUNTIME.S2.SPEC.md` (section 11.6 consumption contract for the implemented slice)
- Continuity files only as required after implementation recording: `PORTFOLIO.DECISION_LOG.md`, `00_STATE/BATON.WINGS4.ACTIVE.md`, `MIGRATION.BACKLOG.md`, `SESSIONS/ORCHESTRATOR/03.SESSION_CONTINUE/00.START_HERE.ORCHESTRATOR.txt`

Do not create in S2.4 unless a separate sentence in the implementation authorization says so:

- `00_STATE/WINGS4.OPEN_DECISION.CATALOG.md`

Do not modify:

- Ring0 product files
- Market Check runtime
- child repositories
- `AI.History/`
- this design’s meaning via silent rewrite during implementation (update status flags only)

### 19.4 Parser/validator responsibility

Owned by `open.decision.catalog.js`. Node built-ins only. No package installation. No network. No Git mutation. No file writes.

### 19.5 Briefing-runtime integration point

`assemble()` after decision-log parse so citation verification can reuse `decisionEntries`. Rendering remains `## 4. OPEN_DECISIONS`.

### 19.6 Error and UNKNOWN rendering

Reuse structured UNKNOWN blocks. Catalog failures must not abort the whole briefing unless existing S2 whole-run abort conditions hold (root/Git). Catalog problems are optional-governed-source failures.

### 19.7 Deterministic sorting

`OPEN_DECISION_ID` ascending ASCII among active records.

### 19.8 Validation matrix

| ID | Class | Assertion |
|---|---|---|
| ODC-U1 | Unit | Parser reads header and records from a fixture string |
| ODC-U2 | Unit | Duplicate IDs fail closed |
| ODC-U3 | Unit | Active count includes only OPEN and BLOCKED |
| ODC-U4 | Unit | Sort is ID-ascending and independent of input order |
| ODC-C1 | Contract | Missing file → UNKNOWN plus `CATALOG_VALIDATION=NOT_AVAILABLE`; not empty wording |
| ODC-C2 | Contract | Valid zero-active catalog → EMPTY plus ACTIVE_COUNT=0 plus `CATALOG_VALIDATION=PASS` |
| ODC-C3 | Contract | Valid one-or-more active → POPULATED plus ACTIVE_COUNT plus `CATALOG_VALIDATION=PASS` |
| ODC-C8 | Contract | Invalid/conflicting catalog → UNKNOWN plus `CATALOG_VALIDATION=FAIL` |
| ODC-C4 | Contract | PROPOSED/RESOLVED/SUPERSEDED/CANCELLED do not count as active |
| ODC-C5 | Logical | SELECTED_OPTION without verified DEC-W4 citation → UNKNOWN |
| ODC-C6 | Logical | RESOLVED without RESOLUTION_DECISION_ID/RESOLVED_AT → UNKNOWN |
| ODC-C7 | Logical | SUPERSEDED without SUPERSEDED_BY → UNKNOWN |
| ODC-N1 | Negative | Contract file is not consumed as catalog |
| ODC-N2 | Negative | Narrative prose does not create records |
| ODC-N3 | Negative | BATON/START_HERE meta keys are not instance items |
| ODC-N4 | Negative | Conflicting catalog vs later human decision → UNKNOWN with both IDs |
| ODC-N5 | Negative | Child path / AI.History / URL rejected; not read |
| ODC-N6 | Negative | Runtime does not write SELECTED_OPTION or mutate the catalog |
| ODC-R1 | Regression | Existing 77 tests remain green before additive assertions |
| ODC-R2 | Regression | BR-01 through BR-20 remain PASS |
| ODC-CLI | CLI | Two live ON_DEMAND_REQUEST runs exit 0, identical output, no worktree change |
| ODC-NP | Isolation | No persistence; clean worktree after tests |

### 19.9 Negative cases (required)

- Absent catalog
- Unreadable catalog
- Wrong `CATALOG_KIND`
- `CATALOG_STATUS=NON_OPERATIVE`
- Count mismatch
- Duplicate `OPEN_DECISION_ID`
- `OPEN_DECISION_ID` not matching `OD-W4-NNNN`
- Unknown STATUS
- Active record with zero OPTIONS or zero EVIDENCE_REQUIRED
- SELECTED_OPTION on OPEN
- RESOLVED missing citation/timestamp
- SUPERSEDED missing SUPERSEDED_BY
- Conflicting BATON echo after catalog exists
- Decision-log citation missing
- Extra unknown field
- Directory glob temptation: only exact path is valid

### 19.10 Rollback criteria

Rollback the S2.4 write set if:

- BR-01..BR-20 fail
- Prior assertion count regresses below 77 before intended additive tests
- Runtime writes files
- Catalog or narrative is inferred into records
- S3/S4 symbols or triggers appear
- Child/web/AI.History reads appear
- Automatic selection appears
- Live CLI becomes non-deterministic

Rollback method: revert only the S2.4 write set. Accepted S2/S2.3 remains. This design record remains. No operative catalog should exist to roll back.

Fail closed: any validation failure yields UNKNOWN, not a guessed EMPTY/POPULATED.

### 19.11 Explicit exclusions

S3, S4, UI, persistence, monitoring, RADAR, live web, child read/mutation, COPY lifecycle, catalog creation, narrative migration, auto-selection, commit/push unless separately authorized.

### 19.12 Human acceptance criteria (future)

Implementation is accepted only when:

1. Named human authorization for S2.4 exists.
2. D1–D5 are recorded as accepted or explicitly replaced.
3. Tests pass including regression 77+additive.
4. Two CLI runs are deterministic and non-mutating.
5. Live continuity still shows UNKNOWN unless a separately authorized catalog exists.
6. Human reviews output and records acceptance in the decision log.
7. Staging/commit/push remain a separate gate.

### 19.13 Separate commit/push gate

S2.4 implementation authorization is not commit authorization. Commit/push require a later exact-staging human decision.

This design/planning recording also does not authorize commit or push.

---

## 20. Future implementation requirements (summary)

- Separate explicit human authorization for S2.4
- Approved catalog path D1 `00_STATE/WINGS4.OPEN_DECISION.CATALOG.md`
- Parser/validator module
- S2 allowlist exact-path add
- UNKNOWN/EMPTY/POPULATED rendering with separate `CATALOG_VALIDATION`
- `OPEN_DECISION_ID` pattern `OD-W4-NNNN`
- No operative catalog unless separately authorized
- Preserve accepted S2/S2.3 until the authorized S2.4 write set lands
- No S3/S4
- No automatic selection
- No persistence
- Tests: unit, contract, negative, regression, CLI, clean worktree

---

## 21. Explicit prohibitions (this recording)

- `OPEN_DECISION_RUNTIME_CONSUMPTION_AUTHORIZED=NO`
- `S2_4_AUTHORIZED=NO`
- `S2_4_IMPLEMENTED=NO`
- `OPEN_DECISION_RUNTIME_CONSUMPTION_IMPLEMENTED=NO`
- `OPERATIVE_OPEN_DECISION_CATALOG_CREATED=NO`
- `S3_AUTHORIZED=NO`
- `S4_AUTHORIZED=NO`
- `WINGS4_COMPLETE=NO`
- `PRODUCTION_COMPLETE=NO`
- `COMMIT=NO`
- `PUSH=NO`
- Do not claim `OPEN_DECISIONS` is empty or known
- Do not close the ORCHESTRATOR session
- Do not create a new continuation package
