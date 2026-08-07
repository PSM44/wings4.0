# Wings4 Incremental Delivery Model

Status: ACTIVE
Authority: DEC-W4-052, DEC-W4-061, Q-075, Q-076, Q-083
Scope: Wings4 product deliveries to gerencia

## Two layers (do not conflate)

### Internal product increments (engineering)

| Increment | Focus | Status |
|---|---|---|
| Ring0 | Interactive actionable diagnosis | Committed baseline |
| Ring1 | Decision lifecycle + governed intervention package | Committed in Ring1/Ring2 baseline |
| Ring2 | Return verification (Wings4-local) | Committed in Ring1/Ring2 baseline |
| Later rings | Only after separate human authorization | Unauthorized |

Internal Rings are product-engineering increments. They are **not** automatically separate management deliveries to gerencia.

### Actual management deliveries (gerencia)

Management deliveries are cumulative live demonstrations until gerencia declares deploy readiness.

Each management delivery must:

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

## Management Delivery #1

`MANAGEMENT_DELIVERY_1` = one cumulative live demonstration of committed Ring0 + Ring1 + Ring2.

Management-facing story:

1. Wings understands a portfolio/project context.
2. Wings detects a material issue/opportunity.
3. Evidence is shown.
4. FACT / INFERENCE / RECOMMENDATION are distinguishable.
5. Internal/external alternatives are considered when materially relevant (MARKET_CHECK when applicable).
6. Pablo decides.
7. Wings derives the governed route.
8. Wings prepares the intervention package.
9. Return evidence is received.
10. Wings verifies that return within current Ring2 limits.
11. Limitations are stated accurately: current Ring2 is RETURN VERIFICATION, not independent child-state resynchronization.

### Management success questions

| ID | Question |
|---|---|
| G1 | Can the reviewer immediately understand what is happening? |
| G2 | Did Wings surface something costly to discover manually? |
| G3 | Could the issue be acted on primarily through Wings? |
| G4 | Is it clear what is fact, inference and recommendation? |
| G5 | Was the process faster/safer than direct manual coordination? |

## Live demo requirement

Every delivery to gerencia must include a live operable path with clear input → action → output.

## Deploy readiness

Gerencia declares readiness when the product is functionally operable by a non-development user with stability, real data and repeatability.

## Current mapping

| Layer | Item | Meaning |
|---|---|---|
| Internal increment | Ring0 / Ring1 / Ring2 | Committed cumulative product capability |
| Management delivery | MANAGEMENT_DELIVERY_1 | First actual gerencia demo of Ring0+Ring1+Ring2 |
| Later | Only after separate human authorization | Not authorized by this model alone |
