import { stories, createState, select, move, reset } from './game.js';
import { foliageArt, sceneArt, emotionFace } from './art.js';

const main = document.querySelector('#main');
const state = createState();
const steps = ['听故事', '猜心情', '身体感觉', '想一想', '选办法', '再见啦'];
const emotions = ['开心', '紧张', '难过', '生气', '失望', '不知道'];
const bodyOptions = ['心跳变快', '肚子紧紧的', '手握得很紧', '想哭', '没有这些感觉', '不知道'];
const arrow = '<span aria-hidden="true">↗</span>';
const button = (text, attrs = '', secondary = false) => `<button class="button ${secondary ? 'secondary' : ''}" ${attrs}>${text}</button>`;

function focusHeading() {
  const heading = main.querySelector('h1');
  if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
  window.scrollTo({ top: 0, behavior: 'instant' });
}
function renderHome() {
  main.innerHTML = `<section class="hero"><div class="hero-inner"><div class="hero-copy"><p class="eyebrow">和小伙伴一起认识心情</p><h1>情绪<span>探险岛</span></h1><p class="hero-description">小狐狸想加入伙伴的游戏，<br>小熊的积木倒了，小兔要和朋友说再见。<br>它们现在是什么心情？一起听听故事吧。</p><a class="button" href="#stories">看看三个故事</a><p class="hero-meta">建议大人陪伴阅读 · 随时可以停下来</p></div><aside class="start-panel"><h2>今天，想找谁玩？</h2><p>选一个小伙伴，就可以开始。</p><div class="quick-stories">${stories.map(s => `<a class="quick-story quick-${s.id}" href="#story/${s.id}"><span class="animal-avatar">${sceneArt(s.id)}</span><span><strong>${s.animal}</strong><small>${s.title}</small></span><span class="quick-arrow" aria-hidden="true">→</span></a>`).join('')}</div><p class="panel-note">不用注册，不记录你的选择。</p></aside></div><div class="hero-foliage">${foliageArt()}</div></section>
  <section class="how-section"><h2>在这里，可以做什么？</h2><p class="section-intro">没有情绪考试。陪小伙伴想一想，也认识一下自己。</p><div class="how-layout"><ul><li><strong>认一认心情</strong><span>开心、紧张、生气……可以选不止一种。</span></li><li><strong>看看发生了什么</strong><span>哪些是已经发生的事？哪些还没弄清楚？</span></li><li><strong>试试不同的办法</strong><span>说出自己的想法、请求帮助，或者休息一下。</span></li></ul><a class="intro-illustration" href="#story/fox" aria-label="开始小狐狸的故事">${sceneArt('fox')}</a></div></section>
  <section class="stories-section" id="stories" aria-labelledby="stories-title"><div class="section-heading"><h2 id="stories-title">选一个故事，开始吧</h2><p>从哪一个开始都可以。想跳过的问题，就跳过。</p></div><div class="story-grid">${stories.map(s => `<article class="story-card story-${s.id}"><a href="#story/${s.id}" class="story-image" aria-label="进入故事：${s.title}">${sceneArt(s.id)}</a><div class="story-card-body"><h3><a href="#story/${s.id}">${s.title}</a></h3><p>${s.subtitle}</p><a class="story-link" href="#story/${s.id}">找${s.animal}玩</a></div></article>`).join('')}<article class="guide-card"><div class="guide-art" aria-hidden="true">${emotionFace('开心')}${emotionFace('难过')}${emotionFace('不知道')}</div><h3>不知道？也没关系。</h3><p>心情有时说不清楚。<br>可以再想想，也可以先歇一会儿。</p><a class="story-link" href="#parents">大人可以怎样陪伴？</a></article></div></section>
  <section class="bottom-note"><h2>给陪伴的大人</h2><p>读读故事，听听孩子怎么说，不用急着找“正确答案”。<br>本游戏用于情绪教育，不提供诊断或治疗。</p><div><a class="button" href="#parents">看看陪伴建议</a><a class="plain-link" href="#theory">理论依据与使用说明 →</a></div></section>`;
}

