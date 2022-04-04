import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'; // 导入 elementUI
import 'element-ui/lib/theme-chalk/index.css'; // 导入 css
import BaiduMap from 'vue-baidu-map'

Vue.use(ElementUI)
Vue.use(BaiduMap,{
  ak:'8FTwYSeVMzrGvQ1hnopmCtGjTWsqPW1W'
})
Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
