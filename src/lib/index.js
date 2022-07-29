// contants

export const BACKGROUND_COLOR = 'rgb(229 ,231, 235 ,1)'
export const WIDTH = 600
export const HEIGHT = 700

// functions

// create base text layer
export const createTextLayer = (c, keyword, fabric) => {
  c.setBackgroundColor(BACKGROUND_COLOR)
  c.remove(...c.getObjects())
  var text = new fabric.Text(keyword, {
    left: c.width / 2,
    top: c.height / 2,
    fontFamily: 'Inter',
    shadow: 'green -5px -5px 3px',
    stroke: '#c3bfbf',
    strokeWidth: 3,
    textBackgroundColor: 'rgb(0,200,0)',
    lineHeight: 0.85,
  })
  c.add(text)
  let h = c.getHeight() - text.get('height')
  let w = c.getWidth() - 2
  text.set('top', h / 2)
  text.set('left', w / 2)
  text.centerH().setCoords()
  c.renderAll()
}

// create random color

export const generateGradientColor = (c, fabric) => {
  let hexString = '0123456789abcdef'
  let randomColor = () => {
    let hexCode = '#'
    for (let i = 0; i < 6; i++) {
      hexCode += hexString[Math.floor(Math.random() * hexString.length)]
    }
    return hexCode
  }

  let generateGrad = () => {
    let colorOne = randomColor()
    let colorTwo = randomColor()
    let colorThree = randomColor()
    let xAngle1 = Math.floor(Math.random() * 360)
    let xAngle2 = Math.floor(Math.random() * 360)
    let yAngle1 = Math.floor(Math.random() * 360)
    // let yAngle2 = Math.floor(Math.random() * 360)

    const gradient = new fabric.Gradient({
      type: 'linear',
      gradientUnits: 'pixels',
      coords: { x1: xAngle1, y1: yAngle1, x2: xAngle2, y2: HEIGHT },
      colorStops: [
        { offset: 0, color: colorOne },
        { offset: 0.5, color: colorTwo },
        { offset: 1, color: colorThree },
      ],
    })
    c.setBackgroundColor(gradient)
    c.renderAll()
    // outputColor.style.background = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
    // outputCode.value = `background: linear-gradient(${angle}deg, ${colorOne}, ${colorTwo});`;
  }
  generateGrad()
}
