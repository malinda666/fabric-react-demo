import { colorPalettes, fonts } from 'data'

// function utils

export const randomItemFromArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

export const getBiggestItemIndexInArray = (arr) => {
  const max = Math.max(...arr)
  const index = arr.indexOf(max)

  return index
}

export const randomNumber = (min, max) => {
  const _min = min || -10
  const _max = max || 10
  // and the formula is:
  return Math.floor(Math.random() * (_max - _min + 1)) + _min
}

export const getRandomColorPalette = () => {
  return randomItemFromArray(colorPalettes)
}

export const getRandomFont = () => {
  return randomItemFromArray(fonts)
}

export {
  createGradientBackground,
  createTextLayer,
  createBackground,
} from './canvasMethods'
