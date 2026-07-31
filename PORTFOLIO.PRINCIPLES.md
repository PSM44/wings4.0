# Portfolio Principles

1. Human authority is final.
2. Wings4.0 listens, consolidates, compares, recommends, records, and verifies; it does not silently redefine project-local canon.
3. Each principal project, product, or system remains independently coherent and operable.
4. Integration is optional, explicit, and contractual.
5. `UNRELATED` is a valid relationship.
6. Local project HUMAN governs local meaning; Wings4.0 facilitates portfolio-level decisions.
7. Approved portfolio changes are implemented in each affected project under local governance.
8. One primary owner should exist for each major capability after explicit human review.
9. Build only after evaluating adopt, configure, integrate, extend, fork, and build options.
10. Open-source availability triggers review, not automatic retirement.
11. Governance must reduce ambiguity and duplication, not multiply artifacts.
12. Every material finding must distinguish fact, interpretation, confidence, recommendation, and human decision.
13. No physical migration occurs without path, dependency, rollback, and validation analysis.
14. Generated evidence does not replace human-readable canon.
15. Portfolio visualization follows validated governance data; it does not substitute for governance.
16. No new coordination infrastructure, schema, or Ring-style implementation protocol is authorized while a foundational pilot cycle (`PILOT-00x`) remains open. Meta-governance work is capped at one unresolved pilot at a time.
17. Wings4.0 applies PR-PORT-006 to its own tooling: mechanical verification logic (git state checks, schema validation, commit gating) must be consolidated into reusable, testable tooling rather than reauthored per minibattle.

## PR-PORT-006 — Do not reinvent the wheel

Status: ACTIVE
Scope: ALL_PROJECTS

Before recommending custom development, every project governed by Wings4.0 must evaluate, in order:

1. whether the required capability already exists;
2. whether a suitable free or open-source solution exists;
3. whether configuration of an existing solution is sufficient;
4. whether integration of existing solutions is sufficient;
5. whether an existing Skill, GRC or governed reusable component can solve the need;
6. whether only a demonstrated residual gap remains.

Custom development is justified only when the residual gap is real, strategically relevant, maintainable and explicitly approved.

This principle applies transversally to the portfolio. It is not specific to Brainy.
