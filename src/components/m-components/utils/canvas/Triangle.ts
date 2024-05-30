import { max, min } from "lodash-unified";
import Vec, { Vector2 } from "../../packages/const/vector";
import { LineEquation } from "../equation/line";

export class Triangle {

  constructor(public V1: Vector2, public V2: Vector2, public V3: Vector2) {}

  /**
   * 三角形重心
   */
  public getCore() : Vector2 {
    return {
      x: (this.V1.x + this.V2.x + this.V3.x) / 3,
      y: (this.V1.y + this.V2.y + this.V3.y) / 3
    }
  }

  /**
   * 绕 某点顺时针旋转 rotate
   * @param rotate 
   * @param center 
   */
  getRotate(rotate: number, center: Vector2) : Triangle {
    // 先平移到原点
    // 进行旋转
    // 平移回来
    return new Triangle(
      Vec.add(this.rotatePoint(rotate, Vec.sub(this.V1, center)), center),
      Vec.add(this.rotatePoint(rotate, Vec.sub(this.V2, center)), center),
      Vec.add(this.rotatePoint(rotate, Vec.sub(this.V3, center)), center),
    )
  }

  /**
   * 求旋转之后的3个点坐标
   * @param rotate 
   * @param vec 
   * @returns 
   */
  private rotatePoint(rotate: number, vec: Vector2) : Vector2 {
    const pi = this.pi(rotate);
    return {
      x: vec.x * Math.cos(pi) - Math.sin(pi) * vec.y,
      y: vec.x * Math.sin(pi) + Math.cos(pi) * vec.y
    }
  }

  /**
   * 三角形缩放
   * @param zoom 
   */
  public setScale(zoom: number) {
    this.V1 = Vec.dmul(this.V1, zoom);
    this.V2 = Vec.dmul(this.V2, zoom);
    this.V3 = Vec.dmul(this.V3, zoom);
  }

  /**
   * 转弧度制
   */
  private pi(rotate: number) { return rotate * Math.PI / 180 ; }

  /**
   * 计算直线方程与三角形的第一个交点
   * @param line 直线方程
   * @param start 直线起点
   * @returns 返回交点坐标, 三角形直线方程 
   */
  public getLineJD(line: LineEquation, start: Vector2): [Vector2, LineEquation] {
    // 获取三角形三条边直线方程
    const l1 = LineEquation.defineLineFromTwoPoints(this.V1,this.V2);
    const l2 = LineEquation.defineLineFromTwoPoints(this.V2,this.V3);
    const l3 = LineEquation.defineLineFromTwoPoints(this.V3,this.V1);
    //计算2直线交点
    const v1 = line.getIntersection(l1);
    const v2 = line.getIntersection(l2);
    const v3 = line.getIntersection(l3);
    //判断第一个与直线相交的边
    // 1、该点不在直线上，舍去
    // 2、对于一条 从 (x,y) => (x',y')的射线经过2点v1,v2，选择距离(x,y)最近的点就是第一个相交的点
    let mi = 0x3f3f3f3f3f3f;
    let ret : [Vector2, LineEquation ] = [{ x: -1, y: -1 }, new LineEquation(0,0,0) ];
    if(v1.x >= min([this.V1.x, this.V2.x])! && v1.x <= max([this.V1.x, this.V2.x])!) {
      if(Vec.dist(start, { x: v1.x, y: v1.y }) < mi) {
        ret = [{ x: v1.x, y: v1.y }, l1];
        mi = Vec.dist(start, { x: v1.x, y: v1.y });
      }
    }
    if(v2.x >= min([this.V2.x, this.V3.x])! && v2.x <= max([this.V2.x, this.V3.x])!) {
      if(Vec.dist(start, { x: v2.x, y: v2.y }) < mi) {
        ret = [{ x: v2.x, y: v2.y } , l2 ];
        mi = Vec.dist(start, { x: v2.x, y: v2.y });
      }
    }
    if(v3.x >= min([this.V1.x, this.V3.x])! && v3.x <= max([this.V1.x, this.V3.x])!) {
      if(Vec.dist(start, { x: v3.x, y: v3.y }) < mi) {
        ret = [{ x: v3.x, y: v3.y }, l3];
        mi = Vec.dist(start, { x: v2.x, y: v2.y });
      }
    }
    return ret;
  }
}