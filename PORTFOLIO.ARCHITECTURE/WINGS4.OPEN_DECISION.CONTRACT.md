# Wings4 OPEN_DECISION_* Governance Contract

Status: APPROVED_DESIGN_CANONIZED
Authority: Pablo; DEC-W4-083
Authorization: `20260820.141500_W4_EXECUTOR_RECORD_OPEN_DECISION_CONTRACT_AND_CORRECT_S2_3_GAPS`
Runtime consumption: NOT_IMPLEMENTED / NOT_AUTHORIZED_BY_THIS_CONTRACT
Consumption design: `PORTFOLIO.ARCHITECTURE/WINGS4.OPEN_DECISION.RUNTIME.CONSUMPTION.DESIGN.md` (DEC-W4-085 planning; DEC-W4-086 DESIGN_STATUS=APPROVED D1–D5; S2.4 IMPLEMENTATION_AUTHORIZED=NO)
Approved catalog path: `00_STATE/WINGS4.OPEN_DECISION.CATALOG.md` (not created)
S3: UNAUTHORIZED
S4: UNAUTHORIZED

This file is the bounded architecture contract for explicit `OPEN_DECISION_*` items. It does not create, select, resolve, cancel, or supersede any live decision. It is not an instance catalog. S2 must not treat this file as current-state evidence of open, empty, or populated decisions.

## 1. Purpose

Define governed fields, lifecycle, ownership, conflict handling, and completion/supersession rules for `OPEN_DECISION_*` items so Wings4 can later distinguish:

- `UNKNOWN` — current open-decision state cannot be determined;
- `EMPTY` — a valid applicable catalog exists, `CATALOG_VALIDATION=PASS`, and it contains zero active items;
- `POPULATED` — a valid applicable catalog exists, `CATALOG_VALIDATION=PASS`, and it contains one or more active items.

Narrative prose cannot create this catalog. Wings4 may classify, recommend, and present options. Pablo remains human decision authority. Wings4 must not select an option.

## 2. Non-goals

This contract does not authorize or implement:

- S2 catalog/runtime consumption of this file or of any `OPEN_DECISION_*` instance catalog;
- S3 `AFTER_RECORDED_HUMAN_DECISION`;
- S4 Ring0 visible panel / UX;
- automatic decision selection;
- child-repository read or mutation;
- live web, RADAR, or MARKET_MONITORING;
- COPY lifecycle change;
- a Wings4-complete or production-complete claim.

## 3. Required fields

Every `OPEN_DECISION_*` item must record these fields:

| Field | Meaning |
|---|---|
| `OPEN_DECISION_ID` | Stable unique identifier. Approved pattern `OD-W4-NNNN` (DEC-W4-086). Distinct from `DEC-W4-*`. |
| `TITLE` | Short human-readable name. |
| `STATUS` | One permitted lifecycle state. |
| `OWNER` | Responsible party. Ownership is responsibility, not decision authority. |
| `CREATED_AT` | Creation timestamp. |
| `SOURCE_DECISION_ID` | Governing `DEC-W4-*` or other explicit decision that created or recognized the item. |
| `SCOPE` | Bounded subject the item covers. |
| `OPTIONS` | Explicit options available to Pablo. |
| `RECOMMENDED_OPTION` | Wings recommendation only; not a selection. |
| `BLOCKS` | What remains blocked while this item is active. |
| `EVIDENCE_REQUIRED` | Evidence needed to resolve, cancel, or supersede. |
| `SELECTED_OPTION` | Human-selected option; empty until Pablo decides. |
| `RESOLUTION_DECISION_ID` | Required when `STATUS=RESOLVED`. |
| `RESOLVED_AT` | Resolution timestamp; empty until resolved. |
| `SUPERSEDED_BY` | Required when `STATUS=SUPERSEDED`. |
| `NOTES` | Non-authoritative commentary. Notes cannot change lifecycle. |

Missing required fields, malformed fields, or conflicting governed evidence produce `UNKNOWN`. Do not repair by inference.

## 4. Permitted lifecycle states

`PROPOSED`
`OPEN`
`BLOCKED`
`RESOLVED`
`SUPERSEDED`
`CANCELLED`

Rules:

- Only `OPEN` and `BLOCKED` count as active.
- `PROPOSED` requires governed authority before becoming active.
- `RESOLVED` requires a human decision and `RESOLUTION_DECISION_ID`.
- `SUPERSEDED` requires `SUPERSEDED_BY`.
- `CANCELLED` requires a human decision. Narrative prose is not cancellation.

A validated empty set is allowed only when a valid applicable catalog exists, `CATALOG_VALIDATION=PASS`, and the catalog contains zero active items (`OPEN` or `BLOCKED`). Absence of a valid catalog is `UNKNOWN`, not empty. `VALIDATED_EMPTY` is not a fourth `OPEN_DECISIONS` state.

