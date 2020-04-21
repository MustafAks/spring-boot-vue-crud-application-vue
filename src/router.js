import Vue from 'vue'
import Router from 'vue-router'
import MainPage from './components/MainPage'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import NavBar from './components/Navbar'
import Register from "./views/subscribers/Register";
import Update from "./views/subscribers/Update";
import axios from './utils/AxiosUtils';
import errorHandler from './utils/ExceptionHandler';
import Notify from 'vue-notifyjs';
import 'vue-notifyjs/themes/default.css';
// eslint-disable-next-line no-unused-vars
import notificationUtils from './utils/NotificationUtils';
import FilterList from "./views/subscribers/FilterList";
import Contact from "./views/Contact";
import Parameters from "./views/Parameters";
import SubscriberEndDateControl from "./views/subscribers/SubscriberEndDateControl";
import Login from "./views/user/Login";
import AddNewspaper from "./views/newspapers/AddNewspaper";
import AddPages from "./views/newspapers/AddPages";
import Page401 from "./views/Page401";
import Newspapers from "./views/newspapers/Newspapers";
import EmbeddedFile from "./views/newspapers/EmbeddedFile";


Vue.component('nav-bar', NavBar);
Vue.use(Router);
Vue.use(BootstrapVue);

Vue.use(Notify);
Vue.use(axios);
Vue.use(errorHandler);
Vue.use(notificationUtils);

extend('required', {
    ...required,
    message: 'Bu alan zorunludur !'
});

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login,
            meta: { title: 'Giriş Yap', isPublic: true }
        },
        {
            path: '/mainPage',
            name: 'mainPage',
            component: MainPage,
            meta: { title: 'Hasret Gazetesi - Kemaliye', roles: ["ROLE_USER", "ROLE_ADMIN"] }
        },
        {
            path: '/newspapers',
            name: 'Newspapers',
            component: Newspapers,
            meta: { title: 'Gazeteler', roles: ["ROLE_USER", "ROLE_ADMIN"] }
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            meta: { title: 'Yeni Abone', roles: ["ROLE_ADMIN"] }
        },
        {
            path: '/addNewspaper',
            name: 'AddNewspaper',
            component: AddNewspaper,
            meta: { title: 'Yeni Gazete Ekle', roles: ["ROLE_ADMIN"] }
        },
        {
            path: '/addPages',
            name: 'AddPages',
            component: AddPages,
            meta: { title: 'Yeni Sayfa Ekle', roles: ["ROLE_ADMIN"] }
        },
        {
            path: '/filter',
            name: 'FilterList',
            component: FilterList,
            meta: { title: 'Filtrele', roles: ["ROLE_ADMIN"]  }
        },
        {
            path: '/contact',
            name: 'Contact',
            component: Contact,
            meta: { title: 'İletişim', isPublic: true }
        },
        {
            path: '/parameters',
            name: 'Parameters',
            component: Parameters,
            meta: { title: 'Parametreler', roles: ["ROLE_ADMIN"]  }
        },
        {
            path: '/update',
            name: 'Update',
            component: Update,
            meta: { title: 'Güncelle', roles: ["ROLE_ADMIN"]  }
        },
        {
            path: '/embeddedFile',
            name: 'EmbeddedFile',
            component: EmbeddedFile,
            meta: { title: 'Gazete Oku', roles: ["ROLE_USER", "ROLE_ADMIN"]  }
        },
        {
            path: '/subscriberEndDateControl',
            name: 'SubscriberEndDateControl',
            component: SubscriberEndDateControl,
            meta: {title: 'Abonelik Bitiş', roles: ["ROLE_ADMIN"] }
        },
        {
          path: '/401',
          name: '401',
          component: Page401,
          meta: {title: 'Yetkisiz Erişim', isPublic: true }
        }
    ]
});

router.beforeEach((to, from, next) => {
    const isPublic = to.matched.some(record => record.meta.isPublic);
    const roles = to.meta.roles;
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))  : null;
    const userRole = user ? user.role : null;

    if(isPublic){
        next();
    }
    else if (!userRole) {
        return next({
            path:'/',
            query: {redirect: to.fullPath}
        });
    }

    else if(roles && !roles.includes(userRole)){
        return next({
            path:'/401',
            query: {redirect: to.fullPath}
        });
    }
    else {
        next();
    }
});

export default router;
