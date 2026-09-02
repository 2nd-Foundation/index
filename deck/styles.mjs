export const FONT_CSS = `
  @font-face{font-family:'Alibaba PuHuiTi';src:url('https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaPuHuiTi-3/35-light/AlibabaPuHuiTi-3-35-Light.woff2') format('woff2');font-weight:300;font-style:normal;font-display:swap}
  @font-face{font-family:'Alibaba PuHuiTi';src:url('https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaPuHuiTi-3/55-regular/AlibabaPuHuiTi-3-55-Regular.woff2') format('woff2');font-weight:400;font-style:normal;font-display:swap}
  @font-face{font-family:'Alibaba PuHuiTi';src:url('https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaPuHuiTi-3/85-bold/AlibabaPuHuiTi-3-85-Bold.woff2') format('woff2');font-weight:700;font-style:normal;font-display:swap}
  @font-face{font-family:'Alibaba PuHuiTi';src:url('https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlibabaPuHuiTi-3/95-extra-bold/AlibabaPuHuiTi-3-95-ExtraBold.woff2') format('woff2');font-weight:900;font-style:normal;font-display:swap}
  :root{--plinth:#B84435;--plinth-rgb:184,68,53}
  html,body,button,input,textarea,select,*::before,*::after{font-family:'Alibaba PuHuiTi'!important}
  em,i,cite,var,.em{font-style:normal!important}

`;

