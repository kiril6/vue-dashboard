import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueTablerIcons from 'vue-tabler-icons';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueTablerIcons);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;


new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
