<template>
  <el-row class="full">
    <el-col :span="4">
      <el-card class="full-card" shadow="never">
        <div slot="header" class="clearfix card-header">
          <span>部门列表</span>
          <i
            class="el-icon-refresh"
            style="float: right;padding:0;font-size:20px;"
            @click="()=>{this.$refs.deptTree.refresh()}"
          ></i>
        </div>
        <ztree @click="nodeClick" title="部门" ref="deptTree" url="/system/sysRole/searchTreeList" />
      </el-card>
    </el-col>
    <el-col :span="20">
      <el-card class="full-card" shadow="never">
        <div slot="header" class="clearfix card-header">
          <span>角色列表</span>
        </div>
        <div>
          <el-form :inline="true">
            <el-form-item label="角色名称">
              <el-input v-model="queryParams.roleName" placeholder="角色名称" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="loadTableData">查询</el-button>
              <el-button type="primary" @click="addRole">新增</el-button>
            </el-form-item>
          </el-form>
          <el-table
            :data="roleList"
            stripe
            border
            v-loading="tableLoading"
            :height="curFullHeight-260"
          >
            <el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
            <el-table-column label="角色类型" align="center">
              <template slot-scope="{row}">
                <span v-if="row.roleType == 1">全局</span>
                <span v-if="row.roleType == 2">私有</span>
              </template>
            </el-table-column>
            <el-table-column prop="account.state" label="角色级别" align="center">
              <template slot-scope="{row}">
                <span v-if="row.roleLevel == 1">普通角色</span>
                <span v-if="row.roleLevel == 2">单位管理员</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="220">
              <template slot-scope="{row}">
                <span v-show="isPrivate">
                  <el-link type="primary" @click="editRole(row)">编辑</el-link>
                  <el-divider direction="vertical"></el-divider>
                  <el-link type="primary" @click="delRole(row)">删除</el-link>
                  <el-divider direction="vertical"></el-divider>
                  <el-link type="primary" @click="roleModule(row)">权限</el-link>
                  <el-divider direction="vertical"></el-divider>
                </span>
                <el-link type="primary" @click="roleUser(row)">用户</el-link>
              </template>
            </el-table-column>
          </el-table>
          <page :page="page" @change="loadTableData" />
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import roleForm from "./components/role_form";
export default {
  data() {
    return {
      tableLoading: false,
      roleList: [],
      isPrivate: true,
      page: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      },
      curNode: {},
      queryParams: {}
    };
  },
  methods: {
    //点击部门节点
    nodeClick(nodeData) {
      this.curNode = nodeData;
      if (this.curNode.id == "public") {
        this.isPrivate = false;
      } else {
        this.isPrivate = true;
      }
      this.loadTableData();
    },
    //加载角色列表数据
    loadTableData() {
      this.tableLoading = true;
      Ajax.post("/system/sysRole/searchRoleList", {
        unitId: this.curNode.id,
        roleName: this.queryParams.roleName,
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      }).then(res => {
        this.roleList = res.data;
        this.page.total = res.total;
        this.tableLoading = false;
      });
    },
    //新增角色
    addRole() {
      this.$open({
        title: "新增角色",
        component: roleForm,
        width: "500px",
        props: {
          unitId: this.curNode.id
        },
        confirm: () => {
          this.loadTableData();
        }
      });
    },
    //编辑角色
    editRole(row) {
      this.$open({
        title: "编辑角色",
        component: roleForm,
        width: "500px",
        props: {
          id: row.id,
          unitId: this.curNode.id
        },
        confirm: () => {
          this.loadTableData();
        }
      });
    },
    //删除角色
    delRole(row) {
      this.$confirm("是否确认删除角色信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Ajax.delete("/system/sysRole/delInfo", {
            id: row.id
          }).then(res => {
            this.$message({
              message: "删除成功！",
              type: "success"
            });
            this.loadTableData();
          });
        })
        .catch(() => {});
    },
    //角色分配权限
    roleModule(row) {
      Ajax.post("/system/sysRole/searchRoleModuleList", {
        roleId: row.id
      }).then(res => {
        this.$openModuleSelect({
          defaultCheck: res.data,
          cascade: { Y: "s", N: "s" },
          confirm: (data, loading) => {
            loading.start();
            const selectIds = data.map(item => item.id).join(",");
            Ajax.put("/system/sysRole/saveRoleModule", {
              roleId: row.id,
              selectedId: selectIds
            }).then(res => {
              loading.close();
              this.$message({
                message: "保存成功！",
                type: "success"
              });
            });
          }
        });
      });
    },
    //分页显示条数切换
    changeListBySize(value) {
      //分页显示条数改变时默认显示第一页的数据
      this.page.cur = 1;
      this.page.size = value;
      this.loadTableData();
    },
    //分页页码切换
    changeListByPage(value) {
      this.page.cur = value;
      this.loadTableData();
    },
    //角色分配人员
    roleUser(row) {
      Ajax.post("/system/sysRole/searchRoleUser", {
        roleId: row.id
      }).then(res => {
        this.$openUserSelect({
          // allowCheckCount: 1, //只能选一个的参数
          defaultCheck: res.data, //多个值接收数组
          confirm: data => {
            Ajax.put("/system/sysRole/saveRoleUser", {
              roleId: row.id,
              roleType: row.roleType,
              users: data.join(",")
            }).then(res => {
              this.$message({
                message: "人员分配成功！",
                type: "success"
              });
            });
          }
        });
      });
    }
  }
};
</script>
