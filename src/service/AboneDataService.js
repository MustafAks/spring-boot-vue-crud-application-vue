import axios from "axios";

const ABONE_URL = "http://localhost:8085";
const SAVE_ABONE_URL = `${ABONE_URL}/abone/`;
const LIST = `${ABONE_URL}/abone/list`;

class AboneDataService {
    list(course) {
        // const qs = require('querystring')
        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }
        // return axios.post(`${LIST}`, qs.stringify(course), config);
        return axios.post(`${LIST}`, course);
    }
    saveAbone(course) {
        return axios.post(`${SAVE_ABONE_URL}`, course);
    }
}

export default new AboneDataService();
