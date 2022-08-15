import { BACKGROUND_COLOR } from 'data'

export const selectObject = (canvas, id) => {
  let obj
  canvas.getObjects().forEach(function (o) {
    if (o.id === id) {
      canvas.setActiveObject(o)
      obj = o
    }
  })

  return obj
}
export const clearCanvas = (canvas) => {
  canvas.setBackgroundColor(BACKGROUND_COLOR)
  canvas.remove(...canvas.getObjects())
}
