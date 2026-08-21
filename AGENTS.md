# AGENTS.md

Canonical AI operating rules for Wings4.0:

1. Read HUMAN/HUMAN.WINGS4.md.
2. Read PORTFOLIO.PRINCIPLES.md.
3. Read PORTFOLIO.DECISION_LOG.md.
4. Treat Wings3.0 as read-only legacy unless explicit human authorization states otherwise.
5. Never move a project based only on structural similarity.
6. Never perform commit or push without explicit authorization.
7. Use C:\Users\aazcl\Downloads\T.Wings4.0 as the sole active Wings4 disposable staging folder (TEMP_ROOT). Before any temp output: delete all previous contents; keep the folder flat; create no subdirectories; leave only final upload-ready artifacts; consolidate into the fewest files; minimize total size; do not leave node_modules, package.json/package-lock.json, dependency trees, intermediate scripts, logs, or disposable test harnesses. Working dependencies must be created elsewhere or removed before completion. Retired path C:\Users\aazcl\Downloads\GlobalTempWings4 is not active staging.
8. Preserve local project canon and identify conflicts rather than silently resolving them.
9. Follow PORTFOLIO.ARCHITECTURE/WINGS4.HUMAN_AI.WORKFLOW.FOUNDATION.md for HUMAN → ORCHESTRATOR → COORDINATOR responsibility → EXECUTOR flow, identity/worktree gates, Q&A/prompt/loop/graph contracts, and TEMP taxonomy. That file does not replace PORTFOLIO.DECISION_LOG.md.
