/**
 * 球迷人格测试 — 主逻辑（按维度分页版）
 */

(function () {

  // ── 维度分页 ──
  var PAGES = [
    { key: "EI", label: "社交属性：外向 vs 内向", questions: [0,1,2,3,4,5] },
    { key: "SN", label: "认知方式：数据实感 vs 直觉灵感", questions: [6,7,8,9,10] },
    { key: "TF", label: "决策风格：理性思考 vs 情感驱动", questions: [11,12,13,14,15,16] },
    { key: "JP", label: "生活方式：计划控 vs 随性派", questions: [17,18,19,20,21] },
    { key: "cross", label: "综合判断", questions: [22,23] }
  ];

  var TOTAL_QUESTIONS = QUESTIONS.length;  // 24

  var currentPage = 0;
  var selections = {};  // { questionIndex: selectedValue 或 selectedValues }

  // ── DOM ──
  var pageStart   = document.getElementById('page-start');
  var pageQuiz    = document.getElementById('page-quiz');
  var pageResult  = document.getElementById('page-result');
  var dimLabel    = document.getElementById('quiz-dim-label');
  var pageNum     = document.getElementById('quiz-page-num');
  var progressFill = document.getElementById('progress-fill');
  var container   = document.getElementById('quiz-container');
  var btnNext     = document.getElementById('btn-next');
  var btnPrev     = document.getElementById('btn-prev');
  var toastEl     = document.getElementById('toast');

  // ── 开始测试 ──
  document.getElementById('btn-start').addEventListener('click', function () {
    pageStart.classList.remove('active');
    pageQuiz.classList.add('active');
    renderPage(0);
  });

  // ── 下一页按钮 ──
  btnNext.addEventListener('click', handleNext);

  // ── 上一页按钮 ──
  btnPrev.addEventListener('click', function () {
    if (currentPage > 0) {
      renderPage(currentPage - 1);
    }
  });

  // ── 渲染维度页 ──
  function renderPage(pageIndex) {
    currentPage = pageIndex;
    var pg = PAGES[pageIndex];

    // 顶部信息
    dimLabel.textContent = pg.label;
    pageNum.textContent = (pageIndex + 1) + ' / ' + PAGES.length;
    updateProgress();

    // 按钮文案
    btnNext.textContent = (pageIndex === PAGES.length - 1) ? '查看结果' : '下一页';

    // 第一页隐藏上一页按钮
    btnPrev.style.display = (pageIndex === 0) ? 'none' : '';

    // 生成题目卡片
    container.innerHTML = '';
    container.scrollTop = 0;

    pg.questions.forEach(function (qIdx, i) {
      var q = QUESTIONS[qIdx];
      var card = document.createElement('div');
      card.className = 'question-card';
      card.id = 'qcard-' + qIdx;

      // 如果已有选择，标记 answered
      if (selections[qIdx] !== undefined) {
        card.classList.add('answered');
      }

      var html = '';
      // 帖子头部：头像 + 标题 + 时间
      html += '<div class="q-header">';
      html += '  <div class="q-avatar"><img src="img/avatar-default.png" alt="" onerror="this.style.display=\'none\'"></div>';
      html += '  <div class="q-header-info">';
      html += '    <div class="q-title">' + escapeHtml(q.title) + '</div>';
      html += '    <div class="q-time">刚刚</div>';
      html += '  </div>';
      html += '</div>';
      // 帖子正文
      html += '<div class="q-text">' + escapeHtml(q.question) + '</div>';
      // 分隔引导
      html += '<div class="q-divider">';
      html += '  <div class="q-divider-bar"></div>';
      html += '  <div class="q-divider-text">你会选择：</div>';
      html += '</div>';
      html += '<div class="q-options">';

      if (q.dimension === 'cross') {
        // 交叉题：4选项
        q.options.forEach(function (opt, optIndex) {
          var sel = (selections[qIdx] === optIndex) ? ' selected' : '';
          html += '<button class="option-btn' + sel + '" data-qidx="' + qIdx + '" data-opt-index="' + optIndex + '">' + escapeHtml(opt.text) + '</button>';
        });
      } else {
        // 常规题：2选项
        var selA = (selections[qIdx] === 'A') ? ' selected' : '';
        var selB = (selections[qIdx] === 'B') ? ' selected' : '';
        html += '<button class="option-btn' + selA + '" data-qidx="' + qIdx + '" data-choice="A">' + escapeHtml(q.optionA.text) + '</button>';
        html += '<button class="option-btn' + selB + '" data-qidx="' + qIdx + '" data-choice="B">' + escapeHtml(q.optionB.text) + '</button>';
      }

      html += '</div>';
      card.innerHTML = html;
      container.appendChild(card);
    });

    // 事件代理：选项点击
    container.onclick = function (e) {
      var btn = e.target.closest('.option-btn');
      if (!btn) return;

      var qIdx = parseInt(btn.getAttribute('data-qidx'));
      var q = QUESTIONS[qIdx];

      if (q.dimension === 'cross') {
        var optIndex = parseInt(btn.getAttribute('data-opt-index'));
        selectOption(qIdx, optIndex);
      } else {
        var choice = btn.getAttribute('data-choice');
        selectOption(qIdx, choice);
      }
    };
  }

  // ── 选择/切换选项 ──
  function selectOption(qIdx, value) {
    var isNewAnswer = (selections[qIdx] === undefined);
    selections[qIdx] = value;

    // 更新按钮状态
    var card = document.getElementById('qcard-' + qIdx);
    card.classList.add('answered');
    var btns = card.querySelectorAll('.option-btn');

    var q = QUESTIONS[qIdx];
    if (q.dimension === 'cross') {
      btns.forEach(function (b) {
        var idx = parseInt(b.getAttribute('data-opt-index'));
        b.classList.toggle('selected', idx === value);
      });
    } else {
      btns.forEach(function (b) {
        b.classList.toggle('selected', b.getAttribute('data-choice') === value);
      });
    }

    // 更新进度条
    updateProgress();

    // 答完后自动滚到本页下一道未答题
    if (isNewAnswer) {
      var pg = PAGES[currentPage];
      var currentPos = pg.questions.indexOf(qIdx);
      for (var i = currentPos + 1; i < pg.questions.length; i++) {
        var nextQIdx = pg.questions[i];
        if (selections[nextQIdx] === undefined) {
          setTimeout(function () {
            scrollToQuestion(nextQIdx);
          }, 300);
          return;
        }
      }
    }
  }

  // ── 更新进度条（题目级）──
  function updateProgress() {
    var answered = Object.keys(selections).length;
    progressFill.style.width = (answered / TOTAL_QUESTIONS * 100) + '%';
    pageNum.textContent = answered + ' / ' + TOTAL_QUESTIONS;
  }

  // ── 下一页 / 查看结果 ──
  function handleNext() {
    var pg = PAGES[currentPage];
    var unanswered = [];

    pg.questions.forEach(function (qIdx) {
      if (selections[qIdx] === undefined) {
        unanswered.push(qIdx);
      }
    });

    if (unanswered.length > 0) {
      showToast('本页题目还没有答完哦');
      scrollToQuestion(unanswered[0]);
      return;
    }

    // 全部回答完
    if (currentPage < PAGES.length - 1) {
      renderPage(currentPage + 1);
    } else {
      showResult();
    }
  }

  // ── 滚动到指定题目 ──
  function scrollToQuestion(qIdx) {
    var card = document.getElementById('qcard-' + qIdx);
    if (!card) return;

    card.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // 高亮闪烁
    card.classList.add('highlight');
    setTimeout(function () {
      card.classList.remove('highlight');
    }, 1500);
  }

  // ── Toast ──
  var toastTimer = null;
  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('show');
    }, 2000);
  }

  // ── 算分 ──
  function calcScores() {
    var scores = { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 };

    for (var qIdx in selections) {
      var idx = parseInt(qIdx);
      var q = QUESTIONS[idx];
      var sel = selections[idx];

      if (q.dimension === 'cross') {
        // 交叉题：sel 是 optIndex
        var vals = q.options[sel].values;
        for (var dim in vals) {
          scores[vals[dim]]++;
        }
      } else {
        // 常规题：sel 是 'A' 或 'B'
        var chosen = (sel === 'A') ? q.optionA : q.optionB;
        scores[chosen.value]++;
      }
    }
    return scores;
  }

  function calcType(scores) {
    var type = '';
    type += scores.E >= scores.I ? 'E' : 'I';
    type += scores.S >= scores.N ? 'S' : 'N';
    type += scores.T >= scores.F ? 'T' : 'F';
    type += scores.J >= scores.P ? 'J' : 'P';
    return type;
  }

  // ── 维度中文标签 ──
  var DIM_LABELS = {
    E: '外向', I: '内向',
    S: '实感', N: '直觉',
    T: '理性', F: '情感',
    J: '计划', P: '随性'
  };

  // ── 显示结果 ──
  function showResult() {
    var scores = calcScores();
    var type = calcType(scores);
    var r = RESULTS[type];

    pageQuiz.classList.remove('active');
    pageResult.classList.add('active');

    // 英雄区
    var hero = document.getElementById('result-hero');
    hero.style.background = r.color;
    document.getElementById('result-name').textContent = r.name;
    document.getElementById('result-type').textContent = type;
    document.getElementById('result-star').textContent = '代表球星：' + r.star;
    document.getElementById('result-tagline').textContent = '「' + r.tagline + '」';

    // 维度条（懂球帝评分风格）
    var pairs = [
      { a: 'E', b: 'I' },
      { a: 'S', b: 'N' },
      { a: 'T', b: 'F' },
      { a: 'J', b: 'P' }
    ];

    var barsHTML = '';
    pairs.forEach(function (p) {
      var total = scores[p.a] + scores[p.b];
      var pctA = total > 0 ? Math.round(scores[p.a] / total * 100) : 50;
      var pctB = 100 - pctA;
      // 避免整数50，微调
      if (pctA === 50) { pctA = 51; pctB = 49; }
      var leftWins = pctA >= pctB;
      var winPct = leftWins ? pctA : pctB;

      barsHTML +=
        '<div class="dim-row">' +
          '<span class="dim-label-left' + (leftWins ? ' active' : '') + '">' + DIM_LABELS[p.a] + '</span>' +
          '<div class="dim-bar-track">' +
            '<div class="dim-bar-left" style="width:' + pctA + '%;background:' + r.color + '"></div>' +
            '<div class="dim-bar-right"></div>' +
          '</div>' +
          '<span class="dim-label-right' + (!leftWins ? ' active' : '') + '">' + DIM_LABELS[p.b] + '</span>' +
          '<span class="dim-pct">' + winPct + '%</span>' +
        '</div>';
    });
    document.getElementById('dimension-bars').innerHTML = barsHTML;

    // 免费摘要
    document.getElementById('result-summary').textContent = r.tagline;
    document.getElementById('result-stat').textContent = '全站 ' + (Math.random() * 8 + 4).toFixed(1) + '% 的球迷和你同类型';

    // 完整解析（露出一半）
    document.getElementById('full-result-text').textContent = r.description;

    // 付费按钮
    document.getElementById('btn-unlock-pay').onclick = unlockFull;
    document.getElementById('btn-unlock-video').onclick = unlockFull;

    // 分享按钮
    document.getElementById('btn-share').onclick = function () {
      generateShareCard(type, r, scores, pairs);
    };

    // 关闭弹窗
    document.getElementById('btn-close-modal').onclick = closeShareModal;
    document.getElementById('share-modal').onclick = function (e) {
      if (e.target === this) closeShareModal();
    };

    // 保存图片
    document.getElementById('btn-save-card').onclick = saveShareCard;

    // 重测
    document.getElementById('btn-retry').onclick = function () {
      location.reload();
    };
  }

  function unlockFull() {
    document.getElementById('paywall-wrap').classList.add('unlocked');
  }

  // ── 分享卡片 ──
  function generateShareCard(type, r, scores, pairs) {
    var canvas = document.getElementById('share-canvas');
    var ctx = canvas.getContext('2d');
    var w = 600, h = 800;
    canvas.width = w;
    canvas.height = h;

    // 背景
    ctx.fillStyle = r.color;
    ctx.fillRect(0, 0, w, h * 0.45);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, h * 0.45, w, h * 0.55);

    // 头像占位圆
    ctx.beginPath();
    ctx.arc(w / 2, 120, 40, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 文字 - 英雄区
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.font = 'bold 32px -apple-system, PingFang SC, sans-serif';
    ctx.fillText(r.name, w / 2, 200);
    ctx.font = '16px -apple-system, PingFang SC, sans-serif';
    ctx.globalAlpha = 0.7;
    ctx.fillText(type, w / 2, 228);
    ctx.globalAlpha = 0.85;
    ctx.fillText('代表球星：' + r.star, w / 2, 254);
    ctx.globalAlpha = 0.95;
    ctx.font = '600 18px -apple-system, PingFang SC, sans-serif';
    ctx.fillText('「' + r.tagline + '」', w / 2, 290);
    ctx.globalAlpha = 1;

    // 维度条
    var barY = h * 0.45 + 40;
    ctx.font = '600 14px -apple-system, PingFang SC, sans-serif';
    var DIM = { E:'外向',I:'内向',S:'实感',N:'直觉',T:'理性',F:'情感',J:'计划',P:'随性' };

    pairs.forEach(function (p, i) {
      var total = scores[p.a] + scores[p.b];
      var pctA = total > 0 ? Math.round(scores[p.a] / total * 100) : 50;
      if (pctA === 50) pctA = 51;
      var y = barY + i * 50;

      // 左标签
      ctx.textAlign = 'right';
      ctx.fillStyle = pctA >= 50 ? r.color : '#bbb';
      ctx.fillText(DIM[p.a], 70, y + 4);

      // 条
      var barX = 82, barW = 380, barH = 10;
      ctx.fillStyle = '#EBEDF0';
      ctx.beginPath();
      ctx.roundRect(barX, y - 5, barW, barH, 5);
      ctx.fill();
      ctx.fillStyle = r.color;
      ctx.beginPath();
      ctx.roundRect(barX, y - 5, barW * pctA / 100, barH, 5);
      ctx.fill();

      // 右标签
      ctx.textAlign = 'left';
      ctx.fillStyle = pctA < 50 ? r.color : '#bbb';
      ctx.fillText(DIM[p.b], barX + barW + 10, y + 4);

      // 百分比
      ctx.textAlign = 'right';
      ctx.fillStyle = r.color;
      ctx.font = 'bold 14px -apple-system, PingFang SC, sans-serif';
      ctx.fillText(Math.max(pctA, 100 - pctA) + '%', w - 30, y + 4);
      ctx.font = '600 14px -apple-system, PingFang SC, sans-serif';
    });

    // 底部品牌
    ctx.textAlign = 'center';
    ctx.fillStyle = '#bbb';
    ctx.font = '13px -apple-system, PingFang SC, sans-serif';
    ctx.fillText('懂球帝 · 球迷人格测试', w / 2, h - 30);

    // 显示弹窗
    document.getElementById('share-modal').classList.add('show');
  }

  function closeShareModal() {
    document.getElementById('share-modal').classList.remove('show');
  }

  function saveShareCard() {
    var canvas = document.getElementById('share-canvas');
    var link = document.createElement('a');
    link.download = '我的球迷人格.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  // ── 工具 ──
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

})();
