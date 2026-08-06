(() => {
  const STORAGE_KEY = "wings4.ring0.skillsmachine.decisions.v1";
  const SCHEMA_VERSION = 1;
  const PRODUCT_VERSION = "RING0_HARDENED_E1";
  const VISIBLE_ACTIONS = {
    ACCEPT: "ACCEPT",
    REJECT: "REJECT",
    MODIFY: "MODIFY",
    POSTPONE: "POSTPONE",
    DEFER: "POSTPONE"
  };
  const ACTION_TO_STATE = {
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
    return raw || "OPEN";
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
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("State root must be an object.");
      }
      if (!parsed.decisions || typeof parsed.decisions !== "object" || Array.isArray(parsed.decisions)) {
        throw new Error("Missing decisions object.");
      }
      const version = Number(parsed.schema_version || 0);
      if (version && version > SCHEMA_VERSION) {
        setStatus("Stored state schema is newer than this prototype. Showing a fresh local state.", true);
        memoryState = emptyState();
        return memoryState;
      }
      memoryState = {
        schema_version: SCHEMA_VERSION,
        product_version: parsed.product_version || PRODUCT_VERSION,
        decisions: parsed.decisions,
        updated_at: parsed.updated_at || null
      };
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

  function effectiveStatus(finding, state) {
    const d = state.decisions[finding.finding_id];
    if (!d) return finding.status || "OPEN";
    const action = normalizeAction(d.action);
    return ACTION_TO_STATE[action] || finding.status || "OPEN";
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
      const status = effectiveStatus(f, state);
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

  function renderDetail(finding, state) {
    if (!finding) {
      els.detailEmpty.classList.remove("hidden");
      els.detailBody.classList.add("hidden");
      els.detailBody.innerHTML = "";
      return;
    }
    els.detailEmpty.classList.add("hidden");
    els.detailBody.classList.remove("hidden");
    const prior = state.decisions[finding.finding_id];
    const status = effectiveStatus(finding, state);
    const evidenceHtml = (finding.evidence || []).map((e) => `
      <div class="evidence-item">
        <div class="label">${escapeHtml(e.label || "Evidence")}</div>
        <div class="pointer">${escapeHtml(e.pointer || "")}</div>
        <p class="excerpt">${escapeHtml(e.excerpt || "")}</p>
      </div>
    `).join("");
    const alts = (finding.alternatives || []).map((a) => `<li>${escapeHtml(a)}</li>`).join("");
    const priorAction = prior ? visibleActionLabel(prior.action) : "";

    els.detailBody.innerHTML = `
      <div class="detail-block">
        <h3>Detail</h3>
        <p><strong>${escapeHtml(finding.finding_id)}</strong> — ${escapeHtml(finding.title)}</p>
        <p>${escapeHtml(finding.summary || "")}</p>
        <p class="meta-line">Current state:
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
        <textarea id="modify-note" class="modify-box" placeholder="Required for MODIFY. Optional notes for ACCEPT, REJECT or POSTPONE.">${escapeHtml((prior && (prior.rationale_or_modification || prior.note)) || "")}</textarea>
        ${prior ? `<p class="meta-line">Last decision: ${escapeHtml(priorAction)} @ ${escapeHtml(prior.decided_at || "")}</p>` : ""}
        <div id="decision-confirm" class="confirm-banner hidden" role="status"></div>
      </div>
    `;

    els.detailBody.querySelectorAll("button[data-action]").forEach((btn) => {
      btn.addEventListener("click", () => decide(finding, btn.getAttribute("data-action")));
    });
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
    const previousState = effectiveStatus(finding, state);
    const newState = ACTION_TO_STATE[normalized] || previousState;
    const decidedAt = new Date().toISOString();
    state.decisions[finding.finding_id] = {
      finding_id: finding.finding_id,
      title: finding.title,
      action: normalized,
      visible_action_label: visibleActionLabel(normalized),
      rationale_or_modification: note,
      note,
      previous_state: previousState,
      new_state: newState,
      decided_at: decidedAt,
      project_id: fixture.project.project_id,
      source_data_class: finding.data_class,
      data_class: finding.data_class,
      recommendation_snapshot: finding.recommendation,
      wings4_state_update: "LOCAL_PROTOTYPE_ONLY",
      analyzed_project_mutation: "NO",
      product_version: PRODUCT_VERSION,
      schema_version: SCHEMA_VERSION
    };
    state.updated_at = decidedAt;
    saveState(state);
    const confirm = `Recorded ${visibleActionLabel(normalized)} for ${finding.finding_id}. State: ${statusLabel(previousState)} → ${statusLabel(newState)}. Time: ${decidedAt}.`;
    setStatus(confirm);
    renderAll();
    const banner = document.getElementById("decision-confirm");
    if (banner) {
      banner.textContent = confirm;
      banner.classList.remove("hidden");
    }
  }

  function buildExportPayload(state) {
    const decisions = {};
    Object.keys(state.decisions || {}).forEach((id) => {
      const d = state.decisions[id];
      const action = normalizeAction(d.action);
      decisions[id] = {
        schema_version: SCHEMA_VERSION,
        project_id: d.project_id || (fixture && fixture.project && fixture.project.project_id) || "SkillsMachine",
        finding_id: d.finding_id || id,
        action,
        visible_action_label: d.visible_action_label || visibleActionLabel(action),
        rationale_or_modification: d.rationale_or_modification || d.note || "",
        previous_state: d.previous_state || null,
        new_state: d.new_state || ACTION_TO_STATE[action] || null,
        decided_at: d.decided_at || null,
        source_data_class: d.source_data_class || d.data_class || null,
        product_version: d.product_version || PRODUCT_VERSION,
        analyzed_project_mutation: "NO"
      };
    });
    return {
      schema_version: SCHEMA_VERSION,
      export_id: "WINGS4_RING0_DECISION_EXPORT",
      product_version: PRODUCT_VERSION,
      ring0_marker: "RING0_SKILLSMACHINE_DIAGNOSTIC",
      exported_at: new Date().toISOString(),
      project_id: fixture && fixture.project ? fixture.project.project_id : "SkillsMachine",
      analyzed_project_mutation: "NO",
      storage: storageAvailable ? "localStorage+download" : "memory+download",
      decisions
    };
  }

  function validateExportPayload(payload) {
    if (!payload || typeof payload !== "object") return "Export root missing.";
    if (payload.schema_version == null) return "schema_version missing.";
    if (!payload.project_id) return "project_id missing.";
    if (!payload.product_version && !payload.ring0_marker) return "product_version/ring0_marker missing.";
    const ids = Object.keys(payload.decisions || {});
    for (let i = 0; i < ids.length; i += 1) {
      const d = payload.decisions[ids[i]];
      const required = [
        "schema_version",
        "project_id",
        "finding_id",
        "action",
        "visible_action_label",
        "previous_state",
        "new_state",
        "decided_at",
        "source_data_class"
      ];
      for (let r = 0; r < required.length; r += 1) {
        if (d[required[r]] == null || d[required[r]] === "") {
          return `Decision ${ids[i]} missing ${required[r]}.`;
        }
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
    a.download = `wings4-ring0-decisions-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setStatus("Decision JSON exported. SkillsMachine was not written.");
  }

  function resetState() {
    const ok = window.confirm("Reset demo and clear all Ring0 local decisions? This cannot be undone.");
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
    setStatus("Demo reset. Local Ring0 decisions cleared. You can repeat the flow.");
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
        if (f[need[n]] == null || f[need[n]] === "") {
          return `Finding ${f.finding_id || i} missing ${need[n]}.`;
        }
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
      setStatus("Fixture loaded. SkillsMachine is ready for diagnosis.");
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

  // Expose lightweight validators for static/local checks without browser automation.
  window.Wings4Ring0 = {
    validateExportPayload,
    validateFixture,
    buildExportPayload,
    SCHEMA_VERSION,
    PRODUCT_VERSION
  };

  boot();
})();
