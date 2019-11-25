<template>
  <div class="user-node">
    <div class="tool clearfix">
      <i class="el-icon-s-custom flow-node-drag"></i>
    </div>
    <div class="node-name">{{node.name}}</div>
  </div>
</template>

<script>
export default {
  props: {
    node: Object
  },
  data() {
    return {};
  }
};
</script>

<style lang='scss' scoped>
.user-node {
  width: 130px;
  height: 70px;
  border: 1px solid;
  background-color: rgb(236, 245, 255);
  border-radius: 10px;
  &:hover {
    box-shadow: #66a6e0 0px 0px 12px 0px;
  }
  .tool {
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
  }
  .node-name {
    height: calc(100% - 30px);
    text-align: center;
  }
}
</style>