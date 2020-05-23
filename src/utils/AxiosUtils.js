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
      switch (error.response.status) {
          case 401:
              throw new Error("Kullanıcı adınız veya şifreniz yanlış.");
          default:
              throw new Error(error.response.data.message);
      }
  },
);

const axiosFileInstance = axios.create({
  baseURL: 'http://localhost:8085',
  timeout: 30000,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

axiosFileInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        switch (error.response.status) {
            case 401:
                throw new Error("Kullanıcı adınız veya şifreniz yanlış.");
            default:
                throw new Error(error.response.data.message);
        }
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
  const user = JSON.parse(localStorage.getItem('user'));
    if (user !== undefined && user !== null) {
        const auth = 'Basic ' + new Buffer(user.username + ':' + user.password).toString('base64');
        config.headers['Authorization'] = auth;
    }
}

export default {
  install() {
    Vue.prototype.$axios = axiosInstance;
    Vue.prototype.$axiosFile = axiosFileInstance;
  },
};
