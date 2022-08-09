import {
  randomItemFromArray,
  WIDTH,
  HEIGHT,
  BACKGROUND_COLOR,
  randomNumber,
} from './index'

export const createArc = (ctx) => {
  const angle = Math.random() * 6.2
  const x1 = randomNumber(WIDTH / -2, HEIGHT / 2) + Math.sin(angle)
  const y1 = randomNumber(WIDTH / -2, HEIGHT / 2) + Math.sin(angle)

  ctx.beginPath()
  ctx.arc(x1, y1, randomNumber(10, HEIGHT / 4), 0, 2 * Math.PI)
}

export const createLine = (ctx) => {
  const x1 = randomNumber(WIDTH / -2, HEIGHT / 2)
  const y1 = randomNumber(WIDTH / -2, HEIGHT / 2)
  const x2 = randomNumber(-WIDTH, HEIGHT)
  const y2 = randomNumber(-WIDTH, HEIGHT)

  ctx.beginPath() // Start a new path
  ctx.moveTo(x1, y1) // Move the pen to (30, 50)
  ctx.lineTo(x2, y2) // Draw a line to (150, 100)
}

export const createCurvedLine = (ctx) => {
  ctx.beginPath()
  for (let i = 0; i < WIDTH / 2; i++) {
    ctx.lineTo(
      i,
      randomNumber(-WIDTH, HEIGHT) - Math.sin(i * (Math.PI / 180)) * 50,
    )
  }
}
