/**
 * 球迷人格测试 2.0 — 人格模板 & 维度配置
 */

// ── 15 子维度标签 ──
var DIMENSIONS = {
  S1: { model: 'S', name: '观赛方式', low: '独享', high: '群嗨' },
  S2: { model: 'S', name: '信息获取', low: '数据流', high: '直觉流' },
  S3: { model: 'S', name: '投入深度', low: '佛系', high: '硬核' },
  E1: { model: 'E', name: '赢球反应', low: '内敛', high: '外放' },
  E2: { model: 'E', name: '输球反应', low: '理性', high: '情绪化' },
  E3: { model: 'E', name: '争议态度', low: '佛系', high: '好斗' },
  A1: { model: 'A', name: '忠诚度', low: '博爱', high: '死忠' },
  A2: { model: 'A', name: '转会观', low: '理性', high: '情感' },
  A3: { model: 'A', name: '公平观', low: '规则至上', high: '人情至上' },
  D1: { model: 'D', name: '看球动力', low: '社交需要', high: '纯粹热爱' },
  D2: { model: 'D', name: '关注焦点', low: '战术体系', high: '个人英雄' },
  D3: { model: 'D', name: '胜负观', low: '过程派', high: '结果派' },
  C1: { model: 'C', name: '社交主动性', low: '被动', high: '主动' },
  C2: { model: 'C', name: '表达欲', low: '潜水', high: '活跃' },
  C3: { model: 'C', name: '影响力', low: '跟随', high: '引领' }
};

// ── 5 大模型标签 ──
var MODELS = {
  S: { name: '看球姿态', label: 'Style' },
  E: { name: '情绪表达', label: 'Emotion' },
  A: { name: '足球态度', label: 'Attitude' },
  D: { name: '驱动力', label: 'Drive' },
  C: { name: '社交圈', label: 'Circle' }
};

// ── 维度顺序（用于向量计算）──
var DIM_ORDER = ['S1','S2','S3','E1','E2','E3','A1','A2','A3','D1','D2','D3','C1','C2','C3'];

