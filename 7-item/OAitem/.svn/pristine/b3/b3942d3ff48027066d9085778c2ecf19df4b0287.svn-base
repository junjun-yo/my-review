import jianzhiList from "./jianzhi_list";
export default {
  component: {
    jianzhiList
  },
  methods: {
    clickMore(command, row) {
      if (command == "diaoli") {
        this.$openDeptSelect({
          allowCheckCount: 1,
          defaultCheck: row.deptId,
          confirm: data => {
            if (data.id == row.deptId) {
              this.$message.error("调离部门与当前部门一致，请重新选择！");
            } else {
              Ajax.put("/system/sysUser/userTransferAway", {
                userId: row.userId,
                deptId: data.id
              }).then(res => {
                this.$message({
                  type: "success",
                  message: "调离成功!"
                });
                this.loadTableData();
              });
            }
          }
        });
      } else if (command == "jianzhi") {
        this.$open({
          title: "兼职情况列表",
          width: "800px",
          component: jianzhiList,
          showConfirmBtn: false,
          props: {
            accountId: row.accountId
          }
        });
      } else if (command == "chongzhimima") {
        this.$confirm(
          `密码将被重置为【<span style="color:red">` +
            this.$store.state.dict.parameter.accountInitPassword.paramText +
            `</span>】, 是否继续?`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            dangerouslyUseHTMLString: true
          }
        )
          .then(() => {
            Ajax.put("/system/sysUser/resetPassword", {
              accountId: row.accountId
            }).then(res => {
              this.$message({
                type: "success",
                message: "密码重置成功!"
              });
            });
          })
          .catch(() => {});
      } else if (command == "dongjie") {
        this.$confirm("此操作将冻结该人员, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            Ajax.put("/system/sysUser/userFreeze", {
              accountId: row.accountId
            }).then(res => {
              this.$message({
                type: "success",
                message: "用户冻结成功!"
              });
              this.loadTableData();
            });
          })
          .catch(() => {});
      } else if (command == "huifu") {
        this.$confirm("此操作将恢复该人员, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            Ajax.put("/system/sysUser/userRecovery", {
              accountId: row.accountId,
              userId: row.userId
            }).then(res => {
              this.$message({
                type: "success",
                message: "用户恢复成功!"
              });
              this.loadTableData();
            });
          })
          .catch(() => {});
      } else if (command == "shanchu") {
        this.$confirm("此操作将永久删除该人员, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            Ajax.delete("/system/sysUser/deleteByUserId", {
              id: row.accountId
            }).then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.loadTableData();
            });
          })
          .catch(() => {});
      }
    }
  }
};
