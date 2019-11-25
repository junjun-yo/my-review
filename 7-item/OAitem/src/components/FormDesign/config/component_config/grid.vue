<template>
  <el-form label-position="top">
    <el-form-item label="栅格间隔">
      <el-input type="number" v-model.number="data.options.gutter"></el-input>
    </el-form-item>
    <el-form-item label="列配置项">
      <draggable
        style="list-style:none;"
        tag="ul"
        :list="data.columns"
        v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
        handle=".drag-item"
      >
        <li v-for="(item, index) in data.columns" :key="index">
          <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;">
            <i class="el-icon-s-operation"></i>
          </i>
          <el-input
            placeholder="栅格值"
            size="mini"
            style="width: 100px;"
            type="number"
            v-model.number="item.span"
          ></el-input>

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
        <el-button type="text" @click="handleAddColumn">添加列</el-button>
      </div>
    </el-form-item>
    <el-form-item label="是否需要红边框">
      <el-select v-model="data.options.border">
        <el-option :value="true" label="是"></el-option>
        <el-option :value="false" label="否"></el-option>
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
  data() {
    return {};
  },
  methods: {
    handleOptionsRemove(index) {
      if (this.data.type === "grid") {
        this.data.columns.splice(index, 1);
      } else {
        this.data.options.options.splice(index, 1);
      }
    },
    handleAddColumn() {
      this.data.columns.push({
        span: "",
        list: []
      });
    }
  }
};
</script>

<style lang='scss' scoped>
</style>