import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/Store'
import VueGoodTablePlugin from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css'
import "vuetify/dist/vuetify.css";
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue';
import VueAnalytics from 'vue-analytics';

Vue.use(VueGoodTablePlugin);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueAnalytics, {id: 'UA-174171887-1', router});
/* eslint-disable no-new */
new Vue({el: '#app', store, router, render: h => h(App)});