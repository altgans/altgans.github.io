import fs from "fs";
import path from "path";
import postcss from "postcss";
import cssnano from "cssnano";
import tailwindcss from "@tailwindcss/postcss";

export default function (eleventyConfig) {
  const processor = postcss([
    tailwindcss(),
    cssnano({ preset: "default" })
  ]);

  const tailwindInputPath = path.resolve("./src/styles/index.css");
  const tailwindOutputPath = "./dist/styles/index.css";

  async function buildCSS() {
    const cssContent = fs.readFileSync(tailwindInputPath, "utf8");

    const outputDir = path.dirname(tailwindOutputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const result = await processor.process(cssContent, {
      from: tailwindInputPath,
      to: tailwindOutputPath,
    });

    fs.writeFileSync(tailwindOutputPath, result.css);
  }

  // Initial build before Eleventy runs
  eleventyConfig.on("eleventy.before", async () => {
    await buildCSS();
  });

  // Watch source files for changes
  eleventyConfig.addWatchTarget("./src/");

  // Rebuild CSS on watch changes
  eleventyConfig.on("eleventy.afterWatch", async (changedFiles) => {
    if (changedFiles.some((file) => file.endsWith(".css"))) {
      await buildCSS();
    }
  });

  return {
    dir: { input: "src", output: "dist" },
  };
}

