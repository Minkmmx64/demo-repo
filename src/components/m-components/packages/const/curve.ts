import { Vector2 } from "./vector";

export interface Point { x: number, y: number }
export type Action = (x: number) => number;
export type AnimCb = (x: number) => void;
export type CurveKey = keyof typeof CurveFn;
/**
 * 1、开始动画
 * 2、记录动画开始时间
 * 3、运行动画函数 
*/
/**
 * @description 缓动曲线
 * @returns 计算当前位置
*/
export function curve (time: number, to: number, from: number, duration: number, fnKey: CurveKey) : number {
  /**
  * to - from => [0 ~ 1]
  */
  return CurveFn[fnKey](time / duration) * (to - from) + from;
}
export const CurveFn =  {
  easeInSine: (x: number) => 1 - Math.cos((x * Math.PI) / 2),
  easeOutSine: (x: number) => Math.sin((x * Math.PI) / 2),
  easeInOutSine: (x: number) => -(Math.cos(Math.PI * x) - 1) / 2,
}  
/**
 * @description 一次贝塞尔曲线
 * @param t 比例
 * @param s 起点
 * @param e 终点
 * @returns
 */
export const Bezier1Curve = (t: number, s: Vector2, e: Vector2) : Vector2 => {
  return {
    x: (1 - t) * s.x + t * e.x,
    y: (1 - t) * s.y + t * e.y
  }
}
/**
 * @description 二次贝塞尔曲线
 * @param t 比例
 * @param s 起点
 * @param e 终点
 * @param c 控制点
 * @returns
 */
export const Bezier2Curve = (t: number, s: Vector2, e: Vector2, c: Vector2) : Vector2 => {
  return {
    x: (1 - t) ** 2 * s.x + 2 * t * (1 - t) * c.x + t ** 2 * e.x,
    y: (1 - t) ** 2 * s.y + 2 * t * (1 - t) * c.y + t ** 2 * e.y,
  }
}
