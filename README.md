# `yarncraft`

Docusaurus-powered prototype for rendering crochet patterns with interactive abbreviations, local progress tracking, and a stitch counter.

Use it at https://pacharanero.github.io/yarncraft/

## LLM-assisted Development

* **All new patterns must be free, open-source, and compatible with the licensing of this repository. We do not want to include copyrighted work.**
* Even non-techical users can easily learn to add new content using an LLM, such as Claude Code, OpenAI Codex, or similar. 
* I will add some instructions on how to do this soon.

## Local Development

```bash
npm install
npm start
```

Then open http://localhost:3000 to explore the sample pattern.

## Features
- Automatic abbreviation tooltips sourced from `src/data/abbreviations.json` via a remark plugin.
- Persistent stitch counter with increment/decrement and reset.
- Checkbox progress synced to `localStorage` per pattern.
- Per-pattern reset clears both counter and checkboxes.

## Content
- Docs live in `./docs`. The sample pattern is in `docs/patterns/sample.mdx` and uses the shared components defined in `src/components`.
- Global styling lives in `src/css/custom.css`. Component-level styles use CSS modules.

## Scripts
- `npm start` — local dev server
- `npm run build` — production build output
- `npm run serve` — preview the production build locally

## Deployment
- A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds the site and publishes it to GitHub Pages on pushes to `main` (or when manually triggered).

