import type { BrushFunction } from "../types";

export const pencilBrush: BrushFunction = ({ ctx, point, lastPoint, color, width }) => {
    if (!lastPoint) return

    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    ctx.shadowBlur = width / 4
    ctx.shadowColor = color

    ctx.beginPath()
    ctx.moveTo(lastPoint.x, lastPoint.y)
    ctx.lineTo(point.x, point.y)
    ctx.stroke()

    ctx.shadowBlur = 0
} 