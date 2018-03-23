var util = require('../utils/util');
var md5 = require('../utils/md5.js');

function newWork(options) {
    var tempOptions = { 
        url: options.url || '',
        data: options.data || {},
        header: options.header || {'content-type': 'application/json'},
        method: options.method || 'GET',
    };
    if (!!tempOptions.method && tempOptions.method.toLowerCase() == 'POST'.toLowerCase() && !options.header) {
        tempOptions.header = {
            "content-type": "application/x-www-form-urlencoded"
        };
    }
    return new Promise((resolve) => {
        util.getDeviceID(function (sucData) {
            //设备ID（设备的唯一标记符） == openid
            tempOptions.data.device_id = sucData.deviceid;
            if (!!tempOptions.data.isUser) {
                tempOptions.data.user_id = sucData.user_id;//用户ID【1.01版本新增】
            }
            if (!!tempOptions.data.isWechat||true) {
              tempOptions.data.webchat_id = util.webchat_id;

            }
            tempOptions.data.app_key = util.app_key;
            tempOptions.data.app_token = util.app_token;
            tempOptions.data.version = util.version;
            tempOptions.data.req_time = new Date().getTime() + util.randomNum();
            tempOptions.data.app_token = md5.hexMD5(tempOptions.data.device_id + '#' + tempOptions.data.req_time + '#' + util.secret);
            // 清缓存参数------------------
            var turl = tempOptions.url;
            var tempArr = turl.split('/');
            var storageStr = tempArr[tempArr.length - 2];
            var lastUrl = tempArr[tempArr.length - 1];
            if (lastUrl.indexOf('?') >= 0) {
                lastUrl = lastUrl.slice(0, lastUrl.indexOf('?'));
            }
            storageStr = storageStr + lastUrl + 'isCache';
            if (!!tempOptions.data.tempcacheStr) {
                storageStr = storageStr + tempOptions.data.tempcacheStr;
            }
            if (!!wx.getStorageSync(storageStr) || !!tempOptions.data.isCache) {
                wx.removeStorageSync(storageStr);
                tempOptions.data['__flush_cache'] = 1;
            }
            // console.trace();
            // ----------------------------
            wx.request({
                url: '' + util.host + tempOptions.url,
                data: tempOptions.data,
                header: tempOptions.header,
                method: tempOptions.method,
                success: function (res) {
                    resolve(res);
                }
            });
        });
    })

}

export function commonAjax(options) {
    return newWork(options);
}


//分类页面（类别数据）
export function classifyType() {
    return newWork({
        url: '/yd/bookoptions/lists?types=1',
    })

}

//分类页面点击选择类别数据
export function clickType(askData) {
    return newWork({
        url: '/yd/appapi/book_lists',
        data: {
            classify_id: askData.optionId,
            load_status: askData.loadStatus,
            types: askData.types,//更新时间倒叙
            page: askData.page,
            num: askData.num,
            webchat_id: true
        }
    });

}


//热推页面接口
export function reTui() {
    return newWork({
        url: '/yd/xiaochengxu/index_page',
        data: {
            webchat_id: true
        }
    })

}

//热推页面banner接口
export function reTuiBanner() {
    return newWork({
        url: '/yd/xiaochengxu/banner?app_key=8569786663&webchat_id=true&position_id=1',
    })

}


//排行页面接口
export function paiHang(askData) {
    return newWork({
        url: '/yd/xiaochengxu/book_lists',
        data: {
            page: askData.page,
            num: askData.num,
            types: askData.types,
            classs: askData.classs,
        }

    })

}


//条漫页面顶部分类接口
export function tiaoManType() {
    return newWork({
        url: '/yd/bookoptions/lists?types=1',

    })
}

//条漫页面列表部分数据
export function tiaoManCont(askData) {
    return newWork({
        url: '/yd/xiaochengxu/book_lists',
        data: {
            type_id:3,
            classify_id: askData.option_id,
            page: askData.page,
            num: askData.num
        }

    })
}

//搜索页面热门搜索（大家搜一搜）
export function search_hot() {
    return newWork({
        url: '/yd/xiaochengxu/book_lists',
    })
}

//搜索页面搜索数据
export function search_cont(x, y) {
    return newWork({
        url: '/yd/xiaochengxu/book_lists',
        data: {
            page: x,
            num: 5,
            book_title: y,
        }
    });
}