function renderGame() {
  const story = stories.find(s => s.id === state.storyId);
  if (!story) return;
  let content = '';
  if (state.step === 0) content = `<p class="step-kicker">故事 ${story.icon} · ${story.subtitle}</p><h1>${story.title}</h1><p class="story-prose">${story.scene}</p><div class="gentle-note">陪它想一想。不想回答的时候，可以跳过。</div>`;
  if (state.step === 1) content = `<p class="step-kicker">点一点下面的小脸，可以选好几个</p><h1>${story.question}</h1><p class="muted">你猜它是什么心情？选你觉得像的。</p><div class="emotion-grid">${emotions.map(label => `<button class="emotion-choice ${state.emotions.includes(label) ? 'selected' : ''}" data-field="emotions" data-value="${label}" aria-label="${label}" aria-pressed="${state.emotions.includes(label)}">${emotionFace(label)}<span>${label}</span></button>`).join('')}</div><p class="small muted">还没想好？可以点“不知道”。</p>`;
  if (state.step === 2) content = `<p class="step-kicker">想一想，再点一点</p><h1>它的身体有什么感觉？</h1><p class="muted">${story.animal}会有这些感觉吗？可以选好几个。</p><div class="choice-list">${bodyOptions.map(label => `<button class="choice ${state.body.includes(label) ? 'selected' : ''}" data-field="body" data-value="${label}" aria-pressed="${state.body.includes(label)}"><span class="check" aria-hidden="true">${state.body.includes(label) ? '✓' : '+'}</span>${label}</button>`).join('')}</div><p class="small muted">身体信号不代表某种疾病。持续或明显不舒服，要告诉大人。</p>`;
  if (state.step === 3) content = `<p class="step-kicker">一起看看发生了什么</p><h1>${story.id === 'fox' ? '它的猜想，会是真的吗？' : story.id === 'bear' ? '塔倒了，小熊很在意。' : '小兔还想和朋友玩。'}</h1><blockquote>${story.thought}</blockquote><div class="fact-card"><strong>已经发生的事</strong><p>${story.known}</p></div><div class="fact-card unknown"><strong>还没弄清楚的事</strong><p>${story.unknown}</p></div><p>你愿意一起看看吗？</p><div class="reflection-options">${button('听听另一种理解', 'data-reflection="explore"', true)}${button('现在还不确定', 'data-reflection="unsure"', true)}</div>${state.reflection ? `<div class="feedback" role="status">${state.reflection === 'unsure' ? '不确定也可以，不用现在找到答案。' : story.explanation}</div>` : ''}`;
  if (state.step === 4) content = `<p class="step-kicker">点一个办法，看看会怎么样</p><h1>下一步，可以怎么做？</h1><p class="muted">你想先试哪一个？</p><div class="action-list">${story.actions.map((a, i) => `<button class="action-choice ${state.action === i ? 'selected' : ''}" data-action="${i}" aria-pressed="${state.action === i}"><span class="action-number">0${i + 1}</span><span>${a.label}</span><span aria-hidden="true">${state.action === i ? '✓' : '↗'}</span></button>`).join('')}</div>${state.action !== null ? `<div class="feedback" role="status"><strong>可以这样想：</strong><p>${story.actions[state.action].feedback}</p></div>` : ''}<details class="calm"><summary>想先歇一下？</summary><p>可以看看窗外、伸展一下，或请可信任的大人陪你。也可以自然、舒服地呼吸几次，不用深吸气或憋气；不舒服就停下。不需要平静下来才继续。</p></details>`;
  if (state.step === 5) content = `<p class="step-kicker">${story.animal}的故事讲完啦</p><h1>下次，我们还可以试试。</h1><p class="muted">我们刚才一起看了这些。想继续玩，也可以回到小岛选个新故事。</p><dl class="recap"><div><dt>你猜的心情</dt><dd>${state.emotions.length ? state.emotions.join('、') : '未选择 · 这次跳过了'}</dd></div><div><dt>可能的身体信号</dt><dd>${state.body.length ? state.body.join('、') : '未选择'}</dd></div><div><dt>你了解的行动</dt><dd>${state.action !== null ? story.actions[state.action].label : '未选择 · 可以以后再看看'}</dd></div></dl><div class="practice"><span class="eyebrow">要不要和大人一起试试？</span><p>${story.practice}</p></div><details><summary>给陪伴的大人</summary><p>${story.parent}</p></details><details><summary>这个故事借鉴了什么？</summary><p>${story.theory}</p><a href="#theory">查看研究依据与限制 →</a></details>`;
  main.innerHTML = `<div class="game-wrap"><div class="game-top"><a href="#home" class="back-link">← 返回小岛 · 清除本次选择</a><span>陪${story.animal}探索心情</span></div><ol class="stepper" aria-label="故事进度">${steps.map((label, i) => `<li ${i === state.step ? 'aria-current="step"' : ''} class="${i < state.step ? 'done' : ''}"><span>${i < state.step ? '✓' : i + 1}</span><b>${label}</b></li>`).join('')}</ol><div class="game-layout"><aside class="scene-panel">${sceneArt(story.id)}<div><span class="eyebrow">${story.animal}说</span><p>你愿意<br>陪我想想吗？</p><small>不想选也没关系。</small></div></aside><section class="game-content">${content}<div class="game-controls">${state.step > 0 ? button('← 上一步', 'data-move="-1"', true) : '<span></span>'}<div>${state.step > 0 && state.step < 5 ? '<button class="text-button" data-skip>跳过这一步</button>' : ''}${state.step < 5 ? button(state.step === 0 ? '一起看看 →' : state.step === 4 ? '看看这段旅程 →' : '继续探索 →', 'data-move="1"') : button('回到小岛 →', 'data-home')}</div></div>${state.step === 5 ? '<button class="text-button restart" data-restart>重新陪它走一次</button>' : ''}</section></div></div>`;
}

