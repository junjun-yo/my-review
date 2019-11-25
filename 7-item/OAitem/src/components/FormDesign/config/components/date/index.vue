<template>
  <el-date-picker
    v-model="data"
    align="right"
    type="date"
    placeholder="选择日期"
    :picker-options="pickerOptions"
    :format="fmtVal"
    :value-format="fmtVal"
    @change="change"
    :readonly="readonly"
  ></el-date-picker>
</template>

<script>
export default {
  props: {
    value: String,
    readonly: Boolean,
    fmtVal: {
      type: String,
      default: "yyyy-MM-dd"
    }
  },
  data() {
    return {
      data: this.value,
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  methods: {
    change() {
      this.$emit("input", this.data);
    }
  }
};
</script>

<style lang='scss' scoped>
</style>