export const EDITORIAL_CSS = `
  .slide.editorial-dots{background-color:var(--paper);background-image:radial-gradient(var(--grey-2) .7px,transparent .7px);background-size:14px 14px}
  .editorial-stage{position:relative;flex:1;display:grid;grid-template-columns:1.08fr .92fr;gap:clamp(2.4vw,4vw,5vw);align-items:end;min-height:0;padding-bottom:1vh}
  .editorial-copy{align-self:end;max-width:none;min-width:0;padding-bottom:2vh}
  .editorial-copy .t-body{max-width:min(50ch,48vw)}
  .editorial-copy .lead-xl{font-family:'Alibaba PuHuiTi'!important;font-weight:900;font-size:min(5.2vw,9.2vh);line-height:1.02;letter-spacing:-.04em;color:var(--ink)}
  .editorial-copy .lead-xl .em{color:var(--plinth);font-weight:300;font-style:normal}
  .editorial-visual{position:relative;height:min(56vh,480px);justify-self:end;width:min(38vw,440px);flex-shrink:0}
  .editorial-plinth{position:absolute;top:0;right:0;width:76%;height:70%;background:var(--plinth)}
  .editorial-plinth.sage{background:#8B7D6B}
  .editorial-plinth.ink{background:var(--ink)}
  .editorial-artifact{position:absolute;bottom:0;left:0;width:90%;z-index:2;filter:drop-shadow(0 22px 40px rgba(28,26,24,.14))}
  .editorial-artifact img{width:100%;height:auto;display:block}
  .editorial-visual--bust-stair .bust-staircase{position:absolute;inset:0;z-index:2}
  .editorial-visual--bust-stair .bust-stair{position:absolute;left:0;height:14%;background:linear-gradient(180deg,rgba(235,232,226,.95),rgba(220,214,204,.88));box-shadow:0 10px 28px rgba(28,26,24,.08)}
  .editorial-visual--bust-stair .bust-stair:nth-child(1){bottom:0;width:46%}
  .editorial-visual--bust-stair .bust-stair:nth-child(2){bottom:22%;width:62%}
  .editorial-visual--bust-stair .bust-stair:nth-child(3){bottom:44%;width:78%}
  .editorial-visual--bust-stair .bust-step{position:absolute;display:block;height:auto;object-fit:contain;filter:drop-shadow(0 18px 34px rgba(28,26,24,.14))}
  .editorial-visual--bust-stair .bust-step--1{bottom:8%;left:-2%;width:54%;z-index:3}
  .editorial-visual--bust-stair .bust-step--2{bottom:30%;left:18%;width:46%;z-index:4;opacity:.97}
  .editorial-visual--bust-stair .bust-step--3{bottom:52%;left:36%;width:38%;z-index:5;opacity:.94}
  .editorial-cap{margin-top:1.6vh;font-family:var(--mono);font-size:14px;color:var(--text-helper);line-height:1.5;max-width:none}
  .slide.editorial-bench-slide .canvas-card{position:relative;overflow:hidden}
  .slide.editorial-bench-slide .editorial-stage--bench{grid-template-columns:1fr;width:50%;max-width:50%}
  .slide.editorial-bench-slide .editorial-copy{width:100%;max-width:100%}
  .slide.editorial-bench-slide .editorial-copy .t-body{max-width:min(52ch,100%)}
  .slide.editorial-bench-slide .canvas-card>.bench-viz--bg{z-index:1}
  .slide.rsi-evo-slide .canvas-card{position:relative;overflow:hidden}
  .slide.rsi-evo-slide .canvas-card>.bench-viz--bg{z-index:1}
  .slide.rsi-evo-slide .mgm-evo-viz.bench-viz--bg{left:32%;width:68%;top:12vh;height:min(74vh,calc(100vh - 14vh - var(--nav-safe-bottom,8vh)));opacity:.92}
  .slide.rsi-evo-slide .rsi-evo-foreground{position:relative;z-index:2;width:min(46%,500px);display:flex;flex-direction:column;flex:1;min-height:0;padding-bottom:1vh}
  .slide.rsi-evo-slide .loop-diagram--steps{grid-template-columns:1fr;margin-top:1vh;flex:1;align-content:start}
  .slide.rsi-evo-slide .mgm-evo-stage{flex:1;min-height:0;position:relative;border-radius:0}
  .slide.rsi-evo-slide .mgm-evo-canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
  .bench-swatch.evo-clonal{background:rgba(28,26,24,.22);border-radius:50%;width:8px;height:8px}
  .bench-swatch.evo-reaction{background:#B84435;border-radius:50%;width:8px;height:8px}
  .bench-swatch.evo-hybrid{background:#5A9A6E;border-radius:50%;width:8px;height:8px}
  .bench-viz--bg{position:absolute;top:10vh;left:25%;width:75%;right:auto;height:min(72vh,calc(100vh - 12vh - var(--nav-safe-bottom,8vh)));transform:none;display:flex;flex-direction:column;justify-content:flex-start;gap:1vh;padding:0 2vw 0 1vw;pointer-events:none;background:none;border:none;backdrop-filter:none}
  .bench-viz-head{display:flex;justify-content:center;align-items:center;gap:1vw;flex:0 0 auto;padding-bottom:.6vh}
  .bench-viz-tag{font-family:var(--mono);font-size:12px;letter-spacing:.2em;color:var(--text-helper);opacity:.7}
  .bench-viz-legend{display:flex;align-items:center;justify-content:center;gap:.65em;font-family:var(--mono);font-size:11px;letter-spacing:.06em;color:var(--text-helper);opacity:.65}
  .bench-swatch{display:inline-block;width:10px;height:10px;margin-right:.35em;vertical-align:middle}
  .bench-swatch.direct{border:1.5px solid rgba(28,26,24,.35);border-radius:50%;background:transparent;width:9px;height:9px}
  .bench-swatch.prior{background:rgba(28,26,24,.22);border-radius:50%;width:8px;height:8px}
  .bench-swatch.ours{background:var(--accent);border-radius:50%;width:8px;height:8px;margin-left:.6em}
  .bench-slope-viz{gap:0;justify-content:flex-end}
  .bench-slope-viz .bench-slope-grid{flex:0 1 auto;align-items:end}
  .bench-slope-viz .bench-viz-head{padding-top:.35vh;padding-bottom:0;margin-top:0}
  .bench-slope-viz .bench-viz-foot{text-align:right;margin-top:.25vh;padding:0}
  .bench-slope-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(1.2vw,2.2vw,2.8vw);flex:1;min-height:0;align-items:stretch;width:100%;max-width:none;margin:0}
  .slope-panel{display:flex;flex-direction:column;gap:.1vh;min-width:0;min-height:0;background:transparent;border:none;padding:0}
  .slope-panel-head{display:flex;align-items:center;justify-content:center;flex:0 0 auto;padding:0;margin-bottom:.1vh}
  .slope-panel-title{font-family:var(--sans);font-weight:600;font-size:max(11px,.68vw);letter-spacing:.02em;color:var(--text-secondary);text-align:center;opacity:.82}
  .slope-duo{display:grid;grid-template-columns:1fr 1fr;gap:clamp(.5vw,.9vw,1.1vw);flex:0 0 auto;min-height:0;align-items:start;align-content:start}
  .slope-mini{display:flex;flex-direction:column;gap:0;min-width:0;align-items:stretch;justify-content:flex-start}
  .slope-model-tag{font-family:var(--mono);font-size:max(8px,.52vw);letter-spacing:.1em;color:var(--text-helper);opacity:.62;text-align:right;flex:0 0 auto;margin-top:.05vh;padding-right:.15em;line-height:1.1}
  .slope-svg{flex:0 0 auto;width:100%;height:auto;display:block;overflow:visible}
  .slope-rail{stroke:rgba(28,26,24,.07);stroke-width:.25}
  .slope-line{stroke:rgba(28,26,24,.1);stroke-width:.45;fill:none}
  .slope-line.ours{stroke:rgba(28,26,24,.16);stroke-width:.5}
  .slope-ref{stroke:var(--accent);stroke-width:.45;stroke-dasharray:3 3;opacity:.42}
  .slope-dot.direct{fill:var(--paper);stroke:rgba(28,26,24,.28);stroke-width:.9}
  .slope-dot.right{fill:rgba(28,26,24,.22)}
  .slope-dot.right.ours{fill:var(--accent);stroke:none;opacity:.75}
  .bench-viz-foot{flex:0 0 auto;margin-top:.6vh;font-family:var(--mono);font-size:max(12px,.72vw);letter-spacing:.04em;color:var(--text-helper);line-height:1.5;text-align:center;opacity:.72;padding:0 1vw}
  .bench-wins{font-weight:700;color:var(--plinth);font-size:15px;letter-spacing:.04em;opacity:1}
  .slide.cover-swarm{position:relative;padding:0!important;background:var(--ink);overflow:hidden}
  .slide.cover-swarm .canvas-card.cover-overlay{background:transparent;height:100%;padding:5.6vh 5vw 4.4vh}
  .slide.cover-swarm .swarm-bg-full{position:absolute;inset:0;width:100%;height:100%;z-index:0;display:block}
  .slide.cover-swarm .cover-overlay>*:not(.swarm-bg-full){position:relative;z-index:1}
  .slide.cover-swarm .chrome-min{color:rgba(255,255,255,.58);letter-spacing:.04em}
  .slide.cover-swarm .chrome-min .l{font-weight:400;opacity:.92}
  .slide.cover-swarm .chrome-min .r{font-weight:300;opacity:.72;letter-spacing:.08em}
  .cover-hero-center{flex:1;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;width:100%;min-height:0}
  .cover-hero-inner{width:100%;max-width:none}
  .cover-title-block{display:flex;flex-direction:column;align-items:flex-start;gap:0;width:100%;margin:0;font-family:'Alibaba PuHuiTi'!important;letter-spacing:-.04em}
  .cover-title-en{display:flex;flex-direction:column;align-items:flex-start;gap:0;line-height:1;width:100%}
  .cover-title-rsi,.cover-title-as{display:block;font-weight:900;font-size:clamp(28px,min(4.6vw,7.8vh),72px);line-height:.98;color:#fff;white-space:nowrap}
  .cover-title-as{color:var(--accent-bright);margin-top:-.06em}
  .cover-title-zh{font-weight:700;font-size:clamp(22px,min(2.8vw,4.8vh),48px);line-height:1.12;color:rgba(255,255,255,.92);margin-top:.72em}
  .cover-lead{margin:8vh 0 0;padding-top:2.4vh;border-top:1px solid rgba(255,255,255,.22);max-width:none;width:100%;white-space:nowrap;font-weight:300;font-size:max(16px,1.05vw);line-height:1.65;color:rgba(255,255,255,.78);letter-spacing:.01em}
  .slide .h-statement{max-width:none!important;line-height:1.02;letter-spacing:-.04em;display:flex;flex-direction:column;align-items:flex-start;gap:0}
  .slide .h-statement .stmt-line{display:block;line-height:1.02}
  .slide.dark .h-statement+.t-body{margin-top:2.4vh!important;margin-bottom:auto;max-width:min(52ch,46vw)}
  .slide .h-xl-zh{max-width:none}
  .slide.dark .canvas-card{display:flex;flex-direction:column;min-height:0}
  .slide.dark .canvas-card .policy-quotes{position:absolute!important;top:3vh;right:-.5vw;width:min(56vw,760px);height:min(70vh,640px);z-index:2;pointer-events:none}
  .policy-quote-float{position:absolute;width:max-content;max-width:min(36vw,400px)}
  .policy-quote-float--a{top:0%;right:2%}
  .policy-quote-float--b{top:30%;right:40%}
  .policy-quote-float--c{top:58%;right:0%}
  .policy-quote-float--d{top:84%;right:36%}
  .policy-quote{margin:0;padding:1.8vh 1.4vw;max-width:min(36vw,400px);border-left:2px solid rgba(212,120,92,.5);background:rgba(255,255,255,.07);backdrop-filter:blur(8px);box-shadow:0 18px 40px rgba(0,0,0,.22)}
  .policy-quote-float--a .policy-quote{transform:rotate(-1.4deg)}
  .policy-quote-float--b .policy-quote{transform:rotate(2deg)}
  .policy-quote-float--c .policy-quote{transform:rotate(-0.8deg)}
  .policy-quote-float--d .policy-quote{transform:rotate(1.3deg)}
  .policy-quote p{margin:0;font-size:max(16px,1.12vw);line-height:1.58;font-weight:300;color:rgba(255,255,255,.86);letter-spacing:.015em}
  .policy-quote cite{display:block;margin-top:.8vh;font-family:var(--mono);font-size:max(11px,.68vw);letter-spacing:.08em;color:rgba(255,255,255,.46);font-style:normal}
  .stack-row{margin-top:2vh!important;gap:clamp(.8vw,1.2vw,1.6vw)!important;flex:1;align-items:stretch}
  .stack-block{padding:2.2vh 1.4vw;display:flex;flex-direction:column}
  .stack-block .layer-desc{font-size:max(15px,.88vw);line-height:1.5;margin-top:auto}
  .loop-diagram{display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(2.4vw,4vw,5vw);flex:1;align-items:center;margin-top:1vh}
  .loop-steps{display:flex;flex-direction:column;gap:2.4vh}
  .loop-step{display:grid;grid-template-columns:auto 1fr;gap:1.2vw;align-items:baseline}
  .loop-step .nb{font-family:var(--mono);font-size:14px;color:var(--accent);letter-spacing:.12em}
  .loop-step .lbl{font-size:max(17px,1.05vw);font-weight:400;line-height:1.45;color:var(--text-primary)}
  .loop-svg-wrap{position:relative;display:flex;align-items:center;justify-content:center;min-height:min(34vh,320px)}
  .loop-svg{width:min(100%,280px);height:auto;color:var(--ink)}
  .loop-center{position:absolute;font-family:var(--sans);font-weight:200;font-size:min(5vw,8vh);letter-spacing:-.04em}
  .four-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(.8vw,1.2vw,1.4vw);flex:1;align-items:stretch}
  .fc-col{display:flex;flex-direction:column;min-width:0}
  .team-portrait{width:100%;aspect-ratio:4/5;object-fit:cover;filter:grayscale(.12);background:var(--grey-1)}
  .manifesto-top{display:grid;grid-template-columns:1.12fr .88fr;gap:clamp(2.4vw,4vw,5vw);align-items:start;margin-top:2vh;flex:1}
  .manifesto-top>.t-body{max-width:min(44ch,42vw)!important}
  .ink-banner-full{margin:3vh -5vw 0;padding:3.5vh 5vw;min-height:16vh}
  canvas.swarm-bg-full{position:absolute;inset:0;width:100%;height:100%;z-index:0;display:block;pointer-events:none}
  .slide.swarm-dark-half{position:relative;overflow:hidden}
  .slide.swarm-dark-half .swarm-bg-full{opacity:1}
  canvas.bg{opacity:.2!important}
  body.dark-bg canvas.bg{opacity:.12!important}
  .h-hero,.h-xl,.h-statement,.h-xl-zh{font-family:'Alibaba PuHuiTi'!important}
  .split-half .half .t-body-sm{max-width:36ch}
  @media (max-width:1100px){
    .cover-title-rsi,.cover-title-as{font-size:clamp(24px,4.2vw,56px)}
    .four-cards{grid-template-columns:repeat(2,1fr)}
    .team-portrait{aspect-ratio:3/4}
  }
  @media (max-width:900px){
    .cover-title-rsi,.cover-title-as,.cover-lead{white-space:normal}
    .bench-viz--bg{left:0;width:100%;height:min(68vh,58vh);top:12vh;transform:none;opacity:.55;padding:0 4vw}
    .slide.rsi-evo-slide .mgm-evo-viz.bench-viz--bg{left:0;width:100%;height:min(58vh,52vh);top:38vh;opacity:.55}
    .slide.rsi-evo-slide .rsi-evo-foreground{width:100%;max-width:100%}
    .bench-slope-grid{max-width:none;margin-left:0;grid-template-columns:1fr}
    .editorial-stage{grid-template-columns:1fr;gap:3vh;align-items:start}
    .editorial-visual{width:100%;height:min(40vh,360px);justify-self:stretch}
    .editorial-copy{padding-bottom:0}
    .manifesto-top{grid-template-columns:1fr}
    .stack-row{grid-template-columns:1fr}
    .slide.dark .canvas-card .policy-quotes{position:static!important;width:100%;height:auto;margin:1.6vh 0 0;opacity:.78}
    .policy-quote-float{position:relative!important;top:auto!important;right:auto!important;width:100%;max-width:100%;margin-bottom:1.2vh}
    .policy-quote-float .policy-quote{transform:none!important;max-width:100%}
  }

`;
