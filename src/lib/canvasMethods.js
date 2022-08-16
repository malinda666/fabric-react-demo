import {
  randomItemFromArray,
  randomNumber,
  getBiggestItemIndexInArray,
} from './index'

import {
  createArc,
  createLine,
  createTriangle,
  createSpiral,
  bauhaus,
  voronoi,
  specks,
  tiledLines,
  circuit,
  dark,
  bauhaus2,
  stripes,
  checkers,
  swirls,
} from './patternMethods'

import { capitalize, uppercase, randomUppercase } from './textMethods'

import {
  fonts,
  WIDTH,
  HEIGHT,
  patternsArray,
  fontStyles,
  trueFalse,
  textStyles,
  textPos,
} from 'data'

import { clearCanvas, selectObject, fitTextOnCanvas } from 'utils'

export const createGradientBackground = (canvas, fabric, palette) => {
  const xAngle1 = Math.floor(Math.random() * 360)
  const xAngle2 = Math.floor(Math.random() * 360)
  const yAngle1 = Math.floor(Math.random() * 360)

  let coords

  const types = ['linear', 'radial']

  const num = HEIGHT / 2
  const radius = num + WIDTH / 4
  const type = randomItemFromArray(types)

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

export const createTextLayer = (
  canvas,
  altCanvas,
  keyword,
  fabric,
  palette,
  font,
) => {
  clearCanvas(canvas)

  const shadowType = randomItemFromArray(trueFalse)
  const isFontGrad = randomItemFromArray(trueFalse)
  const fontStyle = randomItemFromArray(fontStyles)

  const textPosition = randomItemFromArray(textPos)
  const fontSizeD = randomNumber(6, 11)

  const text = new fabric.Textbox(keyword, {
    id: 'text_box',
    angle: 0,
    top: 0,
    fontFamily: font || 'Inter',
    fontSize: canvas.width / fontSizeD,
    fill: palette[3],
    shadow:
      shadowType === ''
        ? `${
            palette[3]
          } ${randomNumber()}px ${randomNumber()}px ${randomNumber()}px`
        : '',
    // stroke: strokeType === '' ? '' : randomColor(),
    strokeWidth: 2,
    originX: 'center',
    originY: 'center',
    textAlign: 'center',
    fontStyle: fontStyle,
    // underline: isUnderlined === '' ? false : true,
    // width: canvas.getWidth() - 30,
    fontCharacterStyle: 'Caps',
    editable: false,
    // evented: false,
    // perPixelTargetFind: false,
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

  const t = text.get('height') / 1.9
  const b = HEIGHT - t
  switch (textPosition.toLowerCase()) {
    case 'top':
      text.set('top', t + fontSizeD).setCoords()
      break
    case 'center':
      text.centerV().setCoords()
      break
    case 'bottom':
      text.set('top', b).setCoords()
      break

    default:
      break
  }

  text.centerH().setCoords()
  // text.centerV().setCoords()
  canvas.bringToFront(text)
  // setTimeout(() => {
  fitText(false, altCanvas, canvas)
  canvas.renderAll()
  canvas.discardActiveObject().renderAll()
  // }, 300)
  canvas.renderAll()
}

export const createBackground = (canvas, fabricCanvas, fabric, palette) => {
  const isPattern = ''
  // const isPattern = randomItemFromArray(trueFalse)

  const shape = new fabric.Rect({
    width: WIDTH,
    height: HEIGHT,
    left: 0,
    top: 0,
    selectable: false,
    evented: false,
  })

  if (isPattern === '') {
    shape.set('fill', createBackgroundPatterns(fabric, fabricCanvas, palette))
    fabricCanvas.add(shape)
    fabricCanvas.sendToBack(shape)
    fabricCanvas.renderAll()
  } else {
    shape.set('fill', createBackgroundGradient(fabric, palette))
    fabricCanvas.add(shape)
    fabricCanvas.sendToBack(shape)
    fabricCanvas.renderAll()
  }
}

export const createBackgroundGradient = (fabric, palette) => {
  const xAngle1 = Math.floor(Math.random() * 360)
  const xAngle2 = Math.floor(Math.random() * 360)
  const yAngle1 = Math.floor(Math.random() * 360)

  let coords

  const types = ['linear', 'radial']

  const num = HEIGHT / 2
  const radius = num + WIDTH / 4
  const type = randomItemFromArray(types)

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

  return new fabric.Gradient({
    type: type,
    gradientUnits: 'pixels',
    coords: coords,

    colorStops: [
      { offset: 0, color: palette[0] },
      { offset: 0.5, color: palette[1] },
      { offset: 1, color: palette[2] },
    ],
  })
}

const renderPattern = (p, ctx, palette) => {
  switch (p) {
    case 'arc_r':
      createArc(ctx)
      break
    case 'line_r':
      createLine(ctx)
      break

    case 'tri_r':
      createTriangle(ctx)
      break
    case 'spiral_r':
      createSpiral(ctx)
      break

    case 'bauhaus':
      bauhaus(ctx, palette)
      break
    case 'voronoi':
      voronoi(ctx, palette)
      break
    case 'specks':
      specks(ctx, palette)
      break
    case 'lines':
      tiledLines(ctx, palette)
      break
    case 'circuit':
      circuit(ctx, palette)
      break
    case 'dark':
      dark(ctx, palette)
      break
    case 'bauhaus2':
      bauhaus2(ctx, palette)
      break
    case 'stripes':
      stripes(ctx, palette)
      break
    case 'checkers':
      checkers(ctx, palette)
      break
    case 'swirls':
      swirls(ctx, palette)
      break

    default:
      break
  }
}
export const createBackgroundPatterns = (fabric, canvas, palette) => {
  const p = randomItemFromArray(patternsArray)

  const Obj = fabric.util.createClass(fabric.Object, {
    objectCaching: false,
    initialize: function (options) {
      this.callSuper('initialize', options)
      this.animDirection = 'up'
    },

    _render: function (ctx) {
      ctx.globalAlpha = randomNumber(0.3, 0.7)
      // ctx.fillRect(-this.w1 / 2, -this.h1 / 2, this.w1, this.h1)
      // ctx.fillRect(-this.w2 / 2, -this.h2 / 2, this.w2, this.h2)
      const gradient = ctx.createLinearGradient(0, 0, 200, 0)
      gradient.addColorStop(
        0,
        randomItemFromArray([palette[0], palette[2], palette[1]]),
      )
      gradient.addColorStop(
        0.5,
        randomItemFromArray([palette[0], palette[2], palette[1]]),
      )
      gradient.addColorStop(
        1,
        randomItemFromArray([palette[0], palette[2], palette[1]]),
      )
      ctx.fillStyle = gradient

      // ctx.fillStyle = randomItemFromArray([palette[0], palette[2], palette[1]])
      ctx.strokeStyle = randomItemFromArray([
        palette[0],
        palette[2],
        palette[1],
      ])

      renderPattern(p, ctx, palette)
    },
  })

  if (p.includes('_r')) {
    for (let i = 50; i >= 0; i--) {
      for (let j = 0; j < 50; j++) {
        const c = new Obj({
          top: 25 * i,
          left: 25 * j,
          selectable: false,
          evented: false,
          // backgroundColor: palette[3],
        })
        canvas.add(c)
        canvas.sendToBack(c)
      }
    }
  } else {
    const c = new Obj({
      top: 0,
      left: 0,
      selectable: false,
      evented: false,
    })
    canvas.add(c)
    canvas.sendToBack(c)
  }
}

const fitText = (cycling, canvas, mainCanvas) => {
  const ctx = canvas.getContext('2d')
  const txtBox = selectObject(mainCanvas, 'text_box')

  if (!canvas) return
  mainCanvas.setActiveObject(txtBox)

  canvas.clear()
  canvas.width = cycling ? txtBox.width : 200
  canvas.renderAll()

  txtBox.removeStyle('fontSize')
  txtBox.cleanStyle('fontSize')
  txtBox.set({ textAlign: 'center' })
  canvas.renderAll()

  const fitFont = txtBox.fontFamily
  const weight = txtBox.fontWeight
  const texts = []
  const stline = []
  const cntLines = txtBox.textLines?.length
  for (let j = 0; j < cntLines; j++) {
    const t = txtBox.textLines[j]
    const _t = t[0].toUpperCase() + t.substring(1)
    texts.push(_t)
  }
  let yPos = 0,
    fontsize
  texts.forEach(function (txt) {
    fontsize = fitTextOnCanvas(canvas, txt, fitFont, weight)
    yPos += fontsize
    // draw the text
    ctx.fillStyle = 'white'
    ctx.fillText(txt, 0, yPos)
    stline.push(fontsize)
  })
  // texts[1]
  txtBox.removeStyle('fontSize')
  txtBox.cleanStyle('fontSize')
  txtBox.removeStyle('fontWeight')
  txtBox.cleanStyle('fontWeight')
  canvas.renderAll()
  let b = 0
  const cnttextline = txtBox._textLines.length
  const biggestWordIdx = getBiggestItemIndexInArray(stline)
  const secondaryFont = randomItemFromArray(fonts).value
  const secondaryFontStyle = randomItemFromArray(fontStyles)

  for (let a = 0; a < cnttextline; a++) {
    if (!txtBox._textLines[a]) return
    const totaltextperline = txtBox._textLines[a].length
    // console.log("start:"+b);
    txtBox.setSelectionStart(b)
    b = b + totaltextperline
    // console.log("end:"+b);
    txtBox.setSelectionEnd(b)
    txtBox.setSelectionStyles({
      fontSize: stline[a],
      fontWeight: weight,
    })
    if (a === biggestWordIdx) {
      txtBox.setSelectionStyles({
        fontStyle: secondaryFontStyle,
        fontFamily: secondaryFont,
      })
      canvas.renderAll()
    }
    canvas.renderAll()
    b++
  }
  txtBox.set({
    lineHeight: 0.9,
  })

  const randomType = randomItemFromArray(textStyles)

  changeTextStyles(txtBox, randomType)

  canvas.discardActiveObject().renderAll()
}
const changeTextStyles = (obj, type) => {
  switch (type) {
    case 'capitalize':
      capitalize(obj)
      break
    case 'uppercase':
      uppercase(obj)
      break
    case 'randomUppercase':
      randomUppercase(obj)
      break

    default:
      capitalize(obj)
      break
  }
}
