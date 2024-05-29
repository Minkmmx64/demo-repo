import { Vector2 } from "@/components/m-components/packages/const/vector";
import { rAF } from "@/components/m-components/utils/AF";
import { BaseCanvas } from "@/components/m-components/utils/canvas/BaseCanvas";
import { CanvasRender } from "@/components/m-components/utils/canvas/CanvasRender";
import { Triangle } from "@/components/m-components/utils/canvas/Triangle";
import { getVecToLineE } from "@/components/m-components/utils/equation/line";

export const CanvasAreaPlayGround = (ctx: CanvasRenderingContext2D, area: number[]) => {
  const baseCanvas = new BaseCanvas(ctx, area);

  let triangle = new Triangle({x: 1000, y: 150}, { x: 600, y: 600 }, { x: 1400, y: 600 });
  
  const tran = () => {
    baseCanvas.recovery();
    //每次旋转 0.5°
    triangle = triangle.getRotate(0.1 ,triangle.getCore());
    baseCanvas.drawTriangle( triangle , new CanvasRender({ lineWidth: 10 }));

    for(let i = 0 ; i < 20; i ++) {
      const start: Vector2 = { x: 0, y: 400 + i * 4 };
      const point = triangle.getLineJD(getVecToLineE(start, { x: area[0], y: 400 + i * 4 }), start);
      baseCanvas.drawLine(start,point);
    }
    rAF(tran);

  }
  tran();
}


