# Wings4 Ring0 Demo Runbook

Prototype root: `PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/`

Language: English-only human-facing UI (Cambridge C1 professional target). Canonical IDs and source paths stay literal.

## Open

Option A — static server (recommended):

```powershell
cd "C:\01. GitHub\Wings4.0\PRODUCT\RING0_SKILLSMACHINE_DIAGNOSTIC"
py -m http.server 8765
```

Then open `http://localhost:8765/`.

Option B — open `index.html` directly. If the browser blocks `fetch` on `file://`, use Option A.

## 5-minute demo

1. Show Wings4 definition / problem / flow and the short first-use orientation.
2. Point to the scope boundary: Wings4-held evidence only; SkillsMachine is not modified.
3. Show SkillsMachine as the selected project, including Product relationship vs Project relationship.
4. Open finding `F-SM-001` (WHOAMI→HUMAN).
5. Contrast Evidence with Recommendation; note data provenance badges.
6. Choose ACCEPT / REJECT / MODIFY / POSTPONE.
   - POSTPONE keeps the finding open for a later decision; it is not rejection.
7. Show the confirmation and local state update in the bottom panel.
8. Click **Export decisions JSON**.
9. Optionally click **Reset demo**, confirm, and show the flow can be repeated.
10. State clearly: SkillsMachine repository was not read or written.

## Provenance

- `CANONICAL_DERIVED` → UI label: Derived from canonical evidence.
- `REPRESENTATIVE_NONCANONICAL` → UI label: Representative, non-canonical.
- Source pointers remain visible for audit.
- Prototype state lives in browser `localStorage` (schema versioned) or in-memory if storage is unavailable.

## Decision export

Exported JSON includes schema version, project/finding IDs, action, visible action label, rationale/modification, previous/new state, timestamp, source data class, and Ring0 product marker. No confidential content beyond what the screen already shows.

## Reset flow

1. Click **Reset demo**.
2. Confirm the dialog.
3. Local Ring0 decisions are cleared so the demo can be repeated.

DevTools equivalent:

```js
localStorage.removeItem('wings4.ring0.skillsmachine.decisions.v1')
```

## Known limitations

- No SkillsMachine repository I/O.
- No commit/push.
- No Ring2..Ring5.
- No RADAR implementation.
- No cloud services.
- No multi-user concurrency.
- Automated browser validation is not claimed by this runbook; human manual validation of the 15 functional checks is PASS.

## PASS / FAIL

PASS when:

- SkillsMachine visible;
- >=3 findings (baseline: 4);
- evidence distinguishable from recommendation;
- 4 decision actions work (ACCEPT / REJECT / MODIFY / POSTPONE);
- state updates locally;
- JSON downloads with required fields;
- reset requires confirmation and clears state;
- visible UI is English only;
- no SkillsMachine mutation.

FAIL when any of the above is missing or the fixture cannot load.
