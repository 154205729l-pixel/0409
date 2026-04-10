/**
 * 球迷人格测试 2.0 — 题目数据
 * 15 子维度 × 2 题 = 30 计分题 + 1 球龄题
 * 每题 3 选项，分值 1/2/3
 * 顺序：S→E→A→D→C 循环两轮
 */

var QUESTIONS = [

  // ═══ 第一轮 Q1-Q15 ═══

  // Q1 | S1 观赛方式
  {
    id: 1, dimension: 'S1', tag: '决赛就是今天！',
    text: '决赛之夜，你的观赛方式是？',
    options: [
      { text: '消息免打扰，一人独享', score: 1 },
      { text: '叫上铁铁一起看', score: 2 },
      { text: '提前一周组局，酒吧包场，人越多越嗨', score: 3 }
    ]
  },

  // Q2 | E1 赢球反应
  {
    id: 2, dimension: 'E1', tag: '第93分钟的绝杀',
    text: '你主队绝杀进球的瞬间，你的反应更接近？',
    options: [
      { text: '嘴角微扬，已经是我最大的情绪波动了', score: 1 },
      { text: '站起来喊一声，然后坐下继续看', score: 2 },
      { text: '直接一个起立大滑跪', score: 3 }
    ]
  },

  // Q3 | A1 忠诚度
  {
    id: 3, dimension: 'A1', tag: '一见钟情vs日久生情？',
    text: '你支持的球队是怎么选的？',
    options: [
      { text: '谁强看谁，纯中立', score: 1 },
      { text: '有喜欢的队，但别的好比赛也看', score: 2 },
      { text: '从小到大就这一支，降级那咋了？', score: 3 }
    ]
  },

  // Q4 | D1 看球动力
  {
    id: 4, dimension: 'D1', tag: '独乐乐vs众乐乐',
    text: '如果你身边没有一个人看足球，你还会看吗？',
    options: [
      { text: '不看，主要是为了和朋友有话聊', score: 1 },
      { text: '慢慢不看了', score: 2 },
      { text: '无需陪伴，依旧会看', score: 3 }
    ]
  },

  // Q5 | C1 社交主动性
  {
    id: 5, dimension: 'C1', tag: '你是等人叫还是自己拉？',
    text: '有一场重要比赛要踢了，你会？',
    options: [
      { text: '朋友叫我就去', score: 1 },
      { text: '如果没人组织，就自己看', score: 2 },
      { text: '提前三天建群拉人，投屏零食啤酒全安排', score: 3 }
    ]
  },

  // Q6 | S2 信息获取
  {
    id: 6, dimension: 'S2', tag: '数据党vs感觉派',
    text: '赛后你怎么评价一场比赛？',
    options: [
      { text: '先把xG、传球成功率、热力图翻一遍', score: 1 },
      { text: '数据瞄一眼，主要还是靠自己的观感', score: 2 },
      { text: '数据是什么？我看的是足球不是数学', score: 3 }
    ]
  },

  // Q7 | E2 输球反应
  {
    id: 7, dimension: 'E2', tag: '超级超级巨大巨大的失误！',
    text: '球队输了一场不该输的比赛，你的第一反应？',
    options: [
      { text: '打开战术板复盘，情绪稳定得像个AI', score: 1 },
      { text: '有点郁闷，但过一会儿就好了', score: 2 },
      { text: '教练下课球员全卖，评分打低分', score: 3 }
    ]
  },

  // Q8 | A2 转会观
  {
    id: 8, dimension: 'A2', tag: '太子要走？',
    text: '你主队的核心球员转会去了死敌球队，你的反应？',
    options: [
      { text: '打工人换个公司而已，祝好', score: 1 },
      { text: '能理解但心里不舒服', score: 2 },
      { text: '球衣已剪，取关拉黑886', score: 3 }
    ]
  },

  // Q9 | D2 关注焦点
  {
    id: 9, dimension: 'D2', tag: '看球视角',
    text: '看比赛的时候，你的注意力更多在？',
    options: [
      { text: '盯着两队的阵型跑位压迫线，看球跟看兵法似的', score: 1 },
      { text: '都会看，但精彩个人发挥更吸引我', score: 2 },
      { text: '球星拿球的瞬间全世界安静了，其他人都是NPC', score: 3 }
    ]
  },

  // Q10 | C2 表达欲
  {
    id: 10, dimension: 'C2', tag: '打开懂球帝的姿势',
    text: '你在懂球帝社区的状态是？',
    options: [
      { text: '纯潜水，点赞都懒得点', score: 1 },
      { text: '偶尔评论几句，看心情', score: 2 },
      { text: '评论区钉子户，日均发帖量比上班摸鱼时间还长', score: 3 }
    ]
  },

  // Q11 | S3 投入深度
  {
    id: 11, dimension: 'S3', tag: '比赛开始了？',
    text: '你对自己主队的赛程了解程度？',
    options: [
      { text: '大赛才看，联赛基本不追', score: 1 },
      { text: '知道大概什么时候踢，偶尔会忘', score: 2 },
      { text: '精确到北京时间几点几分开球，手机日历排得比工作还满', score: 3 }
    ]
  },

  // Q12 | E3 争议态度
  {
    id: 12, dimension: 'E3', tag: '小黑子',
    text: '评论区有人说你主队球星"水货"，你会？',
    options: [
      { text: '懒得理，看了一眼就划走了', score: 1 },
      { text: '看到了会不爽，但一般不回', score: 2 },
      { text: '已经写好800字反驳，配图带数据，吵不赢不睡', score: 3 }
    ]
  },

  // Q13 | A3 公平观
  {
    id: 13, dimension: 'A3', tag: 'VAR毁了我的进球梦',
    text: 'VAR取消了你主队一个进球，回放显示确实越位了2厘米，你的反应？',
    options: [
      { text: '越位就是越位，技术不会说谎', score: 1 },
      { text: '规则没错，但2厘米也太严了吧', score: 2 },
      { text: '脚趾头的事也算越位？？VAR滚出足球', score: 3 }
    ]
  },

  // Q14 | D3 胜负观
  {
    id: 14, dimension: 'D3', tag: 'ZZZZZZZ...',
    text: '你主队踢了一场很难看的比赛但赢了，你的感受？',
    options: [
      { text: '赢是赢了，但踢成这样我看得胃疼', score: 1 },
      { text: '赢球就好，希望下场踢得好看点', score: 2 },
      { text: '三分到手就是胜利', score: 3 }
    ]
  },

  // Q15 | C3 影响力
  {
    id: 15, dimension: 'C3', tag: '谁是话事人？',
    text: '朋友之间聊足球的时候，你通常是？',
    options: [
      { text: '听别人说，适时点头', score: 1 },
      { text: '有自己的观点，但也愿意听别人的', score: 2 },
      { text: '一般我说完，群里安静三秒，然后有人说"有道理"', score: 3 }
    ]
  },

  // ═══ 第二轮 Q16-Q30 ═══

  // Q16 | S1 观赛方式
  {
    id: 16, dimension: 'S1', tag: '论正确的观球姿势',
    text: '你主队踢关键比赛，你更想？',
    options: [
      { text: '一个人，谁都别打扰我', score: 1 },
      { text: '和几个懂球的朋友一起看', score: 2 },
      { text: '必须现场或，在家看等于没看', score: 3 }
    ]
  },

  // Q17 | E1 赢球反应
  {
    id: 17, dimension: 'E1', tag: '你好，我们进了7个',
    text: '球队赢了一场关键比赛，你会？',
    options: [
      { text: '嗯，赢了。（然后继续刷手机）', score: 1 },
      { text: '发个朋友圈或者群里说一句', score: 2 },
      { text: '挨个@之前嘲笑我主队的人，一个都不放过', score: 3 }
    ]
  },

  // Q18 | A1 忠诚度
  {
    id: 18, dimension: 'A1', tag: '烂队·你跑不跑',
    text: '你主队这赛季成绩很烂，你会？',
    options: [
      { text: '那就先看看别的队呗', score: 1 },
      { text: '虽然难受但还是会关注', score: 2 },
      { text: '越烂越看，降级了我买客场票去客场', score: 3 }
    ]
  },

  // Q19 | D1 看球动力
  {
    id: 19, dimension: 'D1', tag: '我是世界杯球迷',
    text: '世界杯期间，你看球更多是因为？',
    options: [
      { text: '大家都在看，不看不合群', score: 1 },
      { text: '四年一次的大赛，气氛到了就看看', score: 2 },
      { text: '四年了四年了！请假都请好了！', score: 3 }
    ]
  },

  // Q20 | C1 社交主动性
  {
    id: 20, dimension: 'C1', tag: '初来乍到',
    text: '你加入了一个新的球迷群，你会？',
    options: [
      { text: '先潜水观察，等别人先聊', score: 1 },
      { text: '有感兴趣的话题会插几句', score: 2 },
      { text: '进群先发自我介绍，三天后已经和群主称兄道弟', score: 3 }
    ]
  },

  // Q21 | S2 信息获取
  {
    id: 21, dimension: 'S2', tag: '又是一年转会窗',
    text: '转会窗口期，你怎么判断一个新援好不好？',
    options: [
      { text: '先翻三个赛季的数据，再看合同细节和伤病史', score: 1 },
      { text: '数据和集锦都看看', score: 2 },
      { text: '看几个集锦就知道了，有没有灵气一眼就能看出来', score: 3 }
    ]
  },

  // Q22 | E2 输球反应
  {
    id: 22, dimension: 'E2', tag: '三连又三连',
    text: '你主队连续三场不胜，你会？',
    options: [
      { text: '冷静看数据、赛程还是战术的锅', score: 1 },
      { text: '有点焦虑，但还是选择相信', score: 2 },
      { text: '已经写了三千字的愤怒长文', score: 3 }
    ]
  },

  // Q23 | A2 转会观
  {
    id: 23, dimension: 'A2', tag: '不磕碜',
    text: '一个你很喜欢的球星为了更高薪水离开了，你怎么看？',
    options: [
      { text: '打工人嘛，哪里钱多去哪里很正常', score: 1 },
      { text: '有点失望，但也不能怪人家', score: 2 },
      { text: '钱比感情重要是吧？球衣已剪，取关拉黑一条龙', score: 3 }
    ]
  },

  // Q24 | D2 关注焦点
  {
    id: 24, dimension: 'D2', tag: '赛后聊什么',
    text: '一场比赛踢完，你更愿意聊什么？',
    options: [
      { text: '两队的战术博弈和教练的布置', score: 1 },
      { text: '整体表现和关键球员都聊', score: 2 },
      { text: '就聊那个进球！太帅了！已经反复看了二十遍', score: 3 }
    ]
  },

  // Q25 | C2 表达欲
  {
    id: 25, dimension: 'C2', tag: '根本睡不着',
    text: '看完一场精彩比赛，你会？',
    options: [
      { text: '心里回味一下，然后该干嘛干嘛', score: 1 },
      { text: '可能发个朋友圈或者群里聊两句', score: 2 },
      { text: '不写点什么浑身难受，800字小作文已在路上', score: 3 }
    ]
  },

  // Q26 | S3 投入深度
  {
    id: 26, dimension: 'S3', tag: '休赛？',
    text: '国际比赛日没有联赛，你会？',
    options: [
      { text: '终于可以干点别的了', score: 1 },
      { text: '有好的国家队比赛就看看', score: 2 },
      { text: '没比赛也要刷论坛看训练视频，足球这东西不存在休赛期', score: 3 }
    ]
  },

  // Q27 | E3 争议态度
  {
    id: 27, dimension: 'E3', tag: '不应该啊？',
    text: '一个明显的误判让你主队吃了亏，你会？',
    options: [
      { text: '裁判也是人，误判难免', score: 1 },
      { text: '心里骂两句，但不至于太激动', score: 2 },
      { text: '直接去裁判社交媒体底下问候全家', score: 3 }
    ]
  },

  // Q28 | A3 公平观
  {
    id: 28, dimension: 'A3', tag: '战术犯规',
    text: '对方球员恶意犯规被红牌罚下，但他是为了阻止一个必进球，你怎么看？',
    options: [
      { text: '犯规就该罚，没什么好说的', score: 1 },
      { text: '能理解他的选择，但规则就是规则', score: 2 },
      { text: '这才叫职业球员！红牌又怎样，他保护了球队', score: 3 }
    ]
  },

  // Q29 | D3 胜负观
  {
    id: 29, dimension: 'D3', tag: '足球美学',
    text: '你更欣赏哪种球队？',
    options: [
      { text: '踢得好看最重要，输了我也鼓掌', score: 1 },
      { text: '好看和实用要平衡', score: 2 },
      { text: '能赢球的球队就是好球队，别跟我谈美学', score: 3 }
    ]
  },

  // Q30 | C3 影响力
  {
    id: 30, dimension: 'C3', tag: '你们都不要吵了啦',
    text: '关于足球的争论，你更像？',
    options: [
      { text: '别人说得有道理我就点头，没必要争', score: 1 },
      { text: '会参考别人的观点，但保留自己的判断', score: 2 },
      { text: '一般我说完大家就不争了，因为我说得对', score: 3 }
    ]
  },

  // ═══ 球龄题 Q31（不计分，填空）═══
  {
    id: 31, dimension: 'ballAge', tag: '球龄·你入坑多久了',
    text: '你看球多久了？',
    type: 'text',
    maxLength: 20
  }

];
