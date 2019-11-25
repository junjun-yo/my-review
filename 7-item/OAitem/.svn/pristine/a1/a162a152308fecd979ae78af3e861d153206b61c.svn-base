import Vue from "vue";
import * as filters from "./vue/filters";
import "treeselect/dist/vue-treeselect.css";
//初始化js调用组件
import * as components from "@/components/global-components";

//初始化计算rem
window.onresize = function () {
  document.documentElement.style.fontSize =
    (document.documentElement.clientWidth * 100) / 1920 + "px";
};
window.onload = function () {
  window.onresize();
};
window.onresize();

//初始化过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

//动态注册mixins
const mixins = require.context("./mixins", true, /\.js$/);
mixins.keys().forEach(key => {
  const value = mixins(key);
  Vue.mixin(value.default);
}, {});

//全局化组件
Object.keys(components).forEach(key => {
  Vue.component(key, components[key]);
});

//动态注册指令
const directives = require.context("./directives", true, /\.js$/);
directives.keys().forEach(key => {
  const name = key.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = directives(key);
  Vue.directive(name, value.default);
}, {});
