---
author: AA
category:
- Three
cover: https://images.unsplash.com/photo-1414438992182-69e404046f80?ixid=M3w2NzEyNTB8MHwxfHNlYXJjaHw0fHxidWlsZGluZyUyMGNvbW1pY3xlbnwwfDB8MXx8MTczMDU1Mjc1N3ww&ixlib=rb-4.0.3&w=1960&h=1102&auto=format&fit=crop&q=60
coverAlt: Leaning Tower of Pisa, Italy
description: ''
pubDate: 2024-02-04 00:00:00
slug: other-development-apis-reference-integrations-reference
tags:
- guide
- Python
- Sass
title: Astro Integration API 
---

**Astro Integrations** add new functionality and behaviors for your project with only a few lines of code.


This reference page is for anyone writing their own integration. To learn how to use an integration in your project, check out our [Using Integrations](/en/guides/integrations-guide/) guide instead.


Examples
--------

[Section titled Examples](#examples)
The official Astro integrations can act as reference for you as you go to build your own integrations.


* **Renderers:** [`lit`](/en/guides/integrations-guide/lit/), [`svelte`](/en/guides/integrations-guide/svelte/), [`react`](/en/guides/integrations-guide/react/), [`preact`](/en/guides/integrations-guide/preact/), [`vue`](/en/guides/integrations-guide/vue/), [`solid`](/en/guides/integrations-guide/solid-js/)
* **Libraries:** [`tailwind`](/en/guides/integrations-guide/tailwind/), [`partytown`](/en/guides/integrations-guide/partytown/)
* **Features:** [`sitemap`](/en/guides/integrations-guide/sitemap/)


Quick API Reference
-------------------

[Section titled Quick API Reference](#quick-api-reference)





```
interface AstroIntegration {  name: string;  hooks: {    'astro:config:setup'?: (options: {      config: AstroConfig;      command: 'dev' | 'build' | 'preview' | 'sync';      isRestart: boolean;      updateConfig: (newConfig: DeepPartial<AstroConfig>) => AstroConfig;      addRenderer: (renderer: AstroRenderer) => void;      addWatchFile: (path: URL | string) => void;      addClientDirective: (directive: ClientDirectiveConfig) => void;      addMiddleware: (middleware: AstroIntegrationMiddleware) => void;      addDevToolbarApp: (pluginEntrypoint: string) => void;      injectScript: (stage: InjectedScriptStage, content: string) => void;      injectRoute: (injectedRoute: { pattern: string, entrypoint: string }) => void;      logger: AstroIntegrationLogger;    }) => void | Promise<void>;    'astro:config:done'?: (options: {      config: AstroConfig;      setAdapter: (adapter: AstroAdapter) => void;      injectTypes: (injectedType: { filename: string; content: string }) => URL;      logger: AstroIntegrationLogger;      }) => void | Promise<void>;    'astro:route:setup'?: (options: { route: RouteOptions; logger: AstroIntegrationLogger; }) => void | Promise<void>;    'astro:server:setup'?: (options: { server: vite.ViteDevServer; logger: AstroIntegrationLogger; }) => void | Promise<void>;    'astro:server:start'?: (options: { address: AddressInfo; logger: AstroIntegrationLogger; }) => void | Promise<void>;    'astro:server:done'?: (options: { logger: AstroIntegrationLogger; }) => void | Promise<void>;    'astro:build:start'?: (options: { logger: AstroIntegrationLogger; }) => void | Promise<void>;    'astro:build:setup'?: (options: {      vite: ViteConfigWithSSR;      pages: Map<string, PageBuildData>;      target: 'client' | 'server';      logger: AstroIntegrationLogger;    }) => void | Promise<void>;    'astro:build:generated'?: (options: { dir: URL; logger: AstroIntegrationLogger; }) => void | Promise<void>;    'astro:build:ssr'?: (options: {        manifest: SerializedSSRManifest;        entryPoints: Map<RouteData, URL>;        logger: AstroIntegrationLogger;    }) => void | Promise<void>;    'astro:build:done'?: (options: { dir: URL; routes: RouteData[]; logger: AstroIntegrationLogger; }) => void | Promise<void>;
    // ... any custom hooks from integrations  };}
```

Hooks
-----

[Section titled Hooks](#hooks)
Astro provides hooks that integrations can implement to execute during certain parts of Astro’s lifecycle. Astro hooks are defined in the `IntegrationHooks` interface, which is part of the global `Astro` namespace.


The following hooks are built in to Astro:


### `astro:config:setup`

[Section titled astro:config:setup](#astroconfigsetup)
**Next hook:** [`astro:config:done`](#astroconfigdone)


**When:** On initialization, before either the [Vite](https://vite.dev/config/) or [Astro config](/en/reference/configuration-reference/) have resolved.


**Why:** To extend the project config. This includes updating the [Astro config](/en/reference/configuration-reference/), applying [Vite plugins](https://vite.dev/guide/api-plugin.html), adding component renderers, and injecting scripts onto the page.







```
'astro:config:setup'?: (options: {  config: AstroConfig;  command: 'dev' | 'build' | 'preview' | 'sync';  isRestart: boolean;  updateConfig: (newConfig: DeepPartial<AstroConfig>) => AstroConfig;  addRenderer: (renderer: AstroRenderer) => void;  addClientDirective: (directive: ClientDirectiveConfig) => void;  addMiddleware: (middleware: AstroIntegrationMiddleware) => void;  addDevToolbarApp: (pluginEntrypoint: string) => void;  addWatchFile: (path: URL | string) => void;  injectScript: (stage: InjectedScriptStage, content: string) => void;  injectRoute: ({ pattern: string, entrypoint: string }) => void;  logger: AstroIntegrationLogger;}) => void | Promise<void>;
```

#### `config` option

[Section titled config option](#config-option)
**Type:** `AstroConfig`


A read\-only copy of the user\-supplied [Astro config](/en/reference/configuration-reference/). This is resolved *before* any other integrations have run. If you need a copy of the config after all integrations have completed their config updates, [see the `astro:config:done` hook](#astroconfigdone).


#### `command` option

[Section titled command option](#command-option)
**Type:** `'dev' | 'build' | 'preview' | 'sync'`


* `dev` \- Project is executed with `astro dev`
* `build` \- Project is executed with `astro build`
* `preview` \- Project is executed with `astro preview`
* `sync` \- Project is executed with `astro sync`


#### `isRestart` option

[Section titled isRestart option](#isrestart-option)
**Type:** `boolean`


`false` when the dev server starts, `true` when a reload is triggered. Useful to detect when this function is called more than once.


#### `updateConfig` option

[Section titled updateConfig option](#updateconfig-option)
**Type:** `(newConfig: DeepPartial<AstroConfig>) => AstroConfig;`


A callback function to update the user\-supplied [Astro config](/en/reference/configuration-reference/). Any config you provide **will be merged with the user config \+ other integration config updates,** so you are free to omit keys!


For example, say you need to supply a [Vite](https://vite.dev/) plugin to the user’s project:







```
import bananaCSS from '@vitejs/official-banana-css-plugin';
export default {  name: 'banana-css-integration',  hooks: {    'astro:config:setup': ({ updateConfig }) => {      updateConfig({        vite: {          plugins: [bananaCSS()],        }      })    }  }}
```

#### `addRenderer` option

[Section titled addRenderer option](#addrenderer-option)
**Type:** `(renderer:` [`AstroRenderer`](https://github.com/withastro/astro/blob/fdd607c5755034edf262e7b275732519328a33b2/packages/astro/src/%40types/astro.ts#L872-L883) `) => void;`
**Examples:** [`lit`](https://github.com/withastro/astro/blob/main/packages/integrations/lit/src/index.ts), [`svelte`](https://github.com/withastro/astro/blob/main/packages/integrations/svelte/src/index.ts), [`react`](https://github.com/withastro/astro/blob/main/packages/integrations/react/src/index.ts), [`preact`](https://github.com/withastro/astro/blob/main/packages/integrations/preact/src/index.ts), [`vue`](https://github.com/withastro/astro/blob/main/packages/integrations/vue/src/index.ts), [`solid`](https://github.com/withastro/astro/blob/main/packages/integrations/solid/src/index.ts)


A callback function to add a component framework renderer (i.e. React, Vue, Svelte, etc). You can browse the examples and type definition above for more advanced options, but here are the 2 main options to be aware of:


* `clientEntrypoint` \- path to a file that executes on the client whenever your component is used. This is mainly for rendering or hydrating your component with JS.
* `serverEntrypoint` \- path to a file that executes during server\-side requests or static builds whenever your component is used. These should render components to static markup, with hooks for hydration where applicable. [React’s `renderToString` callback](https://react.dev/reference/react-dom/server/renderToString) is a classic example.


#### `addWatchFile` option

[Section titled addWatchFile option](#addwatchfile-option)
**Type:** `URL | string`


If your integration depends on some configuration file that Vite doesn’t watch and/or needs a full dev server restart to take effect, add it with `addWatchFile`. Whenever that file changes, the Astro dev server will be reloaded (you can check when a reload happens with `isRestart`).


Example usage:







```
// Must be an absolute path!addWatchFile('/home/user/.../my-config.json');addWatchFile(new URL('./tailwind.config.js', config.root));
```

#### `addClientDirective` option

[Section titled addClientDirective option](#addclientdirective-option)

**Added in:**
`astro@2.6.0`



**Type:** `(directive:` [`ClientDirectiveConfig`](https://github.com/withastro/astro/blob/00327c213f74627ac9ca1dec774efa5bf71e9375/packages/astro/src/%40types/astro.ts#L1872-L1875) `) => void;`


Adds a [custom client directive](/en/reference/directives-reference/#custom-client-directives) to be used in `.astro` files.


Note that directive entrypoints are only bundled through esbuild and should be kept small so they don’t slow down component hydration.


Example usage:




astro.config.mjs


```
import { defineConfig } from 'astro/config';import clickDirective from './astro-click-directive/register.js'
// https://astro.build/configexport default defineConfig({  integrations: [    clickDirective()  ],});
```



astro\-click\-directive/register.js


```
/** * @type {() => import('astro').AstroIntegration} */export default () => ({  name: "client:click",  hooks: {    "astro:config:setup": ({ addClientDirective }) => {      addClientDirective({        name: "click",        entrypoint: "./astro-click-directive/click.js",      });    },  },});
```



astro\-click\-directive/click.js


```
/** * Hydrate on first click on the window * @type {import('astro').ClientDirective} */export default (load, opts, el) => {  window.addEventListener('click', async () => {    const hydrate = await load()    await hydrate()  }, { once: true })}
```

You can also add types for the directives in your library’s type definition file:




astro\-click\-directive/index.d.ts


```
import 'astro'declare module 'astro' {  interface AstroClientDirectives {    'client:click'?: boolean  }}
```

#### `addDevToolbarApp` option

[Section titled addDevToolbarApp option](#adddevtoolbarapp-option)

**Added in:**
`astro@3.4.0`



**Type:** `(pluginEntrypoint: string) => void;`


Adds a [custom dev toolbar app](/en/reference/dev-toolbar-app-reference/).


Example usage:




astro.config.mjs


```
import { defineConfig } from 'astro/config';import devToolbarIntegration from './astro-dev-toolbar-app/integration.js'
// https://astro.build/configexport default defineConfig({  integrations: [    devToolbarIntegration()  ],});
```



astro\-dev\-toolbar\-app/integration.js


```
/** * @type {() => import('astro').AstroIntegration} */export default () => ({  name: "dev-toolbar-app",  hooks: {    "astro:config:setup": ({ addDevToolbarApp }) => {      addDevToolbarApp("./astro-dev-toolbar-app/plugin.js");    },  },});
```



astro\-dev\-toolbar\-app/plugin.js


```
/** * @type {import('astro').DevToolbarApp} */export default {  id: "my-plugin",  name: "My Plugin",  icon: "<svg>...</svg>",  init() {    console.log("I'm a dev toolbar app!")  },};
```

#### `addMiddleware` option

[Section titled addMiddleware option](#addmiddleware-option)

**Added in:**
`astro@3.5.0`



**Type:** `(middleware:` [`AstroIntegrationMiddleware`](https://github.com/withastro/astro/blob/852ac0f75dfca1b2602e9cdbfa0447d9998e2449/packages/astro/src/%40types/astro.ts#L2124-L2127) `) => void;`


Adds [middleware](/en/guides/middleware/) to run on each request. Takes the `entrypoint` module that contains the middleware, and an `order` to specify whether it should run before (`pre`) other middleware or after (`post`).




@my\-package/integration.js


```
/** * @type {() => import('astro').AstroIntegration} */export default () => ({  name: "my-middleware-package",  hooks: {    "astro:config:setup": ({ addMiddleware }) => {        addMiddleware({          entrypoint: '@my-package/middleware',          order: 'pre'        });    },  },});
```

Middleware is defined in a package with an `onRequest` function, as with user\-defined middleware.




@my\-package/middleware.js


```
import { defineMiddleware } from 'astro:middleware';
export const onRequest = defineMiddleware(async (context, next) => {  if(context.url.pathname === '/some-test-path') {    return Response.json({      ok: true    });  }
  return next();});
```

#### `injectRoute` option

[Section titled injectRoute option](#injectroute-option)
**Type:** `({ pattern: string, entrypoint: string }) => void;`


A callback function to inject routes into an Astro project. Injected routes can be [`.astro` pages](/en/basics/astro-pages/) or [`.js` and `.ts` route handlers](/en/guides/endpoints/#static-file-endpoints).


`injectRoute` takes an object with a `pattern` and an `entrypoint`.


* `pattern` \- where the route should be output in the browser, for example `/foo/bar`. A `pattern` can use Astro’s filepath syntax for denoting dynamic routes, for example `/foo/[bar]` or `/foo/[...bar]`. Note that a file extension is **not** needed in the `pattern`.
* `entrypoint` \- a bare module specifier pointing towards the `.astro` page or `.js`/`.ts` route handler that handles the route denoted in the `pattern`.


##### Example usage

[Section titled Example usage](#example-usage)





```
injectRoute({  // Use Astro’s pattern syntax for dynamic routes.  pattern: '/subfolder/[dynamic]',  // Use relative path syntax for a local route.  entrypoint: './src/dynamic-page.astro'});
```

For an integration designed to be installed in other projects, use its package name to refer to the route entrypoint.
The following example shows a package published to npm as `@fancy/dashboard` injecting a dashboard route:







```
injectRoute({  pattern: '/fancy-dashboard',  entrypoint: '@fancy/dashboard/dashboard.astro'});
```

When publishing your package (`@fancy/dashboard`, in this case) to npm, you must export `dashboard.astro` in your `package.json`:




package.json


```
{  "name": "@fancy/dashboard",  // ...  "exports": { "./dashboard.astro": "./dashboard.astro" }}
```

#### `injectScript` option

[Section titled injectScript option](#injectscript-option)
**Type:** `(stage: InjectedScriptStage, content: string) => void;`


A callback function to inject a string of JavaScript content onto every page.


The **`stage`** denotes how this script (the `content`) should be inserted. Some stages allow inserting scripts without modification, while others allow optimization during [Vite’s bundling step](https://vite.dev/guide/build.html):


* `"head-inline"`: Injected into a script tag in the `<head>` of every page. **Not** optimized or resolved by Vite.
* `"before-hydration"`: Imported client\-side, before the hydration script runs. Optimized and resolved by Vite.
* `"page"`: Similar to `head-inline`, except that the injected snippet is handled by Vite and bundled with any other `<script>` tags defined inside of Astro components on the page. The script will be loaded with a `<script type="module">` in the final page output, optimized and resolved by Vite.
* `"page-ssr"`: Imported as a separate module in the frontmatter of every Astro page component. Because this stage imports your script, the `Astro` global is not available and your script will only be run once when the `import` is first evaluated.


The main use for the `page-ssr` stage is injecting a CSS `import` into every page to be optimized and resolved by Vite:







```
injectScript('page-ssr', 'import "global-styles.css";');
```


### `astro:config:done`

[Section titled astro:config:done](#astroconfigdone)
**Previous hook:** [`astro:config:setup`](#astroconfigsetup)


**Next hook:** [`astro:server:setup`](#astroserversetup) when running in “dev” mode, or [`astro:build:start`](#astrobuildstart) during production builds


**When:** After the Astro config has resolved and other integrations have run their `astro:config:setup` hooks.


**Why:** To retrieve the final config for use in other hooks.







```
'astro:config:done'?: (options: {  config: AstroConfig;  setAdapter: (adapter: AstroAdapter) => void;  injectTypes: (injectedType: { filename: string; content: string }) => URL;  logger: AstroIntegrationLogger;}) => void | Promise<void>;
```

#### `config` option

[Section titled config option](#config-option-1)
**Type:** `AstroConfig`


A read\-only copy of the user\-supplied [Astro config](/en/reference/configuration-reference/). This is resolved *after* other integrations have run.


#### `setAdapter` option

[Section titled setAdapter option](#setadapter-option)
**Type:** `(adapter: AstroAdapter) => void;`


Makes the integration an adapter. Read more in the [adapter API](/en/reference/adapter-reference/).


#### `injectTypes` options

[Section titled injectTypes options](#injecttypes-options)

**Added in:**
`astro@4.14.0`



**Type:** `(injectedType: { filename: string; content: string }) => URL`


Allows you to inject types into your user’s project by adding a new `*.d.ts` file.


The `filename` property will be used to generate a file at `/.astro/integrations/<normalized_integration_name>/<normalized_filename>.d.ts` and must end with `".d.ts"`.


The `content` property will create the body of the file and must be valid TypeScript.


Additionally, `injectTypes()` returns a URL to the normalized path so you can overwrite its content later on, or manipulate it in any way you want.







```
const path = injectTypes({  filename: "types.d.ts",  content: "declare module 'virtual:integration' {}"})console.log(path) // URL
```

### `astro:server:setup`

[Section titled astro:server:setup](#astroserversetup)
**Previous hook:** [`astro:config:done`](#astroconfigdone)


**Next hook:** [`astro:server:start`](#astroserverstart)


**When:** Just after the Vite server is created in “dev” mode, but before the `listen()` event is fired. [See Vite’s createServer API](https://vite.dev/guide/api-javascript.html#createserver) for more.


**Why:** To update Vite server options and middleware.







```
'astro:server:setup'?: (options: { server: vite.ViteDevServer }) => void | Promise<void>;
```

#### `server` option

[Section titled server option](#server-option)
**Type:** [`ViteDevServer`](https://vite.dev/guide/api-javascript.html#vitedevserver)


A mutable instance of the Vite server used in “dev” mode. For instance, this is [used by our Partytown integration](/en/guides/integrations-guide/partytown/) to inject the Partytown server as middleware:







```
export default {  name: 'partytown',  hooks: {    'astro:server:setup': ({ server }) => {      server.middlewares.use(        function middleware(req, res, next) {          // handle requests        }      );    }  }}
```

### `astro:server:start`

[Section titled astro:server:start](#astroserverstart)
**Previous hook:** [`astro:server:setup`](#astroserversetup)


**Next hook:** [`astro:server:done`](#astroserverdone)


**When:** Just after the server’s `listen()` event has fired.


**Why:** To intercept network requests at the specified address. If you intend to use this address for middleware, consider using `astro:server:setup` instead.







```
'astro:server:start'?: (options: { address: AddressInfo }) => void | Promise<void>;
```

#### `address` option

[Section titled address option](#address-option)
**Type:** [`AddressInfo`](https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules__types_node_net_d_._net_.addressinfo.html)


The address, family and port number supplied by the [Node.js Net module](https://nodejs.org/api/net.html).


### `astro:server:done`

[Section titled astro:server:done](#astroserverdone)
**Previous hook:** [`astro:server:start`](#astroserverstart)


**When:** Just after the dev server is closed.


**Why:** To run any cleanup events you may trigger during the `astro:server:setup` or `astro:server:start` hooks.







```
'astro:server:done'?: () => void | Promise<void>;
```

### `astro:build:start`

[Section titled astro:build:start](#astrobuildstart)
**Previous hook:** [`astro:config:done`](#astroconfigdone)


**Next hook:** [`astro:build:setup`](#astrobuildsetup)


**When:** After the `astro:config:done` event, but before the production build begins.


**Why:** To set up any global objects or clients needed during a production build. This can also extend the build configuration options in the [adapter API](/en/reference/adapter-reference/).







```
'astro:build:start'?: () => void | Promise<void>;
```

### `astro:build:setup`

[Section titled astro:build:setup](#astrobuildsetup)
**Previous hook:** [`astro:build:start`](#astrobuildstart)


**Next hook:** [`astro:build:ssr`](#astrobuildssr)


**When:** After the `astro:build:start` hook, runs immediately before the build.


**Why:** At this point, the Vite config for the build has been completely constructed, this is your final chance to modify it. This can be useful for example to overwrite some defaults. If you’re not sure whether you should use this hook or `astro:build:start`, use `astro:build:start` instead.







```
'astro:build:setup'?: (options: {  vite: ViteConfigWithSSR;  pages: Map<string, PageBuildData>;  target: 'client' | 'server';}) => void | Promise<void>;
```

### `astro:build:generated`

[Section titled astro:build:generated](#astrobuildgenerated)
**Previous hook:** [`astro:build:setup`](#astrobuildsetup)


**When:** After a static production build has finished generating routes and assets.


**Why:** To access generated routes and assets **before** build artifacts are cleaned up. This is a very uncommon use case. We recommend using [`astro:build:done`](#astrobuilddone) unless you really need to access the generated files before cleanup.







```
'astro:build:generated'?: (options: { dir: URL }) => void | Promise<void>;
```

### `astro:build:ssr`

[Section titled astro:build:ssr](#astrobuildssr)
**Previous hook:** [`astro:build:setup`](#astrobuildsetup)


**When:** After a production SSR build has completed.


**Why:** To access the SSR manifest and map of the emitted entry points. This is useful when creating custom SSR builds in plugins or integrations.


* `entryPoints` maps a page route to the physical file emitted after the build;
* `middlewareEntryPoint` is the file system path of the middleware file;







```
'astro:build:ssr'?: (options: {    manifest: SerializedSSRManifest,    entryPoints: Map<RouteData, URL>,    middlewareEntryPoint: URL}) => void | Promise<void>;
```

### `astro:build:done`

[Section titled astro:build:done](#astrobuilddone)
**Previous hook:** [`astro:build:ssr`](#astrobuildssr)


**When:** After a production build (SSG or SSR) has completed.


**Why:** To access generated routes and assets for extension (ex. copy content into the generated `/assets` directory). If you plan to transform generated assets, we recommend exploring the [Vite Plugin API](https://vite.dev/guide/api-plugin.html) and [configuring via `astro:config:setup`](#updateconfig-option) instead.







```
'astro:build:done'?: (options: { dir: URL; routes: RouteData[], pages: { pathname: string }[] }) => void | Promise<void>;
```

#### `dir` option

[Section titled dir option](#dir-option)
**Type:** [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL)


A URL path to the build output directory. Note that if you need a valid absolute path string, you should use Node’s built\-in [`fileURLToPath`](https://nodejs.org/api/url.html#urlfileurltopathurl) utility.







```
import { writeFile } from 'node:fs/promises';import { fileURLToPath } from 'node:url';
export default function myIntegration() {  return {    hooks: {      'astro:build:done': async ({ dir }) => {        const metadata = await getIntegrationMetadata();        // Use fileURLToPath to get a valid, cross-platform absolute path string        const outFile = fileURLToPath(new URL('./my-integration.json', dir));        await writeFile(outFile, JSON.stringify(metadata));      }    }  }}
```

#### `routes` option

[Section titled routes option](#routes-option)
**Type:** [`RouteData[]`](#routedata-type-reference)


A list of all generated routes alongside their associated metadata.


You can reference the full `RouteData` type below, but the most common properties are:


* `component` \- the input file path relative to the project root
* `pathname` \- the output file URL (undefined for routes using `[dynamic]` and `[...spread]` params)


##### `RouteData` type reference

[Section titled RouteData type reference](#routedata-type-reference)





```
interface RouteData {  /** Whether a given route is an HTML page or non-HTML endpoint */  type: 'page' | 'endpoint';  /** Source component URL */  component: string;  /**   * Output URL pathname where this route will be served   * note: will be undefined for [dynamic] and [...spread] routes   */  pathname?: string;  /**   * regex used for matching an input URL against a requested route   * ex. "[fruit]/about.astro" will generate the pattern: /^\/([^/]+?)\/about\/?$/   * where pattern.test("banana/about") is "true"   */  pattern: RegExp;  /**   * Dynamic and spread route params   * ex. "/pages/[lang]/[..slug].astro" will output the params ['lang', '...slug']   */  params: string[];  /**   * Similar to the "params" field, but with more associated metadata   * ex. "/pages/[lang]/index.astro" will output the segments   * [[ { content: 'lang', dynamic: true, spread: false } ]]   */  segments: { content: string; dynamic: boolean; spread: boolean; }[][];  /**   * Function to render component in-place from a set of input data.   * This is typically for internal use, so call with caution!   */  generate: (data?: any) => string;}
```

#### `pages` option

[Section titled pages option](#pages-option)
**Type:** `{ pathname: string }[]`


A list of all generated pages. It is an object with one property.


* `pathname` \- the finalized path of the page.


### `astro:route:setup`

[Section titled astro:route:setup](#astroroutesetup)

**Added in:**
`astro@4.14.0`



**When:** In `astro dev`, whenever a route is requested. In `astro build`, while bundling and transforming a route file.


**Why:** To set options for a route at build or request time, such as enabling [on\-demand server rendering](/en/guides/server-side-rendering/#opting-in-to-pre-rendering-in-server-mode).







```
'astro:route:setup'?: (options: { route: RouteOptions }) => void | Promise<void>;
```

#### `route` option

[Section titled route option](#route-option)
**Type:** `RouteOptions`


An object with a `component` property to identify the route and the following additional values to allow you to configure the generated route: `prerender`.


The `component` property is a readonly string path relative to the project root, e.g `"src/pages/blog/[slug].astro"`.


##### `route.prerender`

[Section titled route.prerender](#routeprerender)
**Type:** `boolean`  

**Default:** `undefined`  



**Added in:**
`astro@4.14.0`

The `prerender` property is used to configure [on\-demand server rendering](/en/guides/server-side-rendering/#opting-in-to-pre-rendering-in-server-mode) for a route. If the route file contains an explicit `export const prerender` value, the value will be used as the default instead of `undefined`.




astro.config.mjs


```
import { defineConfig } from 'astro/config';
export default defineConfig({  integrations: [setPrerender()],});
function setPrerender() {  return {    name: 'set-prerender',    hooks: {      'astro:route:setup': ({ route }) => {        if (route.component.endsWith('/blog/[slug].astro')) {          route.prerender = true;        }      },    },  };}
```

If the final value after running all the hooks is `undefined`, the route will fall back to a prerender default based on the [`output` option](/en/reference/configuration-reference/#output): prerendered for `hybrid` mode, and on\-demand rendered for `server` mode.


### Custom hooks

[Section titled Custom hooks](#custom-hooks)
Custom hooks can be added to integrations by extending the `IntegrationHooks` interface through [global augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#global-augmentation).







```
declare global {  namespace Astro {    export interface IntegrationHook {      'your:hook': (params: YourHookParameters) => Promise<void>    }  }}
```

Astro reserves the `astro:` prefix for future built\-in hooks. Please choose a different prefix when naming your custom hook.


### `HookParameters`

[Section titled HookParameters](#hookparameters)
You can get the type of a hook’s arguments by passing the hook’s name to the `HookParameters` utility type. In the following example, a function’s `options` argument is typed to match the parameters of the `astro:config:setup` hook:







```
import type { HookParameters } from 'astro';
function mySetup(options: HookParameters<'astro:config:setup'>) {  options.updateConfig({ /* ... */ });}
```

Allow installation with `astro add`
-----------------------------------

[Section titled Allow installation with astro add](#allow-installation-with-astro-add)
[The `astro add` command](/en/reference/cli-reference/#astro-add) allows users to easily add integrations and adapters to their project. If you want *your* integration to be installable with this tool, **add `astro-integration` to the `keywords` field in your `package.json`**:







```
{  "name": "example",  "keywords": ["astro-integration"],}
```

Once you [publish your integration to npm](https://docs.npmjs.com/cli/v8/commands/npm-publish), running `astro add example` will install your package with any peer dependencies specified in your `package.json`. This will also apply your integration to the user’s `astro.config` like so:




astro.config.mjs


```
import { defineConfig } from 'astro/config'; import example from 'example';
export default defineConfig({  integrations: [example()],})
```

Caution

This assumes your integration definition is 1\) a `default` export and 2\) a function. Ensure this is true before adding the `astro-integration` keyword!


`AstroIntegrationLogger`
------------------------

[Section titled AstroIntegrationLogger](#astrointegrationlogger)
An instance of the Astro logger, useful to write logs. This logger uses the same [log level](/en/reference/cli-reference/#--verbose)
configured via CLI.


**Methods available** to write to terminal:


* `logger.info("Message")`;
* `logger.warn("Message")`;
* `logger.error("Message")`;
* `logger.debug("Message")`;


All the messages are prepended with a label that has the same value of the integration.




integration.ts


```
import type { AstroIntegration } from "astro";export function formatIntegration(): AstroIntegration {    return {        name: "astro-format",        hooks: {            "astro:build:done": ({ logger }) => {                // do something                logger.info("Integration ready.");            }        }    }}
```

The example above will log a message that includes the provided `info` message:




Terminal window


```
[astro-format] Integration ready.
```

To log some messages with a different label, use the `.fork` method to specify an alternative to the default `name`:




integration.ts


```
import type { AstroIntegration } from "astro";export function formatIntegration(): AstroIntegration {    return {        name: "astro-format",        hooks: {            "astro:config:done": ({ logger }) => {                // do something                logger.info("Integration ready.");            },            "astro:build:done": ({ logger }) => {                const buildLogger = logger.fork("astro-format/build");                // do something                buildLogger.info("Build finished.")            }        }    }}
```

The example above will produce logs with `[astro-format]` by default, and `[astro-format/build]` when specified:




Terminal window


```
[astro-format] Integration ready.[astro-format/build] Build finished.
```

Integration Ordering
--------------------

[Section titled Integration Ordering](#integration-ordering)
All integrations are run in the order that they are configured. For instance, for the array `[react(), svelte()]` in a user’s `astro.config.*`, `react` will run before `svelte`.


Your integration should ideally run in any order. If this isn’t possible, we recommend documenting that your integration needs to come first or last in your user’s `integrations` configuration array.


Combine integrations into presets
---------------------------------

[Section titled Combine integrations into presets](#combine-integrations-into-presets)
An integration can also be written as a collection of multiple, smaller integrations. We call these collections **presets.** Instead of creating a factory function that returns a single integration object, a preset returns an *array* of integration objects. This is useful for building complex features out of multiple integrations.







```
integrations: [  // Example: where examplePreset() returns: [integrationOne, integrationTwo, ...etc]  examplePreset()]
```

Community Resources
-------------------

[Section titled Community Resources](#community-resources)
* [Build your own Astro Integrations](https://www.freecodecamp.org/news/how-to-use-the-astro-ui-framework/#chapter-8-build-your-own-astro-integrations-1) \- by Emmanuel Ohans on FreeCodeCamp
* [Astro Integration Template](https://github.com/florian-lefebvre/astro-integration-template) \- by Florian Lefebvre on GitHub


Reference