<template>
  <div class="tab-cell">
    <i :class="['iconfont', icon ]"></i>
    <span>{{ name }}</span>
  </div>
</template>

<script setup lang="ts">
import { dragTabCellProps } from './TabCell';

const props = defineProps(dragTabCellProps);

</script>
<style scoped lang="less">
.tab-cell {
  width: fit-content;
  height: 25px;
  padding: 2px 5px;
  display: flex;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: rgb(240,240,240);
    border-radius: 5px;
  }

  span, i {
    line-height: 25px;
    font-weight: 400;
  }

  i { color: rgba(0, 0, 0, 0.55); }

  i + span { margin-left: 5px; }

}
</style>
