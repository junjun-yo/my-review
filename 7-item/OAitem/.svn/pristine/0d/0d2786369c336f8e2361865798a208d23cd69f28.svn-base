import Vue from "vue";
import { Message } from "element-ui";
const state = {
  dept: [],
  dict: [],
  parameter: [],
  user: []
};

const mutations = {
  updateDept: (state, data) => {
    state.dept = data;
  },
  updateDict: (state, data) => {
    state.dict = data;
  },
  updateParameter: (state, data) => {
    state.parameter = data;
  },
  updateUser: (state, data) => {
    state.user = data;
  }
};

const actions = {
  loadCacheData({ commit, state }) {
    //由于js的异步线程导致不得不用jquery的ajax的同步方式
    jquery.ajax({
      method: "POST",
      async: false,
      headers: {
        Authorization: localStorage.getItem("token")
      },
      url: `${process.env.VUE_APP_BASE_API}/common/cacheData/getCacheDataAll`,
      success: res => {
        const { data, success } = res;
        if (success && data) {
          Vue.filter("dept", deptId => {
            if (data.dept) {
              const target = data.dept.find(d => {
                return d.key == deptId;
              });
              if (target) {
                return target.value;
              } else {
                return "";
              }
            } else {
              return "";
            }
          });
          Vue.filter("dict", (dictId, type) => {
            if (data.dict[type]) {
              const target = data.dict[type].find(d => {
                return d.key == dictId;
              });
              if (target) {
                return target.value;
              } else {
                return "";
              }
            } else {
              return "";
            }
          });
          commit("updateDept", data.dept);
          commit("updateDict", data.dict);
          commit("updateParameter", data.parameter);
          commit("updateUser", data.user);
        }
      },
      error: err => {
        if (err.status != "401") Message.error(`缓存加载异常`);
      }
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
