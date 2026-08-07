# Wings4 Incremental Delivery Model

Status: ACTIVE
Authority: DEC-W4-052, Q-075, Q-076, Q-083
Scope: Wings4 product deliveries to gerencia

## Model

Deliveries are cumulative: E1, E2, … EN until gerencia declares deploy readiness.

Each delivery must:

1. briefly explain what Wings4 is, what problem it solves and how it works;
2. demonstrate real functionality live;
3. preserve and improve previously demonstrated functionality;
4. add new functionality, unless an authorized delivery focuses on refining an existing capability;
5. remain operable without requiring repository literacy from the demo operator.

## Functionality gate

The following alone do **not** count as product functionality:

- presentations;
- reports;
- BATON;
- RADAR;
- GRC;
- architecture documents;
- promises;
- planning.

## Live demo requirement

Every delivery to gerencia must include a live operable path with clear input → action → output.

## Deploy readiness

Gerencia declares readiness when the product is functionally operable by a non-development user with stability, real data and repeatability.

## Current mapping

| Delivery | Focus |
|---|---|
| E1 / Ring0 | Interactive actionable diagnosis of SkillsMachine (local prototype) |
| E2 / Ring1 | Decision lifecycle + minimal controlled intervention package export |
| Later | Only after separate human authorization |
