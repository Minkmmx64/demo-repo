export const rAF = (fn: () => void) =>
  window.requestAnimationFrame
    ? window.requestAnimationFrame(fn)
    : (setTimeout(fn, 16) as unknown as number)

export const cAF = (handle: number) =>
  window.cancelAnimationFrame ? window.cancelAnimationFrame(handle) : clearTimeout(handle)
