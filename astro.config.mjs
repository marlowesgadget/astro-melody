// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';
import { remarkModifiedTime } from "./src/utils/remark-modified-time.mjs";
import partytown from "@astrojs/partytown";
import pagefind from "astro-pagefind";
import tailwind from "@astrojs/tailwind";
import linkCard from "astro-link-card";


// https://astro.build/config
export default defineConfig({
    site: 'https://example.com',
    trailingSlash: "always",
    prefetch: {
        prefetchAll: true,
        defaultStrategy: 'viewport',
    },

    experimental: {
        
    },

    image: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],
    },

    markdown: {
        remarkPlugins: [remarkModifiedTime],
    },
    integrations: [
        mdx(),
        sitemap(),
        pagefind(),
        tailwind(),
        partytown({
          config: {
            forward: ["dataLayer.push"],
            debug: false,
          },
        }),
        linkCard({
          openInNewTab: true,  // 正しくカンマを追加
        }),
      ],
})