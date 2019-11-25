const router = [
  //部门管理
  {
    path: "system/sys_dept",
    name: "sys_dept",
    component: resolve =>
      require(["views/system/sys_dept"], resolve),
    meta: { title: "部门列表", icon: "icon-monitor" }
  },
  {
    path: "system/sys_dept_group",
    name: "sys_dept_group",
    component: resolve =>
      require(["views/system/sys_dept/sys_dept_group"], resolve),
    meta: { title: "部门组", icon: "icon-monitor" }
  },
  //人员管理
  {
    path: "system/sys_user",
    name: "sys_user",
    component: resolve =>
      require(["views/system/sys_user"], resolve),
    meta: { title: "人员列表", icon: "icon-monitor" }
  },
  {
    path: "system/sys_user_group",
    name: "sys_user_group",
    component: resolve =>
      require(["views/system/sys_user/sys_user_group"], resolve),
    meta: { title: "人员组", icon: "icon-monitor" }
  },
  //模块管理
  {
    path: "system/sys_module",
    name: "sys_module",
    component: resolve => require(["views/system/sys_module"], resolve),
    meta: { title: "系统菜单", icon: "icon-monitor" }
  },
  //角色管理
  {
    path: "system/sys_role",
    name: "sys_role",
    component: resolve => require(["views/system/sys_role"], resolve),
    meta: { title: "系统角色", icon: "icon-monitor" }
  },
  //编码管理
  {
    path: "system/sys_dict",
    name: "sys_dict",
    component: resolve => require(["views/system/sys_dict"], resolve),
    meta: { title: "系统编码", icon: "icon-monitor" }
  },
  //系统参数
  {
    path: "system/sys_parameter",
    name: "sys_parameter",
    component: resolve => require(["views/system/sys_parameter"], resolve),
    meta: { title: "系统编码", icon: "icon-monitor" }
  },
  //表单管理
  {
    path: "system/sys_form",
    name: "sys_form",
    component: resolve => require(["views/system/sys_form"], resolve),
    meta: { title: "表单管理", icon: "icon-monitor" }
  },
  //表单分类
  {
      path: "system/sys_form_type",
      name: "system/sys_form_type",
      component: resolve => require(["views/system/sys_form_type/index"], resolve),
      meta: { title: "表单类型", icon: "icon-tickets" }
  },
  //表单分类
  {
      path: "system/sys_form_column",
      name: "system/sys_form_column",
      component: resolve => require(["views/system/sys_form_column/index"], resolve),
      meta: { title: "表单系统字段", icon: "icon-tickets" }
  }
];

export default router;
