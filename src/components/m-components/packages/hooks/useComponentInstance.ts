/** 
* 获取自定义组件实例类型提示
*/
export const useComponentInstance = <T extends abstract new (...args: any) => any>(_comp: T) : InstanceType<typeof _comp> =>  {
  return void 0 as InstanceType<typeof _comp>
}