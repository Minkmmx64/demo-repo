import { isFinite } from "lodash-unified";
import { Vector2 } from "../../packages/const/vector";

// 平面直线方程 Ax + by + c = 0
export class LineEquation {

  constructor(private A: number, private B: number, private C: number) {}

  /**
   * 2点求直线一般方程
   * @param A 
   * @param B 
   * @returns {LineEquation} 直线方程
   */
  static defineLineFromTwoPoints (A: Vector2, B: Vector2) : LineEquation {
    return new LineEquation(A.y - B.y, B.x - A.x, A.x*B.y - B.x * A.y);
  }

  /**
   * 给一条直线，以及一个点，求经过该点的法线方程
   */
  static perpendicularLineEquation(Line: LineEquation, vec: Vector2) : LineEquation {
    const [ A, B, C ] = Line.getP();
    // 该直线与x轴平行
    if(B === 0) {
      return new LineEquation(vec.x,0,0);
    }
    const K = -1 * (1 / (-A/B));
    const _C = vec.y - K * vec.x;
    const _Y = 1;
    const _X = -K;
    return new LineEquation(_X, _Y, - _C);
  }

  /**
   * 给一条直线 2个点 判断 2点是否在直线同一侧
   */
  static collinearSideJudger(Line: LineEquation, V: Vector2, W: Vector2): boolean {
    return Line.getXYResult(V) * Line.getXYResult(W) > 0
  }
  
  /**
   * 直线 绕 点 旋转 pi 度 的直线方程
   */
  static rotatePoint(Line: LineEquation, vec: Vector2, rotate: number) {
    const [ A, B, C ] = Line.getP();
    // Ax + By + C = 0;
    // 
  }

  // 求2直线交点
  public getIntersection(Line: LineEquation): Vector2 {
    const [ A1, B1, C1 ] = this.getP();
    const [ A2, B2, C2 ] = Line.getP();
    const y = -(A2 * C1 - C2 * A1) / (A2 * B1 - B2 * A1);
    const x = (C2 * B1 - B2 * C1) / (A1 * B2 - A2 * B1);
    return { x, y };
  }

  /**
   * 代入点坐标求值
   */
  public getXYResult(V: Vector2) : number {
    return this.A * V.x + this.B * V.y + this.C;
  }

  //获取直线方向向量
  public getVector() : Vector2 {
    return { x: this.B , y: - this.A }
  }

  //获取系数
  public getP() : number[] { return [ this.A, this.B , this.C ]; }
  
  //获取直线斜率
  public getK() : number {
    if(this.B == 0) return Infinity;
    return - this.A / this.B;
  }
}