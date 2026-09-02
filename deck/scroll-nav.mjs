export const SCROLL_NAV_REPLACEMENT = `/* =============== 全屏滚动导航 =============== */
const deck=document.getElementById('deck');
const slides=[...deck.querySelectorAll('.slide')];
const nav=document.getElementById('nav');
let idx=0,total=slides.length,lock=false;

slides.forEach((s,i)=>{
  const b=document.createElement('button');
  b.className='dot';b.dataset.i=i;b.setAttribute('aria-label','Page '+(i+1));
  b.onclick=()=>go(i);
  nav.appendChild(b);
});

function setSlideChrome(i){
  nav.querySelectorAll('.dot').forEach((d,j)=>d.classList.toggle('active',j===i));
  const el=slides[i];
  const isDark=el.classList.contains('dark')||el.classList.contains('accent');
  document.body.classList.toggle('dark-bg',isDark);
  darkMode=isDark;
}

function playSlideAnim(i){
  clearTimeout(window.__slideAnimTO);
  window.__slideAnimTO=setTimeout(()=>{
    if(window.__playSlide)window.__playSlide(i);
  },420);
}

function go(n){
  if(lock)return;
  const next=Math.max(0,Math.min(total-1,n));
  if(next===idx)return;
  lock=true;
  idx=next;
  window.__currentSlideIndex=idx;
  window.__pendingSlide=idx;
  setSlideChrome(idx);
  slides[idx].scrollIntoView({behavior:'smooth',block:'start'});
  const unlock=()=>{playSlideAnim(idx);lock=false};
  setTimeout(unlock,720);
}

addEventListener('keydown',e=>{
  if(e.key&&e.key.toLowerCase()==='b'&&!e.metaKey&&!e.ctrlKey&&!e.altKey){
    e.preventDefault();
    window.__setLowPowerMode(!window.__lowPowerMode);
    return;
  }
  if(e.key==='ArrowDown'||e.key==='PageDown'){
    e.preventDefault();
    go(idx+1);
    return;
  }
  if(e.key==='ArrowUp'||e.key==='PageUp'){
    e.preventDefault();
    go(idx-1);
    return;
  }
  if(e.key==='Home'){e.preventDefault();go(0);}
  if(e.key==='End'){e.preventDefault();go(total-1);}
});

let wheelTO=null,wheelAcc=0;
deck.addEventListener('wheel',e=>{
  e.preventDefault();
  if(lock)return;
  wheelAcc+=e.deltaY;
  if(Math.abs(wheelAcc)>40){
    go(idx+(wheelAcc>0?1:-1));
    wheelAcc=0;
  }
  clearTimeout(wheelTO);
  wheelTO=setTimeout(()=>wheelAcc=0,160);
},{passive:false});

let ty=0;
addEventListener('touchstart',e=>{ty=e.touches[0].clientY},{passive:true});
addEventListener('touchend',e=>{
  const dy=e.changedTouches[0].clientY-ty;
  if(Math.abs(dy)>50) go(idx+(dy<0?1:-1));
},{passive:true});

let scrollSyncTO=null;
deck.addEventListener('scroll',()=>{
  if(lock)return;
  clearTimeout(scrollSyncTO);
  scrollSyncTO=setTimeout(()=>{
    const mid=deck.scrollTop+deck.clientHeight*.35;
    let best=idx,bestDist=Infinity;
    slides.forEach((s,i)=>{
      const d=Math.abs(s.offsetTop-mid);
      if(d<bestDist){bestDist=d;best=i;}
    });
    if(best!==idx){
      idx=best;
      window.__currentSlideIndex=idx;
      window.__pendingSlide=idx;
      setSlideChrome(idx);
      playSlideAnim(idx);
    }
  },90);
},{passive:true});

const initialSlideParam=new URLSearchParams(location.search).get('slide');
const initialSlide=initialSlideParam?Number(initialSlideParam)-1:0;
idx=Number.isFinite(initialSlide)?Math.max(0,Math.min(total-1,initialSlide)):0;
slides[idx].scrollIntoView({behavior:'auto',block:'start'});
setSlideChrome(idx);
window.__currentSlideIndex=idx;
window.__pendingSlide=idx;`;
