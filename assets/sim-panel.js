/**
 * Simplified MGM theory sims for the BP deck.
 * Auto-cycles random d0/ρ; no control sliders.
 * Seed default 42.
 */
(() => {
  const root = document.getElementById('simPanel');
  if (!root) return;

  const evoCanvas = document.getElementById('simEvo');
  const histCanvas = document.getElementById('simHist');
  const paramEl = document.getElementById('simParams');
  if (!evoCanvas || !histCanvas) return;

  const evoCtx = evoCanvas.getContext('2d');
  const histCtx = histCanvas.getContext('2d');

  const D0_STEPS = [10, 15, 20, 25, 30, 40, 50];
  const RHO_AUTO = [1.2, 1.3, 1.5, 1.8, 2.0, 2.5, 3.0];
  const METHODS = ['DGM', 'HGM', 'MGM'];
  const COLORS = { DGM: '#E74C3C', HGM: '#2980B9', MGM: '#27AE60' };
  const N_SEEDS = 28;
  const N_PTS = 64;
  const BUDGET = 500;
  const BASE_SEED = 42;
  const HOLD_MS = 3200;
  const PLAY_MS = 2600;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let worker = null;
  let runToken = 0;
  let holdTimer = 0;
  let cycleRng = mulberry32(BASE_SEED);
  let state = emptyState(20, 2.0);

  function mulberry32(a) {
    return function () {
      let t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function emptyState(d0, rho) {
    return {
      d0,
      rho,
      checkpoints: Array.from({ length: N_PTS }, (_, i) => (BUDGET * i) / (N_PTS - 1)),
      trajs: { DGM: [], HGM: [], MGM: [] },
      nDone: 0,
      nTarget: N_SEEDS,
      play: 0,
      playing: false,
      raf: 0,
    };
  }

  function syncParams() {
    if (paramEl) paramEl.textContent = `初始距离（难度）${state.d0} · 比较信号优势 ${state.rho.toFixed(1)}`;
  }

  function resizeCanvases() {
    for (const c of [evoCanvas, histCanvas]) {
      const rect = c.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));
      if (c.width !== w || c.height !== h) {
        c.width = w;
        c.height = h;
      }
    }
    draw();
  }

  function statsAt(method, tIdx) {
    const rows = state.trajs[method];
    const n = rows.length;
    if (!n) return null;
    let sum = 0;
    let sum2 = 0;
    const vals = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      const v = rows[i][tIdx];
      vals[i] = v;
      sum += v;
      sum2 += v * v;
    }
    const mu = sum / n;
    const se = Math.sqrt(Math.max(0, sum2 / n - mu * mu) / n);
    return { mu, lo: mu - 1.96 * se, hi: mu + 1.96 * se, vals, n };
  }

  function curveStats(method) {
    const rows = state.trajs[method];
    const n = rows.length;
    if (!n) return null;
    const mu = new Float64Array(N_PTS);
    const lo = new Float64Array(N_PTS);
    const hi = new Float64Array(N_PTS);
    for (let t = 0; t < N_PTS; t++) {
      let sum = 0;
      let sum2 = 0;
      for (let i = 0; i < n; i++) {
        const v = rows[i][t];
        sum += v;
        sum2 += v * v;
      }
      const m = sum / n;
      const se = Math.sqrt(Math.max(0, sum2 / n - m * m) / n);
      mu[t] = m;
      lo[t] = m - 1.96 * se;
      hi[t] = m + 1.96 * se;
    }
    return { mu, lo, hi, n };
  }

  function margins(dpr) {
    return { t: 10 * dpr, r: 4 * dpr, b: 4 * dpr, l: 2 * dpr };
  }

  function tickFont(dpr) {
    return `${8 * dpr}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
  }

  function drawEvo() {
    const ctx = evoCtx;
    const W = evoCanvas.width;
    const H = evoCanvas.height;
    const cssW = Math.max(1, evoCanvas.getBoundingClientRect().width);
    const dpr = W / cssW;
    ctx.clearRect(0, 0, W, H);

    const M = margins(dpr);
    const plotW = W - M.l - M.r;
    const plotH = H - M.t - M.b;
    const d0 = state.d0;
    const tMax = Math.max(1, Math.floor(state.play * (N_PTS - 1)));
    const xOf = (t) => M.l + (t / (N_PTS - 1)) * plotW;
    const yOf = (d) => M.t + ((d0 - d) / Math.max(d0, 1)) * plotH;

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = 'rgba(39,51,48,.08)';
    ctx.lineWidth = 1 * dpr;
    for (const frac of [0.25, 0.5, 0.75, 1]) {
      const y = M.t + plotH * (1 - frac);
      ctx.beginPath();
      ctx.moveTo(M.l, y);
      ctx.lineTo(M.l + plotW, y);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(39,51,48,.35)';
    ctx.lineWidth = 1.2 * dpr;
    ctx.beginPath();
    ctx.moveTo(M.l, M.t);
    ctx.lineTo(M.l, M.t + plotH);
    ctx.lineTo(M.l + plotW, M.t + plotH);
    ctx.stroke();

    ctx.setLineDash([5 * dpr, 4 * dpr]);
    ctx.strokeStyle = 'rgba(39,51,48,.35)';
    ctx.beginPath();
    ctx.moveTo(M.l, yOf(0));
    ctx.lineTo(xOf(tMax), yOf(0));
    ctx.stroke();
    ctx.setLineDash([]);

    for (const m of METHODS) {
      const st = curveStats(m);
      if (!st) continue;
      const color = COLORS[m];
      ctx.beginPath();
      for (let t = 0; t <= tMax; t++) {
        const y = yOf(Math.min(d0 + 0.5, Math.max(-0.5, st.hi[t])));
        if (t === 0) ctx.moveTo(xOf(t), y);
        else ctx.lineTo(xOf(t), y);
      }
      for (let t = tMax; t >= 0; t--) {
        ctx.lineTo(xOf(t), yOf(Math.min(d0 + 0.5, Math.max(-0.5, st.lo[t]))));
      }
      ctx.closePath();
      ctx.fillStyle = color + '2E';
      ctx.fill();

      ctx.beginPath();
      for (let t = 0; t <= tMax; t++) {
        if (t === 0) ctx.moveTo(xOf(t), yOf(st.mu[t]));
        else ctx.lineTo(xOf(t), yOf(st.mu[t]));
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = 2 * dpr;
      ctx.lineJoin = 'round';
      ctx.stroke();
    }

    if (state.nDone > 0 && state.play < 0.999) {
      const px = xOf(tMax);
      ctx.strokeStyle = 'rgba(39,51,48,.18)';
      ctx.lineWidth = 1 * dpr;
      ctx.beginPath();
      ctx.moveTo(px, M.t);
      ctx.lineTo(px, M.t + plotH);
      ctx.stroke();
    }

    ctx.fillStyle = '#6B7A72';
    ctx.font = tickFont(dpr);
    ctx.textAlign = 'left';
    ctx.fillText(String(d0), M.l + 6 * dpr, M.t + 9 * dpr);
    ctx.fillText('0', M.l + 6 * dpr, M.t + plotH - 4 * dpr);
    ctx.textAlign = 'end';
    ctx.fillText(String(BUDGET), M.l + plotW - 2 * dpr, M.t + plotH - 4 * dpr);
  }

  function drawHist() {
    const ctx = histCtx;
    const W = histCanvas.width;
    const H = histCanvas.height;
    const cssW = Math.max(1, histCanvas.getBoundingClientRect().width);
    const dpr = W / cssW;
    ctx.clearRect(0, 0, W, H);

    const M = margins(dpr);
    const plotW = W - M.l - M.r;
    const plotH = H - M.t - M.b;
    const d0 = state.d0;
    const tIdx = Math.max(0, Math.floor(state.play * (N_PTS - 1)));
    const bins = d0 + 1;
    const yMax = 0.4;
    const xOf = (d) => M.l + ((d + 0.5) / bins) * plotW;
    const yOf = (dens) => M.t + (1 - dens / yMax) * plotH;
    const barW = (plotW / bins) * 0.78;

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = 'rgba(39,51,48,.08)';
    ctx.lineWidth = 1 * dpr;
    for (const dens of [0.1, 0.2, 0.3, 0.4]) {
      const y = yOf(dens);
      ctx.beginPath();
      ctx.moveTo(M.l, y);
      ctx.lineTo(M.l + plotW, y);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(39,51,48,.35)';
    ctx.lineWidth = 1.2 * dpr;
    ctx.beginPath();
    ctx.moveTo(M.l, M.t);
    ctx.lineTo(M.l, M.t + plotH);
    ctx.lineTo(M.l + plotW, M.t + plotH);
    ctx.stroke();

    for (const m of METHODS) {
      const st = statsAt(m, tIdx);
      if (!st) continue;
      const counts = new Float64Array(bins);
      for (let i = 0; i < st.n; i++) {
        const d = Math.max(0, Math.min(d0, Math.round(st.vals[i])));
        counts[d] += 1;
      }
      const color = COLORS[m];
      for (let d = 0; d < bins; d++) {
        const dens = counts[d] / st.n;
        if (dens <= 0) continue;
        const x = M.l + (d / bins) * plotW + (plotW / bins - barW) / 2;
        const y = yOf(dens);
        ctx.globalAlpha = 0.55;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, barW, M.t + plotH - y);
      }
      ctx.globalAlpha = 1;
      ctx.setLineDash([4 * dpr, 3 * dpr]);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.8 * dpr;
      ctx.beginPath();
      ctx.moveTo(xOf(st.mu), M.t);
      ctx.lineTo(xOf(st.mu), M.t + plotH);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.fillStyle = '#6B7A72';
    ctx.font = tickFont(dpr);
    ctx.textAlign = 'left';
    ctx.fillText('0', M.l + 6 * dpr, M.t + plotH - 4 * dpr);
    ctx.textAlign = 'end';
    ctx.fillText(String(d0), M.l + plotW - 2 * dpr, M.t + plotH - 4 * dpr);
  }

  function draw() {
    drawEvo();
    drawHist();
  }

  function stopPlayback() {
    if (state.raf) cancelAnimationFrame(state.raf);
    state.raf = 0;
    state.playing = false;
  }

  function clearHold() {
    if (holdTimer) {
      clearTimeout(holdTimer);
      holdTimer = 0;
    }
  }

  function pickRandomParams() {
    const di = Math.floor(cycleRng() * D0_STEPS.length);
    const ri = Math.floor(cycleRng() * RHO_AUTO.length);
    return { d0: D0_STEPS[di], rho: RHO_AUTO[ri] };
  }

  function scheduleRefresh() {
    clearHold();
    if (reduceMotion) return;
    holdTimer = setTimeout(() => {
      holdTimer = 0;
      const next = pickRandomParams();
      startRun(next.d0, next.rho);
    }, HOLD_MS);
  }

  function startPlayback() {
    stopPlayback();
    if (reduceMotion) {
      state.play = 1;
      draw();
      scheduleRefresh();
      return;
    }
    state.playing = true;
    const t0 = performance.now();
    const from = state.play;
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / PLAY_MS);
      const eased = 1 - Math.pow(1 - p, 3);
      state.play = from + (1 - from) * eased;
      draw();
      if (p < 1 && state.playing) state.raf = requestAnimationFrame(tick);
      else {
        state.play = 1;
        state.playing = false;
        draw();
        if (state.nDone >= state.nTarget) scheduleRefresh();
      }
    };
    state.raf = requestAnimationFrame(tick);
  }

  function ensureWorker() {
    if (worker) return worker;
    const blob = new Blob(["/**\r\n * Monte Carlo worker — port of simulation.py (DGM / HGM / MGM).\r\n * Posts progressive seed results so the UI can monitor curves + distributions live.\r\n */\r\n(() => {\r\n  const METHODS = ['DGM', 'HGM', 'MGM'];\r\n\r\n  function mulberry32(a) {\r\n    return function () {\r\n      let t = (a += 0x6d2b79f5);\r\n      t = Math.imul(t ^ (t >>> 15), t | 1);\r\n      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);\r\n      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;\r\n    };\r\n  }\r\n\r\n  function rngInt(rng, n) {\r\n    return Math.floor(rng() * n);\r\n  }\r\n\r\n  function choiceNoReplace(rng, n, k) {\r\n    const idx = new Uint16Array(n);\r\n    for (let i = 0; i < n; i++) idx[i] = i;\r\n    for (let i = 0; i < k; i++) {\r\n      const j = i + rngInt(rng, n - i);\r\n      const tmp = idx[i];\r\n      idx[i] = idx[j];\r\n      idx[j] = tmp;\r\n    }\r\n    return idx.subarray(0, k);\r\n  }\r\n\r\n  function makeInitialState(L, d0, rng) {\r\n    const state = new Uint8Array(L);\r\n    state.fill(1);\r\n    const bad = choiceNoReplace(rng, L, d0);\r\n    for (let i = 0; i < bad.length; i++) state[bad[i]] = 0;\r\n    return state;\r\n  }\r\n\r\n  function makeTaskPool(N, L, k, rng) {\r\n    const pool = new Array(N);\r\n    for (let i = 0; i < N; i++) pool[i] = Uint16Array.from(choiceNoReplace(rng, L, k));\r\n    return pool;\r\n  }\r\n\r\n  function evalTask(state, locs) {\r\n    for (let i = 0; i < locs.length; i++) if (state[locs[i]] === 0) return 0;\r\n    return 1;\r\n  }\r\n\r\n  function dOf(state) {\r\n    let d = 0;\r\n    for (let i = 0; i < state.length; i++) if (state[i] === 0) d++;\r\n    return d;\r\n  }\r\n\r\n  function applyEdit(state, fixProb, breakProb, rng) {\r\n    const next = state.slice();\r\n    for (let i = 0; i < next.length; i++) {\r\n      if (next[i] === 0) {\r\n        if (rng() < fixProb) next[i] = 1;\r\n      } else if (rng() < breakProb) {\r\n        next[i] = 0;\r\n      }\r\n    }\r\n    return next;\r\n  }\r\n\r\n  function interpolate(history, totalBudget, nPts) {\r\n    const out = new Float32Array(nPts);\r\n    let h = 0;\r\n    const d0 = history[0][1];\r\n    for (let i = 0; i < nPts; i++) {\r\n      const cp = (totalBudget * i) / (nPts - 1);\r\n      while (h + 1 < history.length && history[h + 1][0] <= cp) h++;\r\n      out[i] = history[h] ? history[h][1] : d0;\r\n    }\r\n    return out;\r\n  }\r\n\r\n  function runDgm(p, rng) {\r\n    const taskPool = makeTaskPool(p.N_tasks, p.L, p.k, rng);\r\n    const init = makeInitialState(p.L, p.d0, rng);\r\n    let cost = 0;\r\n    const history = [[0, dOf(init)]];\r\n    let population = Array.from({ length: p.dgm_pop_size }, () => ({\r\n      state: init.slice(),\r\n      rewards: [],\r\n    }));\r\n\r\n    while (cost < p.total_budget) {\r\n      outer: for (let i = 0; i < population.length; i++) {\r\n        for (let e = 0; e < p.dgm_n_eval; e++) {\r\n          const tid = rngInt(rng, p.N_tasks);\r\n          population[i].rewards.push(evalTask(population[i].state, taskPool[tid]));\r\n          cost += p.c_task;\r\n          if (cost >= p.total_budget) break outer;\r\n        }\r\n      }\r\n      let best = Infinity;\r\n      for (const ind of population) best = Math.min(best, dOf(ind.state));\r\n      history.push([cost, best]);\r\n      if (cost >= p.total_budget) break;\r\n\r\n      const ranked = population.slice().sort((a, b) => {\r\n        const ma = a.rewards.length ? a.rewards.reduce((s, x) => s + x, 0) / a.rewards.length : 0;\r\n        const mb = b.rewards.length ? b.rewards.reduce((s, x) => s + x, 0) / b.rewards.length : 0;\r\n        return mb - ma;\r\n      });\r\n      const nSelect = Math.max(1, Math.floor(p.dgm_pop_size * p.dgm_selection_frac));\r\n      const selected = ranked.slice(0, nSelect);\r\n      const newPop = [{ state: selected[0].state.slice(), rewards: [] }];\r\n      for (const ind of selected) {\r\n        newPop.push({\r\n          state: applyEdit(ind.state, p.fix_prob_CM, p.break_prob_CM, rng),\r\n          rewards: [],\r\n        });\r\n        cost += p.c_edit_CM;\r\n        if (newPop.length >= p.dgm_pop_size || cost >= p.total_budget) break;\r\n      }\r\n      while (newPop.length < p.dgm_pop_size) {\r\n        newPop.push({ state: selected[0].state.slice(), rewards: [] });\r\n      }\r\n      population = newPop.slice(0, p.dgm_pop_size);\r\n      best = Infinity;\r\n      for (const ind of population) best = Math.min(best, dOf(ind.state));\r\n      history.push([cost, best]);\r\n    }\r\n    return interpolate(history, p.total_budget, p.n_checkpoints);\r\n  }\r\n\r\n  function betaMean(s, n) {\r\n    return (s + 1) / (n + 2);\r\n  }\r\n\r\n  function ucb(s, n, total, c) {\r\n    if (n === 0) return Infinity;\r\n    return betaMean(s, n) + c * Math.sqrt(Math.log(Math.max(total, 2)) / n);\r\n  }\r\n\r\n  function shouldEdit(s, n, minEv, maxEv, thresh) {\r\n    if (n >= maxEv) return true;\r\n    if (n < minEv) return false;\r\n    return (n - s) / n > thresh;\r\n  }\r\n\r\n  function chooseStrategyMgm(idx, failedTasks, p, rng) {\r\n    const canRM = failedTasks[idx].size >= p.min_failures_for_RM;\r\n    let canCH = false;\r\n    const nodeFailed = failedTasks[idx];\r\n    if (nodeFailed.size) {\r\n      for (let j = 0; j < failedTasks.length; j++) {\r\n        if (j === idx) continue;\r\n        for (const t of nodeFailed) {\r\n          if (failedTasks[j].has(t)) {\r\n            canCH = true;\r\n            break;\r\n          }\r\n        }\r\n        if (canCH) break;\r\n      }\r\n    }\r\n    if (canRM && rng() < p.prob_RM_given_available) return 'RM';\r\n    if (canCH && rng() < p.prob_CH_given_available) return 'CH';\r\n    return 'CM';\r\n  }\r\n\r\n  function runHgmMgm(p, rng, isMgm) {\r\n    const taskPool = makeTaskPool(p.N_tasks, p.L, p.k, rng);\r\n    const init = makeInitialState(p.L, p.d0, rng);\r\n    let cost = 0;\r\n    const history = [[0, dOf(init)]];\r\n    const states = [init];\r\n    const successes = [0];\r\n    const nEvals = [0];\r\n    const failedTasks = [new Set()];\r\n    const edited = [false];\r\n    const FIX = { CM: p.fix_prob_CM, RM: p.fix_prob_RM, CH: p.fix_prob_CH };\r\n    const BREAK = { CM: p.break_prob_CM, RM: p.break_prob_RM, CH: p.break_prob_CH };\r\n    const COST = { CM: p.c_edit_CM, RM: p.c_edit_RM, CH: p.c_edit_CH };\r\n\r\n    const bestD = () => {\r\n      let b = Infinity;\r\n      for (const s of states) b = Math.min(b, dOf(s));\r\n      return b;\r\n    };\r\n\r\n    let tid = rngInt(rng, p.N_tasks);\r\n    let r = evalTask(states[0], taskPool[tid]);\r\n    successes[0] += r;\r\n    nEvals[0] += 1;\r\n    if (r === 0) failedTasks[0].add(tid);\r\n    cost += p.c_task;\r\n    history.push([cost, bestD()]);\r\n\r\n    while (cost < p.total_budget) {\r\n      let active = [];\r\n      for (let i = 0; i < edited.length; i++) if (!edited[i]) active.push(i);\r\n      if (!active.length) active = states.map((_, i) => i);\r\n\r\n      let totalEv = 0;\r\n      for (const n of nEvals) totalEv += n;\r\n      totalEv = Math.max(1, totalEv);\r\n\r\n      let bestIdx = active[0];\r\n      let bestU = -Infinity;\r\n      for (const i of active) {\r\n        const u = ucb(successes[i], nEvals[i], totalEv, p.ucb_c);\r\n        if (u > bestU) {\r\n          bestU = u;\r\n          bestIdx = i;\r\n        }\r\n      }\r\n      const idx = bestIdx;\r\n\r\n      tid = rngInt(rng, p.N_tasks);\r\n      r = evalTask(states[idx], taskPool[tid]);\r\n      successes[idx] += r;\r\n      nEvals[idx] += 1;\r\n      if (r === 0) failedTasks[idx].add(tid);\r\n      cost += p.c_task;\r\n      history.push([cost, bestD()]);\r\n      if (cost >= p.total_budget) break;\r\n\r\n      if (\r\n        !edited[idx] &&\r\n        shouldEdit(\r\n          successes[idx],\r\n          nEvals[idx],\r\n          p.min_evals_before_edit,\r\n          p.max_evals_per_node,\r\n          p.edit_fail_threshold\r\n        )\r\n      ) {\r\n        const strategy = isMgm ? chooseStrategyMgm(idx, failedTasks, p, rng) : 'CM';\r\n        const newState = applyEdit(states[idx], FIX[strategy], BREAK[strategy], rng);\r\n        cost += COST[strategy];\r\n        edited[idx] = true;\r\n        states.push(newState);\r\n        successes.push(0);\r\n        nEvals.push(0);\r\n        failedTasks.push(new Set());\r\n        edited.push(false);\r\n        history.push([cost, bestD()]);\r\n\r\n        if (cost < p.total_budget) {\r\n          const newIdx = states.length - 1;\r\n          tid = rngInt(rng, p.N_tasks);\r\n          r = evalTask(states[newIdx], taskPool[tid]);\r\n          successes[newIdx] += r;\r\n          nEvals[newIdx] += 1;\r\n          if (r === 0) failedTasks[newIdx].add(tid);\r\n          cost += p.c_task;\r\n          history.push([cost, bestD()]);\r\n        }\r\n      }\r\n    }\r\n    return interpolate(history, p.total_budget, p.n_checkpoints);\r\n  }\r\n\r\n  function defaultParams(overrides) {\r\n    const fixCM = 0.25;\r\n    const rho = overrides.rho ?? 2;\r\n    return {\r\n      L: 100,\r\n      d0: overrides.d0 ?? 20,\r\n      N_tasks: 200,\r\n      k: 5,\r\n      c_task: 1,\r\n      c_edit_CM: 1,\r\n      c_edit_RM: 1,\r\n      c_edit_CH: 1,\r\n      fix_prob_CM: fixCM,\r\n      fix_prob_RM: fixCM * rho,\r\n      fix_prob_CH: fixCM * rho,\r\n      break_prob_CM: 0.05,\r\n      break_prob_RM: 0.05,\r\n      break_prob_CH: 0.05,\r\n      dgm_pop_size: 5,\r\n      dgm_n_eval: 10,\r\n      dgm_selection_frac: 0.4,\r\n      ucb_c: 1,\r\n      min_evals_before_edit: 3,\r\n      max_evals_per_node: 20,\r\n      edit_fail_threshold: 0.5,\r\n      prob_RM_given_available: 0.5,\r\n      prob_CH_given_available: 0.8,\r\n      min_failures_for_RM: 2,\r\n      total_budget: overrides.budget ?? 500,\r\n      n_seeds: overrides.nSeeds ?? 60,\r\n      n_checkpoints: overrides.nCheckpoints ?? 120,\r\n      seed: overrides.seed ?? 42,\r\n      rho,\r\n    };\r\n  }\r\n\r\n  let runId = 0;\r\n\r\n  self.onmessage = (ev) => {\r\n    const msg = ev.data || {};\r\n    if (msg.type !== 'run') return;\r\n    const id = ++runId;\r\n    const p = defaultParams(msg);\r\n    const n = p.n_seeds;\r\n    const nPts = p.n_checkpoints;\r\n    const checkpoints = new Float32Array(nPts);\r\n    for (let i = 0; i < nPts; i++) checkpoints[i] = (p.total_budget * i) / (nPts - 1);\r\n\r\n    self.postMessage({\r\n      type: 'start',\r\n      id,\r\n      d0: p.d0,\r\n      rho: p.rho,\r\n      nSeeds: n,\r\n      budget: p.total_budget,\r\n      checkpoints: Array.from(checkpoints),\r\n    });\r\n\r\n    for (let seed = 0; seed < n; seed++) {\r\n      if (id !== runId) return;\r\n      const traj = {\r\n        DGM: runDgm(p, mulberry32(p.seed + seed * 3 + 1)),\r\n        HGM: runHgmMgm(p, mulberry32(p.seed + seed * 3 + 2), false),\r\n        MGM: runHgmMgm(p, mulberry32(p.seed + seed * 3 + 3), true),\r\n      };\r\n      self.postMessage(\r\n        {\r\n          type: 'seed',\r\n          id,\r\n          seed,\r\n          nSeeds: n,\r\n          traj: {\r\n            DGM: Array.from(traj.DGM),\r\n            HGM: Array.from(traj.HGM),\r\n            MGM: Array.from(traj.MGM),\r\n          },\r\n        },\r\n        []\r\n      );\r\n    }\r\n    if (id === runId) self.postMessage({ type: 'done', id, nSeeds: n });\r\n  };\r\n})();\r\n"], { type: 'application/javascript' });
    worker = new Worker(URL.createObjectURL(blob));
    worker.onmessage = (ev) => {
      const msg = ev.data || {};
      if (msg.id !== runToken) return;
      if (msg.type === 'start') {
        state.checkpoints = msg.checkpoints;
      } else if (msg.type === 'seed') {
        for (const m of METHODS) state.trajs[m].push(msg.traj[m]);
        state.nDone = msg.seed + 1;
        if (state.nDone === 1 && !reduceMotion && !state.playing) startPlayback();
        draw();
      } else if (msg.type === 'done') {
        state.nDone = msg.nSeeds;
        if (state.play < 0.999 && !state.playing && !reduceMotion) startPlayback();
        else if (reduceMotion) {
          state.play = 1;
          draw();
          scheduleRefresh();
        } else if (!state.playing && state.play >= 0.999) {
          scheduleRefresh();
        }
        draw();
      }
    };
    return worker;
  }

  function startRun(d0, rho) {
    stopPlayback();
    clearHold();
    runToken += 1;
    state = emptyState(d0, rho);
    state.play = reduceMotion ? 1 : 0.06;
    syncParams();
    draw();
    ensureWorker().postMessage({
      type: 'run',
      d0,
      rho,
      nSeeds: N_SEEDS,
      nCheckpoints: N_PTS,
      budget: BUDGET,
      seed: BASE_SEED + runToken * 97,
    });
  }

  window.addEventListener('resize', () => {
    clearTimeout(resizeCanvases._t);
    resizeCanvases._t = setTimeout(resizeCanvases, 80);
  });

  syncParams();
  resizeCanvases();

  let started = false;
  function boot() {
    if (started) return;
    started = true;
    startRun(20, 2.0);
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        boot();
      });
    },
    { threshold: 0.08 }
  );
  io.observe(root);
  setTimeout(boot, 1200);
})();
