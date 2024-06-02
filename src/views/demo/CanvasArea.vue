<template>
  <div class="CanvasArea mi-pos-rela" >
    <canvas ref="CanvasArea"></canvas>
    <div class="CanvasOperate mi-pos-abs">
      <MiButton @click="canvasAreaPlayGroundProps?.preView" type="primary" size="middle">上一帧</MiButton>
      <MiButton @click="canvasAreaPlayGroundProps?.usePause" type="danger" size="middle">暂停</MiButton>
      <MiButton @click="canvasAreaPlayGroundProps?.usePlay" type="success" size="middle">播放</MiButton>
      <MiButton @click="canvasAreaPlayGroundProps?.nextView" type="primary" size="middle">下一帧</MiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef, unref } from 'vue';
import { CanvasAreaPlayGround, ICanvasAreaPlayGroundRT } from './CanvasArea';
import MiButton from '@/components/m-components/packages/component/MiButton/MiButton.vue'

const CanvasArea = shallowRef<HTMLCanvasElement | null>();
const useCtx = ref<CanvasRenderingContext2D>({} as CanvasRenderingContext2D);

const canvasAreaPlayGroundProps = ref<ICanvasAreaPlayGroundRT | null>();
    
onMounted(() => {
  if(CanvasArea.value) {
    const area = [ window.innerWidth, window.innerHeight ];
    [ CanvasArea.value.width, CanvasArea.value.height ] = area;
    useCtx.value = CanvasArea.value.getContext("2d")!;
    const CanvasAreaPlayGroundProps = CanvasAreaPlayGround(unref(useCtx), area);
    canvasAreaPlayGroundProps.value = CanvasAreaPlayGroundProps;
  }
})
</script>

<style scoped lang="less">
.CanvasArea {
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background-color: var(--theme--dark);

  .CanvasOperate {
    width: 100%;
    bottom: 0px;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
}
</style>