const Prism = require('prismjs')

const highlightCode = (code, language) => {
  if (!Prism.languages[language]) {
		try {
			require(`prismjs/components/prism-${language}.js`)
		} catch (e) {
			return code
		}
	}

  return Prism.highlight(
    code,
    Prism.languages[language],
    language
  )
}

module.exports = highlightCode
