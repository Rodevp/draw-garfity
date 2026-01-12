import type { BrushFunction } from "../types";

export const sprayBrushRafash: BrushFunction = ({ ctx, width, color, point }) => {

    //Radio basado en el tamaño del pincel
    const radius = width * 3;

    // En lugar de muchos puntos pequeños, dibujamos "ráfagas" suaves
    // Esto crea el efecto de aura/glow
    const ráfagas = 10;

    ctx.save();

    for (let i = 0; i < ráfagas; i++) {
        // Distribución para que el centro sea más oscuro (Gaussian-ish)
        const angle = Math.random() * Math.PI * 2;
        const r = Math.pow(Math.random(), 2) * radius;

        const x = point.x + Math.cos(angle) * r;
        const y = point.y + Math.sin(angle) * r;

        // El truco maestro: Gradiente radial para cada partícula
        // Esto hace que cada gota sea sólida en su centro y transparente afuera
        const particleSize = Math.random() * (width / 2);
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, particleSize);

        // Creamos un color con transparencia (asumiendo que color es hex o similar)
        // Usamos globalAlpha para controlar la intensidad de la pintura
        ctx.globalAlpha = 0.15; // Opacidad baja para que se acumule al pasar varias veces

        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fillRect(x - particleSize, y - particleSize, particleSize * 2, particleSize * 2);
    }

    ctx.restore();
}