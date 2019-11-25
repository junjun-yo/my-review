<template>
  <el-row class="full">
    <el-col :span="4">
      <el-card class="full-card" shadow="never">
        <div slot="header" class="clearfix">
          <span>单位列表</span>
          <i
            class="el-icon-refresh"
            style="float: right;padding:0;font-size:20px;"
            @click="()=>{this.$refs.deptTree.refresh()}"
          ></i>
        </div>
        <div style="height:100%;">
          <ztree
            url="/system/addressBook/selectSysDeptList"
            @click="nodeClick"
            title="部门"
            ref="deptTree"
          />
        </div>
      </el-card>
    </el-col>
    <el-col :span="20">
      <el-card class="full-card" shadow="never">
        <div slot="header" class="clearfix">
          <span>部门组列表</span>
        </div>
        <div>
          <div style="float:right;margin-bottom:10px;">
            <el-button type="primary" @click="addDeptGroup()" size="mini">新增部门组</el-button>
          </div>
          <el-table
            :data="deptGroupList"
            stripe
            :height="curFullHeight-260"
            border
            v-loading="tableLoading"
          >
            <el-table-column label="序号" align="center">
              <template slot-scope="{$index}">{{$index+1}}</template>
            </el-table-column>
            <el-table-column label="部门组名称" align="center">
              <template slot-scope="{row,$index}">
                <span v-show="row.editable">
                  <el-input placeholder="请输入部门组名称" v-model="row.newName" clearable>
                    <el-button
                      slot="append"
                      icon="el-icon-check"
                      @click="editGroupName(row,$index)"
                    ></el-button>
                  </el-input>
                </span>
                <span v-show="!row.editable">{{row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="{row,$index}">
                <el-link type="primary" @click="editGroupDept(row)">编辑部门</el-link>
                <el-divider direction="vertical"></el-divider>
                <el-link type="primary" @click="editDeptGroup(row,$index)">编辑组名</el-link>
                <el-divider direction="vertical"></el-divider>
                <el-link type="danger" @click="deleteDeptGroup(row,$index)">删除组及以下部门</el-link>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            style="float:right"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.cur"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="page.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
          ></el-pagination>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import deptGroupForm from "./components/dept_group_form";
export default {
  components: {
    deptGroupForm
  },
  data() {
    return {
      tableLoading: false,
      curNode: {},
      deptGroupList: [
        {
          name: 123
        },
        {
          name: 245
        }
      ],
      page: {
        cur: 1,
        size: 10,
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
    //加载列表数据
    loadTableData() {
      this.tableLoading = true;
      this.tableLoading = false;
    },
    //分页事件
    handleSizeChange() {},
    handleCurrentChange() {},
    //新增部门组弹窗
    addDeptGroup() {
      this.$open({
        title: "新增部门组",
        component: deptGroupForm,
        width: "400px",
        props: {
          mode: "add"
        },
        confirm: () => {
          this.loadTableData();
        }
      });
    },
    //编辑部门组下所挂部门
    editGroupDept(row) {
      this.$message.warning("弹出部门选择框");
    },
    //展示修改部门组名称输入框
    editDeptGroup(row, index) {
      let newRow = Object.assign({}, row, {
        newName: row.name,
        editable: !row.editable
      });
      this.$set(this.deptGroupList, index, newRow);
    },
    //修改部门组名称
    editGroupName(row, index) {
      if (!row.newName) {
        this.$message.warning("部门组名称不能为空");
        return false;
      }
      let param = {
        id: row.id,
        name: row.newName
      };
      this.$message.success("修改成功");
      //更新行状态
      row.editable = false;
      row.name = row.newName;
      let newRow = Object.assign({}, row);
      this.$set(this.deptGroupList, index, newRow);
    },
    deleteDeptGroup(row, index) {
      this.$confirm("是否要删除该部门组及其关联的部门信息", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$message.success("删除成功");
        })
        .catch(() => {});
    }
  }
};
</script>
