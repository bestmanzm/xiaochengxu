import {chongZhiList, xiaoFeiList} from '../../API/request'

Page({
    data: {
        show: false,
        nodata: false,
        type: 99,
        page: 1,
        num: 20,
        arr: [],
        flag: true,

    },

    onLoad: function (options) {
        let [that, type] = [this, options.type];
        console.log(type);
        that.setData({
            type: type
        });
    },

    onShow:function () {
        let that=this;
        if (that.data.type == 0) {
            wx.setNavigationBarTitle({
                title: "充值记录"
            });
            chongZhiList(that.data.page, that.data.num).then(res => {
                console.log(res);
                let arr = res.data.result.data;
                if (arr.length == 0) {
                    that.setData({
                        nodata: true
                    })
                } else {
                    that.setData({
                        arr: arr,
                        nodata: false
                    })
                }

            })
        }
        if (that.data.type == 1) {
            wx.setNavigationBarTitle({
                title: "消费记录"
            });
            xiaoFeiList(that.data.page, that.data.num).then(res => {
                console.log(res);
                let arr = res.data.result.data;
                if (arr.length == 0) {
                    that.setData({
                        nodata: true
                    })
                } else {
                    that.setData({
                        arr: arr,
                        nodata: false
                    })
                }

            })
        }
    },

    onReachBottom: function () {
        console.log('到底部了');
        let that = this;
        if (that.data.type == 0) {//充值
            if (that.data.flag == true) {
                that.setData({
                    show: true,
                    page: that.data.page + 1,
                    flag: false
                });

                chongZhiList(that.data.page, that.data.num).then(res => {
                    console.log(res);
                    let arr = res.data.result.data;
                    if (arr.length == 0) {
                        that.setData({
                            flag: false
                        })
                    } else {
                        that.setData({
                            arr: that.data.arr.concat(arr),
                            nodata: false,
                            flag: true
                        })
                    }
                });
                setTimeout(function () {
                    that.setData({
                        show: false,
                    })
                }, 1500)

            }
        }
        if (that.data.type == 1) {//消费
            if (that.data.flag == true) {
                that.setData({
                    show: true,
                    page: that.data.page + 1,
                    flag: false
                });

                xiaoFeiList(that.data.page, that.data.num).then(res => {
                    console.log(res);
                    let arr = res.data.result.data;
                    if (arr.length == 0) {
                        that.setData({
                            //    show: false,
                            flag: false
                        })
                    } else {
                        that.setData({
                            arr: that.data.arr.concat(arr),
                            nodata: false,
                            //   show: false
                            flag:true
                        })
                    }
                });
                setTimeout(function () {
                    that.setData({
                        show: false
                    })
                }, 1500)

            }
        }


    },


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