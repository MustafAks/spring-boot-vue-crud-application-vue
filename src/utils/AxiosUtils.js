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

axiosInstance.interceptors.request.use(
  (config) => {
    addBasicAuthenticationToHeader(config);
    return config
  },
  (error) => {
      throw error;
  },
);

axiosFileInstance.interceptors.request.use(
  (config) => {
    addBasicAuthenticationToHeader(config);
    return config
  },
  (error) => {
    throw error;
  },
);

function addBasicAuthenticationToHeader(config) {
  console.log("Axios Request Prepare.");
  const user = JSON.parse(localStorage.getItem('user'));
  const auth = 'Basic ' + new Buffer(user.username + ':' + user.password).toString('base64');
  config.headers['Authorization'] = auth;
  console.log(JSON.stringify(config));
}

export default {
  install() {
    Vue.prototype.$axios = axiosInstance;
    Vue.prototype.$axiosFile = axiosFileInstance;
  },
};
