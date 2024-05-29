<template>
  <RouterView v-slot="{ Component }">
    <Transition>
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<script lang="ts" setup>

</script>

<style lang="less" scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.5 cubic-bezier(0.075, 0.82, 0.165, 1);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>