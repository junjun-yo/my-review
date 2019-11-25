<template>
  <el-input placeholder="请选择图标" v-model="choose" :prefix-icon="choose" readonly>
    <el-button slot="append" icon="el-icon-search" @click="$iconSelect"></el-button>
  </el-input>
</template>

<script>
import iconList from "./components/icon-list";
export default {
  props: {
    value: String
  },
  computed: {
    choose: {
      get: function() {
        return this.value;
      },
      set: function(newValue) {}
    }
  },
  components: {
    iconList
  },
  data() {
    return {};
  },
  methods: {
    $iconSelect() {
      this.$open({
        title: "图标选择",
        component: iconList,
        width: "800px",
        height: "6rem",
        showCloseBtn: false,
        showConfirmBtn: false,
        confirm: data => {
          this.choose = data;
          this.$emit("input", data);
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
</style>