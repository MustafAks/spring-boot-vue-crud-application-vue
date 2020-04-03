import Vue from 'vue';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8085',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
      throw error;
  },
);

const axiosFileInstance = axios.create({
  baseURL: 'http://localhost:8085',
  timeout: 30000,
  headers: {
    'Content-Type': 'multipart/form-data'
  },
});

axiosFileInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      throw error;
    },
);

export default {
  install() {
    Vue.prototype.$axios = axiosInstance;
    Vue.prototype.$axiosFile = axiosFileInstance;
  },
};