function renderInfo(page) {
  const text = {
    parents: `<p class="eyebrow">一起陪孩子玩</p><h1>陪伴，比给出答案更重要。</h1><p class="intro">这是一段一起理解感受的时间，不是考察孩子“会不会管理情绪”。</p><div class="info-grid"><article><span class="number">01</span><h2>先听见，再邀请</h2><p>“听起来你很舍不得。”“你愿意说一点吗？”不替孩子定义感受，不追问真实经历。沉默或跳过也值得尊重。</p></article><article><span class="number">02</span><h2>可以示范，不必纠正</h2><p>“如果是我，我可能会紧张。你呢？”这是一个可能的例子，不是标准答案。避免“这有什么好怕的”“你想多了”。</p></article><article><span class="number">03</span><h2>允许感受，守住安全</h2><p>生气、难过都可以；伤害自己或别人不可以。遭遇嘲笑、欺负和威胁时，需要现实中的保护，不能只要求改变想法。</p></article><article><span class="number">04</span><h2>一起练习，也允许停止</h2><p>按理解能力协助读出内容。6—10 岁只是暂定设计年龄，不是能力标准。孩子不愿玩或感到不适时结束，不要求完成全部步骤。</p></article></div><div class="callout"><h2>什么时候需要更多帮助？</h2><p>若困扰持续影响睡眠、上学或人际关系，建议寻求儿童心理或医疗专业人员评估。如有即时危险，优先联系能提供保护的成人及当地紧急服务，不继续游戏。可信任的成人也可以是其他照护者、老师或专业人员。</p></div><h2>一段简单的陪伴对话</h2><blockquote>“你觉得它可能怎么了？”<br>“还没弄清楚的事是什么？”<br>“你愿意试哪一个小办法？不想选也可以。”</blockquote>`,
    theory: `<p class="eyebrow">给大人看的设计说明</p><h1>有理论依据，也说明边界。</h1><p class="intro">本项目是借鉴心理学方法的教育原型。相关方法的研究结果，不等于这个游戏已经被证明有效。</p><div class="theory-row"><span>01</span><div><h2>认知行为疗法：理解联系，练习应对</h2><p>情绪、身体反应、想法和行动会相互影响，没有固定发生顺序。我们用具体故事练习辨认和应对，不将所有困难归因于“想错了”。</p><p>儿童焦虑 CBT 的系统综述支持其相对等待或不治疗的短期效果，但与其他治疗比较仍有不确定性。完整方案的证据不能移用于几个短故事。</p><a href="https://www.cochrane.org/evidence/CD013162_cognitive-behavioural-therapy-anxiety-children-and-young-people" target="_blank" rel="noopener noreferrer">James 等（2020），Cochrane 综述 ↗</a></div></div><div class="theory-row"><span>02</span><div><h2>接纳与自主：借鉴原则，保留区别</h2><p>允许不知道、跳过和多种感受，尊重儿童的表达。专业游戏治疗包含受训治疗师和治疗关系；网页选择题不能等同于儿童中心游戏治疗。</p><a href="https://www.a4pt.org/resource/resmgr/credentials/terms.pdf" target="_blank" rel="noopener noreferrer">Association for Play Therapy：术语与定义 ↗</a></div></div><div class="theory-row"><span>03</span><div><h2>发展适配与陪伴：具体、灵活、不考试</h2><p>年龄不等于理解能力。故事使用图片、具体事件和短句，邀请成人帮助阅读；认知练习可以跳过。NICE 指南要求临床干预考虑认知与情绪成熟度，并考虑照护者参与。</p><a href="https://www.nice.org.uk/guidance/cg159/chapter/recommendations" target="_blank" rel="noopener noreferrer">NICE CG159，1.5.3—1.5.5 ↗</a></div></div><div class="callout"><h2>我们还没有验证的部分</h2><p>未完成有资质的儿童心理专业人员逐句审核、儿童可用性试用或效果研究。完成率、开心程度、答题表现均不能证明疗效。不用于诊断、治疗焦虑或预防抑郁，也不替代专业服务。</p><p>数字干预需要针对具体产品和支持条件收集证据。海外课程的效果也不保证能迁移到中文家庭场景。</p><a href="https://www.nice.org.uk/guidance/htg660" target="_blank" rel="noopener noreferrer">NICE 数字 CBT 指南 ↗</a> · <a href="https://pubmed.ncbi.nlm.nih.gov/27586071/" target="_blank" rel="noopener noreferrer">PATHS 集群随机试验（2016）↗</a></div><h2>三个故事，各有侧重</h2>${stories.map(s => `<article class="theory-story"><h3>${s.title}</h3><p>${s.theory}</p></article>`).join('')}<p class="small muted">文献核查：2026-11-11。部分来源依据可访问摘要或检索正文，非系统综述。完整记录见项目文档。</p>`,
    about: `<p class="eyebrow">使用说明</p><h1>安心探索，随时离开。</h1><h2>使用范围</h2><p>这是儿童情绪与应对技能的教育原型，暂以 6—10 岁为设计目标，建议成人陪伴。没有诊断、量表测评、AI 咨询或治疗服务。故事都是虚构的，不要求讲述真实经历。</p><h2>你的选择留在哪里？</h2><p>游戏不提供账号、不使用统计脚本、不上传或持久保存选择。选择仅在当前页面内存中暂存；刷新、退出故事或进入其他页面会清除。返回上一步会保留本关选择，跳过会清除该步答案。</p><p>托管平台可能保留普通网站访问日志，本应用无法控制这些平台记录。点击研究链接会打开第三方网站，其隐私政策另行适用。</p><h2>怎样使用</h2><p>选择一个故事，按自己的节奏探索。可以多选感受，也可以不知道或跳过。没有情绪排名、连续打卡或通关分数。声音不会自动播放，首版没有配音，请陪伴者帮助阅读。</p><h2>无障碍</h2><p>支持键盘 Tab 移动焦点，Enter 或空格操作按钮。页面遵循系统减少动态的偏好，内容不单靠颜色表达。界面不根据选择推断儿童状态。</p><div class="callout"><strong>当前状态：原型 v0.1</strong><p>已完成文献层面的方案核查，尚未完成持证专业人员内容审核、儿童试用和临床验证。</p></div>`,
  };
  main.innerHTML = `<section class="info-page"><a href="#home" class="back-link">← 返回小岛</a>${text[page]}<a class="button" href="#home">回到小岛 ${arrow}</a></section>`;
}

