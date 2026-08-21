# Wings4 LangGraph adoption scorecard

SCORECARD_ID=W4_LANGGRAPH_ADOPTION
COMPARED_BASELINE=Accepted S2/S2.3 governed runtime plus DEC-W4-090 workflow foundation
LAB_PATH=EXPERIMENTS/LANGGRAPH_WINGS4_LAB
LANGGRAPH_VERSION=1.4.12
RETRIEVAL_DATE=2026-08-21
ADOPTION_AUTHORIZED=NO
FINAL_AUTHORITY=Pablo

This scorecard does not authorize adoption.

## Criteria

| CRITERION_ID | BASELINE | LAB_RESULT | EVIDENCE | STATUS | WEIGHT | NOTES |
|---|---|---|---|---|---|---|
| A_HUMAN_AUTHORITY_VISIBILITY | HUMAN and DEC-W4 outrank runtime | interrupt() pauses; HUMAN still outranks | SECURITY.AND.GOVERNANCE.md; DEC-W4-091 | PASS | HIGH | Mechanism ≠ authority |
| B_DETERMINISTIC_BEHAVIOR | S2 CLI deterministic | LAB_01 deterministic; LAB_02 bounded | tests | PASS | HIGH | No LLM in core tests |
| C_DURABLE_EXECUTION | Git + files are durable canon | MemorySaver is RAM-only | official persistence docs | FAIL | HIGH | Not production durability |
| D_CHECKPOINT_RECOVERY | Git/worktree gates | In-process resume works | LAB_03 test | PASS | MEDIUM | Lost on process restart |
| E_HUMAN_IN_THE_LOOP_QUALITY | Explicit human options in briefing | approve/edit/reject after interrupt | LAB_04 tests | PASS | HIGH | Side effects after approval |
| F_REPLAY_IDEMPOTENCY_SAFETY | S2 has no mutating apply path | applied flag skips second side effect | LAB_04 replay test | PASS | HIGH | Nodes restart before interrupt |
| G_STATE_TRANSPARENCY | Markdown briefing + BATON | getState + __interrupt__ | LAB_03 | PASS | MEDIUM | Lab-only state |
| H_TESTABILITY | 77 product tests | 16 lab tests | npm test | PASS | HIGH | node:test |
| I_OBSERVABILITY | stdout briefing | getState; no LangSmith required | README | PASS | LOW | Tracing optional and off |
| J_DEPENDENCY_COMPLEXITY | No root package.json | lab-local 22 packages | package.json | FAIL | HIGH | New stack vs current JS runtime |
| K_MAINTENANCE_COST | Small local runtime | LangGraph + core + zod | package-lock.json | FAIL | MEDIUM | Extra API surface |
| L_SECURITY_EXPOSURE | No LLM keys in S2 | Core lab needs no secrets | SECURITY.AND.GOVERNANCE.md | PASS | HIGH | Optional model path disabled |
| M_REPOSITORY_ISOLATION | Product has no lab import | isolation tests | tests/lab.test.js | PASS | HIGH | |
| N_PERFORMANCE | Not a latency product | Not measured | none | UNKNOWN | LOW | Do not invent numbers |
| O_FAILURE_RECOVERY | Fail-closed gates | LAB_02 fail-closed after 3 | tests | PASS | MEDIUM | Recursion still a risk if misused |
| P_PORTABILITY | Node stdlib runtime | Requires lab npm install | README | FAIL | MEDIUM | Extra install step |
| Q_VENDOR_FRAMEWORK_LOCK_IN | Project-local contracts | LangGraph-specific interrupt/Command | official docs | FAIL | HIGH | |
| R_LEARNING_VALUE | Workflow foundation docs | Six runnable exercises | LEARNING.ROADMAP.md | PASS | HIGH | Intended value of this lab |
| S_MEASURABLE_PRODUCT_VALUE | Accepted S2 briefing | No product capability added | DEC-W4-091 | FAIL | HIGH | Lab is not product delivery |
| T_MIGRATION_RISK | Keep S2 accepted | Replacing S2 would be high risk | this scorecard | FAIL | HIGH | Do not migrate now |

## Adoption gate

ALLOWED_RECOMMENDATIONS:

- ADOPT_FOR_BOUNDED_PRODUCT_PILOT
- CONTINUE_EXPERIMENT
- DEFER
- REJECT
- UNKNOWN_MORE_EVIDENCE_REQUIRED

SCORECARD_RECOMMENDATION=CONTINUE_EXPERIMENT

This recommendation is evidence for Pablo. It is not a product decision. Product adoption remains unauthorized. S2.4 remains a separate unauthorized product decision.
