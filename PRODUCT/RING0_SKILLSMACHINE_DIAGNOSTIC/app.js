(() => {
  const STORAGE_KEY = "wings4.ring0.skillsmachine.decisions.v1";
  const SCHEMA_VERSION = 2;
  const PRODUCT_VERSION = "RING0_RING1_E2";
  const DEFAULT_OWNER = "Pablo";
  const DEFAULT_TARGET_PROJECT = "SkillsMachine";
  const SOURCE_PROJECT = "Wings4.0";

  const VISIBLE_ACTIONS = {
    ACCEPT: "ACCEPT",
    REJECT: "REJECT",
    MODIFY: "MODIFY",
    POSTPONE: "POSTPONE",
    DEFER: "POSTPONE"
  };

  const ACTION_TO_FINDING_STATUS = {
    ACCEPT: "ACCEPTED",
    REJECT: "REJECTED",
    MODIFY: "MODIFIED",
    POSTPONE: "DEFERRED",
    DEFER: "DEFERRED"
  };

  const els = {
    projectCard: document.getElementById("project-card"),
    findingsList: document.getElementById("findings-list"),
    detailEmpty: document.getElementById("detail-empty"),
    detailBody: document.getElementById("detail-body"),
    stateView: document.getElementById("state-view"),
    statusLine: document.getElementById("status-line"),
    btnExport: document.getElementById("btn-export"),
    btnReset: document.getElementById("btn-reset"),
    wings4Summary: document.getElementById("wings4-summary")
  };

  let fixture = null;
  let selectedId = null;
  let storageAvailable = true;
  let memoryState = emptyState();

  function emptyState() {
    return {
      schema_version: SCHEMA_VERSION,
      product_version: PRODUCT_VERSION,
      decisions: {},
      updated_at: null
    };
  }

  function setStatus(msg, isError) {
    els.statusLine.textContent = msg || "";
    els.statusLine.classList.toggle("error", Boolean(isError));
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function nowIso() {
    return new Date().toISOString();
  }

  function normalizeAction(action) {
    if (action === "DEFER") return "POSTPONE";
    return action;
  }

  function visibleActionLabel(action) {
    return VISIBLE_ACTIONS[action] || action;
  }

  function statusLabel(raw) {
    const map = {
      OPEN: "Open",
      RESOLVED: "Resolved",
      ACCEPTED: "Accepted",
      REJECTED: "Rejected",
      MODIFIED: "Modified",
      DEFERRED: "Postponed",
      POSTPONED: "Postponed",
      DECIDED: "Decided",
      IN_ACTION: "In action",
      CLOSED: "Closed",
      REOPENED: "Reopened",
      HIGH: "High",
      MEDIUM: "Medium",
      LOW: "Low",
      CANONICAL_DERIVED: "Derived from canonical evidence",
      REPRESENTATIVE_NONCANONICAL: "Representative, non-canonical"
    };
    return map[raw] || raw;
  }

  function badgeClassForStatus(raw) {
    if (raw === "POSTPONED") return "DEFERRED";
    if (raw === "DECIDED" || raw === "IN_ACTION" || raw === "REOPENED") return "MODIFIED";
    if (raw === "CLOSED") return "RESOLVED";
    return raw || "OPEN";
  }

  function makeId(prefix) {
    return prefix + "-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
  }

  function defaultNextAction(action, status) {
    const a = normalizeAction(action);
    if (status === "CLOSED") return "No further Wings4 action required for this local decision.";
    if (status === "POSTPONED") return "Review later and record ACCEPT, REJECT or MODIFY.";
    if (a === "ACCEPT" || a === "MODIFY") return "Generate controlled intervention package for target ORCHESTRATOR.";
    if (a === "REJECT") return "Confirm rejection is final or reopen if circumstances change.";
    return "Record a human decision.";
  }

  function interventionEligible(decision) {
    if (!decision) return false;
    if (decision.status === "CLOSED") return false;
    const action = normalizeAction(decision.action);
    return action === "ACCEPT" || action === "MODIFY";
  }

  function probeStorage() {
    try {
      const probe = "__wings4_ring0_probe__";
      localStorage.setItem(probe, "1");
      localStorage.removeItem(probe);
      storageAvailable = true;
      return true;
    } catch (err) {
      storageAvailable = false;
      return false;
    }
  }

  function pushEvent(decision, eventType, note, actor) {
    if (!Array.isArray(decision.events)) decision.events = [];
    decision.events.push({
      event_id: makeId("EVT"),
      decision_id: decision.decision_id,
      finding_id: decision.finding_id,
      event_type: eventType,
      timestamp: nowIso(),
      actor: actor || DEFAULT_OWNER,
      note: note || ""
    });
  }

  function migrateDecision(raw, findingIdHint) {
    const action = normalizeAction(raw.action || "POSTPONE");
    const findingId = raw.finding_id || findingIdHint;
    const created = raw.created_at || raw.decided_at || nowIso();
    const updated = raw.updated_at || raw.decided_at || created;
    let status = raw.status;
    if (!status) {
      if (action === "POSTPONE") status = "POSTPONED";
      else if (action === "REJECT") status = "CLOSED";
      else status = "DECIDED";
    }
    const decision = {
      decision_id: raw.decision_id || makeId("DEC"),
      finding_id: findingId,
      title: raw.title || "",
      action,
      visible_action_label: raw.visible_action_label || visibleActionLabel(action),
      owner: raw.owner || DEFAULT_OWNER,
      status,
      created_at: created,
      updated_at: updated,
      next_action: raw.next_action || defaultNextAction(action, status),
      review_date: raw.review_date || "",
      rationale_or_modification: raw.rationale_or_modification || raw.note || "",
      note: raw.rationale_or_modification || raw.note || "",
      previous_state: raw.previous_state || null,
      new_state: raw.new_state || ACTION_TO_FINDING_STATUS[action] || null,
      decided_at: raw.decided_at || created,
      project_id: raw.project_id || DEFAULT_TARGET_PROJECT,
      target_project: raw.target_project || raw.project_id || DEFAULT_TARGET_PROJECT,
      source_data_class: raw.source_data_class || raw.data_class || null,
      data_class: raw.data_class || raw.source_data_class || null,
      recommendation_snapshot: raw.recommendation_snapshot || "",
      wings4_state_update: "LOCAL_PROTOTYPE_ONLY",
      analyzed_project_mutation: "NO",
      product_version: PRODUCT_VERSION,
      schema_version: SCHEMA_VERSION,
      events: Array.isArray(raw.events) ? raw.events.slice() : [],
      intervention: raw.intervention || null
    };
    if (!decision.events.length) {
      pushEvent(decision, "DECISION_RECORDED", "Migrated from Ring0 local state.", decision.owner);
    }
    return decision;
  }

  function normalizeState(parsed) {
    const state = emptyState();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return state;
    const decisionsIn = parsed.decisions && typeof parsed.decisions === "object" && !Array.isArray(parsed.decisions)
      ? parsed.decisions
      : {};
    Object.keys(decisionsIn).forEach((key) => {
      state.decisions[key] = migrateDecision(decisionsIn[key], key);
    });
    state.updated_at = parsed.updated_at || null;
    state.schema_version = SCHEMA_VERSION;
    state.product_version = PRODUCT_VERSION;
    return state;
  }

  function validateStateShape(state) {
    if (!state || typeof state !== "object") return "State root missing.";
    if (Number(state.schema_version) !== SCHEMA_VERSION && Number(state.schema_version) !== 1) {
      /* allow load then migrate */
    }
    if (!state.decisions || typeof state.decisions !== "object" || Array.isArray(state.decisions)) {
      return "Missing decisions object.";
    }
    return null;
  }

  function loadState() {
    if (!probeStorage()) {
      setStatus("Browser storage is unavailable. Decisions will work for this session only and will not persist.", true);
      return memoryState;
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        memoryState = emptyState();
        return memoryState;
      }
      const parsed = JSON.parse(raw);
      const invalid = validateStateShape(parsed);
      if (invalid) throw new Error(invalid);
      const version = Number(parsed.schema_version || 0);
      if (version && version > SCHEMA_VERSION) {
        setStatus("Stored state schema is newer than this prototype. Showing a fresh local state.", true);
        memoryState = emptyState();
        return memoryState;
      }
      memoryState = normalizeState(parsed);
      return memoryState;
    } catch (err) {
      setStatus("Local state was invalid and has been reset for this session.", true);
      memoryState = emptyState();
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (removeErr) {
        /* ignore */
      }
      return memoryState;
    }
  }

  function saveState(state) {
    state.schema_version = SCHEMA_VERSION;
    state.product_version = PRODUCT_VERSION;
    memoryState = state;
    if (storageAvailable) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (err) {
        storageAvailable = false;
        setStatus("Could not persist to browser storage. Continuing with in-memory state only.", true);
      }
    }
    renderState(state);
  }

  function renderState(state) {
    els.stateView.textContent = JSON.stringify(state, null, 2);
  }

  function getDecision(state, findingId) {
    return state.decisions[findingId] || null;
  }

  function effectiveFindingStatus(finding, state) {
    const d = getDecision(state, finding.finding_id);
    if (!d) return finding.status || "OPEN";
    if (d.status === "POSTPONED") return "DEFERRED";
    if (d.status === "CLOSED" && normalizeAction(d.action) === "REJECT") return "REJECTED";
    if (d.status === "CLOSED") return "RESOLVED";
    return ACTION_TO_FINDING_STATUS[normalizeAction(d.action)] || finding.status || "OPEN";
  }

  function renderWings4(w) {
    if (!w) return;
    els.wings4Summary.innerHTML = `
      <article><h3>Product</h3><p>${escapeHtml(w.product || "Wings4")}</p></article>
      <article><h3>Problem</h3><p>${escapeHtml(w.problem || "")}</p></article>
      <article><h3>How it works</h3><p>${escapeHtml(w.how_it_works || "")}</p></article>
    `;
  }

  function renderProject(project) {
    const dataClass = project.data_class || "";
    els.projectCard.innerHTML = `
      <div class="title">
        <strong>${escapeHtml(project.display_name || project.project_id)}</strong>
        <span class="badge ${escapeHtml(dataClass)}">${escapeHtml(statusLabel(dataClass))}</span>
      </div>
      <p><strong>ID:</strong> ${escapeHtml(project.project_id)}</p>
      <p>${escapeHtml(project.identity || "")}</p>
      <p><strong>Purpose:</strong> ${escapeHtml(project.purpose || "")}</p>
      <p class="meta-line"><strong>Portfolio role:</strong> ${escapeHtml(project.portfolio_role || "")}</p>
      <p class="meta-line"><strong>Product relationship:</strong> ${escapeHtml(project.wings4_relationship_product || "")}</p>
      <p class="meta-line"><strong>Project relationship:</strong> ${escapeHtml(project.wings4_relationship_project || "")}</p>
    `;
  }

  function renderFindings(findings, state) {
    els.findingsList.innerHTML = "";
    findings.forEach((f) => {
      const status = effectiveFindingStatus(f, state);
      const decision = getDecision(state, f.finding_id);
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "finding" + (selectedId === f.finding_id ? " active" : "");
      btn.setAttribute("aria-pressed", selectedId === f.finding_id ? "true" : "false");
      btn.setAttribute("aria-label", `Finding ${f.finding_id}: ${f.title}. Status ${statusLabel(status)}.`);
      btn.innerHTML = `
        <div class="title">${escapeHtml(f.title)}</div>
        <div class="meta-line badge-row">
          <span class="badge ${escapeHtml(badgeClassForStatus(status))}">${escapeHtml(statusLabel(status))}</span>
          ${decision ? `<span class="badge ${escapeHtml(badgeClassForStatus(decision.status))}">${escapeHtml(statusLabel(decision.status))}</span>` : ""}
          <span class="badge ${escapeHtml(f.severity || "")}">${escapeHtml(statusLabel(f.severity || ""))}</span>
          <span class="badge ${escapeHtml(f.data_class || "")}">${escapeHtml(statusLabel(f.data_class || ""))}</span>
        </div>
        <div class="meta-line">${escapeHtml(f.finding_id)}</div>
      `;
      btn.addEventListener("click", () => {
        selectedId = f.finding_id;
        renderAll();
      });
      li.appendChild(btn);
      els.findingsList.appendChild(li);
    });
  }

  function renderHistory(decision) {
    const events = (decision && decision.events) || [];
    if (!events.length) return "<p class='muted'>No events yet.</p>";
    return `<ol class="event-list">${events
      .slice()
      .sort((a, b) => String(a.timestamp).localeCompare(String(b.timestamp)))
      .map((e) => `
        <li>
          <strong>${escapeHtml(e.event_type)}</strong>
          <span class="muted"> · ${escapeHtml(e.timestamp)} · ${escapeHtml(e.actor || "")}</span>
          ${e.note ? `<div>${escapeHtml(e.note)}</div>` : ""}
        </li>
      `)
      .join("")}</ol>`;
  }

  function buildInterventionPackage(finding, decision) {
    const target = decision.target_project || DEFAULT_TARGET_PROJECT;
    const packageId = (decision.intervention && decision.intervention.package_id) || makeId("PKG");
    const generatedAt = nowIso();
    const evidenceLines = (finding.evidence || [])
      .map((e, i) => `  ${i + 1}. ${e.label || "Evidence"} | ${e.pointer || ""} | class=${finding.data_class || "UNKNOWN"}`)
      .join("\n");
    const scope = decision.action === "MODIFY"
      ? `Apply the Wings4 recommendation with the recorded modification/rationale: ${decision.rationale_or_modification || "(none)"}`
      : `Apply the Wings4 recommendation for finding ${finding.finding_id}: ${finding.recommendation || ""}`;
    const text = [
      "WINGS4_CONTROLLED_INTERVENTION_PACKAGE",
      "FORMAT=UTF8_TXT",
      `PACKAGE_ID=${packageId}`,
      `SOURCE_PROJECT=${SOURCE_PROJECT}`,
      `TARGET_PROJECT=${target}`,
      `FINDING_ID=${finding.finding_id}`,
      `DECISION_ID=${decision.decision_id}`,
      `GENERATED_AT=${generatedAt}`,
      "DESTINATION_ROLE=ORCHESTRATOR",
      "",
      "AUTHORITY",
      "NOT_EXECUTOR_AUTHORIZATION",
      "TARGET_PROJECT_RETAINS_LOCAL_AUTHORITY",
      "NO_CROSS_REPO_MUTATION",
      "HUMAN_DECISION_EXISTS=YES",
      "WINGS4_PREPARES_REQUEST=YES",
      "CHILD_PROJECT_MUTATION_BY_WINGS4=NO",
      "",
      "HUMAN_DECISION",
      `ACTION=${decision.action}`,
      `OWNER=${decision.owner}`,
      `STATUS=${decision.status}`,
      `RATIONALE_OR_MODIFICATION=${decision.rationale_or_modification || ""}`,
      `DECIDED_AT=${decision.decided_at || decision.created_at}`,
      "",
      "FINDING",
      `TITLE=${finding.title}`,
      `SUMMARY=${finding.summary || ""}`,
      `SEVERITY=${finding.severity || ""}`,
      `DATA_CLASS=${finding.data_class || ""}`,
      `RECOMMENDATION=${finding.recommendation || ""}`,
      "",
      "REQUESTED_OUTCOME_SCOPE",
      scope,
      "",
      "EVIDENCE_POINTERS",
      evidenceLines || "  (none)",
      "",
      "EXCLUSIONS",
      "- Do not treat this package as EXECUTOR authorization.",
      "- Do not authorize Wings4 to mutate the target repository.",
      "- Do not expand scope beyond the finding and recorded decision.",
      "- Do not implement unrelated dirty workstreams under this package.",
      "- Do not claim portfolio resynchronization until return evidence is reviewed by Wings4.",
      "",
      "ACCEPTANCE_CRITERIA",
      "- Target ORCHESTRATOR reviews package under local HUMAN/Q&A/governance.",
      "- Local decision is recorded before any EXECUTOR work.",
      "- Any accepted local change remains within package scope and exclusions.",
      "- Return evidence package is prepared for Wings4.",
      "",
      "REQUIRED_RETURN_EVIDENCE",
      "- project_id / root",
      "- HEAD_BEFORE / HEAD_AFTER",
      "- files_changed",
      "- validation_results",
      "- commit_hash (if any)",
      "- push_status",
      "- conflicts_or_blockers",
      "- resync_ready=YES|NO",
      "",
      "STOP_CONDITIONS",
      "- Canonical conflict unresolved",
      "- Unknown dirty worktree state",
      "- Scope expansion requested",
      "- Local authorization absent",
      "- Evidence-loss risk",
      "",
      "PRODUCT_VS_PROJECT_NOTE",
      "As products, Wings4 may optionally integrate with SkillsMachine for reusable Skills/GRC capabilities; that is not implemented by this package.",
      "As projects, Wings4 does not develop or modify SkillsMachine; SkillsMachine retains local implementation authority.",
      "",
      "END_OF_PACKAGE"
    ].join("\n");

    return {
      package_id: packageId,
      source_project: SOURCE_PROJECT,
      target_project: target,
      finding_id: finding.finding_id,
      decision_id: decision.decision_id,
      generated_at: generatedAt,
      destination_role: "ORCHESTRATOR",
      text,
      version: (decision.intervention && decision.intervention.version ? Number(decision.intervention.version) : 0) + 1
    };
  }

  function validateInterventionPackage(pkg, decision) {
    if (!pkg || !pkg.text) return "Package text missing.";
    const required = [
      "PACKAGE_ID=",
      "SOURCE_PROJECT=",
      "TARGET_PROJECT=",
      "FINDING_ID=",
      "DECISION_ID=",
      "NOT_EXECUTOR_AUTHORIZATION",
      "TARGET_PROJECT_RETAINS_LOCAL_AUTHORITY",
      "NO_CROSS_REPO_MUTATION",
      "REQUESTED_OUTCOME_SCOPE",
      "EVIDENCE_POINTERS",
      "EXCLUSIONS",
      "ACCEPTANCE_CRITERIA",
      "REQUIRED_RETURN_EVIDENCE",
      "STOP_CONDITIONS"
    ];
    for (let i = 0; i < required.length; i += 1) {
      if (!pkg.text.includes(required[i])) return "Missing section: " + required[i];
    }
    if (!interventionEligible(decision)) return "Decision is not eligible for intervention export.";
    return null;
  }

  function downloadText(filename, text) {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function safeFilenamePart(value) {
    return String(value || "x").replace(/[^A-Za-z0-9._-]+/g, "_").slice(0, 48);
  }

  function renderDetail(finding, state) {
    if (!finding) {
      els.detailEmpty.classList.remove("hidden");
      els.detailBody.classList.add("hidden");
      els.detailBody.innerHTML = "";
      return;
    }
    els.detailEmpty.classList.add("hidden");
    els.detailBody.classList.remove("hidden");
    const decision = getDecision(state, finding.finding_id);
    const status = effectiveFindingStatus(finding, state);
    const evidenceHtml = (finding.evidence || []).map((e) => `
      <div class="evidence-item">
        <div class="label">${escapeHtml(e.label || "Evidence")}</div>
        <div class="pointer">${escapeHtml(e.pointer || "")}</div>
        <p class="excerpt">${escapeHtml(e.excerpt || "")}</p>
      </div>
    `).join("");
    const alts = (finding.alternatives || []).map((a) => `<li>${escapeHtml(a)}</li>`).join("");
    const eligible = interventionEligible(decision);
    const canClose = decision && decision.status !== "CLOSED";
    const canReopen = decision && (decision.status === "CLOSED" || decision.status === "POSTPONED");

    let lifecycleHtml = `
      <div class="detail-block" id="lifecycle-panel">
        <h3>Decision lifecycle (Ring1)</h3>
        <p class="muted">No decision recorded yet. Use ACCEPT / REJECT / MODIFY / POSTPONE above.</p>
      </div>
    `;

    if (decision) {
      lifecycleHtml = `
        <div class="detail-block" id="lifecycle-panel">
          <h3>Decision lifecycle (Ring1)</h3>
          <p><strong>Decision ID:</strong> <code>${escapeHtml(decision.decision_id)}</code></p>
          <p class="meta-line">Status:
            <span class="badge ${escapeHtml(badgeClassForStatus(decision.status))}">${escapeHtml(statusLabel(decision.status))}</span>
            · Action: <strong>${escapeHtml(visibleActionLabel(decision.action))}</strong>
          </p>
          <label class="field-label" for="decision-owner">Owner</label>
          <input id="decision-owner" class="text-input" type="text" value="${escapeHtml(decision.owner || DEFAULT_OWNER)}" />
          <label class="field-label" for="decision-next-action">Next action</label>
          <input id="decision-next-action" class="text-input" type="text" value="${escapeHtml(decision.next_action || "")}" />
          <label class="field-label" for="decision-review-date">Review date (optional)</label>
          <input id="decision-review-date" class="text-input" type="date" value="${escapeHtml((decision.review_date || "").slice(0, 10))}" />
          <p class="meta-line">Created: ${escapeHtml(decision.created_at || "")}</p>
          <p class="meta-line">Updated: ${escapeHtml(decision.updated_at || "")}</p>
          <div class="decision-row lifecycle-actions">
            <button type="button" class="btn secondary" id="btn-save-lifecycle">Save lifecycle edits</button>
            <button type="button" class="btn ghost" id="btn-close-decision" ${canClose ? "" : "disabled"}>Close decision</button>
            <button type="button" class="btn ghost" id="btn-reopen-decision" ${canReopen ? "" : "disabled"}>Reopen decision</button>
          </div>
          <p class="decision-help">Closing tracks Wings4-local completion only. It does not claim the target project implemented the change.</p>
          <h4 class="subhead">History</h4>
          ${renderHistory(decision)}
        </div>
        <div class="detail-block" id="intervention-panel">
          <h3>Controlled intervention package (Ring1)</h3>
          <div class="authority-banner" role="note">
            <strong>NOT_EXECUTOR_AUTHORIZATION</strong><br />
            TARGET_PROJECT_RETAINS_LOCAL_AUTHORITY<br />
            NO_CROSS_REPO_MUTATION
          </div>
          <p class="meta-line">Eligibility:
            <span class="badge ${eligible ? "ACCEPTED" : "REJECTED"}">${eligible ? "Eligible (ACCEPT/MODIFY)" : "Not eligible by default"}</span>
          </p>
          <label class="field-label" for="target-project">Target project</label>
          <input id="target-project" class="text-input" type="text" value="${escapeHtml(decision.target_project || DEFAULT_TARGET_PROJECT)}" ${eligible ? "" : "disabled"} />
          <p class="decision-help">Pilot default is SkillsMachine. The field remains generic for later projects.</p>
          <div id="intervention-preview" class="package-preview ${eligible ? "" : "hidden"}" aria-live="polite"></div>
          <div class="decision-row">
            <button type="button" class="btn" id="btn-preview-package" ${eligible ? "" : "disabled"}>Preview package</button>
            <button type="button" class="btn accept" id="btn-export-package" ${eligible ? "" : "disabled"}>Export intervention TXT</button>
          </div>
          ${decision.intervention ? `<p class="meta-line">Last package: ${escapeHtml(decision.intervention.package_id)} @ ${escapeHtml(decision.intervention.generated_at)} (v${escapeHtml(String(decision.intervention.version || 1))})</p>` : ""}
        </div>
      `;
    }

    els.detailBody.innerHTML = `
      <div class="detail-block">
        <h3>Detail</h3>
        <p><strong>${escapeHtml(finding.finding_id)}</strong> — ${escapeHtml(finding.title)}</p>
        <p>${escapeHtml(finding.summary || "")}</p>
        <p class="meta-line">Current finding state:
          <span class="badge ${escapeHtml(badgeClassForStatus(status))}">${escapeHtml(statusLabel(status))}</span>
          <span class="badge ${escapeHtml(finding.severity || "")}">${escapeHtml(statusLabel(finding.severity || ""))}</span>
          <span class="badge ${escapeHtml(finding.data_class || "")}">${escapeHtml(statusLabel(finding.data_class || ""))}</span>
        </p>
      </div>
      <div class="detail-block">
        <h3>Evidence</h3>
        ${evidenceHtml || "<p class='muted'>No evidence recorded for this finding.</p>"}
      </div>
      <div class="detail-block">
        <h3>Impact</h3>
        <p>${escapeHtml(finding.impact || "")}</p>
      </div>
      <div class="detail-block">
        <h3>Alternatives</h3>
        <ul class="alt-list">${alts || "<li class='muted'>No alternatives listed.</li>"}</ul>
      </div>
      <div class="detail-block">
        <h3>Recommendation</h3>
        <p>${escapeHtml(finding.recommendation || "")}</p>
      </div>
      <div class="detail-block">
        <h3>Decision</h3>
        <p class="decision-help">Record a human decision for Wings4 local state. POSTPONE keeps the finding open so you can decide later; it is not a rejection.</p>
        <div class="decision-row" role="group" aria-label="Decision actions">
          <button type="button" class="btn accept" data-action="ACCEPT">ACCEPT</button>
          <button type="button" class="btn reject" data-action="REJECT">REJECT</button>
          <button type="button" class="btn modify" data-action="MODIFY">MODIFY</button>
          <button type="button" class="btn postpone" data-action="POSTPONE" title="Keep open and decide later">POSTPONE</button>
        </div>
        <label class="field-label" for="modify-note">Modification or rationale</label>
        <textarea id="modify-note" class="modify-box" placeholder="Required for MODIFY. Optional notes for ACCEPT, REJECT or POSTPONE.">${escapeHtml((decision && (decision.rationale_or_modification || decision.note)) || "")}</textarea>
        ${decision ? `<p class="meta-line">Last decision: ${escapeHtml(visibleActionLabel(decision.action))} @ ${escapeHtml(decision.decided_at || "")}</p>` : ""}
        <div id="decision-confirm" class="confirm-banner hidden" role="status"></div>
      </div>
      ${lifecycleHtml}
    `;

    els.detailBody.querySelectorAll("button[data-action]").forEach((btn) => {
      btn.addEventListener("click", () => decide(finding, btn.getAttribute("data-action")));
    });

    const saveBtn = document.getElementById("btn-save-lifecycle");
    if (saveBtn) saveBtn.addEventListener("click", () => saveLifecycleEdits(finding));
    const closeBtn = document.getElementById("btn-close-decision");
    if (closeBtn) closeBtn.addEventListener("click", () => closeDecision(finding));
    const reopenBtn = document.getElementById("btn-reopen-decision");
    if (reopenBtn) reopenBtn.addEventListener("click", () => reopenDecision(finding));
    const previewBtn = document.getElementById("btn-preview-package");
    if (previewBtn) previewBtn.addEventListener("click", () => previewIntervention(finding));
    const exportBtn = document.getElementById("btn-export-package");
    if (exportBtn) exportBtn.addEventListener("click", () => exportIntervention(finding));

    if (decision && eligible) {
      previewIntervention(finding, true);
    }
  }

  function decide(finding, action) {
    const noteEl = document.getElementById("modify-note");
    const note = ((noteEl && noteEl.value) || "").trim();
    const normalized = normalizeAction(action);
    if (normalized === "MODIFY" && !note) {
      setStatus("MODIFY requires an explicit modification or rationale before it can be recorded.", true);
      if (noteEl) noteEl.focus();
      return;
    }
    const state = loadState();
    const prior = getDecision(state, finding.finding_id);
    const previousState = prior ? prior.status : (finding.status || "OPEN");
    const decidedAt = nowIso();
    let status = "DECIDED";
    if (normalized === "POSTPONE") status = "POSTPONED";
    if (normalized === "REJECT") status = "CLOSED";

    const decision = migrateDecision({
      decision_id: (prior && prior.decision_id) || makeId("DEC"),
      finding_id: finding.finding_id,
      title: finding.title,
      action: normalized,
      owner: (prior && prior.owner) || DEFAULT_OWNER,
      status,
      created_at: (prior && prior.created_at) || decidedAt,
      updated_at: decidedAt,
      next_action: defaultNextAction(normalized, status),
      review_date: (prior && prior.review_date) || "",
      rationale_or_modification: note,
      previous_state: previousState,
      new_state: ACTION_TO_FINDING_STATUS[normalized],
      decided_at: decidedAt,
      project_id: fixture.project.project_id,
      target_project: (prior && prior.target_project) || fixture.project.project_id || DEFAULT_TARGET_PROJECT,
      source_data_class: finding.data_class,
      recommendation_snapshot: finding.recommendation,
      events: (prior && prior.events) || [],
      intervention: prior ? prior.intervention : null
    }, finding.finding_id);

    pushEvent(decision, "DECISION_RECORDED", `${visibleActionLabel(normalized)} recorded.`, decision.owner);
    if (normalized === "POSTPONE") {
      pushEvent(decision, "POSTPONED", "Finding kept open for a later decision.", decision.owner);
    }
    if (normalized === "REJECT") {
      pushEvent(decision, "REJECTED_AND_CLOSED", "Rejection recorded; intervention package blocked by default.", decision.owner);
    }

    state.decisions[finding.finding_id] = decision;
    state.updated_at = decidedAt;
    saveState(state);
    const confirm = `Recorded ${visibleActionLabel(normalized)} for ${finding.finding_id}. Lifecycle status: ${statusLabel(status)}. Time: ${decidedAt}.`;
    setStatus(confirm);
    renderAll();
    const banner = document.getElementById("decision-confirm");
    if (banner) {
      banner.textContent = confirm;
      banner.classList.remove("hidden");
    }
  }

  function saveLifecycleEdits(finding) {
    const state = loadState();
    const decision = getDecision(state, finding.finding_id);
    if (!decision) return;
    const ownerEl = document.getElementById("decision-owner");
    const nextEl = document.getElementById("decision-next-action");
    const reviewEl = document.getElementById("decision-review-date");
    const targetEl = document.getElementById("target-project");
    const owner = ((ownerEl && ownerEl.value) || "").trim() || DEFAULT_OWNER;
    const nextAction = ((nextEl && nextEl.value) || "").trim();
    if (!nextAction) {
      setStatus("Next action cannot be empty.", true);
      if (nextEl) nextEl.focus();
      return;
    }
    decision.owner = owner;
    decision.next_action = nextAction;
    decision.review_date = (reviewEl && reviewEl.value) || "";
    if (targetEl && !targetEl.disabled) {
      decision.target_project = (targetEl.value || "").trim() || DEFAULT_TARGET_PROJECT;
    }
    decision.updated_at = nowIso();
    pushEvent(decision, "LIFECYCLE_UPDATED", "Owner / next action / review date updated.", owner);
    state.decisions[finding.finding_id] = decision;
    state.updated_at = decision.updated_at;
    saveState(state);
    setStatus(`Lifecycle updated for ${decision.decision_id}.`);
    renderAll();
  }

  function closeDecision(finding) {
    const state = loadState();
    const decision = getDecision(state, finding.finding_id);
    if (!decision || decision.status === "CLOSED") return;
    decision.status = "CLOSED";
    decision.next_action = defaultNextAction(decision.action, "CLOSED");
    decision.updated_at = nowIso();
    pushEvent(decision, "DECISION_CLOSED", "Closed in Wings4 local tracking only; no child-project implementation claim.", decision.owner);
    state.decisions[finding.finding_id] = decision;
    state.updated_at = decision.updated_at;
    saveState(state);
    setStatus(`Decision ${decision.decision_id} closed locally.`);
    renderAll();
  }

  function reopenDecision(finding) {
    const state = loadState();
    const decision = getDecision(state, finding.finding_id);
    if (!decision) return;
    if (!(decision.status === "CLOSED" || decision.status === "POSTPONED")) return;
    const previous = decision.status;
    decision.status = "REOPENED";
    decision.next_action = "Record or confirm the next human decision action.";
    decision.updated_at = nowIso();
    pushEvent(decision, "DECISION_REOPENED", `Reopened from ${previous}; history preserved.`, decision.owner);
    state.decisions[finding.finding_id] = decision;
    state.updated_at = decision.updated_at;
    saveState(state);
    setStatus(`Decision ${decision.decision_id} reopened.`);
    renderAll();
  }

  function previewIntervention(finding, silent) {
    const state = loadState();
    const decision = getDecision(state, finding.finding_id);
    const preview = document.getElementById("intervention-preview");
    if (!decision || !preview) return;
    if (!interventionEligible(decision)) {
      if (!silent) setStatus("Intervention package is not eligible for this decision.", true);
      return;
    }
    const targetEl = document.getElementById("target-project");
    if (targetEl) decision.target_project = (targetEl.value || "").trim() || DEFAULT_TARGET_PROJECT;
    const pkg = buildInterventionPackage(finding, decision);
    const invalid = validateInterventionPackage(pkg, decision);
    if (invalid) {
      setStatus("Package validation failed: " + invalid, true);
      return;
    }
    preview.classList.remove("hidden");
    preview.textContent = pkg.text;
    if (!silent) setStatus("Intervention package preview ready. Export when satisfied.");
  }

  function exportIntervention(finding) {
    const state = loadState();
    const decision = getDecision(state, finding.finding_id);
    if (!decision || !interventionEligible(decision)) {
      setStatus("Intervention package is not eligible for this decision.", true);
      return;
    }
    const targetEl = document.getElementById("target-project");
    if (targetEl) decision.target_project = (targetEl.value || "").trim() || DEFAULT_TARGET_PROJECT;
    const pkg = buildInterventionPackage(finding, decision);
    const invalid = validateInterventionPackage(pkg, decision);
    if (invalid) {
      setStatus("Package validation failed: " + invalid, true);
      return;
    }
    const filename = `wings4-intervention-${safeFilenamePart(pkg.target_project)}-${safeFilenamePart(pkg.decision_id)}-${safeFilenamePart(pkg.package_id)}.txt`;
    downloadText(filename, pkg.text);
    decision.intervention = {
      package_id: pkg.package_id,
      target_project: pkg.target_project,
      generated_at: pkg.generated_at,
      version: pkg.version,
      destination_role: "ORCHESTRATOR",
      exported: true
    };
    decision.status = "IN_ACTION";
    decision.next_action = "Await target-project ORCHESTRATOR review and return evidence.";
    decision.updated_at = nowIso();
    pushEvent(decision, "INTERVENTION_PACKAGE_EXPORTED", `Exported ${pkg.package_id} for ${pkg.target_project}. Not implementation-complete.`, decision.owner);
    state.decisions[finding.finding_id] = decision;
    state.updated_at = decision.updated_at;
    saveState(state);
    setStatus(`Intervention package exported: ${filename}. SkillsMachine was not written.`);
    renderAll();
  }

  function buildExportPayload(state) {
    const decisions = {};
    Object.keys(state.decisions || {}).forEach((id) => {
      const d = state.decisions[id];
      const action = normalizeAction(d.action);
      decisions[id] = {
        schema_version: SCHEMA_VERSION,
        decision_id: d.decision_id,
        project_id: d.project_id || (fixture && fixture.project && fixture.project.project_id) || DEFAULT_TARGET_PROJECT,
        target_project: d.target_project || d.project_id || DEFAULT_TARGET_PROJECT,
        finding_id: d.finding_id || id,
        action,
        visible_action_label: d.visible_action_label || visibleActionLabel(action),
        owner: d.owner || DEFAULT_OWNER,
        status: d.status,
        next_action: d.next_action || "",
        review_date: d.review_date || "",
        rationale_or_modification: d.rationale_or_modification || d.note || "",
        previous_state: d.previous_state || null,
        new_state: d.new_state || ACTION_TO_FINDING_STATUS[action] || null,
        created_at: d.created_at || null,
        updated_at: d.updated_at || null,
        decided_at: d.decided_at || null,
        source_data_class: d.source_data_class || d.data_class || null,
        product_version: PRODUCT_VERSION,
        analyzed_project_mutation: "NO",
        events: d.events || [],
        intervention: d.intervention || null
      };
    });
    return {
      schema_version: SCHEMA_VERSION,
      export_id: "WINGS4_RING0_RING1_DECISION_EXPORT",
      product_version: PRODUCT_VERSION,
      ring0_marker: "RING0_SKILLSMACHINE_DIAGNOSTIC",
      ring1_marker: "RING1_DECISION_LIFECYCLE_AND_MIN_INTERVENTION",
      exported_at: nowIso(),
      project_id: fixture && fixture.project ? fixture.project.project_id : DEFAULT_TARGET_PROJECT,
      analyzed_project_mutation: "NO",
      storage: storageAvailable ? "localStorage+download" : "memory+download",
      decisions
    };
  }

  function validateExportPayload(payload) {
    if (!payload || typeof payload !== "object") return "Export root missing.";
    if (payload.schema_version == null) return "schema_version missing.";
    if (!payload.project_id) return "project_id missing.";
    const ids = Object.keys(payload.decisions || {});
    for (let i = 0; i < ids.length; i += 1) {
      const d = payload.decisions[ids[i]];
      const required = ["schema_version", "project_id", "finding_id", "action", "visible_action_label", "status", "decided_at", "source_data_class"];
      for (let r = 0; r < required.length; r += 1) {
        if (d[required[r]] == null || d[required[r]] === "") return `Decision ${ids[i]} missing ${required[r]}.`;
      }
      if (d.action === "MODIFY" && !(d.rationale_or_modification || "").trim()) {
        return `Decision ${ids[i]} MODIFY lacks rationale_or_modification.`;
      }
    }
    return null;
  }

  function exportJson() {
    if (!fixture) {
      setStatus("Cannot export until the fixture has loaded.", true);
      return;
    }
    const state = loadState();
    const payload = buildExportPayload(state);
    const invalid = validateExportPayload(payload);
    if (invalid) {
      setStatus("Export validation failed: " + invalid, true);
      return;
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wings4-ring0-ring1-decisions-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setStatus("Decision JSON exported. SkillsMachine was not written.");
  }

  function resetState() {
    const ok = window.confirm("Reset demo and clear all Ring0/Ring1 local decisions? This cannot be undone.");
    if (!ok) {
      setStatus("Reset cancelled.");
      return;
    }
    memoryState = emptyState();
    if (storageAvailable) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        setStatus("Could not clear browser storage, but in-memory state was reset.", true);
        renderState(memoryState);
        renderAll();
        return;
      }
    }
    renderState(memoryState);
    setStatus("Demo reset. Local Ring0/Ring1 decisions cleared. You can repeat the flow.");
    renderAll();
  }

  function validateFixture(data) {
    if (!data || typeof data !== "object") return "Fixture is not a JSON object.";
    if (!data.project || !data.project.project_id) return "Fixture is missing project.project_id.";
    if (!Array.isArray(data.findings) || data.findings.length < 3) {
      return "Fixture must include at least three findings.";
    }
    for (let i = 0; i < data.findings.length; i += 1) {
      const f = data.findings[i];
      const need = ["finding_id", "title", "status", "evidence", "impact", "alternatives", "recommendation", "data_class"];
      for (let n = 0; n < need.length; n += 1) {
        if (f[need[n]] == null || f[need[n]] === "") return `Finding ${f.finding_id || i} missing ${need[n]}.`;
      }
      if (!["CANONICAL_DERIVED", "REPRESENTATIVE_NONCANONICAL"].includes(f.data_class)) {
        return `Finding ${f.finding_id} has unknown data_class.`;
      }
    }
    return null;
  }

  function renderAll() {
    if (!fixture) return;
    const state = loadState();
    renderWings4(fixture.wings4);
    renderProject(fixture.project);
    renderFindings(fixture.findings || [], state);
    const selected = (fixture.findings || []).find((f) => f.finding_id === selectedId) || null;
    renderDetail(selected, state);
    renderState(state);
  }

  async function boot() {
    els.btnExport.addEventListener("click", exportJson);
    els.btnReset.addEventListener("click", resetState);
    probeStorage();
    try {
      const res = await fetch("skillsmachine.fixture.json", { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      const invalid = validateFixture(data);
      if (invalid) throw new Error(invalid);
      fixture = data;
      selectedId = fixture.findings[0].finding_id;
      renderAll();
      setStatus("Fixture loaded. Ring0 diagnosis and Ring1 lifecycle are ready.");
    } catch (err) {
      els.projectCard.innerHTML = `<p class="status error">Could not load the diagnostic fixture.</p><p class="muted">${escapeHtml(err.message)}</p>`;
      setStatus(
        "Could not load skillsmachine.fixture.json: " +
          err.message +
          ". If you opened the HTML via file://, start a local static server instead.",
        true
      );
    }
  }

  window.Wings4Ring0 = {
    validateExportPayload,
    validateFixture,
    buildExportPayload,
    validateInterventionPackage,
    SCHEMA_VERSION,
    PRODUCT_VERSION
  };

  boot();
})();
