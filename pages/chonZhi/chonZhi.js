var utils= require('../../utils/util');
var CommonEvent = require('../common/commonEvent');
import {mine} from '../../API/request'
Page({
    data:{
        arr:[],
        //金币数目
        coin:0,

        //选择金币颜色颜色
        tabNum: 4,

        bookid: '',
        url: '../mine/mine'

    },
    //点击选择金币事件
    tapCoin:function (e) {
        let id=e.currentTarget.dataset.id;
        this.setData({
            tabNum:id
        });

        var _this = this;
        utils.payType({
            bookid: this.data.bookid,
            money: parseInt(e.currentTarget.dataset.m) * 100,
            calfun: ()=> {
                wx.setStorageSync('paylistsisCache', true);
                console.log(_this.data.url);
                if (!!_this.data.bookid) {
                    wx.redirectTo({
                        url: _this.data.url
                    });
                }else{
                    wx.switchTab({
                        url: _this.data.url,
                        success: function (e) {
                            var page = getCurrentPages().pop();
                            if (page == undefined || page == null) return;
                            page.onLoad();
                        }
                });
                }
            }
        });

    },
    onLoad: function (e) {
      var url = '../mine/mine';
      var bookid = 0;
      console.log(utils);
      if (!!e.bookid) {
        url = '../readpage/readpage?sortorder=' + e.sortorder + '&book_id=' + e.bookid;
        bookid = e.bookid;
      }
      this.setData({
        url: url,
        bookid: bookid
      });

      //金币数
        let that=this;
        mine().then(res => {
            console.log(res);
            that.setData({
                arr: res.data.result.data
            })
        })

    },
});