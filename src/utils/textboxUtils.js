export function fitTextOnCanvas(canvas, text, fontface, fontweight) {
  const ctx = canvas.getContext('2d')
  // start with a large font size
  let fontsize = 1024

  // lower the font size until the text fits the canvas
  do {
    fontsize--

    ctx.font = fontweight
      ? fontweight + ' ' + fontsize + 'px ' + fontface
      : fontsize + 'px ' + fontface
  } while (ctx.measureText(text).width > canvas.width)
  // console.log("00000");
  return fontsize
}
