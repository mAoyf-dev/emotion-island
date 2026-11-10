export const stories = [
  {
    id: 'fox', animal: '小狐狸', title: '我可以一起玩吗？', subtitle: '当我们想加入伙伴', skill: '理解紧张与不确定', color: '#d8e8dd', icon: '01',
    scene: '小狐狸走到伙伴们身边。他们正在专心搭一座桥，还没有回答小狐狸。它想一起玩，又有一点犹豫。',
    question: '小狐狸是什么心情？',
    thought: '“他们是不是不喜欢我？”小狐狸脑中冒出了这句话。',
    known: '伙伴们在搭桥，还没有回答。', unknown: '他们有没有听见，以及愿不愿意一起玩，我们还不知道。',
    explanation: '小狐狸确实有这个担心。不过，有这个想法，并不表示伙伴们一定不喜欢它。我们可以再了解一点。',
    actions: [
      { label: '试着问一次：“我能一起搭吗？”', feedback: '这能帮助小狐狸了解伙伴的意思。如果对方拒绝，可以尊重回答，选择别的活动；被拒绝时失望也可以。' },
      { label: '请熟悉的伙伴陪自己问一问', feedback: '有人陪伴，有时会容易一点。小狐狸也可以自己说出想法，不需要保证对方一定同意。' },
      { label: '先看看，今天选择别的活动', feedback: '小狐狸可以决定今天怎么玩。如果它经常因为害怕而放弃自己想做的事，可以请可信任的大人一起商量一个小步骤。' },
    ],
    practice: '在愿意的时候，和陪伴你的大人演一演：怎样邀请别人一起玩？也练一练对方说“现在不想”时可以怎么回应。',
    parent: '先问“哪一步让小狐狸犹豫？”不保证别人一定喜欢它。明确拒绝应被尊重；反复嘲笑、威胁或欺负需要成人保护，不能只要求孩子改变想法。',
    theory: '借鉴 CBT 的心理教育与检查解释的方式：区分已知事件和未证实的猜测，练习沟通。不是完整的焦虑治疗或暴露训练。',
  },
  {
    id: 'bear', animal: '小熊', title: '哎呀，积木倒了', subtitle: '当事情没有按计划发生', skill: '照顾挫折，选择行动', color: '#f1dfb8', icon: '02',
    scene: '小熊搭了很久的积木塔，突然倒了。积木散了一地。小熊握紧了拳头，真想把积木扔出去。',
    question: '小熊是什么心情？',
    thought: '“我搭了这么久，还是倒了！”小熊很在意这座塔。',
    known: '积木塔倒了，小熊花了很多时间。', unknown: '下一次会怎样，还不知道。我们也没有看到有人故意推倒它。',
    explanation: '这次失败是真实的，失望或生气都可以。我们不需要把它想成好事，可以先照顾自己，再决定接下来怎么做。',
    actions: [
      { label: '先放下积木，给自己一点空间', feedback: '生气可以被理解。扔积木可能伤到自己或别人，所以先放下，到安全的地方歇一会儿。并不需要立刻开心。' },
      { label: '请人帮忙，一起看看哪里不稳', feedback: '一起找原因，是解决问题的一种方式。需要帮助不代表小熊做得不好，也不保证下一次一定成功。' },
      { label: '决定今天不搭了，换个活动', feedback: '休息或结束也可以。等小熊愿意时，再决定要不要回来试一试，不必为了完成任务强迫自己。' },
    ],
    practice: '一起演一演：事情没做好时，怎样说“我现在很生气，我想歇一下”或“你能帮帮我吗”？不需要故意制造失败。',
    parent: '可以说“你花了很多心思，塔倒了很失望”。接纳感受，同时守住不伤害自己、他人的边界；不要用“这有什么好哭的”否定孩子，也不强迫重搭。',
    theory: '借鉴 CBT 的行为应对与问题解决：感受可以被接纳，行为仍可选择。此关不要求纠正想法，不把挫折解释成儿童的认知错误。',
  },
  {
    id: 'rabbit', animal: '小兔', title: '还想再玩一会儿', subtitle: '当快乐的相聚暂时结束', skill: '允许难过，温柔告别', color: '#eadde7', icon: '03',
    scene: '今天的玩耍时间结束了，朋友要回家。小兔还想一起玩。它站在路边，轻轻挥手，心里有一点空空的。',
    question: '小兔是什么心情？',
    thought: '“我还想和你一起玩。”小兔在想念刚才的时光。',
    known: '今天的玩耍结束了，朋友现在要回家。', unknown: '下次什么时候见，还需要和大人一起商量。',
    explanation: '分别确实发生了，想念和难过不需要被纠正。小兔可以带着这些感受，慢慢开始接下来的事情。',
    actions: [
      { label: '说一句：“今天和你玩很开心”', feedback: '告别可以表达在意。说完以后仍然难过，也没有关系，不需要马上变开心。' },
      { label: '画下今天最喜欢的一个片段', feedback: '画画是一种记住美好、表达想念的方式。想画什么由小兔决定，不需要有人解释画里的秘密。' },
      { label: '找大人陪一会儿，商量下次联系', feedback: '可以请求陪伴，也可以问问下次联系的可能。暂时没有答案也可以，大人不需要保证很快就会见面。' },
    ],
    practice: '如果愿意，可以画一件今天想记住的小事。不想画也可以，只和陪伴你的人待一会儿。',
    parent: '这是日常玩耍结束的故事，不涉及死亡或创伤性分离。回应“你很舍不得，我陪你一会儿”，不用转移话题让孩子赶紧高兴，也不承诺一定很快重逢。',
    theory: '借鉴情绪教育中的感受表达及 CBT 的具体应对练习。此处接纳真实失落，不做强制积极重评，也不提供哀伤或分离焦虑治疗。',
  },
];

export function createState(storyId = null) {
  return { storyId, step: 0, emotions: [], body: [], reflection: null, action: null };
}
export function select(state, field, value) {
  if (!['emotions', 'body'].includes(field)) throw new Error('Unknown selection field');
  const exclusive = ['不知道', '没有这些感觉'];
  const current = state[field];
  if (current.includes(value)) state[field] = current.filter(v => v !== value);
  else state[field] = exclusive.includes(value) ? [value] : [...current.filter(v => !exclusive.includes(v)), value];
}
export function move(state, delta, skip = false) {
  if (skip && delta > 0) {
    const field = [null, 'emotions', 'body', 'reflection', 'action'][state.step];
    if (field) state[field] = Array.isArray(state[field]) ? [] : null;
  }
  state.step = Math.max(0, Math.min(5, state.step + delta));
}
export function reset(state, storyId = null) { Object.assign(state, createState(storyId)); }
