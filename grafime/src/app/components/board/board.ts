import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { Brush, Stroke } from "../../types";
import { Engine } from "../../services/engine";

@Component({
    selector: 'app-board',
    templateUrl: './board.html',
    styleUrls: ['./board.css']
})
export class BoardComponent implements OnInit, OnDestroy {

    private canvas!: HTMLCanvasElement;
    private ctx!: CanvasRenderingContext2D;
    private drawing = false;
    private strokes: Stroke[] = [];
    private currentStroke: Stroke | null = null;
    private lastPoint: { x: number; y: number } | null = null;
    private currentColor = 'black';
    private currentSize = 2;
    private currentBrush: Brush = "pencil"

    engine = inject(Engine);

    getCanvasCoordinates = (e: PointerEvent, canvas: HTMLCanvasElement) => {

        const rect = canvas.getBoundingClientRect();

        return {
            x: (e.clientX - rect.left),
            y: (e.clientY - rect.top),
        }
    }

    setupCanvas = (canvas: HTMLCanvasElement) => {
        const ctx = canvas.getContext("2d", { desynchronized: true })!;
        const dpr = window.devicePixelRatio;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        ctx.scale(dpr, dpr);

        return ctx;

    }

    draw = (event: PointerEvent) => {
        if (!this.drawing) return;

        this.ctx.lineTo(event.offsetX, event.offsetY);
        this.ctx.stroke();
    };

    startDraw = (event: PointerEvent) => {
        const startPoint = this.getCanvasCoordinates(event, this.canvas)
        this.lastPoint = startPoint

        this.currentStroke = {
            color: this.currentColor,
            width: this.currentSize,
            points: [startPoint],
            brush: this.currentBrush
        }

        this.ctx.beginPath();
        this.ctx.moveTo(startPoint.x, startPoint.y);

    };

    stopDraw = () => {
        this.drawing = false;
        this.ctx.closePath();
    };

    ngOnInit(): void {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.ctx = this.setupCanvas(this.canvas);

        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        console.log(this.ctx);

        this.canvas.addEventListener('pointerdown', this.startDraw);
        this.canvas.addEventListener('pointermove', this.draw);
        this.canvas.addEventListener('pointerup', this.stopDraw);
        this.canvas.addEventListener('pointerleave', this.stopDraw);

    }

    ngOnDestroy(): void {
        this.canvas.removeEventListener('pointerdown', this.startDraw);
        this.canvas.removeEventListener('pointermove', this.draw);
        this.canvas.removeEventListener('pointerup', this.stopDraw);
        this.canvas.removeEventListener('pointerleave', this.stopDraw);
    }

}