import {visit} from 'unist-util-visit';

const shouldSkipParent = (parent) => {
  if (!parent) return false;
  return ['link', 'linkReference', 'definition', 'inlineCode', 'code'].includes(parent.type);
};

const createAbbrNode = (abbr) => ({
  type: 'mdxJsxTextElement',
  name: 'Abbr',
  attributes: [
    {type: 'mdxJsxAttribute', name: 'code', value: abbr},
  ],
  children: [{type: 'text', value: abbr}],
});

export default function abbrRemark(options) {
  const abbreviations = options?.abbreviations ?? {};
  const codes = Object.keys(abbreviations);
  const pattern = codes.length ? new RegExp(`\\b(${codes.map((c) => c.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})\\b`, 'g') : null;

  return function transformer(tree) {
    if (!pattern) return;
    visit(tree, 'text', (node, index, parent) => {
      if (!node.value || shouldSkipParent(parent)) return;
      const value = node.value;
      pattern.lastIndex = 0;
      const matches = [...value.matchAll(pattern)];
      if (!matches.length) return;

      const segments = [];
      let lastIndex = 0;
      for (const match of matches) {
        const start = match.index ?? 0;
        if (start > lastIndex) {
          segments.push({type: 'text', value: value.slice(lastIndex, start)});
        }
        segments.push(createAbbrNode(match[1]));
        lastIndex = start + match[1].length;
      }
      if (lastIndex < value.length) {
        segments.push({type: 'text', value: value.slice(lastIndex)});
      }
      parent.children.splice(index, 1, ...segments);
      return index + segments.length;
    });
  };
}
