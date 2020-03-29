import Vue from 'vue'
import Router from 'vue-router'
import Latest from './components/Latest'
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
import SubscriberList from "./views/subscriber/SubscriberList";
import SubscriberFilterList from "./views/subscriber/SubscriberFilterList";
import About from "./views/About";


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
            name: 'latest',
            component: Latest,
            meta: { title: 'Hasret Gazetesi - Kemaliye' }
        },
        {
            path: '/abonelerList',
            name: 'SubscriberList',
            component: SubscriberList,
            meta: { title: 'Aboneler' }
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            meta: { title: 'Yeni Abone' }
        },
        {
            path: '/filter',
            name: 'Filter',
            component: SubscriberFilterList,
            meta: { title: 'Filter' }
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
        }
    ]
})
