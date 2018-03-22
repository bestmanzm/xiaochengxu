import {reTui, commonAjax, openPacket, tuiJianPacket} from '../../API/request'


Page({

    /**
     * 页面的初始数据
     */
    data: {
        view: {
            height: 1912
        },
        //好友助力遮罩的显示
        showOne: false,

        //好友助力显示
        showOne_one: false,
        showOne_two: false,


        //主编吐血力荐
        showThr: false,

        //五人
        showFou: false,

        //拆红包后
        showFiv: false,

        //拆包后(用于判断是否还需要继续拆红包)
        afterData: '',


        //满足五人
        isFull: false,


        //朋友手气
        showSix: false,

        //每个人手气信息
        arrFiveMessage: [],

        //主编吐血力荐数据
        arr: [],

        //五个人的信息
        arr_man: [],

        //倒计时显示时间
        d: '',
        h: '',
        m: '',
        s: '',

        //红包id
        packetId: '',

        //点击邀请微信好友分享
        packetId_next: '',

        //接口返回数据
        data_info: '',


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        if (options.id) {//带了参数红包id
          let packetId = options.id;
          that.setData({
            packetId: options.id
          });
        }
    },

    onShow: function () {
      let that = this;
      let packetId = '';
      if (that.data.packetId) {//带了参数红包id
        console.log('从分享进入');
        packetId = that.data.packetId;
      } else {//未带红包id
        console.log('从推荐页拼红包按钮进入');
      }

      //参加活动人的信息
      commonAjax({
        url: '/yd/pinhongbao/prize_info',
        method: "POST",
        data: {
          isUser: true,
          id: packetId
        }
      }).then(res => {
        try {
          that.setData({
            packetId: res.data.result.data_info.id
          });
        }catch(e){}
        tuiJianPacket().then(res1 => {
          console.log(res1);
          that.setData({
            packetId_next: res1.data.result.data.id
          })
        });

        if (res.data.result.status.code == 90012) {
          console.log('参加过了不可再参加：' + packetId);
          wx.showToast({
            title: '每人只可助力好友一次',
            icon: 'none',
            duration: 5000
          });
          that.setData({
            // arr_man: res.data.result.data,
            // data_info: res.data.result.data_info,
            showThr: true,
            showFou: true
          });

        }
        if (res.data.result.status.code == 0) {
          if (res.data.result.data_info.is_open == 1 && res.data.result.data_info.is_full == 1) {
            that.setData({
              showFou: false,
              showFiv: true,
              showThr: false,
            });
            that.open();
          } else {
            that.setData({
              arr_man: res.data.result.data,
              data_info: res.data.result.data_info,
              showThr: true,
              showFou: true
            });

            //截止时间
            let end_time = res.data.result.data_info.end_time;
            console.log(end_time);
            //.倒计时
            setInterval(function () {
              let day = new Date();
              let t = end_time - Date.parse(day) / 1000;
              let d = Math.floor(t / 60 / 60 / 24);
              let h = Math.floor(t / 60 / 60 % 24);
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
            }, 1000);
            //判断是否满足五人
            if (that.data.data_info.is_full == 1 && that.data.data_info.is_in == 1) {
              //人数满了，且参加活动
              console.log('已经满足五人');
              that.setData({
                isFull: true
              })
            } else if (that.data.data_info.is_full == 1 && that.data.data_info.is_in == 0) {
              //人数满了，且未参加活动
              that.setData({
                isFull: false
              });
            } else if (that.data.data_info.is_full == 0) {
              that.setData({
                isFull: false
              })
            }
          }
        }
        if (res.data.result.status.code == 90013) {
          console.log('已经过期');
          wx.showToast({
            title: '该红包已过期',
            icon: 'none',
            duration: 5000
          });
          that.setData({
            arr_man: res.data.result.data,
            data_info: res.data.result.data_info,
            showThr: true,
            showFou: true
          });
        }
      });

      //主编吐血力荐接口
      reTui().then(res => {
        console.log(res);
        that.setData({
          arr: res.data.result.data.zhuBianTuXueLiJian
        })
      })
    },

    openRule: function (e) {
        let that = this;
        that.setData({
            showOne: true,
            showOne_one: false,
            showOne_two: true,
        })
    },


    close: function (e) {
        this.setData({
            showOne: false,
        })
    },

    //开红包
    open: function () {
        console.log('开红包');
        let that = this;
        let packetId = that.data.packetId;
        openPacket(packetId).then(res => {
            console.log(res);
            if (res.data.result.status.code == 0) {
                console.log('开红包成功');
                that.setData({
                    showFou: false,
                    showThr: false,
                    showFiv: true,
                    showSix: true,
                    arrFiveMessage: res.data.result.data,
                    afterData: res.data.result.data_info
                });

                tuiJianPacket().then(res => {
                  console.log(res);
                  that.setData({
                    packetId_next: res.data.result.data.id
                  })
                });
                if (that.data.afterData.is_have == 0) {
                    console.log('无红包可拆了,开始一个新新红包');
                    tuiJianPacket().then(res => {
                        that.setData({
                            packetId: res.data.result.data.id,
                        })
                    });

                }
                if (that.data.afterData.is_have == 1) {
                    console.log('还有红包可以拆');
                    that.setData({
                        packetId: that.data.afterData.id[0]
                    })
                }

                //控制背景图的高度
                let j = 0;
                for (let i = 0; i < that.data.arrFiveMessage.length; i++) {
                    if (that.data.arrFiveMessage[i].is_open == 1) {
                        j += 1;
                    }
                }
                console.log(j);
                that.setData({
                    view: {
                        height: 1200 + j * 170
                    }
                })
            }
        })

    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        let that = this;
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target);

            //发起人是自己
            let id = that.data.packetId_next;
            // if (that.data.arr_man[0].user_id == wx.getStorageSync('device_id').user_id) {
            //     console.log('发起人是自己');
            //     id = that.data.packetId;
            // } else {
            //     console.log('发起人不是自己');
            //     id = that.data.packetId_next;
            // }

            return {
              title: '500金币大红包，快来和一起我瓜分吧！',
              path: '/pages/packet/packet?&id=' + id,
              imageUrl: '/images/packet.png',
              success: function (res) {
                // 转发成功
                console.log('转发成功');

                // 分享成功激活红包
                commonAjax({
                  url: '/yd/pinhongbao/join_activity',
                  method: "POST",
                  data: {
                    isUser: true,
                    id: id
                  }
                });
              },
              fail: function (res) {
                // 转发失败
                console.log('转发失败');
              }
            }
        }

    },

    onPullDownRefresh: function(){
      this.onShow();
      wx.stopPullDownRefresh();
    }
});