import { createCanvas } from 'canvas'
import { writeFileSync } from 'fs'

const SIZE = 1376
const canvas = createCanvas(SIZE, SIZE)
const ctx = canvas.getContext('2d')

ctx.fillStyle = '#0a0a0a'
ctx.fillRect(0, 0, SIZE, SIZE)

ctx.strokeStyle = '#ffffff'
ctx.lineWidth = 1.5
ctx.globalAlpha = 0.06

for (let i = -SIZE; i < SIZE * 2; i += 48) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i + SIZE, SIZE)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i - SIZE, SIZE)
    ctx.stroke()
}

ctx.globalAlpha = 1

const buffer = canvas.toBuffer('image/png')
writeFileSync('public/card-base-blindhire.png', buffer)
console.log('done')
