export const transLoginInfo = ({ commit, loginInfo }) => {
  const {
    token,
    sysUser,
    moduleList,
    positionList
  } = loginInfo;
  localStorage.setItem("token", token);
  commit("updateSysUser", sysUser);
  commit("updateModuleList", moduleList);
  commit("updatePositionList", positionList);
};

export const resetLoginInfo = ({ commit }) => {
  localStorage.removeItem("token");
  commit("updateSysUser", {});
  commit("updateModuleList", []);
  commit("updatePositionList", []);
};