// ── 20 个球迷人格模板 ──
// pattern: 15维 L/M/H 向量，顺序同 DIM_ORDER
// L=1, M=2, H=3
var RESULTS = {
  BOSS: {
    name: '更衣室老大',
    code: 'BOSS',
    star: 'C罗',
    tagline: '球场没有民主，只有我的战术板',
    color: '#C62828',
    pattern: [2,1,3, 2,2,2, 3,2,2, 3,2,3, 3,2,3],
    description: '你天然想拿方向盘，看球的时候经常觉得自己比教练更懂排兵布阵。你对效率、秩序和胜利有很高要求，朋友圈里通常是那个"我早说了该这么踢"的人。'
  },
  'BB King': {
    name: '评论区之王',
    code: 'BB King',
    star: '穆里尼奥',
    tagline: '你说梅西最佳？我偏要说不是',
    color: '#F57C00',
    pattern: [2,2,2, 2,3,3, 2,2,2, 2,2,2, 2,3,3],
    description: '你的主战场不在球场，在评论区。你对任何观点都能找到反驳角度，越是主流共识越要唱反调。不是真的杠，是享受输出和辩论本身带来的快感。'
  },
  GOAT: {
    name: '孤独球王',
    code: 'GOAT',
    star: '梅西',
    tagline: '不争不抢，交答案',
    color: '#1565C0',
    pattern: [1,2,3, 1,1,1, 3,2,1, 3,2,2, 1,1,3],
    description: '你不太爱争，但心里有自己非常坚定的判断。你看球很深，表达很少，偶尔说一句往往直接终结讨论。安静，但大家知道你懂。'
  },
  NERD: {
    name: '数据宅',
    code: 'NERD',
    star: '温格',
    tagline: '你说有灵气？给我看样本量',
    color: '#37474F',
    pattern: [1,1,3, 1,1,1, 2,1,1, 2,1,2, 1,2,2],
    description: '你看球先看数据，xG、PPDA、渐进传球一个不落。你不太吃"灵气""天赋"这种玄学叙事，更相信样本量和统计显著性。'
  },
  'CRY!': {
    name: '泪腺战士',
    code: 'CRY!',
    star: '托蒂',
    tagline: '一件球衣穿了十年',
    color: '#AD1457',
    pattern: [1,2,3, 3,3,2, 3,3,3, 3,2,2, 1,2,1],
    description: '你的情感浓度极高，一件球衣能穿十年，一个进球能哭三天。你对球队和球员的感情远超"喜欢"，更接近"命运绑定"。'
  },
  PARTY: {
    name: '气氛组长',
    code: 'PARTY',
    star: '小罗',
    tagline: '赢了庆祝，输了也庆祝',
    color: '#FFB300',
    pattern: [3,3,2, 3,2,2, 2,2,2, 2,3,2, 3,3,2],
    description: '你看球的核心诉求是快乐，赢了庆祝，输了也庆祝。你是每次看球局里最先嗨起来的人，也是散场后还在唱歌的那个。'
  },
  GOD: {
    name: '看台MVP',
    code: 'GOD',
    star: '伊布',
    tagline: '我来了，你们不需要再买别人了',
    color: '#6A1B9A',
    pattern: [3,2,3, 3,3,3, 2,2,2, 3,3,3, 3,3,3],
    description: '你自带主角光环，存在感极强。你看球不只是看，是"出席"。进球了全场最大声，输球了骂得最狠，永远是人群里最先被注意到的那个。'
  },
  TOGEHTER: {
    name: '氛围感球迷',
    code: 'TOGEHTER',
    star: '哈维',
    tagline: '足球是安静的陪伴',
    color: '#00838F',
    pattern: [1,2,2, 1,1,1, 2,2,2, 3,1,1, 1,1,1],
    description: '你享受的不是胜负，是足球带来的那种安静陪伴感。深夜一个人看一场比赛，对你来说比任何社交都治愈。'
  },
  COACH: {
    name: '键盘教练',
    code: 'COACH',
    star: '弗格森',
    tagline: '换人换晚了，我早说了',
    color: '#2E7D32',
    pattern: [2,1,3, 2,2,2, 3,2,1, 3,1,3, 2,3,3],
    description: '你脑子里永远在排阵型、想换人、设计战术。你看球的方式更像在"执教"，每一个决定都会在心里过一遍"如果是我会怎么做"。'
  },
  SALUTE: {
    name: '死忠守护者',
    code: 'SALUTE',
    star: '斯科尔斯',
    tagline: '十五年没换过队',
    color: '#B71C1C',
    pattern: [1,2,3, 2,2,1, 3,3,2, 3,2,2, 1,1,1],
    description: '你的忠诚度拉满，一支队从小看到大，降级也不换。你觉得支持一支球队就像一段婚姻，不存在"换一个试试"这种选项。'
  },
  LOVER: {
    name: '庆祝专家',
    code: 'LOVER',
    star: '内马尔',
    tagline: '你不是在看球，你是在表演看球',
    color: '#E91E63',
    pattern: [3,3,2, 3,2,2, 2,2,2, 2,3,2, 3,3,2],
    description: '你看球的仪式感很重，进球了怎么庆祝、穿什么球衣、发什么朋友圈都有讲究。你享受的不只是比赛本身，还有"看球这件事"带来的表演空间。'
  },
  'SHHH...': {
    name: '毒奶预言家',
    code: 'SHHH...',
    star: '齐达内',
    tagline: '别人看到进球，你看到命运',
    color: '#4527A0',
    pattern: [1,2,2, 1,1,1, 2,2,2, 2,2,2, 1,2,3],
    description: '你总能在赛前说出一些离谱的预测，而且经常莫名其妙地应验。你看球有一种直觉式的第六感，别人觉得是玄学，你觉得是经验。'
  },
  MAMMY: {
    name: '后勤部长',
    code: 'MAMMY',
    star: '贝克汉姆',
    tagline: '世界杯来了你第一个建群',
    color: '#00695C',
    pattern: [3,2,2, 2,1,1, 2,2,2, 2,2,2, 3,2,2],
    description: '你是每次看球局的组织者，建群、订位置、买零食、调投屏，全是你在张罗。球没开踢，你已经忙了一下午。'
  },
  KILLER: {
    name: '冷面杀手',
    code: 'KILLER',
    star: '贝尔',
    tagline: '群里很少说话，但每次说到点上',
    color: '#263238',
    pattern: [1,1,3, 1,1,1, 2,1,1, 2,1,2, 1,1,3],
    description: '你平时很安静，群里基本不说话，但一开口就是精准打击。你不爱废话，但每次发言都让人觉得"这人是真懂球"。'
  },
  FACER: {
    name: '纪律委员',
    code: 'FACER',
    star: '马尔蒂尼',
    tagline: '规则就是规则，违规就罚',
    color: '#1B5E20',
    pattern: [1,1,3, 1,1,2, 2,1,1, 2,1,2, 1,2,2],
    description: '你对规则有很强的执念，越位就是越位，犯规就该罚，不接受任何"人情分"。你是朋友圈里最公正的裁判，也是最不受欢迎的那个。'
  },
  BEER: {
    name: '酒鬼球迷',
    code: 'BEER',
    star: '加斯科因',
    tagline: '看球不喝酒，不如回家睡',
    color: '#E65100',
    pattern: null,
    hidden: true,
    description: '看球不喝酒等于没看。你把足球和酒精绑定得很深，比赛是下酒菜，啤酒才是主角。'
  },
  QNMD: {
    name: '暴躁老哥',
    code: 'QNMD',
    star: '加图索',
    tagline: '遥控器已经换了三个',
    color: '#D50000',
    pattern: [2,2,3, 2,3,3, 3,3,3, 3,2,3, 2,3,2],
    description: '你的情绪阈值极低，一个误判就能让你原地爆炸。你骂裁判、骂教练、骂球员、骂自己，但骂完第二天照看不误。'
  },
  EMMM: {
    name: '佛系看客',
    code: 'EMMM',
    star: '皮尔洛',
    tagline: '刷到就看，比分随缘',
    color: '#78909C',
    pattern: [2,2,1, 1,1,1, 1,1,2, 1,2,1, 1,1,1],
    description: '你对足球的态度是"刷到就看，比分随缘"。你不追赛程、不记积分、不站队，但偶尔看一场也能看得很开心。'
  },
  SCOUT: {
    name: '星探体质',
    code: 'SCOUT',
    star: '弗格森(青训)',
    tagline: '这小孩我三年前就关注了',
    color: '#33691E',
    pattern: [1,1,3, 1,1,1, 2,1,2, 3,1,2, 1,2,3],
    description: '你特别喜欢挖掘新人和小妖，别人还在追顶流球星，你已经在关注某个U17联赛的左脚天才了。三年后这人火了，你会说"我早说过"。'
  },
  EMO: {
    name: '足球诗人',
    code: 'EMO',
    star: '齐达内',
    tagline: '凌晨三点的进球，是写给失眠者的情书',
    color: '#311B92',
    pattern: [1,3,2, 2,2,1, 2,3,3, 3,3,1, 1,3,1],
    description: '你看球容易上升到哲学和美学层面，一个进球能联想到人生，一场失利能写出散文。你眼里的足球不只是运动，是某种关于命运和浪漫的隐喻。'
  }
};
