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
        '<div class="intro-subtitle">30道题测球感·找到和你契合的球星</div>';
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
      html += '  <div class="q-avatar"><img src="design/头像.png" alt="" onerror="this.style.display=\'none\'"></div>';
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

    // 英雄区背景色
    var hero = document.getElementById('result-hero');
    hero.style.background = 'linear-gradient(135deg, ' + r.color + ', ' + adjustColor(r.color, -30) + ')';

    // 用户信息（兜底）
    var nick = userInfo.nickname || '球迷';
    var avatar = userInfo.avatar || '⚽';
    document.getElementById('result-avatar').innerHTML = '<span style="font-size:24px;line-height:40px">' + avatar + '</span>';
    document.getElementById('result-nickname').textContent = nick;
    document.getElementById('result-ballage').textContent = userInfo.ballAge ? '球龄：' + userInfo.ballAge : '';

    // 人格信息
    document.getElementById('result-code').textContent = r.code;
    document.getElementById('result-name').textContent = r.name;
    document.getElementById('result-star').textContent = '代表球星：' + r.star;
    document.getElementById('result-tagline').textContent = '「' + r.tagline + '」';

    // 5大模型得分条
    renderModelBars(data.modelScores);

    // 免费摘要
    document.getElementById('result-summary').textContent = r.description;
    document.getElementById('result-stat').textContent = '匹配度 ' + data.similarity + '% · 相似人格 Top' + data.topMatches.length;

    // 付费区
    renderFullResult(data);
  }

  // ── 5大模型得分条 ──
  function renderModelBars(modelScores) {
    var wrap = document.getElementById('model-bars');
    wrap.innerHTML = '';
    PAGE_KEYS.forEach(function (k) {
      var m = MODELS[k];
      var pct = modelScores[k].pct;
      var row = document.createElement('div');
      row.className = 'dim-row';
      row.innerHTML =
        '<div class="dim-label-left' + (pct >= 50 ? ' active' : '') + '">' + m.label + '</div>' +
        '<div class="dim-bar-track"><div class="dim-bar-left" style="width:' + pct + '%;background:' + getModelColor(k) + '"></div><div class="dim-bar-right"></div></div>' +
        '<div class="dim-pct">' + pct + '%</div>';
      wrap.appendChild(row);
    });
  }

  function getModelColor(key) {
    var colors = { S: '#30B544', E: '#E53935', A: '#1E88E5', D: '#FB8C00', C: '#8E24AA' };
    return colors[key] || '#30B544';
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
