# Wings4 Ring0 + Ring1 Demo Runbook

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

## 5-minute cumulative demo

### Ring0 (preserve)

1. Show Wings4 definition / problem / flow and first-use orientation.
2. Point to scope boundary: Wings4-held evidence only; SkillsMachine is not modified.
3. Show SkillsMachine as the selected project.
4. Open finding `F-SM-001`.
5. Contrast Evidence with Recommendation.
6. Choose ACCEPT / REJECT / MODIFY / POSTPONE.
7. Show local state update and optional JSON export.

### Ring1 (new)

8. After ACCEPT or MODIFY, open Decision lifecycle: ID, status, owner, next action, optional review date, history.
9. Confirm REJECT/POSTPONE are not intervention-eligible by default.
10. For an eligible decision, set/confirm target project (pilot default SkillsMachine; field is generic).
11. Preview the controlled intervention package.
12. Export intervention TXT. Note authority banner:
    - NOT_EXECUTOR_AUTHORIZATION
    - TARGET_PROJECT_RETAINS_LOCAL_AUTHORITY
    - NO_CROSS_REPO_MUTATION
13. Show lifecycle status becomes In action; history records export. Closing does not claim child implementation.
14. Optionally Reset demo and repeat.

## Provenance

- `CANONICAL_DERIVED` → Derived from canonical evidence.
- `REPRESENTATIVE_NONCANONICAL` → Representative, non-canonical.
- Local state schema version = 2 (Ring0 records migrate in memory).

## Known limitations

- No SkillsMachine repository I/O.
- No return/resync automation.
- No Ring2+.
- No RADAR.
- No cloud services.
- No multi-user concurrency.
- Human live Ring1 validation may still be pending after this build.

## PASS / FAIL

PASS when Ring0 path still works and Ring1 adds lifecycle + eligible intervention TXT export without child mutation.

FAIL when Ring0 regresses, intervention exports on REJECT/POSTPONE by default, or SkillsMachine would be written.
