//index.js  首页

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataForTabbar: null,          // tabbar数据
    selectedTabbarIdx: 0,         // 选中的tabbar idx
    selectedTabbarKey: "",        // 选中的tabbar标题，用作key来做子页面的显示隐藏
    onTabbarItemTap: 'onTabbarItemTap',  // tabbar的点击事件
    reachBottomNotif: false,             // 上拉通知
    pulldownNotif: false,                // 下拉通知
    scroll_top: 0,                       // 滚动距离
    switchCustomTabEvent: 'switchCustomTabEvent', // 在子页面触发的切换tabbar事件
    reloadTabbar: 'reloadTabbar',         // 重载tabbar
    check: false,
    windowHeight: '100vh',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('options : ', options);
    var self = this;
    wx.getSystemInfo({
      success: function (res) {
        var height = res.windowHeight;
        if (height) {
          self.setData({
            windowHeight: (height - 50) + 'px',
          })
        }
      },
    })

    // 配置tabbar
    var tabbarData = getApp().globalData.tabbar;
    var item_menu_selected = tabbarData[0];
    var tabbarKey = item_menu_selected.title;
    var selectedTabbarIdx = this.get_tabar_idx_from_name(tabbarData, tabbarKey);
    this.setData({
      dataForTabbar: tabbarData,
      selectedTabbarKey: tabbarKey,
      selectedTabbarIdx: selectedTabbarIdx,
      scroll_top: 0,
    });

    // 设置导航栏标题
    wx.setNavigationBarTitle({
      title: tabbarKey,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // onPullDownRefresh: function () {
  //   console.log('onPullDownRefresh');
  //   this.setData({
  //     pulldownNotif: !this.data.pulldownNotif,
  //   });
  //   wx.stopPullDownRefresh();
  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {
  // console.log('onReachBottom');
  // this.setData({
  //   reachBottomNotif: !this.data.reachBottomNotif,
  // });
  // },

  // 滚动至底部
  scrolllower: function (res) {
    console.log('scrolllower');
    this.setData({
      reachBottomNotif: !this.data.reachBottomNotif,
    });
  },

  // 滚动至顶部
  scrollupper: function (res) {
    console.log('bindscrolltoupper');
    this.setData({
      pulldownNotif: !this.data.pulldownNotif,
    });
    wx.stopPullDownRefresh();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 点击tabbar item
  onTabbarItemTap: function (res) {
    console.log(res);
    var tabItem = res.detail;
    var dataForTabbar = this.data.dataForTabbar;
    var idx = this.get_tabar_idx_from_name(dataForTabbar, tabItem.title);
    if (tabItem.title.indexOf("guest") != -1) { // 点击“guest”时，特殊处理
      wx.navigateTo({
        url: '/pages/three/index',
      });
      return;
    }
    if (tabItem.title.indexOf(this.data.selectedTabbarKey) != -1) { // 点击已经选中的tab，不做处理
      return;
    }
    // 更改导航栏标题
    wx.setNavigationBarTitle({
      title: tabItem.title,
    });
    this.setData({
      selectedTabbarKey: tabItem.title,
      selectedTabbarIdx: idx,
      scroll_top: 2,
    });
    // 点击tabbar时，对应的页面滚动至顶部
    var self = this;
    setTimeout(function () {
      self.setData({
        scroll_top: 2,
      });
    }, 300);
  },

  // 子页面内做tabbar切换
  switchCustomTabEvent: function (res) {
    // console.log(res);
    try {
      this.onTabbarItemTap(res);

    } catch (e) { }
  },

  // 重载tabbar
  reloadTabbar: function (res) {
    console.log(res);
    var tabbar = !this.data.check ? [{
      icon: "/imgs/tab/tab_home.png",
      selectedIcon: "/imgs/tab/tab_home_selected.png",
      title: 'first',
    },
    {
      badge: 10,
      icon: "/imgs/tab/tab_content.png",
      selectedIcon: "/imgs/tab/tab_content_selected.png",
      title: 'second',
    }] : [{
      icon: "/imgs/tab/tab_home.png",
      selectedIcon: "/imgs/tab/tab_home_selected.png",
      title: 'first',
    },
    {
      icon: "/imgs/tab/tab_guest.png",
      selectedIcon: "/imgs/tab/tab_guest_selected.png",
      title: 'guest',
    },
    {
      badge: 10,
      icon: "/imgs/tab/tab_content.png",
      selectedIcon: "/imgs/tab/tab_content_selected.png",
      title: 'second',
    }
      ];
    this.setData({
      check: !this.data.check,
    })
    getApp().globalData.tabbar = tabbar;
    this.onLoad();
  },

  // 根据名称获取tabbar的选中idx
  get_tabar_idx_from_name: function (dataForTabbar, tabbar_name) {
    try {
      for (var i = 0; i < dataForTabbar.length; i++) {
        var name = dataForTabbar[i].title;
        if (name.indexOf(tabbar_name) != -1) {
          return i;
        }
      }
      return 0;

    } catch (e) {
      return 0;
    }
  },
})