## 5. Authority

- Pablo remains human decision authority.
- `OWNER` represents responsibility, not decision authority.
- Wings4 may classify, recommend, and present options.
- Wings4 must not select, resolve, cancel, or supersede an `OPEN_DECISION_*` item.
- Narrative prose cannot create, select, resolve, cancel, or supersede a decision.

## 6. Set states

`OPEN_DECISIONS` has exactly three values. Validation is a separate dimension.

| `OPEN_DECISIONS` | When |
|---|---|
| `UNKNOWN` | No authoritative catalog exists; or the catalog cannot be read; or schema/lifecycle/authority validation fails; or required governed evidence is missing; or valid governed sources conflict; or applicability cannot be established. Do not describe this set as empty. |
| `EMPTY` | A valid applicable catalog exists, `CATALOG_VALIDATION=PASS`, and zero records are `OPEN` or `BLOCKED`. |
| `POPULATED` | A valid applicable catalog exists, `CATALOG_VALIDATION=PASS`, and one or more records are `OPEN` or `BLOCKED`. |

| `CATALOG_VALIDATION` | When |
|---|---|
| `NOT_AVAILABLE` | No catalog file at the approved path. |
| `FAIL` | Catalog present but unreadable, invalid, conflicting, or inapplicable. |
| `PASS` | Catalog exists, validates, and applies to current Wings4 state. |

Required combinations:

1. No catalog: `OPEN_DECISIONS=UNKNOWN`; `CATALOG_VALIDATION=NOT_AVAILABLE`
2. Invalid or conflicting catalog: `OPEN_DECISIONS=UNKNOWN`; `CATALOG_VALIDATION=FAIL`
3. Valid catalog, zero active records: `OPEN_DECISIONS=EMPTY`; `OPEN_DECISION_ACTIVE_COUNT=0`; `CATALOG_VALIDATION=PASS`
4. Valid catalog, one or more active records: `OPEN_DECISIONS=POPULATED`; `OPEN_DECISION_ACTIVE_COUNT=<N>`; `CATALOG_VALIDATION=PASS`

`UNKNOWN` and `EMPTY` are not interchangeable. DEC-W4-083 used condition name `VALIDATED_EMPTY`; that name is not a fourth `OPEN_DECISIONS` state. Current accepted S2.3 runtime may still emit `VALIDATED_EMPTY` until S2.4 is separately authorized.

## 7. Conflict precedence

When sources disagree, apply this order:

1. Latest explicit human decision
2. Valid decision-log record
3. Valid `OPEN_DECISION_*` contract
4. BATON/START_HERE derived state
5. Narrative prose

A conflict between valid governed records must fail closed as `UNKNOWN` and expose the conflicting identifiers. Do not silently choose a winner. Narrative prose never wins.

## 8. S2 boundary

S2 remains `ON_DEMAND_TEXT_ONLY / SESSION_OUTPUT_ONLY`. This contract does not authorize S2 to read this file as an instance catalog. Until a separately authorized consumption slice exists, S2 must fail closed to `OPEN_DECISIONS=UNKNOWN` when no valid instance catalog is available.

DEC-W4-085 records the consumption design and planning packet. DEC-W4-086 approves D1–D5. Neither decision authorizes S2.4 implementation, creates an operative catalog, or changes accepted S2/S2.3 runtime behavior.

Approved future catalog path: `00_STATE/WINGS4.OPEN_DECISION.CATALOG.md`. The file does not exist and must not be treated as present.

Future slice identifier: `S2.4`. S2.4 is not S3 or S4.

Existing S2.3 parsing of explicit non-meta `OPEN_DECISION_*` KEY=VALUE lines in START_HERE/BATON is a bounded semantic source, not consumption of this architecture contract. Meta keys such as `OPEN_DECISION_CONTRACT` are status flags, not instance items.

S2 KEY=VALUE classes currently recognized by the authorized runtime (`OPEN`, `DEFERRED`, `NOT_SELECTED`, `COMPLETED`, `SUPERSEDED`, `UNAUTHORIZED`, `UNKNOWN`) are not silently rewritten to this lifecycle. Aligning runtime classification to section 4 requires a later authorized consumption slice.

## 9. Human options

When the governed next action concerns S2.3 acceptance or `OPEN_DECISION_*` governance, briefing `HUMAN_DECISION_OPTIONS` must distinguish at least:

1. Accept the derived snapshot while preserving `OPEN_DECISIONS=UNKNOWN`.
2. Authorize bounded `OPEN_DECISION_*` governance work without authorizing S3/S4.
3. Keep `UNKNOWN` and defer governance/runtime changes.

The briefing may recommend. It must not select an option.
