/**
 * 球迷人格测试 2.0 — 算分 & 向量匹配
 *
 * 三步算法：
 * 1. 答题 → 15 子维度各算原始分 (2-6)
 * 2. 原始分归档 → L(1) / M(2) / H(3)
 * 3. 用户向量 vs 人格模板 → 曼哈顿距离匹配
 */

var Algorithm = (function () {

  // ── 第一步：累计原始分 ──
  function calcRawScores(selections) {
    var raw = {};
    DIM_ORDER.forEach(function (d) { raw[d] = 0; });

    for (var i = 0; i < QUESTIONS.length; i++) {
      var q = QUESTIONS[i];
      if (q.dimension === 'ballAge') continue; // 球龄题不计分
      var sel = selections[i];
      if (sel === undefined) continue;
      raw[q.dimension] += q.options[sel].score;
    }
    return raw;
  }

  // ── 第二步：归档 L/M/H ──
  function archiveScores(raw) {
    var vec = [];
    DIM_ORDER.forEach(function (d) {
      var s = raw[d];
      if (s <= 3) vec.push(1);      // L
      else if (s === 4) vec.push(2); // M
      else vec.push(3);              // H
    });
    return vec;
  }

  // ── 第三步：向量匹配 ──
  function matchPersonality(userVec) {
    var candidates = [];

    for (var key in RESULTS) {
      var r = RESULTS[key];
      if (!r.pattern) continue; // 跳过隐藏人格（BEER）

      var distance = 0;
      var exact = 0;
      for (var i = 0; i < 15; i++) {
        var diff = Math.abs(userVec[i] - r.pattern[i]);
        distance += diff;
        if (diff === 0) exact++;
      }
      var similarity = Math.max(0, Math.round((1 - distance / 30) * 100));

      candidates.push({
        key: key,
        distance: distance,
        exact: exact,
        similarity: similarity
      });
    }

    // 排序：distance 最小 → exact 最多 → similarity 最高
    candidates.sort(function (a, b) {
      if (a.distance !== b.distance) return a.distance - b.distance;
      if (a.exact !== b.exact) return b.exact - a.exact;
      return b.similarity - a.similarity;
    });

    var best = candidates[0];

    // 兜底：相似度 < 50% → 输出 EMMM（佛系看客）
    if (best.similarity < 50) {
      best = { key: 'EMMM', similarity: best.similarity, distance: best.distance, exact: best.exact };
    }

    return {
      type: best.key,
      result: RESULTS[best.key],
      similarity: best.similarity,
      userVector: userVec,
      allMatches: candidates.slice(0, 5) // 前5名，调试用
    };
  }

  // ── 5 大模型得分（用于结果页可视化）──
  function calcModelScores(raw) {
    var models = {};
    for (var key in MODELS) {
      models[key] = { total: 0, max: 0 };
    }
    DIM_ORDER.forEach(function (d) {
      var model = DIMENSIONS[d].model;
      models[model].total += raw[d];
      models[model].max += 6; // 每维最高6分
    });
    // 转成百分比
    for (var k in models) {
      models[k].pct = Math.round(models[k].total / models[k].max * 100);
    }
    return models;
  }

  // ── 对外接口 ──
  return {
    run: function (selections) {
      var raw = calcRawScores(selections);
      var vec = archiveScores(raw);
      var match = matchPersonality(vec);
      var modelScores = calcModelScores(raw);
      return {
        type: match.type,
        result: match.result,
        similarity: match.similarity,
        userVector: vec,
        rawScores: raw,
        modelScores: modelScores,
        topMatches: match.allMatches
      };
    }
  };

})();
