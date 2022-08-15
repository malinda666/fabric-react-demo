// import { createNoise3D } from 'simplex-noise'
import { createVoronoiTessellation } from '@georgedoescode/generative-utils'

import { randomItemFromArray, randomNumber } from './index'

import { WIDTH, HEIGHT } from 'data'

import { circle, arc, triangle, rectangle } from './shapeBuilders'

// recursive patterns
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

// algorithmic patterns
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

// normal patterns
export const tiledLines = (ctx, palette) => {
  const step = randomNumber(5, 25)
  ctx.strokeStyle = randomItemFromArray(palette)
  ctx.fillStyle = randomItemFromArray(palette)
  ctx.lineWidth = 2
  ctx.lineCap = 'square'
  ctx.beginPath()

  for (let x = 0; x <= WIDTH; x += step) {
    for (let y = 0; y <= HEIGHT; y += step) {
      if (Math.random() >= 0.5) {
        ctx.moveTo(x, y)
        ctx.lineTo(x + step, y + step)
      } else {
        ctx.moveTo(x + step, y)
        ctx.lineTo(x, y + step)
      }
    }
  }

  ctx.stroke()
  ctx.fill()
}

export const circuit = (ctx, palette) => {
  const size = WIDTH

  const circleSize = 4
  const step = 20
  const iterations = size

  function addCircle(x, y, color) {
    ctx.beginPath()
    // arc(x, y, radius, startAngle, endAngle, anticlockwise)
    ctx.arc(x, y, circleSize, 0, Math.PI * 2)
    ctx.fillStyle = randomItemFromArray(palette)
    ctx.fill()
    ctx.strokeStyle = color
    ctx.stroke()
  }

  function draw(x, y, width, height) {
    const leftToRight = Math.random() > 0.5
    ctx.strokeStyle = randomItemFromArray(palette)

    if (leftToRight) {
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + width, y + height)
      ctx.stroke()
    } else {
      ctx.beginPath()
      ctx.moveTo(x + width, y)
      ctx.lineTo(x, y + height)
      ctx.stroke()
    }

    if (x > 5 && y > 5) {
      addCircle(
        x,
        y,
        leftToRight
          ? randomItemFromArray(palette)
          : randomItemFromArray(palette),
      )
    }
  }
  // draw(0, 0, size, size)

  for (let x = 0; x < iterations; x += step) {
    for (let y = 0; y < iterations; y += step) {
      draw(x, y, step, step)
    }
  }
}

export const dark = (ctx) => {
  const size = WIDTH
  const dpr = window.devicePixelRatio
  // ctx.width = size * dpr
  // ctx.height = size * dpr
  ctx.scale(dpr, dpr)

  ctx.lineWidth = 2
  ctx.lineCap = 'round'

  const step = 20
  const aThirdOfHeight = size / 3

  function draw(x, y, width, height, positions) {
    ctx.save()
    ctx.translate(x + width / 2, y + height / 2)
    ctx.rotate(Math.random() * 5)
    ctx.translate(-width / 2, -height / 2)

    for (let i = 0; i <= positions.length; i++) {
      ctx.beginPath()
      ctx.moveTo(positions[i] * width, 0)
      ctx.lineTo(positions[i] * width, height)
      ctx.stroke()
    }

    ctx.restore()
  }

  for (let y = step; y < size - step; y += step) {
    for (let x = step; x < size - step; x += step) {
      if (y < aThirdOfHeight) {
        draw(x, y, step, step, [0.5])
      } else if (y < aThirdOfHeight * 2) {
        draw(x, y, step, step, [0.2, 0.8])
      } else {
        draw(x, y, step, step, [0.1, 0.5, 0.9])
      }
    }
  }
}

