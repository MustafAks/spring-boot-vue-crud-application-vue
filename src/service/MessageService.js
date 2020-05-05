import Vue from 'vue';

const SAVE_MESSAGE_URL = '/messages/save';
const LIST_MESSAGES_URL = '/messages/list';
const DELETE_MESSAGE_URL = '/messages/delete';
const DELETE_ALL_URL = '/messages/deleteAll';

class MessageService {
    
    async saveMessage(data) {
        return await Vue.prototype.$axios.post(SAVE_MESSAGE_URL, data);
    }

    async listMessages() {
        return await Vue.prototype.$axios.get(LIST_MESSAGES_URL);
    }

    async deleteMessage(id) {
        return await Vue.prototype.$axios.delete(DELETE_MESSAGE_URL, { params: { id: id } });
    }

    async deleteAll() {
        return await Vue.prototype.$axios.delete(DELETE_ALL_URL);
    }
}

export default new MessageService();
