import store from "@/store";
const initAll = () => {
  //加载用户信息
  store.dispatch("account/loadInfo");
  //加载字典缓存
  store.dispatch("dict/loadCacheData");
};

export default initAll;
