# Ring0 + Ring1 + Ring2 Acceptance Checklist

Scope: `PRODUCT/RING0_SKILLSMACHINE_DIAGNOSTIC/`
Authority: DEC-W4-049..060, Q-072..Q-094

## Validation rule (W4P006A/B)

Interactive features must not be marked PASS solely from static/code presence.
Classify each interactive capability separately:
IMPLEMENTED_STATICALLY / LOGICALLY_TESTED / BROWSER_AUTOMATED / HUMAN_LIVE_VALIDATED.

## Ring0 / Ring1 (must remain)

- [ ] Diagnosis, decisions, governed target, Decision note only, DOWNLOAD INTERVENTION PACKAGE.
- [ ] COPY PACKAGE adjacent; copy/download texts identical; ID unchanged by copy.
- [ ] Owner/Next Action/Review Date/Preview free-text target absent.
- [ ] Detail/package/Ring2 panels materially wider; paths/IDs wrap safely.
- [ ] `W4P005_HUMAN_LIVE_VALIDATION=PASS` preserved.

## Intervention package hardening (interactive)

- [ ] Real unique `INTERVENTION_PACKAGE_ID` (`W4IP-YYYYMMDD-NNNN`) assigned no later than PACKAGE_READY.
- [ ] Ready/exported package never shows `W4IP-PENDING-ASSIGNMENT`.
- [ ] Visible header: `WINGS4_CONTROLLED_INTERVENTION_PACKAGE ID: W4IP-...`
- [ ] Machine-readable `INTERVENTION_PACKAGE_ID=` remains in TXT body.
- [ ] Same ID in filename, history, and Ring2 correlation.
- [ ] SkillsMachine temp root metadata = `C:\Users\aazcl\Downloads\Temp.SkillMachine` when applicable.
- [ ] Temp policies: CLEAN_BEFORE_WRITE / FLAT_ONLY / UPLOAD_READY_ONLY / TARGET_UPLOAD_FILE_COUNT=1.
- [ ] Authority banners present.

## Ring2 (interactive)

- [ ] Usable **Return evidence** textarea.
- [ ] **IMPORT TXT** loads UTF-8 text into the textarea.
- [ ] **VERIFY RETURN** operates on textarea content.
- [ ] Accepts raw AI block and full TXT containing the block.
- [ ] Template placeholders (`<...>`) treated as missing/invalid evidence.
- [ ] Unknown package ID rejected without state corruption.
- [ ] Incomplete evidence cannot become PASS.
- [ ] Scope violation cannot become PASS.
- [ ] Unauthorized push cannot become PASS.
- [ ] Valid return reaches VERIFIED_PASS (human or browser proof required for live PASS).
- [ ] Verification result visible; retry after edit is safe.

## Record

| Field | Value |
|---|---|
| W4P005_HUMAN_LIVE_VALIDATION | PASS |
| HUMAN_RING2_NEGATIVE_PATHS | PASS |
| HUMAN_RING2_VALID_RETURN | PASS (browser automated) |
| HUMAN_RING2_LIVE_VALIDATION | PASS_WITH_BROWSER_VALID_RETURN |
| W4P006_STATIC_FALSE_POSITIVE | RECORDED (Q-093 / DEC-W4-059) |
| STATE_SCHEMA_VERSION | 4 |
| PACKAGE_SCHEMA_VERSION | 1.0 |
| COMMIT | NO until valid-return proof + gate |

## Market Check bounded runtime (additive; does not reopen MD1)

Interactive claims must be classified separately. Bounded Market Check slice is LOGICALLY_TESTED and HUMAN_LIVE_VALIDATED (browser) for F-SM-001, F-SM-002 UNKNOWN, F-MC-001 BUILD, and F-MC-002 INTEGRATE. Not live market intelligence.

- [x] Market Check is invoked only on demand (Run Market Check).
- [x] Question is a governed select; no free-text question.
- [x] Result is management-readable (recommendation label, alternatives, confidence).
- [x] Alternatives are listed before relying on the recommendation.
- [x] Scope, authority, limits, and confidence are visible.
- [x] UNKNOWN is returned when evidence is missing (do not fabricate).
- [x] Limits include NOT_MARKET_MONITORING, NOT_RADAR, NOT_RING3.
- [x] No child-repository access; no live web scan.
- [x] Ring0/Ring1/Ring2 historical acceptance records are not rewritten.
- [x] Manual evidence intake requires evidence_id/source/authority metadata; missing fields stay PENDING/UNKNOWN.

