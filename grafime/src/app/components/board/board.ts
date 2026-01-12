import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
    selector: 'app-board',
    templateUrl: './board.html',
    styleUrls: ['./board.css']
})
export class BoardComponent implements OnInit, OnDestroy {

    private canvas!: HTMLCanvasElement;
    private ctx!: CanvasRenderingContext2D;
    private drawing = false;

    draw = (event: PointerEvent) => {
        if (!this.drawing) return;

        this.ctx.lineTo(event.offsetX, event.offsetY);
        this.ctx.stroke();
    };

    startDraw = (event: PointerEvent) => {
        this.drawing = true;
        this.ctx.beginPath();
        this.ctx.moveTo(event.offsetX, event.offsetY);
    };

    stopDraw = () => {
        this.drawing = false;
        this.ctx.closePath();
    };

    ngOnInit(): void {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d', { desynchronized: true }) as CanvasRenderingContext2D;

        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';


        const dpr = window.devicePixelRatio;
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;

        this.ctx.scale(dpr, dpr);

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