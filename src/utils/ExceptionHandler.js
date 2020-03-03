import Vue from 'vue';

const errorHandlerInstance = function (err, vmi) {
  vmi.$notify({
    message: err.message,
    icon: 'ti-close',
    horizontalAlign: 'right',
    verticalAlign: 'top',
    type: 'danger',
    timeout: 5000,
  });
};

export default {
  install() {
    Vue.config.errorHandler = errorHandlerInstance;
  },
};
