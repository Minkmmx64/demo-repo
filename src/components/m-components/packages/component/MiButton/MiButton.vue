<template>
  <div :class="[cls]">
    <slot/>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { miButtonProps } from './MiButton';
import { useNamespace } from '../../hooks/useNamespace';

const props = defineProps(miButtonProps);

const ns = useNamespace('button');

const cls = computed(() => {
  return {
    [ns.n()] : true,
    [ns.is(props.size)]: true,
    [ns.is(props.type)]: true,
  }
})

</script>

<style lang="less" scoped>

</style>