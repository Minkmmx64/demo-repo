import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/components/m-components/less/index.less";
import { miDraggable } from './components/m-components/packages/directive';

const app = createApp(App);

app
  .use(store)
  .use(router)
  .directive('draggable', miDraggable)

app.mount('#app')

