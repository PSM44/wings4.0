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

Interactive claims must be classified separately. Bounded Market Check slice is LOGICALLY_TESTED and HUMAN_LIVE_VALIDATED (browser) for F-SM-001 and F-SM-002 UNKNOWN path. Not live market intelligence.

- [x] Market Check is invoked only on demand (Run Market Check).
- [x] Question is a governed select; no free-text question.
- [x] Result is management-readable (recommendation label, alternatives, confidence).
- [x] Alternatives are listed before relying on the recommendation.
- [x] Scope, authority, limits, and confidence are visible.
- [x] UNKNOWN is returned when evidence is missing (do not fabricate).
- [x] Limits include NOT_MARKET_MONITORING, NOT_RADAR, NOT_RING3.
- [x] No child-repository access; no live web scan.
- [x] Ring0/Ring1/Ring2 historical acceptance records are not rewritten.

| Field | Value |
|---|---|
| MARKET_CHECK_RUNTIME | BOUNDED_ON_DEMAND_SLICE |
| MARKET_CHECK_RUNTIME_SCOPE | BOUNDED_ON_DEMAND |
| MARKET_CHECK_LOGICAL_TEST | PASS (node market_check.logical.test.js) |
| MARKET_CHECK_HUMAN_LIVE_VALIDATION | PASS |
| UNKNOWN_PATH_BROWSER_VALIDATION | PASS |
| F-SM-001_BROWSER_VALIDATION | PASS |
| F-SM-002_UNKNOWN_BROWSER_VALIDATION | PASS |
| MARKET_CHECK_HUMAN_LIVE_VALIDATED | YES |
| MARKET_CHECK_EVIDENCE_HEAD | 5a6714db6e9392f0dab216cfa93e766061dedcd9 |
| MARKET_CHECK_BROWSER_METHOD | LOCAL_CHROME_CDP (Cursor browser MCP unavailable) |
| MARKET_CHECK_EVIDENCE_LIMIT | FIXTURE_OR_WINGS_HELD_ONLY; NOT_LIVE_MARKET_INTELLIGENCE |
| MARKET_CHECK_RUNTIME_COMPLETE | NO |
| MARKET_CHECK_COMPLETION_CRITERIA | DEFINED |
| MARKET_CHECK_EVIDENCE_LEVELS | WINGS_HELD / HUMAN_PROVIDED / EXTERNAL_CHECKED / UNKNOWN |
| MARKET_CHECK_INTEGRATE_WINNER | LOGICAL_F-MC-002 (not HUMAN_LIVE_VALIDATED) |
| MARKET_CHECK_BUILD_WINNER | LOGICAL_F-MC-001 (not HUMAN_LIVE_VALIDATED) |
| MARKET_CHECK_HUMAN_PROVIDED_PATH | SAMPLE_NOT_PRODUCTION |
| MARKET_CHECK_EXTERNAL_CHECKED_PATH | MANUAL_RECORD_PENDING |
| MARKET_MONITORING_IMPLEMENTED | NO |
| RADAR_IMPLEMENTED | NO |
| RING3_IMPLEMENTED | NO |
