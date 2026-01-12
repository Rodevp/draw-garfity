import type { BrushFunction } from "../types";

export const chiselBrush: BrushFunction = ({ ctx, point, lastPoint, color, width }) => {
    if (!lastPoint) return;

    ctx.fillStyle = color;

    const angle = Math.PI / 4;

    const dist = Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y);
    const steps = Math.max(1, Math.ceil(dist / 2)); // Pasos para evitar huecos en trazos rápidos

    for (let i = 0; i <= steps; i++) {
        // Interpolación para que la línea sea continua
        const x = lastPoint.x + (point.x - lastPoint.x) * (i / steps);
        const y = lastPoint.y + (point.y - lastPoint.y) * (i / steps);

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        // Dibujamos la "punta" del rotulador. 
        // En lugar de un trazo de línea, dibujamos un rectángulo fino y alto.
        // Esto crea la variación de grosor según la dirección del movimiento.
        // El 'width' controla la altura de la punta, y el grosor fijo (2-4px) el ancho
        ctx.fillRect(-1, -width / 2, 2, width);

        ctx.restore();
    }

    // Un "brillo" sutil para que parezca tinta fresca
    ctx.globalCompositeOperation = 'source-over';
};