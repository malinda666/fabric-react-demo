import {
  randomItemFromArray,
  WIDTH,
  HEIGHT,
  BACKGROUND_COLOR,
  randomNumber,
} from './index'

export const createArc = (ctx) => {
  ctx.beginPath()
  ctx.arc(
    randomNumber(WIDTH / -2, HEIGHT / 2),
    randomNumber(WIDTH / -2, HEIGHT / 2),
    randomNumber(10, HEIGHT / 4),
    0,
    2 * Math.PI,
  )
}

export const createLine = (ctx) => {
  ctx.beginPath() // Start a new path
  ctx.moveTo(
    randomNumber(WIDTH / -2, HEIGHT / 2),
    randomNumber(WIDTH / -2, HEIGHT / 2),
  ) // Move the pen to (30, 50)
  ctx.lineTo(randomNumber(-WIDTH, HEIGHT), randomNumber(-WIDTH, HEIGHT)) // Draw a line to (150, 100)
}
