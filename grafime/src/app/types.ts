
type Brush = "pencil" | "eraser" | "acrylic" | "spray" | "spray-rafash" | "chisel"

type Point = { x: number; y: number }

type Stroke = {
    points: Point[]
    brush: Brush
    color: string
    width: number
}

type BrushInput = {
    ctx: CanvasRenderingContext2D
    point: Point
    lastPoint: Point | null
    pressure: number
    speed: number
    width: number
    color: string
}

type BrushFunction = (input: BrushInput) => void

export type { Point, Stroke, BrushInput, Brush, BrushFunction }