export const useNamespace = (namespace: string) => {
  const is = (block : string) => {
    return `mi-is-${block}`;
  }
  const n = () => {
    return `mi-${namespace}`;
  }

  return {
    is,
    n
  }
}