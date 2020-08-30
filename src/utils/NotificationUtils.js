import Vue from 'vue';

const notificationInstance = function (vmi, message) {
  vmi.$notify({
    message,
    icon: 'ti-info',
    horizontalAlign: 'right',
    verticalAlign: 'top',
    type: 'info',
    timeout: 5000,
  });
};

const errorNotificationInstance = function (vmi, message) {
  vmi.$notify({
    message,
    icon: 'ti-info',
    horizontalAlign: 'right',
    verticalAlign: 'top',
    type: 'danger',
    timeout: 5000,
  });
};

export default {
  install() {
    Vue.prototype.$notification = notificationInstance;
    Vue.prototype.$errorNotification = errorNotificationInstance;
  },
};