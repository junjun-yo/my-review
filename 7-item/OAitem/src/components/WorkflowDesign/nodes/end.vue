<template>
  <div ref="node" class="end-node flow-node-drag">
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
  },
  computed: {
    nodeClass() {
      var nodeclass = {};
      nodeclass[this.node.icon] = true;
      nodeclass["flow-node-drag"] = true;
      return nodeclass;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.end-node {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: 1px solid;
  background-color: rgb(253, 226, 226);
  &:hover {
    box-shadow: #66a6e0 0px 0px 12px 0px;
  }
  .node-name {
    line-height: 50px;
    width: 100%;
    text-align: center;
  }
}
</style>
