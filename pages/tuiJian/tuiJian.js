//index.js
//获取应用实例
const app = getApp();
import {reTuiBanner, reTui, tuiJianPacket, commonAjax} from '../../API/request'

Page({
    data: {
        //倒计时
        endtime: '',
        //顶部那个url跳转最近阅读
        localUrl: '',
        bookName: '',

        banner: {},

        //控制热门新作、精品完结显示隐藏
        newOver: true,//true:热门新作，false;精品完结

        //页面卷曲
        scrollTop: 0,
        //主编吐血力荐
        arrOne: [],
        //VIP土豪专享
        arrTwo: [],
        //高颜值真人动漫
        arrThr: [],
        //限时免费
        arrFou: [],
        //热门新作，精品完结
        arrFiv: [],

        //最近阅读
        last_book_id: '',
        last_sortorder: '',

        //邀请威信好友一起拆
        showOne: false,
        //已经满五人
        ifFive: false,

        //参加红包人数
        join_num: '',

        //红包id
        packetId: '',

        //显示开红包还是邀请微信群好友一起拆按钮
        isKai: false,
        //是否可以开红包
        is_ok: false,

    },

    onLoad: function (options) {

        let that = this;
        //banner
        reTuiBanner().then((res) => {
            console.log(res);
            console.log(res.data.result.data[0]);
            that.setData({
                banner: res.data.result.data
            })
        });

        //各个模块
        reTui().then((res) => {
            console.log(res);
            that.setData({
                //主编吐血力荐
                arrOne: res.data.result.data.zhuBianTuXueLiJian,
                //VIP土豪专享
                arrTwo: res.data.result.data.vipTuHaoZhuanXiang,
                //高颜值真人动漫
                arrThr: res.data.result.data.gaoYanZhiZhenRenMan,
                //限时免费
                arrFou: res.data.result.data.xianShiMianFei,
                endtime: res.data.result.data.xianShiMianFei.end_time,
                //热门新作，精品完结
                arrFiv: res.data.result.data.reMenXinZuo,
                arrSix: res.data.result.data.jingPingWanJie,//精品完结

            });
        });

        //最近阅读的数据拿取
        wx.getStorage({
            key: 'localbook',
            success: function (res) {
                console.log(res.data);
                that.setData({
                    // localUrl:"../readpage/readpage?book_id='&sortorder={{last_sortorder}}"
                    localUrl: "../readpage/readpage?book_id=" + res.data.book_id + "&sortorder=" + res.data.sortorder + "",
                    bookName: "X 续看：" + res.data.bookName + "第" + res.data.sortorder + "话"
                })
            }
        });

        //红包
        tuiJianPacket().then(res => {
            console.log(res);
            if (res.data.result.data.is_ok == 1) {
                that.setData({
                    is_ok: 1
                })
            }
            that.setData({
                showOne: true,
                join_num: res.data.result.data.join_num,
                packetId: res.data.result.data.id,
            })

        })


    },

    //热门新作、精品完结点击选取
    selectNew: function (e) {
        let id = e.currentTarget.dataset.id;
        console.log(id);
        if (id == 0) {
            this.setData({
                newOver: true
            })
        } else {
            this.setData({
                newOver: false
            })
        }
    },

    //返回顶部
    toTop: function (e) {
        this.setData({
            scrollTop: 0
        })
    },


    onReady: function () {
        //.倒计时
        let that = this;
        setInterval(function () {
            let day = new Date();
            let t = that.data.endtime - Date.parse(new Date()) / 1000;
            let d = Math.floor(t / 60 / 60 / 24);
            let h = Math.floor(t / 60 / 60 % 24) + d * 24;
            let m = Math.floor(t / 60 % 60);
            let s = Math.floor(t % 60);

            function plus0(x) {
                if (x < 10) {
                    return x = "0" + x;
                } else {
                    return x;
                }
            }

            that.setData({
                d: plus0(d),
                h: plus0(h),
                m: plus0(m),
                s: plus0(s)
            })
        }, 1000)
    },

    //点击红包顶部的叉叉关闭
    closePacket: function (e) {
        this.setData({
            showOne: false,
        })
    },


    onShareAppMessage: function (res) {
        let packetId = this.data.packetId;
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target);
            return {
                title: '500金币大红包，快来和一起我瓜分吧！',
                path: '/pages/packet/packet?id=' + packetId + '',
                imageUrl:'/images/packet.png',
                success: function (res) {
                    // 转发成功
                    console.log('转发成功');
                    //分享成功激活红包
                    commonAjax({
                        url: '/yd/pinhongbao/join_activity',
                        method:"POST",
                        data: {
                            isUser: true,
                            id:packetId
                        }
                    });

                },
                fail: function (res) {
                    // 转发失败
                    console.log('转发失败');
                }
            }
        }

    }

});
