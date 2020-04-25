import Vue from 'vue'
import App from './App'
import router from './router'
import VueGoodTablePlugin from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css'
import "vuetify/dist/vuetify.css";
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

Vue.use(VueGoodTablePlugin);
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
let APIURL = 'http://mealapi.jauyeung.net/index.php/';
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({ el: '#app', router, render: h => h(App) })


export { APIURL };
