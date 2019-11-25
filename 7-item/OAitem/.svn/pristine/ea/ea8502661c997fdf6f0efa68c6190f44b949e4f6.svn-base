import deptDialog from "@/components/Ztree/components/DeptSelect/dept-select-dialog";
import moduleDialog from "@/components/Ztree/components/ModuleSelect/module-select-dialog";
import userDialog from "@/components/Ztree/components/UserSelect/user-select-dialog";
import roleDialog from "@/components/RoleSelect/role-select-dialog";
export default {
  methods: {
    //菜单选择器点击弹窗组件
    $openDeptSelect(options) {
      if (!options) {
        options = {};
      }
      this.$open({
        title: "部门选择",
        component: deptDialog,
        width: "500px",
        props: {
          allowCheckCount: options.allowCheckCount,
          cascade: options.cascade,
          defaultCheck: options.defaultCheck
        },
        confirm: data => {
          if (options.allowCheckCount && options.allowCheckCount == 1) {
            options.confirm && options.confirm(data[0]);
          } else {
            options.confirm && options.confirm(data);
          }
        }
      });
    },
    $openModuleSelect(options) {
      if (!options) {
        options = {};
      }
      this.$open({
        title: "菜单选择",
        component: moduleDialog,
        callback: true,
        width: "500px",
        props: {
          allowCheckCount: options.allowCheckCount,
          cascade: options.cascade,
          defaultCheck: options.defaultCheck
        },
        confirm: (data, loading) => {
          if (options.allowCheckCount && options.allowCheckCount == 1) {
            options.confirm && options.confirm(data[0], loading);
          } else {
            options.confirm && options.confirm(data, loading);
          }
        }
      });
    },
    $openUserSelect(options) {
      if (!options) {
        options = {};
      }
      this.$open({
        title: "人员选择",
        component: userDialog,
        width: "800px",
        props: {
          allowCheckCount: options.allowCheckCount,
          defaultCheck: options.defaultCheck
        },
        confirm: data => {
          if (!(options.allData === true)) {
            data = data.map(item => {
              return item.key;
            });
          }

          if (options.allowCheckCount && options.allowCheckCount == 1) {
            options.confirm && options.confirm(data[0]);
          } else {
            options.confirm && options.confirm(data);
          }
        }
      });
    },
    $openRoleSelect(options) {
        if (!options) {
            options = {};
        }
        this.$open({
            title: "角色选择",
            component: roleDialog,
            width: "580px",
            props: {
                allowCheckCount: options.allowCheckCount,
                defaultCheck: options.defaultCheck
            },
            confirm: data => {
                if (options.allowCheckCount && options.allowCheckCount == 1) {
                    options.confirm && options.confirm(data[0]);
                } else {
                    options.confirm && options.confirm(data);
                }
            }
        });
    }
  }
};
