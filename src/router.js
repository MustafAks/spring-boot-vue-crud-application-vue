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
import SubscriberEndDateControl from "./views/subscribers/SubscriberEndDateControl";
import Login from "./views/user/Login";
import AddNewspaper from "./views/newspapers/AddNewspaper";
import AddPages from "./views/newspapers/AddPages";
import Page401 from "./views/Page401";
import Newspapers from "./views/newspapers/Newspapers";
import News from "./views/news/News";
import AddNews from "./views/news/AddNews";
import UpdateNews from "./views/news/UpdateNews";
import NewsList from "./views/news/NewsList";
import AddAdvertisement from "./views/advertisements/AddAdvertisement";
import AdvertisementsList from "./views/advertisements/AdvertisementsList";
import EmbeddedFile from "./views/newspapers/EmbeddedFile";
import AdminPanel from "./views/adminPanel/AdminPanel";
import addSubscriberImage from "./assets/images/AdminPanelImages/addSubscriber.png"
import filterImage from "./assets/images/AdminPanelImages/filter.png"
import endImage from "./assets/images/AdminPanelImages/end.png"
import newspaperImage from "./assets/images/AdminPanelImages/newspaper.png"
import newsImage from "./assets/images/AdminPanelImages/news.png"
import newsListImage from "./assets/images/AdminPanelImages/newsList.png"
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
            path: '/news',
            name: 'News',
            component: News,
            meta: { title: 'Detay', isPublic: true }
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
            path: '/addNewspaper',
            name: 'AddNewspaper',
            component: AddNewspaper,
            meta: { title: 'Gazete Ekle', roles: ["ROLE_ADMIN"], operations: "newspapers", image: newspaperImage }
        },
        {
            path: '/addNews',
            name: 'AddNews',
            component: AddNews,
            meta: { title: 'Haber Ekle', roles: ["ROLE_ADMIN"], operations: "newspapers", image: newsImage }
        },
        {
            path: '/updateNews',
            name: 'UpdateNews',
            component: UpdateNews,
            meta: { title: 'Haber Güncelle', roles: ["ROLE_ADMIN"] }
        },
        {
            path: '/listNews',
            name: 'NewsList',
            component: NewsList,
            meta: { title: 'Haber Düzenle', roles: ["ROLE_ADMIN"], operations: "newspapers", image: newsListImage }
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
            path: '/addPages',
            name: 'AddPages',
            component: AddPages,
            meta: { title: 'Sayfa Ekle', roles: ["ROLE_ADMIN"] }
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
            path: '/subscriberEndDateControl',
            name: 'SubscriberEndDateControl',
            component: SubscriberEndDateControl,
            meta: {title: 'Abonelik Bitiş', roles: ["ROLE_ADMIN"], operations: "subscriptions", image: endImage }
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
