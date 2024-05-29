<template>
  <div class="CanvasArea" >
    <canvas ref="CanvasArea"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef, unref } from 'vue';
import { CanvasAreaPlayGround } from './CanvasArea';

const CanvasArea = shallowRef<HTMLCanvasElement | null>();
const useCtx = ref<CanvasRenderingContext2D>({} as CanvasRenderingContext2D);

    
onMounted(() => {
  if(CanvasArea.value) {
    const area = [ window.innerWidth, window.innerHeight ];
    [ CanvasArea.value.width, CanvasArea.value.height ] = area;
    useCtx.value = CanvasArea.value.getContext("2d")!;
    CanvasAreaPlayGround(unref(useCtx), area);
  }
})
</script>

<style scoped lang="less">
.CanvasArea {
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background-color: var(--theme--dark);
}
</style>