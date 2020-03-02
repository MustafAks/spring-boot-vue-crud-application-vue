import Vue from 'vue';

const SAVE_ABONE_URL = '/abone/';
const LIST = '/abone/list';

class AboneDataService {
    async list(subscriber) {
        return await Vue.prototype.$axios.post(LIST, subscriber);
    }

    async saveAbone(subscriber) {
        return await Vue.prototype.$axios.post(SAVE_ABONE_URL, subscriber);
    }
}

export default new AboneDataService();
