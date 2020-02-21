import Vue from 'vue'
import Router from 'vue-router'
import Latest from './components/Latest'
import Random from './components/Random'
import Search from './components/Search'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import * as VeeValidate from 'vee-validate';
import MealRow from './components/MealRow.vue'
import NavBar from './components/Navbar'
import Footer from './components/footer'
import Filter from './components/Filter'
import FilterRow from './components/FilterRow'
import ListCoursesComponent from "./components/ListCoursesComponent";
import Register from "./components/Register";

Vue.component('meal-row', MealRow);
Vue.component('nav-bar', NavBar);
Vue.component('v-footer', Footer);
Vue.component('filter-row', FilterRow);
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
            path: '/random',
            name: 'random',
            component: Random,
            meta: { title: 'Random' }
        },
        {
            path: '/search',
            name: 'search',
            component: Search,
            meta: { title: 'Search' }
        },
        {
            path: '/search/:keyword',
            name: 'search-keyword',
            component: Search,
            meta: { title: 'Search' }
        },
        {
            path: '/search/:type/:keyword',
            name: 'filter-keyword',
            component: Filter,
            meta: { title: 'Filter' }
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
        }
    ]
})