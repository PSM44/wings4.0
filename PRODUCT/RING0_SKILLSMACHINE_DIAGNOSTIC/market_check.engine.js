(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.Wings4MarketCheck = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var EVAL_ORDER = [
    "SAME_PROJECT",
    "PORTFOLIO_REUSABLE",
    "SKILL_GRC",
    "INTEGRATE",
    "OPEN_SOURCE",
    "COMMERCIAL",
    "RESIDUAL_CUSTOM"
  ];

  var EVIDENCE_LEVELS = [
    "WINGS_HELD",
    "HUMAN_PROVIDED",
    "EXTERNAL_CHECKED",
    "UNKNOWN"
  ];

  var LIMITS = [
    "NOT_MARKET_MONITORING",
    "NOT_RADAR",
    "NOT_RING3",
    "NO_CHILD_REPOSITORY_ACCESS",
    "NO_LIVE_WEB_SCAN",
    "WINGS_HELD_OR_FIXTURE_EVIDENCE_ONLY",
    "DISCOVERY_DOES_NOT_AUTHORIZE_ADOPTION"
  ];

  var DISPOSITION_LABEL = {
    REUSE_SAME_PROJECT: "Use what this project already has",
    REUSE_PORTFOLIO: "Reuse a portfolio capability",
    ADOPT_SKILL_GRC: "Adopt a Skill or GRC",
    ADOPT_OPEN_SOURCE: "Adopt a suitable open-source tool",
    ADOPT_COMMERCIAL: "Adopt a suitable commercial tool",
    BUILD_RESIDUAL: "Build only the remaining gap",
    INTEGRATE: "Integrate an existing solution",
    DEFER: "Defer this work",
    KILL: "Stop this work",
    UNKNOWN: "Unknown — evidence is missing"
  };

  var CLASS_LABEL = {
    SAME_PROJECT: "Already in this project",
    PORTFOLIO_REUSABLE: "Reusable in the portfolio",
    SKILL_GRC: "Skill or GRC",
    INTEGRATE: "Integrate an existing solution",
    OPEN_SOURCE: "Open-source option",
    COMMERCIAL: "Commercial option",
    RESIDUAL_CUSTOM: "Remaining custom build",
    DEFER: "Defer",
    KILL: "Stop"
  };

  var CLASS_TO_DISPOSITION = {
    SAME_PROJECT: "REUSE_SAME_PROJECT",
    PORTFOLIO_REUSABLE: "REUSE_PORTFOLIO",
    SKILL_GRC: "ADOPT_SKILL_GRC",
    INTEGRATE: "INTEGRATE",
    OPEN_SOURCE: "ADOPT_OPEN_SOURCE",
    COMMERCIAL: "ADOPT_COMMERCIAL",
    RESIDUAL_CUSTOM: "BUILD_RESIDUAL",
    DEFER: "DEFER",
    KILL: "KILL"
  };

  function evidenceLevelOf(entry) {
    if (!entry || isMissingEntry(entry)) return "UNKNOWN";
    var lvl = String(entry.evidence_level || "").toUpperCase();
    if (lvl === "WINGS_HELD" || lvl === "HUMAN_PROVIDED" || lvl === "EXTERNAL_CHECKED") return lvl;
    return "WINGS_HELD";
  }

  function isMissingEntry(entry) {
    if (!entry) return true;
    var status = String(entry.evidence_status || "").toUpperCase();
    var fit = String(entry.fit || "").toUpperCase();
    var disp = String(entry.disposition_if_selected || "").toUpperCase();
    return status === "MISSING" || fit === "UNKNOWN" || disp === "UNKNOWN";
  }

  function findQuestion(questions, questionId) {
    var list = questions || [];
    for (var i = 0; i < list.length; i += 1) {
      if (list[i] && list[i].id === questionId) return list[i];
    }
    return null;
  }

  function applicableEntries(catalog, findingId, questionId) {
    var out = [];
    var list = catalog || [];
    for (var i = 0; i < list.length; i += 1) {
      var e = list[i];
      if (!e) continue;
      var findings = e.applies_to_finding_ids || [];
      var questions = e.applies_to_questions || [];
      var findingOk = false;
      var questionOk = false;
      for (var f = 0; f < findings.length; f += 1) {
        if (findings[f] === findingId) findingOk = true;
      }
      for (var q = 0; q < questions.length; q += 1) {
        if (questions[q] === questionId) questionOk = true;
      }
      if (findingOk && questionOk) out.push(e);
    }
    return out;
  }

  function baseResult(finding, question, extra) {
    var findingId = finding && finding.finding_id ? finding.finding_id : "";
    var questionId = question && question.id ? question.id : "";
    var result = {
      invoked_on_demand: true,
      check_id: "MCCHK-" + findingId + "-" + questionId,
      finding_id: findingId,
      question_id: questionId,
      question_label: question && question.label ? question.label : "",
      recommendation: "UNKNOWN",
      recommendation_label: DISPOSITION_LABEL.UNKNOWN,
      confidence: "UNKNOWN",
      fact: "",
      inference: "",
      alternatives: [],
      scope: "Bounded on-demand Market Check for this finding only. Wings-held or fixture evidence. No live market scan.",
      authority: "Pablo decides. Discovery does not authorize adoption, integration, or project mutation.",
      limits: LIMITS.slice(),
      unknown_reason: "",
      required_evidence: "",
      next_action: "",
      evidence: [],
      evidence_level: "UNKNOWN",
      evaluation_order: EVAL_ORDER.slice(),
      not_market_monitoring: true,
      not_radar: true,
      not_ring3: true
    };
    if (extra) {
      var keys = Object.keys(extra);
      for (var i = 0; i < keys.length; i += 1) result[keys[i]] = extra[keys[i]];
    }
    result.recommendation_label = DISPOSITION_LABEL[result.recommendation] || result.recommendation_label;
    return result;
  }

  function collectEvidence(entries) {
    var out = [];
    for (var i = 0; i < entries.length; i += 1) {
      var ev = entries[i].evidence || [];
      for (var j = 0; j < ev.length; j += 1) out.push(ev[j]);
    }
    return out;
  }

  function unknownForGap(finding, question, alternatives, reason, required, nextAction, evidence) {
    return baseResult(finding, question, {
      recommendation: "UNKNOWN",
      confidence: "UNKNOWN",
      fact: reason,
      inference: "Wings cannot convert missing evidence into a build/buy recommendation.",
      alternatives: alternatives,
      unknown_reason: reason,
      required_evidence: required,
      next_action: nextAction,
      evidence: evidence || []
    });
  }

  function runMarketCheck(args) {
    args = args || {};
    var finding = args.finding || {};
    var questionId = args.question_id;
    var mc = args.market_check || {};
    var questions = mc.questions || [];
    var catalog = mc.catalog || [];
    var order = (mc.evaluation_order && mc.evaluation_order.length) ? mc.evaluation_order : EVAL_ORDER;

    var question = findQuestion(questions, questionId);
    if (!question) {
      return unknownForGap(
        finding,
        { id: questionId || "", label: "" },
        [],
        "The selected Market Check question is not a governed option.",
        "Choose one of the governed Market Check questions.",
        "Select a governed question and run Market Check again."
      );
    }

    var applicable = applicableEntries(catalog, finding.finding_id, questionId);
    var deferKill = questionId === "MCQ-KILL_OR_DEFER";
    var walk = deferKill ? ["DEFER", "KILL"] : order;
    var alternatives = [];
    var winner = null;
    var missingNotes = [];

    if (!applicable.length) {
      for (var i = 0; i < walk.length; i += 1) {
        alternatives.push({
          option: CLASS_LABEL[walk[i]] || walk[i],
          eval_class: walk[i],
          status: "NOT_EVIDENCED",
          evidence_level: "UNKNOWN",
          summary: "No Wings-held Market Check entry for this class."
        });
      }
      return unknownForGap(
        finding,
        question,
        alternatives,
        "No Wings-held Market Check evidence is recorded for this finding and question.",
        "A bounded, named comparison of same-project, portfolio, Skill/GRC, open-source and commercial options — or an explicit defer/stop record.",
        "Keep the result UNKNOWN, use the finding alternatives, or collect named evidence. Do not invent a market."
      );
    }

    for (var c = 0; c < walk.length; c += 1) {
      var cls = walk[c];
      var entries = [];
      for (var e = 0; e < applicable.length; e += 1) {
        if (applicable[e].eval_class === cls) entries.push(applicable[e]);
      }
      if (!entries.length) {
        alternatives.push({
          option: CLASS_LABEL[cls] || cls,
          eval_class: cls,
          status: "NOT_EVIDENCED",
          evidence_level: "UNKNOWN",
          summary: "No Wings-held evidence for this class."
        });
        continue;
      }
      for (var k = 0; k < entries.length; k += 1) {
        var entry = entries[k];
        var missing = isMissingEntry(entry);
        alternatives.push({
          option: entry.title || (CLASS_LABEL[cls] || cls),
          eval_class: cls,
          status: missing ? "UNKNOWN" : "CONSIDERED",
          evidence_level: evidenceLevelOf(entry),
          summary: entry.summary || "",
          entry_id: entry.entry_id || ""
        });
        if (missing) {
          missingNotes.push(entry.missing_evidence || entry.summary || ("Missing evidence for " + cls + "."));
        } else if (!winner) {
          winner = entry;
        }
      }
    }

    if (!winner) {
      return unknownForGap(
        finding,
        question,
        alternatives,
        missingNotes[0] || "Catalog entries exist but none have usable evidence.",
        (applicable[0] && applicable[0].required_evidence) || "Named, Wings-held evidence for at least one evaluation class.",
        (applicable[0] && applicable[0].next_action) || "Collect the missing evidence or keep UNKNOWN.",
        collectEvidence(applicable)
      );
    }

    var disposition = winner.disposition_if_selected || CLASS_TO_DISPOSITION[winner.eval_class] || "UNKNOWN";
    return baseResult(finding, question, {
      recommendation: disposition,
      confidence: winner.confidence || "MEDIUM",
      fact: winner.summary || "",
      inference: "Following the required evaluation order, the first evidenced class is " + (CLASS_LABEL[winner.eval_class] || winner.eval_class) + ".",
      alternatives: alternatives,
      unknown_reason: "",
      required_evidence: "",
      next_action: "Human decides among the alternatives. This check does not adopt, buy, build, or mutate any project.",
      evidence: collectEvidence([winner]),
      evidence_level: evidenceLevelOf(winner)
    });
  }

  return {
    EVAL_ORDER: EVAL_ORDER,
    EVIDENCE_LEVELS: EVIDENCE_LEVELS,
    LIMITS: LIMITS,
    DISPOSITION_LABEL: DISPOSITION_LABEL,
    CLASS_LABEL: CLASS_LABEL,
    runMarketCheck: runMarketCheck
  };
});
