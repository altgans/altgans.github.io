---
title: Adding wikilinks to Eleventy (this blog)
tags: posts
date: 2025-10-08
---

## Goal

I want to be able to use wikilinks (`[[` link `]]`) in my notes, and then have these wikilinks link properly on my hosted website, similar how it links locally.

## Do it yourself (will do so in the future)

Works, but I ran into some small annoyances I didn't want to fix everything myself



```js
// Works, but ugly 
// 	To improve:
// 	- need to slugify all url links
// 	- ensure that urls are short (two words)

eleventyConfig.addFilter("wikify", (content = "") =>
	content.replace(/\[\[([^\]|]+)(\|([^\]]+))?\]\]/g, (_, target, __, alias) => {
		const slug = slugify(target, { lower: true, remove: /[*+~.()'"!?:@]/g });
		const text = alias || target;
		const link = '<a href=\"../' + slug + "\">" + text + "</a>";
		// return `[${text}](./${slug})`;
		return link
	})
);
```

This is then used as an eleventy filter in my templates: (`content | wikify | safe`).

## Use a markdown-it plugin (didn't work)

Not sure what I did wrong; it compiles, but no changes happen.

```js
// Doesn't work
eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(wikilinks, {
	// Match [[Page]] or [[Page|Label]]
	// baseURL: '/wiki/',           // Prefix for all wikilinks
	// uriSuffix: '/',              // Add trailing slash
	// makeAllLinksAbsolute: false, // If true, /wiki/Page instead of wiki/Page
	htmlAttributes: {
		class: 'wikilink',         // Add class to generated <a>
	},
	// postProcessPageName: (pageName) => {
	//   // Convert to slug
	//   return slugify(pageName, { lower: true, remove: /[*+~.()'"!?:@]/g });
	// }
}));
```

## Use an eleventy plugin

Someone else had the same problem and fixed it -- why fix it myself?

[Link to plugin](https://github.com/photogabble/eleventy-plugin-interlinker). [Link to writeup](https://photogabble.co.uk/projects/eleventyjs-interlink-plugin/).

```js
eleventyConfig.addPlugin(interlinker, {
	defaultLayout: "_includes/markdown.njk",
	deadLinkReport: "console"
});
```


## Lessons learned

- Slugify your links. `use-LLM` is different from `use-llm`..
