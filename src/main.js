import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import * as ElIconModules from '@element-plus/icons'
import 'element-plus/dist/index.css'
import { transElIconName } from './utils/icons'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'e-icon-picker/lib/index.css'; // 基本样式，包含基本图标
import 'font-awesome/css/font-awesome.min.css'; //font-awesome 图标库
import 'e-icon-picker/lib/ele/icon.css'; //element-plus 图标库
const app = createApp(App)
// 统一注册el-icon图标
for (const iconName in ElIconModules) {
  app.component(transElIconName(iconName), ElIconModules[iconName])
}
app.use(store)
app.use(router)
app.use(ElementPlus, { locale: zhCn })
app.mount('#app')
