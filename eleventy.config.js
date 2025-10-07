import tailwindcss from 'eleventy-plugin-tailwindcss-4'
import { RenderPlugin } from "@11ty/eleventy";
import wikilinks from "markdown-it-wikilinks";
import slugify from "slugify";
import interlinker from "@photogabble/eleventy-plugin-interlinker";
/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default (eleventyConfig) => {
	eleventyConfig.addPlugin(RenderPlugin);
	eleventyConfig.addPlugin(tailwindcss, {
		input: 'css/tailwind.css' 
	} );
	eleventyConfig.addCollection("posts", function(collectionApi) {
		// return all Markdown files in posts folder
		return collectionApi.getFilteredByGlob("src/posts/*.md")
			.sort((a, b) => a.date - b.date); // oldest first
	});

	eleventyConfig.addPlugin(interlinker, {
		defaultLayout: "_includes/markdown.njk",
		deadLinkReport: "console"
	});
	// Doesn't work
	// eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(wikilinks, {
	// 	// Match [[Page]] or [[Page|Label]]
	// 	// baseURL: '/wiki/',           // Prefix for all wikilinks
	// 	// uriSuffix: '/',              // Add trailing slash
	// 	// makeAllLinksAbsolute: false, // If true, /wiki/Page instead of wiki/Page
	// 	htmlAttributes: {
	// 		class: 'wikilink',         // Add class to generated <a>
	// 	},
	// 	// postProcessPageName: (pageName) => {
	// 	//   // Convert to slug
	// 	//   return slugify(pageName, { lower: true, remove: /[*+~.()'"!?:@]/g });
	// 	// }
	// }));
	
	// Works, but ugly 
	// To improve:
	// - need to slugify all url links
	// - ensure that urls are short (two words)
	//
	// eleventyConfig.addFilter("wikify", (content = "") =>
	// 	content.replace(/\[\[([^\]|]+)(\|([^\]]+))?\]\]/g, (_, target, __, alias) => {
	// 		const slug = slugify(target, { lower: true, remove: /[*+~.()'"!?:@]/g });
	// 		const text = alias || target;
	// 		const link = '<a href=\"../' + slug + "\">" + text + "</a>";
	// 		// return `[${text}](./${slug})`;
	// 		return link
	// 	})
	// );
};


export const config = {
	htmlTemplateEngine: "njk",
	dir: {
		input: "src",
		output: "dist"
	},
};

