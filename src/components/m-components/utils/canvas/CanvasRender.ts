export interface Material {
  strokeStyle ?: string;
  lineWidth ?: number;
  lineCap ?: CanvasLineCap;
}

export class CanvasRender {
  setting :Material;
  constructor(setting ?: Material){
    this.setting = {
      strokeStyle: '#ffffff',
      lineWidth: 1,
      lineCap: 'round',
      ...setting
    }
  }

  getProp<T extends keyof Material>(key: T) : Material[T] {
    return this.setting[key];
  }
}