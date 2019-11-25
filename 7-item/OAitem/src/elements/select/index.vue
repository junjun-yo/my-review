<template>
  <el-select
    v-model="data"
    :multiple="multiple"
    :placeholder="placeholder"
    @change="optionChange"
    :clearable="clearable"
  >
    <el-option
      v-for="item in options"
      :key="item[optKey]"
      :label="item[optLabel]"
      :value="item[optValue]"
    ></el-option>
    <template v-if="code && code!==''">
      <el-option
        v-for="(item,index) in store.state.dict.dict[code]"
        :key="item.id"
        :label="item.value"
        :value="item.key"
      ></el-option>
    </template>
  </el-select>
</template>

<script>
import store from "@/store";
export default {
  props: {
    value: {
      type: [String, Array],
      default: undefined
    },
    multiple: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    optLabel: {
      type: String,
      default: "label"
    },
    optKey: {
      type: String,
      default: "value"
    },
    optValue: {
      type: String,
      default: "value"
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    options: {
      type: Array,
      default: () => {
        return [];
      }
    },
    code: String
  },
  watch: {
    value() {
      if (this.value) {
        if (this.multiple === true) {
          if (this.value && this.value.constructor === Array) {
            this.data = [...this.value];
          } else {
            this.data = this.value.split(",");
          }
        } else {
          this.data = this.value;
        }
      } else {
        if (this.multiple === true) {
          this.data = [];
        } else {
          this.data = undefined;
        }
        this.$emit("input", undefined);
      }
    }
  },
  data() {
    return {
      store,
      data: undefined,
      codes: []
    };
  },
  methods: {
    optionChange(value) {
      this.$emit("change", value);
      if (this.multiple === true) {
        if (this.value && this.value.constructor === Array) {
          this.$emit("input", value);
        } else {
          this.$emit("input", value.join(","));
        }
      } else {
        this.$emit("input", value);
      }
    }
  },
  created() {
    if (this.value) {
      if (this.multiple === true) {
        if (this.value && this.value.constructor === Array) {
          this.data = [...this.value];
        } else {
          this.data = this.value.split(",");
        }
      } else {
        this.data = this.value;
      }
    } else {
      if (this.multiple === true) {
        this.data = [];
      } else {
        this.data = undefined;
      }
      this.$emit("input", undefined);
    }
  }
};
</script>

<style lang='scss' scoped>
</style>