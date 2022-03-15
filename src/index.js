import Vue from 'vue';
import app from './app.vue';
// import VueCalendarPlus from '../dist/vue-calendar-plus';
// console.log('npm', VueCalendarPlus)
// Vue.use(VueCalendarPlus);

new Vue({
  render: h => h(app)
}).$mount('#app');