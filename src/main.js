import Vue from 'vue'
import App from './App.vue'
import iVew from 'iview'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.use(iVew)

new Vue({
  render: h => h(App)
}).$mount('#app')
