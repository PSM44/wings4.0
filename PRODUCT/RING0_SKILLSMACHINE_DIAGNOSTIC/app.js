(() => {
  const STORAGE_KEY = "wings4.ring0.skillsmachine.decisions.v1";
  const SCHEMA_VERSION = 4;
  const PRODUCT_VERSION = "RING0_RING1_RING2_MC1";
  const PACKAGE_SCHEMA_VERSION = "1.0";
  const DEFAULT_OWNER = "Pablo";
  const SOURCE_PROJECT_ID = "Wings4.0";
  const SOURCE_PROJECT_LABEL = "Wings4";
  const DEFAULT_DESTINATION_ROLE = "ORCHESTRATOR";
  const COMMIT_POLICY = "NO_COMMIT_WITHOUT_TARGET_LOCAL_AUTHORIZATION";
  const PUSH_POLICY = "NO_PUSH_WITHOUT_TARGET_LOCAL_AUTHORIZATION";

  const VISIBLE_ACTIONS = { ACCEPT: "ACCEPT", REJECT: "REJECT", MODIFY: "MODIFY", POSTPONE: "POSTPONE", DEFER: "POSTPONE" };
  const ACTION_TO_FINDING_STATUS = { ACCEPT: "ACCEPTED", REJECT: "REJECTED", MODIFY: "MODIFIED", POSTPONE: "DEFERRED", DEFER: "DEFERRED" };

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
  let returnEvidenceDraft = {};
  let ring2TransientByFinding = {};
  let lastMarketQuestionByFinding = {};

  function emptyState() {
    return {
      schema_version: SCHEMA_VERSION,
      product_version: PRODUCT_VERSION,
      package_sequence_by_day: {},
      decisions: {},
      verifications: {},
      market_checks: {},
      updated_at: null
    };
  }

  function setStatus(msg, isError) {
    els.statusLine.textContent = msg || "";
    els.statusLine.classList.toggle("error", Boolean(isError));
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function nowIso() { return new Date().toISOString(); }

  function normalizeAction(action) { return action === "DEFER" ? "POSTPONE" : action; }
  function visibleActionLabel(action) { return VISIBLE_ACTIONS[action] || action; }

  function statusLabel(raw) {
    const map = {
      OPEN: "Open", RESOLVED: "Resolved", ACCEPTED: "Accepted", REJECTED: "Rejected", MODIFIED: "Modified",
      DEFERRED: "Postponed", POSTPONED: "Postponed", DECIDED: "Decided", IN_ACTION: "In action", CLOSED: "Closed",
      REOPENED: "Reopened", PACKAGE_READY: "Package ready", PACKAGE_EXPORTED: "Package exported",
      VERIFIED_PASS: "Verified pass", VERIFIED_PASS_WITH_GAP: "Verified pass with gap", RETURN_INCOMPLETE: "Return incomplete",
      SCOPE_CONFLICT: "Scope conflict", IDENTITY_MISMATCH: "Identity mismatch", UNVERIFIABLE: "Unverifiable", FAILED: "Failed",
      HIGH: "High", MEDIUM: "Medium", LOW: "Low", UNKNOWN: "Unknown",
      CANONICAL_DERIVED: "Wings-held evidence", REPRESENTATIVE_NONCANONICAL: "Illustrative"
    };
    return map[raw] || raw;
  }

  function findingDisplayTitle(finding) {
    return (finding && (finding.title || finding.technical_title)) || "";
  }

  const HELP_COPY = {
    FACT: "A Fact is something Wings can support with held evidence. It is not a recommendation.",
    INFERENCE: "An Inference is Wings' reasoned conclusion from the facts. It may be wrong; the human decides.",
    DUPLICATION: "Duplication means overlapping ownership or instruction sources for the same concern inside one project or across projects.",
    INTERFERENCE: "Interference means one workstream or change blocks, confuses or contaminates another.",
    "governed intervention": "A governed intervention is a controlled request to a destination project authority. Wings does not rewrite that project.",
    verification: "Verification checks returned evidence against the approved package. It is not yet an independent re-check of the destination repository.",
    W4IP: "W4IP is the Wings Intervention Package ID (W4IP-YYYYMMDD-NNNN). Returns must reuse the same ID.",
    "Market Check": "Market Check is an on-demand comparison of Wings-held options before building. It is not monitoring, not RADAR, and not an independent project re-check."
  };

  function helpControl(termKey) {
    const text = HELP_COPY[termKey] || "";
    const label = termKey;
    return `<button type="button" class="help-chip" data-help-key="${escapeHtml(termKey)}" title="${escapeHtml(text)}" aria-label="Help: ${escapeHtml(label)}" aria-expanded="false">?</button><span class="help-tip" hidden role="note">${escapeHtml(text)}</span>`;
  }

  function stageLabel(n, name) {
    return `<span class="stage-label"><span class="stage-num">${n}</span> ${escapeHtml(name)}</span>`;
  }

  function workflowNav(active) {
    const stages = [
      { id: "understand", n: "1", name: "Understand" },
      { id: "decide", n: "2", name: "Decide" },
      { id: "act", n: "3", name: "Act" },
      { id: "verify", n: "4", name: "Verify" }
    ];
    return `<nav class="workflow-stages" aria-label="Management workflow">${stages.map((s) =>
      `<span class="workflow-stage${s.id === active ? " is-active" : ""}">${s.n} ${escapeHtml(s.name)}</span>`
    ).join("")}</nav>`;
  }

  function findingFactText(finding) {
    if (finding && finding.fact) return finding.fact;
    if (finding && finding.evidence && finding.evidence[0] && finding.evidence[0].excerpt) return finding.evidence[0].excerpt;
    return "";
  }

  function findingInferenceText(finding) {
    if (finding && finding.inference) return finding.inference;
    return (finding && finding.summary) || "";
  }

  function compactJoin(items, maxItems) {
    const arr = (items || []).map((x) => String(x || "").trim()).filter(Boolean);
    if (!arr.length) return "None listed.";
    const max = maxItems == null ? 3 : maxItems;
    if (arr.length <= max) return arr.join(" ");
    return arr.slice(0, max).join(" ") + ` (+${arr.length - max} more in details)`;
  }

  function operatorInterventionSummary(route, finding, decision) {
    const requested = route && route.PURPOSE
      ? route.PURPOSE
      : (decision && normalizeAction(decision.action) === "MODIFY"
        ? "Apply the recorded modification under local project authority."
        : `Apply the Wings recommendation for ${(finding && finding.finding_id) || "this finding"} under local project authority.`);
    const limits = compactJoin(route && route.PROHIBITED_SCOPE, 3);
    const ret = compactJoin(route && route.RETURN_EVIDENCE, 4);
    return { requested_action: requested, limits: limits, return_required: ret };
  }

  function buildVerificationExplanation(overallResult, reasonSummary, actual, expected) {
    const pushYes = actual && String(actual.PUSH || "").toUpperCase() === "YES";
    const pushForbidden = String((expected && expected.push_policy) || PUSH_POLICY).includes("NO_PUSH");
    if (overallResult === "FAILED" && pushYes && pushForbidden) {
      return {
        error_code: "VR-PUSH-001",
        what_happened: "The returned evidence reports a push.",
        why_it_failed: "The intervention package does not authorize push without explicit local authorization.",
        corrective_action: "Resolve the unauthorized push condition in the target project and submit corrected return evidence."
      };
    }
    if (overallResult === "SCOPE_CONFLICT") {
      return {
        error_code: "VR-SCOPE-001",
        what_happened: "The return reports a scope problem against the approved package.",
        why_it_failed: reasonSummary || "Prohibited-scope or authorized-scope compliance failed.",
        corrective_action: "Correct out-of-scope work or return evidence that stays within package limits."
      };
    }
    if (overallResult === "IDENTITY_MISMATCH") {
      return {
        error_code: "VR-ID-001",
        what_happened: "The return could not be matched to the expected intervention identity.",
        why_it_failed: reasonSummary || "Package ID, project ID, or project root does not match.",
        corrective_action: "Use the correct W4IP package ID and governed destination, then verify again."
      };
    }
    if (overallResult === "RETURN_INCOMPLETE") {
      return {
        error_code: "VR-INCOMPLETE-001",
        what_happened: "Required return fields are missing or still template placeholders.",
        why_it_failed: reasonSummary || "The return AI block is incomplete.",
        corrective_action: "Complete all required return fields with real values, then verify again."
      };
    }
    if (overallResult === "UNVERIFIABLE") {
      return {
        error_code: "VR-UNVERIFIABLE-001",
        what_happened: "Wings could not treat the return as a clear pass or controlled failure.",
        why_it_failed: reasonSummary || "Return content is ambiguous or conflicted.",
        corrective_action: "Submit one unambiguous return AI block with clear status values."
      };
    }
    if (overallResult === "FAILED") {
      return {
        error_code: "VR-FAIL-001",
        what_happened: "The destination return reports failure.",
        why_it_failed: reasonSummary || "One or more required checks failed.",
        corrective_action: "Fix the reported failure in the destination project and submit corrected return evidence."
      };
    }
    return {
      error_code: "",
      what_happened: reasonSummary || "",
      why_it_failed: "",
      corrective_action: ""
    };
  }

  function renderVerificationExplanation(expl) {
    if (!expl || !expl.error_code) {
      return expl && expl.what_happened ? `<p>${escapeHtml(expl.what_happened)}</p>` : "";
    }
    return `<div class="verification-explain" data-error-code="${escapeHtml(expl.error_code)}">
      <p class="meta-line"><strong>ERROR_CODE:</strong> <code>${escapeHtml(expl.error_code)}</code> ${helpControl("verification")}</p>
      <p><strong>WHAT_HAPPENED:</strong> ${escapeHtml(expl.what_happened)}</p>
      <p><strong>WHY_IT_FAILED:</strong> ${escapeHtml(expl.why_it_failed)}</p>
      <p><strong>CORRECTIVE_ACTION:</strong> ${escapeHtml(expl.corrective_action)}</p>
    </div>`;
  }

  function bindHelpChips(root) {
    if (!root) return;
    root.querySelectorAll(".help-chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        const tip = btn.nextElementSibling;
        if (!tip || !tip.classList.contains("help-tip")) return;
        const open = tip.hasAttribute("hidden");
        tip.toggleAttribute("hidden", !open);
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
  }

  function destinationRoleLabel(role) {
    if (role === "ORCHESTRATOR") return "Project authority";
    if (role === "EXECUTOR") return "Local execution";
    return role || "";
  }

  function badgeClassForStatus(raw) {
    if (raw === "POSTPONED") return "DEFERRED";
    if (["DECIDED", "IN_ACTION", "REOPENED", "PACKAGE_READY", "VERIFIED_PASS_WITH_GAP", "UNVERIFIABLE"].includes(raw)) return "MODIFIED";
    if (["CLOSED", "PACKAGE_EXPORTED", "VERIFIED_PASS"].includes(raw)) return "RESOLVED";
    if (["SCOPE_CONFLICT", "IDENTITY_MISMATCH", "FAILED", "RETURN_INCOMPLETE"].includes(raw)) return "REJECTED";
    return raw || "OPEN";
  }

  function makeId(prefix) {
    return prefix + "-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
  }

  function yyyymmdd(d) {
    const x = d || new Date();
    return String(x.getFullYear()) + String(x.getMonth() + 1).padStart(2, "0") + String(x.getDate()).padStart(2, "0");
  }

  function sourceMeta() {
    const s = (fixture && fixture.source_project) || {};
    return {
      project_id: s.project_id || SOURCE_PROJECT_ID,
      display_name: s.display_name || SOURCE_PROJECT_LABEL,
      project_root: s.project_root || "C:\\01. GitHub\\Wings4.0",
      role: s.role || "PRODUCT_ORCHESTRATOR",
      temp_root: s.temp_root || "C:\\Users\\aazcl\\Downloads\\T.Wings4.0"
    };
  }

  function governedTargets() {
    const opts = (fixture && Array.isArray(fixture.governed_target_options)) ? fixture.governed_target_options.slice() : [];
    if (!opts.length && fixture && fixture.project) {
      opts.push({
        project_id: fixture.project.project_id,
        display_name: fixture.project.display_name || fixture.project.project_id,
        project_root: fixture.project.project_root || "",
        destination_role: DEFAULT_DESTINATION_ROLE,
        data_class: fixture.project.data_class || "CANONICAL_DERIVED"
      });
    }
    return opts;
  }

  function isGovernedTarget(projectId) {
    return governedTargets().some((t) => t.project_id === projectId);
  }

  function resolveTargetOption(finding, preferredId) {
    const opts = governedTargets();
    const preferred = preferredId || (finding && finding.target_project_id) || (fixture && fixture.project && fixture.project.project_id);
    return opts.find((t) => t.project_id === preferred) || opts[0] || null;
  }

  function deriveNextAction(action, status, routeStatus, verificationResult) {
    if (verificationResult === "VERIFIED_PASS" || verificationResult === "VERIFIED_PASS_WITH_GAP") {
      return "Return evidence verified. Independent re-check of the destination project is not available yet; await further human direction.";
    }
    if (verificationResult === "RETURN_INCOMPLETE" || verificationResult === "UNVERIFIABLE") {
      return "Request complete return evidence from the destination project authority using the same package ID.";
    }
    if (verificationResult === "IDENTITY_MISMATCH" || verificationResult === "SCOPE_CONFLICT" || verificationResult === "FAILED") {
      return "Resolve the verification conflict before further portfolio action.";
    }
    const a = normalizeAction(action);
    if (status === "CLOSED") return "No further Wings action required for this local decision.";
    if (status === "POSTPONED") return "Review later and record ACCEPT, REJECT or MODIFY.";
    if (status === "REOPENED") return "Confirm or record the next human decision action.";
    if (routeStatus === "PACKAGE_EXPORTED" || status === "IN_ACTION") {
      return "Await return evidence from the destination project, then verify it here.";
    }
    if (a === "ACCEPT" || a === "MODIFY") return "Copy or download the governed intervention package for the destination project.";
    if (a === "REJECT") return "Confirm rejection is final or reopen if circumstances change.";
    return "Record a human decision.";
  }

  function interventionEligible(decision) {
    if (!decision || decision.status === "CLOSED") return false;
    const a = normalizeAction(decision.action);
    return a === "ACCEPT" || a === "MODIFY";
  }

  function nextPackageId(state) {
    const day = yyyymmdd();
    if (!state.package_sequence_by_day || typeof state.package_sequence_by_day !== "object") {
      state.package_sequence_by_day = {};
    }
    const next = Number(state.package_sequence_by_day[day] || 0) + 1;
    state.package_sequence_by_day[day] = next;
    const id = "W4IP-" + day + "-" + String(next).padStart(4, "0");
    const used = Object.keys(state.decisions || {}).some((k) => {
      const d = state.decisions[k];
      return d && d.intervention && d.intervention.intervention_package_id === id;
    });
    if (used) return nextPackageId(state);
    return id;
  }

  function isPendingPackageId(id) {
    const s = String(id || "");
    return !s || s === "W4IP-PENDING-ASSIGNMENT" || s.indexOf("PENDING") >= 0;
  }

  function isValidPackageIdPattern(id) {
    return /^W4IP-\d{8}-\d{4}$/.test(String(id || ""));
  }

  function isTemplateValue(value) {
    const s = String(value == null ? "" : value).trim();
    if (!s) return true;
    // Angle-bracket placeholders from package templates, including enums and <n>.
    if (/^<[^>]*>$/.test(s)) return true;
    if (s.indexOf("<") === 0 && s.indexOf(">") > 0) return true;
    if (s.indexOf("|") >= 0 && /<(PASS|YES|NO|FAIL|n|hash|path|compact)/i.test(s)) return true;
    return false;
  }

  function isMissingOrTemplate(value) {
    return value == null || String(value).trim() === "" || isTemplateValue(value);
  }

  function displayEvidenceValue(value) {
    if (isMissingOrTemplate(value)) return "(missing / template — not real evidence)";
    return String(value);
  }

  function ensurePackageIdentity(state, finding, decision) {
    if (!state || !finding || !decision || !interventionEligible(decision) || !decision.route) return null;
    const existing = decision.intervention && decision.intervention.intervention_package_id;
    if (existing && !isPendingPackageId(existing) && isValidPackageIdPattern(existing)) {
      return existing;
    }
    const packageId = nextPackageId(state);
    const route = decision.route;
    const priorVersion = decision.intervention && decision.intervention.version
      ? Number(decision.intervention.version)
      : 0;
    decision.intervention = {
      intervention_package_id: packageId,
      package_schema_version: PACKAGE_SCHEMA_VERSION,
      target_project: route.TARGET_PROJECT,
      target_root: route.TARGET_ROOT,
      source_project: route.SOURCE_PROJECT,
      source_root: route.SOURCE_ROOT,
      generated_at: nowIso(),
      version: priorVersion + 1,
      destination_role: route.DESTINATION_ROLE,
      route_id: route.route_id,
      exported: Boolean(decision.intervention && decision.intervention.exported)
    };
    if (route.EXECUTION_STATUS !== "PACKAGE_EXPORTED") {
      route.EXECUTION_STATUS = "PACKAGE_READY";
    }
    decision.route = route;
    decision.next_action = deriveNextAction(
      decision.action,
      decision.status,
      route.EXECUTION_STATUS,
      decision.verification && decision.verification.overall_result
    );
    pushEvent(decision, "INTERVENTION_PACKAGE_ID_ASSIGNED", "Assigned persistent package ID " + packageId + ".", DEFAULT_OWNER);
    return packageId;
  }

  function ensureReadyPackage(finding, decision, state) {
    const ensured = ensureRoute(finding, decision);
    if (ensured.error) return ensured;
    const before = decision.intervention && decision.intervention.intervention_package_id;
    const packageId = ensurePackageIdentity(state, finding, decision);
    if (!packageId || isPendingPackageId(packageId)) {
      return { error: "Failed to assign a persistent INTERVENTION_PACKAGE_ID." };
    }
    return {
      route: decision.route,
      targetOpt: ensured.targetOpt,
      packageId,
      identityAssigned: before !== packageId
    };
  }

  function buildRoute(finding, decision, targetOpt, executionStatus) {
    const src = sourceMeta();
    const destination = targetOpt.project_id;
    const role = targetOpt.destination_role || DEFAULT_DESTINATION_ROLE;
    const action = normalizeAction(decision.action);
    const purpose = action === "MODIFY"
      ? `Controlled request for ${finding.finding_id}: apply the recommendation with the recorded modification.`
      : `Controlled request for ${finding.finding_id}: apply the Wings recommendation under local project authority.`;
    const temp = targetOpt.temp_contract || null;
    const routeId = ["RTE", src.project_id, destination, finding.finding_id, decision.decision_id].join("-").replace(/[^A-Za-z0-9._-]+/g, "_");
    const techTitle = finding.technical_title || finding.title;
    return {
      route_id: routeId,
      SOURCE: src.display_name,
      SOURCE_PROJECT: src.project_id,
      SOURCE_ROOT: src.project_root,
      SOURCE_ROLE: src.role,
      DESTINATION: destination,
      TARGET_PROJECT: destination,
      TARGET_ROOT: targetOpt.project_root || "",
      DESTINATION_ROLE: role,
      PURPOSE: purpose,
      AUTHORIZED_SCOPE: [
        `Evaluate finding ${finding.finding_id} (${techTitle}).`,
        `Respect recorded human decision ${action}.`,
        action === "MODIFY"
          ? `Apply modification note: ${decision.rationale_or_modification || "(required)"}`
          : `Apply recommendation: ${finding.recommendation || ""}`,
        `Respond via ${role} under ${destination} local governance.`
      ],
      PROHIBITED_SCOPE: [
        "Do not treat this package as EXECUTOR authorization.",
        "Do not authorize Wings4 to mutate the target repository.",
        "Do not expand scope beyond the finding and recorded decision.",
        "Do not implement unrelated dirty workstreams under this package.",
        "Do not claim portfolio resynchronization until Wings4 reviews return evidence."
      ],
      INPUT_EVIDENCE: (finding.evidence || []).map((e) => ({
        label: e.label || "Evidence",
        pointer: e.pointer || "",
        data_class: finding.data_class || "UNKNOWN"
      })),
      EXPECTED_OUTPUT: [
        "Local ORCHESTRATOR review recorded under destination governance.",
        "Decision whether to accept, modify locally, reject or defer under destination authority.",
        "If local work proceeds, changes remain within authorized scope and exclusions.",
        "One compact return file/AI block using the same INTERVENTION_PACKAGE_ID."
      ],
      RETURN_EVIDENCE: [
        "project_id / root",
        "HEAD_BEFORE / HEAD_AFTER",
        "files_changed",
        "validation_results",
        "commit_hash (if any)",
        "push_status",
        "conflicts_or_blockers",
        "resync_ready=YES|NO",
        "exact return AI block with same INTERVENTION_PACKAGE_ID"
      ],
      AUTHORITY_BOUNDARY: [
        "NOT_EXECUTOR_AUTHORIZATION",
        "TARGET_PROJECT_RETAINS_LOCAL_AUTHORITY",
        "NO_CROSS_REPO_MUTATION_BY_WINGS4"
      ],
      EXECUTION_STATUS: executionStatus || "PACKAGE_READY",
      COMMIT_POLICY,
      PUSH_POLICY,
      TEMP_CONTRACT: temp,
      PATHS_ARE_METADATA_ONLY: "YES"
    };
  }

  function validateRoute(route, decision) {
    if (!route) return "Route missing.";
    const required = [
      "route_id", "SOURCE_PROJECT", "SOURCE_ROOT", "TARGET_PROJECT", "TARGET_ROOT", "DESTINATION_ROLE",
      "PURPOSE", "AUTHORIZED_SCOPE", "PROHIBITED_SCOPE", "INPUT_EVIDENCE", "EXPECTED_OUTPUT",
      "RETURN_EVIDENCE", "AUTHORITY_BOUNDARY", "EXECUTION_STATUS"
    ];
    for (let i = 0; i < required.length; i += 1) {
      if (route[required[i]] == null || route[required[i]] === "") return "Route missing " + required[i];
    }
    if (!isGovernedTarget(route.TARGET_PROJECT || route.DESTINATION)) return "Destination is outside governed target options.";
    if (!interventionEligible(decision)) return "Decision is not intervention-eligible.";
    if (!(route.AUTHORITY_BOUNDARY || []).includes("NOT_EXECUTOR_AUTHORIZATION")) return "Authority boundary incomplete.";
    return null;
  }

  function returnAiBlockTemplate(packageId) {
    return [
      "---AI_START---",
      "INTERVENTION_PACKAGE_ID=" + packageId,
      "OVERALL_STATUS=<PASS|PASS_WITH_GAP|BLOCKED|FAIL>",
      "PROJECT_ID=<target project id>",
      "PROJECT_ROOT=<target root>",
      "BRANCH=<branch>",
      "HEAD_BEFORE=<hash>",
      "HEAD_AFTER=<hash>",
      "WORKTREE_CLEAN_FINAL=<YES|NO>",
      "INDEX_CLEAN_FINAL=<YES|NO>",
      "FILES_CHANGED=<compact value>",
      "AUTHORIZED_SCOPE_COMPLIANCE=<PASS|PASS_WITH_GAP|FAIL>",
      "PROHIBITED_SCOPE_VIOLATION=<YES|NO>",
      "EXPECTED_OUTPUT_STATUS=<PASS|PASS_WITH_GAP|FAIL|NOT_APPLICABLE>",
      "RETURN_EVIDENCE_STATUS=<PASS|PASS_WITH_GAP|FAIL>",
      "CANONICAL_CONFLICT_COUNT=<n>",
      "COMMIT=<hash|NO|NOT_REQUIRED>",
      "PUSH=<YES|NO>",
      "RESYNC_READY=<YES|NO>",
      "RETURN_EVIDENCE_FILE=<path|NONE>",
      "NEXT_ACTION=<compact next action>",
      "---AI_END---"
    ].join("\n");
  }

  function serializePackage(finding, decision, route, packageId) {
    if (isPendingPackageId(packageId) || !isValidPackageIdPattern(packageId)) {
      throw new Error("Refusing to serialize package without a real INTERVENTION_PACKAGE_ID.");
    }
    const temp = route.TEMP_CONTRACT;
    const generatedAt = (decision.intervention && decision.intervention.generated_at) || nowIso();
    if (decision.intervention && !decision.intervention.generated_at) {
      decision.intervention.generated_at = generatedAt;
    }
    const evidenceLines = (route.INPUT_EVIDENCE || [])
      .map((e, i) => `  ${i + 1}. ${e.label} | ${e.pointer} | class=${e.data_class}`)
      .join("\n");
    const lines = [
      "WINGS4_CONTROLLED_INTERVENTION_PACKAGE ID: " + packageId,
      "FORMAT=UTF8_TXT",
      "PACKAGE_SCHEMA_VERSION=" + PACKAGE_SCHEMA_VERSION,
      "INTERVENTION_PACKAGE_ID=" + packageId,
      "ROUTE_ID=" + route.route_id,
      "GENERATED_AT=" + generatedAt,
      "NEXT_RETURN_TARGET=Wings4 ORCHESTRATOR",
      "",
      "IDENTITY",
      "SOURCE_PROJECT=" + route.SOURCE_PROJECT,
      "SOURCE_ROOT=" + route.SOURCE_ROOT,
      "SOURCE_ROLE=" + route.SOURCE_ROLE,
      "TARGET_PROJECT=" + route.TARGET_PROJECT,
      "TARGET_ROOT=" + route.TARGET_ROOT,
      "DESTINATION_ROLE=" + route.DESTINATION_ROLE,
      "FINDING_ID=" + finding.finding_id,
      "DECISION_ID=" + decision.decision_id,
      "PATHS_ARE_METADATA_ONLY=YES",
      "PATHS_DO_NOT_AUTHORIZE_READ_OR_MUTATION=YES",
      "",
      "AUTHORITY",
      ...(route.AUTHORITY_BOUNDARY || []),
      "HUMAN_DECISION_EXISTS=YES",
      "WINGS4_PREPARES_REQUEST=YES",
      "CHILD_PROJECT_MUTATION_BY_WINGS4=NO",
      "COMMIT_POLICY=" + route.COMMIT_POLICY,
      "PUSH_POLICY=" + route.PUSH_POLICY,
      "",
      "HUMAN_DECISION",
      "ACTION=" + decision.action,
      "STATUS=" + decision.status,
      "DECISION_NOTE=" + (decision.rationale_or_modification || ""),
      "DECIDED_AT=" + (decision.decided_at || decision.created_at),
      "",
      "FINDING",
      "TITLE=" + (finding.technical_title || finding.title || ""),
      "SUMMARY=" + (finding.summary || ""),
      "DATA_CLASS=" + (finding.data_class || ""),
      "RECOMMENDATION=" + (finding.recommendation || ""),
      "",
      "GOVERNED_ROUTE",
      "PURPOSE=" + route.PURPOSE,
      "EXECUTION_STATUS=" + route.EXECUTION_STATUS,
      "",
      "AUTHORIZED_SCOPE",
      ...(route.AUTHORIZED_SCOPE || []).map((s) => "- " + s),
      "",
      "PROHIBITED_SCOPE",
      ...(route.PROHIBITED_SCOPE || []).map((s) => "- " + s),
      "",
      "INPUT_EVIDENCE",
      evidenceLines || "  (none)",
      "",
      "EXPECTED_OUTPUT",
      ...(route.EXPECTED_OUTPUT || []).map((s) => "- " + s),
      "",
      "REQUIRED_RETURN_EVIDENCE",
      ...(route.RETURN_EVIDENCE || []).map((s) => "- " + s),
      "",
      "RETURN_FORMAT",
      "PREFERRED_RETURN=ONE_CONSOLIDATED_FILE_OR_PASTEABLE_AI_BLOCK",
      "TARGET_UPLOAD_FILE_COUNT=1",
      "MINIMIZE_FILE_COUNT=YES",
      "MINIMIZE_FILE_SIZE=YES",
      "MINIMIZE_TOTAL_SIZE=YES",
      "REQUIRED_AI_BLOCK=YES",
      "RETURN_SAME_PACKAGE_ID_REQUIRED=YES",
      "",
      "REQUIRED_RETURN_AI_BLOCK_TEMPLATE",
      returnAiBlockTemplate(packageId),
      ""
    ];
    if (temp && temp.applicable) {
      const tempRoot = temp.temp_root == null || temp.temp_root === ""
        ? "DESTINATION_LOCAL_DISPOSABLE_STAGING"
        : temp.temp_root;
      lines.push(
        "TEMP_CONTRACT",
        "TEMP_APPLICABLE=YES",
        "TEMP_ROOT=" + tempRoot,
        "TEMP_ROOT_SEMANTICS=" + (temp.temp_root_semantics || "Metadata only; Wings4 does not access or mutate this path."),
        "TEMP_METADATA_DOES_NOT_AUTHORIZE_WINGS4_ACCESS=YES",
        "TEMP_CLEAN_BEFORE_WRITE=" + (temp.clean_before_write ? "YES" : "NO"),
        "TEMP_FLAT_ONLY=" + (temp.flat_only ? "YES" : "NO"),
        "UPLOAD_READY_ONLY=" + (temp.upload_ready_only ? "YES" : "NO"),
        "MINIMIZE_FILE_COUNT=" + (temp.minimize_file_count ? "YES" : "NO"),
        "MINIMIZE_FILE_SIZE=" + (temp.minimize_file_size ? "YES" : "NO"),
        "MINIMIZE_TOTAL_SIZE=" + (temp.minimize_total_size ? "YES" : "NO"),
        "TARGET_UPLOAD_FILE_COUNT=" + String(temp.target_upload_file_count == null ? 1 : temp.target_upload_file_count),
        ""
      );
    } else {
      lines.push("TEMP_CONTRACT", "TEMP_APPLICABLE=NO", "");
    }
    lines.push(
      "STOP_CONDITIONS",
      "- Canonical conflict unresolved",
      "- Unknown dirty worktree state",
      "- Scope expansion requested",
      "- Local authorization absent",
      "- Evidence-loss risk",
      "- INTERVENTION_PACKAGE_ID missing from return",
      "",
      "PRODUCT_VS_PROJECT_NOTE",
      "As products, Wings4 may optionally integrate with SkillsMachine for reusable Skills/GRC capabilities; that is not implemented by this package.",
      "As projects, Wings4 does not develop or modify SkillsMachine; SkillsMachine retains local implementation authority.",
      "",
      "END_OF_PACKAGE"
    );
    return lines.join("\n");
  }

  function validatePackageText(text, route, packageId) {
    if (isPendingPackageId(packageId) || !isValidPackageIdPattern(packageId)) {
      return "Package ID is not a real assigned W4IP identity.";
    }
    const required = [
      "WINGS4_CONTROLLED_INTERVENTION_PACKAGE ID: " + packageId,
      "PACKAGE_SCHEMA_VERSION=", "INTERVENTION_PACKAGE_ID=" + packageId, "SOURCE_PROJECT=", "SOURCE_ROOT=",
      "TARGET_PROJECT=", "TARGET_ROOT=", "DESTINATION_ROLE=", "NOT_EXECUTOR_AUTHORIZATION",
      "TARGET_PROJECT_RETAINS_LOCAL_AUTHORITY", "NO_CROSS_REPO_MUTATION_BY_WINGS4",
      "AUTHORIZED_SCOPE", "PROHIBITED_SCOPE", "REQUIRED_RETURN_EVIDENCE", "REQUIRED_RETURN_AI_BLOCK_TEMPLATE",
      "---AI_START---", "---AI_END---", "RETURN_SAME_PACKAGE_ID_REQUIRED=YES", "MINIMIZE_FILE_COUNT=YES"
    ];
    for (let i = 0; i < required.length; i += 1) {
      if (!text.includes(required[i])) return "Missing package section: " + required[i];
    }
    if (text.includes("W4IP-PENDING-ASSIGNMENT")) return "Pending package ID leaked into ready/exported package text.";
    if (!isGovernedTarget(route.TARGET_PROJECT || route.DESTINATION)) return "Arbitrary destination blocked.";
    return null;
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
    const targetOpt = resolveTargetOption({ finding_id: findingId, target_project_id: raw.target_project }, raw.target_project);
    const decision = {
      decision_id: raw.decision_id || makeId("DEC"),
      finding_id: findingId,
      title: raw.title || "",
      action,
      visible_action_label: raw.visible_action_label || visibleActionLabel(action),
      owner: DEFAULT_OWNER,
      status,
      created_at: created,
      updated_at: updated,
      next_action: "",
      rationale_or_modification: raw.rationale_or_modification || raw.note || "",
      note: raw.rationale_or_modification || raw.note || "",
      previous_state: raw.previous_state || null,
      new_state: raw.new_state || ACTION_TO_FINDING_STATUS[action] || null,
      decided_at: raw.decided_at || created,
      project_id: raw.project_id || (fixture && fixture.project && fixture.project.project_id) || "",
      target_project: (targetOpt && targetOpt.project_id) || raw.target_project || "",
      source_data_class: raw.source_data_class || raw.data_class || null,
      data_class: raw.data_class || raw.source_data_class || null,
      recommendation_snapshot: raw.recommendation_snapshot || "",
      wings4_state_update: "LOCAL_PROTOTYPE_ONLY",
      analyzed_project_mutation: "NO",
      product_version: PRODUCT_VERSION,
      schema_version: SCHEMA_VERSION,
      events: Array.isArray(raw.events) ? raw.events.slice() : [],
      intervention: raw.intervention || null,
      route: raw.route || null,
      verification: raw.verification || null
    };
    decision.next_action = deriveNextAction(
      decision.action,
      decision.status,
      decision.route && decision.route.EXECUTION_STATUS,
      decision.verification && decision.verification.overall_result
    );
    if (!decision.events.length) pushEvent(decision, "DECISION_RECORDED", "Migrated into schema v4.", decision.owner);
    return decision;
  }

  function normalizeState(parsed) {
    const state = emptyState();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return state;
    state.package_sequence_by_day = (parsed.package_sequence_by_day && typeof parsed.package_sequence_by_day === "object")
      ? parsed.package_sequence_by_day
      : {};
    state.verifications = (parsed.verifications && typeof parsed.verifications === "object") ? parsed.verifications : {};
    state.market_checks = (parsed.market_checks && typeof parsed.market_checks === "object") ? parsed.market_checks : {};
    const decisionsIn = parsed.decisions && typeof parsed.decisions === "object" && !Array.isArray(parsed.decisions) ? parsed.decisions : {};
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
    if (!state.decisions || typeof state.decisions !== "object" || Array.isArray(state.decisions)) return "Missing decisions object.";
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
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
      return memoryState;
    }
  }

  function saveState(state) {
    state.schema_version = SCHEMA_VERSION;
    state.product_version = PRODUCT_VERSION;
    memoryState = state;
    if (storageAvailable) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
      catch (err) {
        storageAvailable = false;
        setStatus("Could not persist to browser storage. Continuing with in-memory state only.", true);
      }
    }
    renderState(state);
  }

  function renderState(state) { els.stateView.textContent = JSON.stringify(state, null, 2); }
  function getDecision(state, findingId) { return state.decisions[findingId] || null; }

  function findDecisionByPackageId(state, packageId) {
    const ids = Object.keys(state.decisions || {});
    for (let i = 0; i < ids.length; i += 1) {
      const d = state.decisions[ids[i]];
      if (d && d.intervention && d.intervention.intervention_package_id === packageId) return d;
    }
    return null;
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
    if (!w || !els.wings4Summary) return;
    els.wings4Summary.innerHTML = `
      <article><h3>Product</h3><p>${escapeHtml(w.product || "Wings4")}</p></article>
      <article><h3>Problem</h3><p>${escapeHtml(w.problem || "")}</p></article>
      <article><h3>How it works</h3><p>${escapeHtml(w.how_it_works || "")}</p></article>`;
  }

  function renderProject(project, findings, state) {
    const dataClass = project.data_class || "";
    const openCount = (findings || []).filter((f) => {
      const st = effectiveFindingStatus(f, state);
      return st === "OPEN" || st === "ACCEPTED" || st === "MODIFIED" || st === "DEFERRED";
    }).length;
    els.projectCard.innerHTML = `
      <div class="title"><strong>${escapeHtml(project.display_name || project.project_id)}</strong>
        <span class="badge ${escapeHtml(dataClass)}">${escapeHtml(statusLabel(dataClass))}</span></div>
      <p class="meta-line">${escapeHtml(project.portfolio_role || "")}</p>
      <p class="meta-line"><strong>Open / active findings:</strong> ${openCount}</p>
      <p class="compact-line">${escapeHtml(project.wings4_relationship_project || "")}</p>
      <details class="compact-details audit-block">
        <summary>Project details</summary>
        <div class="details-body">
          <p><strong>ID:</strong> ${escapeHtml(project.project_id)}</p>
          <p>${escapeHtml(project.identity || "")}</p>
          <p><strong>Purpose:</strong> ${escapeHtml(project.purpose || "")}</p>
          <p class="meta-line"><strong>Product relationship:</strong> ${escapeHtml(project.wings4_relationship_product || "")}</p>
          <p class="meta-line"><strong>Root (metadata):</strong> <code>${escapeHtml(project.project_root || "")}</code></p>
        </div>
      </details>`;
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
      btn.innerHTML = `
        <div class="title">${escapeHtml(findingDisplayTitle(f))}</div>
        <div class="meta-line badge-row">
          <span class="badge ${escapeHtml(badgeClassForStatus(status))}">${escapeHtml(statusLabel(status))}</span>
          ${f.finding_class ? `<span class="badge">${escapeHtml(f.finding_class)}</span>` : ""}
          ${decision && decision.verification ? `<span class="badge ${escapeHtml(badgeClassForStatus(decision.verification.overall_result))}">${escapeHtml(statusLabel(decision.verification.overall_result))}</span>` : ""}
          <span class="badge ${escapeHtml(f.severity || "")}">${escapeHtml(statusLabel(f.severity || ""))}</span>
        </div>
        <div class="meta-line audit-id">${escapeHtml(f.finding_id)}</div>`;
      btn.addEventListener("click", () => { selectedId = f.finding_id; renderAll(); });
      li.appendChild(btn);
      els.findingsList.appendChild(li);
    });
  }

  function renderHistory(decision) {
    const events = (decision && decision.events) || [];
    if (!events.length) return "<p class='muted'>No events yet.</p>";
    return `<ol class="event-list">${events.slice().sort((a, b) => String(a.timestamp).localeCompare(String(b.timestamp))).map((e) => `
      <li><strong>${escapeHtml(e.event_type)}</strong><span class="muted"> · ${escapeHtml(e.timestamp)}</span>
      ${e.note ? `<div>${escapeHtml(e.note)}</div>` : ""}</li>`).join("")}</ol>`;
  }

  function listToHtml(items) {
    return `<ul class="alt-list">${(items || []).map((i) => `<li>${escapeHtml(typeof i === "string" ? i : JSON.stringify(i))}</li>`).join("")}</ul>`;
  }

  function defaultMarketQuestion(finding) {
    if (finding && (finding.finding_id === "F-SM-002" || finding.finding_id === "F-SM-003")) return "MCQ-KILL_OR_DEFER";
    if (finding && finding.finding_id === "F-MC-002") return "MCQ-INTEGRATE_OR_BUILD";
    return "MCQ-BUILD_VS_ADOPT";
  }

  function evidenceLevelLabel(level) {
    if (level === "WINGS_HELD") return "Wings-held";
    if (level === "HUMAN_PROVIDED") return "Human-provided";
    if (level === "EXTERNAL_CHECKED") return "Externally checked";
    if (level === "UNKNOWN") return "Unknown";
    return level || "Unknown";
  }

  function altStatusLabel(status) {
    if (status === "CONSIDERED") return "Considered";
    if (status === "UNKNOWN") return "Unknown";
    if (status === "NOT_EVIDENCED") return "Not evidenced";
    return status || "";
  }

  function renderMarketCheckPanel(finding, state) {
    const mc = fixture && fixture.market_check;
    if (!mc || !Array.isArray(mc.questions) || !mc.questions.length) {
      return `<div class="detail-block claim-block" data-stage="understand" data-section="market-check">
        <h3><span class="claim-tag market">Market Check</span> ${helpControl("Market Check")} On-demand options check</h3>
        <p class="muted">Market Check catalog is not available in this fixture.</p>
      </div>`;
    }
    const selectedQ = lastMarketQuestionByFinding[finding.finding_id] || defaultMarketQuestion(finding);
    const options = mc.questions.map((q) =>
      `<option value="${escapeHtml(q.id)}"${q.id === selectedQ ? " selected" : ""}>${escapeHtml(q.label)}</option>`
    ).join("");
    const stored = state && state.market_checks ? state.market_checks[finding.finding_id] : null;
    let resultHtml = "<p class=\"muted\">Not run yet. Choose a question and run Market Check. Wings will not invent a market.</p>";
    if (stored && stored.result) {
      const r = stored.result;
      const alts = (r.alternatives || []).map((a) => {
        const extra = [];
        if (a.evidence_reliability === "HUMAN_PROVIDED_SAMPLE" || a.evidence_reliability === "PENDING_HUMAN_CONFIRMATION") {
          extra.push("<span class=\"badge DEFERRED\">Sample — not production evidence</span>");
        }
        if (a.evidence_level === "EXTERNAL_CHECKED") {
          extra.push("<span class=\"badge\">Manual record only — no live scan</span>");
        }
        return `<li><span class="badge">${escapeHtml(altStatusLabel(a.status))}</span> <span class="badge">${escapeHtml(evidenceLevelLabel(a.evidence_level || "UNKNOWN"))}</span> ${extra.join(" ")} ${escapeHtml(a.option)}${a.summary ? ` — ${escapeHtml(a.summary)}` : ""}</li>`;
      }).join("");
      const unknownBlock = r.recommendation === "UNKNOWN"
        ? `<p><strong>Why unknown:</strong> ${escapeHtml(r.unknown_reason || "")}</p>
           <p><strong>Evidence needed:</strong> ${escapeHtml(r.required_evidence || "")}</p>
           <p><strong>Next step:</strong> ${escapeHtml(r.next_action || "")}</p>`
        : `<p><strong>Next step:</strong> ${escapeHtml(r.next_action || "Human decides. This check does not adopt or mutate anything.")}</p>`;
      const evCount = (r.evidence || []).length;
      const evHtml = (r.evidence || []).map((e) =>
        `<div class="evidence-item"><div class="label">${escapeHtml(e.label || "Evidence")}</div>
         <div class="pointer">${escapeHtml(e.pointer || "")}</div>
         <p class="excerpt">${escapeHtml(e.excerpt || "")}</p></div>`
      ).join("");
      resultHtml = `
        <div class="market-result" id="market-check-result">
          <p class="meta-line"><strong>Target:</strong> ${escapeHtml(r.finding_id || finding.finding_id)} — ${escapeHtml(finding.title || "")}</p>
          <p class="meta-line"><strong>Question:</strong> ${escapeHtml(r.question_label || "")}</p>
          <h4>Alternatives considered</h4>
          <ul class="alt-list">${alts || "<li class='muted'>No alternatives listed.</li>"}</ul>
          <h4>Recommendation</h4>
          <p class="meta-line badge-row">
            <span class="badge ${r.recommendation === "UNKNOWN" ? "DEFERRED" : "RESOLVED"}">${escapeHtml(r.recommendation_label || r.recommendation)}</span>
            <span class="badge">${escapeHtml(statusLabel(r.confidence || "UNKNOWN"))}</span>
            <span class="badge">${escapeHtml(evidenceLevelLabel(r.evidence_level || "UNKNOWN"))}</span>
          </p>
          <p>${escapeHtml(r.fact || "")}</p>
          <p class="meta-line">${escapeHtml(r.inference || "")}</p>
          ${unknownBlock}
          <p class="meta-line"><strong>Evidence level:</strong> ${escapeHtml(evidenceLevelLabel(r.evidence_level || "UNKNOWN"))}</p>
          <p class="meta-line"><strong>Scope:</strong> ${escapeHtml(r.scope || "")}</p>
          <p class="meta-line"><strong>Authority:</strong> ${escapeHtml(r.authority || "")}</p>
          <p class="meta-line"><strong>Limits:</strong> ${escapeHtml((r.limits || []).join(" · "))}</p>
          <details class="compact-details audit-block">
            <summary>Evidence and raw check (${evCount})</summary>
            <div class="details-body">
              ${evHtml || "<p class='muted'>No evidence items on this result.</p>"}
              <pre class="package-preview">${escapeHtml(JSON.stringify(r, null, 2))}</pre>
            </div>
          </details>
        </div>`;
    }
    return `<div class="detail-block claim-block" data-stage="understand" data-section="market-check" id="market-check-panel">
      <h3><span class="claim-tag market">Market Check</span> ${helpControl("Market Check")} On-demand options check</h3>
      <p class="decision-help">Ask whether to reuse, adopt, build a remaining gap, defer, or stop. This is not monitoring, RADAR, or an independent project re-check.</p>
      <label class="field-label" for="market-check-question">Question</label>
      <select id="market-check-question" class="text-input">${options}</select>
      <div class="decision-row">
        <button type="button" class="btn" id="btn-run-market-check">Run Market Check</button>
      </div>
      ${resultHtml}
    </div>`;
  }

  function runMarketCheckForFinding(finding) {
    if (!finding) return;
    if (!window.Wings4MarketCheck || typeof window.Wings4MarketCheck.runMarketCheck !== "function") {
      setStatus("Market Check engine is not loaded.", true);
      return;
    }
    const select = document.getElementById("market-check-question");
    const questionId = select ? select.value : defaultMarketQuestion(finding);
    lastMarketQuestionByFinding[finding.finding_id] = questionId;
    const result = window.Wings4MarketCheck.runMarketCheck({
      finding: finding,
      question_id: questionId,
      market_check: fixture.market_check
    });
    const state = loadState();
    if (!state.market_checks || typeof state.market_checks !== "object") state.market_checks = {};
    state.market_checks[finding.finding_id] = {
      finding_id: finding.finding_id,
      question_id: questionId,
      ran_at: nowIso(),
      result: result
    };
    state.updated_at = nowIso();
    saveState(state);
    setStatus("Market Check completed for " + finding.finding_id + ": " + (result.recommendation_label || result.recommendation) + ".");
    renderAll();
  }

  function downloadText(filename, text) {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }

  function safeFilenamePart(value) {
    return String(value || "x").replace(/[^A-Za-z0-9._-]+/g, "_").slice(0, 64);
  }

  function ensureRoute(finding, decision) {
    const targetOpt = resolveTargetOption(finding, decision.target_project);
    if (!targetOpt) return { error: "No governed target option is available." };
    if (!targetOpt.project_root) return { error: "Governed target root metadata is missing." };
    decision.target_project = targetOpt.project_id;
    const execStatus = (decision.route && decision.route.EXECUTION_STATUS === "PACKAGE_EXPORTED") ? "PACKAGE_EXPORTED" : "PACKAGE_READY";
    decision.route = buildRoute(finding, decision, targetOpt, execStatus);
    decision.next_action = deriveNextAction(decision.action, decision.status, decision.route.EXECUTION_STATUS, decision.verification && decision.verification.overall_result);
    const invalid = validateRoute(decision.route, decision);
    if (invalid) return { error: invalid };
    return { route: decision.route, targetOpt };
  }

  function extractAiBlock(text) {
    const normalized = String(text || "").replace(/^\uFEFF/, "");
    const re = /---AI_START---([\s\S]*?)---AI_END---/g;
    const bodies = [];
    let m = re.exec(normalized);
    while (m) {
      bodies.push(m[1]);
      m = re.exec(normalized);
    }
    if (!bodies.length) return { ok: false, error: "NO_AI_BLOCK", body: null };
    if (bodies.length > 1) return { ok: false, error: "DUPLICATE_AI_BLOCKS", body: null };
    return { ok: true, error: null, body: bodies[0] };
  }

  function parseKeyValues(blockBody) {
    const out = {};
    const duplicateKeys = [];
    String(blockBody || "").replace(/^\uFEFF/, "").split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      const idx = trimmed.indexOf("=");
      if (idx < 1) return;
      const key = trimmed.slice(0, idx).trim();
      // Preserve Windows path backslashes; only trim outer whitespace on values.
      const value = trimmed.slice(idx + 1).trim();
      if (Object.prototype.hasOwnProperty.call(out, key) && out[key] !== value) {
        duplicateKeys.push(key);
      }
      out[key] = value;
    });
    return { values: out, duplicate_keys: duplicateKeys };
  }

  function classifyVerification(expected, actual) {
    const missing = [];
    const required = [
      "INTERVENTION_PACKAGE_ID", "OVERALL_STATUS", "PROJECT_ID", "PROJECT_ROOT", "BRANCH",
      "HEAD_BEFORE", "HEAD_AFTER", "WORKTREE_CLEAN_FINAL", "INDEX_CLEAN_FINAL", "FILES_CHANGED",
      "AUTHORIZED_SCOPE_COMPLIANCE", "PROHIBITED_SCOPE_VIOLATION", "EXPECTED_OUTPUT_STATUS",
      "RETURN_EVIDENCE_STATUS", "CANONICAL_CONFLICT_COUNT", "COMMIT", "PUSH", "RESYNC_READY",
      "RETURN_EVIDENCE_FILE", "NEXT_ACTION"
    ];
    required.forEach((k) => {
      if (isMissingOrTemplate(actual[k])) missing.push(k);
    });

    // Deterministic precedence: missing ID → pattern → identity → incomplete → scope → push → conflicts → fail → pass-with-gap → pass.
    if (isMissingOrTemplate(actual.INTERVENTION_PACKAGE_ID)) {
      return { result: "RETURN_INCOMPLETE", reason: "INTERVENTION_PACKAGE_ID missing or still a template placeholder." };
    }
    if (!isValidPackageIdPattern(actual.INTERVENTION_PACKAGE_ID)) {
      return { result: "IDENTITY_MISMATCH", reason: "Returned INTERVENTION_PACKAGE_ID does not match W4IP-YYYYMMDD-NNNN." };
    }
    if (actual.INTERVENTION_PACKAGE_ID !== expected.package_id) {
      return { result: "IDENTITY_MISMATCH", reason: "Returned package ID does not match the expected Wings4 package." };
    }
    // Do not treat template placeholders as real identity claims.
    if (!isMissingOrTemplate(actual.PROJECT_ID) && actual.PROJECT_ID !== expected.target_project) {
      return { result: "IDENTITY_MISMATCH", reason: "Returned PROJECT_ID does not match governed destination." };
    }
    if (!isMissingOrTemplate(actual.PROJECT_ROOT) && expected.target_root) {
      const a = String(actual.PROJECT_ROOT).replace(/\//g, "\\");
      const e = String(expected.target_root).replace(/\//g, "\\");
      if (a !== e) {
        return { result: "IDENTITY_MISMATCH", reason: "Returned PROJECT_ROOT does not match governed target root metadata." };
      }
    }
    if (missing.length) {
      return { result: "RETURN_INCOMPLETE", reason: "Missing or template return fields: " + missing.join(", ") };
    }
    // Scope conflict overrides a claimed OVERALL_STATUS=PASS.
    if (String(actual.PROHIBITED_SCOPE_VIOLATION).toUpperCase() === "YES") {
      return { result: "SCOPE_CONFLICT", reason: "Prohibited-scope violation reported by target return; cannot be VERIFIED_PASS." };
    }
    if (["FAIL"].includes(String(actual.AUTHORIZED_SCOPE_COMPLIANCE).toUpperCase())) {
      return { result: "SCOPE_CONFLICT", reason: "Authorized-scope compliance failed." };
    }
    if (String(actual.PUSH).toUpperCase() === "YES" && String(expected.push_policy || "").includes("NO_PUSH")) {
      return { result: "FAILED", reason: "Return reports PUSH=YES while package push policy forbids unauthorized push." };
    }
    const conflictCount = Number(actual.CANONICAL_CONFLICT_COUNT);
    if (!Number.isNaN(conflictCount) && conflictCount > 0) {
      return { result: "UNVERIFIABLE", reason: "Canonical conflicts reported; distinct from generic execution failure." };
    }
    if (["FAIL"].includes(String(actual.RETURN_EVIDENCE_STATUS).toUpperCase())) {
      return { result: "FAILED", reason: "Return evidence status is FAIL." };
    }
    if (["FAIL"].includes(String(actual.EXPECTED_OUTPUT_STATUS).toUpperCase())) {
      return { result: "FAILED", reason: "Expected output status is FAIL." };
    }
    if (["FAIL", "BLOCKED"].includes(String(actual.OVERALL_STATUS).toUpperCase())) {
      return { result: "FAILED", reason: "Target OVERALL_STATUS reports failure/block." };
    }
    if (["PASS_WITH_GAP"].includes(String(actual.OVERALL_STATUS).toUpperCase()) ||
        ["PASS_WITH_GAP"].includes(String(actual.AUTHORIZED_SCOPE_COMPLIANCE).toUpperCase()) ||
        ["PASS_WITH_GAP"].includes(String(actual.EXPECTED_OUTPUT_STATUS).toUpperCase()) ||
        ["PASS_WITH_GAP"].includes(String(actual.RETURN_EVIDENCE_STATUS).toUpperCase())) {
      return { result: "VERIFIED_PASS_WITH_GAP", reason: "Return is acceptable with non-blocking gaps." };
    }
    if (["PASS"].includes(String(actual.OVERALL_STATUS).toUpperCase())) {
      return { result: "VERIFIED_PASS", reason: "Return correlated and required checks passed." };
    }
    return { result: "UNVERIFIABLE", reason: "Return present but overall status is not a clear PASS." };
  }

  function setRing2Transient(findingId, payload) {
    ring2TransientByFinding[findingId] = payload || null;
  }

  function runRing2Verification(finding, pastedText) {
    const findingId = finding.finding_id;
    returnEvidenceDraft[findingId] = pastedText == null ? "" : String(pastedText);
    const raw = String(pastedText || "");
    if (!raw.trim()) {
      const explanation = buildVerificationExplanation("RETURN_INCOMPLETE", "Return evidence is empty. Paste or import text, then verify.", null, null);
      setRing2Transient(findingId, {
        overall_result: "RETURN_INCOMPLETE",
        reason_summary: "Return evidence is empty. Paste or import text, then verify.",
        explanation,
        state_updated: false
      });
      setStatus("Return evidence is empty. Paste or import a return AI block, then verify.", true);
      renderAll();
      return;
    }
    const extracted = extractAiBlock(raw);
    if (!extracted.ok) {
      const reason = extracted.error === "DUPLICATE_AI_BLOCKS"
        ? "Multiple ---AI_START--- / ---AI_END--- blocks found. Remove ambiguity and keep exactly one block."
        : "No ---AI_START--- / ---AI_END--- block found. Do not infer unmarked arbitrary text.";
      const explanation = buildVerificationExplanation("UNVERIFIABLE", reason, null, null);
      setRing2Transient(findingId, {
        overall_result: "UNVERIFIABLE",
        reason_summary: reason,
        explanation,
        state_updated: false
      });
      setStatus(reason, true);
      renderAll();
      return;
    }
    const parsed = parseKeyValues(extracted.body);
    if (parsed.duplicate_keys.length) {
      const reason = "Conflicting duplicate keys in return block: " + parsed.duplicate_keys.join(", ");
      const explanation = buildVerificationExplanation("UNVERIFIABLE", reason, null, null);
      setRing2Transient(findingId, {
        overall_result: "UNVERIFIABLE",
        reason_summary: reason,
        explanation,
        state_updated: false
      });
      setStatus(reason, true);
      renderAll();
      return;
    }
    const actual = parsed.values;
    if (!actual.INTERVENTION_PACKAGE_ID) {
      const explanation = buildVerificationExplanation("RETURN_INCOMPLETE", "Return AI block is missing INTERVENTION_PACKAGE_ID.", actual, null);
      setRing2Transient(findingId, {
        overall_result: "RETURN_INCOMPLETE",
        reason_summary: "Return AI block is missing INTERVENTION_PACKAGE_ID.",
        explanation,
        state_updated: false
      });
      setStatus("Return AI block is missing INTERVENTION_PACKAGE_ID.", true);
      renderAll();
      return;
    }
    if (!isValidPackageIdPattern(actual.INTERVENTION_PACKAGE_ID)) {
      const explanation = buildVerificationExplanation("IDENTITY_MISMATCH", "Malformed INTERVENTION_PACKAGE_ID; expected W4IP-YYYYMMDD-NNNN.", actual, null);
      setRing2Transient(findingId, {
        overall_result: "IDENTITY_MISMATCH",
        reason_summary: "Malformed INTERVENTION_PACKAGE_ID; expected W4IP-YYYYMMDD-NNNN.",
        explanation,
        state_updated: false
      });
      setStatus("Malformed INTERVENTION_PACKAGE_ID; expected W4IP-YYYYMMDD-NNNN.", true);
      renderAll();
      return;
    }
    const state = loadState();
    const decision = findDecisionByPackageId(state, actual.INTERVENTION_PACKAGE_ID);
    if (!decision) {
      const explanation = buildVerificationExplanation("IDENTITY_MISMATCH", "Unknown INTERVENTION_PACKAGE_ID. No Wings4-local intervention was updated.", actual, null);
      setRing2Transient(findingId, {
        overall_result: "IDENTITY_MISMATCH",
        reason_summary: "Unknown INTERVENTION_PACKAGE_ID. No Wings4-local intervention was updated.",
        explanation,
        state_updated: false,
        intervention_package_id: actual.INTERVENTION_PACKAGE_ID
      });
      setStatus("Unknown INTERVENTION_PACKAGE_ID. Correlate against a package generated in this Wings4 local state.", true);
      renderAll();
      return;
    }
    if (decision.finding_id !== finding.finding_id) {
      const explanation = buildVerificationExplanation("IDENTITY_MISMATCH", "Package ID belongs to a different finding. No state update applied here.", actual, null);
      setRing2Transient(findingId, {
        overall_result: "IDENTITY_MISMATCH",
        reason_summary: "Package ID belongs to a different finding. No state update applied here.",
        explanation,
        state_updated: false,
        intervention_package_id: actual.INTERVENTION_PACKAGE_ID
      });
      setStatus("Package ID belongs to a different finding. Open the correlated finding or paste against the correct one.", true);
      renderAll();
      return;
    }
    const expected = {
      package_id: decision.intervention.intervention_package_id,
      target_project: decision.route.TARGET_PROJECT || decision.target_project,
      target_root: decision.route.TARGET_ROOT || "",
      push_policy: decision.route.PUSH_POLICY || PUSH_POLICY,
      commit_policy: decision.route.COMMIT_POLICY || COMMIT_POLICY
    };
    const classified = classifyVerification(expected, actual);
    const explanation = buildVerificationExplanation(classified.result, classified.reason, actual, expected);
    const verification = {
      verification_id: makeId("VER"),
      intervention_package_id: expected.package_id,
      decision_id: decision.decision_id,
      finding_id: decision.finding_id,
      route_id: decision.route && decision.route.route_id,
      verified_at: nowIso(),
      overall_result: classified.result,
      reason_summary: classified.reason,
      explanation,
      expected,
      actual,
      checks: {
        package_id_match: actual.INTERVENTION_PACKAGE_ID === expected.package_id,
        project_id_match: !isMissingOrTemplate(actual.PROJECT_ID) && actual.PROJECT_ID === expected.target_project,
        project_root_match: !isMissingOrTemplate(actual.PROJECT_ROOT) && !!expected.target_root &&
          String(actual.PROJECT_ROOT).replace(/\//g, "\\") === String(expected.target_root).replace(/\//g, "\\"),
        branch_captured: !isMissingOrTemplate(actual.BRANCH),
        head_before_present: !isMissingOrTemplate(actual.HEAD_BEFORE),
        head_after_present: !isMissingOrTemplate(actual.HEAD_AFTER),
        worktree_clean_final: actual.WORKTREE_CLEAN_FINAL || "",
        index_clean_final: actual.INDEX_CLEAN_FINAL || "",
        authorized_scope_compliance: actual.AUTHORIZED_SCOPE_COMPLIANCE || "",
        prohibited_scope_violation: String(actual.PROHIBITED_SCOPE_VIOLATION || "").toUpperCase() === "YES",
        expected_output_status: actual.EXPECTED_OUTPUT_STATUS || "",
        return_evidence_status: actual.RETURN_EVIDENCE_STATUS || "",
        commit: actual.COMMIT || "",
        push: actual.PUSH || "",
        resync_ready: actual.RESYNC_READY || "",
        canonical_conflict_count: actual.CANONICAL_CONFLICT_COUNT || "",
        return_evidence_file: actual.RETURN_EVIDENCE_FILE || "",
        next_action_captured: actual.NEXT_ACTION || "",
        raw_actual_preserved: true
      }
    };
    decision.verification = verification;
    decision.next_action = deriveNextAction(decision.action, decision.status, decision.route && decision.route.EXECUTION_STATUS, verification.overall_result);
    decision.updated_at = nowIso();
    pushEvent(decision, "RING2_VERIFICATION", verification.overall_result + ": " + verification.reason_summary, DEFAULT_OWNER);
    state.decisions[decision.finding_id] = decision;
    state.verifications[verification.verification_id] = {
      verification_id: verification.verification_id,
      intervention_package_id: verification.intervention_package_id,
      finding_id: verification.finding_id,
      overall_result: verification.overall_result,
      verified_at: verification.verified_at
    };
    state.updated_at = decision.updated_at;
    saveState(state);
    setRing2Transient(findingId, {
      overall_result: verification.overall_result,
      reason_summary: verification.reason_summary,
      explanation: verification.explanation,
      state_updated: true,
      intervention_package_id: verification.intervention_package_id
    });
    setStatus(`Return verification ${verification.overall_result} for ${verification.intervention_package_id}.`);
    renderAll();
  }

  function importReturnTxt(finding, textarea) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".txt,text/plain";
    input.addEventListener("change", () => {
      const file = input.files && input.files[0];
      if (!file) return;
      const nameOk = /\.txt$/i.test(file.name || "");
      const type = String(file.type || "");
      if (!nameOk && type && !(type.indexOf("text/") === 0 || type === "application/json")) {
        setStatus("Unsupported file type. Import a UTF-8 TXT file containing the return AI block.", true);
        return;
      }
      if (!nameOk && type === "application/json") {
        setStatus("JSON editing is not required. Import a UTF-8 TXT file or paste the AI block.", true);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const text = String(reader.result == null ? "" : reader.result);
        if (textarea) textarea.value = text;
        returnEvidenceDraft[finding.finding_id] = text;
        setStatus("Return evidence TXT imported into the textarea (UTF-8).");
      };
      reader.onerror = () => setStatus("Could not read the selected file as UTF-8 text.", true);
      reader.readAsText(file, "UTF-8");
    });
    input.click();
  }

  function exportVerification(finding) {
    const state = loadState();
    const decision = getDecision(state, finding.finding_id);
    if (!decision || !decision.verification) {
      setStatus("No return-verification record to export for this finding.", true);
      return;
    }
    const v = decision.verification;
    const text = [
      "WINGS4_RING2_VERIFICATION_EXPORT",
      "VERIFICATION_ID=" + v.verification_id,
      "INTERVENTION_PACKAGE_ID=" + v.intervention_package_id,
      "FINDING_ID=" + v.finding_id,
      "DECISION_ID=" + v.decision_id,
      "ROUTE_ID=" + (v.route_id || ""),
      "VERIFIED_AT=" + v.verified_at,
      "OVERALL_RESULT=" + v.overall_result,
      "REASON=" + v.reason_summary,
      "ERROR_CODE=" + ((v.explanation && v.explanation.error_code) || ""),
      "WHAT_HAPPENED=" + ((v.explanation && v.explanation.what_happened) || ""),
      "WHY_IT_FAILED=" + ((v.explanation && v.explanation.why_it_failed) || ""),
      "CORRECTIVE_ACTION=" + ((v.explanation && v.explanation.corrective_action) || ""),
      "",
      "EXPECTED",
      JSON.stringify(v.expected, null, 2),
      "",
      "ACTUAL",
      JSON.stringify(v.actual, null, 2),
      "",
      "CHECKS",
      JSON.stringify(v.checks, null, 2),
      "",
      "END"
    ].join("\n");
    downloadText(`wings4-ring2-verification-${safeFilenamePart(v.intervention_package_id)}.txt`, text);
    setStatus("Return-verification TXT exported.");
  }

  function formatCheckValue(value) {
    const shown = displayEvidenceValue(value);
    if (shown.indexOf("missing / template") >= 0) {
      return `<span class="display-missing">${escapeHtml(shown)}</span>`;
    }
    return escapeHtml(shown);
  }

  function renderRing2Panel(finding, decision) {
    if (!decision || !decision.intervention || isPendingPackageId(decision.intervention.intervention_package_id)) {
      return `
        <div class="detail-block" id="ring2-panel">
          <h3>Verification</h3>
          <p class="muted">Available after ACCEPT or MODIFY assigns a package ID.</p>
        </div>`;
    }
    const v = decision.verification;
    const transient = ring2TransientByFinding[finding.finding_id];
    const draft = returnEvidenceDraft[finding.finding_id] || "";
    const expl = (v && v.explanation) || (transient && transient.explanation) ||
      (v ? buildVerificationExplanation(v.overall_result, v.reason_summary, v.actual, v.expected) : null) ||
      (transient ? buildVerificationExplanation(transient.overall_result, transient.reason_summary, null, null) : null);
    const resultSummary = v
      ? `<p class="meta-line"><strong>Result:</strong>
           <span class="badge ${escapeHtml(badgeClassForStatus(v.overall_result))}">${escapeHtml(statusLabel(v.overall_result))}</span>
           ${helpControl("verification")} ${helpControl("W4IP")}
         </p>
         ${renderVerificationExplanation(expl)}
         <p class="meta-line"><strong>Package:</strong> <code>${escapeHtml(v.intervention_package_id)}</code> → ${escapeHtml(decision.target_project)}</p>`
      : (transient
        ? `<p class="meta-line"><strong>Result:</strong>
             <span class="badge ${escapeHtml(badgeClassForStatus(transient.overall_result))}">${escapeHtml(statusLabel(transient.overall_result))}</span>
             ${helpControl("verification")}
           </p>
           ${renderVerificationExplanation(expl || buildVerificationExplanation(transient.overall_result, transient.reason_summary, null, null))}`
        : "<p class='muted'>No verification yet.</p>");
    const checksHtml = v
      ? `<ul class="alt-list">
           <li>Identity: package ${v.checks && v.checks.package_id_match ? "match" : "fail"}; project ${formatCheckValue(v.actual && v.actual.PROJECT_ID)}; root ${formatCheckValue(v.actual && v.actual.PROJECT_ROOT)}</li>
           <li>Scope: authorized=${formatCheckValue(v.checks && v.checks.authorized_scope_compliance)}; prohibited_violation=${v.checks && v.checks.prohibited_scope_violation ? "YES" : "NO"}</li>
           <li>Output/evidence: expected=${formatCheckValue(v.checks && v.checks.expected_output_status)}; evidence=${formatCheckValue(v.checks && v.checks.return_evidence_status)}; resync_ready=${formatCheckValue(v.checks && v.checks.resync_ready)}</li>
           <li>Policy: commit=${formatCheckValue(v.checks && v.checks.commit)}; push=${formatCheckValue(v.checks && v.checks.push)}; conflicts=${formatCheckValue(v.checks && v.checks.canonical_conflict_count)}</li>
         </ul>
         <pre class="package-preview compact-pre">${escapeHtml(JSON.stringify(v.actual || {}, null, 2))}</pre>`
      : "<p class='muted'>Detailed checks appear after verification.</p>";
    return `
      <div class="detail-block" id="ring2-panel" data-stage="verify">
        ${stageLabel("4", "Verify")}
        <h3>Verification ${helpControl("verification")}</h3>
        ${resultSummary}
        <p class="limitation-note" role="note"><strong>Limit:</strong> a verified return confirms the evidence received. Wings cannot yet obtain fresh independent proof from the destination project. RESYNC_READY in the return is target evidence only — not independent resynchronization.</p>
        <label class="field-label" for="return-paste">Return evidence</label>
        <textarea id="return-paste" class="modify-box return-evidence" rows="8" placeholder="Paste return evidence, or import a TXT file.">${escapeHtml(draft)}</textarea>
        <div class="decision-row">
          <button type="button" class="btn secondary" id="btn-import-return">IMPORT TXT</button>
          <button type="button" class="btn" id="btn-verify-return">VERIFY RETURN</button>
          <button type="button" class="btn ghost" id="btn-export-verification" ${v ? "" : "disabled"}>Export verification TXT</button>
        </div>
        <details class="compact-details audit-block">
          <summary>Verification details</summary>
          <div class="details-body">${checksHtml}</div>
        </details>
      </div>`;
  }

  function renderRouteAndPackage(finding, decision, state) {
    if (!interventionEligible(decision)) {
      return `
        <div class="detail-block">
          <h3>Intervention</h3>
          <p class="muted">Available after ACCEPT or MODIFY. REJECT and POSTPONE do not create packages by default.</p>
        </div>`;
    }
    const ready = ensureReadyPackage(finding, decision, state);
    if (ready.error) {
      return `<div class="detail-block"><h3>Intervention</h3><p class="status error">${escapeHtml(ready.error)}</p></div>`;
    }
    if (ready.identityAssigned) {
      state.decisions[finding.finding_id] = decision;
      state.updated_at = nowIso();
      saveState(state);
    }
    const route = ready.route;
    const opts = governedTargets();
    const packageId = ready.packageId;
    let packageText = "";
    try {
      packageText = serializePackage(finding, decision, route, packageId);
    } catch (err) {
      return `<div class="detail-block"><h3>Intervention</h3><p class="status error">${escapeHtml(err.message)}</p></div>`;
    }
    const summary = operatorInterventionSummary(route, finding, decision);
    const targetControl = opts.length > 1
      ? `<label class="field-label" for="target-project-select">Target project</label>
         <select id="target-project-select" class="text-input">
           ${opts.map((o) => `<option value="${escapeHtml(o.project_id)}" ${o.project_id === route.TARGET_PROJECT ? "selected" : ""}>${escapeHtml(o.display_name || o.project_id)}</option>`).join("")}
         </select>`
      : `<p class="meta-line"><strong>To:</strong> ${escapeHtml(route.TARGET_PROJECT)}</p>`;

    return `
      <div class="detail-block" id="route-panel" data-stage="act">
        ${stageLabel("3", "Act")}
        <h3>Intervention ${helpControl("governed intervention")} ${helpControl("W4IP")}</h3>
        <div class="operator-summary" id="intervention-operator-summary">
          <p class="meta-line"><strong>Requested action</strong></p>
          <p>${escapeHtml(summary.requested_action)}</p>
          <p class="meta-line"><strong>Limits</strong></p>
          <p>${escapeHtml(summary.limits)}</p>
          <p class="meta-line"><strong>Return required</strong></p>
          <p>${escapeHtml(summary.return_required)}</p>
        </div>
        <p class="meta-line"><strong>From:</strong> ${escapeHtml(route.SOURCE_PROJECT)}
          · <strong>To:</strong> ${escapeHtml(route.TARGET_PROJECT)}
          · <strong>Authority:</strong> ${escapeHtml(destinationRoleLabel(route.DESTINATION_ROLE))}</p>
        <p class="meta-line">Status:
          <span class="badge ${escapeHtml(badgeClassForStatus(route.EXECUTION_STATUS))}">${escapeHtml(statusLabel(route.EXECUTION_STATUS))}</span>
          · <strong>Package ID:</strong> <code>${escapeHtml(packageId)}</code>
        </p>
        ${targetControl}
        <div class="decision-row">
          <button type="button" class="btn secondary" id="btn-copy-package">COPY PACKAGE</button>
          <button type="button" class="btn accept" id="btn-download-package">DOWNLOAD INTERVENTION PACKAGE</button>
        </div>
        <details class="compact-details audit-block">
          <summary>Route details</summary>
          <div class="details-body">
            <p class="meta-line"><strong>Purpose:</strong> ${escapeHtml(route.PURPOSE)}</p>
            <p class="meta-line"><strong>Source root:</strong> <code>${escapeHtml(route.SOURCE_ROOT)}</code></p>
            <p class="meta-line"><strong>Target root:</strong> <code>${escapeHtml(route.TARGET_ROOT)}</code></p>
            <h4 class="subhead">Authorized scope</h4>${listToHtml(route.AUTHORIZED_SCOPE)}
            <h4 class="subhead">Prohibited scope / limits</h4>${listToHtml(route.PROHIBITED_SCOPE)}
            <h4 class="subhead">Expected output</h4>${listToHtml(route.EXPECTED_OUTPUT)}
            <h4 class="subhead">Required return evidence</h4>${listToHtml(route.RETURN_EVIDENCE)}
            <div class="authority-banner" role="note">${(route.AUTHORITY_BOUNDARY || []).map((b) => escapeHtml(b)).join("<br />")}</div>
          </div>
        </details>
        <details class="compact-details audit-block" id="intervention-panel">
          <summary>Raw package text</summary>
          <div class="details-body">
            <p class="decision-help">COPY and DOWNLOAD use the same canonical text. Package ID is assigned when ready and reused on copy/download. Raw text is for audit/debug; the operator summary above is enough for normal use.</p>
            <pre class="package-preview" id="package-preview">${escapeHtml(packageText)}</pre>
          </div>
        </details>
      </div>
      ${renderRing2Panel(finding, decision)}`;
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
    const evidenceCount = (finding.evidence || []).length;
    const evidenceHtml = (finding.evidence || []).map((e) => `
      <div class="evidence-item"><div class="label">${escapeHtml(e.label || "Evidence")}</div>
      <div class="pointer">${escapeHtml(e.pointer || "")}</div>
      <p class="excerpt">${escapeHtml(e.excerpt || "")}</p></div>`).join("");
    const alts = (finding.alternatives || []).map((a) => `<li>${escapeHtml(a)}</li>`).join("");
    const canClose = decision && decision.status !== "CLOSED";
    const canReopen = decision && (decision.status === "CLOSED" || decision.status === "POSTPONED");
    const factLead = findingFactText(finding);
    const inferenceLead = findingInferenceText(finding);
    const classHelpKey = (finding.finding_class === "DUPLICATION" || finding.finding_class === "INTERFERENCE")
      ? finding.finding_class
      : null;

    let lifecycleHtml = "";
    if (decision) {
      if (interventionEligible(decision)) {
        const ready = ensureReadyPackage(finding, decision, state);
        if (!ready.error && ready.identityAssigned) {
          state.decisions[finding.finding_id] = decision;
          state.updated_at = nowIso();
          saveState(state);
        }
      }
      decision.next_action = deriveNextAction(
        decision.action, decision.status,
        decision.route && decision.route.EXECUTION_STATUS,
        decision.verification && decision.verification.overall_result
      );
      lifecycleHtml = `
        <div class="detail-block" id="lifecycle-panel">
          <h3>Decision status</h3>
          <p class="meta-line">Status:
            <span class="badge ${escapeHtml(badgeClassForStatus(decision.status))}">${escapeHtml(statusLabel(decision.status))}</span>
            · Action: <strong>${escapeHtml(visibleActionLabel(decision.action))}</strong>
          </p>
          <p><strong>Next step:</strong> ${escapeHtml(decision.next_action)}</p>
          <div class="decision-row lifecycle-actions">
            <button type="button" class="btn ghost" id="btn-close-decision" ${canClose ? "" : "disabled"}>Close decision</button>
            <button type="button" class="btn ghost" id="btn-reopen-decision" ${canReopen ? "" : "disabled"}>Reopen decision</button>
          </div>
          <details class="compact-details audit-block">
            <summary>Decision history</summary>
            <div class="details-body">
              <p class="meta-line"><strong>Decision ID:</strong> <code>${escapeHtml(decision.decision_id)}</code></p>
              <p class="meta-line">Created: ${escapeHtml(decision.created_at || "")}</p>
              <p class="meta-line">Updated: ${escapeHtml(decision.updated_at || "")}</p>
              ${renderHistory(decision)}
            </div>
          </details>
        </div>
        ${renderRouteAndPackage(finding, decision, state)}`;
    }

    els.detailBody.innerHTML = `
      ${workflowNav(decision ? (interventionEligible(decision) ? (decision.verification ? "verify" : "act") : "decide") : "understand")}
      <div class="detail-block primary-block" data-stage="understand">
        ${stageLabel("1", "Understand")}
        <h3>Finding</h3>
        <p class="finding-headline">${escapeHtml(findingDisplayTitle(finding))}</p>
        <p class="meta-line badge-row">
          <span class="badge ${escapeHtml(badgeClassForStatus(status))}">${escapeHtml(statusLabel(status))}</span>
          ${finding.finding_class ? `<span class="badge">${escapeHtml(finding.finding_class)}</span>${classHelpKey ? helpControl(classHelpKey) : ""}` : ""}
          <span class="badge ${escapeHtml(finding.severity || "")}">${escapeHtml(statusLabel(finding.severity || ""))}</span>
          <span class="badge ${escapeHtml(finding.data_class || "")}">${escapeHtml(statusLabel(finding.data_class || ""))}</span>
        </p>
        <p class="why-matters"><strong>Why it matters:</strong> ${escapeHtml(finding.impact || "")}</p>
        <details class="compact-details audit-block">
          <summary>Finding IDs and technical title</summary>
          <div class="details-body">
            <p class="meta-line audit-id">${escapeHtml(finding.finding_id)}</p>
            ${finding.technical_title ? `<p class="meta-line">Technical title: ${escapeHtml(finding.technical_title)}</p>` : ""}
          </div>
        </details>
      </div>
      <div class="detail-block claim-block" data-stage="understand" data-section="fact">
        <h3><span class="claim-tag fact">Fact</span> ${helpControl("FACT")} What Wings can prove</h3>
        <p>${escapeHtml(factLead)}</p>
        <details class="compact-details audit-block">
          <summary>Evidence (${evidenceCount} source${evidenceCount === 1 ? "" : "s"})</summary>
          <div class="details-body">${evidenceHtml || "<p class='muted'>No evidence recorded for this finding.</p>"}</div>
        </details>
      </div>
      <div class="detail-block claim-block" data-stage="understand" data-section="inference">
        <h3><span class="claim-tag inference">Inference</span> ${helpControl("INFERENCE")} What Wings concludes</h3>
        <p>${escapeHtml(inferenceLead)}</p>
      </div>
      <div class="detail-block claim-block" data-stage="understand" data-section="alternatives">
        <h3><span class="claim-tag alternatives">Alternatives</span> Options before the recommendation</h3>
        <ul class="alt-list">${alts || "<li class='muted'>No alternatives listed.</li>"}</ul>
      </div>
      ${renderMarketCheckPanel(finding, state)}
      <div class="detail-block claim-block" data-stage="understand" data-section="recommendation">
        <h3><span class="claim-tag recommendation">Recommendation</span> What Wings proposes</h3>
        <p>${escapeHtml(finding.recommendation || "")}</p>
      </div>
      <div class="detail-block" data-stage="decide" id="decision-panel">
        ${stageLabel("2", "Decide")}
        <h3>Decision</h3>
        <p class="decision-help">Add a note if needed. A note is required when modifying the recommendation.</p>
        <div class="decision-row" role="group" aria-label="Decision actions">
          <button type="button" class="btn accept" data-action="ACCEPT">ACCEPT</button>
          <button type="button" class="btn modify" data-action="MODIFY">MODIFY</button>
          <button type="button" class="btn reject" data-action="REJECT">REJECT</button>
          <button type="button" class="btn postpone" data-action="POSTPONE">POSTPONE</button>
        </div>
        <label class="field-label" for="decision-note">Decision note</label>
        <textarea id="decision-note" class="modify-box" placeholder="Optional note. Required for MODIFY.">${escapeHtml((decision && (decision.rationale_or_modification || decision.note)) || "")}</textarea>
        ${decision ? `<p class="meta-line">Last decision: ${escapeHtml(visibleActionLabel(decision.action))} @ ${escapeHtml(decision.decided_at || "")}</p>` : ""}
        <div id="decision-confirm" class="confirm-banner hidden" role="status"></div>
      </div>
      ${lifecycleHtml}`;

    bindHelpChips(els.detailBody);

    const mcQuestion = document.getElementById("market-check-question");
    if (mcQuestion) {
      mcQuestion.addEventListener("change", () => {
        lastMarketQuestionByFinding[finding.finding_id] = mcQuestion.value;
      });
    }
    const mcRun = document.getElementById("btn-run-market-check");
    if (mcRun) mcRun.addEventListener("click", () => runMarketCheckForFinding(finding));

    els.detailBody.querySelectorAll("button[data-action]").forEach((btn) => {
      btn.addEventListener("click", () => decide(finding, btn.getAttribute("data-action")));
    });
    const closeBtn = document.getElementById("btn-close-decision");
    if (closeBtn) closeBtn.addEventListener("click", () => closeDecision(finding));
    const reopenBtn = document.getElementById("btn-reopen-decision");
    if (reopenBtn) reopenBtn.addEventListener("click", () => reopenDecision(finding));
    const downloadBtn = document.getElementById("btn-download-package");
    if (downloadBtn) downloadBtn.addEventListener("click", () => exportIntervention(finding));
    const copyBtn = document.getElementById("btn-copy-package");
    if (copyBtn) copyBtn.addEventListener("click", () => copyPackage(finding));
    const pasteEl = document.getElementById("return-paste");
    if (pasteEl) {
      pasteEl.addEventListener("input", () => {
        returnEvidenceDraft[finding.finding_id] = pasteEl.value;
      });
    }
    const importBtn = document.getElementById("btn-import-return");
    if (importBtn) {
      importBtn.addEventListener("click", () => {
        const paste = document.getElementById("return-paste");
        importReturnTxt(finding, paste);
      });
    }
    const verifyBtn = document.getElementById("btn-verify-return");
    if (verifyBtn) {
      verifyBtn.addEventListener("click", () => {
        const paste = document.getElementById("return-paste");
        runRing2Verification(finding, paste ? paste.value : "");
      });
    }
    const exportVerBtn = document.getElementById("btn-export-verification");
    if (exportVerBtn) exportVerBtn.addEventListener("click", () => exportVerification(finding));
    const targetSelect = document.getElementById("target-project-select");
    if (targetSelect) {
      targetSelect.addEventListener("change", () => {
        const stateNow = loadState();
        const d = getDecision(stateNow, finding.finding_id);
        if (!d) return;
        if (!isGovernedTarget(targetSelect.value)) {
          setStatus("Selected target is not a governed option.", true);
          return;
        }
        d.target_project = targetSelect.value;
        d.updated_at = nowIso();
        // Changing governed target before export requires a fresh package identity for the new destination.
        if (!(d.route && d.route.EXECUTION_STATUS === "PACKAGE_EXPORTED")) {
          d.intervention = null;
        }
        const ready = ensureReadyPackage(finding, d, stateNow);
        if (ready.error) {
          setStatus(ready.error, true);
          return;
        }
        pushEvent(d, "GOVERNED_TARGET_SELECTED", "Target set to " + targetSelect.value + "; package identity=" + ready.packageId, DEFAULT_OWNER);
        stateNow.decisions[finding.finding_id] = d;
        stateNow.updated_at = d.updated_at;
        saveState(stateNow);
        renderAll();
      });
    }
  }

  function decide(finding, action) {
    const noteEl = document.getElementById("decision-note");
    const note = ((noteEl && noteEl.value) || "").trim();
    const normalized = normalizeAction(action);
    if (normalized === "MODIFY" && !note) {
      setStatus("MODIFY requires a Decision note that states the modification.", true);
      if (noteEl) noteEl.focus();
      return;
    }
    const state = loadState();
    const prior = getDecision(state, finding.finding_id);
    const decidedAt = nowIso();
    let status = "DECIDED";
    if (normalized === "POSTPONE") status = "POSTPONED";
    if (normalized === "REJECT") status = "CLOSED";
    const targetOpt = resolveTargetOption(finding, prior && prior.target_project);
    const decision = migrateDecision({
      decision_id: (prior && prior.decision_id) || makeId("DEC"),
      finding_id: finding.finding_id,
      title: finding.title,
      action: normalized,
      status,
      created_at: (prior && prior.created_at) || decidedAt,
      updated_at: decidedAt,
      rationale_or_modification: note,
      previous_state: prior ? prior.status : (finding.status || "OPEN"),
      new_state: ACTION_TO_FINDING_STATUS[normalized],
      decided_at: decidedAt,
      project_id: fixture.project.project_id,
      target_project: targetOpt ? targetOpt.project_id : fixture.project.project_id,
      source_data_class: finding.data_class,
      recommendation_snapshot: finding.recommendation,
      events: (prior && prior.events) || [],
      intervention: prior ? prior.intervention : null,
      route: null,
      verification: prior ? prior.verification : null
    }, finding.finding_id);
    pushEvent(decision, "DECISION_RECORDED", visibleActionLabel(normalized) + " recorded.", DEFAULT_OWNER);
    if (normalized === "POSTPONE") pushEvent(decision, "POSTPONED", "Finding kept open for a later decision.", DEFAULT_OWNER);
    if (normalized === "REJECT") pushEvent(decision, "REJECTED_AND_CLOSED", "Rejection recorded; intervention package blocked by default.", DEFAULT_OWNER);
    if (interventionEligible(decision)) {
      const ready = ensureReadyPackage(finding, decision, state);
      if (ready.error) {
        setStatus(ready.error, true);
        return;
      }
      pushEvent(decision, "ROUTE_DERIVED", "Governed route prepared for " + decision.target_project + " with package " + ready.packageId + ".", DEFAULT_OWNER);
    } else {
      decision.next_action = deriveNextAction(decision.action, decision.status, null, null);
    }
    state.decisions[finding.finding_id] = decision;
    state.updated_at = decidedAt;
    saveState(state);
    const confirm = `Recorded ${visibleActionLabel(normalized)} for ${finding.finding_id}. Status: ${statusLabel(status)}.`;
    setStatus(confirm);
    renderAll();
    const banner = document.getElementById("decision-confirm");
    if (banner) { banner.textContent = confirm; banner.classList.remove("hidden"); }
  }

  function closeDecision(finding) {
    const state = loadState();
    const decision = getDecision(state, finding.finding_id);
    if (!decision || decision.status === "CLOSED") return;
    decision.status = "CLOSED";
    decision.next_action = deriveNextAction(decision.action, "CLOSED", null, decision.verification && decision.verification.overall_result);
    decision.updated_at = nowIso();
    pushEvent(decision, "DECISION_CLOSED", "Closed in Wings4 local tracking only.", DEFAULT_OWNER);
    state.decisions[finding.finding_id] = decision;
    state.updated_at = decision.updated_at;
    saveState(state);
    setStatus("Decision " + decision.decision_id + " closed locally.");
    renderAll();
  }

  function reopenDecision(finding) {
    const state = loadState();
    const decision = getDecision(state, finding.finding_id);
    if (!decision || !(decision.status === "CLOSED" || decision.status === "POSTPONED")) return;
    const previous = decision.status;
    decision.status = "REOPENED";
    decision.next_action = deriveNextAction(decision.action, "REOPENED", null, null);
    decision.updated_at = nowIso();
    pushEvent(decision, "DECISION_REOPENED", "Reopened from " + previous + "; history preserved.", DEFAULT_OWNER);
    state.decisions[finding.finding_id] = decision;
    state.updated_at = decision.updated_at;
    saveState(state);
    setStatus("Decision " + decision.decision_id + " reopened.");
    renderAll();
  }

  function getCanonicalPackageText(finding, decision, state) {
    if (!decision || !interventionEligible(decision)) {
      return { error: "Intervention package is not eligible for this decision." };
    }
    const packageIdBefore = decision.intervention && decision.intervention.intervention_package_id;
    const ready = ensureReadyPackage(finding, decision, state);
    if (ready.error) return { error: ready.error };
    if (packageIdBefore && !isPendingPackageId(packageIdBefore) && ready.packageId !== packageIdBefore) {
      return { error: "Package ID changed unexpectedly while preparing canonical text." };
    }
    let text = "";
    try {
      text = serializePackage(finding, decision, ready.route, ready.packageId);
    } catch (err) {
      return { error: err.message || String(err) };
    }
    const invalid = validatePackageText(text, ready.route, ready.packageId);
    if (invalid) return { error: "Package validation failed: " + invalid };
    return {
      text,
      packageId: ready.packageId,
      route: ready.route,
      packageIdUnchanged: !packageIdBefore || packageIdBefore === ready.packageId
    };
  }

  function copyTextFallback(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "readonly");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (err) {
      ok = false;
    }
    ta.remove();
    return ok;
  }

  async function copyPackage(finding) {
    const state = loadState();
    const decision = getDecision(state, finding.finding_id);
    if (!decision || !interventionEligible(decision)) {
      setStatus("Intervention package is not eligible to copy.", true);
      return;
    }
    const idBefore = decision.intervention && decision.intervention.intervention_package_id;
    const got = getCanonicalPackageText(finding, decision, state);
    if (got.error) {
      setStatus(got.error, true);
      return;
    }
    if (idBefore && got.packageId !== idBefore) {
      setStatus("COPY PACKAGE aborted: package ID must not change during copy.", true);
      return;
    }
    // Persist any first-time identity assignment without marking as exported.
    state.decisions[finding.finding_id] = decision;
    state.updated_at = nowIso();
    saveState(state);

    let copied = false;
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      try {
        await navigator.clipboard.writeText(got.text);
        copied = true;
      } catch (err) {
        copied = false;
      }
    }
    if (!copied) copied = copyTextFallback(got.text);
    if (!copied) {
      setStatus("Could not copy the package to the clipboard. Use DOWNLOAD INTERVENTION PACKAGE instead.", true);
      return;
    }
    const idAfter = decision.intervention && decision.intervention.intervention_package_id;
    if (idAfter !== got.packageId) {
      setStatus("Clipboard copy succeeded but package ID integrity check failed.", true);
      return;
    }
    setStatus("Intervention package copied (" + got.packageId + "). Same canonical text as download.");
  }

  function exportIntervention(finding) {
    const state = loadState();
    const decision = getDecision(state, finding.finding_id);
    if (!decision || !interventionEligible(decision)) {
      setStatus("Intervention package is not eligible for this decision.", true);
      return;
    }
    const got = getCanonicalPackageText(finding, decision, state);
    if (got.error) { setStatus(got.error, true); return; }
    const route = got.route;
    const packageId = got.packageId;
    const text = got.text;
    const filename = `wings4-intervention-${safeFilenamePart(packageId)}-${safeFilenamePart(route.TARGET_PROJECT)}.txt`;
    downloadText(filename, text);
    route.EXECUTION_STATUS = "PACKAGE_EXPORTED";
    decision.route = route;
    decision.status = "IN_ACTION";
    decision.intervention = {
      intervention_package_id: packageId,
      package_schema_version: PACKAGE_SCHEMA_VERSION,
      target_project: route.TARGET_PROJECT,
      target_root: route.TARGET_ROOT,
      source_project: route.SOURCE_PROJECT,
      source_root: route.SOURCE_ROOT,
      generated_at: (decision.intervention && decision.intervention.generated_at) || nowIso(),
      version: (decision.intervention && decision.intervention.version ? Number(decision.intervention.version) : 1),
      destination_role: route.DESTINATION_ROLE,
      route_id: route.route_id,
      exported: true
    };
    decision.next_action = deriveNextAction(decision.action, decision.status, route.EXECUTION_STATUS, decision.verification && decision.verification.overall_result);
    decision.updated_at = nowIso();
    pushEvent(decision, "INTERVENTION_PACKAGE_EXPORTED", "Downloaded " + packageId + " for " + route.TARGET_PROJECT + ".", DEFAULT_OWNER);
    state.decisions[finding.finding_id] = decision;
    state.updated_at = decision.updated_at;
    saveState(state);
    setStatus("Intervention package downloaded: " + filename + ". SkillsMachine was not written.");
    renderAll();
  }

  function buildExportPayload(state) {
    return {
      schema_version: SCHEMA_VERSION,
      export_id: "WINGS4_RING0_RING1_RING2_EXPORT",
      product_version: PRODUCT_VERSION,
      package_schema_version: PACKAGE_SCHEMA_VERSION,
      exported_at: nowIso(),
      project_id: fixture && fixture.project ? fixture.project.project_id : "",
      analyzed_project_mutation: "NO",
      decisions: state.decisions || {},
      verifications: state.verifications || {},
      market_checks: state.market_checks || {}
    };
  }

  function exportJson() {
    if (!fixture) { setStatus("Cannot export until the fixture has loaded.", true); return; }
    const payload = buildExportPayload(loadState());
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "wings4-ring0-ring1-ring2-decisions-" + Date.now() + ".json";
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    setStatus("Decision JSON exported. SkillsMachine was not written.");
  }

  function resetState() {
    if (!window.confirm("Reset demo and clear all local Wings decision and verification state?")) {
      setStatus("Reset cancelled."); return;
    }
    memoryState = emptyState();
    lastMarketQuestionByFinding = {};
    returnEvidenceDraft = {};
    ring2TransientByFinding = {};
    if (storageAvailable) {
      try { localStorage.removeItem(STORAGE_KEY); } catch (err) { /* ignore */ }
    }
    renderState(memoryState);
    setStatus("Demo reset. Local decision, verification and Market Check state cleared.");
    renderAll();
  }

  function validateFixture(data) {
    if (!data || typeof data !== "object") return "Fixture is not a JSON object.";
    if (!data.project || !data.project.project_id) return "Fixture is missing project.project_id.";
    if (!Array.isArray(data.findings) || data.findings.length < 3) return "Fixture must include at least three findings.";
    if (!Array.isArray(data.governed_target_options) || !data.governed_target_options.length) return "Fixture must include governed_target_options.";
    if (!data.governed_target_options[0].project_root) return "Governed target root metadata missing.";
    if (!data.source_project || !data.source_project.project_root) return "Source project root metadata missing.";
    if (!data.market_check || data.market_check.mode !== "ON_DEMAND") return "Fixture must include on-demand market_check.";
    if (!Array.isArray(data.market_check.questions) || data.market_check.questions.length < 1) return "Market Check questions missing.";
    if (!Array.isArray(data.market_check.catalog)) return "Market Check catalog missing.";
    if (!Array.isArray(data.market_check.evidence_levels) || data.market_check.evidence_levels.indexOf("UNKNOWN") < 0) {
      return "Market Check evidence_levels missing.";
    }
    if (data.market_check.runtime_complete === true) return "Fixture must not claim MARKET_CHECK_RUNTIME_COMPLETE.";
    return null;
  }

  function renderAll() {
    if (!fixture) return;
    const state = loadState();
    renderWings4(fixture.wings4);
    renderProject(fixture.project, fixture.findings || [], state);
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
      setStatus("Fixture loaded. Diagnosis, decision, package, return-verification and on-demand Market Check are ready.");
    } catch (err) {
      els.projectCard.innerHTML = `<p class="status error">Could not load the diagnostic fixture.</p><p class="muted">${escapeHtml(err.message)}</p>`;
      setStatus("Could not load skillsmachine.fixture.json: " + err.message, true);
    }
  }

  window.Wings4Ring0 = {
    SCHEMA_VERSION, PRODUCT_VERSION, PACKAGE_SCHEMA_VERSION,
    extractAiBlock, parseKeyValues, classifyVerification, validateFixture,
    isValidPackageIdPattern, isPendingPackageId, isTemplateValue, isMissingOrTemplate,
    displayEvidenceValue, getCanonicalPackageText, buildVerificationExplanation,
    returnAiBlockTemplate, HELP_COPY, findingFactText, findingInferenceText,
    operatorInterventionSummary, runMarketCheckForFinding, defaultMarketQuestion
  };

  boot();
})();
