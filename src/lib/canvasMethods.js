import {
  randomItemFromArray,
  WIDTH,
  HEIGHT,
  BACKGROUND_COLOR,
  randomNumber,
} from './index'

import { fonts, colorPalettes } from 'data'

const trueFalse = ['true', '']
const fontStyles = ['italic', 'bold', 'normal']

export const generateGradientColor = (canvas, fabric, palette) => {
  const xAngle1 = Math.floor(Math.random() * 360)
  const xAngle2 = Math.floor(Math.random() * 360)
  const yAngle1 = Math.floor(Math.random() * 360)

  let coords

  const textArray = ['linear', 'radial']

  const num = HEIGHT / 2
  const radius = num + WIDTH / 4
  const type = randomItemFromArray(textArray)

  if (type == 'radial') {
    coords = {
      r1: radius,
      r2: WIDTH * 0.05,

      x1: WIDTH / 2,
      y1: HEIGHT / 2,

      x2: WIDTH / 2,
      y2: HEIGHT / 2,
    }
  } else {
    coords = { x1: xAngle1, y1: yAngle1, x2: xAngle2, y2: HEIGHT }
  }

  const linearGradient = new fabric.Gradient({
    type: type,
    gradientUnits: 'percentage',
    coords: coords,

    colorStops: [
      { offset: 0, color: palette[0] },
      { offset: 0.5, color: palette[1] },
      { offset: 1, color: palette[2] },
    ],
  })
  canvas.setBackgroundColor(linearGradient)
  canvas.renderAll()
}

export const clearCanvas = (canvas) => {
  canvas.setBackgroundColor(BACKGROUND_COLOR)
  canvas.remove(...canvas.getObjects())
}
export const createTextLayer = (canvas, keyword, fabric, palette, font) => {
  clearCanvas(canvas)

  const shadowType = randomItemFromArray(trueFalse)

  const isFontGrad = randomItemFromArray(trueFalse)

  const fontStyle = randomItemFromArray(fontStyles)

  const text = new fabric.Textbox(keyword, {
    left: canvas.width / 2,
    top: canvas.height / 2,
    fontFamily: font || 'Inter',
    fontSize: canvas.width / 8,
    fill: palette[3],
    shadow:
      shadowType === ''
        ? `${
            palette[3]
          } ${randomNumber()}px ${randomNumber()}px ${randomNumber()}px`
        : '',
    // stroke: strokeType === '' ? '' : randomColor(),
    strokeWidth: 2,
    lineHeight: 0.85,
    textAlign: 'center',
    fontStyle: fontStyle,
    // underline: isUnderlined === '' ? false : true,
    width: canvas.getWidth() - 10,
    fontCharacterStyle: 'Caps',
  })
  canvas.add(text)
  isFontGrad === ''
    ? text.set(
        'fill',
        new fabric.Gradient({
          type: 'linear',
          gradientUnits: 'pixels', // or 'percentage'
          coords: { x1: 0, y1: text.height, x2: text.width, y2: 0 },
          colorStops: [
            { offset: 0, color: palette[3] },
            { offset: 0.3, color: palette[4] },
            { offset: 0.5, color: palette[0] },
            { offset: 0.7, color: palette[1] },
            { offset: 1, color: palette[2] },
          ],
        }),
      )
    : text.set({ fill: palette[3] })
  // c.renderAll()

  const h = canvas.getHeight() - text.get('height')
  const w = canvas.getWidth() - 2
  text.set('top', h / 2)
  text.set('left', w / 2)
  limitMovement(text, canvas)
  text.centerH().setCoords()
  canvas.renderAll()
}

export const getRandomColorPalette = () => {
  return randomItemFromArray(colorPalettes)
}

export const getRandomFont = () => {
  return randomItemFromArray(fonts)
}

export const limitMovement = (obj, c) => {
  if (obj && obj.get('type') === 'textbox') {
    if (obj.height > c.height || obj.width > c.width) {
      // obj.set({ scaleY: obj.scaleY });
      // obj.set({ scaleX: obj.scaleX });
      setTimeout(() => {
        obj.scaleToHeight(c.height - 10)
        // console.log("scale ev");
        scaletextbox()
      }, 1000)
    }
    obj.setCoords()
    if (
      obj.getBoundingRect().top - obj.cornerSize / 2 < 0 ||
      obj.getBoundingRect().left - obj.cornerSize / 2 < 0
    ) {
      obj.top = Math.max(
        obj.top,
        obj.top - obj.getBoundingRect().top + obj.cornerSize / 2,
      )
      obj.left = Math.max(
        obj.left,
        obj.left - obj.getBoundingRect().left + obj.cornerSize / 2,
      )
      // console.log("first");
    }
    if (
      obj.getBoundingRect().top +
        obj.getBoundingRect().height +
        obj.cornerSize >
        c.height ||
      obj.getBoundingRect().left +
        obj.getBoundingRect().width +
        obj.cornerSize >
        c.width
    ) {
      obj.top = Math.min(
        obj.top,
        c.height -
          obj.getBoundingRect().height +
          obj.top -
          obj.getBoundingRect().top -
          obj.cornerSize / 2,
      )
      obj.left = Math.min(
        obj.left,
        c.width -
          obj.getBoundingRect().width +
          obj.left -
          obj.getBoundingRect().left -
          obj.cornerSize / 2,
      )
      // console.log("second");
    }
  }
}

const scaletextbox = (c) => {
  const obj = c.getActiveObject()
  obj.setCoords()
  const brNew = obj.getBoundingRect()

  const canw = c.width - 10
  const canh = c.height - 10

  if (brNew.width + brNew.left >= canw) {
    const rto = Math.round(brNew.width + brNew.left - canw)
    obj.set({ left: obj.left + rto })
    c.renderAll()
  } else if (brNew.height + brNew.top >= canh) {
    const rto = Math.round(brNew.height + brNew.top - canh)
    obj.set({ top: obj.top - rto })
    c.renderAll()
  }
}
