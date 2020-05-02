import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/Store'
import VueGoodTablePlugin from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css'
import "vuetify/dist/vuetify.css";
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

Vue.use(VueGoodTablePlugin);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
/* eslint-disable no-new */
new Vue({ el: '#app', store, router, render: h => h(App) });