import { SLIDE_BLOCK_RE } from './config.mjs';
import { FONT_CSS, EDITORIAL_CSS } from './styles.mjs';
import { SLIDES_HTML } from './slides.mjs';
import { SWARM_SCRIPT } from './swarm.mjs';
import { SCROLL_NAV_REPLACEMENT } from './scroll-nav.mjs';
import { MOTION_PATCH } from './motion-recipes.mjs';

const MOTION_IMPORT_RE =
  /try \{\s*motion = await import\('\.\/assets\/motion\.min\.js'\);\s*\} catch\(e1\) \{\s*try \{\s*motion = await import\('https:\/\/cdn\.jsdelivr\.net\/npm\/motion@11\.11\.17\/\+esm'\);\s*\} catch\(e2\) \{[^}]+\}\s*\}/s;

const MOTION_IMPORT_FALLBACK = `try {
  motion = await import('./assets/motion.min.js');
} catch(e1) {
  console.warn('[motion] load failed, disabling slide animations', e1);
  document.querySelectorAll('[data-anim]').forEach(el=>{el.style.opacity='1';el.style.transform='none'});
}`;

const SCROLL_NAV_RE =
  /\/\/ =============== 导航 ===============[\s\S]*?go\(Number\.isFinite\(initialSlide\) \? initialSlide : 0\);/;

const HINT_DIV_RE = /<div id="hint">[\s\S]*?<\/div>\s*/m;
const UPDATE_HINT_RE =
  /\s*function updateHint\(\)\{\s*const hint = document\.getElementById\('hint'\);\s*if\(hint\) hint\.textContent = `[^`]*`;\s*\}/;
const UPDATE_HINT_LISTENERS_RE =
  /\s*addEventListener\('DOMContentLoaded', updateHint, \{once:true\}\);/g;
const UPDATE_HINT_CALL_RE = /\s*updateHint\(\);/g;

const FONT_NUKES = [
  [/JetBrains Mono[^'"]*/g, 'Alibaba PuHuiTi'],
  [/"Inter"[^;]*/g, "'Alibaba PuHuiTi'"],
  [/PingFang SC[^;]*/g, "'Alibaba PuHuiTi'"],
  [/Helvetica[^;]*/g, "'Alibaba PuHuiTi'"],
  [/Microsoft YaHei[^;]*/g, "'Alibaba PuHuiTi'"],
  [/Noto Sans SC[^;]*/g, "'Alibaba PuHuiTi'"],
  [/system-ui[^;]*/g, "'Alibaba PuHuiTi'"],
];

const DECK_CSS_OLD =
  '#deck{position:fixed;inset:0;width:10000vw;height:100vh;display:flex;flex-wrap:nowrap;transition:transform .9s cubic-bezier(.77,0,.175,1);z-index:10;will-change:transform}';
const DECK_CSS_NEW =
  '#deck{position:fixed;inset:0;width:100vw;height:100vh;overflow-x:hidden;overflow-y:auto;scroll-snap-type:y mandatory;scroll-behavior:smooth;z-index:10;-webkit-overflow-scrolling:touch;overscroll-behavior-y:none;display:block}';

const SLIDE_CSS_OLD = /width:100vw;height:100vh;flex:0 0 100vw;/;
const SLIDE_CSS_NEW =
  'width:100vw;height:100vh;min-height:100vh;scroll-snap-align:start;scroll-snap-stop:always;';

const LOW_POWER_DECK_OLD = 'body.low-power #deck{transition:none!important}';
const LOW_POWER_DECK_NEW = 'body.low-power #deck{scroll-behavior:auto!important}';

/** Remove template features this deck does not use (overview, ASCII field, hint chrome). */
export function stripLegacy(html) {
  let out = html;

  out = out.replace(
    /body\.low-power canvas\.bg,\s*\r?\n\s*body\.low-power canvas\.ascii-bg\{display:none!important\}/,
    'body.low-power canvas.bg{display:none!important}'
  );

  out = out.replace(
    /  #hint\{[\s\S]*?body\.dark-bg\.low-power #hint\{[^}]+\}\r?\n\r?\n/,
    ''
  );

  out = out.replace(
    /  \/\* ESC 索引页:[\s\S]*?#overview \.slide \*\{animation:none!important;transition:none!important\}\r?\n\r?\n/,
    ''
  );

  const asciiCssStart = out.indexOf('  /* ============ ASCII 点阵呼吸场');
  if (asciiCssStart >= 0) {
    const asciiCssEnd = out.indexOf('  .slide.accent .canvas-card .chrome-min', asciiCssStart);
    if (asciiCssEnd > asciiCssStart) {
      out =
        out.slice(0, asciiCssStart) +
        '  .canvas-card > *:not(.swarm-bg-full):not(.bench-viz--bg){position:relative;z-index:1}\n' +
        out.slice(asciiCssEnd);
    }
  }

  const asciiScriptMarker = '/* ============== ASCII 点阵呼吸场';
  const asciiScriptStart = out.lastIndexOf('<script>', out.indexOf(asciiScriptMarker));
  const asciiScriptEnd = out.indexOf('</script>', out.indexOf(asciiScriptMarker));
  if (asciiScriptStart >= 0 && asciiScriptEnd > asciiScriptStart) {
    out = out.slice(0, asciiScriptStart) + out.slice(asciiScriptEnd + '</script>'.length);
  }

  return out;
}

export function injectStyles(html) {
  return html.replace('</style>', `${FONT_CSS}\n${EDITORIAL_CSS}\n</style>`);
}

export function injectSlides(html) {
  if (!SLIDE_BLOCK_RE.test(html)) {
    throw new Error('Could not find slides placeholder in template');
  }
  return html.replace(SLIDE_BLOCK_RE, SLIDES_HTML);
}

export function injectSwarm(html) {
  return html.replace(
    '</body>',
    `${SWARM_SCRIPT}\n<script src="assets/evo-trees-deck.js" defer></script>\n</body>`
  );
}

export function patchHint(html) {
  let out = html.replace(HINT_DIV_RE, '');
  out = out.replace(UPDATE_HINT_RE, '');
  out = out.replace(UPDATE_HINT_LISTENERS_RE, '');
  return out.replace(UPDATE_HINT_CALL_RE, '');
}

export function patchFonts(html) {
  let out = html;
  for (const [re, replacement] of FONT_NUKES) {
    out = out.replace(re, replacement);
  }
  return out;
}

export function patchMotion(html) {
  let out = html.replace(MOTION_IMPORT_RE, MOTION_IMPORT_FALLBACK);
  out = out.replace('  window.__playSlide = playSlide;', `${MOTION_PATCH}\n  window.__playSlide = playSlideDeck;`);
  return out.replace(
    '  playSlide(window.__currentSlideIndex || 0);',
    '  playSlideDeck(window.__pendingSlide ?? window.__currentSlideIndex ?? 0);'
  );
}

export function patchDeckScroll(html) {
  let out = html.replace(DECK_CSS_OLD, DECK_CSS_NEW);
  out = out.replace(SLIDE_CSS_OLD, SLIDE_CSS_NEW);
  return out.replace(LOW_POWER_DECK_OLD, LOW_POWER_DECK_NEW);
}

export function patchScrollNav(html) {
  return html.replace(SCROLL_NAV_RE, SCROLL_NAV_REPLACEMENT);
}

export function applyAllPatches(html) {
  return [
    stripLegacy,
    injectStyles,
    injectSlides,
    injectSwarm,
    patchHint,
    patchFonts,
    patchMotion,
    patchDeckScroll,
    patchScrollNav,
  ].reduce((acc, fn) => fn(acc), html);
}
