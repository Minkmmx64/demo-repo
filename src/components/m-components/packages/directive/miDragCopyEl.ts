import { DirectiveBinding, ObjectDirective, Ref, h } from "vue";
import Vec, { Vector2 } from "../const/vector";
import { isEmpty } from "lodash-unified";
import { addUnit } from "../../utils/dom/style";

type DirectiveBindingProps = undefined;

export const miDragCopyEl : ObjectDirective = {
  beforeMount: (el: HTMLElement, binding: DirectiveBinding<DirectiveBindingProps>) => {
    let newel = null as unknown as HTMLElement;
    let start : Vector2;
    const mousedown = (e: MouseEvent) => {
      newel = el.cloneNode(true) as HTMLElement;
      document.body.append(newel);
      if(newel) {
        const { left, top, width, height } = newel.getBoundingClientRect();
        if(isEmpty(start))
          start = { x: left + width / 2, y: top + height / 2 };
        newel.style.transformOrigin = "50% 50%";
        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);
      }
    }
    const mousemove = (e: MouseEvent) => {
      const end: Vector2 = { x: e.clientX, y: e.clientY };
      const offset = Vec.sub(end , start);
      const { x, y } = offset;
      if(newel)
        newel.style.transform = `translate(${addUnit(x)}, ${addUnit(y)})`, newel.style.cursor = "move"
    }
    const mouseup = (e: MouseEvent) => {
      window.removeEventListener("mousemove", mousemove)
      window.removeEventListener("mouseup", mouseup)
      if(newel)
        document.body.removeChild(newel);
    }
    el.addEventListener("mousedown",mousedown)
  }
}