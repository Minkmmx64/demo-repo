import Vec , { Vector2 } from "@/components/m-components/packages/const/vector";
import { cAF, rAF } from "@/components/m-components/utils/AF";
import { BaseCanvas } from "@/components/m-components/utils/canvas/BaseCanvas";
import { CanvasRender } from "@/components/m-components/utils/canvas/CanvasRender";
import { Triangle } from "@/components/m-components/utils/canvas/Triangle";
import { LineEquation } from "@/components/m-components/utils/equation/line";
import { ref } from "vue";

export interface ICanvasAreaPlayGroundRT {
  usePause: () => void;
  usePlay: () => void;
  preView: () => void;
  nextView: () => void;
}

export const CanvasAreaPlayGround = (ctx: CanvasRenderingContext2D, area: number[]) : ICanvasAreaPlayGroundRT => {
  const baseCanvas = new BaseCanvas(ctx, area);
  //折射率
  const RefractiveIndex = 2.5;
  const lw = 0.4;
  const total = 100;
  let animLoop: number | void;
  let rotate = 0.2;
  let once = false;

  let triangle = new Triangle({x: 1000, y: 150}, { x: 600, y: 600 }, { x: 1400, y: 600 });

  const isPause = ref(false);

  const play = (start: Vector2, end: Vector2, index : number) => {
    //直线方程
    const line = LineEquation.defineLineFromTwoPoints(start, end);
    // 求三角形第一个相交的交点以及相交直线方程
    const [ point, equation ] = triangle.getLineJD(line , start);
    baseCanvas.drawLine(start,point, new CanvasRender({ lineWidth: lw }));
    // 根据交点 ， 三角形 直线方程 计算法线方程
    const normal = LineEquation.perpendicularLineEquation(equation, point);

    // 判断边界交点和入射点 start 是否在 直线 equation 的同一侧
    //const boundaryUp = normal.getIntersection(LineEquation.defineLineFromTwoPoints({x: 0, y: 0}, { x: area[0], y: 0 }));
    //const boundaryDown = normal.getIntersection(LineEquation.defineLineFromTwoPoints({x: 0, y: area[1]}, { x: area[0], y: area[1] }));
    //if(LineEquation.collinearSideJudger(equation ,start,boundaryUp)){
      //const [ boundaryPoint ] = triangle.getLineJD(normal, boundaryUp);
      //baseCanvas.drawLine(boundaryUp,boundaryPoint, new CanvasRender({ lineWidth: 0.1 }));
    //} else {
      //const [ boundaryPoint ] = triangle.getLineJD(normal, boundaryDown);
      //baseCanvas.drawLine(boundaryDown,boundaryPoint, new CanvasRender({ lineWidth: 0.1 }));
    //}
    //求入射角和法向量的夹角

    const V = line.getVector();
    const W = normal.getVector();
    const sin = Math.asin(Vec.vsin(V, W)) * 180 / Math.PI;
    const complexSin = sin / RefractiveIndex;
    
    const RefrainLineClockwise = LineEquation.rotatePoint(normal, point, complexSin);       
    const RefrainLineAnticlockwise = LineEquation.rotatePoint(normal, point, 360 - complexSin); 
    //判断 入射直线 和 折射直线 是否在法线和三角形直线的同侧
    let nextEquation: LineEquation, nextPoint: Vector2, nextLine: LineEquation;
    // 求2直线和三角形的交点，判断哪个交点和起点在法线2侧
    {
      const [ _nextPoint, _nextEquation ] = triangle.getLineJD(RefrainLineClockwise, point, [ equation ]);
      if(!LineEquation.collinearSideJudger(normal,start,_nextPoint)){
        baseCanvas.drawLine(point, _nextPoint, new CanvasRender({ lineWidth: lw, strokeStyle: getRgb(index) }));
        nextEquation = _nextEquation;
        nextPoint = _nextPoint;
        nextLine = RefrainLineClockwise;
      }
    }
    {
      const [ _nextPoint, _nextEquation ] = triangle.getLineJD(RefrainLineAnticlockwise, point, [ equation ]);
      if(!LineEquation.collinearSideJudger(normal,start,_nextPoint)){
        baseCanvas.drawLine(point, _nextPoint, new CanvasRender({ lineWidth: lw, strokeStyle: getRgb(index) }));
        nextEquation = _nextEquation;
        nextPoint = _nextPoint;
        nextLine = RefrainLineAnticlockwise;
      }
    }

    if(nextEquation! && nextPoint! && nextLine!) {
      const nextNormal = LineEquation.perpendicularLineEquation(nextEquation, nextPoint);
      //求入射角和法向量的夹角
      const nextV = nextLine.getVector();
      const nextW = nextNormal.getVector();
      const nextSin = Math.asin(Vec.vsin(nextV, nextW)) * 180 / Math.PI;
      const nextComplexSin = nextSin / RefractiveIndex;
      const RefrainLineClockwise = LineEquation.rotatePoint(nextNormal, nextPoint, nextComplexSin + index / 10 ); 
      const RefrainLineAnticlockwise = LineEquation.rotatePoint(nextNormal, nextPoint, 360 - nextComplexSin - index / 10 );
      
      //判断第三个点是否在st->ed向量延长线区域上
      const judge = (st: Vector2, ed: Vector2, cur: Vector2) : boolean => {
        if(st.x > ed.x) 
          return cur.x < ed.x;
        return cur.x > ed.x;
      }
      {
        const V : Vector2 = { x: RefrainLineClockwise.getX(0), y: 0 }, W : Vector2 = { x: RefrainLineClockwise.getX(area[1]), y: area[1] };
        if(judge(point, nextPoint, V)) {
          if(!LineEquation.collinearSideJudger(nextNormal, point, V) && !LineEquation.collinearSideJudger(nextEquation, point, V)) {
            baseCanvas.drawLine(nextPoint, V, new CanvasRender({ lineWidth: lw, strokeStyle: getRgb(index) }));
          }
        } else {
          if(judge(point, nextPoint, W)){
            if(!LineEquation.collinearSideJudger(nextNormal, point, W) && !LineEquation.collinearSideJudger(nextEquation, point, W)) {
              baseCanvas.drawLine(nextPoint, W, new CanvasRender({ lineWidth: lw, strokeStyle: getRgb(index) }));
            }
          }
        }
      }
      {
        const V : Vector2 = { x: RefrainLineAnticlockwise.getX(0), y: 0 }, W : Vector2 = { x: RefrainLineAnticlockwise.getX(area[1]), y: area[1] };
        if(judge(point, nextPoint, V)) {
          if(!LineEquation.collinearSideJudger(nextNormal, point, V) && !LineEquation.collinearSideJudger(nextEquation, point, V)) {
            baseCanvas.drawLine(nextPoint, V, new CanvasRender({ lineWidth: lw, strokeStyle: getRgb(index) }));
          }
        } else {
          if(judge(point, nextPoint, W)){
            if(!LineEquation.collinearSideJudger(nextNormal, point, W) && !LineEquation.collinearSideJudger(nextEquation, point, W)) {
              baseCanvas.drawLine(nextPoint, W, new CanvasRender({ lineWidth: lw, strokeStyle: getRgb(index) }));
            }
          }
        }
      }
    }
  }
  
  const getRgb = (i: number) => {
    const full = total;    //数据总数
    let r=0;
    let g=0;
    let b=0;
    if(i<full/3){
        r=255;
        g=Math.ceil(255*3*i/full);
        b=0;
    }else if(i<full/2){
        r=Math.ceil(750-i*(250*6/full));
        g=255;
        b=0;
    }else if(i<full*2/3){
        r=0;
        g=255;
        b=Math.ceil(i*(250*6/full)-750);
    }else if(i<full*5/6){
        r=0;
        g=Math.ceil(1250-i*(250*6/full));
        b=255;
    }else{
        r=Math.ceil(150*i*(6/full)-750);
        g=0;
        b=255;
    }
    return 'rgb('+r+','+g+','+b+')';
  }

  const tran = () => {
    baseCanvas.recovery();
    triangle = triangle.getRotate(rotate,triangle.getCore());
    baseCanvas.drawTriangle( triangle , new CanvasRender({ lineWidth: 5 }));
    for(let i = 0 ; i < total; i ++) {
      //play({ x: 0, y: 400 + i * lw }, { x: area[0], y: 400 + i * lw }, i); 
      let m = 2;
      while(m--){
        play({ x: area[0] + i * 0.05, y: 0 + i * lw}, { x: 0 + i * 0.05 , y: area[1]+ i * lw }, i);
      }
    }
    if(once) return;
    animLoop = rAF(tran);
  }

  const usePause = () => {
    isPause.value = true;
    if(animLoop)
      animLoop = cAF(animLoop)
  }

  const usePlay = () => {
    if(animLoop) return;
    animLoop = rAF(tran);
    once = false;
    rotate = 0.2;
  }

  const preView = () => {
    if(!isPause.value) return;
    rotate = 360 - 0.2;
    once = true;
    rAF(tran);
  }

  const nextView = () => {
    if(!isPause.value) return;
    rotate = 0.2;
    once = true;
    rAF(tran);
  }

  return {
    usePause,
    usePlay,
    preView,
    nextView
  }
}


