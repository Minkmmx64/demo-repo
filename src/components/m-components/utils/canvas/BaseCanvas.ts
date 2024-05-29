import { Vector2 } from "../../packages/const/vector";
import { CanvasRender } from "./CanvasRender";
import { Triangle } from "./Triangle";

/**
 * 基本绘图类
 * 提供基础绘图Api
 */
export class BaseCanvas {
  private width: number;
  private height: number;

  constructor(protected ctx: CanvasRenderingContext2D, area: number[]){
    this.width = area[0]; this.height = area[1];
  }

  public drawLine(start: Vector2, end: Vector2, material = new CanvasRender()) {
    this.setConfig(material);
    this.ctx.beginPath();
    this.ctx.moveTo(start.x, start.y);
    this.ctx.lineTo(end.x,end.y);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  public drawTriangle(triangle: Triangle, material = new CanvasRender()) {
    this.drawLine(triangle.V1,triangle.V2, material); 
    this.drawLine(triangle.V2,triangle.V3, material); 
    this.drawLine(triangle.V3,triangle.V1, material);
  }

  private setConfig(material: CanvasRender){
    this.ctx.strokeStyle = material.getProp('strokeStyle')!;
    this.ctx.lineWidth = material.getProp('lineWidth')!;
    this.ctx.lineCap = material.getProp('lineCap')!;
  }

  recovery(){
    this.ctx.clearRect(0,0,this.width,this.height);
  }
}