import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/components/m-components/less/index.less";
import { miDraggable, miDragCopyEl } from './components/m-components/packages/directive';
//import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App);

//for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  //app.component(key, component)
//}

app
  .use(store)
  .use(router)
  .directive('draggable', miDraggable)
  .directive('dragcopyel', miDragCopyEl)

app.mount('#app')


// const o = {} as any;
// const a = ['name', 'age', 'add']
// a.map(e => {
//   try {
//     console.log(JSON.parse(o[e]));
//   } catch (error) {
//     console.log(error);
//     o[e] = [];
//   }
  
// })
