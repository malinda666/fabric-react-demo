export const circle = (ctx, cx, cy, radius) => {
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2)
  ctx.closePath()
}

export const arc = (ctx, cx, cy, radius) => {
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 1)
  ctx.closePath()
}

export const rectangle = (ctx, cx, cy, size) => {
  ctx.beginPath()
  ctx.rect(cx - size / 2, cy - size / 2, size, size)
  ctx.closePath()
}

export const triangle = (ctx, cx, cy, size) => {
  const originX = cx - size / 2
  const originY = cy - size / 2

  ctx.beginPath()
  ctx.moveTo(originX, originY)
  ctx.lineTo(originX + size, originY + size)
  ctx.lineTo(originX, originY + size)
  ctx.closePath()
}
