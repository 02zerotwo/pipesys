import { createStore } from 'vuex'
import getters from './getters'
export default createStore({
  state: {// 放置状态相关的信息，vue是使用单一状态树的，也就是单一数据源，也就是说我们的state只能有一个
  },
  mutations: {// mutations其实就相当于我们vue里面的methods，也是定义方法的，只不过这个方法可以在多个组件调用就是了。
  },
  actions: {// mutations是写同步操作的，在他里面是不能写异步操作的，那我们就需要在actions里面来写我们的异步操作。
  },
  modules: {
    // 需要用到的在modules文件夹下面建文件导入进来
  },
  getters// getters其实就是相当于vue里面的计算属性
})
