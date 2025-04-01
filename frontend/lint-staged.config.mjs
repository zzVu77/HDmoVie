/**
 * @file lint-staged.config.mjs
 * @type {import('lint-staged').Configuration}
 */

const lintStagedConfig = {
  "./**/*.{js,jsx,mjs,cjs,ts,tsx}": [() => "npm run lint", () => "tsc --noEmit", "eslint --fix", "prettier --write"],
  "*.{css,scss,json,md,mdx,html}": ["prettier --write"],
};

export default lintStagedConfig;
