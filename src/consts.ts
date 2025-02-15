// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

// Base Page Metadata, src/layouts/BaseLayout.astro
export const BRAND_NAME = "Gadget Detective";
export const SITE_TITLE = "Gadget Detective";
export const SITE_DESCRIPTION = "Gadget Detecitive Site";
export const LIGHT_THEME = 'corporate';
export const DARK_THEME = 'halloween';

// Tags Page Metadata, src/pages/tags/index.astro
export const Tags_TITLE = "Gadget Detective - All Tags";
export const Tags_DESCRIPTION =
  "Gadget Detective - All tags and the count of articles related to each tag";

// Tags Page Metadata, src/pages/tags/[tag]/[page].astro
export function getTagMetadata(tag: string) {
  return {
    title: `All articles on '${tag}' tag in Gadget Detective`,
    description: `Explore articles about ${tag} for different perspectives and in-depth analysis.`,
  };
}

// Category Page Metadata, src/pages/category/[category]/[page].astro
export function getCategoryMetadata(category: string) {
  return {
    title: `All articles in '${category}' category in Gadget Detective`,
    description: `Browse all articles under the ${category} category in Gadget Detective`,
  };
}

// Header Links, src/components/Header.astro
export const HeaderLinks = [
  { href: "/category/One/1/", title: "Phones" },
  { href: "/category/Two/1/", title: "Mac/PC" },
  { href: "/category/Three/1/", title: "Watch" },
];

// Footer Links, src/components/Footer.astro
export const FooterLinks = [
  { href: "/posts/core-concepts-concepts-why-astro/", title: "Astro" },
  { href: "/posts/assets-guides-styling/", title: "Styling" },
  { href: "/tags/", title: "Tags" },
];

// Social Links, src/components/Footer.astro
export const SocialLinks = [
  { href: "/rss.xml", icon: "i-tabler-rss", label: "RSS" },
  {
    href: "https://twitter.com/astrodotbuild",
    icon: "i-tabler-brand-twitter",
    label: "Twitter",
  },
  {
    href: "https://github.com/isooosi",
    icon: "i-tabler-brand-github",
    label: "GitHub",
  },
];

// Search Page Metadata, src/pages/search.astro
export const SEARCH_PAGE_TITLE = `${SITE_TITLE} - Site Search`;
export const SEARCH_PAGE_DESCRIPTION = `Search all content on ${SITE_TITLE}`;
