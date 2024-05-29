
/**
 * 生产随机16进制颜色
 */
export const ranColor = () => `#${(998244353 * Math.random() ).toString(16).substring(2,8)}`;

/**
 *  16进制转 rgb
 */
export const HexToRgb = (hex: string, a = 1) : string => {
  // # 007aff
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
