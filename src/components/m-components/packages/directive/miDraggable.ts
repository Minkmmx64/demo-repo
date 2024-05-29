import { DirectiveBinding, ObjectDirective } from "vue";
import Vec, { Vector2 } from "../const/vector";
import { addUnit } from "../../utils/dom/style";
import { isEmpty } from "lodash-unified";

interface DirectiveBindingProps {
  (e: Vector2) : void
}

export const miDraggable : ObjectDirective = {
  beforeMount: (el : HTMLElement, binding: DirectiveBinding<DirectiveBindingProps>) => {
    let start : Vector2;
    const mousedown = (e: MouseEvent) => {
      if(el) {
        const { left, top, width, height } = el.getBoundingClientRect();
        if(isEmpty(start))
          start = { x: left + width / 2, y: top + height / 2 };
        el.style.transformOrigin = "50% 50%";
        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);
      }
    }
    const mousemove = (e: MouseEvent) => {
      const end: Vector2 = { x: e.clientX, y: e.clientY };
      const offset = Vec.sub(end , start);
      const { x, y } = offset;
      el.style.transform = `translate(${addUnit(x)}, ${addUnit(y)})`;
      if(binding.value)
        binding.value(end);
    }
    const mouseup = (e: MouseEvent) => {
      window.removeEventListener("mousemove", mousemove)
      window.removeEventListener("mouseup", mouseup)
    }
    el.addEventListener("mousedown",mousedown);
  },
  mounted: (el : HTMLElement, binding: DirectiveBinding<DirectiveBindingProps>) => {
    const { left, top, width, height } = el.getBoundingClientRect();
    const initialize : Vector2 = { x: left + width / 2, y: top + height / 2 };
    if(binding.value)
      binding.value(initialize);
  }
}