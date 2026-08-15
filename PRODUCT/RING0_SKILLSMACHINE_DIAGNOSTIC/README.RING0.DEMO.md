# Wings4 Ring0 + Ring1 + Ring2 Demo Runbook

Prototype root: `PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/`

## Open

```powershell
cd "C:\01. GitHub\Wings4.0\PRODUCT\RING0_SKILLSMACHINE_DIAGNOSTIC"
py -m http.server 8765
```

Open `http://localhost:8765/`.

## Live validation flow

### Ring0 / Ring1

1. Open finding `F-SM-001`, ACCEPT (optional note) or MODIFY (required note).
2. Confirm the Intervention Package header immediately shows a real ID:
   `WINGS4_CONTROLLED_INTERVENTION_PACKAGE ID: W4IP-YYYYMMDD-NNNN`
   (assigned at PACKAGE_READY — not `W4IP-PENDING-ASSIGNMENT`).
3. Confirm source/target roots are visible as metadata only.
4. Confirm SkillsMachine temp metadata resolves to `C:\Users\aazcl\Downloads\Temp.SkillMachine` (metadata only; Wings4 does not access it).
5. Click **COPY PACKAGE** or **DOWNLOAD INTERVENTION PACKAGE**.
6. Confirm copy/download use the same package ID and body; copy does not create a new ID.
7. Confirm filename (download), visible header, machine-readable `INTERVENTION_PACKAGE_ID=` line, and history use the same real package ID.

### Ring2 — valid return

8. In **Return evidence**, paste a completed AI block using the **same** `INTERVENTION_PACKAGE_ID`, or click **IMPORT TXT**.
9. Click **VERIFY RETURN**.
10. Expect `VERIFIED_PASS` or `VERIFIED_PASS_WITH_GAP` when checks are satisfied.
11. Optionally **Export verification TXT**.
12. Edit the textarea and re-run VERIFY RETURN to confirm retry is safe.

### Ring2 — required negative tests

13. **Unknown package ID:** unused `W4IP-...` → rejection; no local intervention mutation.
14. **Missing / incomplete evidence:** placeholders such as `<PASS|PASS_WITH_GAP|FAIL>` or omitted fields → `RETURN_INCOMPLETE` (not fabricated PASS).
15. **Prohibited scope violation:** `PROHIBITED_SCOPE_VIOLATION=YES` even if `OVERALL_STATUS=PASS` → `SCOPE_CONFLICT`.
16. **Unauthorized push:** `PUSH=YES` against no-push policy → `FAILED`.
17. Confirm SkillsMachine was not read or written by Wings4.

### Market Check — on demand (bounded slice)

18. Open a finding (start with `F-SM-001`).
19. In **Market Check**, keep the governed question and click **Run Market Check**.
20. Expect alternatives first, then a management-readable recommendation, evidence level, scope, authority, limits, and confidence.
21. Open `F-SM-002`, choose **Should we build this, or use something that already exists?**, run Market Check.
22. Expect **Unknown — evidence is missing** (do not fabricate a buy/build).
23. Confirm the result states this is not monitoring, RADAR, or Ring3.
24. Open `F-MC-001`, keep **Should we build this, or use something that already exists?**, run Market Check. Expect **Build only the remaining gap**, with a human-provided sample marked not production evidence.
25. Open `F-MC-002`, keep **Should we integrate an existing solution, or build a remaining gap?**, run Market Check. Expect **Integrate an existing solution**. Confirm EXTERNAL_CHECKED stays pending with no live scan.

Do not treat this runbook as live market intelligence. Bounded human-live validation is recorded for F-SM-001, F-SM-002 UNKNOWN, F-MC-001 BUILD, and F-MC-002 INTEGRATE (DEC-W4-064, DEC-W4-067).

## Evidence classification

Interactive claims must state separately: IMPLEMENTED_STATICALLY / LOGICALLY_TESTED / BROWSER_AUTOMATED / HUMAN_LIVE_VALIDATED.
Do not mark HUMAN_RING2_LIVE_VALIDATION=PASS until the valid-return path is proven.

## Known limitations

- No child-project execution by Wings4.
- No Ring3 automation.
- Human Ring2 live validation may still be pending after this build.
- Bounded on-demand Market Check uses Wings-held/fixture evidence only; it is not MARKET_MONITORING, RADAR, Ring3, or live market intelligence. Human-live validation for this bounded slice is recorded (DEC-W4-064, DEC-W4-067). MARKET_CHECK_RUNTIME_COMPLETE remains NO. HUMAN_PROVIDED remains sample/not production. EXTERNAL_CHECKED remains manual record pending / no live scan.
- W4P005/W4P006/W4P006A changes may remain uncommitted until authorized.
- Interactive functions must not be marked PASS from static/code presence alone.
