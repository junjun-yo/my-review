<template>
  <el-form
    :model="form"
    ref="roleForm"
    :rules="rules"
    v-loading="loading"
    label-width="100px"
    class="crudform"
  >
    <el-form-item label="角色名称" prop="roleName">
      <el-input
        v-model="form.roleName"
        autocomplete="off"
        maxlength="25"
        placeholder="请输入角色名称"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item label="角色描述" prop="roleDesc">
      <el-input
        type="textarea"
        :rows="8"
        placeholder="请输入角色描述"
        v-model="form.roleDesc"
        autocomplete="off"
        maxlength="100"
      ></el-input>
    </el-form-item>
    <el-form-item label="单选下拉框" prop="singleSelect">
      <el-select v-model="form.singleSelect" placeholder="请选择" clearable @change="change">
        <el-option label="武汉" value="wuhan"></el-option>
        <el-option label="黄石" value="huangshi"></el-option>
        <el-option label="鄂州" value="ezhou"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="多选下拉框" prop="multipleSelect">
      <!-- v-model为双向数据绑定的值，多选时该值类型可以是数组也可以是字符串，具体产出值根据传入时而定，默认是用逗号分隔的字符串
      multiple为是否多选，有则多选，无则单选，
      options为选项的值,该值为数组，数组元素为键值对，键为label，值为value（[{value: "zhinan",label: "指南"},）-->
      <oa-select v-model="form.multipleSelect" multiple :options="options" @change="change" />
      <div>{{form.multipleSelect}}</div>
    </el-form-item>

    <el-form-item label="日期组件" prop="date">
      <!-- 日期组件，可选参数format（默认'yyyy-MM-dd'） -->
      <oa-date v-model="form.date" format="yyyy-MM-dd" @change="change" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    id: String
  },
  data() {
    return {
      form: {},
      loading: false,
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        roleLevel: [
          { required: true, message: "请选择角色级别", trigger: "blur" }
        ]
      },
      options: [
        {
          value: "zhinan",
          label: "指南"
        },
        {
          value: "zujian",
          label: "组件"
        },
        {
          value: "ziyuan",
          label: "资源"
        }
      ]
    };
  },
  methods: {
    change(val) {
      console.log(val);
    },
    //弹窗点击确认后的回调事件，入参（1：确认关闭弹窗，结束按钮的loading动画，2：中断关闭弹窗，结束按钮loading动画）
    //使用方式，一般弹窗用作表单的修改或新增，这个方法主要用来验证表单完整性或提交表单的处理。如果没有需要关闭弹窗的事件，则无需定义。
    //此方法需后端配合，新增和修改需封装为同一接口
    confirm(done, fail) {
      this.$refs.roleForm.validate(valid => {
        if (valid) {
          this.form["roleType"] = 2;
          Ajax.put("/system/sysRole/saveOrUpdateInfo", this.form, "json").then(
            res => {
              this.$message({
                message: "保存成功！",
                type: "success"
              });
              done();
            },
            err => {
              fail();
            }
          );
        } else {
          fail();
        }
      });
    },
    //一般修改与新增可用同一表单。此方法为初始化表单使用，1可以作为新增初始化，2可以作为修改前的数据加载初始化。
    initForm() {
      if (this.id) {
        this.loading = true;
        Ajax.post("/system/sysRole/initInfo", {
          unitId: "d4dbc73312e944bf99c6a2d8bc469d51",
          id: this.id
        }).then(res => {
          this.form = res.data;
          this.loading = false;
        });
      }
    }
  },
  created() {
    this.initForm();
  }
};
</script>

<style lang='scss' scoped>
</style>