---
author: AA
category:
- Two
cover: https://images.unsplash.com/photo-1463130456064-77fda7f96d6b?ixid=M3w2NzEyNTB8MHwxfHNlYXJjaHwzfHxidWlsZGluZyUyMGNvbW1pY3xlbnwwfDB8MXx8MTczMDU1Mjc1N3ww&ixlib=rb-4.0.3&w=1960&h=1102&auto=format&fit=crop&q=60
coverAlt: white concrete building wall
description: ''
pubDate: 2024-02-13 00:00:00
slug: astro-api-reference-reference-modules-astro-content
tags:
- basics
- Javascript
- Css
title: Content Collections API Reference 
---

**Added in:**
`astro@2.0.0`



Content collections offer APIs to configure and query your Markdown or MDX documents in `src/content/`. For features and usage examples, [see our content collections guide](/en/guides/content-collections/).


Imports from `astro:content`
----------------------------

[Section titled Imports from astro:content](#imports-from-astrocontent)





```
import {  z,  defineCollection,  getCollection,  getEntry,  getEntries,  reference, } from 'astro:content';
```

### `defineCollection()`

[Section titled defineCollection()](#definecollection)
**Type:** `(input: CollectionConfig) => CollectionConfig`


`defineCollection()` is a utility to configure a collection in a `src/content/config.*` file.




src/content/config.ts


```
import { z, defineCollection } from 'astro:content';const blog = defineCollection({  type: 'content',  schema: z.object({    title: z.string(),    permalink: z.string().optional(),  }),});
// Expose your defined collection to Astro// with the `collections` exportexport const collections = { blog };
```

This function accepts the following properties:


#### `type`

[Section titled type](#type)
**Type:** `'content' | 'data'`  

**Default:** `'content'`  



**Added in:**
`astro@2.5.0`

`type` is a string that defines the type of entries stored within a collection:


* `'content'` \- for content\-authoring formats like Markdown (`.md`), MDX (`.mdx`), or Markdoc (`.mdoc`)
* `'data'` \- for data\-only formats like JSON (`.json`) or YAML (`.yaml`)


Tip

This means collections **cannot** store a mix of content and data formats. You must split these entries into separate collections by type.


#### `schema`

[Section titled schema](#schema)
**Type:** `ZodType | (context: [SchemaContext](#schemacontext)) => ZodType`


`schema` is an optional Zod object to configure the type and shape of document frontmatter for a collection. Each value must use [a Zod validator](https://github.com/colinhacks/zod).


[See the `Content Collection` guide](/en/guides/content-collections/#defining-a-collection-schema) for example usage.


### `reference()`

[Section titled reference()](#reference)
**Type:** `(collection: string) => ZodEffects<ZodString, { collection, id: string } | { collection, slug: string }>`  



**Added in:**
`astro@2.5.0`

The `reference()` function is used in the content config to define a relationship, or “reference,” from one collection to another. This accepts a collection name and validates the entry identifier(s) specified in your content frontmatter or data file.


This example defines references from a blog author to the `authors` collection and an array of related posts to the same `blog` collection:







```
import { defineCollection, reference, z } from 'astro:content';
const blog = defineCollection({  type: 'content',  schema: z.object({    // Reference a single author from the `authors` collection by `id`    author: reference('authors'),    // Reference an array of related posts from the `blog` collection by `slug`    relatedPosts: z.array(reference('blog')),  })});
const authors = defineCollection({  type: 'data',  schema: z.object({ /* ... */ })});
export const collections = { blog, authors };
```

[See the `Content Collection` guide](/en/guides/content-collections/#defining-collection-references) for example usage.


### `getCollection()`

[Section titled getCollection()](#getcollection)
**Type:** `(collection: string, filter?: (entry: CollectionEntry<TCollectionName>) => boolean) => CollectionEntry<TCollectionName>[]`


`getCollection()` is a function that retrieves a list of content collection entries by collection name.


It returns all items in the collection by default, and accepts an optional `filter` function to narrow by entry properties. This allows you to query for only some items in a collection based on `id`, `slug`, or frontmatter values via the `data` object.







```
---import { getCollection } from 'astro:content';
// Get all `src/content/blog/` entriesconst allBlogPosts = await getCollection('blog');
// Only return posts with `draft: true` in the frontmatterconst draftBlogPosts = await getCollection('blog', ({ data }) => {  return data.draft === true;});---
```

[See the `Content Collection` guide](/en/guides/content-collections/#querying-collections) for example usage.


### `getEntry()`

[Section titled getEntry()](#getentry)

**Added in:**
`astro@2.5.0`



**Types:**


* `(collection: string, contentSlugOrDataId: string) => CollectionEntry<TCollectionName>`
* `({ collection: string, id: string }) => CollectionEntry<TCollectionName>`
* `({ collection: string, slug: string }) => CollectionEntry<TCollectionName>`


`getEntry()` is a function that retrieves a single collection entry by collection name and either the entry `id` (for `type: 'data'` collections) or entry `slug` (for `type: 'content'` collections). `getEntry()` can also be used to get referenced entries to access the `data`, `body`, or `render()` properties:







```
---import { getEntry } from 'astro:content';
// Get `src/content/blog/enterprise.md`const enterprisePost = await getEntry('blog', 'enterprise');
// Get `src/content/captains/picard.yaml`const picardProfile = await getEntry('captains', 'picard');
// Get the profile referenced by `data.captain`const enterpriseCaptainProfile = await getEntry(enterprisePost.data.captain);---
```

See the `Content Collections` guide for examples of [querying collection entries](/en/guides/content-collections/#querying-collections).


### `getEntries()`

[Section titled getEntries()](#getentries)

**Added in:**
`astro@2.5.0`



**Types:**


* `(Array<{ collection: string, id: string }>) => CollectionEntry<TCollectionName>[]`
* `(Array<{ collection: string, slug: string }>) => CollectionEntry<TCollectionName>[]`


`getEntries()` is a function that retrieves multiple collection entries from the same collection. This is useful for [returning an array of referenced entries](/en/guides/content-collections/#defining-collection-references) to access their associated `data`, `body`, and `render()` properties.







```
---import { getEntries } from 'astro:content';
const enterprisePost = await getEntry('blog', 'enterprise');
// Get related posts referenced by `data.relatedPosts`const enterpriseRelatedPosts = await getEntries(enterprisePost.data.relatedPosts);---
```

### `getEntryBySlug()`

[Section titled getEntryBySlug()](#getentrybyslug)
**Type:** `(collection: string, slug: string) => Promise<CollectionEntry<TCollectionName>>`


Deprecated

Use the [`getEntry()` function](#getentry) to query content entries. This accepts the same arguments as `getEntryBySlug()`, and supports querying by `id` for JSON or YAML collections.


`getEntryBySlug()` is a function that retrieves a single collection entry by collection name and entry `slug`.







```
---import { getEntryBySlug } from 'astro:content';
const enterprise = await getEntryBySlug('blog', 'enterprise');---
```

[See the `Content Collection` guide](/en/guides/content-collections/#querying-collections) for example usage.


### `getDataEntryById()`

[Section titled getDataEntryById()](#getdataentrybyid)
**Type:** `(collection: string, id: string) => Promise<CollectionEntry<TCollectionName>>`  



**Added in:**
`astro@2.5.0`

Deprecated

Use the [`getEntry()` function](#getentry) to query data entries. This accepts the same arguments as `getDataEntryById()`, and supports querying by `slug` for content authoring formats like Markdown.


`getDataEntryById()` is a function that retrieves a single collection entry by collection name and entry `id`.







```
---import { getDataEntryById } from 'astro:content';
const picardProfile = await getDataEntryById('captains', 'picard');---
```

`astro:content` types
---------------------

[Section titled astro:content types](#astrocontent-types)





```
import type {  CollectionEntry,  CollectionKey,  ContentCollectionKey,  DataCollectionKey,  SchemaContext, } from 'astro:content';
```

### `CollectionEntry`

[Section titled CollectionEntry](#collectionentry)
Query functions including [`getCollection()`](#getcollection), [`getEntry()`](#getentry), and [`getEntries()`](#getentries) each return entries with the `CollectionEntry` type. This type is available as a utility from `astro:content`:







```
import type { CollectionEntry } from 'astro:content';
```

`CollectionEntry` is a generic type. Use it with the name of the collection you’re querying.
For example, an entry in your `blog` collection would have the type `CollectionEntry<'blog'>`.


Each `CollectionEntry` is an object with the following values:


#### `id`

[Section titled id](#id)
**Available for:** `type: 'content'` and `type: 'data'` collections  

**Example Types:**


* content collections: `'entry-1.md' | 'entry-2.md' | ...`
* data collections: `'author-1' | 'author-2' | ...`


A unique ID using the file path relative to `src/content/[collection]`. Enumerates all possible string values based on the collection entry file paths. Note that collections [defined as `type: 'content'`](#type) include the file extension in their ID, while collections defined as `type: 'data'` do not.


#### `collection`

[Section titled collection](#collection)
**Available for:** `type: 'content'` and `type: 'data'` collections  

**Example Type:** `'blog' | 'authors' | ...`


The name of a top\-level folder under `src/content/` in which entries are located. This is the name used to reference the collection in your schema, and in querying functions.


#### `data`

[Section titled data](#data)
**Available for:** `type: 'content'` and `type: 'data'` collections  

**Type:** `CollectionSchema<TCollectionName>`


An object of frontmatter properties inferred from your collection schema ([see `defineCollection()` reference](#definecollection)). Defaults to `any` if no schema is configured.


#### `slug`

[Section titled slug](#slug)
**Available for:** `type: 'content'` collections only  

**Example Type:** `'entry-1' | 'entry-2' | ...`


A URL\-ready slug for Markdown or MDX documents. Defaults to the `id` without the file extension, but can be overridden by setting [the `slug` property](/en/guides/content-collections/#defining-custom-slugs) in a file’s frontmatter.


#### `body`

[Section titled body](#body)
**Available for:** `type: 'content'` collections only  

**Type:** `string`


A string containing the raw, uncompiled body of the Markdown or MDX document.


#### `render()`

[Section titled render()](#render)
**Available for:** `type: 'content'` collections only  

**Type:** `() => Promise<RenderedEntry>`


A function to compile a given Markdown or MDX document for rendering. This returns the following properties:


* `<Content />` \- A component used to render the document’s contents in an Astro file.
* `headings` \- A generated list of headings, [mirroring Astro’s `getHeadings()` utility](/en/guides/markdown-content/#available-properties) on Markdown and MDX imports.
* `remarkPluginFrontmatter`  \- The modified frontmatter object after any [remark or rehype plugins have been applied](/en/guides/markdown-content/#modifying-frontmatter-programmatically). Set to type `any`.







```
---import { getEntryBySlug } from 'astro:content';const entry = await getEntryBySlug('blog', 'entry-1');
const { Content, headings, remarkPluginFrontmatter } = await entry.render();---
```

[See the `Content Collection` guide](/en/guides/content-collections/#rendering-content-to-html) for example usage.


### `CollectionKey`

[Section titled CollectionKey](#collectionkey)

**Added in:**
`astro@3.1.0`



A string union of all collection names defined in your `src/content/config.*` file. This type can be useful when defining a generic function that accepts any collection name.







```
import { type CollectionKey, getCollection } from 'astro:content';
async function getCollection(collection: CollectionKey) {  return getCollection(collection);}
```

### `ContentCollectionKey`

[Section titled ContentCollectionKey](#contentcollectionkey)

**Added in:**
`astro@3.1.0`



A string union of all the names of `type: 'content'` collections defined in your `src/content/config.*` file.


### `DataCollectionKey`

[Section titled DataCollectionKey](#datacollectionkey)

**Added in:**
`astro@3.1.0`



A string union of all the names of `type: 'data'` collection defined in your `src/content/config.*` file.


### `SchemaContext`

[Section titled SchemaContext](#schemacontext)
The `context` object that `defineCollection` uses for the function shape of `schema`. This type can be useful when building reusable schemas for multiple collections.


This includes the following property:


* `image` \- The `image()` schema helper that allows you [to use local images in Content Collections](/en/guides/images/#images-in-content-collections)







```
import type { SchemaContext } from 'astro:content';
export const imageSchema = ({ image }: SchemaContext) =>    z.object({        image: image(),        description: z.string().optional(),    });
const blog = defineCollection({  type: 'content',  schema: ({ image }) => z.object({    title: z.string(),    permalink: z.string().optional(),    image: imageSchema({ image })  }),});
```

Reference