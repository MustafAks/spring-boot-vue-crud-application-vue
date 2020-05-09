import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        username: null,
        userRole: null
    },
    plugins: [createPersistedState({
        storage: {
            getItem: key => Cookies.get(key),
            setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
            removeItem: key => Cookies.remove(key)
        }
    })],
    mutations: {
        logout(state) {
            state.username = null;
            state.userRole = null;
        },
        setUsername(state, username) {
            state.username = username;
        },
        setUserRole(state, userRole) {
            state.userRole = userRole;
        }
    }
});

export default store;