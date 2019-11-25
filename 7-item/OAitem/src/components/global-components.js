//树组件
export const ztree = () => import("./Ztree");

//部门选择
export const deptSelect = () =>
  import("./Ztree/components/DeptSelect/dept-select");

//人员选择
export const userSelect = () =>
  import("./Ztree/components/UserSelect/user-select");

//角色选择
export  const roleSelect = () =>
    import("./RoleSelect/role-select");

// 分页
export const page = () => import("./Page");

//字典下拉框
export const dictSelect = () => import("./DictSelect");

//文件上传
export const fileUpload = () => import("./FileUpload/file-upload");