//列表页面（VIP土豪专享）
export function list_VIP() {
    return newWork({
        url: '/yd/xiaochengxu/look_nice',
        data: {
            classify_id: 20,
            webchat_id: true
        }
    });
}

//列表页面（高颜值真人动漫）
export function list_Man(page, num) {
    return newWork({
        url: '/yd/xiaochengxu/book_lists',
        data: {
            classify_id: 25,
            webchat_id: true,
            page: page,
            num: num
        }
    });
}

//列表页面(热门新作)
export function list_Hot(page, num) {
    return newWork({
        url: '/yd/xiaochengxu/book_lists',
        data: {
            page: page,
            num: num,
            load_status: 0,
            types: 'bt',
            webchat_id: true,

        }
    });
}

//列表页面（精品完结）
export function list_Over(page, num) {
    return newWork({
        url: '/yd/xiaochengxu/book_lists',
        data: {
            page: page,
            num: num,
            load_status: 1,
            webchat_id: true,
        }
    });
}

//更新页面内接口
export function gengXin() {
    return newWork({
        url: '/yd/xiaochengxu/gengxin_lists/?app_key=8569786663&webchat_id=true',
    })

}

//更新页面书籍数据
export function gengXinCont(page, num, times) {
    return newWork({
        url: '/yd/xiaochengxu/book_lists',
        data: {
            page: page,
            num: num,
            times: times,
            webchat_id: true,
            isUser: true,
            types: 'bt'
        }
    })

}


//更新页面（收藏）
export function gengXinAdd(book_id) {
    return newWork({
        url: '/yd/bookcase/add_app',
        data: {
            book_id: book_id,
            book_type: 1,
            isUser: true,
        },
        method: "POST"
    })

}


//更新页面（收藏）
export function gengXinDel(book_id) {
    return newWork({
        url: '/yd/bookcase/del',
        data: {
            book_id: book_id,
            book_type: 1,
            isUser: true,
        },
        method: "POST"
    })

}


//书架页面(收藏)
export function shuJiaShouCang(page,num) {
    return newWork({
        url: '/yd/bookcase/bookself',
        data: {
            page: page,
            num: num,
            isUser: true,
            webchat_id:true
        },
    })

}

//书架页面(历史)
export function shuJiaHistory(page,num) {
    return newWork({
        url: '/yd/userread/bookself',
        data: {
            page: page,
            num: num,
            isUser: true,
            get_detail_info:1,
            webchat_id:true
        },
    })

}

//书架页面（删除收藏）
export function shuJiaShouCangDel(book_id) {
    return newWork({
        url: '/yd/bookcase/del_app',
        data: {
            book_id:book_id,
            isUser: true,
            webchat_id:true
        },
        method:"POST"
    })

}


//书架页面（删除历史）
export function shuJiaHistoryDel(book_id) {
    return newWork({
        url: '/yd/userread/del_app',
        data: {
            book_id:book_id,
            isUser: true,
            webchat_id:true
        },
        method:"POST"
    })

}

//个人中心（个人信息）
export function mine() {
    return newWork({
        url: '/yd/user/one',
        data: {
            isUser: true,
            webchat_id:true
        },
    })

}

//个人中心（客服消息）
export function kefu() {
    return newWork({
        url: '/yd/dmconfig/lists',
        data: {
            isUser: true,
            webchat_id:true
        },
    })

}


//充值记录
export function chongZhiList(page,num) {
    return newWork({
        url: '/yd/pay/lists',
        data: {
            page:page,
            num:num,
            isUser: true,
            webchat_id:true
        },
    })

}


//消费记录
export function xiaoFeiList(page,num) {
    return newWork({
        url: '/yd/consume/lists',
        data: {
            page:page,
            num:num,
            isUser: true,
            webchat_id:true
        },
    })

}


///推荐页的红包
export function tuiJianPacket() {
    return newWork({
        url: '/yd/pinhongbao/is_start',
        method:"POST",
        data: {
            webchat_id:true,
            isUser:true
        },
    })
}


//开红包
export  function openPacket(packetId) {
    return newWork({
        url: '/yd/pinhongbao/open_coin',
        method:"POST",
        data: {
            webchat_id:true,
            isUser:true,
            id:packetId
        },
    })
}



















