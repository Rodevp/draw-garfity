import { Injectable } from "@angular/core";
import { pencilBrush } from "../brushes/pencil";
import { sprayBrush } from "../brushes/spray";
import { sprayBrushRafash } from "../brushes/spray-rafash";
import { chiselBrush } from "../brushes/chisel";
import { eraserBrush } from "../brushes/eraser";
import { acrylicBrush } from "../brushes/acrilyc";
import { BrushInput } from "../types";

@Injectable({
    providedIn: 'root'
})
export class Engine {
    constructor() { }

    private _brushes = {
        "acrilyc": acrylicBrush,
        "pencil": pencilBrush,
        "spray": sprayBrush,
        "spray-rafash": sprayBrushRafash,
        "chisel": chiselBrush,
        "eraser": eraserBrush
    }

    brush(name: string, input: BrushInput) {
        this._brushes[name as keyof typeof this._brushes](input)
    }

}