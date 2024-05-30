import { Point } from "./curve";

export type Vector2 = Point;

/**
 * 2维向量运算
 */

//加
export function add(V: Vector2, W: Vector2) : Vector2 {
  return {
    x: V.x + W.x,
    y: V.y + W.y
  }
}

//减
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

//内积
export function inner(V: Vector2, W: Vector2) : number {
  return V.x * W.x + V.y * W.y;
}

//向量的模
export function model(V: Vector2) : number {
  return Math.sqrt(V.x ** 2 + V.y ** 2);
}

//向量夹角余弦值
export function vcos(V: Vector2, W: Vector2) : number {
  // cosa = a*b / |a|*|b|
  return inner(V,W) / (model(V) * model(W));
}

//向量夹角正弦值
export function vsin(V: Vector2, W: Vector2) : number {
  return Math.sqrt(1 - vcos(V, W) ** 2);
}

//求2点距离
export function dist(V:Vector2, W: Vector2) : number {
  return Math.sqrt((W.x - V.x) ** 2 + (W.y - V.y) ** 2);
}

//求点V 绕点 W 顺时针旋转 R ° 
export function rotate(V: Vector2, W: Vector2, R: number) {
  const pi = R * Math.PI / 180;
  const T = sub(V, W);
  const x = T.x * Math.cos(pi) - T.y * Math.sin(pi);
  const y = T.x * Math.sin(pi) + T.y * Math.cos(pi);
  return add({ x, y }, W);
}

//将点V平移点W个向量
// export function transform(V: Vector2, W: Vector2) : Vector2 {
  
// }

export default {
  add,
  sub,
  dmul,
  dist,
  vsin,
  vcos,
  model,
  inner,
  rotate
}