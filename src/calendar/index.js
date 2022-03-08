import VueCalendarPlus from './src/main.vue';

VueCalendarPlus.install = function (Vue) {
  Vue.component(VueCalendarPlus.name, VueCalendarPlus);
};

export default VueCalendarPlus;