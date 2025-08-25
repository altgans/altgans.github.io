module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "dist": "css" });

  const markdownIt = require("markdown-it");
  eleventyConfig.setLibrary("md", markdownIt({ html: true }));

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};

