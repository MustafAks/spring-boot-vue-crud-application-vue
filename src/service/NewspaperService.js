import Vue from 'vue';

const SAVE_NEWSPAPER_URL = '/newspaper/';
const DELETE_NEWSPAPER_URL = '/newspaper/';
const LIST_NEWSPAPER_URL = '/newspaper/list';
const SAVE_PAGE_URL = '/newspaper/pages/';
const GET_PAGES_BY_NEWSPAPER_ID_URL = '/newspaper/pages/getPagesByNewspaperId';
const DELETE_PAGE_URL = '/newspaper/pages/';
const GET_FILE_URL = '/newspaper/pages/getFile';
const GET_YEARS_URL = '/newspaper/getYears';
const GET_NEWSPAPER_BY_YEAR_URL = '/newspaper/getNewspapersByYear';

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

    async getPagesByNewspaperId(newspaperId, orderBy) {
        var request = {
            newspaperId : newspaperId,
            orderBy : orderBy
        };
        return await Vue.prototype.$axios.post(GET_PAGES_BY_NEWSPAPER_ID_URL, request);
    }

    async getFile(pageId) {
        return await Vue.prototype.$axios.get(GET_FILE_URL, { params: { pageId: pageId } });
    }

    async getYears() {
        return await Vue.prototype.$axios.get(GET_YEARS_URL);
    }

    async getNewspapersByYear(year) {
        return await Vue.prototype.$axios.get(GET_NEWSPAPER_BY_YEAR_URL, { params: { year: year } });
    }
}

export default new NewspaperService();
