// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next()
})
let APIURL = 'http://mealapi.jauyeung.net/index.php/';
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({ el: '#app', router, render: h => h(App) })


export { APIURL };