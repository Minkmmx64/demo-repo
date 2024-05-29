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

export default {
  add,
  sub
}