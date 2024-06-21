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
    path: "/DragArea",
    name: "DragArea",
    meta: {
      title: "DragArea"
    },
    component: () => import("@/views/demo/DragArea.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
