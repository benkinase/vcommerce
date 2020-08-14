import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { fb } from "./firebase";
import Vuefirestore from "vue-firestore";

require("firebase/firestore");

// Vue firestore
Vue.use(Vuefirestore, {
  key: "id", // the name of the property. Default is '.key'.
  enumerable: true,
});

Vue.config.productionTip = false;

// check user status (admin/sessions)
let ap = "";
fb.auth().onAuthStateChanged(function() {
  if (!ap) {
    new Vue({
      router,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
