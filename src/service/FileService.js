import Vue from 'vue';

const UPLOAD_FILE_URL = '/file/uploadFile';

class FileService {
    async uploadFile(file) {
        return await Vue.prototype.$axiosFile.post(UPLOAD_FILE_URL, file);
    }
}

export default new FileService();
