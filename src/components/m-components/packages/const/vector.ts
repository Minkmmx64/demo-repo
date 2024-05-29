import { Point } from "./curve";

export type Vector2 = Point;

/**
 * 2维向量运算
 */

export function add(V: Vector2, W: Vector2) : Vector2 {
  return {
    x: V.x + W.x,
    y: V.y + W.y
  }
}

export function sub(V: Vector2, W: Vector2) : Vector2 {
  return {
    x: V.x - W.x,
    y: V.y - W.y
  }
}

//数乘
export function dmul(V: Vector2, d: number) : Vector2 {
  return {
    x: V.x * d,
    y: V.y * d
  }
}

//求2点距离
export function dist(V:Vector2, W: Vector2) : number {
  return Math.sqrt((W.x - V.x) ** 2 + (W.y - V.y) ** 2);
}

export default {
  add,
  sub,
  dmul,
  dist
}