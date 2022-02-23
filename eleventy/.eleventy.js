const mdxPlugin = require("@jamshop/eleventy-plugin-mdx")
const { remarkCodeHike } = require("@code-hike/mdx")
const theme = require("shiki/themes/nord.json")

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy({
    "node_modules/@code-hike/mdx/dist/index.css": "css/codehike.css",
  })
  eleventyConfig.addPlugin(mdxPlugin, {
    includeCDNLinks: true,
    mdxOptions: { remarkPlugins: [[remarkCodeHike, { theme }]] },
  })
}
