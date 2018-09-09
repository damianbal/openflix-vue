import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

import {base} from "@/config"

// Components
import BaseMovie from "./components/BaseMovie";
import BasePlayer from "./components/BasePlayer";
import BaseLoading from "./components/BaseLoading";


import "./assets/styles/style.scss";
import axios from "axios";
import Laracan from "./plugins/Laracan/Laracan";
import Obj2HTML from "./plugins/vue-obj2html/src/obj2html";
import VueNeto from "./plugins/vue-neto/src/VueNeto";
import { Bus } from "./bus";
import api from "./config";


Vue.config.productionTip = false;

if (localStorage.getItem("token") != null) {
  console.log('You are signed in: ', localStorage.getItem("token"))
 axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");
} else {
  console.log('You are not signed in!')
}

Vue.component("base-movie", BaseMovie);
Vue.component("base-player", BasePlayer);
Vue.component("base-loading", BaseLoading);

Vue.mixin({
  data: () => {
    return {
      signed_in: localStorage.getItem("token")
    }
  },
  watch: {
    // when route changes change signed_in status 
    
    '$route': function (to, from) {
      this.signed_in = localStorage.getItem("token")
    }
  },
  computed: {

    isSignedIn: function() {
      return this.signed_in != null;
    } 
  }
})

Bus.$on('unliked', movieId => {
  // unlike it
  axios.post(api + "/movie/" + movieId + "/unlike")
})

Bus.$on('liked', movieId => {
  // like it
  axios.post(api + "/movie/" + movieId + "/like")
})

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

