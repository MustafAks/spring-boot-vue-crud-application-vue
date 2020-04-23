import Vue from 'vue';

const SAVE_PARAMETERS_URL = '/parameters/';
const GET_PARAMETERS_URL = '/parameters/';

class ParameterService {
    async saveParameters(data) {
        return await Vue.prototype.$axios.post(SAVE_PARAMETERS_URL, data);
    }

    async getParameters() {
        return await Vue.prototype.$axios.get(GET_PARAMETERS_URL);
    }
}

export default new ParameterService();