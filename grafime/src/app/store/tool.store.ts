import { Injectable, signal } from "@angular/core";
import { Brush } from "../types";

@Injectable({
    providedIn: 'root'
})
export class ToolStore {
    color = signal<string>("#000000");
    size = signal<number>(5);
    brush = signal<Brush>("pencil");
    canvas = signal<HTMLCanvasElement>(null!);
    ctx = signal<CanvasRenderingContext2D>(null!);

    setColor(color: string) {
        this.color.set(color);
    }

    setSize(size: number) {
        this.size.set(size);
    }

    setBrush(brush: Brush) {
        this.brush.set(brush);
    }

    setCtx(ctx: CanvasRenderingContext2D) {
        this.ctx.set(ctx);
    }

    setCanvas(canvas: HTMLCanvasElement) {
        this.canvas.set(canvas);
    }

}   