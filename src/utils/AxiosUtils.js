import Vue from 'vue';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8085',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
      throw error;
  },
);

axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(JSON.stringify("LocalStorage:", user));
    const auth = 'Basic ' + new Buffer(user.username + ':' + user.password).toString('base64');
    config.headers['Authorization'] = auth;
    console.log(JSON.stringify(config));
    return config
  },
  (error) => {
      throw error;
  },
);

export default {
  install() {
    Vue.prototype.$axios = axiosInstance;
  },
};
