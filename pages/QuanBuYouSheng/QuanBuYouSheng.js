import {commonAjax} from '../../API/request'

var CommonEvent = require('../common/commonEvent');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        arr: [],
        cur_page: '',
        total_page: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        CommonEvent.apply(this, []);
        commonAjax({
            url: '/yd/soundbook/lists',
            data: {
                page: 1,
                num: 9
            }
        }).then((res) => {
            console.log(res);
            let arr = res.data.result.data;
            that.setData({
                arr: arr,
                cur_page: res.data.result.cur_page,
                total_page: res.data.result.total_page,
            })
        });
    },

    askData: function (e) {
       let that=this;
       let page=e.currentTarget.dataset.page;
        CommonEvent.apply(this, []);
        commonAjax({
            url: '/yd/soundbook/lists',
            data: {
                page: page,
                num: 9
            }
        }).then((res) => {
            console.log(res);
            let arr = res.data.result.data;
            that.setData({
                arr: arr,
                cur_page: res.data.result.cur_page,
                total_page: res.data.result.total_page,
            })
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

    }
})