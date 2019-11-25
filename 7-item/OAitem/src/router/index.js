import Vue from "vue";
import VueRouter from "vue-router";
import { Loading } from "element-ui";

//路由分模块管理

const components = require.context("../views", true, /router\.js$/);
let modules = [];
components.keys().forEach((key, i) => {
  const value = components(key);
  modules = modules.concat(value.default);
});

Vue.use(VueRouter);

const constantRoutes = [
  {
    path: "/login",
    name: "Login",
    component: resolve => require(["views/login"], resolve),
    meta: { title: "登录", icon: "icon-monitor" }
  },
  {
    path: "/test",
    name: "test",
    component: resolve => require(["views/test"], resolve)
  },
  {
    path: "/test2",
    name: "test2",
    component: resolve => require(["views/test2"], resolve)
  },
  {
    path: "/draggableTest",
    name: "draggableTest",
    component: resolve => require(["views/draggableTest/index"], resolve)
  },
  {
    path: "/",
    component: resolve =>
      require(["components/App/app-frame/index.vue"], resolve),
    children: [
      {
        path: "",
        name: "home",
        component: resolve => require(["views/home"], resolve),
        meta: { title: "首页", icon: "icon-monitor" }
      },
      ...modules,
      //示例模板测试
      {
        path: "/cruddemo",
        name: "cruddemo",
        component: resolve => require(["views/cruddemo"], resolve)
      },
      {
        path: "*",
        component: resolve => require(["components/ErrorPages/404"], resolve),
        meta: { title: "页面找不到" }
      }
    ]
  }
];

let router = new VueRouter({
  mode: "history",
  routes: constantRoutes
});

let loadingInstance = null;

router.beforeEach((to, from, next) => {
  loadingInstance = Loading.service({
    lock: true,
    text: "加载中",
    spinner: "el-icon-loading",
    background: "rgba(255, 255, 255, 0)"
  });
  if (to.meta && to.meta.title) {
    document.title = to.meta.title + " - 办公应用";
  } else {
    document.title = "办公系统";
  }
  next();
});

router.afterEach(() => {
  loadingInstance.close();
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
});

export default router;
