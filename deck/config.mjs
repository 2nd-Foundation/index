import path from 'path';
import { fileURLToPath } from 'url';

export const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

export const PATHS = {
  template: path.join(
    process.env.USERPROFILE || '',
    '.cursor/skills/guizang-ppt-skill/assets/template-swiss.html'
  ),
  out: path.join(ROOT, 'index.html'),
};

export const META = {
  title:
    'RSI for Agentic Swarm Intelligence · 亿万智能体系统的自我规则涌现 · Second Foundation',
};

/** Matches template placeholder slides (cover example through closing example). */
export const SLIDE_BLOCK_RE =
  /<!-- SLIDES_HERE[\s\S]*?<\/section>\s*\n\s*<!-- ============ 示例:最后一页[\s\S]*?<\/section>/;
