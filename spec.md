# Crochet Pattern Viewer Specification

## Vision
Build a Docusaurus-powered site for collating crochet recipes written in Markdown/MDX and displaying them in a semi-interactive form. Keep the interactive layer lightweight and client-side while leaving room for richer components later (diagrams, animations, richer data sources).

## Core Requirements
- **Markdown-first content**: Patterns are written in Markdown/MDX and rendered through the docs system.
- **Clickable abbreviations**: Any stitch abbreviation with a definition in the shared abbreviations file is interactive (click/hover) and surfaces the definition in a tooltip or popup. Future versions may display diagrams or media alongside the definition.
- **Progress tracking**: Provide a built-in stitch counter and a way to record progress through the pattern. MVP can rely on Markdown checkboxes and persist progress locally in the browser.
- **Local persistence**: Progress and counter state should be stored in `localStorage` (per-pattern) so reloads retain user progress.
- **Accessibility and mobile**: Interactions must work for mouse/keyboard and touch users; tooltips/popups must be readable and operable on mobile.

## Implementation Notes
- Abbreviations are held in a single source of truth (`src/data/abbreviations.json`). A remark plugin wraps matches with an MDX component so tooltips can be styled and extended.
- Abbreviation wrapping must avoid code blocks and non-pattern text.
- Stitch counter: provide increment/decrement controls, a reset option, and per-pattern persistence.
- Progress via checkboxes: attach listeners after render to sync state to `localStorage`; allow reset controls per pattern.
- A per-pattern reset should clear both counter and checkboxes.

## Near-term Roadmap
1. Create the Docusaurus shell and migrate sample content to docs/MDX.
2. Add stitch counter and checkbox-based progress persistence keyed to the pattern slug.
3. Polish UI and mobile interactions (larger tap targets, sticky counter, accessible tooltips).
4. Extend abbreviation popups to support diagrams or inline media for stitches.
