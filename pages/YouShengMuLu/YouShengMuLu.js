import {commonAjax} from '../../API/request'

var CommonEvent = require('../common/commonEvent');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        arr: [],
        page: 1,
        num: 20,
        total_num:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let sound_book_id = options.sound_book_id;
        console.log(sound_book_id);
        CommonEvent.apply(this, []);

        commonAjax({
            url: '/yd/soundbook/chapterlists',
            data: {
                sound_book_id: sound_book_id,
                num: 40,
                page: 1,
            }
        }).then((res) => {
            console.log(res);
            that.setData({
                arr: res.data.result.data,
                total_num: res.data.result.total_num,
            });
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