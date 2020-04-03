import Vue from 'vue';

const SAVE_GAZETE_URL = '/gazete/';
const DELETE_GAZETE_URL = '/gazete/';
const LIST_GAZETE_URL = '/gazete/list';
const SAVE_SAYFA_URL = '/gazete/sayfalar/';
const GET_SAYFALAR_URL = '/gazete/sayfalar/';
const DELETE_SAYFA_URL = '/gazete/sayfalar/';

class GazeteService {
    async saveGazete(data) {
        return await Vue.prototype.$axios.post(SAVE_GAZETE_URL, data);
    }

    async deleteGazete(id) {
        return await Vue.prototype.$axios.delete(DELETE_GAZETE_URL, { params: { id: id } });
    }

    async list() {
        return await Vue.prototype.$axios.get(LIST_GAZETE_URL);
    }

    async saveSayfa(data) {
        return await Vue.prototype.$axiosFile.post(SAVE_SAYFA_URL, data, { headers: { 'Content-Type': 'multipart/form-data' } });
    }

    async deleteSayfa(id) {
        return await Vue.prototype.$axios.delete(DELETE_SAYFA_URL, { params: { id: id } });
    }

    async getSayfalar(gazeteId) {
        return await Vue.prototype.$axios.get(GET_SAYFALAR_URL, { params: { gazeteId: gazeteId } });
    }
}

export default new GazeteService();
