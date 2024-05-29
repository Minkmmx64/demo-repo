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
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
