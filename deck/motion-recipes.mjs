export const MOTION_PATCH = `
  function fadeUp(el,y,delay,dur){
    if(!el) return;
    el.style.opacity='0';
    el.style.transform='translateY('+(y??16)+'px)';
    animate(el,{opacity:[0,1],y:[y??16,0]},{duration:dur??.58,delay:delay??0,easing:EASE_ENTRY_EXP});
  }
  function fadeX(el,x,delay,dur){
    if(!el) return;
    el.style.opacity='0';
    el.style.transform='translateX('+(x??16)+'px)';
    animate(el,{opacity:[0,1],x:[x??16,0]},{duration:dur??.58,delay:delay??0,easing:EASE_ENTRY_EXP});
  }
  function animKids(parent,sel,base,step){
    if(!parent) return;
    const kids=sel?[...parent.querySelectorAll(sel)]:[...parent.children];
    kids.forEach((el,i)=>fadeUp(el,16,base+i*step));
  }
  function rCoverSwarm(slide){
    const chrome=slide.querySelector('.chrome-min');
    if(chrome){chrome.style.opacity='0';animate(chrome,{opacity:[0,1]},{duration:.3,easing:EASE_PROD})}
    const title=slide.querySelector('[data-anim="title"]');
    if(title){
      [...title.querySelectorAll('.cover-title-rsi,.cover-title-as,.cover-title-zh,.cover-title-en')].forEach((el,i)=>{
        fadeUp(el,18,.18+i*.12,.62);
      });
    }
    fadeUp(slide.querySelector('[data-anim="lead"]'),12,.62,.58);
  }
  function rBenchViz(viz,delay){
    if(!viz) return;
    const d=delay??.5;
    viz.style.opacity='0';
    viz.style.transform='translateY(10px)';
    animate(viz,{opacity:[0,1],y:[10,0]},{duration:.5,delay:d,easing:EASE_ENTRY_EXP});
    [...viz.querySelectorAll('.slope-panel')].forEach((panel,i)=>{
      panel.style.opacity='0';
      panel.style.transform='translateY(8px)';
      animate(panel,{opacity:[0,1],y:[8,0]},{duration:.42,delay:d+.1+i*.1,easing:EASE_PROD});
    });
    [...viz.querySelectorAll('.slope-line')].forEach((line,i)=>{
      const len=typeof line.getTotalLength==='function'?line.getTotalLength():80;
      line.style.strokeDasharray=String(len);
      line.style.strokeDashoffset=String(len);
      animate(line,{strokeDashoffset:[len,0]},{duration:.55,delay:d+.32+i*.025,easing:EASE_ENTRY_EXP});
    });
    [...viz.querySelectorAll('.slope-dot,.slope-ref')].forEach((el,i)=>{
      el.style.opacity='0';
      animate(el,{opacity:[0,1]},{duration:.28,delay:d+.55+i*.012,easing:EASE_PROD});
    });
    const foot=viz.querySelector('.bench-viz-foot');
    if(foot){
      foot.style.opacity='0';
      animate(foot,{opacity:[0,1]},{duration:.4,delay:d+.95,easing:EASE_PROD});
    }
  }
  function rEditorialStage(slide){
    const chrome=slide.querySelector('.chrome-min');
    if(chrome){chrome.style.opacity='0';animate(chrome,{opacity:[0,1]},{duration:.28,easing:EASE_PROD})}
    const copyKids=slide.classList.contains('editorial-bench-slide')?'.t-meta,.lead-xl,.t-body':'.t-meta,.lead-xl,.t-body,.editorial-cap';
    animKids(slide.querySelector('[data-anim="copy"]'),copyKids,.2,.11);
    if(slide.classList.contains('editorial-bench-slide')){
      rBenchViz(slide.querySelector('.bench-viz'),.35);
      return;
    }
    const visual=slide.querySelector('[data-anim="visual"]');
    if(visual){
      fadeX(visual.querySelector('.editorial-plinth'),18,.42,.62);
      rBenchViz(slide.querySelector('.bench-viz'),.35);
      const artifact=visual.querySelector('.editorial-artifact');
      if(artifact){
        artifact.style.opacity='0';
        artifact.style.transform='translateY(22px) scale(.96)';
        animate(artifact,{opacity:[0,1],y:[22,0],scale:[.96,1]},{duration:.72,delay:.58,easing:EASE_ENTRY_EXP});
      }
      const staircase=visual.querySelector('.bust-staircase');
      if(staircase){
        [...staircase.querySelectorAll('.bust-stair')].forEach((step,i)=>{
          step.style.opacity='0';
          step.style.transform='translateX(12px)';
          animate(step,{opacity:[0,1],x:[12,0]},{duration:.5,delay:.46+i*.1,easing:EASE_PROD});
        });
        [...staircase.querySelectorAll('.bust-step')].forEach((bust,i)=>{
          bust.style.opacity='0';
          bust.style.transform='translateY(18px) scale(.94)';
          animate(bust,{opacity:[0,i===0?1:i===1?.97:.94],y:[18,0],scale:[.94,1]},{duration:.68,delay:.58+i*.14,easing:EASE_ENTRY_EXP});
        });
      }
    }
  }
  function rMatrixStatement(slide){
    if(slide.querySelector('.editorial-stage')) return rEditorialStage(slide);
    const chrome=slide.querySelector('.chrome-min');
    if(chrome){chrome.style.opacity='0';animate(chrome,{opacity:[0,1]},{duration:.28,easing:EASE_PROD})}
    fadeUp(slide.querySelector('[data-anim="stmt"]'),24,.15,.75);
    fadeUp(slide.querySelector('[data-anim="note"]'),14,.55,.6);
    const quoteDrift=[[14,18],[-10,22],[16,14],[-8,20]];
    [...slide.querySelectorAll('[data-anim="quote"]')].forEach((el,i)=>{
      const [x,y]=quoteDrift[i]||[12,18];
      el.style.opacity='0';
      el.style.transform='translate('+x+'px,'+y+'px)';
      animate(el,{opacity:[0,1],x:[x,0],y:[y,0]},{duration:.62,delay:.2+i*.17,easing:EASE_ENTRY_EXP});
    });
    slide.querySelectorAll('.ring-mat,.dot-mat').forEach((el,i)=>{
      el.style.opacity='0';
      el.style.transform='scale(.92)';
      animate(el,{opacity:[0,1],scale:[.92,1]},{duration:.8,delay:.2+i*.1,easing:EASE_ENTRY_EXP});
    });
  }
  function rSubStack(slide){
    animKids(slide.querySelector('[data-anim="head"]'),null,.15,.1);
    [...slide.querySelectorAll('.stack-block')].forEach((block,i)=>fadeUp(block,26,.35+i*.14,.6));
  }
  function rLoopDiagram(slide){
    animKids(slide.querySelector('[data-anim="head"]'),null,.15,.1);
    rBenchViz(slide.querySelector('.mgm-evo-viz'),.35);
    const loop=slide.querySelector('[data-anim="loop"]');
    if(loop){
      loop.querySelectorAll('.loop-step').forEach((step,i)=>fadeX(step,-16,.48+i*.12,.5));
    }
  }
  function rFourCardsDeck(slide){
    const head=slide.querySelector('[data-anim="head"]');
    if(head){
      const rule=head.querySelector('.rule');
      if(rule){rule.style.transformOrigin='left center';rule.style.opacity='0';rule.style.transform='scaleX(0)';animate(rule,{opacity:[0,1],scaleX:[0,1]},{duration:.45,delay:.1,easing:EASE_ENTRY_EXP})}
      animKids(head,'.h-xl-zh,.t-body',.34,.1);
    }
    const grid=slide.querySelector('[data-anim="cards"]');
    if(grid) [...grid.children].forEach((card,i)=>fadeUp(card,20,.64+i*.11,.55));
  }
  function rManifestoDeck(slide){
    animKids(slide.querySelector('[data-anim="top"]'),'.t-meta,.h-xl-zh,.t-body',.18,.11);
    fadeUp(slide.querySelector('[data-anim="banner"]'),30,.62,.72);
  }
  function rClosingSplit(slide){
    slide.querySelectorAll('.chrome-min').forEach((el,i)=>{el.style.opacity='0';animate(el,{opacity:[0,1]},{duration:.28,delay:i*.06,easing:EASE_PROD})});
    animKids(slide.querySelector('[data-anim="manifesto"]'),null,.2,.13);
    const rules=slide.querySelector('[data-anim="rules"]');
    if(rules) [...rules.children].forEach((row,i)=>fadeX(row,14,.5+i*.11,.5));
    fadeUp(slide.querySelector('[data-anim="signature"]'),10,.95,.5);
  }
  function rSplitDeck(slide){
    if(slide.querySelector('.editorial-stage')) return rEditorialStage(slide);
    return rClosingSplit(slide);
  }
  RECIPES.hero=rCoverSwarm;
  RECIPES['matrix-statement']=rMatrixStatement;
  RECIPES['split-statement']=rSplitDeck;
  RECIPES['sub-stack']=rSubStack;
  RECIPES['grid-reveal']=rEditorialStage;
  RECIPES['loop-form']=rLoopDiagram;
  RECIPES['four-cards']=rFourCardsDeck;
  RECIPES.manifesto=rManifestoDeck;

  function playSlideDeck(i){
    const slide=slides[i];
    if(!slide) return;
    lastIdx=i;
    if(window.__lowPowerMode){revealStatic(slide);return;}
    try{
      for(const a of document.getAnimations()){
        const t=a.effect?.target;
        if(t&&slide.contains(t)) a.cancel();
      }
    }catch(_){}
    resetAnims(slide);
    slide.querySelectorAll('[data-anim]').forEach(el=>{
      el.style.opacity='1';
      el.style.transform='none';
    });
    const recipe=slide.dataset.animate;
    const fn=RECIPES[recipe];
    const run=()=>{
      if(fn){fn(slide,[...slide.querySelectorAll('[data-anim]')]);return;}
      const all=[...slide.querySelectorAll('[data-anim]')];
      all.forEach(el=>{
        el.style.opacity='0';
        el.style.transform='translateY(12px)';
      });
      if(all.length){
        animate(all,{opacity:[0,1],y:[12,0]},{duration:.6,delay:j=>j*.08,easing:EASE_ENTRY_EXP});
      }
    };
    requestAnimationFrame(()=>requestAnimationFrame(run));
  }

`;