| Field | Value |
|---|---|
| MARKET_CHECK_RUNTIME | BOUNDED_ON_DEMAND_SLICE |
| MARKET_CHECK_RUNTIME_SCOPE | BOUNDED_ON_DEMAND |
| MARKET_CHECK_LOGICAL_TEST | PASS (node market_check.logical.test.js; CASES=31) |
| MARKET_CHECK_HUMAN_LIVE_VALIDATION | PASS |
| UNKNOWN_PATH_BROWSER_VALIDATION | PASS |
| F-SM-001_BROWSER_VALIDATION | PASS |
| F-SM-002_UNKNOWN_BROWSER_VALIDATION | PASS |
| MARKET_CHECK_HUMAN_LIVE_VALIDATED | YES |
| MARKET_CHECK_EVIDENCE_HEAD | 3063dad5bba4368cac4c3a2df6240e84eae3be01 |
| MARKET_CHECK_BROWSER_METHOD | LOCAL_CHROME_CDP (historical); CURSOR_BROWSER_MCP (DEC-W4-072) |
| MARKET_CHECK_EVIDENCE_LIMIT | FIXTURE_OR_WINGS_HELD_ONLY; NOT_LIVE_MARKET_INTELLIGENCE |
| MARKET_CHECK_RUNTIME_COMPLETE | YES (BOUNDED_RING0_RUNTIME_DEMO; DEC-W4-071) |
| MARKET_CHECK_COMPLETION_CRITERIA | DEFINED |
| MARKET_CHECK_EVIDENCE_LEVELS | WINGS_HELD / HUMAN_PROVIDED / EXTERNAL_CHECKED / UNKNOWN |
| MARKET_CHECK_INTEGRATE_WINNER | F-MC-002 HUMAN_LIVE_VALIDATED |
| MARKET_CHECK_BUILD_WINNER | F-MC-001 HUMAN_LIVE_VALIDATED |
| F-MC-001_BUILD_UI_VALIDATION | PASS |
| F-MC-002_INTEGRATE_UI_VALIDATION | PASS |
| MARKET_CHECK_HUMAN_PROVIDED_PATH | INTAKE_CONTRACT; SAMPLE_NOT_PRODUCTION |
| MARKET_CHECK_EXTERNAL_CHECKED_PATH | MANUAL_RECORD with source metadata, or PENDING |
| MARKET_CHECK_EVIDENCE_INTAKE_CONTRACT | MANUAL_ONLY (DEC-W4-068) |
| MARKET_CHECK_INTAKE_BADGE_SCOPED | YES (WINGS_HELD not labeled Valid manual intake) |
| MARKET_CHECK_INTAKE_LIVE_UI_VALIDATION | PASS |
| MARKET_CHECK_COMPLETION_READINESS_AUDIT | PASS (HEAD f59f06a) |
| MARKET_CHECK_COMPLETION_DECISION | A_BOUNDED_COMPLETE_ACCEPTED (DEC-W4-071) |
| MARKET_CHECK_BOUNDED_COMPLETE_LIVE_UI_VALIDATION | PASS (HEAD ad53a94; DEC-W4-072) |
| MARKET_CHECK_BOUNDED_COMPLETE_LIVE_UI_METHOD | CURSOR_BROWSER_MCP |
| MARKET_CHECK_BOUNDED_COMPLETE_LIVE_UI_SERVER | http://127.0.0.1:8787/ |
| MARKET_CHECK_RUNTIME_COMPLETE_UI_BADGE | NOT_VISIBLE (coherent; fixture ready; no incomplete display) |
| MARKET_CHECK_PRODUCT_BEHAVIOR_CHANGED | NO |
| GAP_01_STATUS_NOT_NAV | ADDRESSED_POST_MD1 (DEC-W4-073) |
| GAP_02_PATH_LIMIT_VISIBLE | ADDRESSED_POST_MD1 (DEC-W4-073) |
| GAP_03_FACT_FALLBACK | ADDRESSED_POST_MD1 (DEC-W4-074); F-SM-002/003/004 explicit fact/inference; no excerpt-as-Fact |
| GAP_03_CLASS_HELP | ADDRESSED_POST_MD1 (DEC-W4-074); OMISSION/OPPORTUNITY/DISCREPANCY help chips added |
| GAP_03_WHOAMI_AND_CLASS_CODES | DEFERRED (DEC-W4-055); codes not remapped; WHOAMI/HUMAN/ORCHESTRATOR kept literal |
| GAP_04_TRANSFER_HELP | ADDRESSED_POST_MD1 (DEC-W4-075); Act-panel note: Wings prepares the package and does not send it; human gives it to the destination project authority; return evidence pasted in Verification |
| GAP_04_COPY_LIFECYCLE | UNCHANGED; COPY does not set PACKAGE_EXPORTED or IN_ACTION |
| GAP_04_MANUAL_HANDOFF | REMAINS; no auto-delivery, no temp-path write, no live integration |
| MARKET_MONITORING_IMPLEMENTED | NO |
| RADAR_IMPLEMENTED | NO |
| RING3_IMPLEMENTED | NO |
