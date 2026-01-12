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

        const point = this.getCanvasCoordinates(event, this.canvas);
        const speed = this.lastPoint
            ? Math.hypot(point.x - this.lastPoint.x, point.y - this.lastPoint.y)
            : 0;

        this.engine.brush(this.currentBrush, {
            ctx: this.ctx,
            color: this.currentColor,
            width: this.currentSize,
            lastPoint: this.lastPoint,
            point: point,
            pressure: event.pressure || 0.5,
            speed: speed
        });

        if (this.currentStroke) this.currentStroke.points.push(point);

        this.lastPoint = point;

    };

    startDraw = (event: PointerEvent) => {

        this.drawing = true;
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

        if (this.currentStroke) {
            this.strokes.push(this.currentStroke);
            this.currentStroke = null;
        }

        this.lastPoint = null;
        this.ctx.closePath();
    };

    reDraw = () => {
        if (!this.canvas || this.ctx) return;

        const ctx: CanvasRenderingContext2D = this.ctx;
        const canvas: HTMLCanvasElement = this.canvas;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < this.strokes.length; i++) {
            this.engine.brush(this.strokes[i].brush, {
                ctx: ctx,
                color: this.strokes[i].color,
                width: this.strokes[i].width,
                lastPoint: this.strokes[i].points[i - 1],
                point: this.strokes[i].points[i],
                pressure: 0.5,
                speed: 0
            })
        }

    }

    undo = () => {
        this.strokes.pop();
        this.reDraw();
    }

    handleKeyDown = (e: KeyboardEvent) => {

        if (e.code !== "KeyZ") return;

        if (e.ctrlKey || e.metaKey) {
            alert(e.code);
            e.preventDefault();
            this.undo();
        }
    }

    ngOnInit(): void {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.ctx = this.setupCanvas(this.canvas);

        this.canvas.addEventListener('pointerdown', this.startDraw);
        this.canvas.addEventListener('pointermove', this.draw);
        this.canvas.addEventListener('pointerup', this.stopDraw);
        this.canvas.addEventListener('pointerleave', this.stopDraw);

        window.addEventListener('keydown', this.handleKeyDown);

    }

    ngOnDestroy(): void {
        this.canvas.removeEventListener('pointerdown', this.startDraw);
        this.canvas.removeEventListener('pointermove', this.draw);
        this.canvas.removeEventListener('pointerup', this.stopDraw);
        this.canvas.removeEventListener('pointerleave', this.stopDraw);

        window.removeEventListener('keydown', this.handleKeyDown);
    }

}