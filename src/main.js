import Vue from 'vue'
import App from './App.vue'
import VueGoodTablePlugin from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css'

Vue.config.debug = true
Vue.config.productionTip = false
Vue.use(VueGoodTablePlugin);

new Vue({
  render: h => h(App),
}).$mount('#app')
