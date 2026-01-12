import type { BrushFunction } from "../types"

export const acrylicBrush: BrushFunction = ({ ctx, point, lastPoint, color, width }) => {
    if (!lastPoint) return

    ctx.strokeStyle = color
    ctx.lineCap = "round"

    // Dibujamos 3-5 líneas casi juntas para crear textura de cerdas
    for (let i = 0; i < 3; i++) {
        const offset = (i - 1) * (width / 4)
        ctx.lineWidth = width * 0.6 // Líneas más finas que se solapan
        ctx.globalAlpha = 0.8 // Un poco de transparencia para que al solaparse se vea denso

        ctx.beginPath()
        ctx.moveTo(lastPoint.x + offset, lastPoint.y + offset)
        ctx.lineTo(point.x + offset, point.y + offset)
        ctx.stroke()
    }
    ctx.globalAlpha = 1.0
}