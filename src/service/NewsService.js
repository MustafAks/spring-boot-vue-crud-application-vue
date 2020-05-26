import Vue from 'vue';

const SAVE_NEWS_URL = '/news/save';
const DELETE_NEWS_URL = '/news/delete';
const LIST_NEWS_URL = '/news/list';
const GET_NEWS_URL = '/news/get';


class NewsService {

    async saveNews(news) {
        return await Vue.prototype.$axiosFile.post(SAVE_NEWS_URL, news, { headers: { 'Content-Type': 'image/jpg' } });
    }

    async deleteNews(id) {
        return await Vue.prototype.$axios.delete(DELETE_NEWS_URL, { params: { id: id } });
    }

    async getNews(id){
        return await Vue.prototype.$axios.get(GET_NEWS_URL, {params: {id: id}});
    }

    async list(data) {
        return await Vue.prototype.$axios.post(LIST_NEWS_URL, data);
    }
}

export default new NewsService();
