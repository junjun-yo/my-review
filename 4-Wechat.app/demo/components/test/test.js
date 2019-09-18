// components/test/test.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    propCount: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    name: "huluobo"
  },
  observers: {
    'propCount, name': function(newPropCount, newName) {
      // console.log(newPropCount, newName)
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    btnChange() {
      this.setData({
        name: "Teemo"
      })
    },
    sonChange() {
      this.setData({
        propCount: this.properties.propCount + 1
      })
      this.triggerEvent('myEvent', {
        count: this.properties.propCount
      })
    }
  }
})