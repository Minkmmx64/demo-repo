import { cAF, rAF } from "../../utils/AF";
import { curve, CurveKey, AnimCb } from "../const/curve";
/**
 * @description 直接调用 useCurve(终点,起点,过渡时间,过渡函数,回调) 直接开始动画
 * @param to 终点
 * @param from 起始点
 * @param duration 过渡时间 (ms)
 * @param fnKey 缓动函数名称
 * @param cb 每一帧回调
 * @returns 手动结束动画
 */
export const useCurve = ( to: number, from: number, duration: number, fnKey: CurveKey, callBack?: AnimCb) => {
  let hand: number | undefined;
  const timestart = Date.now();
  const Play = () => {
    const timestamp = Date.now() - timestart;
    const next = curve(
      timestamp > duration ? duration : timestamp,
      to, 
      from, 
      duration, 
      fnKey
    );
    callBack && callBack(next);
    if(timestamp > duration) {
      hand && cAF(hand);
    } else hand = rAF(Play);
  }

  Play();

  return () => {
    hand && cAF(hand);
  }
}
