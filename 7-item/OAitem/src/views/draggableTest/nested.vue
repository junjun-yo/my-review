<template>
  <draggable class="dragArea" :list="datas" v-bind="{group:'people'}" @add="addMainList" tag="ul">
    <!-- <template v-for="(element, index) in datas">
      <div class="aa" :key="element.key">
        {{element}}
        <nested-draggable :datas="element.list" />
      </div>
    </template>-->
    <li v-for="item in datas" :key="item.key">
      <!-- {{item.key}} -->
      <p>{{ item.name }}{{item.key}}</p>
      <nested-draggable :datas="item.tasks" />
    </li>
  </draggable>
</template>
<script>
import draggable from "vuedraggable";
export default {
  props: {
    datas: {
      required: true,
      type: Array
    }
  },
  components: {
    draggable
  },
  methods: {
    addMainList($event) {
      const newIndex = $event.newIndex;
      const key =
        Date.parse(new Date()) + "_" + Math.ceil(Math.random() * 99999);
      // this.datas[newIndex][key] = key;
      let newData = Object.assign(
        {},
        {
          ...this.datas[newIndex],
          key
        }
      );
      this.$set(this.datas, newIndex, newData);
      console.log($event, newIndex);
    }
  },
  name: "nested-draggable"
};
</script>
<style scoped lang="scss">
.dragArea {
  min-height: 50px;
  li {
    border: 1px dashed #ccc;
    p {
      flex: 1;
    }
    ul {
      flex: 1;
    }
  }
  // outline: 1px dashed;
  // .aa {
  //   border: 1px solid #000;
  //   min-height: 80px;
  // }
}
</style>