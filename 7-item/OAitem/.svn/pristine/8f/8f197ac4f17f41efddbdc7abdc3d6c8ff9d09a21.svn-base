<template>
  <div v-height="450">
    <div v-height="40">
      <el-input placeholder="请输入图标关键字" v-model="searchIcon" clearable ref="iconSearch"></el-input>
    </div>
    <div style="height:calc(100% - 40px);overflow-y:auto;">
      <ul class="icon-list">
        <li v-for="icon in icons" @click="chooseIcon(icon)">
          <span>
            <i :class="icon"></i>
            <span class="icon-name">{{icon}}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import elementIcons from "./element-icons";
import customIcons from "./custom-icons";
export default {
  data() {
    return {
      searchIcon: ""
    };
  },
  computed: {
    icons() {
      const datas = elementIcons.sort().concat(customIcons);
      if (this.searchIcon) {
        return datas.filter(item => {
          return item.indexOf(this.searchIcon) != -1;
        });
      } else {
        return datas;
      }
    }
  },
  methods: {
    chooseIcon(icon) {
      this.$emit("confirm", icon);
    }
  },
  mounted() {
    this.$refs.iconSearch.focus();
  }
};
</script>

<style lang='scss' scoped>
.icon-list {
  overflow: hidden;
  list-style: none;
  padding: 0 !important;
  border: 1px solid #eaeefb;
  border-radius: 4px;

  & li {
    float: left;
    width: 16.66%;
    text-align: center;
    height: 120px;
    line-height: 120px;
    color: #666;
    font-size: 13px;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin-right: -1px;
    margin-bottom: -1px;
    cursor: pointer;
    &:hover {
      & i,
      span {
        color: $--color-primary;
      }
    }
    & span {
      line-height: normal;
      font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
        Microsoft YaHei, SimSun, sans-serif;
      color: #99a9bf;
      transition: color 0.15s linear;
      display: inline-block;
      vertical-align: middle;
    }
    & i {
      display: block;
      font-size: 32px;
      margin-bottom: 15px;
      color: #606266;
      transition: color 0.15s linear;
    }
    & .icon-name {
      display: inline-block;
      padding: 0 3px;
      height: 1em;
    }
  }

  [class*=" icon-"],
  [class^="icon-"] {
    font-family: icomoon !important;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
</style>