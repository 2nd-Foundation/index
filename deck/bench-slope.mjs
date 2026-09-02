/** Table 3 — GPT-3.5 / GPT-4o scores per benchmark (build-time slope charts). */
const METHODS_RIGHT = ['CoT', 'Self-Refine', 'SPP', 'EvoAgent', 'ADAS', 'SwarmAgentic'];

const BENCHMARKS = [
  { key: 'np', label: 'Natural Plan', short: 'NP' },
  { key: 'cw', label: 'Creative Writing', short: 'CW' },
  { key: 'mgsm', label: 'MGSM', short: 'MGSM' },
];

const SCORES = {
  Direct: { np: [7.3, 3.7], cw: [19.0, 45.0], mgsm: [19.9, 43.0] },
  CoT: { np: [9.0, 1.0], cw: [19.0, 50.0], mgsm: [20.0, 60.0] },
  'Self-Refine': { np: [4.4, 4.4], cw: [12.0, 41.0], mgsm: [13.0, 63.0] },
  SPP: { np: [5.0, 1.3], cw: [4.0, 33.0], mgsm: [22.0, 44.0] },
  EvoAgent: { np: [5.6, 1.9], cw: [4.0, 38.0], mgsm: [21.6, 52.0] },
  ADAS: { np: [1.9, 3.1], cw: [11.0, 43.0], mgsm: [21.0, 66.0] },
  SwarmAgentic: { np: [13.1, 13.1], cw: [23.0, 56.0], mgsm: [28.0, 82.0] },
};

const MODELS = [
  { key: 'gpt35', label: 'GPT-3.5' },
  { key: 'gpt4o', label: 'GPT-4o' },
];

const Y_MIN = 0;
const Y_MAX = 90;

function yPos(val, min, max, top, bottom) {
  const span = max - min || 1;
  const t = (val - min) / span;
  return bottom - t * (bottom - top);
}

function renderSlopeSvg(benchKey, modelIdx) {
  const direct = SCORES.Direct[benchKey][modelIdx];
  const rightVals = METHODS_RIGHT.map((m) => SCORES[m][benchKey][modelIdx]);
  const swarmVal = SCORES.SwarmAgentic[benchKey][modelIdx];

  const padT = 12;
  const padB = 6;
  const h = 200;
  const w = 110;
  const lx = 22;
  const rx = w - 16;
  const dy = (v) => yPos(v, Y_MIN, Y_MAX, padT, h - padB);

  const directY = dy(direct);
  const rightYs = rightVals.map(dy);
  const swarmY = dy(swarmVal);

  const connectors = rightYs
    .map(
      (y, i) =>
        `<line class="slope-line${i === rightYs.length - 1 ? ' ours' : ''}" x1="${lx}" y1="${directY}" x2="${rx}" y2="${y}"/>`
    )
    .join('');

  const rightDots = rightYs
    .map((y, i) => {
      const isOurs = i === rightYs.length - 1;
      return `<circle class="slope-dot right${isOurs ? ' ours' : ''}" cx="${rx}" cy="${y}" r="${isOurs ? 4.2 : 3.2}"/>`;
    })
    .join('');

  return `<svg class="slope-svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMin meet" aria-hidden="true">
    <line class="slope-rail" x1="${lx}" y1="${padT - 2}" x2="${lx}" y2="${h - padB + 2}"/>
    <line class="slope-rail" x1="${rx}" y1="${padT - 2}" x2="${rx}" y2="${h - padB + 2}"/>
    ${connectors}
    <line class="slope-ref" x1="${lx - 4}" y1="${swarmY}" x2="${rx + 10}" y2="${swarmY}"/>
    <circle class="slope-dot direct" cx="${lx}" cy="${directY}" r="3.8"/>
    ${rightDots}
  </svg>`;
}

function renderSlopeMini(benchKey, modelIdx, modelLabel) {
  return `<div class="slope-mini">
    ${renderSlopeSvg(benchKey, modelIdx)}
    <span class="slope-model-tag">${modelLabel}</span>
  </div>`;
}

function renderSlopePanel({ key, label }) {
  const minis = MODELS.map((m, i) => renderSlopeMini(key, i, m.label)).join('');
  return `<div class="slope-panel" data-bench="${key}">
    <div class="slope-panel-head"><span class="slope-panel-title">${label}</span></div>
    <div class="slope-duo">${minis}</div>
  </div>`;
}

export const BENCH_SLOPE_HTML = `<div class="bench-viz bench-viz--bg bench-slope-viz" data-anim="bench" aria-label="SwarmAgentic leads on Natural Plan, Creative Writing, and MGSM">
  <div class="bench-slope-grid">
    ${BENCHMARKS.map(renderSlopePanel).join('')}
  </div>
  <div class="bench-viz-head">
    <span class="bench-viz-legend">
      <i class="bench-swatch direct"></i>Direct
      <i class="bench-swatch prior"></i>Baselines
      <i class="bench-swatch ours"></i>SwarmAgentic
    </span>
  </div>
  <p class="bench-viz-foot">群体智能驱动全自动 Agentic 系统生成，在 TravelPlanner 上相对提升 261.8%</p>
</div>`;
