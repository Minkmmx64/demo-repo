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
      <circle v-draggable="onDraggable1" class="graphic" cx="400" cy="500" r="10" fill="url('#dragSuccess')" />
      <circle v-draggable="onDraggable2" class="graphic" cx="600" cy="200" r="10" fill="url('#dragSuccess')" />
      <circle v-draggable="onDraggable3" class="graphic" cx="800" cy="800" r="10" fill="url('#dragSuccess')" />
      <circle v-draggable="onDraggable4" class="graphic" cx="1000" cy="800" r="10" fill="url('#dragSuccess')" />
      <circle v-draggable="onDraggable5" class="graphic" cx="1200" cy="400" r="10" fill="url('#dragSuccess')" />
      <circle v-draggable="onDraggable6" class="graphic" cx="1400" cy="500" r="10" fill="url('#dragSuccess')" />
      <circle v-for="(item, index) in beziers" :key="index" class="graphic" :cx="item.x" :cy="item.y" r="1" fill="url('#dragDefault')" />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { Bezier2Curve } from '@/components/m-components/packages/const/curve';
import { Vector2 } from '@/components/m-components/packages/const/vector';

import { ref, watchEffect } from 'vue';

const vec2s = ref<Vector2[]>([]);
const beziers = ref<Vector2[]>([]);

const onDraggable1 = (e: Vector2) => { vec2s.value[0] = e; }
const onDraggable2 = (e: Vector2) => { vec2s.value[1] = e; }
const onDraggable3 = (e: Vector2) => { vec2s.value[2] = e; }
const onDraggable4 = (e: Vector2) => { vec2s.value[3] = e; }
const onDraggable5 = (e: Vector2) => { vec2s.value[4] = e; }
const onDraggable6 = (e: Vector2) => { vec2s.value[5] = e; }

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
})

</script>

<style scoped lang="less">
svg {
  width: 100%; height: 100%;
 .graphic { cursor: pointer; }
}
</style>