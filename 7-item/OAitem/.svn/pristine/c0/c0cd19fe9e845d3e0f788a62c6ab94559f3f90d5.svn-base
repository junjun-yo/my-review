import { transLoginInfo, resetLoginInfo } from "@/js/utils/account";

const state = {
  sysUser: {},
  moduleList: [],
  positionList: []
};

const mutations = {
  updateSysUser: (state, data) => {
    state.sysUser = data;
  },
  updateModuleList: (state, data) => {
    state.moduleList = data;
  },
  updatePositionList: (state, data) => {
    state.positionList = data;
  }
};

const actions = {
  login({ commit }, userForm) {
    return new Promise((resolve, reject) => {
      Ajax.post("login/login", userForm).then(
        res => {
            console.log(res);
          transLoginInfo({ commit, loginInfo: res.data });
          resolve();
        },
        error => {
          reject(error);
        }
      );
    });
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      Ajax.post("login/logout").then(
        () => {
          resetLoginInfo({ commit });
          resolve();
        },
        error => {
          reject(error);
        }
      );
    });
  },
  loadInfo({ commit }) {
    return new Promise((resolve, reject) => {
      Ajax.post("common/cacheData/searchUserByRequest").then(
        res => {
          transLoginInfo({ commit, loginInfo: res.data });
          resolve();
        },
        error => {
          reject(error);
        }
      );
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
