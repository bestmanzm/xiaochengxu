import {tiaoManType, tiaoManCont} from "../../API/request";

Page({
    data: {
        //控制底部加载的显示隐藏
        show: false,
        //控制上拉加载开关
        flag: true,

        //控制tab点击样式
        tabNum: 0,

        //顶部分类的数组
        arrOne: [],

        //点击tab传的参数
        askData: {
            option_id: '',
            page: 1,
            num: 5
        },
        //列表展示的数组
        arrTwo: []
    },
    //页面顶部条漫类别点击
    tabOne: function (e) {
        let [that, id, option_id] = [this, e.currentTarget.dataset.id, e.currentTarget.dataset.option_id];
        console.log(id, option_id);
        that.setData({
            tabNum: id,
            askData: {
                option_id: option_id,
                page: 1,
                num: 5
            },
            flag: true
        });
        tiaoManCont(that.data.askData).then((res) => {
            console.log(res);
            that.setData({
                arrTwo: res.data.result.data
            })
        })
    },
    onLoad: function (options) {
        let that = this;
        //顶部的分类
        tiaoManType().then((res) => {
            console.log(res);
            that.setData({
                arrOne: res.data.result.data
            })
        });

        //列表页面默认展示（全部）
        tiaoManCont(that.data.askData).then((res) => {
            console.log(res);
            that.setData({
                arrTwo: res.data.result.data
            })
        })

    },

    onReachBottom: function () {
        console.log('到底了');
        let that = this;
        if (that.data.flag == true) {
            that.setData({
                show: true,
                'askData.page': that.data.askData.page + 1,
                flag: false
            });

            tiaoManCont(that.data.askData).then((res) => {
                console.log(res);
                if (res.data.result.data.length > 0) {
                    that.setData({
                        arrTwo: that.data.arrTwo.concat(res.data.result.data),
                      //  show: false,
                        flag:true
                    })
                } else {
                    that.setData({
                        flag: false,
                     //   show: false
                    })
                }

            });
            setTimeout(function () {
                that.setData({
                    show: false,
                })
            }, 1500);

        }


    },


});























