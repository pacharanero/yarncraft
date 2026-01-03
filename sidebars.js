/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    'spec',
    {
      type: 'category',
      label: 'Patterns',
      items: ['patterns/sample'],
    },
  ],
};

export default sidebars;
