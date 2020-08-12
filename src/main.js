import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { fb } from "./firebase";
import jQuery from "jquery";

window.$ = window.jQuery = jQuery;

import "./assets/Admin.scss";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "../node_modules/popper.js/dist/popper.min.js";
Vue.config.productionTip = false;

// check user status (admin/sessions)
let app = "";
fb.auth().onAuthStateChanged(function() {
  if (!app) {
    new Vue({
      router,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
