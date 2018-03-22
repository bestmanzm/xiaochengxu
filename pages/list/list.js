import {list_VIP, list_Man, list_Hot, list_Over} from "../../API/request";

Page({
    data: {
        show: false,
        page: 1,
        num: 5,
        arr: [],
        type: '',
        flag: true

    },
    onLoad: function (options) {
        let [that, type] = [this, options.type];
        //页面title
        if (type == 2) {
            wx.setNavigationBarTitle({
                title: 'VIP土豪专享'
            });
            list_VIP().then((res) => {
                console.log(res);
                that.setData({
                    arr: res.data.result.data.data,
                    type: 2,
                })
            })


        } else if (type == 3) {
            wx.setNavigationBarTitle({
                title: '高颜值真人动漫'
            });
            list_Man(that.data.page, that.data.num).then((res) => {
                console.log(res);
                that.setData({
                    arr: res.data.result.data,
                    type: 3,
                })
            })
        } else if (type == 5) {
            wx.setNavigationBarTitle({
                title: '热门新作'
            });
            list_Hot(that.data.page, that.data.num).then((res) => {
                console.log(res);
                that.setData({
                    arr: res.data.result.data,
                    type: 5,
                })
            })


        } else if (type == 6) {
            wx.setNavigationBarTitle({
                title: '精品完结'
            });
            list_Over(that.data.page, that.data.num).then((res) => {
                console.log(res);
                that.setData({
                    arr: res.data.result.data,
                    type: 6,
                })
            })

        }


    },

    onReachBottom: function () {
        let that = this;
        console.log('到底了');
        if (that.data.type == 3) {//高颜值真人动漫
            if (that.data.flag == true) {
                that.setData({
                    page: that.data.page + 1,
                    show: true,
                    flag: false
                });
                list_Man(that.data.page, that.data.num).then((res) => {
                    console.log(res);
                    if (res.data.result.data.length > 0) {
                        that.setData({
                            arr: that.data.arr.concat(res.data.result.data),
                            type: 3,
                            flag: true
                        })
                    } else {
                        that.setData({
                            flag: false,
                        })
                    }

                });


                setTimeout(function () {
                    that.setData({
                        show: false,
                    })
                }, 1500);
            }
        }
        if (that.data.type == 5) {//热门新作
            if (that.data.flag == true) {
                that.setData({
                    page: that.data.page + 1,
                    show: true,
                    flag: false
                });
                list_Hot(that.data.page, that.data.num).then((res) => {
                    console.log(res);
                    if (res.data.result.data.length > 0) {
                        that.setData({
                            arr: that.data.arr.concat(res.data.result.data),
                            type: 5,
                            flag: true
                        })
                    } else {
                        that.setData({
                            flag: false,
                        })
                    }

                });
                setTimeout(function () {
                    that.setData({
                        show: false,
                    })
                }, 1500);
            }
        }

        if (that.data.type == 6) {//精品完结
            if (that.data.flag == true) {
                that.setData({
                    page: that.data.page + 1,
                    show: true,
                    flag:false
                });
                list_Over(that.data.page, that.data.num).then((res) => {
                    console.log(res);
                    if (res.data.result.data.length > 0) {
                        that.setData({
                            arr: that.data.arr.concat(res.data.result.data),
                            type: 6,
                            flag: true,
                        })
                    } else {
                        that.setData({
                            flag: false,
                        })
                    }

                });
                setTimeout(function () {
                    that.setData({
                        show: false,
                    })
                }, 1500);
            }
        }


    },
});