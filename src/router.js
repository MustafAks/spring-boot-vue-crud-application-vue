import Vue from 'vue'
import Router from 'vue-router'
import MainPage from './components/MainPage'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import * as VeeValidate from 'vee-validate';
import NavBar from './components/Navbar'
import Register from "./views/subscriber/Register";
import Update from "./views/subscriber/Update";
import axios from './utils/AxiosUtils';
import errorHandler from './utils/ExceptionHandler';
import Notify from 'vue-notifyjs';
import 'vue-notifyjs/themes/default.css';
// eslint-disable-next-line no-unused-vars
import VuelidateErrorExtractor, { templates } from 'vuelidate-error-extractor';

import notificationUtils from './utils/NotificationUtils';
import FilterList from "./views/subscriber/FilterList";
import About from "./views/About";
import AboneEndDateControl from "./views/subscriber/AboneEndDateControl";
import Login from "./views/user/Login";
import AddNewspaper from "./views/subscriber/AddNewspaper";
import AddPages from "./views/subscriber/AddPages";


Vue.component('nav-bar', NavBar);
Vue.use(Router);
Vue.use(BootstrapVue);
Vue.use(VeeValidate);
Vue.use(Notify);
Vue.use(axios);
Vue.use(errorHandler);
Vue.use(notificationUtils);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login,
            meta: { title: 'Giriş Yap' }
        },
        {
            path: '/mainPage',
            name: 'mainPage',
            component: MainPage,
            meta: { title: 'Hasret Gazetesi - Kemaliye' }
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            meta: { title: 'Yeni Abone' }
        },
        {
            path: '/addNewspaper',
            name: 'AddNewspaper',
            component: AddNewspaper,
            meta: { title: 'Yeni Gazete Ekle' }
        },
        {
            path: '/addPages',
            name: 'AddPages',
            component: AddPages,
            meta: { title: 'Yeni Sayfa Ekle' }
        },
        {
            path: '/filter',
            name: 'FilterList',
            component: FilterList,
            meta: { title: 'Filtrele' }
        },
        {
            path: '/about',
            name: 'About',
            component: About,
            meta: { title: 'Hakkımızda' }
        },
        {
            path: '/update',
            name: 'Update',
            component: Update,
            meta: { title: 'Güncelle' }
        },
        {
            path: '/aboneEndDateControl',
            name: 'AboneEndDateControl',
            component: AboneEndDateControl,
            meta: {title: 'Abone Bitis'}
        }
    ]
})
