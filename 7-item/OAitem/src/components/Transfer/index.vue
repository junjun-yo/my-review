<template>
  <div class="transfer">
    <div class="left-content">
      <div class="title">
        <el-checkbox
          :disabled="!leftData||leftData.length==0||allowCheckCount == 1"
          :indeterminate="leftIndeterminate"
          v-model="leftCheckAll"
          @change="handleLeftCheckAllChange"
        >{{titles[0]}}</el-checkbox>
      </div>
      <div class="content">
        <div class="item-list" v-loading="loading">
          <el-checkbox-group v-model="leftChecks" @change="leftChange">
            <el-checkbox
              v-for="(data,i) in leftData"
              :label="data"
              :key="i"
              class="item"
            >{{data.label}}</el-checkbox>
          </el-checkbox-group>
          <div class="item nodata" v-if="!leftData || leftData.length == 0">暂无数据</div>
        </div>
      </div>
    </div>
    <div class="tool-btn">
      <div class="tool">
        <el-button
          :disabled="!rightChecks||rightChecks.length==0"
          type="primary"
          size="medium"
          icon="el-icon-arrow-left"
          circle
          @click="toLeft"
        ></el-button>
      </div>
      <div class="tool">
        <el-button
          :disabled="!leftChecks||leftChecks.length==0"
          type="primary"
          size="medium"
          icon="el-icon-arrow-right"
          circle
          @click="toRight"
        ></el-button>
      </div>
    </div>
    <div class="right-content">
      <div class="title">
        <el-checkbox
          :disabled="!rightData||rightData.length==0"
          :indeterminate="rightIndeterminate"
          v-model="rightCheckAll"
          @change="handleRightCheckAllChange"
        >{{titles[1]}}</el-checkbox>
      </div>
      <div class="content">
        <div class="item-list">
          <el-checkbox-group v-model="rightChecks">
            <el-checkbox
              v-for="(data,i) in rightData"
              :label="data"
              :key="i"
              class="item"
            >{{data.label}}</el-checkbox>
          </el-checkbox-group>
          <div class="item nodata" v-if="!rightData || rightData.length == 0">暂无数据</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    allowCheckCount: Number,
    value: Array,
    titles: {
      type: Array,
      default: () => ["标题1", "标题2"]
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    data: Array,
    props: {
      type: Object,
      default: () => {
        return {
          key: "key",
          label: "label"
        };
      }
    }
  },
  computed: {
    rightData: {
      set() {},
      get() {
        if (this.value && this.value.length > 0) {
          const data = this.value.map(item => {
            return {
              key: item[this.props.key] || item.key,
              label: item[this.props.label] || item.label
            };
          });
          return data;
        } else {
          return [];
        }
      }
    },
    leftDataSource() {
      if (!this.data || this.data.length == 0) {
        return [];
      }
      const data = this.data.map(item => {
        return {
          key: item[this.props.key],
          label: item[this.props.label]
        };
      });
      return data;
    },
    leftIndeterminate() {
      if (this.leftData.length == 0 || this.leftChecks.length == 0) {
        this.leftCheckAll = false;
        return false;
      } else if (
        this.leftChecks.length > 0 &&
        this.leftChecks.length == this.leftData.length
      ) {
        this.leftCheckAll = true;
        return false;
      } else {
        this.leftCheckAll = this.leftChecks.length === this.leftData.length;
        return (
          this.leftChecks.length > 0 &&
          this.leftChecks.length < this.leftData.length
        );
      }
    },
    rightIndeterminate() {
      if (this.rightData.length == 0) {
        this.rightCheckAll = false;
        return false;
      } else if (
        this.rightChecks.length > 0 &&
        this.rightChecks.length == this.rightData.length
      ) {
        this.rightCheckAll = true;
        return false;
      } else {
        this.rightCheckAll = this.rightChecks.length === this.rightData.length;
        return (
          this.rightChecks.length > 0 &&
          this.rightChecks.length < this.rightData.length
        );
      }
    },
    leftData: {
      get() {
        if (!this.data || this.data.length == 0) {
          return [];
        }
        const data = this.data.map(item => {
          return {
            key: item[this.props.key] || item.key,
            label: item[this.props.label] || item.label
          };
        });
        if (this.rightData && this.rightData.length > 0) {
          const newData = [];
          data.forEach(left => {
            let flag = true;
            this.rightData.forEach(right => {
              if (left.key == right.key) {
                flag = false;
              }
            });
            if (flag) {
              newData.push(left);
            }
          });

          return newData;
        }
        return data;
      },
      set() {}
    }
  },
  data() {
    return {
      //左边列表参数
      leftCheckAll: false,
      leftChecks: [],
      leftLastCheck: [],
      //右边列表参数
      rightCheckAll: false,
      rightChecks: []
    };
  },
  methods: {
    //左边
    handleLeftCheckAllChange(val) {
      this.leftChecks = val ? this.leftData : [];
    },
    //右边
    handleRightCheckAllChange(val) {
      this.rightChecks = val ? this.rightData : [];
    },
    //处理事件
    toLeft() {
      const rightChecks = this.rightChecks;
      if (rightChecks.length > 0) {
        rightChecks.forEach((right, i) => {
          const target = this.leftDataSource.find(left => {
            return left.key == right.key;
          });
          if (target) {
            this.$set(this.leftData, this.leftData.length, right);
          }
        });
        for (let index = 0; index < this.rightData.length; index++) {
          const data = this.rightData[index];
          const target = this.rightChecks.find(checked => {
            return checked.key == data.key;
          });
          if (target) {
            this.rightData.splice(index, 1);
            index -= 1;
          }
        }
      }
      this.$emit("input", this.rightData);
      this.rightChecks = [];
    },
    toRight() {
      if (this.allowCheckCount == 1) {
        this.rightData = [];
        const leftChecks = this.leftChecks;
        if (leftChecks.length > 0) {
          leftChecks.forEach(left => {
            this.$emit("input", [left]);
          });
        }
        this.leftChecks = [];
      } else {
        const rightData = JSON.parse(JSON.stringify(this.rightData));
        const leftChecks = this.leftChecks;
        if (leftChecks.length > 0) {
          leftChecks.forEach(left => {
            const target = this.rightData.find(right => {
              return right.key == left.key;
            });
            if (!target) {
              rightData.push(left);
            }
          });
        }
        this.$emit("input", rightData);
        this.leftChecks = [];
      }
    },
    leftChange(val) {
      if (this.allowCheckCount == 1) {
        if (this.leftChecks.length == 1) {
          this.$set(this, "leftLastCheck", val);
        } else {
          let curChange = val.filter(cur => {
            return this.leftLastCheck[0].key != cur.key;
          });
          this.$set(this, "leftLastCheck", curChange);
          this.$set(this, "leftChecks", curChange);
        }
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.transfer {
  height: 100%;
  .left-content,
  .right-content {
    vertical-align: middle;
    box-sizing: border-box;
    display: inline-block;
    width: calc(50% - 30px);
    border: 1px solid #ebeef5;
    border-radius: 5px;
    height: 100%;
    .title {
      vertical-align: top;
      height: 40px;
      line-height: 40px;
      background: #f5f7fa;
      margin: 0;
      padding-left: 15px;
      border-bottom: 1px solid #ebeef5;
      box-sizing: border-box;
      color: #000;
    }
    .content {
      margin-top: -40px;
      padding-top: 40px;
      height: 100%;
      .item-list {
        padding: 6px 15px;
        height: 100%;
        overflow-y: auto;
        .item {
          width: 100%;
          margin: 5px 0;
        }
        .nodata {
          text-align: center;
          color: #a7a7a7;
        }
      }
    }
  }
  .tool-btn {
    display: inline-block;
    vertical-align: middle;
    box-sizing: border-box;
    width: 60px;
    height: 60px;
    text-align: center;
    .tool {
      margin: 10px 0;
    }
  }
}
</style>