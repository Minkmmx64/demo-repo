/**
 * 节流
 */
export const useThrottle = <T extends any[], R extends any>(callBack: (...args: T) => R, interval: number = 500) => {
  let timer : number | null = null;

  return function(...args: T) {
    if(timer) { return; }
    timer = setTimeout(() => {
      callBack(...args);
      timer = null;
    }, interval);
  }
}

/**
 * 防抖
 */
export const useDebounce = <T extends any[], R extends any>(callBack: (...args: T) => R, interval: number = 500) => {
  let timer : number | null = null;

  return function(...args: T) {
    if(timer) { 
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callBack(...args);
      timer = null;
    }, interval);
  }
}