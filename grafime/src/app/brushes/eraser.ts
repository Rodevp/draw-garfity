import type { BrushFunction } from "../types";

export const eraserBrush: BrushFunction = ({
    ctx,
    point,
    lastPoint,
    width
}) => {
    if (!lastPoint) return

    ctx.save()
    ctx.globalCompositeOperation = "destination-out"
    ctx.lineWidth = width
    ctx.lineCap = "round"

    ctx.beginPath()
    ctx.moveTo(lastPoint.x, lastPoint.y)
    ctx.lineTo(point.x, point.y)
    ctx.stroke()

    ctx.restore()
}