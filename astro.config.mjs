import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import sentry from "@sentry/astro";
import spotlightjs from "@spotlightjs/astro";
import rehypeSlug from 'rehype-slug';
import remarkSmartypants from 'remark-smartypants';
import { rehypeAutolink } from './plugins/rehype-autolink';
import { rehypeOptimizeStatic } from './plugins/rehype-optimize-static';
import { rehypeTasklistEnhancer } from './plugins/rehype-tasklist-enhancer';
// import { remarkFallbackLang } from './plugins/remark-fallback-lang';

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    title: 'Yabe Siul',
    titleDelimiter: ' - ',
    logo: {
      src: './public/favicon.svg'
    },
    social: {
      github: 'https://github.com/orgrosua/yabe-siul-website',
      facebook: 'https://www.facebook.com/groups/1142662969627943'
    },
    editLink: {
      baseUrl: 'https://github.com/orgrosua/yabe-siul-website/edit/main'
    },
    sidebar: [{
      label: 'Getting Started',
      items: [{
        label: 'Introduction',
        link: '/guides/introduction/'
      }, {
        label: 'Installation',
        link: '/guides/install/'
      }]
    }, {
      label: 'Guides',
      items: [{
        label: 'Production',
        link: '/guides/common/production/'
      }]
    }, {
      label: 'Configuration',
      items: [{
        label: 'main.css',
        link: '/guides/configuration/main-css/'
      }, {
        label: 'preset.js',
        link: '/guides/configuration/preset-js/'
      }, {
        label: 'Wizard',
        badge: {
          text: 'Experimental',
          variant: 'caution'
        },
        collapsed: false,
        items: [{
          label: 'The Wizard',
          link: '/guides/configuration/wizard/'
        }, {
          label: 'Profile',
          link: '/guides/configuration/wizard/profile/'
        }, {
          label: 'Screens',
          link: '/guides/configuration/wizard/screens/'
        }, {
          label: 'Spacing',
          link: '/guides/configuration/wizard/spacing/'
        }, {
          label: 'Typography',
          link: '/guides/configuration/wizard/typography/'
        }, {
          label: 'Colors',
          link: '/guides/configuration/wizard/colors/'
        }, {
          label: 'Plugins',
          link: '/guides/configuration/wizard/plugins/'
        }]
      }]
    },
    {
        label: 'Integrations',
        badge: {
          text: 'Being written...',
          // variant: 'note'
        },
        items: [
            {
                label: 'Theme / Plugin Developers',
                link: '/guides/integrations/developer/'
            },
            {
                label: 'Blockstudio',
                link: '/guides/integrations/blockstudio/'
            },
            {
                label: 'Bricks',
                link: '/guides/integrations/bricks/'
            },
            {
                label: 'Gutenberg',
                link: '/guides/integrations/gutenberg/'
            },
            {
                label: 'Oxygen',
                link: '/guides/integrations/oxygen/'
            },
            {
                label: 'Timber',
                link: '/guides/integrations/timber/'
            },
        ]
    },
    // {
    //   label: 'Reference',
    //   autogenerate: {
    //     directory: 'reference'
    //   }
    // }
    ],
    components: {
      Head: './src/components/starlight/Head.astro',
      TableOfContents: './src/components/starlight/TableOfContents.astro',
      SiteTitle: './src/components/starlight/SiteTitle.astro',
      MarkdownContent: './src/components/starlight/MarkdownContent.astro',
      PageSidebar: './src/components/starlight/PageSidebar.astro'
    },
    customCss: ['./src/styles/custom.css']
  }), sitemap(), partytown(), sentry(), spotlightjs(), vue({ jsx: true })],
  redirects: {
    '/docs': '/guides/introduction/'
  },
  site: 'https://siul.yabe.land',
  markdown: {
    // Override with our own config
    smartypants: false,
    remarkPlugins: [[remarkSmartypants, {
      dashes: false
    }]
    // Add our custom plugin that marks links to fallback language pages
    // remarkFallbackLang(),
    ],
    rehypePlugins: [rehypeSlug,
    // This adds links to headings
    ...rehypeAutolink(),
    // Tweak GFM task list syntax
    rehypeTasklistEnhancer(),
    // Collapse static parts of the hast to html
    rehypeOptimizeStatic]
  }
});