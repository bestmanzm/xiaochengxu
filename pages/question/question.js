// pages/question/question.js
var CommonEvent = require('../common/commonEvent');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: -1,
    source: [{
      title: '1.如何选择登录方式？',
      con: '平台的账号支持6-16位字母+数字注册；您也可以选择用QQ、微博账号一键登录；微信访问，会使用微信账号自动登录（可在个人中心确认是否登录成功）。 注：平台不支持切换已登录账号，请您谨慎选择您的登录方式。'
    }, {
        title: '2.如何找到自己想看的书？',
        con: '建议您参考网站首页的各项推荐；或按照作品的分类、排行榜等功能进行筛选；还可以通过搜索功能，查找相关的作品或作者。'
      }, {
        title: '3.阅读时，是否可以调整阅读体验？',
        con: '进入作品章节，阅读内容时。在屏幕中央位置点击一下，会显示互动弹出层；点击屏幕下方的设置按钮，可以根据您的喜好，进行字体大小、背景颜色的调整。'
    }, {
        title: '4.如何收藏作品？',
        con: '点击进入某部作品介绍页后，点击屏幕右上侧按钮“加入书架”，等待提示加入书架即可。'
      }, {
        title: '5.书架有什么功能？',
        con: '书架中，有您收藏的作品、最近阅读过的所有作品、以及订阅过的作品；每本作品，都显示有最新的更新章节及更新时间。点击作品，您可以继续上次的阅读位置，享受阅读。'
    }, {
        title: '6.如何阅读付费章节？',
        con: '您在阅读到付费章节时，选择适合的充值方式，完成充值后继续阅读您刚阅读的付费章节即可。（作者更新辛苦，收入主要来源就是您购买付费章节，您的购买将会是作者连续更新的最大动力。）'
      }, {
        title: '7.怎么选择充值方式？',
        con: '点击“充值”后，进入充值页面。选择充值方式，及对应的金额，根据提示继续下一步操作即可。'
    }, {
        title: '8.充值后，金币没有及时到账，怎么办？',
        con: '充值完成后，根据充值渠道不同，最长24小时到账；通常为立即到账或20分钟内到账，若长时间没有到账，请联系客服处理。'
      }, {
        title: '9.碰到提示充值异常时，怎么处理？',
        con: '请您检查网络是否正常，确认正常请再次充值，仍然失败，请联系客服处理。'
    }, {
        title: '10.作品找不到了，怎么处理？',
        con: '作品忽然找不到，通常是由于各种不可抗力或暂时修订，请稍等再试；您也可以联系客服了解作品具体情况。'
      }, {
        title: '11.忘记密码，怎么处理？',
        con: '第三方微信、QQ、微博登录无需密码，注册帐号忘记密码，请联系客服处理。'
      },]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    CommonEvent.apply(this, []);
    wx.setNavigationBarTitle({
      title: '使用帮助'
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
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  swichTitle: function (e) {
    var that = this;
    if (that.data.currentTab === e.currentTarget.dataset.current) {
      that.setData({
        currentTab: -1
      })
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current
      })
    }
  },

    onShareAppMessage: function () {
        return {
            title: '百万好书 尽在这里',
            success: function(res) {
                // 转发成功
            },
            fail: function(res) {
                // 转发失败
            }
        }
    }
})