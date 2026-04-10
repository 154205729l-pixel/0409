/**
 * 球迷人格测试 2.0 — 主逻辑
 * 流程：答题(5个维度页, 共31题) → 结果页
 */

(function () {

  var TOTAL = QUESTIONS.length; // 31
  var PAGE_KEYS = ['S', 'E', 'A', 'D', 'C'];
  var currentPage = 0;
  var selections = {}; // { questionIndex: selectedOptionIndex }
  var userInfo = { nickname: '', avatar: '⚽', ballAge: '' };

  // ── 按维度分组题目 ──
  var PAGE_QUESTIONS = {};
  PAGE_KEYS.forEach(function (k) { PAGE_QUESTIONS[k] = []; });
  QUESTIONS.forEach(function (q, i) {
    var key = q.dimension.charAt(0);
    if (key === 'b') key = 'C'; // ballAge 归入 C 页
    if (PAGE_QUESTIONS[key]) {
      PAGE_QUESTIONS[key].push({ question: q, index: i });
    }
  });

  // ── DOM ──
  var pageQuiz     = document.getElementById('page-quiz');
  var pageResult   = document.getElementById('page-result');
  var progressText = document.getElementById('quiz-progress-text');
  var progressFill = document.getElementById('progress-fill');
  var dimLabel     = document.querySelector('.quiz-dim-label');
  var container    = document.getElementById('quiz-container');
  var btnNext      = document.getElementById('btn-next');
  var btnPrev      = document.getElementById('btn-prev');
  var toastEl      = document.getElementById('toast');

  // ── 初始化 ──
  renderPage(0);

  // ── 下一页 ──
  btnNext.addEventListener('click', function () {
    // 收集球龄
    var ballageInput = container.querySelector('.ballage-input');
    if (ballageInput && ballageInput.value.trim()) {
      userInfo.ballAge = ballageInput.value.trim();
    }

    // 校验当前页所有计分题是否选完
    var pageQs = PAGE_QUESTIONS[PAGE_KEYS[currentPage]];
    for (var i = 0; i < pageQs.length; i++) {
      var item = pageQs[i];
      if (item.question.type === 'text') continue;
      if (selections[item.index] === undefined) {
        showToast('还有题没选完');
        // 滚到未选题
        var card = container.querySelector('[data-qi="' + item.index + '"]');
        if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }

    if (currentPage < 4) {
      renderPage(currentPage + 1);
    } else {
      showResult();
    }
  });

  // ── 上一页 ──
  btnPrev.addEventListener('click', function () {
    // 保存球龄
    var ballageInput = container.querySelector('.ballage-input');
    if (ballageInput && ballageInput.value.trim()) {
      userInfo.ballAge = ballageInput.value.trim();
    }
    if (currentPage > 0) {
      renderPage(currentPage - 1);
    }
  });

  // ── 渲染维度页 ──
  function renderPage(pageIdx) {
    currentPage = pageIdx;
    var key = PAGE_KEYS[pageIdx];
    var model = MODELS[key];
    var pageQs = PAGE_QUESTIONS[key];

    // 进度（以题目为单位）
    var answered = Object.keys(selections).length;
    dimLabel.textContent = model.name;
    progressText.textContent = answered + ' / ' + TOTAL;
    progressFill.style.width = (answered / TOTAL * 100) + '%';

    // 按钮
    btnNext.textContent = (pageIdx === 4) ? '查看结果' : '下一页';
    btnPrev.style.display = (pageIdx === 0) ? 'none' : '';

    // 清空
    container.innerHTML = '';
    container.scrollTop = 0;

    // intro 卡片（仅第一页）
    if (pageIdx === 0) {
      var intro = document.createElement('div');
      intro.className = 'intro-card';
      intro.innerHTML =
        '<div class="intro-title">JBTI</div>' +
        '<div class="intro-subtitle">速测球感，找到和你契合的球星</div>';
      container.appendChild(intro);
    }

    // 渲染该维度所有题目
    pageQs.forEach(function (item) {
      var q = item.question;
      var idx = item.index;

      var card = document.createElement('div');
      card.className = 'question-card';
      card.setAttribute('data-qi', idx);

      var html = '';
      html += '<div class="q-header">';
      html += '  <div class="q-avatar"><img src="data:image/png;base64,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" alt="" onerror="this.style.display=\'none\'"></div>';
      html += '  <div class="q-header-info">';
      html += '    <div class="q-title">' + escapeHtml(q.tag || '') + '</div>';
      html += '    <div class="q-time">刚刚</div>';
      html += '  </div>';
      html += '</div>';
      html += '<div class="q-text">' + escapeHtml(q.text) + '</div>';

      if (q.type === 'text') {
        var val = userInfo.ballAge || '';
        html += '<div class="q-options">';
        html += '<input type="text" class="ballage-input option-btn" placeholder="随便写，比如：三年老球迷" maxlength="' + (q.maxLength || 20) + '" value="' + escapeHtml(val) + '">';
        html += '</div>';
      } else {
        html += '<div class="q-divider">';
        html += '  <div class="q-divider-bar"></div>';
        html += '  <div class="q-divider-text">你会选择：</div>';
        html += '</div>';
        html += '<div class="q-options">';
        q.options.forEach(function (opt, optIdx) {
          var sel = (selections[idx] === optIdx) ? ' selected' : '';
          html += '<button class="option-btn' + sel + '" data-opt="' + optIdx + '" data-qi="' + idx + '">' + escapeHtml(opt.text) + '</button>';
        });
        html += '</div>';
      }

      card.innerHTML = html;
      container.appendChild(card);
    });

    // 选项点击（事件委托）
    container.onclick = function (e) {
      var btn = e.target.closest('.option-btn');
      if (!btn || btn.classList.contains('ballage-input')) return;
      var optIdx = parseInt(btn.getAttribute('data-opt'));
      var qIdx = parseInt(btn.getAttribute('data-qi'));
      selections[qIdx] = optIdx;

      // 更新同题选中状态
      var card = btn.closest('.question-card');
      card.querySelectorAll('.option-btn').forEach(function (b) {
        b.classList.toggle('selected', parseInt(b.getAttribute('data-opt')) === optIdx);
      });
      card.classList.add('answered');

      // 更新进度条
      var answered = Object.keys(selections).length;
      progressText.textContent = answered + ' / ' + TOTAL;
      progressFill.style.width = (answered / TOTAL * 100) + '%';

      // 自动滚到当前页下一道未答题
      setTimeout(function () {
        var pageQs = PAGE_QUESTIONS[PAGE_KEYS[currentPage]];
        for (var j = 0; j < pageQs.length; j++) {
          var it = pageQs[j];
          if (it.question.type === 'text') continue;
          if (selections[it.index] === undefined) {
            var nextCard = container.querySelector('[data-qi="' + it.index + '"]');
            if (nextCard) nextCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
          }
        }
      }, 300);
    };
  }

  // ── 显示结果页 ──
  function showResult() {
    var data = Algorithm.run(selections);
    var r = data.result;

    pageQuiz.classList.remove('active');
    pageResult.classList.add('active');

    // 确保结果页从顶部开始
    window.scrollTo(0, 0);
    pageResult.scrollTop = 0;

    // 英雄区背景色（使用人格配色）
    var hero = document.getElementById('result-hero');
    hero.style.background = r.color;

    // 头像（占位灰圈，后续替换为真实头像）
    document.getElementById('result-avatar').innerHTML = '';

    // 人格信息
    document.getElementById('result-code').textContent = r.code;
    document.getElementById('result-name').textContent = r.name;
    document.getElementById('result-star').textContent = r.star;
    document.getElementById('result-tagline').textContent = r.tagline;

    // 用户信息行
    var nick = userInfo.nickname || '球迷';
    var ballAge = userInfo.ballAge || '资深球迷';
    document.getElementById('result-user-line').textContent = nick + ' | 懂球帝' + ballAge;

    // 画像描述
    document.getElementById('result-summary').textContent = r.description;

    // 虚拟统计百分比
    var fakePct = Math.floor(Math.random() * 20) + 15; // 15%-34%
    document.getElementById('result-pct').textContent = fakePct + '%';

    // 5大维度条（新样式）
    renderModelBars(data.modelScores);

    // 维度解析（免费展示前2个模型的解析，虚拟文案）
    renderDimensionSections(data);

    // 付费区
    renderFullResult(data);
  }

  // ── 5大维度条（参考设计风格） ──
  function renderModelBars(modelScores) {
    var wrap = document.getElementById('model-bars');
    wrap.innerHTML = '';
    PAGE_KEYS.forEach(function (k) {
      var m = MODELS[k];
      var pct = modelScores[k].pct;
      var row = document.createElement('div');
      row.className = 'r-bar';
      row.innerHTML =
        '<div class="r-bar-label">' + m.label + '</div>' +
        '<div class="r-bar-track"><div class="r-bar-fill" style="width:' + pct + '%"></div></div>' +
        '<div class="r-bar-pct">' + pct + '%</div>';
      wrap.appendChild(row);
    });
  }

  // ── 维度解析（虚拟数据，前2个免费可见） ──
  function renderDimensionSections(data) {
    var wrap = document.getElementById('result-dimensions');
    wrap.innerHTML = '';

    // 取前2个模型做免费解析
    var freeKeys = PAGE_KEYS.slice(0, 2);
    freeKeys.forEach(function (k) {
      var m = MODELS[k];
      var pct = data.modelScores[k].pct;
      var section = document.createElement('div');
      section.className = 'r-dim-section';

      // 根据得分生成解析文案
      var level = pct >= 70 ? '偏高' : (pct <= 30 ? '偏低' : '中等');
      var desc = '你在「' + m.name + '」维度的得分为 ' + pct + '%，属于' + level + '水平。';
      desc += '这意味着在' + m.name + '方面，你有着自己鲜明的特点。';

      section.innerHTML =
        '<div class="r-dim-title">' + m.name + '解析</div>' +
        '<div class="r-dim-body">' + desc + '</div>';
      wrap.appendChild(section);
    });
  }

  // ── 付费区：15维详细解读 ──
  function renderFullResult(data) {
    var wrap = document.getElementById('full-result-text');
    var html = '';
    DIM_ORDER.forEach(function (d, i) {
      var dim = DIMENSIONS[d];
      var level = data.userVector[i];
      var levelText = level === 1 ? dim.low : (level === 3 ? dim.high : '中等');
      html += '<div class="full-dim-item">';
      html += '<span class="full-dim-name">' + dim.name + '</span>';
      html += '<span class="full-dim-level">' + levelText + '</span>';
      html += '</div>';
    });
    wrap.innerHTML = html;
  }

  // ── 付费墙 ──
  var btnPay = document.getElementById('btn-unlock-pay');
  var btnVideo = document.getElementById('btn-unlock-video');
  var btnRetry = document.getElementById('btn-retry');

  btnPay.addEventListener('click', function () { unlockFull(); });
  btnVideo.addEventListener('click', function () { unlockFull(); });

  function unlockFull() {
    document.getElementById('paywall-wrap').classList.add('unlocked');
    btnRetry.style.display = 'block';
  }

  // ── 重测 ──
  btnRetry.addEventListener('click', function () {
    selections = {};
    currentPage = 0;
    userInfo = { nickname: '', avatar: '⚽', ballAge: '' };
    pageResult.classList.remove('active');
    pageQuiz.classList.add('active');
    document.getElementById('paywall-wrap').classList.remove('unlocked');
    btnRetry.style.display = 'none';
    renderPage(0);
  });

  // ── 分享卡片 ──
  document.getElementById('btn-share').addEventListener('click', function () {
    generateShareCard();
  });

  function generateShareCard() {
    var canvas = document.getElementById('share-canvas');
    var ctx = canvas.getContext('2d');
    var W = 640, H = 900;
    canvas.width = W;
    canvas.height = H;

    var data = Algorithm.run(selections);
    var r = data.result;
    var nick = userInfo.nickname || '球迷';
    var avatar = userInfo.avatar || '⚽';

    // 背景
    ctx.fillStyle = r.color;
    ctx.fillRect(0, 0, W, H);
    var grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, 'rgba(0,0,0,0.4)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    ctx.textAlign = 'center';

    // 标题
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '24px -apple-system, PingFang SC, sans-serif';
    ctx.fillText('球迷人格测试', W / 2, 60);

    // 头像
    ctx.font = '80px serif';
    ctx.fillText(avatar, W / 2, 180);

    // 昵称
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 28px -apple-system, PingFang SC, sans-serif';
    ctx.fillText(nick, W / 2, 240);

    // 球龄
    if (userInfo.ballAge) {
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = '20px -apple-system, PingFang SC, sans-serif';
      ctx.fillText('球龄：' + userInfo.ballAge, W / 2, 275);
    }

    // 梗字母
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 96px -apple-system, PingFang SC, sans-serif';
    ctx.fillText(r.code, W / 2, 420);

    // 人格名
    ctx.font = 'bold 32px -apple-system, PingFang SC, sans-serif';
    ctx.fillText(r.name, W / 2, 475);

    // 代表球星
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.font = '22px -apple-system, PingFang SC, sans-serif';
    ctx.fillText('代表球星：' + r.star, W / 2, 520);

    // tagline
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.font = '24px -apple-system, PingFang SC, sans-serif';
    ctx.fillText('「' + r.tagline + '」', W / 2, 580);

    // 5维简图
    var barY = 640;
    PAGE_KEYS.forEach(function (k, i) {
      var pct = data.modelScores[k].pct;
      var x = 80, y = barY + i * 40;
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = '18px -apple-system, PingFang SC, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(MODELS[k].label, x, y + 4);
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      roundRect(ctx, x + 70, y - 10, 400, 16, 8); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      roundRect(ctx, x + 70, y - 10, 400 * pct / 100, 16, 8); ctx.fill();
      ctx.textAlign = 'right';
      ctx.fillText(pct + '%', W - 60, y + 4);
    });

    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '16px -apple-system, PingFang SC, sans-serif';
    ctx.fillText('匹配度 ' + data.similarity + '%', W / 2, H - 40);

    document.getElementById('share-modal').classList.add('show');
  }

  function roundRect(ctx, x, y, w, h, r) {
    if (w < 0) w = 0;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  // 保存图片
  document.getElementById('btn-save-card').addEventListener('click', function () {
    var canvas = document.getElementById('share-canvas');
    var link = document.createElement('a');
    link.download = '球迷人格_' + (userInfo.nickname || '球迷') + '.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });

  // 关闭弹窗
  document.getElementById('btn-close-modal').addEventListener('click', function () {
    document.getElementById('share-modal').classList.remove('show');
  });

  // ── 工具函数 ──
  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    setTimeout(function () { toastEl.classList.remove('show'); }, 2000);
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function adjustColor(hex, amount) {
    var num = parseInt(hex.replace('#', ''), 16);
    var r = Math.min(255, Math.max(0, (num >> 16) + amount));
    var g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    var b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return '#' + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
  }

})();
