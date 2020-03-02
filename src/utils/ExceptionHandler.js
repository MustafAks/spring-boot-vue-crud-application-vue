import Vue from 'vue';

const errorHandlerInstance = function (err, vmi) {
  console.log('error: ' + err);
  vmi.$notify({
    message: err.message,
    icon: 'ti-close',
    horizontalAlign: 'right',
    verticalAlign: 'top',
    type: 'danger',
    timeout: 5000,
  });
  console.error('Vm id: ', vmi);
};

export default {
  install() {
    Vue.config.errorHandler = errorHandlerInstance;
  },
};
