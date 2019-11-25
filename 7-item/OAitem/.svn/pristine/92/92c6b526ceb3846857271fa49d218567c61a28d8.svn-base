<template>
  <div v-loading="formLoading">
    <el-form :model="dept" :rules="rules" label-width="180px" ref="deptForm">
      <el-form-item label="上级部门">
        <!-- <dept-select :allowCheckCount="1" v-model="dept.parentId" /> -->
        <el-tag effect="dark">{{parentName}}</el-tag>
      </el-form-item>
      <el-form-item label="部门名称" prop="deptName">
        <el-input v-model="dept.deptName" autocomplete="off" @blur="changeShortName"></el-input>
      </el-form-item>
      <el-form-item label="部门简称" prop="deptShortName">
        <el-input v-model="dept.deptShortName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="排序码" prop="deptSort">
        <el-input-number v-model="dept.deptSort" autocomplete="off"></el-input-number>
      </el-form-item>
      <el-form-item label="所属层级" prop="layerCode">
        <el-select v-model="dept.layerCode" placeholder="请选择所属层级">
          <el-option label="市" value="01"></el-option>
          <el-option label="区县" value="0101"></el-option>
          <el-option label="乡" value="010101"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否为行政区域" prop="districtState">
        <el-select v-model="dept.districtState" placeholder="请选择是否为行政区域">
          <el-option label="否" value="0"></el-option>
          <el-option label="是" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否为虚拟单位" v-if="dept.districtState == '0'" prop="virtualState">
        <el-select v-model="dept.virtualState" placeholder="请选择是否为虚拟单位">
          <el-option label="否" value="0"></el-option>
          <el-option label="是" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="类型(单位或部门)"
        prop="nodeType"
        v-if="dept.districtState == '0' && dept.virtualState == '0'"
      >
        <el-select v-model="dept.nodeType" placeholder="请选择类型">
          <el-option label="单位" value="1"></el-option>
          <el-option label="部门" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="部门类型(部门或科室)"
        prop="deptType"
        v-if="dept.districtState == '0' && dept.virtualState == '0' && dept.nodeType == '2'"
      >
        <el-select v-model="dept.deptType" placeholder="请选择部门类型">
          <el-option label="部门" value="1"></el-option>
          <el-option label="科室" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="LOGO图片" v-if="dept.nodeType == '1'">
        <file-upload :props="props" :tip="tip" limit="1" :limitType="limitType" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import deptFromRules from "./dept_form_rules";
import store from "@/store";

export default {
  mixins: [deptFromRules],
  props: {
    parentId: String,
    parentName: String,
    deptId: String,
    fileId: String
  },
  computed: {
    tip() {
      if (store.state.dict.parameter.limitFileType_logo) {
        return (
          "注意：只能上传文件类型为" +
          store.state.dict.parameter.limitFileType_logo.paramText +
          "的文件"
        );
      } else {
        return "";
      }
    }
  },
  data() {
    return {
      dept: {},
      formLoading: false,
      props: {
        fileId: this.fileId,
        type: "logo"
      }
    };
  },
  methods: {
    confirm(done, fail) {
      this.$refs.deptForm.validate(valid => {
        if (valid) {
          if (this.dept.districtState != "0") {
            delete this.dept["virtualState"];
          }
          if (this.dept.districtState != "0" || this.dept.virtualState != "0") {
            delete this.dept["nodeType"];
          }
          if (
            this.dept.districtState != "0" ||
            this.dept.virtualState != "0" ||
            this.dept.nodeType != "2"
          ) {
            delete this.dept["deptType"];
          }
          Ajax.put("/system/sysDept/saveOrUpdateDept", this.dept,'json').then(res => {
            this.$message.success("保存成功");
            done();
          });
        } else {
          fail();
        }
      });
    },
    changeShortName() {
      if (this.dept.deptShortName == "" || this.dept.deptShortName == null) {
        this.dept.deptShortName = this.dept.deptName;
      }
    }
  },
  created() {
    this.formLoading = true;
    Ajax.post("/system/sysDept/initDeptInfo", {
      deptId: this.deptId
    }).then(res => {
      this.dept = res.data;
      //新增
      if (this.parentId != null) {
        this.$set(this.dept, "parentId", this.parentId);
      }
      this.$set(this.dept, "deptId", this.fileId);

      this.formLoading = false;
    });
  }
};
</script>

<style lang='scss' scoped>
</style>