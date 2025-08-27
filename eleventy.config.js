import tailwindcss from 'eleventy-plugin-tailwindcss-4'
import { RenderPlugin } from "@11ty/eleventy";

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
};

export const config = {
  htmlTemplateEngine: "njk",
  dir: {
    input: "src",
    output: "dist"
  },
};
