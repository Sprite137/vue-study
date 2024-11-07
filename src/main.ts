import './assets/main.css'

import { createApp} from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import ElementPlus from "element-plus"
import 'element-plus/dist/index.css'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import MusicPlayer from './components/MusicPlayer.vue'


const app = createApp(App)
app.use(createPinia())
app.use(ElementPlus)
app.use(router)
app.component("MusicPlayer",MusicPlayer)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.mount('#app')
