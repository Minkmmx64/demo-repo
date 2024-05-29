<template>
  <svg view-box="0 0 100 100" class="mi-pos-abs">
    <defs>
      <radialGradient id="dragSuccess">
        <stop offset="50%" stop-color="#B4FF9F"></stop>
        <stop offset="50%" stop-color="#ffffff"></stop>
      </radialGradient>
      <radialGradient id="dragDefault">
        <stop offset="100%" stop-color="#ffffff"></stop>
      </radialGradient>
    </defs>
    <g>
      <circle 
        v-for="(item, index) in onDraggable" :key="index" 
        v-draggable="item" class="graphic" 
        :cx="(250) + index * 50" :cy="200" r="10" 
        fill="url('#dragSuccess')" />
      <circle v-for="(item, index) in beziers" :key="index" class="graphic" :cx="item.x" :cy="item.y" r="1" fill="url('#dragDefault')" />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { Bezier2Curve } from '@/components/m-components/packages/const/curve';
import { Vector2 } from '@/components/m-components/packages/const/vector';

import { onMounted, ref, watchEffect } from 'vue';

const vec2s = ref<Vector2[]>([]);
const beziers = ref<Vector2[]>([]);

const onDraggable = ref<((e: Vector2) => void)[]>([]);

watchEffect(() => {

  if(vec2s.value.length){
    let j = 0;
    for(let k = 0 ; k < vec2s.value.length - 2; k ++) {
      for(let i = 0.02 ; i < 1; i += 0.01, j++){
        const nextVec = Bezier2Curve(i, vec2s.value[k], vec2s.value[k + 2], vec2s.value[k + 1]);
        beziers.value[j] = nextVec;
      }
    }
  }
});

onMounted(() => {
  for(let i = 0; i < 15; i ++){
    onDraggable.value.push((e: Vector2) => { vec2s.value[i] = e; });
  }
})

</script>

<style scoped lang="less">
svg {
  width: 100%; height: 100%;
 .graphic { cursor: pointer; }
}
</style>