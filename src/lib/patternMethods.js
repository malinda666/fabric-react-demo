import { createNoise3D } from 'simplex-noise'
import { createVoronoiTessellation } from '@georgedoescode/generative-utils'

import { randomItemFromArray, WIDTH, HEIGHT, randomNumber } from './index'

import { circle, arc, triangle, rectangle } from './shapeBuilders'

export const createArc = (ctx) => {
  const angle = Math.random() * 6.2
  const x1 = randomNumber(WIDTH / -2, HEIGHT / 2) + Math.sin(angle)
  const y1 = randomNumber(WIDTH / -2, HEIGHT / 2) + Math.sin(angle)

  ctx.beginPath()
  ctx.arc(x1, y1, randomNumber(10, HEIGHT / 4), 0, 2 * Math.PI)
  ctx.stroke()
  ctx.fill()
}

export const createLine = (ctx) => {
  const x1 = randomNumber(WIDTH / -2, HEIGHT / 2)
  const y1 = randomNumber(WIDTH / -2, HEIGHT / 2)
  const x2 = randomNumber(-WIDTH, HEIGHT)
  const y2 = randomNumber(-WIDTH, HEIGHT)

  ctx.beginPath() // Start a new path
  ctx.moveTo(x1, y1) // Move the pen to (30, 50)
  ctx.lineTo(x2, y2) // Draw a line to (150, 100)
  ctx.stroke()
  ctx.fill()
}

export const createTriangle = (ctx) => {
  const angle = Math.random() * 6.2
  const x1 = randomNumber(WIDTH / -2, HEIGHT / 2) + Math.sin(angle)
  const x2 = randomNumber(WIDTH / -2, HEIGHT / 2) + Math.sin(angle)
  const y1 = randomNumber(WIDTH / -2, HEIGHT / 2) + Math.sin(angle)
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, x1)
  ctx.lineTo(x2, y1)
  ctx.stroke()
  ctx.fill()
}

export const createSpiral = (ctx) => {
  const angle = Math.random() * 6.2
  const x1 = randomNumber(WIDTH / 40, HEIGHT / 40) + Math.sin(angle)
  // const x2 = randomNumber(WIDTH / -2, HEIGHT / 2) + Math.sin(angle)
  const y1 = randomNumber(WIDTH / -2, HEIGHT / 2) + Math.sin(angle)
  const steps = 4
  const radiusOffset = Math.sin(x1) * 6
  const rad = WIDTH * 0.33 + radiusOffset
  const spin = y1 * 0.15
  ctx.beginPath()

  for (let i = 0; i < steps; i++) {
    // Find out how far along we are in our circle
    const t = i / steps

    // To create a full circle, we multiply `t` by 2PI
    // Then we offset the angle by the total spin
    const angle = t * Math.PI * 2 + spin

    // Define the coordinates for a unit circle in -1..1 space
    const cx = Math.cos(angle) * rad * -1
    const cy = Math.sin(angle) * rad

    // Draw a line to this vertex
    ctx.lineTo(cx, cy)
    ctx.lineWidth = 2
  }

  ctx.stroke()
  ctx.fill()
}

export const bauhaus = (ctx, palette) => {
  function scaleCtx(ctx, width, height, elementWidth, elementHeight) {
    const ratio = Math.max(elementWidth / width, elementHeight / height)
    const centerShiftX = (elementWidth - width * ratio) / 2
    const centerShiftY = (elementHeight - height * ratio) / 2

    ctx.setTransform(ratio, 0, 0, ratio, centerShiftX, centerShiftY)
  }

  const patternSize = WIDTH
  const patternDetail = randomNumber(2, 64)
  const colors = palette

  // random.use(SeedRandom(seed))

  scaleCtx(ctx, patternSize, patternSize, WIDTH, HEIGHT)

  const cellSize = patternSize / patternDetail

  for (let x = 0; x < patternSize; x += cellSize) {
    for (let y = 0; y < patternSize; y += cellSize) {
      const color = colors[randomNumber(0, colors.length - 1)]
      ctx.fillStyle = color

      const cx = x + cellSize / 2
      const cy = y + cellSize / 2

      const shapeChoice = randomItemFromArray([
        'circle',
        'arc',
        'rectangle',
        'triangle',
      ])

      const rotationDegrees = randomItemFromArray([0, 90, 180])

      ctx.save()

      ctx.translate(cx, cy)
      ctx.rotate((rotationDegrees * Math.PI) / 180)
      ctx.translate(-cx, -cy)

      switch (shapeChoice) {
        case 'circle':
          circle(ctx, cx, cy, cellSize / 2)
          break
        case 'arc':
          arc(ctx, cx, cy, cellSize / 2)
          break
        case 'rectangle':
          rectangle(ctx, cx, cy, cellSize)
          break
        case 'triangle':
          triangle(ctx, cx, cy, cellSize)
          break
      }

      ctx.fill()
      // ctx.stroke()
      ctx.restore()
    }
  }
}

export const voronoi = (ctx, palette) => {
  const background = randomItemFromArray(palette)
  const seed = 123456
  const colors = palette

  ctx.fillStyle = background
  ctx.fillRect(-3, -3, WIDTH, HEIGHT)

  const { cells } = createVoronoiTessellation({
    WIDTH,
    HEIGHT,
    points: [...Array(24)].map(() => ({
      x: randomNumber(0, WIDTH),
      y: randomNumber(0, HEIGHT),
    })),
  })

  cells.forEach((cell) => {
    ctx.fillStyle = colors[randomNumber(0, colors.length - 1)]

    const cx = cell.centroid.x
    const cy = cell.centroid.y

    ctx.save()

    ctx.translate(cx, cy)
    ctx.rotate((randomNumber(0, 360) / 180) * Math.PI)
    ctx.translate(-cx, -cy)

    ctx.beginPath()
    ctx.arc(
      cell.centroid.x,
      cell.centroid.y,
      cell.innerCircleRadius * 0.75,
      0,
      Math.PI * randomNumber(1, 2),
    )
    ctx.fill()

    if (randomNumber(0, 1) > 0.25) {
      ctx.fillStyle = background
      ctx.beginPath()
      ctx.arc(
        cell.centroid.x,
        cell.centroid.y,
        (cell.innerCircleRadius * 0.75) / 2,
        0,
        Math.PI * 2,
      )
      ctx.fill()
    }

    ctx.restore()
  })
}
// confetti
export const specks = (ctx, palette) => {
  const colors = palette
  const count = 3000
  const minSize = 1
  const maxSize = randomNumber(3, 6)

  for (let i = 0; i < count; i++) {
    const x = randomNumber(0, WIDTH)
    const y = randomNumber(0, HEIGHT)
    const radius = randomNumber(minSize, maxSize)

    ctx.fillStyle = colors[randomNumber(0, colors.length - 1)]

    ctx.save()

    ctx.translate(x, y)
    ctx.rotate(((randomNumber(0, 360) * 180) / Math.PI) * 2)
    ctx.translate(-x, -y)

    ctx.beginPath()
    ctx.ellipse(x, y, radius, radius / 2, 0, Math.PI * 2, 0)
    triangle(ctx, x, y, radius)
    ctx.fill()

    ctx.restore()
  }
}
