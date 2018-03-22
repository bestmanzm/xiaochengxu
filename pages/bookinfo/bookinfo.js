// pages/bookinfo/bookinfo.js
import {commonAjax} from '../../API/request'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tip1Data: {
            con: ''
        },
        book_id: '',
        mulupage: 1,
        mululist: [],
        px: 1,//排序 1正序

        ismaxH: true,

        //显示的时间
        time: '',


        //之前阅读到
        chapter_id: '',

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('onload');
        this.setData({
            book_id: options.book_id
        });

        if (options.transmit_user_id) {
            console.log('通过好友助力分享进入页面');
            let power_user_id = wx.getStorageSync('device_id').user_id;
            //用户助力
            commonAjax({
                url: '/yd/xiaochengxu/transmit_power?transmit_user_id=' + options.transmit_user_id + '&power_user_id=' + power_user_id + ''
            }).then(res => {
                console.log(res);
                if (res.data.result.status.code == 0) {
                    console.log('助力成功');
                    commonAjax({
                        url: '/yd/xiaochengxu/user_read_info?',
                        data: {
                            isUser: true,
                            book_id: options.book_id
                        }
                    }).then(res => {
                        console.log(res);
                        wx.navigateTo({
                            url: '/pages/readpage/readpage?book_id=' + options.book_id + '&sortorder=' + res.data.result.data.c_order + ''
                        })
                    });
                }
                if (res.data.result.status.code != 0) {
                    console.log(res.data.result.status.msg);
                    wx.showToast({
                        title: res.data.result.status.msg,
                        icon: 'none',
                        duration: 5000
                    })
                }
            });
        } else {
            console.log('非好友助力分享进入页面');
        }
    },
    getMulu: function () {
        commonAjax({
            url: '/yd/xiaochengxu/book_ml',
            data: {
                book_id: this.data.book_id,
                page: this.data.mulupage,
                num: 10,
                px: this.data.px,
                isUser: true
            }
        }).then((res) => {
            let tempArr = this.data.mululist.concat(res.data.result.data);
            this.setData({
                mululist: tempArr,
            });

        });
    },
    changepx: function (e) {
        this.setData({
            px: e.target.dataset.px,
            mulupage: 1,
            mululist: [],
        });
        this.getMulu();
    },
    changeMaxH: function () {
        if (this.data.ismaxH) {
            this.setData({
                ismaxH: false
            });
        } else {
            this.setData({
                ismaxH: true
            });
        }
    },
    shoucang: function () {
        // 收藏成功，请在书架查看哦！
        let play = 'del';
        if (!!this.data.resource.is_collection) {
            // 已收藏 变成 未收藏
        } else {
            // 未收藏 变成 已收藏
            play = 'add';
        }
        commonAjax({
            url: '/yd/bookcase/' + play,
            method: 'post',
            data: {
                book_id: this.data.book_id,
                book_type: 1,
                isUser: true
            }
        }).then((res) => {
            let tempData = this.data.resource;
            let tempTip = {con: ''};
            if (!!tempData.is_collection) {
                // 已收藏 变成 未收藏
                tempData.is_collection = 0;
                tempTip.con = '已从书架移除书籍';
            } else {
                // 未收藏 变成 已收藏
                tempData.is_collection = 1;
                tempTip.con = '收藏成功，请在书架查看哦！';
            }
            this.setData({
                resource: tempData,
                tip1Data: tempTip
            });
            setTimeout(() => {
                this.setData({
                    tip1Data: {con: ''}
                });
            }, 2000);
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
        console.log('onshow');
        commonAjax({
            url: '/yd/xiaochengxu/book_info',
            data: {
                book_id: this.data.book_id,
                isUser: true
            }
        }).then((res) => {
            this.setData({
                resource: res.data.result.data,
                time: res.data.result.data.book_edit_time.substr(0, 10),
                name: res.data.result.data.book_title
            });

            //设置顶部title；
            wx.setNavigationBarTitle({
                title: this.data.name
            });
        });
        this.setData({
            mulupage: 1,
            mululist: []
        })
        this.getMulu();
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
        this.setData({
            mulupage: this.data.mulupage + 1
        });
        this.getMulu();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})