// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';
import abbreviations from './src/data/abbreviations.json' with {type: 'json'};
import abbrRemark from './plugins/abbrRemark.js';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'yarncraft',
  tagline: 'Interactive knitting and crochet patterns with stitch glossary and progress tracking',
  url: 'https://pacharanero.github.io',
  baseUrl: '/yarncraft/',
  favicon: 'img/favicon.ico',
  organizationName: 'pacharanero',
  projectName: 'yarncraft',
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  trailingSlash: false,
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [[abbrRemark, {abbreviations}]],
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'yarncraft',
      logo: {
        alt: 'yarncraft - a simple site for text-based crochet and knitting patterns',
        src: 'img/logo.svg',
      },
      items: [
        {type: 'docSidebar', sidebarId: 'tutorialSidebar', position: 'left', label: 'Patterns'},
        {href: 'https://github.com/', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      copyright: `ⓒ Copyright 2026 Koloki.co.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
