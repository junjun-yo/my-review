<template>
  <div class="gateway">
    <div class="gateway-node">
      <div v-if="gatewayType == 'exclusive'" class="line1"></div>
      <div v-if="gatewayType == 'exclusive'" class="line2"></div>
      <div v-if="gatewayType == 'parallel'" class="line3"></div>
      <div v-if="gatewayType == 'parallel'" class="line4"></div>
      <div v-if="gatewayType == 'inclusive'" class="line5"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    node: Object
  },
  data() {
    return {
    };
  },
  computed: {
    gatewayType(){
        if(!this.node || !this.node.config || !this.node.config.type || this.node.config.type == 'exclusive'){
            return "exclusive";
        }else{
            return this.node.config.type;
        }
    }
  }
};
</script>

<style lang='scss' scoped>
.gateway {
  width: 40px;
  height: 40px;
  .gateway-node {
    width: 30px;
    height: 30px;
    border: 1px solid;
    background-color: rgb(236, 245, 255);
    transform: rotate(45deg) translate(7px, 0px);
    &:hover {
      box-shadow: #66a6e0 0px 0px 12px 0px;
    }
    .line1 {
      width: 20px;
      height: 2px;
      background: #000;
      transform: rotate(90deg) translate(13px, -4px);
    }

    .line2 {
      width: 20px;
      height: 2px;
      background: #000;
      transform: rotate(180deg) translate(-4px, -11px);
    }
    .line3 {
      width: 20px;
      height: 3px;
      background: #000;
      transform: rotate(45deg) translate(12px, 5px);
    }

    .line4 {
      width: 20px;
      height: 3px;
      background: #000;
      transform: rotate(135deg) translate(3px, -9px);
    }
    .line5 {
      width: 20px;
      height: 20px;
      border: 3px solid #000;
      border-radius: 50%;
      transform: rotate(135deg) translate(0px, -6px);
    }
  }
}
</style>