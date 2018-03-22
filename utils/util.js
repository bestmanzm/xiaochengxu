var md5 = require('../utils/md5.js');
//md5.hexMD5('123')
var util = {
  host: 'https://open.ayd6.cn',
  app_key: '4851267458',//找技术人员分配（不同设备可能不同）,
  app_token: '534299ae6e9449e0ebcc2683685d9acc',//md5加密字符串:md5(device_id#req_time#app_secret);app_secret由技术人员分配,
  secret: '9e0fbec26294d9acd8369a53c4e6e985',
  webchat_id: 38,
  version: 1,
  isFirst: true,
  open_id: wx.getStorageSync('device_id').open_id || '',
  // 4fe78d0aef586acb2dadc1824903e305微信
  formatTime: function (date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(this.formatNumber).join('/') + ' ' + [hour, minute, second].map(this.formatNumber).join(':')
  },
  formatNumber: function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },
  randomNum: function (num) {
    var numStr = '';
    var tempNum = num || 4;
    while (tempNum > 0) {
      numStr = numStr + '' + parseInt(Math.random() * 10);
      tempNum--;
    }
    return numStr;
  },
  noOpen: function (msg, cal) {
    wx.showModal({
      title: '提示',
      content: !!msg ? msg : '抱歉，此功能暂未开通',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
        try {
          if (typeof cal == 'function') {
            cal();
          }
        } catch (e) {
        }
      }
    });
  },
  ajax: function (options) {
    var _this = util;
    var reqData = options.data || {};
    reqData.app_key = _this.app_key;
    reqData.req_time = new Date().getTime() + _this.randomNum();//请求接口时间（Unix时间戳+4位的随机数）

    //reqData.app_token = _this.app_token;//md5加密字符串:md5(device_id#req_time#app_secret);app_secret由技术人员分配
    reqData.web_type = 'xiaochengxu';
    options.url = _this.host + (options.url || '');
    options.dataType = options.dataType || 'JSON';
    if (!!options.method && options.method.toLowerCase() == 'POST'.toLowerCase() && !options.header) {
      options.header = {
        "content-type": "application/x-www-form-urlencoded"
      };
    }

    _this.getDeviceID(function (sucData) {
      //设备ID（设备的唯一标记符） == openid
      reqData.device_id = sucData.deviceid;
      reqData.user_id = sucData.user_id;//用户ID【1.01版本新增】
      reqData.app_token = md5.hexMD5(reqData.device_id + '#' + reqData.req_time + '#' + _this.secret);

      wx.request({
        url: options.url,
        data: reqData,
        dataType: options.dataType,
        method: options.method || 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: options.header || {}, // 设置请求的 header
        success: function (res) {
          // success
          if (!!options.success) {
            try {
              res.data = JSON.parse(res.data);
            } catch (e) {
            }
            options.success(res);
          }
        },
        fail: function (data) {
          // fail
          if (!!options.fail) {
            options.fail();
          }
        },
        complete: function () {
          // complete
          if (!!options.complete) {
            options.complete();
          }
        }
      });
    });
  },
  getDeviceID: function (callfun) {
    // 获取用户ID
    var _this = util;

    if (!_this.isFirst) {
      var i = 1;
      var t = setInterval(() => {
        var res = wx.getStorageSync('device_id');
        if (!!res) {
          clearInterval(t);
          try {
            var sucData = {
              deviceid: res.deviceid,//接口返回的是openid
              user_id: res.user_id
            };
            if (typeof callfun == 'function') {
              callfun(sucData);
            }
          } catch (e) {
          }
        }
        if (i >= 5000) {
          clearInterval(t);
        }
        i++;
      }, 50);
    } else {
      _this.isFirst = false;

      wx.getStorage({
        key: 'device_id',
        success: function (res) {
          try {
            var sucData = {
              deviceid: res.data.deviceid,//接口返回的是openid
              user_id: res.data.user_id
            };



            if (typeof callfun == 'function') {
              callfun(sucData);
            }
          } catch (e) {
          }
        },
        fail: function () {
          wx.login({
            success: function (res) {
              wx.getUserInfo({
                success: function (res1) {
                  // 获取Openid
                  // console.log(res1);
                  _this.getOpenid(res1, res.code, callfun);
                }
              });
            },
            fail: function (e) {
              _this.noOpen(e.errMsg);
            }
          });
        }
      });
    }
  },
  getOpenid: function (res1, code, callfun) {
    // 获取openid
    var _this = util;
    var req_time = new Date().getTime() + _this.randomNum();//请求接口时间（Unix时间戳+4位的随机数）

    wx.request({
      url: _this.host + '/yd/weixin/openid',
      data: {
        req_time: req_time,
        device_id: res1.iv,
        app_token: md5.hexMD5(res1.iv + '#' + req_time + '#' + _this.secret),
        encryptedData: res1.encryptedData,
        webchat_id: _this.webchat_id,
        iv: res1.iv,
        code: code,

        app_key: _this.app_key
      },
      dataType: 'json',
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data.result.status.code == 0) {
          var sucData = {
            deviceid: res1.iv,
            user_id: res.data.result.data.user_id,
            open_id:res.data.result.data.open_id
          };
          var _this = util;
          _this.open_id=res.data.result.data.open_id;
          wx.setStorage({
            key: 'device_id',
            data: sucData,
            success: function (res) {
              try {
                if (typeof callfun == 'function') {
                  callfun(sucData);
                }
              } catch (e) {
              }
            }
          });
        }
      },
      fail: function (e) {
        _this.noOpen(e.errMsg);
      }
    });
  },
  getAjaxData: function (options, name) {
    var _this = util;

    switch (name.toLowerCase()) {
      case 'getUserID'.toLowerCase():
        // 获取用户ID
        options.url = options.url || '/yd/user/bind';
        break;
      case 'getBooklist'.toLowerCase():
        // 推荐书列表
        options.url = options.url || '/yd/recommandbook/lists';
        break;
      case 'getRecommendBooklist'.toLowerCase():
        // 推荐书列表
        options.url = options.url || '/yd/recommandcategory/lists';
        break;
      case 'getBookinfo'.toLowerCase():
        // 书详情
        options.url = options.url || '/yd/book/one';
        break;
      case 'getBooklists'.toLowerCase():
        // 书列表（翻页）
        options.url = options.url || '/yd/book/lists';
        options.data.is_online = 1;
        break;
      case 'getMululist'.toLowerCase():
        // 目录列表
        options.url = options.url || '/yd/chapter/lists';
        break;
      case 'getTypes'.toLowerCase():
        // 分类列表
        options.url = options.url || '/yd/category/lists';
        break;
      case 'getRecommendTypes'.toLowerCase():
        // 分类列表
        options.url = options.url || '/yd/recommandcategory/lists';
        break;
      case 'getChapterlist'.toLowerCase():
        // 章节列表
        options.url = options.url || '/yd/chapter/lists';
        break;
      case 'getPaylist'.toLowerCase():
        // 充值记录
        options.url = options.url || '/yd/pay/lists';
        break;
      case 'getConsumelist'.toLowerCase():
        // 消费记录
        options.url = options.url || '/yd/consume/lists';
        break;
      case 'getBookcaselist'.toLowerCase():
        // 书架列表
        options.url = options.url || '/yd/bookcase/lists';
        break;
      case 'delBookcase'.toLowerCase():
        // 移出书架
        options.url = options.url || '/yd/bookcase/del';
        options.method = 'POST';
        break;
      case 'addBookcase'.toLowerCase():
        // 加入书架
        options.url = options.url || '/yd/bookcase/add';
        options.method = 'POST';
        break;
      case 'zan'.toLowerCase():
        // 点赞
        options.url = options.url || '/yd/book/like';
        options.method = 'POST';
        break;
      case 'wrong'.toLowerCase():
        // 用户反馈
        options.url = options.url || '/yd/wrong/add';
        options.method = 'POST';
        break;
      case 'getChapterinfo'.toLowerCase():
        // 章节信息
        options.url = options.url || '/yd/chapter/one';
        break;
      case 'xcxapp':
        // 微信支付
        options.url = options.url || '/yd/pay/xcxapp';
        options.method = 'POST';
        break;
      case 'accountbalance':
        options.url = options.url || '/yd/user/coin';
        break;
    }

    _this.ajax(options);
  },
  payType: function (options) {
    var _this = util;

    // 支付方式
    options.type = options.type || 1;//默认微信支付
    // 测试金额，上线需删除-----------------------------------------------------------------
    //options.money = 10;
    if (options.type == 1) {
      _this.getAjaxData({
        data: {
          book_id: options.bookid || '',
          total_fee: options.money,
          openid:_this.open_id,
          webchat_id: _this.webchat_id,
        },
        success: function (res) {
          // 微信支付
          if (res.data.result.status.code == 0) {
            wx.requestPayment({
              timeStamp: res.data.result.data.timeStamp,
              nonceStr: res.data.result.data.nonceStr,
              package: res.data.result.data.package,
              signType: res.data.result.data.signType,
              paySign: res.data.result.data.paySign,

              success: function (res) {
                // success
                console.log('pay success');
                try {
                  console.log(options.calfun);
                  if ((typeof options.calfun) == 'function') {
                    options.calfun();
                  }
                } catch (e) {
                  console.log('error');
                }
              },
              fail: function (e) {
                // fail
                console.log(res);
                console.log(e);
                console.log('用户取消充值了');
                //_this.noOpen(e.err_desc);
              },
              complete: function () {
                // complete
              }
            });
          }
        }
      }, 'xcxapp');
    }
  }
};

module.exports = util;

//设置姓名和密码
let randomOne = Math.floor(Math.random() * 1000000) + '';
let randomTwo = Math.floor(Math.random() * 1000000) + '';
let d = Math.floor((new Date().getTime() / 1000)) + '';
//console.log(randomOne,randomTwo,d);
let userName = 'xcx_' + randomOne + '' + d + '' + randomTwo + '';
let passWord = '' + randomOne.substr(-2) + '' + d.substr(-4) + '' + randomTwo.substr(0, 4) + '';
// console.log('用户名和密码', userName, passWord);


