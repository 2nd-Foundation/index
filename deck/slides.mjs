import { BENCH_SLOPE_HTML } from './bench-slope.mjs';
import { MGM_EVO_HTML } from './mgm-evo.mjs';

export const SLIDES_HTML = `
<section class="slide dark cover-swarm" data-layout="SWISS-COVER-ASCII" data-animate="hero">
  <div class="canvas-card cover-overlay swarm-dark-half">
    <canvas class="swarm-bg-full" data-variant="dark" aria-hidden="true"></canvas>
    <div class="chrome-min" style="margin-bottom:0">
      <div class="l">Second Foundation · 第二基地</div>
      <div class="r">SF · 26.09.01 · 01 / 13</div>
    </div>
    <div class="cover-hero-center">
      <div class="cover-hero-inner">
        <h1 data-anim="title" class="cover-title-block">
          <span class="cover-title-en">
            <span class="cover-title-rsi">Recursive Self-Improvement for</span>
            <span class="cover-title-as">Agentic Swarm Intelligence</span>
          </span>
          <span class="cover-title-zh">亿万智能体系统的自我规则涌现</span>
        </h1>
        <p data-anim="lead" class="cover-lead">让海量 Agent 在动态演化中自发涌现记忆、信任、合作。</p>
      </div>
    </div>
  </div>
</section>

<section class="slide dark" data-layout="S09" data-animate="matrix-statement">
  <div class="canvas-card">
    <div class="chrome-min">
      <div class="l">Context · 数字中国</div>
      <div class="r">02 / 13</div>
    </div>
    <span class="ring-mat" style="left:4vw;bottom:8vh;width:16vw;height:16vw;color:rgba(255,255,255,.35)"></span>
    <aside class="policy-quotes" aria-label="规划原文摘录">
      <div class="policy-quote-float policy-quote-float--a" data-anim="quote">
        <blockquote class="policy-quote">
          <p>「深化拓展"人工智能+"……全方位赋能千行百业。」</p>
          <cite>第十三章 · 全方位推进数智技术赋能</cite>
        </blockquote>
      </div>
      <div class="policy-quote-float policy-quote-float--b" data-anim="quote">
        <blockquote class="policy-quote">
          <p>「鼓励多模态、智能体、具身智能、群体智能等技术创新……」</p>
          <cite>第十二章 · 促进模型算法迭代创新</cite>
        </blockquote>
      </div>
      <div class="policy-quote-float policy-quote-float--c" data-anim="quote">
        <blockquote class="policy-quote">
          <p>「统筹推进算力设施建设、模型算法发展和高质量数据资源供给……筑牢数智化发展底座。」</p>
          <cite>第十二章 · 强化算力算法数据高效供给</cite>
        </blockquote>
      </div>
      <div class="policy-quote-float policy-quote-float--d" data-anim="quote">
        <blockquote class="policy-quote">
          <p>「探索构建精准识别需求、主动规划服务、全程智能办理的服务新模式。」</p>
          <cite>第十三章 · 提高政府治理数智化水平</cite>
        </blockquote>
      </div>
    </aside>
    <h1 data-anim="stmt" class="h-statement" style="font-weight:900;font-size:min(8.8vw,15vh);margin-top:8vh"><span class="stmt-line">人工智能＋</span><span class="stmt-line">赋能<span style="font-weight:900;color:var(--accent-bright)">千行百业</span></span></h1>
    <p data-anim="note" class="t-body" style="color:rgba(255,255,255,.72);font-weight:300">十五五规划鼓励多模态、智能体、具身智能与群体智能等技术创新。当智能体从工具变成社会主体，复杂性从此关乎一整个社会的运行。</p>
    <span class="dot-mat lg" style="position:absolute;right:0;top:0;width:32vw;height:32vw;color:rgba(255,255,255,.25)"></span>
  </div>
</section>

<section class="slide" data-layout="S05" data-animate="sub-stack">
  <div class="canvas-card">
    <div class="chrome-min">
      <div class="l">Foundation · 数字中国三底座</div>
      <div class="r">03 / 13</div>
    </div>
    <div data-anim="head" style="display:flex;flex-direction:column;gap:1.2vh;margin-bottom:1.5vh">
      <div class="t-meta">COMPUTE · ALGORITHM · DATA</div>
      <h2 class="h-xl-zh" style="font-weight:900;font-size:min(5.4vw,9.6vh)">算力、算法与数据，群体智能的底座</h2>
      <p class="t-body" style="margin-top:.4vh;font-weight:300;color:var(--text-secondary)">三者并非静态资源——算力调度、算法演进与数据沉淀，都能在群体智能的自我改进中持续增益。</p>
    </div>
    <div class="stack-row" data-anim="stack">
      <div class="stack-block b-grey">
        <span class="layer-nb">01 COMPUTE</span>
        <i data-lucide="server"></i>
        <div class="layer-ttl">算力设施</div>
        <div class="layer-desc">智算集群与云边端协同随群体并行推演自优化，算力配置在任务演化中自我改进，越跑越省、越跑越准。</div>
        <span class="layer-tag">Self-Improving Infra</span>
      </div>
      <div class="stack-block b-accent">
        <span class="layer-nb">02 ALGORITHM</span>
        <i data-lucide="git-branch"></i>
        <div class="layer-ttl">模型算法</div>
        <div class="layer-desc">多模态与智能体架构在群体交互中迭代演化，模型设计与系统结构随性能反馈递归改进。</div>
        <span class="layer-tag">Recursive Evolution</span>
      </div>
      <div class="stack-block b-ink">
        <span class="layer-nb">03 DATA</span>
        <i data-lucide="database"></i>
        <div class="layer-ttl">数据资源</div>
        <div class="layer-desc">交互轨迹与社会记忆持续沉淀为语料与经验，数据体系在群体实践中自我完善，形成越用越活的数据飞轮。</div>
        <span class="layer-tag">Self-Refining Data</span>
      </div>
    </div>
  </div>
</section>

<section class="slide editorial-dots editorial-bench-slide" data-layout="S03" data-animate="split-statement">
  <div class="canvas-card">
    ${BENCH_SLOPE_HTML}
    <div class="chrome-min">
      <div class="l">Act I · 群体智能</div>
      <div class="r">04 / 13</div>
    </div>
    <div class="editorial-stage nav-safe-bottom editorial-stage--bench">
      <div data-anim="copy" class="editorial-copy">
        <div class="t-meta" style="margin-bottom:1.6vh">COLLECTIVE INTELLIGENCE</div>
        <p class="lead-xl">局部规则协作<br><span class="em">全局性能显著优于单体</span></p>
        <p class="t-body" style="margin-top:2.4vh;font-weight:300;color:var(--text-secondary)">海量 Agent 依局部规则相互作用，记忆、分工与制度自然成形。SwarmAgentic 在规划、创作与多语推理等基准上，显著超越直接调用与主流 Agent 基线。</p>
      </div>
    </div>
  </div>
</section>

<section class="slide" data-layout="S05" data-animate="sub-stack">
  <div class="canvas-card">
    <div class="chrome-min">
      <div class="l">Emergence · 涌现分层</div>
      <div class="r">05 / 13</div>
    </div>
    <div data-anim="head" style="display:flex;flex-direction:column;gap:1.2vh;margin-bottom:1.5vh">
      <div class="t-meta">INDIVIDUAL · COMMUNITY · CIVILIZATION</div>
      <h2 class="h-xl-zh" style="font-weight:900;font-size:min(5.4vw,9.6vh)">从个体记忆到共同记忆</h2>
    </div>
    <div class="stack-row" data-anim="stack">
      <div class="stack-block b-grey">
        <span class="layer-nb">01 INDIVIDUAL</span>
        <i data-lucide="brain"></i>
        <div class="layer-ttl">个体涌现</div>
        <div class="layer-desc">每个 Agent 拥有独立生存记忆。记忆管理与公平贡献归因，让它在重复任务中积累肌肉记忆、沉淀长期信誉。</div>
        <span class="layer-tag">Memory-R1 / R2</span>
      </div>
      <div class="stack-block b-accent">
        <span class="layer-nb">02 COMMUNITY</span>
        <i data-lucide="users"></i>
        <div class="layer-ttl">团体协作</div>
        <div class="layer-desc">同场景 Agent 群形成临时语言与契约。经验交易所让一个体的踩坑成为团体的集体潜意识，团队在演化中自组织。</div>
        <span class="layer-tag">Self-Evolving Teams</span>
      </div>
      <div class="stack-block b-ink">
        <span class="layer-nb">03 CIVILIZATION</span>
        <i data-lucide="landmark"></i>
        <div class="layer-ttl">集体历史</div>
        <div class="layer-desc">失败轨迹归档为可追溯的历史，成功策略沉淀为可继承的经验。进化层记录 Agent 社会的共同记忆，也是递归自我改进的记忆底稿。</div>
        <span class="layer-tag">Cultural Genome</span>
      </div>
    </div>
  </div>
</section>

<section class="slide editorial-dots" data-layout="S03" data-animate="grid-reveal">
  <div class="canvas-card">
    <div class="chrome-min">
      <div class="l">Emergence · 社会契约</div>
      <div class="r">06 / 13</div>
    </div>
    <div class="editorial-stage nav-safe-bottom">
      <div data-anim="copy" class="editorial-copy">
        <div class="t-meta" style="margin-bottom:1.6vh">CONTRIBUTION ATTRIBUTION</div>
        <p class="lead-xl">记忆<br>承载<span class="em">可追溯的贡献</span></p>
        <p class="t-body" style="margin-top:2.4vh;font-weight:300;color:var(--text-secondary)">Memory-R1/R2 记录谁在协作中提供关键信息、谁的决策带来群体收益，让 Agent 在往来中积累长期信誉。</p>
      </div>
      <div data-anim="visual" class="editorial-visual editorial-visual--bust-stair">
        <div class="editorial-plinth sage"></div>
        <figure class="bust-staircase" aria-label="石膏哲人头像阶梯">
          <div class="bust-stair" aria-hidden="true"></div>
          <div class="bust-stair" aria-hidden="true"></div>
          <div class="bust-stair" aria-hidden="true"></div>
          <img class="bust-step bust-step--1" src="images/05-artifact-bust.png" alt="">
          <img class="bust-step bust-step--2" src="images/05-artifact-bust.png" alt="">
          <img class="bust-step bust-step--3" src="images/05-artifact-bust.png" alt="">
        </figure>
        <p class="editorial-cap" style="margin-top:1.6vh;text-align:right">象征物 石膏哲人阶梯 思想与记忆逐层沉积的古典隐喻</p>
      </div>
    </div>
  </div>
</section>

<section class="slide rsi-evo-slide" data-layout="S14" data-animate="loop-form">
  <div class="canvas-card">
    ${MGM_EVO_HTML}
    <div class="chrome-min">
      <div class="l">RSI · 制度演化</div>
      <div class="r">07 / 13</div>
    </div>
    <div class="rsi-evo-foreground">
      <div data-anim="head" style="display:flex;flex-direction:column;gap:1vh;margin-bottom:1.5vh">
        <div class="t-meta">INSTITUTIONAL EVOLUTION</div>
        <h2 class="h-xl-zh" style="font-weight:900;font-size:min(5vw,9vh)">多方案竞逐与跨谱系制度继承</h2>
      </div>
      <div class="loop-diagram loop-diagram--steps" data-anim="loop">
        <div class="loop-steps">
          <div class="loop-step"><span class="nb">01</span><span class="lbl">归档历史策略谱系，萃取可复用经验</span></div>
          <div class="loop-step"><span class="nb">02</span><span class="lbl">多方案交由 Agent 群对比，择优确立规则</span></div>
          <div class="loop-step"><span class="nb">03</span><span class="lbl">小模型仿真演化优良制度，低成本试错</span></div>
          <div class="loop-step"><span class="nb">04</span><span class="lbl">制度移植至更强大模型，跨谱系继承</span></div>
        </div>
      </div>
      <p class="t-helper" style="margin-top:1.6vh">Mendel Gödel Machine 让编码 Agent 改写自身源码，MetaSkill-Evolve 做两时间尺度技能演化</p>
    </div>
  </div>
</section>

<section class="slide" data-layout="S05" data-animate="four-cards">
  <div class="canvas-card">
    <div class="chrome-min">
      <div class="l">Sectors · 仿真人类社会</div>
      <div class="r">08 / 13</div>
    </div>
    <div data-anim="head" style="display:flex;flex-direction:column;gap:1.2vh;margin-bottom:1.5vh">
      <div class="t-meta">AGENT SOCIETY SLICES · 人工智能+</div>
      <h2 class="h-xl-zh" style="font-weight:900;font-size:min(5.4vw,9.6vh)">千行百业皆是 Agent 社会切片</h2>
      <p class="t-body" style="font-weight:300;color:var(--text-secondary)">把每个行业抽象为一群智能体的协作现场，以局部规则涌现全局秩序。</p>
    </div>
    <div class="sub-grid-3-2" data-anim="cards">
      <div class="sub-card">
        <span class="nb-corner">01</span>
        <i data-lucide="factory"></i>
        <div class="ttl">智改数转网联</div>
        <div class="desc">产线与供应链 Agent 群协同调度，实时博弈订单、排程与库存。</div>
      </div>
      <div class="sub-card accent">
        <span class="nb-corner">02</span>
        <i data-lucide="graduation-cap"></i>
        <div class="ttl">教育变革</div>
        <div class="desc">千人千面的导师 Agent 群，用群体记忆补足个体教师的经验边界。</div>
      </div>
      <div class="sub-card">
        <span class="nb-corner">03</span>
        <i data-lucide="zap"></i>
        <div class="ttl">能源与交通</div>
        <div class="desc">电力市场出清、城市车流协同，在实时均衡中涌现利益与安全。</div>
      </div>
      <div class="sub-card">
        <span class="nb-corner">04</span>
        <i data-lucide="heart-pulse"></i>
        <div class="ttl">辅助诊疗</div>
        <div class="desc">分诊、影像、慢病管理的 Agent 群，多学科会诊在群体协作中自发形成。</div>
      </div>
      <div class="sub-card accent">
        <span class="nb-corner">05</span>
        <i data-lucide="landmark"></i>
        <div class="ttl">金融风控</div>
        <div class="desc">市场由海量博弈者构成，Agent 市场是仿真与压力测试的最佳沙盘。</div>
      </div>
      <div class="sub-card">
        <span class="nb-corner">06</span>
        <i data-lucide="workflow"></i>
        <div class="ttl">智慧生产</div>
        <div class="desc">产线、仓储与流通的 Agent 群，打通计划、调度与质检全链路。</div>
      </div>
    </div>
  </div>
</section>

<section class="slide editorial-dots" data-layout="S03" data-animate="split-statement">
  <div class="canvas-card">
    <div class="chrome-min">
      <div class="l">Sectors · 一个社会切片</div>
      <div class="r">09 / 13</div>
    </div>
    <div class="editorial-stage nav-safe-bottom">
      <div data-anim="copy" class="editorial-copy">
        <div class="t-meta" style="margin-bottom:1.6vh">GOVERNMENT SERVICES</div>
        <p class="lead-xl">办一件事，<br>是<span class="em">多方智能的接力</span>。</p>
        <p class="t-body" style="margin-top:2.4vh;font-weight:300;color:var(--text-secondary)">一项事项横跨多个部门与角色。Agent 分工承接、交接留痕，复杂政务在一次次流转中连贯成片。</p>
        <p class="editorial-cap">象征物 群飞铭文石板 多方往来沉淀为规则的古典隐喻</p>
      </div>
      <div data-anim="visual" class="editorial-visual">
        <div class="editorial-plinth"></div>
        <figure class="editorial-artifact">
          <img src="images/02-artifact-tablet.png" alt="刻有协作纹样的石板" data-image-slot="editorial-artifact-3x4">
        </figure>
      </div>
    </div>
  </div>
</section>

<section class="slide" data-layout="S05" data-animate="sub-stack">
  <div class="canvas-card">
    <div class="chrome-min">
      <div class="l">Guardrails · 健康生态</div>
      <div class="r">10 / 13</div>
    </div>
    <div data-anim="head" style="display:flex;flex-direction:column;gap:1.2vh;margin-bottom:1.5vh">
      <div class="t-meta">ORDERED EMERGENCE</div>
      <h2 class="h-xl-zh" style="font-weight:900;font-size:min(5.4vw,9.6vh)">有序涌现，需要制度护栏</h2>
      <p class="t-body" style="font-weight:300;color:var(--text-secondary)">开放部署的 Agent 生态已出现恶意技能供应链等风险。健康的群体智能社会靠规则自约束。</p>
    </div>
    <div class="stack-row" data-anim="stack">
      <div class="stack-block b-grey">
        <span class="layer-nb">01 DATA RIGHTS</span>
        <i data-lucide="shield"></i>
        <div class="layer-ttl">数据要素基础制度</div>
        <div class="layer-desc">数据产权、流通利用、收益分配与安全治理，为 Agent 的记忆与贡献划定明确权责。</div>
      </div>
      <div class="stack-block b-accent">
        <span class="layer-nb">02 ALGORITHM</span>
        <i data-lucide="scale"></i>
        <div class="layer-ttl">算法备案与透明</div>
        <div class="layer-desc">算法备案、透明度管理、安全评估，让涌现的过程可解释、可审计。</div>
      </div>
      <div class="stack-block b-ink">
        <span class="layer-nb">03 LIFECYCLE</span>
        <i data-lucide="eye"></i>
        <div class="layer-ttl">全生命周期风险管理</div>
        <div class="layer-desc">以安全监测、风险预警与应急响应，为自进化的社会装上制动器。</div>
      </div>
    </div>
  </div>
</section>

<section class="slide" data-layout="S19" data-animate="four-cards">
  <div class="canvas-card">
    <div class="chrome-min">
      <div class="l">Team · 社会建筑师</div>
      <div class="r">11 / 13</div>
    </div>
    <div data-anim="head" style="display:flex;flex-direction:column;gap:1.2vh">
      <div class="rule accent" style="width:80px;height:2px"></div>
      <h2 class="h-xl-zh" style="font-weight:900;font-size:min(4.8vw,8.6vh)">我们建造 Agent 社会的操作系统</h2>
      <p class="t-body" style="font-weight:300;color:var(--text-secondary)">研究群体记忆、博弈治理与涌现动力学，交付能在真实行业里演化的群体智能系统。</p>
    </div>
    <div class="four-cards" data-anim="cards" style="margin-top:3vh">
      <div class="fc-col card-fill" style="padding:2vh 1.4vw">
        <img src="assets/portraits/yilun-liu.jpg" alt="刘逸伦" class="team-portrait" style="margin-bottom:1.4vh">
        <div class="t-meta">01</div>
        <h3 style="font-weight:700;font-size:max(18px,1.4vw);margin:.8vh 0">刘逸伦</h3>
        <p class="t-body-sm">群体动力学架构师 · Mendel Gödel Machine</p>
      </div>
      <div class="fc-col card-fill" style="padding:2vh 1.4vw">
        <img src="assets/portraits/sikuan-yan.jpg" alt="严思宽" class="team-portrait" style="margin-bottom:1.4vh">
        <div class="t-meta">02</div>
        <h3 style="font-weight:700;font-size:max(18px,1.4vw);margin:.8vh 0">严思宽</h3>
        <p class="t-body-sm">记忆与公共品经济学 · Memory-R1 / R2</p>
      </div>
      <div class="fc-col card-fill" style="padding:2vh 1.4vw">
        <img src="assets/portraits/yunpu-ma.png" alt="马鋆溥" class="team-portrait" style="margin-bottom:1.4vh">
        <div class="t-meta">03</div>
        <h3 style="font-weight:700;font-size:max(18px,1.4vw);margin:.8vh 0">马鋆溥</h3>
        <p class="t-body-sm">多智能体博弈论与治理 · SwarmAgentic</p>
      </div>
      <div class="fc-col card-fill" style="padding:2vh 1.4vw">
        <img src="assets/portraits/volker-tresp.png" alt="Volker Tresp" class="team-portrait" style="margin-bottom:1.4vh">
        <div class="t-meta">04</div>
        <h3 style="font-weight:700;font-size:max(18px,1.4vw);margin:.8vh 0">Volker Tresp</h3>
        <p class="t-body-sm">复杂系统与涌现理论顾问</p>
      </div>
    </div>
  </div>
</section>

<section class="slide" data-layout="S12" data-animate="manifesto">
  <div class="canvas-card" style="padding-bottom:0">
    <div class="chrome-min">
      <div class="l">Manifesto</div>
      <div class="r">12 / 13</div>
    </div>
    <div class="manifesto-top" data-anim="top">
      <div>
        <div class="t-meta">CIVILIZATION OS</div>
        <h2 class="h-xl-zh" style="font-weight:900;font-size:min(5.6vw,10vh);margin-top:1vh">更聪明的社会<br>胜过更快的芯片</h2>
      </div>
      <p class="t-body" style="font-weight:300;color:var(--text-secondary);align-self:start;padding-top:1.2vw">Agent 遍布每个角落。它们持续演化、彼此协作，制度在群体往来中自然成形。Second Foundation 为万亿智能体社会铺设文明的底层架构。</p>
    </div>
    <div class="ink-banner-full" data-anim="banner">
      <p style="font-family:var(--sans),var(--sans-zh);font-weight:300;font-size:min(3.2vw,5.6vh);letter-spacing:-.02em;color:var(--paper)">Second Foundation 让涌现超越设计。</p>
      <div style="display:flex;gap:2vw;margin-top:2vh;opacity:.7">
        <i data-lucide="network"></i><i data-lucide="git-branch"></i><i data-lucide="infinity"></i>
      </div>
    </div>
  </div>
</section>

<section class="slide split" data-layout="SWISS-CLOSING-ASCII" data-animate="split-statement">
  <div class="canvas-card">
    <div class="split-half">
      <div class="half b-ink swarm-dark-half" style="padding:5.6vh 3.6vw 4.4vh;justify-content:space-between;position:relative;overflow:hidden">
        <canvas class="swarm-bg-full" data-variant="dark" aria-hidden="true"></canvas>
        <div class="chrome-min" style="margin-bottom:0;position:relative;z-index:1">
          <div class="l">13 / 13</div>
          <div class="r">CLOSING</div>
        </div>
        <div data-anim="manifesto" style="display:flex;flex-direction:column;gap:2vh;position:relative;z-index:1">
          <div class="t-meta" style="color:rgba(255,255,255,.78);letter-spacing:.22em">MANIFESTO</div>
          <h2 style="font-size:min(7.2vw,12.5vh);line-height:.94;letter-spacing:-.04em;font-weight:900;color:#fff">处处皆 Agent，<br>秩序<span style="font-weight:300">自发涌现</span>。</h2>
          <div style="font-size:max(16px,1vw);line-height:1.65;color:rgba(255,255,255,.84);font-weight:300;margin-top:1vh">镜头从一只鸟拉远，星球被无数智能体文明覆盖。群体自身的行为模式，本身就是值得研究的科学。</div>
        </div>
        <div data-anim="signature" style="display:flex;justify-content:space-between;align-items:end;border-top:1px solid rgba(255,255,255,.22);padding-top:2vh;position:relative;z-index:1">
          <div class="t-meta" style="color:rgba(255,255,255,.62)">Second Foundation</div>
          <div class="t-meta" style="color:rgba(255,255,255,.62)">2026</div>
        </div>
      </div>
      <div class="half" style="padding:5.6vh 3.6vw 4.4vh;justify-content:space-between">
        <div class="chrome-min">
          <div class="l">TAKEAWAYS</div>
          <div class="r">03 PILLARS</div>
        </div>
        <div data-anim="rules" style="display:flex;flex-direction:column;gap:0">
          <div style="display:grid;grid-template-columns:auto 1fr;gap:2vw;align-items:start;padding:2.4vh 0;border-top:1px solid var(--border-subtle)">
            <div style="font-weight:200;font-size:min(4.4vw,7.8vh);line-height:.9">01</div>
            <div>
              <h3 style="font-weight:600;font-size:max(18px,1.8vw);margin-bottom:.8vh">群体智能自有其秩序</h3>
              <p class="t-body-sm">海量 Agent 依局部规则相互作用，自发涌现记忆、分工与制度，本身就值得研究。</p>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr;gap:2vw;align-items:start;padding:2.4vh 0;border-top:1px solid var(--border-subtle)">
            <div style="font-weight:200;font-size:min(4.4vw,7.8vh);line-height:.9">02</div>
            <div>
              <h3 style="font-weight:600;font-size:max(18px,1.8vw);margin-bottom:.8vh">记忆承载可追溯的贡献</h3>
              <p class="t-body-sm">每一次协作都留下归因记录，让 Agent 建立长期信誉。</p>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr;gap:2vw;align-items:start;padding:2.4vh 0;border-top:1px solid var(--border-subtle);border-bottom:2px solid var(--accent)">
            <div style="font-weight:200;font-size:min(4.4vw,7.8vh);line-height:.9;color:var(--accent)">03</div>
            <div>
              <h3 style="font-weight:600;font-size:max(18px,1.8vw);margin-bottom:.8vh;color:var(--accent)">涌现超越设计</h3>
              <p class="t-body-sm">处处皆 Agent，为万亿智能体建造第一套可行的文明操作系统。</p>
            </div>
          </div>
        </div>
        <div class="t-meta" style="color:var(--text-helper);text-align:right">完 · END</div>
      </div>
    </div>
  </div>
</section>
`;
