<template>
  <!-- 设置 svg 过渡动画 -->
  <div ref="svgTrAnim" class="svg-tr-anim" @click="playAnim" v-html="svgPath"></div>
</template>

<script setup lang="ts">
import { CSSProperties, computed, onMounted, shallowRef } from 'vue';
import { svgTrAnimProps } from './svgTrAnim';
import { addUnit } from '@/components/m-components/utils/dom/style';
const props = defineProps(svgTrAnimProps);

const svgTrAnim = shallowRef<HTMLDivElement>();
const svg = shallowRef<SVGElement | null>();
const svgs = shallowRef<SVGPathElement[]>([]);

const svgStyle = computed<CSSProperties>(() => {
  return {
    stroke: props.color
  }
})

onMounted(() => {
  svg.value = svgTrAnim?.value?.querySelector("svg");
  if(svg.value) {
    svg.value.style.width = addUnit(props.width); svg.value.style.height = addUnit(props.height);
  }
  svgs.value = svg.value?.children as unknown as SVGPathElement[] | [];
  [...svgs.value].forEach(path => { 
    //path.addEventListener("animationend",playAnim);
    path.style.setProperty('--g-length', `${path.getTotalLength()}`);
    for(const k in svgStyle.value){
      (path.style as any)[k] = (svgStyle.value as any)[k];
    }
  });
});

const playAnim = () => {
  [...svgs.value].forEach(path => {
    const anims = path.getAnimations();
    anims.forEach(anim => { anim.cancel(), anim.play(); })
  });
}

defineExpose({
  play: playAnim
})
</script>

<style lang="less">
@keyframes svg-tr-anim {
  to {
    stroke-dashoffset: 0;
  }
}
svg {
  path {
    fill: none;
    stroke: #007aff;
    stroke-width: 10px;
    stroke-dashoffset: var(--g-length);
    stroke-dasharray: var(--g-length);
    animation: svg-tr-anim 2s forwards;
  }
}
</style>