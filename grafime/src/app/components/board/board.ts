import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { Stroke } from "../../types";
import { Engine } from "../../services/engine";
import { ToolStore } from "../../store/tool.store";

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

    engine = inject(Engine);
    toolStore = inject(ToolStore);

    getCanvasCoordinates = (e: PointerEvent, canvas: HTMLCanvasElement) => {

        const rect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY,
        }
    }

    setupCanvas = (canvas: HTMLCanvasElement) => {
        const ctx = canvas.getContext("2d", { desynchronized: true })!;
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        ctx.setTransform(1, 0, 0, 1, 0, 0);

        return ctx;

    }

    draw = (event: PointerEvent) => {

        if (!this.drawing) return;

        const events = event.getCoalescedEvents?.() ?? [event];

        for (const e of events) {
            const point = this.getCanvasCoordinates(e, this.canvas);
            const speed = this.lastPoint
                ? Math.hypot(point.x - this.lastPoint.x, point.y - this.lastPoint.y)
                : 0;

            this.engine.brush(this.toolStore.brush(), {
                ctx: this.ctx,
                color: this.toolStore.color(),
                width: this.toolStore.size(),
                lastPoint: this.lastPoint,
                point: point,
                pressure: e.pressure || 0.5,
                speed: speed
            });

            if (this.currentStroke) this.currentStroke.points.push(point);

            this.lastPoint = point;
        }

    };

    startDraw = (event: PointerEvent) => {

        const startPoint = this.getCanvasCoordinates(event, this.canvas);

        this.canvas.setPointerCapture(event.pointerId);
        this.drawing = true;
        this.lastPoint = startPoint;

        this.currentStroke = {
            color: this.toolStore.color(),
            width: this.toolStore.size(),
            points: [startPoint],
            brush: this.toolStore.brush()
        }

        this.engine.brush(this.toolStore.brush(), {
            ctx: this.ctx,
            color: this.toolStore.color(),
            width: this.toolStore.size(),
            lastPoint: startPoint,
            point: startPoint,
            pressure: event.pressure || 0.5,
            speed: 0
        });

    };

    stopDraw = (event: PointerEvent) => {
        this.drawing = false;
        this.canvas.releasePointerCapture(event.pointerId);

        if (this.currentStroke) {
            this.strokes.push(this.currentStroke);
            this.currentStroke = null;
        }

        this.lastPoint = null;
        this.ctx.closePath();
    };

    reDraw = () => {
        if (!this.canvas || !this.ctx) return;

        const rect = this.canvas.getBoundingClientRect();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

        this.ctx.clearRect(0, 0, rect.width, rect.height);

        this.strokes.forEach(strokes => {
            for (let i = 0; i < strokes.points.length; i++) {
                this.engine.brush(strokes.brush, {
                    ctx: this.ctx,
                    color: strokes.color,
                    width: strokes.width,
                    lastPoint: strokes.points[i - 1],
                    point: strokes.points[i],
                    pressure: 0.5,
                    speed: 0
                })
            }
        })

    }

    undo = () => {
        this.strokes.pop();
        this.reDraw();
    }

    handleKeyDown = (e: KeyboardEvent) => {

        if (e.code !== "KeyZ") return;

        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            this.undo();
        }
    }

    ngOnInit(): void {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.ctx = this.setupCanvas(this.canvas);
        this.toolStore.setCtx(this.ctx);
        this.toolStore.setCanvas(this.canvas);

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