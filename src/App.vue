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


.v-enter-from {
  //transform: translateY(-100%);
  opacity: 0;
}
.v-enter-active {
  transition: all ease-in-out 500ms;
}
.v-enter-to {
  //transform: translateY(0);
  opacity: 1;
}
.v-leave-from {
  //transform: translateY(0);
  position: absolute;
  opacity: 1;
}
.v-leave-active {
  transition: all ease-in-out 500ms;
}
.v-leave-to {
  position: absolute;
  //transform: translateY(100%);
  opacity: 0;
}
</style>