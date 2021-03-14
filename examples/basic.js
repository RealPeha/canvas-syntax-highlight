const fs = require('fs')
const { Canvas } = require('canvas')

const { drawHighlightedCode } = require('../lib')

const canvas = new Canvas(700, 500)
const ctx = canvas.getContext('2d')

ctx.fillStyle = '#fff'
ctx.fillRect(0, 0, 700, 500)
ctx.font = '16px monospace'

const code = {
    language: 'js',
    theme: 'light',
    code: fs.readFileSync('examples/basic.js').toString('utf-8')
}

drawHighlightedCode(ctx, code, 20, 20, 1.5)

canvas.createJPEGStream().pipe(fs.createWriteStream('./image.jpg'))
