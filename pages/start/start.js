import {commonAjax} from '../../API/request'

var CommonEvent = require('../common/commonEvent');
// pages/start/start.js
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        CommonEvent.apply(this, []);
        commonAjax({
            url: '/yd/xcxswitch/find',
        }).then((res) => {
         //   console.log(res);
            let release = res.data.result.data.release;
            if(release==0){
                wx.redirectTo({
                    url: '../QuanBuYouSheng/QuanBuYouSheng'
                })
            }
            if(release==1){
              wx.switchTab({
                url: '../tuiJian/tuiJian'
              });
              return false;

            }
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
        return {
            title: '百万好书 尽在这里',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
})