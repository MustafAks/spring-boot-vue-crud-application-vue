import Vue from 'vue';

const SAVE_SUBSCRIBER_URL = '/subscription/';
const DELETE_SUBSCRIBER_URL = '/subscription/';
const LIST = '/subscription/list';
const LISTEXPIRE = '/subscription/listSubscriptionExpiresViaDates';

class SubscriptionService {
    async list(subscriber) {
        return await Vue.prototype.$axios.post(LIST, subscriber);
    }

    async saveSubscriber(subscriber) {
        return await Vue.prototype.$axios.post(SAVE_SUBSCRIBER_URL, subscriber);
    }

    async deleteSubscriber(id) {
        return await Vue.prototype.$axios.delete(DELETE_SUBSCRIBER_URL, { params: { id: id } });
    }

    async listSubscriptionExpiresViaDates(subscriber){
        return await Vue.prototype.$axios.post(LISTEXPIRE,subscriber);
    }
}

export default new SubscriptionService();