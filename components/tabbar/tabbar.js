// components/tabbar/tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataForTabbar: {
      type: Array,
      value: []
    },
    selectedTabbarIdx: {
      type: Number,
      value: 0,
      observer: function (newVal, oldVal) { 
        console.log(oldVal);
      } 
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTabbarItemTap: function (res) {
      console.log(res);
      var tabitem = res.currentTarget.dataset.tabitem;
      this.triggerEvent("onTabbarItemTap", tabitem);
    }
  }
})
