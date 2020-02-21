import Vue from 'vue'
import Router from 'vue-router'
import Latest from './components/Latest'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import * as VeeValidate from 'vee-validate';
import NavBar from './components/Navbar'
import Footer from './components/footer'
import Filter from './components/List'
import ListCoursesComponent from "./components/ListCoursesComponent";
import Register from "./components/Register";

Vue.component('nav-bar', NavBar);
Vue.component('v-footer', Footer);
Vue.use(Router);
Vue.use(BootstrapVue);
Vue.use(VeeValidate);
export default new Router({
    routes: [
        {
            path: '/',
            name: 'latest',
            component: Latest,
            meta: { title: 'Hasret Gazetesi - Kemaliye' }
        },
        {
            path: '/coursesList',
            name: 'CoursesList',
            component: ListCoursesComponent,
            meta: { title: 'Üyelerimiz' }
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            meta: { title: 'Kayıt Ol' }
        },
        {
            path: '/filter',
            name: 'Filter',
            component: Filter,
            meta: { title: 'Filter' }
        }
    ]
})