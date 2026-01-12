import type { BrushFunction } from "../types";

export const sprayBrush: BrushFunction = ({ ctx, width, color, point }) => {
    const density = Math.max(100, width * 4)
    const radius = width * 14

    // Extraer el color para añadirle transparencia individual (recomendado rgba)
    ctx.save();

    for (let i = 0; i < density; i++) {
        // Genera un ángulo aleatorio (0 a 360 grados)
        const angle = Math.random() * Math.PI * 2;

        // Al usar Math.random() * Math.random(), los puntos se concentran 
        // mucho más en el centro y se dispersan orgánicamente hacia fuera.
        const r = (Math.random() * Math.random()) * radius;

        const x = point.x + Math.cos(angle) * r;
        const y = point.y + Math.sin(angle) * r;

        const proximity = 1 - (r / radius); // 1 en el centro, 0 en el borde
        const alpha = proximity * 0.5; // Ajusta este 0.5 para más o menos cobertura

        ctx.fillStyle = color; //usar una función para inyectar el alpha aquí
        ctx.globalAlpha = alpha;

        ctx.beginPath()
        // Variar el tamaño de la partícula (0.5 a 1.5) da textura de pintura real
        const dotSize = Math.random() * 1.2;
        ctx.arc(x, y, dotSize, 0, Math.PI * 2);

        ctx.fill()
    }

    ctx.restore();
}