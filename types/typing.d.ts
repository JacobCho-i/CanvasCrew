type Draw = {
    ctx: CanvasRenderingContext2D
    currentPoint: Point
    prevPoint: Point | null
  }
  
type Room = { title: string, id: number }

type Point = { x: number; y: number }