<template>
  <el-row class="full">
    <el-col :span="4">
      <el-card class="full-card" shadow="never">
        <div slot="header" class="clearfix">
          <span>部门列表</span>
          <i
            class="el-icon-refresh"
            style="float: right;padding:0;font-size:20px;"
            @click="()=>{this.$refs.deptTree.refresh()}"
          ></i>
        </div>
        <div style="height:100%;">
          <ztree
            @click="nodeClick"
            title="部门"
            ref="deptTree"
            url="/system/addressBook/selectSysDeptList"
          />
        </div>
      </el-card>
    </el-col>
    <el-col :span="20">
      <el-card class="full-card" shadow="never">
        <div slot="header" class="clearfix">
          <span>人员列表</span>
        </div>
        <div>
          <el-form :inline="true">
            <el-form-item label="姓名">
              <el-input v-model="queryParams.userName" placeholder="姓名" clearable v-width="130"></el-input>
            </el-form-item>
            <el-form-item label="账号">
              <el-input v-model="queryParams.account" placeholder="账号" clearable v-width="130"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="queryParams.mobilephone" placeholder="手机号" clearable v-width="130"></el-input>
            </el-form-item>
            <el-form-item label="账号状态">
              <el-select v-model="queryParams.state" placeholder="账号状态" v-width="130">
                <el-option label="请选择" value></el-option>
                <el-option label="正常" value="0"></el-option>
                <el-option label="调动中" value="1"></el-option>
                <el-option label="冻结" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="loadTableData()" size="mini">查询</el-button>
              <el-button
                type="primary"
                v-show="curNode.nodeType == '1' || curNode.nodeType == '2'"
                @click="addUser"
              >新增</el-button>
            </el-form-item>
          </el-form>
          <el-table
            :data="userList"
            stripe
            :height="curFullHeight-260"
            border
            v-loading="tableLoading"
          >
            <el-table-column label="所属部门" align="center">
              <template slot-scope="{row}">{{row.deptId|dept}}</template>
            </el-table-column>
            <el-table-column prop="unit.deptName" label="所属单位" align="center">
              <template slot-scope="{row}">{{row.unitId|dept}}</template>
            </el-table-column>
            <el-table-column prop="userName" label="姓名" align="center"></el-table-column>
            <el-table-column label="性别" align="center">
              <template slot-scope="{row}">
                <span v-if="row.sex == 1">男</span>
                <span v-if="row.sex == 2">女</span>
              </template>
            </el-table-column>
            <el-table-column prop="account" label="账号" align="center"></el-table-column>

            <el-table-column prop="state" label="账号状态" align="center" v-show="false">
              <template slot-scope="{row}">
                <el-tag v-if="row.state == 0" type="success">正常</el-tag>
                <el-tag v-if="row.state == 1" type="warning">调动中</el-tag>
                <el-tag v-if="row.state == 2" type="info">冻结</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="300px">
              <template slot-scope="{row}">
                <span v-show="row.state == 1 && row.deptId != row.lastDept">
                  <el-link type="primary" @click="userReceive(row)">接收</el-link>
                </span>
                <span v-show="row.state == 1 && row.deptId == row.lastDept">
                  <el-link type="primary" @click="userCancel(row)">取消调离</el-link>
                </span>
                <span v-show="row.state != 1">
                  <el-link type="primary" @click="editUser(row)" v-show="row.defaultFlag == 1">编辑</el-link>
                  <el-divider direction="vertical"></el-divider>
                  <el-link type="primary" @click="bindRoles(row)">用户角色</el-link>
                  <el-divider direction="vertical"></el-divider>
                  <el-dropdown
                    size="medium"
                    @command="clickMore(arguments[0],row)"
                    v-show="row.defaultFlag == 1"
                    trigger="click"
                  >
                    <el-link type="primary">
                      更多操作
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-link>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="diaoli" v-show="row.state == 0">调离</el-dropdown-item>
                      <!-- <el-dropdown-item command="jieshou" v-show="row.state == 1">接收</el-dropdown-item> -->
                      <el-dropdown-item command="jianzhi" v-show="row.state == 0">兼职</el-dropdown-item>
                      <el-dropdown-item command="dongjie" v-show="row.state == 0">冻结</el-dropdown-item>
                      <el-dropdown-item command="huifu" v-show="row.state == 2">恢复</el-dropdown-item>
                      <el-dropdown-item command="chongzhimima" v-show="row.state == 0">重置密码</el-dropdown-item>
                      <el-dropdown-item divided command="shanchu">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </span>
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
import userForm from "./components/user_form";
import clickMore from "./components/click_more";
export default {
  components: {
    userForm
  },
  mixins: [clickMore],
  data() {
    return {
      tableLoading: false,
      queryParams: {},
      curNode: {},
      userList: [],
      deptTreeDatas: [],
      page: {
        pageNumber: 1,
        pageSize: 10,
        total: 100
      }
    };
  },
  methods: {
    //点击部门节点
    nodeClick(nodeData) {
      let dept = nodeData.item;
      this.curNode = dept;
      this.loadTableData();
    },
    //加载用户列表数据
    loadTableData() {
      this.tableLoading = true;
      let params = {
        userName: this.queryParams.userName,
        account: this.queryParams.account,
        mobilephone: this.queryParams.mobilephone,
        state: this.queryParams.state,
        deptNo: this.curNode.deptNo,
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      };
      //如果具有查询条件，不使用deptNo查询
      Ajax.post("/system/sysUser/selectUserList", params)
        .then(res => {
          this.userList = res.data;
          this.page.total = res.total;
          this.tableLoading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    addUser() {
      Ajax.post("/system/sysUser/getUUID", {})
        .then(res => {
          this.$open({
            title: "新增用户",
            component: userForm,
            width: "800px",
            props: {
              deptId: this.curNode.deptId,
              fileId: res.data
            },
            confirm: () => {
              this.loadTableData();
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    editUser(row) {
      this.$open({
        title: "编辑用户",
        component: userForm,
        width: "800px",
        props: {
          userId: row.userId,
          fileId: row.accountId
        },
        confirm: () => {
          this.loadTableData();
        }
      });
    },
    //用户调离接收
    userReceive(row) {
      this.$confirm(`是否确认接收该人员？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        dangerouslyUseHTMLString: true
      })
        .then(() => {
          Ajax.put("/system/sysUser/userReceive", {
            accountId: row.accountId,
            userId: row.userId
          }).then(res => {
            this.$message({
              type: "success",
              message: "接收成功!"
            });
            this.loadTableData();
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    //取消用户调离
    userCancel(row) {
      this.$confirm(`是否确认取消调离？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        dangerouslyUseHTMLString: true
      })
        .then(() => {
          Ajax.put("/system/sysUser/userCancel", {
            accountId: row.accountId,
            userId: row.userId
          }).then(res => {
            this.$message({
              type: "success",
              message: "接收成功!"
            });
            this.loadTableData();
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    bindRoles(row) {
      this.$message.warning("绑定角色");
    }
  }
};
</script>

<style lang='scss' scoped>
</style>