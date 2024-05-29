import { Vector2 } from "../../packages/const/vector";

// 平面直线方程 Ax + by + c = 0
export class LineEquation {
  constructor(private A: number, private B: number, private C: number) {}

  // 求2直线交点
  getIntersection(LineP: LineEquation): number[] {
    const [ A1, B1, C1 ] = this.getP();
    const [ A2, B2, C2 ] = LineP.getP();
    const y = -(A2 * C1 - C2 * A2) / (A2 * B1 - B2 * A2);
    const x = (C2 * B1 - B2 * C1) / (A1 * B2 - A2 * B1);
    return [x, y];
  }

  getP() : number[] {
    return [ this.A, this.B , this.C ];
  }
}

export const getVecToLineE = (A: Vector2, B: Vector2) : LineEquation => {
  return new LineEquation(B.y - A.y, A.x - B.x, -((B.y - A.y) * A.x + (A.x - B.x) * A.y));
}