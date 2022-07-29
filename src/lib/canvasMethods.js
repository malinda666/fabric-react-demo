import {
  randomColor,
  randomItemFromArray,
  WIDTH,
  HEIGHT,
  BACKGROUND_COLOR,
  randomNumber,
} from './index'

const yesNoArray = ['yes', '']

export const generateGradientColor = (c, fabric) => {
  const colorOne = randomColor()
  const colorTwo = randomColor()
  const colorThree = randomColor()
  const xAngle1 = Math.floor(Math.random() * 360)
  const xAngle2 = Math.floor(Math.random() * 360)
  const yAngle1 = Math.floor(Math.random() * 360)

  let coords
  // const angle = 180

  const textArray = ['linear', 'radial']

  // var anglePI = -parseInt(angle, 10) * (Math.PI / 180)
  const num = HEIGHT / 2
  const radius = num + WIDTH / 4
  const type = randomItemFromArray(textArray)

  if (type == 'radial') {
    coords = {
      r1: radius,
      r2: WIDTH * 0.05,

      x1: WIDTH / 2, // num + size.width/6,
      y1: HEIGHT / 2, // num - size.height/10,

      x2: WIDTH / 2, // num + size.width/6,
      y2: HEIGHT / 2, // num - size.height/10,
    }
  } else {
    // coords = {
    //   x1: (Math.round(50 + Math.sin(anglePI) * 50) * WIDTH) / 100,
    //   y1: (Math.round(50 + Math.cos(anglePI) * 50) * HEIGHT) / 100,
    //   x2: (Math.round(50 + Math.sin(anglePI + Math.PI) * 50) * WIDTH) / 100,
    //   y2: (Math.round(50 + Math.cos(anglePI + Math.PI) * 50) * HEIGHT) / 100,
    // }
    coords = { x1: xAngle1, y1: yAngle1, x2: xAngle2, y2: HEIGHT }
  }

  const linearGradient = new fabric.Gradient({
    type: type,
    gradientUnits: 'pixels',
    coords: coords,

    colorStops: [
      { offset: 0, color: colorOne },
      { offset: 0.5, color: colorTwo },
      { offset: 1, color: colorThree },
    ],
  })
  c.setBackgroundColor(linearGradient)
  c.renderAll()
}

export const clearCanvas = (c) => {
  c.setBackgroundColor(BACKGROUND_COLOR)
  c.remove(...c.getObjects())
}
export const createTextLayer = (c, keyword, fabric) => {
  clearCanvas(c)

  const shadowType = randomItemFromArray(yesNoArray)
  const bgType = randomItemFromArray(yesNoArray)
  const strokeType = randomItemFromArray(yesNoArray)

  const text = new fabric.Text(keyword, {
    left: c.width / 2,
    top: c.height / 2,
    fontFamily: 'Inter',
    fontSize: c.width / 8,
    shadow:
      shadowType === ''
        ? `${randomColor()} ${randomNumber()}px ${randomNumber()}px ${randomNumber()}px`
        : '',
    stroke: strokeType === '' ? '' : randomColor(),
    strokeWidth: 2,
    textBackgroundColor: bgType === '' ? randomColor() : '',
    lineHeight: 0.85,
    padding: 50,
  })
  c.add(text)
  const h = c.getHeight() - text.get('height')
  const w = c.getWidth() - 2
  text.set('top', h / 2)
  text.set('left', w / 2)
  text.centerH().setCoords()
  c.renderAll()
}
