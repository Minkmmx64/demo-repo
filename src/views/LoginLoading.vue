<template>
    <div class="container">
        <div class="flex">
            <div class="loader">
            </div>
        </div>
        <div class="load-text">
            正在加载中...
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(()=>{
    console.log("1234");
});
</script>
<style scoped lang="less">
#app {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
.container {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: #292970;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    align-content: center;
}

.flex {
    min-height: 60pt;
}

@keyframes loading {
    0% {
        width: 50pt;
        height: 50pt;
        margin-top: 0;
    }
    25% {
        height: 4pt;
        margin-top: 23pt;
    }
    50% {
        width: 4pt;
    }
    75% {
        width: 50pt;
    }
    100% {
        width: 50pt;
        height: 50pt;
        margin-top: 0;
    }
}

.loader {
    width: 50pt;
    height: 50pt;
    border-radius: 100%;
    border: #6767fa 4pt solid;
    margin-left: auto;
    margin-right: auto;
    background-color: transparent;
    animation: loading 1s infinite;
}

.load-text {
    padding-top: 15px;
    text-align: center;
    font: 14pt "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: lighten(#6767fa, 75%);
}

</style>
