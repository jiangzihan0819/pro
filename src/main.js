import Vue from 'vue'
import App from './App.vue'
import router from './router/index' //路由
import ElementUI from 'element-ui'; //element-UI
import 'element-ui/lib/theme-chalk/index.css';
import less from 'less'
import "./assets/fonts/iconfont.css"; // iconfont.css

Vue.use(ElementUI);
Vue.use(less);
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router
}).$mount('#app')