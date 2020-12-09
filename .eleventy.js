const sass = require('sass')
const path = require('path')
const dirRoot = path.join(__dirname, 'src')

module.exports = (eleventyConfig) => {

  eleventyConfig.addPassthroughCopy('./src/static/js/snow.js')

  eleventyConfig.addTransform('sass', async (content, outputPath) => {
    if (outputPath.endsWith('.css')) {
      return await new Promise((resolve, reject) => {
        sass.render(
          { data: content, includePaths: [dirRoot], outputStyle: 'compressed' },
          (error, result) => error ? reject(error) : resolve(result.css)
        )
      })
    }
    return content
  })

  eleventyConfig.addShortcode('markdownIt', (mdContent) => {
    if (!mdContent) return;
    const md = require('markdown-it')({
      replaceLink: function (link, env) {
        return "https://admin.schwarz-micha.de" + link;
      }
    }).use(require('markdown-it-replace-link'));
    // console.log('mdContent', mdContent)
    return md.render(mdContent);
  })

  return {
    dir: {
      input: "src",
      output: "dist",
    }
  }
};