import "babel-polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import "./plugins/element.js";
import "./js/install";
import "./style/app.scss";
import "./elements/install";
import "components/FormDesign/install.js";

import "../public/ueditor/ueditor.config.js"
import "../public/ueditor/ueditor.all.min.js"
import  "../public/ueditor/ueditor.parse.js"
import "../public/ueditor/lang/zh-cn/zh-cn.js"

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
