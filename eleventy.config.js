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
};


export const config = {
	htmlTemplateEngine: "njk",
	dir: {
		input: "src",
		output: "dist"
	},
};

