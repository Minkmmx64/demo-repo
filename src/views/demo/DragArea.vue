<template>
  <div class="drag-area">
    <div class="drag-area_content mi-pos-rela">
      <div class="drag-area_tab">
        <TabCell v-dragcopyel icon="icon-spider" name="spider"/>
        <TabCell v-dragcopyel icon="icon-home" name="home"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TabCell from "./DragArea/TabCell.vue";
import { Vector2 } from "@/components/m-components/packages/const/vector";

const pos = ref<Vector2>({ x: 0, y: 0 });

</script>
<style scoped lang="less">
  .drag-area {
    overflow: hidden;
    width: 100%;
    height: 100vh;
    background-color: rgb(240, 240, 240);
    padding: 10px;
    box-sizing: border-box;
    .drag-area_content {
      width: 100%;
      height: 100%;
      border-radius: 20px;
      background-color: #fff;
      border: 1px solid rgba(0, 0, 0, 0.08);
      .drag-area_tab {
        padding: 2px 15px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        display: flex;
      }
    }
  }
</style>
