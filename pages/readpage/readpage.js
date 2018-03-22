// pages/readpage/readpage.js
import {commonAjax} from '../../API/request'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tempLoadData: {},
        isBuy: true,//是否购买 默认是已经购买
        tempOptions: {},
        showBottomMenu: false,
        conData: {
            title: '是否收藏本漫画？',
            con: '',//收藏后书架会有更新提示哦～
            enterName: '收藏'
        },
        conData1: {
            con: '',//漫画已经完结了，看点别的吧
        },
        tip1Data: {
            con: '',//收藏成功，请在书架查看哦
        },
        current: 0,
        imgUrls: [],
        book_info: {},
        likedata: {},//大家都在看
        loading: false,
        isShoucang: false,
        cfhd: true,
        isShowbottom: false,

        //好友助力
        showOne: false,
        book_id: '',
        sortorder: ''

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        console.log(options);

        // 判断滑动还是滚动，true为滑动，默认false
        if (!!options.scrolltype && options.scrolltype == 'false') {
            options.scrolltype = false;
        }
        options.scrolltype = !!Boolean(options.scrolltype);
        this.setData({
            tempOptions: options
        });
        commonAjax({
            url: '/yd/user/one',
            // method: 'post',
            data: {
                isUser: true
            }
        }).then((res) => {
            let tempRes = res.data.result.data;
            tempRes.auto_pay = parseInt(tempRes.auto_pay);
            this.setData({
                userInfo: tempRes
            });
            this.loadArticle();
        });

        commonAjax({
            url: '/yd/xiaochengxu/no_buy',
            method: 'post',
            data: {
                book_id: this.data.tempOptions.book_id,
                sortorder: this.data.tempOptions.sortorder,
                isUser: true
            }
        }).then((res) => {
            this.setData({
                buyMoreList: res.data.result.data
            });
        });

        // 大家都在看的小说
        commonAjax({
            url: '/yd/xiaochengxu/look_nice',
            data: {
                classify_id: 21,
                isWechat: true
            }
        }).then((res) => {
            this.setData({
                likedata: res.data.result.data
            });
        });


    },
    autobuyf: function () {
        commonAjax({
            url: '/yd/user/is_auto_pay',
            method: 'post',
            data: {
                auto_pay: (1 - this.data.userInfo.auto_pay),
                isUser: true
            }
        }).then((res) => {
            let tempUserInfo = this.data.userInfo;
            tempUserInfo.auto_pay = 1 - tempUserInfo.auto_pay;
            this.setData({
                userInfo: tempUserInfo
            });
        });
    },
    isshowmenu: function () {
        if (!!this.data.showBottomMenu) {
            this.setData({
                showBottomMenu: false
            });
        } else {
            this.setData({
                showBottomMenu: true
            });
        }
    },
    jumpUrl: function (e) {
        let url = e.currentTarget.dataset.url;
        wx.redirectTo({
            url: url,
        })
    },

    //好友助力的叉叉点击
    close: function (e) {
        this.setData({
            showOne: false,
            isShowbuy: true
        });
        commonAjax({
            url: '/yd/xiaochengxu/transmit_vip_chapter',
            data: {
                isUser: true,
                is_has_close:1
            }
        }).then(res => {
            console.log(res);
        });
    },

    //有钱任性不转发
    haveMoney: function () {
        commonAjax({
            url: '/yd/xiaochengxu/transmit_vip_chapter',
            data: {
                isUser: true,
                is_has_money: 1,
            }
        }).then(res => {
            this.setData({
                showOne: false,
                isShowbuy: true
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
        // if (!this.data.book_info.is_collection) {
        //   wx.showModal({
        //     title: '是否收藏本漫画？',
        //     content: '收藏后书架会有更新提示哦～',
        //     success: (res)=> {
        //       if (res.confirm) {
        //         console.log('用户点击确定')
        //         this.shoucangplay('add');
        //       } else if (res.cancel) {
        //         console.log('用户点击取消')
        //       }
        //     }
        //   });
        // }
        // let conData = this.data.conData;
        // conData.con = '收藏后书架会有更新提示哦～';
        // this.setData({
        //   conData: conData
        // });
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


    touchstart: function (e) {
        this.setData({
            moveData: {
                startX: e.touches[0].clientX,
                startY: e.touches[0].clientY,
                date: new Date().getTime()
            }
        });
    },
    touchend: function (e) {
        var startX = this.data.moveData.startX;
        var startY = this.data.moveData.startY;
        var startDate = this.data.moveData.date;
        var endX = e.changedTouches[0].clientX;
        var endY = e.changedTouches[0].clientY;
        var endDate = new Date().getTime();

        if (Math.abs(startX - endX) > Math.abs(startY - endY)) {
            // 水平移动
            if (startX == endX) {
                return false;
            }
            var bookid = this.data.tempOptions.book_id;
            var sortorder;
            if (startX > endX) {
                console.log('左滑动');
                // 下一章
                if (this.data.current == this.data.imgUrls.length - 1) {
                    if (!!this.data.cfhd) {
                        sortorder = this.data.book_info.next_page;
                        console.log('准备跳转到下一章');
                    } else {
                        this.setData({
                            cfhd: true
                        });
                    }
                } else {
                    this.setData({
                        cfhd: false
                    });
                }
            } else {
                console.log('右滑动');
                // 上一章
                if (this.data.current == 0) {
                    if (!!this.data.cfhd) {
                        sortorder = this.data.book_info.prev_page;
                        console.log('准备跳转到上一章');
                    } else {
                        this.setData({
                            cfhd: true
                        });
                    }
                } else {
                    this.setData({
                        cfhd: false
                    });
                }
            }
            if (!sortorder) {
                return false;
            }
            if (Math.abs(startX - endX) < 30 && Math.abs(endDate - startDate) > 10) {
                return false;
            }
            // current
            wx.redirectTo({
                url: '../readpage/readpage?book_id=' + bookid + '&sortorder=' + sortorder + '&scrolltype=' + this.data.tempOptions.scrolltype,
                success: function (res) {
                }
            })
        } else {
            // 上下移动
            if (startY == endY) {
                return false;
            }
            if (startY > endY) {
                // console.log('上滑动');
            } else {
                // console.log('下滑动');
            }
        }
    },
    slideChange: function (e) {
        this.setData({
            current: e.detail.current,
        });
    },
    imgload: function (e) {
        // 图片加载出错时，加载错误图片替换
        let tempImgs = this.data.imgUrls;
        tempImgs[e.target.dataset.index] = 'https://cdn.ayd6.cn/front/dmydy/images/default_img.png?v=2017-08-21';
        this.setData({
            imgUrls: tempImgs
        });
    },
    upper: function (e) {
        this.loadArticle('prev');
    },
    lower: function (e) {
        this.loadArticle('next');
    },
    scroll: function (e) {
        if (!this.data.pmHeight) {
            var res = wx.getSystemInfoSync()
            this.setData({
                pmHeight: res.windowHeight
            });
        }
        // 当前滚动位置
        let curScrollH = (e.detail.scrollTop + this.data.pmHeight);
        // 滚动到指定位置触发下一页
        let triggerH = e.detail.scrollHeight - 222;
        // console.log(curScrollH + '===' + triggerH);
        console.log('我正在滚动哦。。。');
        if (curScrollH >= triggerH) {
            this.loadArticle('next');
        }
    },
    // 加载漫画数据
    loadArticle: function (type, sorder) {
        console.log(type + '====' + sorder);
        let sortorder = sorder || this.data.tempOptions.sortorder;
        if (!!this.data.removebeforeArr && this.data.removebeforeArr.length > 0) {
            this.setData({
                imgUrls: this.data.removebeforeArr,
                removebeforeArr: []
            });
        }
        if (type == 'prev') {
            console.log('加载上一章');
            sortorder = this.data.book_info.prev_page;
            if (!this.data.isBuy) {
                sortorder = parseInt(sortorder) + 1;
            }
        } else if (type == 'next') {
            console.log('加载下一章');
            sortorder = this.data.book_info.next_page;
            if (!this.data.isBuy) {
                sortorder = parseInt(sortorder) - 1;
            }
        }
        if (!sortorder) {
            console.log('没有章节id');
            return false;
        }
        let ttempLoadData = this.data.tempLoadData;
        ttempLoadData.loader = false;
        this.setData({
          tempLoadData: ttempLoadData
        });
        if (!!this.data.loading) {
            console.log('上次请求数据还未响应完，请等待');
            this.setData({
              tempLoadData: {type:type,sorder:sorder,loader:true}
            });
            return false;
        }
        this.setData({
            loading: true
        });
        commonAjax({
            url: '/yd/xiaochengxu/bookchapter',
            data: {
                book_id: this.data.tempOptions.book_id,
                sortorder: sortorder,
                auto_pay: !!sorder ? 1 : this.data.userInfo.auto_pay,
                isUser: true
            }
        }).then((res) => {
            setTimeout(() => {
              this.setData({
                  loading: false
              });

              if (!!this.data.tempLoadData.loader) {
                console.log('我是自动加载下一章的==========================');
                this.loadArticle(this.data.tempLoadData.type, this.data.tempLoadData.sorder);
              }
            }, 3000);
            let result = res.data.result;
            let tempOne = this.data.imgUrls;
            let tempArr = [];
            //设置顶部title；
            wx.setNavigationBarTitle({
                title: res.data.result.book_info.book_title
            });
            if (type == 'prev') {
                console.log('加载上一章');
                tempArr = result.data.concat(this.data.imgUrls);
            } else {
                tempArr = this.data.imgUrls.concat(result.data);
            }
            wx.setStorageSync('localbook', {
                book_id: this.data.tempOptions.book_id,
                bookName: result.book_info.book_title,
                sortorder: this.data.tempOptions.sortorder
            });
            try {
                if (!!type) {
                    if (!this.data.book_info.prev_page || !result.book_info.prev_page) {
                        result.book_info.prev_page = '';
                    } else {
                        result.book_info.prev_page = Math.min(parseInt(this.data.book_info.prev_page), parseInt(result.book_info.prev_page));
                    }
                    if (!this.data.book_info.next_page || !result.book_info.next_page) {
                        result.book_info.next_page = '';
                    } else {
                        wx.setStorageSync('localbook', {
                            book_id: this.data.tempOptions.book_id,
                            bookName: result.book_info.book_title,
                            sortorder: this.data.tempOptions.sortorder
                        });
                        result.book_info.next_page = Math.max(parseInt(this.data.book_info.next_page), parseInt(result.book_info.next_page));
                    }
                }
            } catch (e) {
            }
            let tempOptions1 = this.data.tempOptions;
            tempOptions1.curPage = sortorder;
            this.setData({
                imgUrls: this.unique(tempArr),
                tempOptions: tempOptions1
            });
            if (!!result.book_info) {
                this.setData({
                    book_info: result.book_info
                });
            }
            try {
                let tempBuyMoreList = this.data.buyMoreList;
                tempBuyMoreList[0].total_money = res.data.result.book_info.total_money || 0;
                this.setData({
                    buyMoreList: tempBuyMoreList
                });
            } catch (e) {
            }
            try {
                let tempUserInfo = this.data.userInfo;
                tempUserInfo.total_coin = res.data.result.book_info.total_coin || 0;
                this.setData({
                    userInfo: tempUserInfo
                });
            } catch (e) {
            }
            this.setData({
                isBuy: false
            });
            switch (result.status.code) {
                case 0:
                    this.setData({
                        isBuy: true
                    });
                    // 正常
                    // 添加阅读记录
                    commonAjax({
                        url: '/yd/userread/add',
                        method: 'post',
                        data: {
                            book_id: this.data.tempOptions.book_id,
                            content_id: result.book_info.content_id,
                            book_type: 1,
                            isUser: true
                        }
                    }).then((res) => {
                    });
                    break;
                case 10003:
                    // 账户余额不足，扣费失败
                    this.setData({
                        isShowbuy: true,
                        isShowbuyName: 1
                    });
                    break;
                case 10004:
                    // 写入订单失败
                    break;
                case 10002:
                    // 此章节为收费章节, 请先登录！
                    break;
                case 10001:
                    // 此章节不存在或已下线
                    break;
                case 10006:
                    // 未开启自动购买
                    console.log('===============');

                    if (result.book_info.flag == 1) {
                        this.setData({
                            showOne: true
                        })
                    }
                    if (result.book_info.flag == 0) {
                        this.setData({
                            isShowbuy: true,
                        })
                    }


                    let tempArr = [], removebeforeArr = tempOne;
                    if (type == 'prev') {
                        console.log('加载上一章');
                        tempArr = result.data.concat(removebeforeArr);
                    } else {
                        tempArr = removebeforeArr.concat(result.data);
                    }
                    this.setData({
                        imgUrls: this.unique(tempArr),
                        removebeforeArr: removebeforeArr
                    });

                    this.setData({
                        isShowbuyName: 0,
                        showpx: '',//type,
                        buysortorder: sortorder
                    });
                    break;
            }
            this.setData({
                isShowbottom: true
            })
        });
    },
    unique: function (arr) {
        for (var i = 0; i < arr.length - 1; i++) {
            var old = arr[i]
            for (var j = i + 1; j < arr.length; j++) {
                if (old.url == arr[j].url && old.key == arr[j].key) {
                    arr.splice(j, 1);
                    j--;
                }
            }
        }
        return arr;
    },
    buynow: function () {
        console.log('购买');
        if (!this.data.loading) {
            console.log('上次请求数据还未响应完，请等待');
            this.hideBuy();
        }

        this.setData({
            isBuy: true
        });
        this.loadArticle(this.data.showpx, this.data.buysortorder);
    },
    hideBuy: function (e) {
        console.log(e);
        let _tempOptions = this.data.tempOptions;
        _tempOptions.curPage--;
        this.setData({
            isShowbuy: false,
            tempOptions: _tempOptions
        });
    },
    tip2Cancel: function () {
        this.shoucangplay('del');
    },
    tip2Enter: function () {
        this.shoucangplay('add');
    },
    shoucangplay: function (tp) {
        let conData = this.data.conData;
        conData.con = '';
        this.setData({
            conData: conData
        });
        // 收藏成功，请在书架查看哦！
        let play = 'del';
        if (!!this.data.book_info.is_collection) {
            // 已收藏 变成 未收藏
        } else {
            // 未收藏 变成 已收藏
            play = 'add';
        }
        if (tp != play) {
            return false;
            let conData1 = this.data.conData1;
            conData1.con = '';
            if (!!this.data.book_info.is_collection) {
                // 已收藏提示
                conData1.con = '收藏成功，请在书架查看哦！';
            } else {
                // 未收藏提示
                conData1.con = '已从书架移除书籍';
            }
            this.setData({
                conData1: conData1
            });
            setTimeout(() => {
                conData1.con = '';
                this.setData({
                    conData1: conData1
                });
            }, 2000);
        }
        commonAjax({
            url: '/yd/bookcase/' + play,
            method: 'post',
            data: {
                book_id: this.data.tempOptions.book_id,
                book_type: 1,
                isUser: true
            }
        }).then((res) => {
            let tempData = this.data.book_info;
            let conData1 = this.data.tip1Data;
            // let conData1 = this.data.conData1;
            conData1.con = '';
            if (!!tempData.is_collection) {
                // 已收藏 变成 未收藏
                tempData.is_collection = 0;
                conData1.con = '已从书架移除书籍';
            } else {
                // 未收藏 变成 已收藏
                tempData.is_collection = 1;
                conData1.con = '收藏成功，请在书架查看哦！';
            }
            this.setData({
                book_info: tempData,
                // conData1: conData1,
                tip1Data: conData1
            });
            setTimeout(() => {
                conData1.con = '';
                this.setData({
                    tip1Data: conData1,
                    // conData1: conData1
                });
            }, 2000);
        });
    },
    shoucang: function () {
        if (!!this.data.book_info.is_collection) {
            this.shoucangplay('del');
        } else {
            this.shoucangplay('add');
        }
    },
    notxt: function (e) {
        let conData1 = this.data.conData1;
        conData1.con = e.currentTarget.dataset.title;
        this.setData({
            conData1: conData1
        });
        setTimeout(() => {
            conData1.con = '';
            this.setData({
                conData1: conData1
            });
        }, 2000);
    },
    changeScrollType: function () {
        var tt = this.data.tempOptions;
        tt.scrolltype = !tt.scrolltype;
        this.setData({
            tempOptions: tt
        });
    },
    jumpmulu: function () {
        let pages = getCurrentPages()
        let route = pages[pages.length - 2].route
        let tempArr = route.split('/')
        let name = tempArr[tempArr.length - 1];
        if (name == 'bookinfo') {
            // 返回
            wx.navigateBack({});
        } else {
            // 跳转
            wx.redirectTo({
                url: '../bookinfo/bookinfo?book_id=' + this.data.tempOptions.book_id,
            })
        }
    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        let that = this;
        let transmit_user_id = wx.getStorageSync('device_id').user_id;
        // console.log(transmit_user_id);
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target);
            return {
                title: ''+that.data.book_info.book_title+'',
                path: '/pages/bookinfo/bookinfo?transmit_user_id=' + transmit_user_id + '&book_id=' + this.data.tempOptions.book_id + '',
                imageUrl:''+that.data.imgUrls[0].url+'',
                success: function (res) {
                    console.log('转发成功');
                    that.setData({
                        showOne: false
                    });
                    console.log(that.data.tempOptions.curPage);
                    commonAjax({
                        url: '/yd/xiaochengxu/transmit_vip_chapter',
                        data: {
                            isUser: true,
                            book_id: that.data.tempOptions.book_id,
                            sortorder: that.data.tempOptions.curPage,
                        }

                    }).then(res => {
                        console.log(res);
                       let time= setInterval(function () {
                            if (!!that.data.loading) {
                                that.buynow();
                                clearInterval(time);
                            }
                        },200);
                    })
                },
                fail: function (res) {
                    console.log('转发失败');
                }
            }
        }

    },
})