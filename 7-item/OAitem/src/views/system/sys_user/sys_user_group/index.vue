<template>
  <el-row class="full">
    <el-col :span="24">
      <el-card class="full-card" shadow="never">
        <div slot="header" class="clearfix">
          <span>人员组列表</span>
        </div>
        <div>
          <el-form :inline="true">
            <el-form-item label="名称">
              <el-input v-model="queryParams.groupName" placeholder="名称" clearable v-width="130"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="loadTableData()" size="mini">查询</el-button>
              <el-button type="primary" @click="addUserGroup">新增</el-button>
            </el-form-item>
          </el-form>
          <el-table
            :data="userList"
            stripe
            :height="curFullHeight-260"
            border
            v-loading="tableLoading"
          >
            <el-table-column label="序号" align="center">
              <template slot-scope="{$index}">{{$index+1}}</template>
            </el-table-column>
            <el-table-column prop="groupName" label="名称" align="center"></el-table-column>
            <el-table-column label="描述" align="center">
              <template slot-scope="{row}">
                <span>{{row.description}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="300px">
              <template slot-scope="{row}">
                <el-link type="primary" @click="bindUser(row)">人员</el-link>
                <el-divider direction="vertical"></el-divider>
                <el-link type="primary" @click="editUserGroup(row)">编辑</el-link>
                <el-divider direction="vertical"></el-divider>
                <el-link type="primary" @click="deleteUserGroup(row)">删除组</el-link>
              </template>
            </el-table-column>
          </el-table>
          <page :page="queryParams" @change="loadTableData" />
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import userGroupForm from "./components/user_group_form";
export default {
  components: {
    userGroupForm
  },
  computed: {
    unitId() {
      return this.$store.state.account.sysUnit.deptId;
    }
  },
  watch: {
    unitId() {
      //默认查询当前登录人所属单位的用户组
      this.loadTableData();
    }
  },
  data() {
    return {
      tableLoading: false,
      queryParams: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      },
      userList: []
    };
  },
  methods: {
    //点击部门节点
    nodeClick(nodeData) {
      let dept = nodeData.item;
      this.curNode = dept;
      //该节点类型为单位
      if (this.curNode.nodeType == 1) {
        this.queryParams.unitId = this.curNode.unitId;
        this.loadTableData();
      } else {
        this.userList = [];
      }
    },
    //加载用户组列表数据
    loadTableData() {
      this.tableLoading = true;
      this.queryParams["unitId"] = this.unitId;

      Ajax.post(
        "/system/sysUserGroup/selectUserGroupList",
        this.queryParams
      ).then(res => {
        this.userList = res.data;
        this.queryParams.total = res.total;
        this.tableLoading = false;
      });
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    addUserGroup() {
      this.$open({
        title: "新增用户组",
        component: userGroupForm,
        width: "4rem",
        props: {
          mode: "add",
          unitId: this.queryParams.unitId
        },
        confirm: () => {
          this.loadTableData();
        }
      });
    },
    bindUser(row) {
      Ajax.post("/system/sysUserGroup/selectUserGroupUserIdList", {
        groupId: row.id
      }).then(res => {
        this.$openUserSelect({
          // allowCheckCount: 1, //只能选一个的参数
          defaultCheck: res.data, //多个值接收数组
          confirm: data => {
            Ajax.put("/system/sysUserGroup/saveUserGroupUserList", {
              groupId: row.id,
              userIds: data.join(",")
            }).then(res => {
              this.$message({
                message: "人员分配成功！",
                type: "success"
              });
            });
          }
        });
      });
    },
    editUserGroup(row) {
      this.$open({
        title: "编辑用户组",
        component: userGroupForm,
        width: "4rem",
        props: {
          mode: "edit",
          id: row.id
        },
        confirm: () => {
          this.loadTableData();
        }
      });
    },
    deleteUserGroup(row) {
      this.$confirm("此操作将永久删除该分组, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Ajax.delete("/system/sysUserGroup/deleteUserGroupInfo", {
            id: row.id
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
  },
  created() {
    if (this.unitId) {
      this.loadTableData();
    }
  }
};
</script>
