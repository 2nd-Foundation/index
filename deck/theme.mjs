import { META } from './config.mjs';

const THEME_REPLACEMENTS = [
  ['--paper:#fafaf8;', '--paper:#F5F3EE;'],
  ['--paper-rgb:250,250,248;', '--paper-rgb:245,243,238;'],
  ['--ink:#0a0a0a;', '--ink:#1C1A18;'],
  ['--ink-rgb:10,10,10;', '--ink-rgb:28,26,24;'],
  ['--grey-1:#f0f0ee;', '--grey-1:#EBE8E2;'],
  ['--grey-2:#d4d4d2;', '--grey-2:#D5D0C8;'],
  ['--grey-3:#737373;', '--grey-3:#7A746C;'],
  ['--accent:#002FA7;', '--accent:#B84435;'],
  ['--accent-rgb:0,47,167;', '--accent-rgb:184,68,53;'],
  ['--accent-on:#ffffff;', '--accent-on:#FFFAF6;'],
  ['--accent-bright:#5B7BFF;', '--accent-bright:#D4785C;'],
  ['--text-primary:#0a0a0a;', '--text-primary:#1C1A18;'],
  ['--text-secondary:#525252;', '--text-secondary:#5C5650;'],
  ['--border-subtle:#e0e0e0;', '--border-subtle:#DDD8CF;'],
];

const FONT_VAR_REPLACEMENTS = [
  [/--sans:"Inter"[^;]+;/, "--sans:'Alibaba PuHuiTi';"],
  [/--sans-zh:"PingFang SC"[^;]+;/, "--sans-zh:'Alibaba PuHuiTi';"],
  [/--mono:"JetBrains Mono"[^;]+;/, "--mono:'Alibaba PuHuiTi';"],
];

const GOOGLE_FONTS_RE =
  /<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">\s*<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>\s*<link href="https:\/\/fonts\.googleapis\.com[^"]+" rel="stylesheet">/;

/** Warm terracotta editorial palette and Alibaba PuHuiTi typography. */
export function applyTheme(html) {
  let out = html;
  for (const [from, to] of THEME_REPLACEMENTS) out = out.replace(from, to);
  out = out.replace(/<title>.*?<\/title>/, `<title>${META.title}</title>`);
  out = out.replace(
    /<meta name="viewport"[^>]+>/,
    '$&\n<link rel="icon" type="image/svg+xml" href="./assets/favicon.svg">'
  );
  out = out.replace(GOOGLE_FONTS_RE, '');
  for (const [re, replacement] of FONT_VAR_REPLACEMENTS) {
    out = out.replace(re, replacement);
  }
  return out;
}
