import Vec , { Vector2 } from "@/components/m-components/packages/const/vector";
import { rAF } from "@/components/m-components/utils/AF";
import { BaseCanvas } from "@/components/m-components/utils/canvas/BaseCanvas";
import { CanvasRender } from "@/components/m-components/utils/canvas/CanvasRender";
import { Triangle } from "@/components/m-components/utils/canvas/Triangle";
import { LineEquation } from "@/components/m-components/utils/equation/line";

export const CanvasAreaPlayGround = (ctx: CanvasRenderingContext2D, area: number[]) => {
  const baseCanvas = new BaseCanvas(ctx, area);
  //折射率
  const RefractiveIndex = 1.4700000000000000;

  let triangle = new Triangle({x: 1000, y: 150}, { x: 600, y: 600 }, { x: 1400, y: 600 });

  const play = (start: Vector2, end: Vector2) => {
    //直线方程
    const line = LineEquation.defineLineFromTwoPoints(start, end);
    // 求三角形第一个相交的交点以及相交直线方程
    const [ point, equation ] = triangle.getLineJD(line , start);
    baseCanvas.drawLine(start,point, new CanvasRender({ lineWidth: 0.1 }));
    // 根据交点 ， 三角形 直线方程 计算法线方程
    const normal = LineEquation.perpendicularLineEquation(equation, point);
    // 判断边界交点和入射点 start 是否在 直线 equation 的同一侧
    const boundaryUp = normal.getIntersection(LineEquation.defineLineFromTwoPoints({x: 0, y: 0}, { x: area[0], y: 0 }));
    const boundaryDown = normal.getIntersection(LineEquation.defineLineFromTwoPoints({x: 0, y: area[1]}, { x: area[0], y: area[1] }));
    if(LineEquation.collinearSideJudger(equation ,start,boundaryUp)){
      const [ boundaryPoint ] = triangle.getLineJD(normal, boundaryUp);
      baseCanvas.drawLine(boundaryUp,boundaryPoint, new CanvasRender({ lineWidth: 0.1 }));
    } else {
      const [ boundaryPoint ] = triangle.getLineJD(normal, boundaryDown);
      baseCanvas.drawLine(boundaryDown,boundaryPoint, new CanvasRender({ lineWidth: 0.1 }));
    }
    //求入射角和法向量的夹角
    const V = line.getVector();
    const W = normal.getVector();
    const sin = Math.asin(Vec.vsin(V, W)) * 180 / Math.PI;
    const complexSin = sin / RefractiveIndex;
    //console.log("入射角", sin, "折射角", complexSin);
    // (x, (-A/B)x-(C/B))
  }

  const tran = () => {
    baseCanvas.recovery();
    triangle = triangle.getRotate(0.1 ,triangle.getCore());
    baseCanvas.drawTriangle( triangle , new CanvasRender({ lineWidth: 5 }));
    for(let i = 0 ; i < 100; i ++) {
      play({ x: 0, y: 400 + i * 1 / 10 }, { x: area[0], y: 400 + i * 1 / 10 }); 
      play({ x: 1000 + i / 10, y: 0 }, { x: 1000 + i / 10, y: area[1] });
      play({ x: area[0] + i / 10, y: 0 + i / 10}, { x: 0 + i / 10, y: area[1]+ i / 10 });
    }
    rAF(tran);
  }
  tran();
}


