import { Injectable, signal } from "@angular/core";
import { Brush } from "../types";

@Injectable({
    providedIn: 'root'
})
export class ToolStore {
    color = signal<string>("#000000");
    size = signal<number>(5);
    brush = signal<Brush>("pencil");

    setColor(color: string) {
        this.color.set(color);
    }

    setSize(size: number) {
        this.size.set(size);
    }

    setBrush(brush: Brush) {
        this.brush.set(brush);
    }

}