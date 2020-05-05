import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import './element-variables.scss';
import router from './router';

Vue.config.productionTip = false;

Vue.use(ElementUI, { size: 'small' });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
