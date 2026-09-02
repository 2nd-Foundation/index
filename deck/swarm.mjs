export const SWARM_SCRIPT = `
<script>
/* Bird swarm — screen-space boids, mouse reactive, seed 42 */
(function(){
  /* ── 可调超参（改这里后运行 node build-deck.mjs）── */
  const SWARM_CFG={
    seed:42,
    countCover:112, countClosing:88,
    sep:.085, ali:.045, coh:.018,
    perc:98, sepDist:36,
    mouseR:95, mouseF:.12, mouseMs:90,
    maxSpd:14.5, minSpd:5.8, maxF:.24, drag:.994,
    size:2.65, shape:1.24,
    alphaMax:.2, grayMin:22, grayRange:38,
    clusterCount:6, clusterRadius:138,
    spawnPadMin:.85, spawnPadExtra:.5, spawnBuf:.14,
    spawnSideW:[.12,.36,.36,.16], spawnAlongRB:.62, spawnVelRB:.18,
    angLerp:.1,
    breathSizeAmp:.24, breathGrayAmp:14, breathAlphaAmp:.07,
    breathSpdMin:.35, breathSpdMax:1.15,
    warmupSec:15, warmupFps:60, warmupChunk:120,
    dprMax:1.5
  };
  function rng(seed){let s=seed;return()=>{s=(s*16807)%2147483647;return(s-1)/2147483646}}
  function lerpAngle(a,b,t){
    let d=((b-a+Math.PI*3)%(Math.PI*2))-Math.PI;
    return a+d*t;
  }
  function pickWeighted(r,weights){
    const t=r(), s=weights.reduce((a,b)=>a+b,0);
    let c=0;
    for(let i=0;i<weights.length;i++){c+=weights[i]/s;if(t<=c)return i}
    return weights.length-1;
  }
  function alongRB(r,bias){
    const t=Math.min(1,.05+r()*(.35+r()*(.35+.25*bias)));
    return t;
  }
  const mouse={x:-1e4,y:-1e4,t:0};
  addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY;mouse.t=performance.now()},{passive:true});
  addEventListener('touchmove',e=>{const t=e.touches[0];if(t){mouse.x=t.clientX;mouse.y=t.clientY;mouse.t=performance.now()}},{passive:true});

  class Swarm{
    constructor(canvas,seed,count){
      this.c=canvas; this.ctx=canvas.getContext('2d');
      this.dark=canvas.dataset.variant==='dark';
      this.r=rng(seed); this.w=0; this.h=0; this.vis=true;
      this.P={count,...SWARM_CFG};
      this.shape=SWARM_CFG.shape;
      this.birds=[]; this.clusters=[]; this.warmed=false;
      this.c.style.opacity='0';
      this.resize(); this.reset();
      new IntersectionObserver(es=>{this.vis=es[0]?.isIntersecting!==false},{threshold:0}).observe(canvas);
    }
    birdExtent(){
      return 12*SWARM_CFG.size*SWARM_CFG.shape+14;
    }
    spawnMargin(){
      const pad=Math.max(this.w,this.h);
      const spread=SWARM_CFG.clusterRadius*1.7;
      return spread+this.birdExtent()+Math.max(96,pad*SWARM_CFG.spawnBuf);
    }
    inViewport(x,y,margin){
      const {w,h}=this;
      return x>=-margin&&x<=w+margin&&y>=-margin&&y<=h+margin;
    }
    buildClusters(w,h){
      const r=this.r, pad=Math.max(w,h), n=SWARM_CFG.clusterCount;
      const spread=SWARM_CFG.clusterRadius*1.7;
      const ext=this.birdExtent();
      const buf=Math.max(96,pad*SWARM_CFG.spawnBuf);
      const laneMin=spread+ext+buf;
      const rb=SWARM_CFG.spawnAlongRB;
      this.clusters=[];
      for(let i=0;i<n;i++){
        const side=pickWeighted(r,SWARM_CFG.spawnSideW);
        const along=alongRB(r,rb);
        const lane=Math.max(laneMin,(SWARM_CFG.spawnPadMin+r()*SWARM_CFG.spawnPadExtra)*pad);
        let cx,cy;
        if(side===0){cx=along*w;cy=-lane}
        else if(side===1){cx=w+lane;cy=along*h}
        else if(side===2){cx=along*w;cy=h+lane}
        else{cx=-lane;cy=along*h}
        this.clusters.push({cx,cy,rad:SWARM_CFG.clusterRadius*(.65+r()*1.05),side,lane});
      }
    }
    spawnBird(clusterIdx){
      const r=this.r, {w,h}=this;
      const ext=this.birdExtent();
      const cl=this.clusters[clusterIdx%this.clusters.length];
      const lane=cl.lane, spread=cl.rad;
      const j=spread*.22*SWARM_CFG.spawnAlongRB;
      let x,y;
      if(cl.side===0){
        x=cl.cx+(r()-.5)*spread*1.5+j*r();
        y=-lane-spread*(.25+r()*.75)-j*r()*.35;
      }else if(cl.side===1){
        x=w+lane+spread*(.25+r()*.75)+j*r()*.25;
        y=cl.cy+(r()-.5)*spread*1.5+j*r();
      }else if(cl.side===2){
        x=cl.cx+(r()-.5)*spread*1.5+j*r();
        y=h+lane+spread*(.25+r()*.75)+j*r()*.25;
      }else{
        x=-lane-spread*(.25+r()*.75);
        y=cl.cy+(r()-.5)*spread*1.5+j*r();
      }
      if(this.inViewport(x,y,ext)){
        if(cl.side===0)y=-lane-spread;
        else if(cl.side===1)x=w+lane+spread;
        else if(cl.side===2)y=h+lane+spread;
        else x=-lane-spread;
      }
      const bias=SWARM_CFG.spawnVelRB;
      const va=Math.atan2(bias*.55+(r()-.5)*1.35,bias*.75+(r()-.5)*1.35);
      const sp=(.78+r()*.42)*this.P.maxSpd;
      return{x,y,vx:Math.cos(va)*sp,vy:Math.sin(va)*sp,ang:va};
    }
    reset(){
      const {w,h,r}=this; this.birds=[];
      this.buildClusters(w,h);
      const per=Math.ceil(this.P.count/this.clusters.length);
      let idx=0;
      for(let c=0;c<this.clusters.length;c++){
        const n=c<this.clusters.length-1?per:this.P.count-idx;
        for(let j=0;j<n;j++,idx++){
          const alpha=r()*SWARM_CFG.alphaMax, gray=SWARM_CFG.grayMin+(r()*SWARM_CFG.grayRange|0);
          const sp=this.spawnBird(c);
          const spd=SWARM_CFG.breathSpdMin+r()*(SWARM_CFG.breathSpdMax-SWARM_CFG.breathSpdMin);
          this.birds.push({
            x:sp.x, y:sp.y, vx:sp.vx, vy:sp.vy, ang:sp.ang,
            baseAlpha:alpha, baseGray:gray, baseScale:(.95+r()*.85)*this.P.size,
            phS:r()*Math.PI*2, phG:r()*Math.PI*2, phA:r()*Math.PI*2,
            spdS:spd*(.85+r()*.3), spdG:spd*(.7+r()*.45), spdA:spd*(.6+r()*.5)
          });
        }
      }
    }
    resize(){
      const box=this.c.getBoundingClientRect();
      const w=Math.max(box.width||1,1), h=Math.max(box.height||1,1);
      const dpr=Math.min(devicePixelRatio||1,SWARM_CFG.dprMax);
      this.c.width=Math.round(w*dpr); this.c.height=Math.round(h*dpr);
      this.ctx.setTransform(dpr,0,0,dpr,0,0);
      this.w=w; this.h=h;
      if(this.birds.length) this.reset();
    }
    localMouse(){
      const r=this.c.getBoundingClientRect();
      return {x:mouse.x-r.left,y:mouse.y-r.top,ok:mouse.x>r.left-20&&mouse.x<r.right+20&&mouse.y>r.top-20&&mouse.y<r.bottom+20};
    }
    steer(ax,ay,b){
      const m=Math.hypot(ax,ay)||1e-6;
      const dx=ax/m*this.P.maxSpd-b.vx, dy=ay/m*this.P.maxSpd-b.vy;
      const sm=Math.hypot(dx,dy), cap=this.P.maxSpd*this.P.maxF;
      return sm>cap?[dx/sm*cap,dy/sm*cap]:[dx,dy];
    }
    flockForces(b,all){
      const {perc,sep,ali,coh,mouseR,mouseF}=this.P, pr2=perc*perc;
      let sx=0,sy=0,ax=0,ay=0,cx=0,cy=0,n=0;
      for(const o of all){
        if(o===b) continue;
        const dx=o.x-b.x, dy=o.y-b.y, d2=dx*dx+dy*dy;
        if(d2>pr2||!d2) continue;
        const d=Math.sqrt(d2);
        if(d<SWARM_CFG.sepDist){const w=1/(d*d); sx-=dx*w; sy-=dy*w}
        ax+=o.vx; ay+=o.vy; cx+=o.x; cy+=o.y; n++;
      }
      let fx=0,fy=0;
      if(n){ax/=n; ay/=n; cx/=n; cy/=n}
      const [s1,s2]=this.steer(sx,sy,b); fx+=s1*sep; fy+=s2*sep;
      const [a1,a2]=this.steer(ax,ay,b); fx+=a1*ali; fy+=a2*ali;
      const [c1,c2]=this.steer(cx-b.x,cy-b.y,b); fx+=c1*coh; fy+=c2*coh;
      const m=this.localMouse();
      const mouseLive=performance.now()-mouse.t<SWARM_CFG.mouseMs;
      if(m.ok&&mouseLive){
        const dx=b.x-m.x, dy=b.y-m.y, d=Math.hypot(dx,dy)||1;
        if(d<mouseR){
          const t=1-d/mouseR, push=mouseF*t*t;
          const [mx,my]=this.steer(dx/d*push*this.P.maxSpd,dy/d*push*this.P.maxSpd,b);
          fx+=mx; fy+=my;
        }
      }
      return[fx,fy];
    }
    integrate(b,fx,fy){
      b.vx+=fx; b.vy+=fy;
      b.vx*=SWARM_CFG.drag; b.vy*=SWARM_CFG.drag;
      let sp=Math.hypot(b.vx,b.vy)||1e-6;
      if(sp>this.P.maxSpd){b.vx=b.vx/sp*this.P.maxSpd; b.vy=b.vy/sp*this.P.maxSpd; sp=this.P.maxSpd}
      else if(sp<this.P.minSpd){b.vx=b.vx/sp*this.P.minSpd; b.vy=b.vy/sp*this.P.minSpd; sp=this.P.minSpd}
      b.ang=lerpAngle(b.ang,Math.atan2(b.vy,b.vx),SWARM_CFG.angLerp);
      b.x+=b.vx; b.y+=b.vy;
      if(b.x<0)b.x+=this.w; else if(b.x>this.w)b.x-=this.w;
      if(b.y<0)b.y+=this.h; else if(b.y>this.h)b.y-=this.h;
    }
    tick(force){
      if(!force && (!this.vis||!this.w)) return;
      const snap=this.birds.slice();
      for(const b of snap){
        const [fx,fy]=this.flockForces(b,snap);
        b._fx=fx; b._fy=fy;
      }
      for(const b of snap) this.integrate(b,b._fx,b._fy);
    }
    draw(){
      if(!this.vis||!this.w) return;
      const {ctx,w,h,dark}=this;
      const g=ctx.createLinearGradient(0,0,w,h);
      if(dark){g.addColorStop(0,'#2E2A26');g.addColorStop(1,'#1C1A18')}
      else{g.addColorStop(0,'#F7F4EE');g.addColorStop(.55,'#F0EBE3');g.addColorStop(1,'#E6DFD4')}
      ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
      const t=performance.now()*.001;
      const {breathSizeAmp,breathGrayAmp,breathAlphaAmp,alphaMax}=SWARM_CFG;
      for(const b of this.birds){
        const sc=b.baseScale*(1+breathSizeAmp*Math.sin(t*b.spdS+b.phS));
        const gray=Math.max(8,Math.min(72,b.baseGray+breathGrayAmp*Math.sin(t*b.spdG+b.phG)));
        const alpha=Math.max(0,Math.min(alphaMax,b.baseAlpha+breathAlphaAmp*Math.sin(t*b.spdA+b.phA)));
        if(alpha<.01) continue;
        const ang=b.ang, sh=this.shape;
        ctx.save();
        ctx.translate(b.x,b.y); ctx.rotate(ang);
        ctx.fillStyle=dark?'rgba(245,238,228,'+alpha+')':'rgba('+gray+','+(gray-5)+','+(gray-10)+','+alpha+')';
        ctx.beginPath();
        ctx.moveTo(12*sc*sh,0); ctx.lineTo(-6*sc*sh,-4*sc*sh); ctx.lineTo(-3*sc*sh,0); ctx.lineTo(-6*sc*sh,4*sc*sh);
        ctx.closePath(); ctx.fill();
        ctx.restore();
      }
    }
  }

  let swarms=[], swarmReady=false;
  function warmupSwarms(done){
    const steps=Math.round(SWARM_CFG.warmupSec*SWARM_CFG.warmupFps);
    const chunk=SWARM_CFG.warmupChunk;
    let n=0;
    function batch(){
      const end=Math.min(n+chunk,steps);
      for(;n<end;n++) for(const s of swarms) s.tick(true);
      if(n<steps) requestAnimationFrame(batch);
      else{
        for(const s of swarms){
          s.warmed=true;
          s.c.style.transition='opacity .55s ease';
          s.c.style.opacity='1';
        }
        swarmReady=true;
        done();
      }
    }
    requestAnimationFrame(batch);
  }
  function start(){
    const nodes=[...document.querySelectorAll('canvas.swarm-bg-full')];
    if(!nodes.length) return;
    swarms=nodes.map((c,i)=>new Swarm(c,SWARM_CFG.seed+i*19,i?SWARM_CFG.countClosing:SWARM_CFG.countCover));
    warmupSwarms(()=>{
      const loop=()=>{for(const s of swarms){s.tick();s.draw()} requestAnimationFrame(loop)};
      loop();
    });
    addEventListener('resize',()=>{
      swarms.forEach(s=>{
        s.resize();
        if(s.warmed && SWARM_CFG.warmupSec>0){
          const steps=Math.round(SWARM_CFG.warmupSec*SWARM_CFG.warmupFps);
          for(let i=0;i<steps;i++) s.tick(true);
        }
      });
    },{passive:true});
  }
  if(document.readyState==='loading') addEventListener('DOMContentLoaded',start,{once:true});
  else requestAnimationFrame(start);
})();

</script>
`;
