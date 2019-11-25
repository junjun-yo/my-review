<template>
  <el-row class="full dept-select">
    <el-col :span="12">
      <div class="title">
        <div>部门列表</div>
        <div class="toolbar">全部展开</div>
      </div>
      <div class="content">
        <ztree
          title="部门"
          ref="deptTree"
          :url="url"
          disableClick
          multiple
          @check="onCheck"
          :cascade="cascade"
          :allowCheckCount="allowCheckCount"
          :defaultCheck="defaultCheck"
        />
      </div>
    </el-col>
    <el-col :span="12">
      <div class="title">
        <div>已选择部门</div>
        <div class="toolbar">清除全部</div>
      </div>
      <div class="content" style="overflow-y:auto;">
        <ul>
          <li class="checks" v-for="check in checkDatas">
            <span class="item">{{check.name}}</span>
            <span class="btn" @click="removeItem(check)">
              <i class="el-icon-close"></i>
            </span>
          </li>
        </ul>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    url: String,
    cascade: Object,
    allowCheckCount: Number,
    defaultCheck: [String, Array]
  },
  data() {
    return {
      checkDatas: []
    };
  },
  methods: {
    onCheck(datas) {
      this.checkDatas = datas.map(node => {
        return {
          id: node.id,
          name: node.name
        };
      });
    },
    removeItem(check) {
      this.checkDatas = this.checkDatas.filter(item => {
        return check.id != item.id;
      });
      let instance = this.$refs.deptTree.instance;
      let node = instance.getNodeByParam("id", check.id);
      instance.checkNode(node, false, false);
    },
    confirm(done, fail) {
      let length = this.checkDatas.length;
      if (length == 0) {
        this.$message.warning("请选择部门");
        fail();
      } else {
        done(this.checkDatas);
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.dept-select {
  .title {
    border: 1px solid #eee;
    padding: 5px 10px;
  }
  .content {
    padding: 5px 10px;
    border: 1px solid #eee;
    height: 4rem;
    & .checks {
      padding: 3px 0px;
      &:hover {
        background-color: #eee;
        .btn {
          display: block;
        }
      }
      .item {
        padding-left: 5px;
      }
      .btn {
        cursor: pointer;
        float: right;
        display: none;
        i {
          padding-right: 5px;
        }
      }
    }
  }
}
</style>