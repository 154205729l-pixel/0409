/**
 * 球迷人格测试 2.0 — 题目数据
 * 15 子维度：3 个保留 2 题，12 个保留 1 题 = 18 计分题 + 1 球龄题
 * 每题 3 选项，分值 1/2/3
 */

var QUESTIONS = [

  // ═══ 第一轮 Q1-Q15 ═══

  // Q1 | S1 观赛方式
  {
    id: 1, dimension: 'S1', tag: '最佳观赛姿势',
    text: '决赛之夜，你的观赛姿势是？',
    options: [
      { text: '消息免打扰，独享', score: 1 },
      { text: '和铁铁一起看', score: 2 },
      { text: '人多才有气氛', score: 3 }
    ]
  },

  // Q2 | E1 赢球反应
  {
    id: 2, dimension: 'E1', tag: '第93分钟的绝杀',
    text: '93分钟！主队绝杀！',
    options: [
      { text: '嘴角微扬', score: 1 },
      { text: '拍手称快', score: 2 },
      { text: '直接大滑跪！', score: 3 }
    ]
  },

  // Q3 | A1 忠诚度
  {
    id: 3, dimension: 'A1', tag: '我们下赛季再来',
    text: '关于主队',
    options: [
      { text: '不绑定，不站队', score: 1 },
      { text: '有喜欢的队，别的比赛也看', score: 2 },
      { text: '从小到大就一支，降级也看', score: 3 }
    ]
  },

  // Q4 | D1 看球动力
  {
    id: 4, dimension: 'D1', tag: '还记得你儿时的梦吗？',
    text: '慢慢地，身边的人都不再看球了',
    options: [
      { text: '我也慢慢不看了', score: 1 },
      { text: '看情况，没准有新圈子', score: 2 },
      { text: '无需陪伴，依旧会看', score: 3 }
    ]
  },

  // Q5 | C1 社交主动性
  {
    id: 5, dimension: 'C1', tag: '独狼还是组织者',
    text: '有一场重要比赛要踢了，你会？',
    options: [
      { text: '等大佬组织', score: 1 },
      { text: '没人叫就自己看', score: 2 },
      { text: '提前自己组局', score: 3 }
    ]
  },

  // Q6 | S2 信息获取
  {
    id: 6, dimension: 'S2', tag: '我直接掏出iPad',
    text: '你怎么评价一场比赛？',
    options: [
      { text: '数据说话', score: 1 },
      { text: '数据只是参考，相信感觉', score: 2 },
      { text: '数据？足球不是数学', score: 3 }
    ]
  },

  // Q7 | E2 输球反应
  {
    id: 7, dimension: 'E2', tag: '超级超级巨大巨大的失误！',
    text: '球队输了一场不该输的比赛，你的第一反应？',
    options: [
      { text: '复盘，冷静分析问题', score: 1 },
      { text: '难受，但不至于骂人', score: 2 },
      { text: '不多说了，球员评分见', score: 3 }
    ]
  },

  // Q8 | A2 转会观
  {
    id: 8, dimension: 'A2', tag: '太子要走？',
    text: '主队的太子转投别处',
    options: [
      { text: '职业选择而已，祝好', score: 1 },
      { text: '意难平', score: 2 },
      { text: '取关，886', score: 3 }
    ]
  },

  // Q9 | D2 关注焦点
  {
    id: 9, dimension: 'D2', tag: '看球视角',
    text: '当你看比赛的时..',
    options: [
      { text: '阵型跑位压迫线，都是兵法', score: 1 },
      { text: '看生吃、看拿球，精彩瞬间最上头', score: 2 },
      { text: '讲真，喜欢的球星不上，看不下去', score: 3 }
    ]
  },

  // Q10 | C2 表达欲
  {
    id: 10, dimension: 'C2', tag: '我懂最佳食用方法',
    text: '你在懂球帝社区的状态是？',
    options: [
      { text: '纯潜，昵称都是默认的', score: 1 },
      { text: '评分、点赞、看贴', score: 2 },
      { text: '评论区钉子户，比皮克发推还勤', score: 3 }
    ]
  },

  // Q11 | S3 投入深度
  {
    id: 11, dimension: 'S3', tag: '比赛开始了？',
    text: '你对自己主队的赛程了解程度？',
    options: [
      { text: '大赛才看，联赛没什么时间看全', score: 1 },
      { text: '知道大概什么时候踢，偶尔会忘', score: 2 },
      { text: '每场包看', score: 3 }
    ]
  },

  // Q12 | E3 争议态度
  {
    id: 12, dimension: 'E3', tag: '小黑子',
    text: '评论区有人说你主队球星"水货"，你会？',
    options: [
      { text: '懒得理，划走', score: 1 },
      { text: '不爽，但一般不回', score: 2 },
      { text: '出来对线', score: 3 }
    ]
  },

  // Q13 | A3 公平观
  {
    id: 13, dimension: 'A3', tag: 'VAR毁了我的进球梦',
    text: '2厘米...VAR吹掉了主队进球',
    options: [
      { text: '越位就是越位，技术不会说谎', score: 1 },
      { text: '规则没错，心里堵得慌', score: 2 },
      { text: '2厘米你画线都能画歪，这球我不认', score: 3 }
    ]
  },

  // Q14 | D3 胜负观
  {
    id: 14, dimension: 'D3', tag: '又摆大巴..',
    text: '你主队摆了90分钟大巴，0:0靠净胜球晋级了',
    options: [
      { text: '对得起我翘课看球吗？', score: 1 },
      { text: '晋级重要', score: 2 },
      { text: '能夺冠，大巴开到决赛又何妨', score: 3 }
    ]
  },

  // Q15 | C3 影响力
  {
    id: 15, dimension: 'C3', tag: '谁是话事人？',
    text: '朋友之间聊足球的时候，你通常是？',
    options: [
      { text: 'I prefer not to speak，听着就好', score: 1 },
      { text: '有观点会说，但不抬杠', score: 2 },
      { text: '一般我说完，大家就不争了，因为我说得对', score: 3 }
    ]
  },

  // ═══ 第二轮 Q16-Q18 ═══

  // Q16 | E1 赢球反应
  {
    id: 16, dimension: 'E1', tag: '你好，我们进了7个',
    text: '主队7:0血洗对手',
    options: [
      { text: '综合分析，赢球是应该的', score: 1 },
      { text: '得发朋友圈，配个😏', score: 2 },
      { text: '挨个问候之前嘲讽过我们的人', score: 3 }
    ]
  },

  // Q17 | A1 忠诚度
  {
    id: 17, dimension: 'A1', tag: '烂队·你跑不跑',
    text: '你主队这赛季成绩很烂，你会？',
    options: [
      { text: '先看看别的队呗，观赛体验重要', score: 1 },
      { text: '骂归骂，比赛还是会看', score: 2 },
      { text: '保级区见，降级也跟', score: 3 }
    ]
  },

  // Q18 | D1 看球动力
  {
    id: 18, dimension: 'D1', tag: '我是世界杯球迷',
    text: '世界杯期间，你看球更多是因为？',
    options: [
      { text: '大家都在看，不看不合群', score: 1 },
      { text: '气氛到了就看看', score: 2 },
      { text: '四年了四年了！假都提前请好了！', score: 3 }
    ]
  },

  // ═══ 球龄题 Q19（不计分，填空）═══
  {
    id: 19, dimension: 'ballAge', tag: '球龄·你入坑多久了',
    text: '你看球多久了？',
    type: 'text',
    maxLength: 20
  }

];
