// contants
export const BACKGROUND_COLOR = 'rgb(229 ,231, 235 ,1)'
export const WIDTH = 600
export const HEIGHT = 600

// function vars
export const hexString = '0123456789abcdef'

// function utils
export const randomColor = () => {
  let hexCode = '#'
  for (let i = 0; i < 6; i++) {
    hexCode += hexString[Math.floor(Math.random() * hexString.length)]
  }
  return hexCode
}

export const randomItemFromArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

export const randomNumber = (min, max) => {
  const _min = min || -10
  const _max = max || 10
  // and the formula is:
  return Math.floor(Math.random() * (_max - _min + 1)) + _min
}

export {
  createGradientBackground,
  createTextLayer,
  createBackground,
  clearCanvas,
  getRandomColorPalette,
  getRandomFont,
} from './canvasMethods'
