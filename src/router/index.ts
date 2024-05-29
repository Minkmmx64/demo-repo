import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () => import("@/views/home/homeScreen.vue"),
    meta: {
      title: "主页",
    },
  },
  {
    path: "/CanvasArea",
    name: "CanvasArea",
    component: () => import("@/views/demo/CanvasArea.vue"),
    meta: {
      title: "CanvasArea",
    },
  },
  {
    path: "/Test",
    name: "Test",
    component: () => import("@/views/LoginLoading.vue"),
    meta: {
      title: "Test",
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