export const bauhaus2 = (ctx, palette) => {
  const countBorder = randomNumber(4, 16)
  const blockSize = WIDTH / countBorder
  const width = WIDTH
  const height = HEIGHT
  const modes = [semiDual, shark, oneSemi, mess, rotateSemi, pear, chain]
  const currModeFn = semiDual
  const colorSchemes = [
    ['#152A3B', '#158ca7', '#F5C03E', '#D63826', '#F5F5EB'],
    ['#0F4155', '#288791', '#7ec873', '#F04132', '#fcf068'],
    ['#E8614F', '#F3F2DB', '#79C3A7', '#668065', '#4B3331'],
  ]
  let queueNum = [0, 1, 2, 3, 4]
  const clrs = colorSchemes[0]

  function paper() {
    ctx.save()
    for (let i = 0; i < WIDTH - 1; i += 2) {
      for (let j = 0; j < HEIGHT - 1; j += 2) {
        const grey = ~~random(205 - 20, 205 - 30)
        ctx.fillStyle = 'rgba(' + grey + ',' + grey + ',' + grey + ', .1)'
        rect(i, j, 2, 2)
      }
    }

    for (let i = 0; i < 30; i++) {
      const grey = ~~random(130, 215)
      const opacity = (random(100, 170) / 255).toFixed(2)
      ctx.fillStyle =
        'rgba(' + grey + ',' + grey + ',' + grey + ', ' + opacity + ')'
      rect(
        random(0, WIDTH - 2),
        random(0, HEIGHT - 2),
        random(1, 3),
        random(1, 3),
      )
    }

    ctx.restore()
  }

  function random(min, max) {
    if (!min && min !== 0) {
      return Math.random()
    } else if (!max) {
      return Math.random() * min
    }

    return Math.random() * (max - min) + min
  }

  function background() {
    ctx.save()
    ctx.fillStyle = randomItemFromArray(palette)
    ctx.fillRect(-2, -2, WIDTH, HEIGHT)
    ctx.restore()
  }

  function deg2rad(degrees) {
    return (degrees * Math.PI) / 180
  }

  function rect(x, y, w, h) {
    ctx.fillRect(x - w / 2, y - h / 2, w, h)
  }

  function arc(x, y, w, startAng, endAng) {
    ctx.beginPath()
    ctx.arc(x, y, w / 2, startAng, endAng)
    ctx.fill()
  }
  function chain(x, y, clrs) {
    ctx.rotate(deg2rad(90 * Math.round(random(1, 5))))
    ctx.fillStyle = clrs[queueNum[1]]
    arc(x - blockSize / 2, y, blockSize, deg2rad(270), deg2rad(450))
    ctx.fillStyle = clrs[queueNum[2]]
    arc(x + blockSize / 2, y, blockSize, deg2rad(90), deg2rad(270))

    ctx.rotate(deg2rad(90 * Math.round(random(1, 5))))
    ctx.fillStyle = clrs[queueNum[1]]
    arc(x, y + blockSize / 2, blockSize, deg2rad(180), deg2rad(360))
    ctx.fillStyle = clrs[queueNum[2]]
    arc(x, y - blockSize / 2, blockSize, deg2rad(0), deg2rad(180))
  }

  function pear(x, y, clrs) {
    ctx.rotate(deg2rad(90 * Math.round(random(1, 5))))

    ctx.fillStyle = clrs[queueNum[1]]
    arc(x - blockSize / 2, y, blockSize, deg2rad(270), deg2rad(450))
    ctx.fillStyle = clrs[queueNum[2]]
    arc(x + blockSize / 2, y, blockSize, deg2rad(90), deg2rad(270))

    ctx.fillStyle = clrs[queueNum[1]]
    arc(x, y + blockSize / 2, blockSize, deg2rad(180), deg2rad(360))
    ctx.fillStyle = clrs[queueNum[2]]
    arc(x, y - blockSize / 2, blockSize, deg2rad(0), deg2rad(180))
  }

  function rotateSemi(x, y, clrs) {
    ctx.rotate(deg2rad(90 * Math.round(random(1, 5))))
    ctx.fillStyle = clrs[queueNum[1]]
    arc(-blockSize / 2, 0, blockSize, deg2rad(270), deg2rad(450))
  }

  function mess(x, y, clrs) {
    ctx.fillStyle = clrs[queueNum[Math.floor(random(queueNum.length))]]
    arc(-blockSize / 2, 0, blockSize, deg2rad(270), deg2rad(450))
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = clrs[queueNum[Math.floor(random(queueNum.length))]]
      ctx.rotate(deg2rad(90 * Math.round(random(1, 5))))
      arc(x, y + blockSize / 2, blockSize, deg2rad(270), deg2rad(450))
    }
  }

  function oneSemi(x, y, clrs) {
    if (random(1) > 0.2) {
      ctx.fillStyle = clrs[queueNum[Math.floor(random(queueNum.length))]]
      arc(x - blockSize / 2, y, blockSize, deg2rad(270), deg2rad(450))
    }
  }

  function shark(x, y, clrs) {
    ctx.fillStyle = clrs[queueNum[Math.floor(random(queueNum.length))]]
    ctx.beginPath()
    if (random(1) > 0.4) {
      ctx.lineTo(x, y + blockSize / 2)
      arc(x, y + blockSize / 2, blockSize, deg2rad(270), deg2rad(360))
      ctx.lineTo(x, y + blockSize / 2)
    } else {
      ctx.lineTo(x, y - blockSize / 2)
      arc(x, y - blockSize / 2, blockSize, deg2rad(450), deg2rad(540))
      ctx.lineTo(x, y - blockSize / 2)
    }
    ctx.closePath()
    ctx.fill()
  }

  function semiDual(x, y, clrs) {
    ctx.rotate(deg2rad(90 * Math.round(random(1, 5))))
    if (random() > 0.005) {
      ctx.fillStyle = clrs[queueNum[1]]
      arc(x - blockSize / 2, y, blockSize, deg2rad(270), deg2rad(450))
      ctx.fillStyle = clrs[queueNum[2]]
      arc(x + blockSize / 2, y, blockSize, deg2rad(90), deg2rad(270))
    }
  }

  function shuffleArray(array) {
    let j, temp
    for (let i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1))
      temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }

    return array
  }

  function resetPatchwork(modeFn) {
    const currModeFn = modeFn || currModeFn
    draw()
  }
  function draw() {
    background(25)
    for (let y = blockSize / 2; y < height; y += blockSize) {
      for (let x = blockSize / 2; x < width; x += blockSize) {
        queueNum = shuffleArray([0, 1, 2, 3, 4])
        ctx.fillStyle = clrs[queueNum[0]]
        rect(x, y, blockSize, blockSize)

        ctx.save()
        ctx.translate(x, y)
        currModeFn(0, 0, clrs)
        ctx.restore()
      }
    }
    paper()
  }
  resetPatchwork(randomItemFromArray(modes))
}
export const stripes = (ctx, palette) => {
  const orientations = ['vertical', 'horizontal', 'angled']
  const color1 = randomItemFromArray(palette)
  const color2 = randomItemFromArray(palette)
  const numberOfStripes = randomNumber(10, 40)
  const thickness = WIDTH / numberOfStripes
  const orientation = randomItemFromArray(orientations)

  if (orientation === 'angled') {
    for (let i = 0; i < numberOfStripes * 2; i++) {
      ctx.beginPath()
      ctx.strokeStyle = i % 2 ? color1 : color2
      ctx.lineWidth = thickness
      ctx.lineCap = 'round'

      ctx.moveTo(i * thickness + thickness / 2 - WIDTH, 0)
      ctx.lineTo(0 + i * thickness + thickness / 2, WIDTH)
      ctx.stroke()
    }
  } else {
    for (let i = 0; i < numberOfStripes; i++) {
      ctx.beginPath()
      ctx.strokeStyle = i % 2 ? color1 : color2
      ctx.lineWidth = thickness
      ctx.lineCap = 'round'

      if (orientation === 'vertical') {
        ctx.moveTo(i * thickness + thickness / 2, 0)
        ctx.lineTo(i * thickness + thickness / 2, WIDTH)
      } else {
        ctx.moveTo(0, i * thickness + thickness / 2)
        ctx.lineTo(WIDTH, i * thickness + thickness / 2)
      }
      ctx.stroke()
    }
  }
}
export const checkers = (ctx, palette) => {
  // const orientations = ['vertical', 'horizontal', 'angled']
  const color1 = randomItemFromArray(palette)
  // const color2 = randomItemFromArray(palette)
  const dimension = randomNumber(3, 40)
  const step = dimension * 2
  const limit = WIDTH + 50

  ctx.fillStyle = color1

  for (let i = 0; i < limit; i += step) {
    for (let j = 0; j < limit; j += step) {
      ctx.beginPath()
      rectangle(ctx, j, i, dimension)

      ctx.fill()
    }
  }
  for (let i = dimension; i < limit; i += step) {
    for (let j = dimension; j < limit; j += step) {
      ctx.beginPath()
      rectangle(ctx, i, j, dimension)

      ctx.fill()
    }
  }
}
