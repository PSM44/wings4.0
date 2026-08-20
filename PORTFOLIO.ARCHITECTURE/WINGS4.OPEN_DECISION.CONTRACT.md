# Wings4 OPEN_DECISION_* Governance Contract

Status: APPROVED_DESIGN_CANONIZED
Authority: Pablo; DEC-W4-083
Authorization: `20260820.141500_W4_EXECUTOR_RECORD_OPEN_DECISION_CONTRACT_AND_CORRECT_S2_3_GAPS`
Runtime consumption: NOT_IMPLEMENTED / NOT_AUTHORIZED_BY_THIS_CONTRACT
S3: UNAUTHORIZED
S4: UNAUTHORIZED

This file is the bounded architecture contract for explicit `OPEN_DECISION_*` items. It does not create, select, resolve, cancel, or supersede any live decision. It is not an instance catalog. S2 must not treat this file as current-state evidence of open, empty, or populated decisions.

## 1. Purpose

Define governed fields, lifecycle, ownership, conflict handling, and completion/supersession rules for `OPEN_DECISION_*` items so Wings4 can later distinguish:

- `UNKNOWN` — current open-decision state cannot be determined;
- validated empty — a valid contract/catalog exists and contains zero active items;
- populated — a valid contract/catalog exists and contains one or more active items.

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
| `OPEN_DECISION_ID` | Stable unique identifier. |
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

A validated empty set is allowed only when a valid contract/catalog exists and contains zero active items (`OPEN` or `BLOCKED`). Absence of a valid contract/catalog is `UNKNOWN`, not empty.

## 5. Authority

- Pablo remains human decision authority.
- `OWNER` represents responsibility, not decision authority.
- Wings4 may classify, recommend, and present options.
- Wings4 must not select, resolve, cancel, or supersede an `OPEN_DECISION_*` item.
- Narrative prose cannot create, select, resolve, cancel, or supersede a decision.

## 6. Set states

| Set state | When |
|---|---|
| `UNKNOWN` | No valid governed `OPEN_DECISION_*` contract or catalog is available; or evidence is missing, malformed, or conflicting. The current open-decision state cannot be determined. Do not describe this set as empty. |
| `VALIDATED_EMPTY` | A valid contract/catalog exists and contains zero active items. |
| `POPULATED` | A valid contract/catalog exists and contains one or more active items. |

`UNKNOWN` and `VALIDATED_EMPTY` are not interchangeable.

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

Existing S2.3 parsing of explicit non-meta `OPEN_DECISION_*` KEY=VALUE lines in START_HERE/BATON is a bounded semantic source, not consumption of this architecture contract. Meta keys such as `OPEN_DECISION_CONTRACT` are status flags, not instance items.

S2 KEY=VALUE classes currently recognized by the authorized runtime (`OPEN`, `DEFERRED`, `NOT_SELECTED`, `COMPLETED`, `SUPERSEDED`, `UNAUTHORIZED`, `UNKNOWN`) are not silently rewritten to this lifecycle. Aligning runtime classification to section 4 requires a later authorized consumption slice.

## 9. Human options

When the governed next action concerns S2.3 acceptance or `OPEN_DECISION_*` governance, briefing `HUMAN_DECISION_OPTIONS` must distinguish at least:

1. Accept the derived snapshot while preserving `OPEN_DECISIONS=UNKNOWN`.
2. Authorize bounded `OPEN_DECISION_*` governance work without authorizing S3/S4.
3. Keep `UNKNOWN` and defer governance/runtime changes.

The briefing may recommend. It must not select an option.
