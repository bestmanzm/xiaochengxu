import {commonAjax} from '../../API/request'

var CommonEvent = require('../common/commonEvent');
var utils = require('../../utils/util.js');
Page({
    data: {
        tempTotalNum: 200,
        totalNum: 200,
    },
    changeInput: function (e) {
        this.setData({
            totalNum: this.data.tempTotalNum - e.detail.value.length
        });
    },
    formSubmit: function (e) {
        if (e.detail.value.wrong_content.length <= 0) {
            wx.showModal({
                title: '提示',
                content: '请输入反馈内容',
                showCancel: false,
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    }
                }
            });
            return false;
        }
        commonAjax({
            url: '/yd/wrong/add',
            method: 'POST',
            data: {
                isUser: true,
                wrong_content: e.detail.value.wrong_content,
                wrong_type: 5
            }
        }).then((json) => {
            if (json.data.result.status.code == 0) {
                utils.noOpen('反馈成功', function () {
                    setTimeout(() => {
                        wx.navigateBack({
                            delta: 100, // 回退前 delta(默认为1) 页面
                        });
                    }, 100)
                });
            } else {
                wx.showModal({
                  title: '提示',
                  content: json.data.result.status.msg,
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                    }
                  }
                });
            }
        });
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
    },
    onLoad: function (options) {
        CommonEvent.apply(this, []);
    }
});