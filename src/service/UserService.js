import Vue from 'vue';

const LOGIN = '/user/login';

class UserService {
    async login(user) {
        return await Vue.prototype.$axios.post(LOGIN, user);
    }
}

export default new UserService();
