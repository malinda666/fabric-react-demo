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

    let coords
    // let colorStops
    let angle = 180

    var textArray = ['linear', 'radial']

    // const shapeColorStops = {}
    var anglePI = -parseInt(angle, 10) * (Math.PI / 180)
    let num = HEIGHT / 2
    let radius = num + WIDTH / 4
    let type = textArray[Math.floor(Math.random() * textArray.length)]

    if (type == 'radial') {
      // the numbers for my canvas are  width="1920" height="1080"
      coords = {
        r1: radius,
        r2: WIDTH * 0.05,

        x1: WIDTH / 2, // num + size.width/6,
        y1: HEIGHT / 2, // num - size.height/10,

        x2: WIDTH / 2, // num + size.width/6,
        y2: HEIGHT / 2, // num - size.height/10,
      }
    } else {
      console.log('trying to set linear gradient')
      coords = {
        x1: (Math.round(50 + Math.sin(anglePI) * 50) * WIDTH) / 100,
        y1: (Math.round(50 + Math.cos(anglePI) * 50) * HEIGHT) / 100,
        x2: (Math.round(50 + Math.sin(anglePI + Math.PI) * 50) * WIDTH) / 100,
        y2: (Math.round(50 + Math.cos(anglePI + Math.PI) * 50) * HEIGHT) / 100,
      }
    }

    const linearGradient = new fabric.Gradient({
      type: type,
      gradientUnits: 'pixels',
      coords: coords,
      // coords: { x1: xAngle1, y1: yAngle1, x2: xAngle2, y2: HEIGHT },
      colorStops: [
        { offset: 0, color: colorOne },
        { offset: 0.5, color: colorTwo },
        { offset: 1, color: colorThree },
      ],
    })
    c.setBackgroundColor(linearGradient)
    c.renderAll()
    // outputColor.style.background = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
    // outputCode.value = `background: linear-gradient(${angle}deg, ${colorOne}, ${colorTwo});`;
  }
  generateGrad()
}
