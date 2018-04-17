// pages/first/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    onshow: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal) {
        this.onshow(newVal);
      }
    },

    onreachbottom: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal) {
        if (this.data.onshow == true) {
          this.onreachbottom(newVal);
        }
      }
    },

    onpulldown: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal) {
        if (this.data.onshow == true) {
          this.onpulldown(newVal);
        }
      }
    },
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
    onshow: function (is_show) {
      console.log('first onshow : ', is_show);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onreachbottom: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onpulldown: function () {
      console.log('onpulldown first');
    },

    tapBtn: function (res) {
      this.triggerEvent("switchCustomTab", getApp().globalData.tabbar[1]);
    },
  },

  // 组件生命周期函数，在组件实例进入页面节点树时执行，注意此时不能调用 setData
  created: function (res) {
    console.log('created', res);
  },

  // 组件生命周期函数，在组件实例进入页面节点树时执行
  attached: function (res) {
    console.log('attached : ', res);
  },

  // 组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息（使用 SelectorQuery ）
  ready: function (res) {

  },

  // 组件生命周期函数，在组件实例被从页面节点树移除时执行
  detached: function (res) {

  },
})
