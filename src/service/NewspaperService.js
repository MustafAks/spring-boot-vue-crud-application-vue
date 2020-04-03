import Vue from 'vue';

const SAVE_NEWSPAPER_URL = '/newspaper/';
const DELETE_NEWSPAPER_URL = '/newspaper/';
const LIST_NEWSPAPER_URL = '/newspaper/list';
const SAVE_PAGE_URL = '/newspaper/pages/';
const GET_PAGES_URL = '/newspaper/pages/';
const DELETE_PAGE_URL = '/newspaper/pages/';

class NewspaperService {
    async saveNewspaper(data) {
        return await Vue.prototype.$axios.post(SAVE_NEWSPAPER_URL, data);
    }

    async deleteNewspaper(id) {
        return await Vue.prototype.$axios.delete(DELETE_NEWSPAPER_URL, { params: { id: id } });
    }

    async list() {
        return await Vue.prototype.$axios.get(LIST_NEWSPAPER_URL);
    }

    async savePage(data) {
        return await Vue.prototype.$axiosFile.post(SAVE_PAGE_URL, data, { headers: { 'Content-Type': 'multipart/form-data' } });
    }

    async deletePage(id) {
        return await Vue.prototype.$axios.delete(DELETE_PAGE_URL, { params: { id: id } });
    }

    async getPages(newspaperId) {
        return await Vue.prototype.$axios.get(GET_PAGES_URL, { params: { newspaperId: newspaperId } });
    }
}

export default new NewspaperService();
