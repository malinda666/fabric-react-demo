export const capitalize = (obj) => {
  const txtLines = obj.textLines
  const finalTexts = []
  for (let i = 0; i < txtLines.length; i++) {
    const t = obj.textLines[i]
    const _t = t[0].toUpperCase() + t.substring(1)
    finalTexts.push(_t)
  }
  // console.log(finalTexts.join(' '))
  obj.text = finalTexts.join(' ')
}

export const uppercase = (obj) => {
  const txtLines = obj.textLines
  const finalTexts = []
  for (let i = 0; i < txtLines.length; i++) {
    const t = obj.textLines[i]
    const _t = t.toUpperCase()
    finalTexts.push(_t)
  }
  // console.log(finalTexts.join(' '))
  obj.text = finalTexts.join(' ')
}

export const randomUppercase = (obj) => {
  const txtLines = obj.textLines
  const finalTexts = []
  for (let i = 0; i < txtLines.length; i++) {
    const t = obj.textLines[i]
    const _t = i === 0 || i === txtLines.length - 1 ? t.toUpperCase() : t
    finalTexts.push(_t)
  }
  // console.log(finalTexts.join(' '))
  obj.text = finalTexts.join(' ')
}
