const parse5 = require('parse5')

const themes = require('./themes')
const highlightCode = require('./highlightCode')
const getNodeTokenClass = require('./getNodeTokenClass')

const drawHighlightedCode = (ctx, codeObject, x, y, lineHeight = 1) => {
  const { code, language, theme = themes.dark } = codeObject

  const colors = typeof theme === 'string' ? themes[theme] : theme

  if (!colors) {
    throw new Error(`Theme "${theme}" not found`)
  }

  const htmlHighlightedCode = highlightCode(code, language).replace(/\n/g, '<br>')

  const parsedCode = parse5.parse(htmlHighlightedCode)
  const codeNodes = parsedCode.childNodes[0].childNodes[1].childNodes

  const fontSize = parseInt(ctx.font.match(/\d+/)[0]) || 10
  
  ctx.save()

  ctx.textBaseline = 'top'
  ctx.textAlign = 'right'

  let indent = 0
  let lineIndex = 0

  const forEachNodes = (nodes) => {
    nodes.forEach(node => {
      if (node.nodeName === 'br') {
        indent = 0
        lineIndex += 1
  
        return
      }
  
      
      if (node.childNodes) {
        forEachNodes(node.childNodes)
      }
      
      if (node.nodeName !== '#text') {
        return
      }

      ctx.globalAlpha = 1
  
      const text = node.value || ''
      const tokenClass = getNodeTokenClass(node.parentNode)
      const color = colors[tokenClass] || colors._default || '#000'
      const textWidth = ctx.measureText(text).width
  
      indent += textWidth
  
      if (typeof color === 'object') {
        if (color.opacity) {
          ctx.globalAlpha = color.opacity
        }
        if (color.color) {
          ctx.fillStyle = color
        }
      } else {
        ctx.fillStyle = color
      }
  
      ctx.fillText(text, x + indent, y + lineIndex * fontSize * lineHeight)
    })
  }

  forEachNodes(codeNodes)

  ctx.restore()
}

module.exports = drawHighlightedCode