function route() {
  const hash = location.hash.slice(1) || 'home';
  document.body.dataset.page = hash.startsWith('story/') ? 'story' : ['parents', 'theory', 'about'].includes(hash) ? 'info' : 'home';
  const storyId = hash.startsWith('story/') ? hash.slice(6) : null;
  const story = stories.find(s => s.id === storyId);
  if (story) { if (state.storyId !== story.id) reset(state, story.id); renderGame(); }
  else {
    reset(state);
    if (['parents', 'theory', 'about'].includes(hash)) renderInfo(hash);
    else renderHome();
  }
  document.querySelectorAll('[data-nav]').forEach(link => {
    const active = link.dataset.nav === (story || hash === 'stories' ? 'home' : hash);
    if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
  });
  document.title = `${story ? story.title : { parents: '给陪伴的大人', theory: '背后的心理学', about: '使用说明与隐私' }[hash] || '和小伙伴一起，看看心情吧'} · 情绪探险岛`;
  if (hash === 'stories') document.querySelector('#stories').scrollIntoView();
  else focusHeading();
}

main.addEventListener('click', event => {
  const target = event.target.closest('button');
  if (!target) return;
  if (target.dataset.field) {
    select(state, target.dataset.field, target.dataset.value);
    const { field, value } = target.dataset;
    // Preserve keyboard focus when the selection group is re-rendered.
    renderGame();
    main.querySelectorAll('[data-field]').forEach(b => { if (b.dataset.field === field && b.dataset.value === value) b.focus({ preventScroll: true }); });
  } else if (target.dataset.reflection) {
    state.reflection = target.dataset.reflection;
    renderGame(); main.querySelector(`[data-reflection="${state.reflection}"]`).focus({ preventScroll: true });
  } else if (target.dataset.action !== undefined) {
    state.action = Number(target.dataset.action);
    renderGame(); main.querySelector(`[data-action="${state.action}"]`).focus({ preventScroll: true });
  } else if (target.hasAttribute('data-move') || target.hasAttribute('data-skip')) {
    move(state, target.hasAttribute('data-skip') ? 1 : Number(target.dataset.move), target.hasAttribute('data-skip'));
    renderGame(); focusHeading();
  } else if (target.hasAttribute('data-restart')) { reset(state, state.storyId); renderGame(); focusHeading(); }
  else if (target.hasAttribute('data-home')) location.hash = 'home';
});
document.querySelector('.skip-link').addEventListener('click', event => {
  event.preventDefault();
  main.focus();
});
window.addEventListener('hashchange', route);
route();
