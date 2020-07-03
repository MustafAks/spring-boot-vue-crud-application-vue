import Vue from 'vue';

const SAVE_ADVERTISEMENT_URL = '/advertisement/save';
const DELETE_ADVERTISEMENT_URL = '/advertisement/delete';
const LIST_ADVERTISEMENTS_URL = '/advertisement/list';
const GET_ADVERTISEMENT_URL = '/advertisement/get';

class AdvertisementsService {

    async saveAdvertisement(advertisement) {
        return await Vue.prototype.$axiosFile.post(SAVE_ADVERTISEMENT_URL, advertisement, { headers: { 'Content-Type': 'image/jpg' } });
    }

    async deleteAdvertisement(id) {
        return await Vue.prototype.$axios.delete(DELETE_ADVERTISEMENT_URL, { params: { id: id } });
    }

    async getAdvertisement(id){
        return await Vue.prototype.$axios.get(GET_ADVERTISEMENT_URL, {params: {id: id}});
    }

    async list() {
        return await Vue.prototype.$axios.get(LIST_ADVERTISEMENTS_URL);
    }
}

export default new AdvertisementsService();
