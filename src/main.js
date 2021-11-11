import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import * as ElIconModules from '@element-plus/icons'
import 'element-plus/dist/index.css'
import { transElIconName } from './utils/icons'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const app = createApp(App)
// 统一注册el-icon图标
for (const iconName in ElIconModules) {
  app.component(transElIconName(iconName), ElIconModules[iconName])
}
app.use(store)
app.use(router)
app.use(ElementPlus, { locale: zhCn })
app.mount('#app')
