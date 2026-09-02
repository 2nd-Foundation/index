import fs from 'fs';
import { PATHS } from './config.mjs';
import { applyTheme } from './theme.mjs';
import { applyAllPatches } from './patches.mjs';

export function buildDeck() {
  let html = fs.readFileSync(PATHS.template, 'utf8');
  html = applyTheme(html);
  html = applyAllPatches(html);
  fs.writeFileSync(PATHS.out, html, 'utf8');
  console.log('Wrote', PATHS.out);
}
