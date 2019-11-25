<template>
  <!-- 组件入参分为三类，
      1：属性（键值对的形式），
      2：布尔值（一般有属性则为true，无则为false，视具体组件而定），
      3:事件(@符号定义) 
      
      sort属性为排序属性，默认暂时只支持 降序和升序两种方式，配置方式为键值对方式，键为字段属性，值为排序方式（desc，asc）

      slot为组件自定义插槽。可用于组件内容元素扩展使用。扩展示例如下。slot-scope入参为绑定查询表单的对象。
  -->
  <oa-table
    ref="table"
    :ajax="ajaxParams"
    :columns="columns"
    showToolbar
    showCheck
    showPage
    :more="true"
    keywordTxt="自定义搜索文字"
    :adjustHeight="0"
    @check="onCheck"
    :sort="['roleName']"
  >
    <template slot-scope="{queryForm}" slot="more">
      <el-form-item label="自定义扩展查询">
        <el-input v-model="queryForm.abc" placeholder="自定义扩展查询"></el-input>
      </el-form-item>
      <el-form-item label="自定义扩展查询">
        <el-input v-model="queryForm.edf" placeholder="自定义扩展查询"></el-input>
      </el-form-item>
    </template>
    <template slot-scope="{btns}" slot="btns">
      <el-button type="primary" icon="el-icon-plus" @click="addFunc">新增</el-button>
      <el-button type="success">自定义按钮1</el-button>
      <el-button icon="el-icon-remove"></el-button>
    </template>
    <template slot-scope="{row,col}" slot="render">
      <div v-if="col.prop=='roleName'">{{row.roleName}}</div>
      <el-tag v-if="col.prop=='roleDesc'">备注：{{row[col.prop]}}</el-tag>
    </template>
  </oa-table>
</template>

<script>
import formComponent from "./component/form";
export default {
  data() {
    return {
      //表格异步请求数据参数
      ajaxParams: {
        url: "/system/sysRole/searchRoleList",
        method: "post",
        params: {
          unitId: "d4dbc73312e944bf99c6a2d8bc469d51"
        }
      },
      //列头属性配置
      columns: [
        {
          //列头标题
          label: "角色名称",
          //绑定数据属性
          prop: "roleName",
          //宽度（可选）
          width: "",
          //单元格布局（默认居左）
          align: "",
          //自定义渲染方式
          render: true
        },
          {
              //列头标题
              label: "角色备注",
              //绑定数据属性
              prop: "roleDesc",
              //宽度（可选）
              width: "",
              //单元格布局（默认居左）
              align: "",
              //自定义渲染方式
              render: true
          },
        {
          label: "角色类型",
          prop: "roleType",
          //自定义单元格渲染函数，入参：行数据，出参：自定义渲染字符串
          fmt: row => {
            if (row.roleType == 2) {
              return "私有";
            }else{
                return "公用";
            }
          }
        },
        {
          label: "角色级别",
          prop: "roleLevel",
          fmt(row) {
            if (row.roleLevel == 1) {
              return "普通角色";
            }
          }
        },
        {
          label: "操作",
          align: "center",
          fixed: "right",
          //单元格自定义渲染操作
          opts: [
            {
              //按钮名称
              title: "修改",
              icon: "el-icon-plus",
              //回调事件，入参：（1：行数据，2：行角标）
              click: this.editRow
            },
            {
              title: "删除",
              click: this.deleteRow
            }
          ]
        }
      ]
    };
  },
  methods: {
    //当showCheck为true时，勾选行时的回调事件，入参：勾选后的值
    onCheck(checks) {
      console.log(checks);
    },
    //新增方法回调
    addFunc() {
      this.$open({
        title: "新增",
        width: "5rem",
        component: formComponent
      });
    },
    //修改方法回调
    editRow(row, index) {
      this.$open({
        title: "修改",
        width: "5rem",
        component: formComponent,
        props: {
          id: row.id
        }
      });
    },
    //删除方法回调
    deleteRow(row, index) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: action => {
          if (action == "confirm") {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          } else {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          }
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
</style>