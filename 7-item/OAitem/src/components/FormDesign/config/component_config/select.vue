<template>
  <el-form label-position="top" ref="form" :model="data" :rules="rules">
    <el-form-item label="字段名称" prop="options.label">
      <el-input v-model="data.options.label"></el-input>
    </el-form-item>
    <el-form-item label="选项数据">
      <draggable
        style="list-style:none;"
        tag="ul"
        :list="data.options.options"
        v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
        handle=".drag-item"
      >
        <li v-for="(item, index) in data.options.options" :key="index">
          <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;">
            <i class="el-icon-s-operation"></i>
          </i>
          <el-input placeholder="标题" size="mini" style="width: 100px;" v-model="item.label"></el-input>
          <el-input placeholder="值" size="mini" style="width: 100px;" v-model="item.value"></el-input>

          <el-button
            @click="handleOptionsRemove(index)"
            circle
            plain
            type="danger"
            size="mini"
            icon="el-icon-minus"
            style="padding: 4px;margin-left: 5px;"
          ></el-button>
        </li>
      </draggable>
      <div style="margin-left: 22px;">
        <el-button type="text" @click="handleAddColumn">添加数据项</el-button>
      </div>
    </el-form-item>
    <el-form-item label="默认值">
      <el-select v-model="data.options.defVal" placeholder="请选择默认值">
        <el-option
          v-for="(option,i) in data.options.options"
          :key="`${i}`"
          :label="option.label"
          :value="option.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="是否多选">
      <el-select v-model="data.options.multiple" placeholder="是否多选">
        <el-option label="是" :value="true"></el-option>
        <el-option label="否" :value="false"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="是否必填">
      <el-select v-model="data.options.notNull" placeholder="是否必填">
        <el-option label="是" :value="true"></el-option>
        <el-option label="否" :value="false"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-select v-model="data.options.disabled" placeholder="是否禁用">
        <el-option label="是" :value="true"></el-option>
        <el-option label="否" :value="false"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
import draggable from "vuedraggable";

export default {
  props: {
    data: Object
  },
  components: {
    draggable
  },
  watch: {
    "data.options.multiple"() {
      this.data.options.defVal = undefined;
    }
  },
  data() {
    return {
      rules: {
        "options.label": [
          { required: true, message: "请输入字段名称", trigger: "blur" },
          {
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (isNaN(Number(value))) {
                callback();
              } else {
                return callback(new Error("字段名称不能为数字"));
              }
            }
          }
        ]
      }
    };
  },
  methods: {
    handleOptionsRemove(index) {
      this.data.options.options.splice(index, 1);
    },
    handleAddColumn() {
      this.data.options.options.push({
        label: "",
        value: ""
      });
    }
  }
};
</script>

<style lang='scss' scoped>
</style>