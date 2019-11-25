<template>
  <div v-loading="formLoading">
    <el-form :model="dept" :rules="rules" label-width="180px" ref="deptForm">
      <el-form-item label="上级部门">
        <el-tag effect="dark">{{parentDept.deptName}}</el-tag>
      </el-form-item>
      <el-form-item label="部门名称" prop="deptName">
        <el-input v-model="dept.deptName" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="部门简称" prop="shortName">
        <el-input v-model="dept.shortName" maxlength="100" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="排序码" prop="sortNo">
        <el-input-number v-model="dept.sortNo" autocomplete="off"></el-input-number>
      </el-form-item>
      <el-form-item label="部门类型" prop="type">
          <dict-select v-model="dept.type" v-d  placeholder="请选择部门类型" code="deptType"/>
      </el-form-item>
      <el-form-item label="LOGO图片" v-if="dept.nodeType == '1'">
        <file-upload :props="props" :tip="tip" limit="1" :limitType="limitType" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import store from "@/store";

export default {
  props: {
    parentDept:Object,
    id: String,
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
      },
      rules: {
        deptName: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
          { max: 100, message: "长度必须小于100个字符", trigger: "blur" }
        ],
        sortNo: [
          { required: true, message: "请输入排序码", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择所属层级", trigger: "blur" },
          {
              validator: (rule, value, callback) => {
                  if (value != undefined || value != "") {
                      //部门节点
                      if(value == "4" && this.parentDept.unitId == ""){
                          callback(new Error("部门节点必须挂靠在单位节点下"));
                      }
                      //科室节点
                      if(value == "5" && this.parentDept.type != "4"){
                          callback(new Error("科室节点必须挂靠在部门节点下"));
                      }

                      //行政区域


                      if(value == "1"){
                          this.dept.districtId = "";
                      }else{
                          this.dept.districtId = this.parentDept.districtId;
                      }
                      //部门、或者科室节点，设置所属单位id
                      if(value == "4" || value == "5"){
                        this.dept.unitId = this.parentDept.unitId
                      }
                      this.dept.parentId = this.parentDept.id;
                      callback();
                  } else {
                      callback();
                  }
              },
              trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    confirm(done, fail) {
      this.$refs.deptForm.validate(valid => {
        if (valid) {
          Ajax.put("/system/sysDept/save", this.dept,'json').then(res => {
            this.$message.success("保存成功");
            done();
          });
        } else {
          fail();
        }
      });
    }
  },
  created() {
    if(this.id != null){
      this.formLoading = true;
      Ajax.post("/system/sysDept/get", {
        id: this.id
      }).then(res => {
        this.dept = res.data;
        this.formLoading = false;
      });
    }
  }
};
</script>

<style lang='scss' scoped>
</style>