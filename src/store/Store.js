import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        username: null,
        userRole: null
    },
    plugins: [createPersistedState()],
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