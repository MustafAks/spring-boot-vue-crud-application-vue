import Vue from 'vue'
import Router from 'vue-router'
import MainPage from './components/MainPage'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
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
import Messages from "./views/Messages";
import Parameters from "./views/Parameters";
import Login from "./views/user/Login";
import NewspaperUpload from "./views/newspapers/NewspaperUpload";
import Page401 from "./views/Page401";
import Newspapers from "./views/newspapers/Newspapers";
import AddAdvertisement from "./views/advertisements/AddAdvertisement";
import AdvertisementsList from "./views/advertisements/AdvertisementsList";
import EmbeddedFile from "./views/newspapers/EmbeddedFile";
import AdminPanel from "./views/adminPanel/AdminPanel";
import addSubscriberImage from "./assets/images/AdminPanelImages/addSubscriber.png"
import filterImage from "./assets/images/AdminPanelImages/filter.png"
import newspaperImage from "./assets/images/AdminPanelImages/newspaper.png"
import messagesImage from "./assets/images/AdminPanelImages/messages.png"
import parametersImage from "./assets/images/AdminPanelImages/parameters.png"
import advertisementImage from "./assets/images/AdminPanelImages/advertisement.png"
import listAdvertisementImage from "./assets/images/AdminPanelImages/listAdvertisement.png"
import UserProfile from "./views/subscribers/UserProfile";


Vue.component('nav-bar', NavBar);
Vue.use(Router);
Vue.use(BootstrapVue);

Vue.use(Notify);
Vue.use(axios);
Vue.use(errorHandler);
Vue.use(notificationUtils);

const router = new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: { title: 'Giriş Yap', isPublic: true }
        },
        {
            path: '/',
            name: 'mainPage',
            component: MainPage,
            meta: { title: 'Hasret Gazetesi - Kemaliye', isPublic: true }
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
            meta: { title: 'Abone Ekle', roles: ["ROLE_ADMIN"], operations: "subscriptions", image: addSubscriberImage }
        },
        {
            path: '/uploadNewspaper',
            name: 'UploadNewspaper',
            component: NewspaperUpload,
            meta: { title: 'Gazete Yükle', roles: ["ROLE_ADMIN"], operations: "newspapers", image: newspaperImage }
        },
        {
            path: '/addAdvertisement',
            name: 'AddAdvertisement',
            component: AddAdvertisement,
            meta: { title: 'Reklam Ekle', roles: ["ROLE_ADMIN"], operations: "newspapers", image: advertisementImage }
        },
        {
            path: '/listAdvertisementImage',
            name: 'AdvertisementsList',
            component: AdvertisementsList,
            meta: { title: 'Reklam Düzenle', roles: ["ROLE_ADMIN"], operations: "newspapers", image: listAdvertisementImage }
        },
        {
            path: '/filter',
            name: 'FilterList',
            component: FilterList,
            meta: { title: 'Filtrele', roles: ["ROLE_ADMIN"], operations: "subscriptions", image: filterImage }
        },
        {
            path: '/contact',
            name: 'Contact',
            component: Contact,
            meta: { title: 'İletişim', isPublic: true }
        },
        {
            path: '/adminPanel',
            name: 'AdminPanel',
            component: AdminPanel,
            meta: { title: 'Admin Paneli', roles: ["ROLE_ADMIN"] }
        },
        {
            path: '/messages',
            name: 'Messages',
            component: Messages,
            meta: { title: 'Mesajlar', roles: ["ROLE_ADMIN"], operations: "messages", image: messagesImage }
        },
        {
            path: '/parameters',
            name: 'Parameters',
            component: Parameters,
            meta: { title: 'Parametreler', roles: ["ROLE_ADMIN"], operations: "parameters", image: parametersImage }
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
            meta: { title: 'Gazete Oku', roles: ["ROLE_USER", "ROLE_ADMIN"] }
        },
        {
          path: '/401',
          name: '401',
          component: Page401,
          meta: {title: 'Yetkisiz Erişim', isPublic: true }
        },
        {
            path: '/profile',
            name: 'UserProfile',
            component: UserProfile,
            meta: {title: 'Kullanıcı Profili', roles: ["ROLE_USER", "ROLE_ADMIN"] }
        }
    ]
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    const isPublic = to.matched.some(record => record.meta.isPublic);
    const roles = to.meta.roles;
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))  : null;
    const userRole = user ? user.role : null;

    if(isPublic){
        next();
    }
    else if (!userRole) {
        return next({
            path:'/login',
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
