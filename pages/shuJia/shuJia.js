import {shuJiaShouCang, shuJiaHistory, shuJiaShouCangDel, shuJiaHistoryDel} from '../../API/request'

Page({
    data: {
        show: false,

        //tab栏切换
        tabNum: 0,
        //控制最右上删除按钮
        tabThr: false,
        //控制收藏的删除样式
        shouCangDel: false,


        //控制历史的删除样式
        historyDel: false,

        //控制全选还是删除的显示隐藏
        allDel: false,

        //删除变红样式
        deColor: false,


        //收藏分页参数
        page: 1,
        num: 9,

        //历史分页参数
        page_next: 1,
        num_next: 9,

        flagAll: true,//是否需要全选
        //收藏数组
        arrOne: [],

        //历史数组
        arr_next: [],

        //上拉加载开关
        flag: true


    },
    //tab的点击事件
    tapTab: function (e) {
        let [that, id] = [this, e.currentTarget.dataset.id];
        that.setData({
            //收藏分页参数
            page: 1,
            num: 9,

            //历史分页参数
            page_next: 1,
            num_next: 9,
        });

        //id==2不切换
        if (id == 2) {
            //筛选按钮样式切换
            that.setData({
                tabThr: !that.data.tabThr,
                // allDel: !that.data.allDel,
                deColor: false,
            });
            //收藏或者历史添加要删除的样式
            if (that.data.tabNum == 0) {//收藏
                if (that.data.arrOne.length == 0) {
                    that.setData({
                        allDel: false
                    })
                } else {
                    that.setData({
                        shouCangDel: !that.data.shouCangDel,
                        allDel: !that.data.allDel
                    })
                }

            }
            if (that.data.tabNum == 1) {//历史
                if (that.data.arr_next.length == 0) {
                    that.setData({
                        allDel: false
                    })
                } else {
                    that.setData({
                        historyDel: !that.data.historyDel,
                        allDel: !that.data.allDel
                    })
                }

            }
        } else {
            that.setData({
                tabNum: id,
                shouCangDel: false,
                historyDel: false,
                allDel: false,
                show: false,
                deColor: false,
                flag: true,
                flagAll: true,
                tabThr: false
            });
            if (id == 1) {
                console.log(id);
                //默认历史数据
                shuJiaHistory(1, that.data.num).then(res => {
                    console.log(res);
                    let arr = res.data.result.data;
                    for (let i = 0; i < arr.length; i++) {
                        arr[i].isDel = false;
                    }
                    that.setData({
                        arr_next: arr,
                        page_next: 1,
                    })
                })
            }
            if (id == 0) {
                console.log(id);
                //默认收藏数据
                shuJiaShouCang(that.data.page, that.data.num).then((res) => {
                    console.log(res);
                    let arr = res.data.result.data;
                    for (let i = 0; i < arr.length; i++) {
                        arr[i].isDel = false;
                    }
                    that.setData({
                        arrOne: arr
                    })
                });
            }
        }
    },

    //selectDelShuJia选择删除收藏
    selectDelShuJia: function (e) {
        let [that, index, isDel, arrOne] = [this, e.currentTarget.dataset.index, e.currentTarget.dataset.isdel, this.data.arrOne];
        //点击选择后改变样式
        arrOne[index].isDel = !arrOne[index].isDel;
        if (arrOne[index].isDel == true) {
            that.setData({
                deColor: true
            })
        }
        if (arrOne[index].isDel == false) {
            that.setData({
                flagAll: true
            })
        }
        that.setData({
            arrOne: arrOne
        });
        //包含极端情况一个个取消收藏后删除按钮变灰,一个个选中变为取消收藏
        if (that.data.deColor == true) {
            that.setData({
                deColor: false
            });
            for (let i = 0; i < that.data.arrOne.length; i++) {
                if (that.data.arrOne[i].isDel == true) {
                    that.setData({
                        deColor: true
                    });
                }
            }
        }

    }
    ,

    //选择删除历史记录
    selectHistory: function (e) {
        let [that, index, isDel, arr_next] = [this, e.currentTarget.dataset.index, e.currentTarget.dataset.isdel, this.data.arr_next];
        //点击选择后改变样式
        arr_next[index].isDel = !arr_next[index].isDel;
        if (arr_next[index].isDel == true) {
            that.setData({
                deColor: true
            })
        }
        if (arr_next[index].isDel == false) {
            that.setData({
                flagAll: true
            })
        }
        that.setData({
            arr_next: arr_next
        });
        //包含极端情况一个个取消收藏后删除按钮变灰,一个个选中变为取消收藏
        if (that.data.deColor == true) {
            that.setData({
                deColor: false
            });
            for (let i = 0; i < that.data.arr_next.length; i++) {
                if (that.data.arr_next[i].isDel == true) {
                    that.setData({
                        deColor: true
                    });
                }
            }
        }
    },

    //点击全选按钮
    allSelect: function (e) {
        let [that, arrOne, arr_next, flagAll] = [this, this.data.arrOne, this.data.arr_next, this.data.flagAll];
        //flagAll是否需要全选(true:全选)
        if (that.data.tabNum == 0) {
            if (flagAll == true) {
                //收藏全选
                console.log('全选');
                for (let i = 0; i < arrOne.length; i++) {
                    arrOne[i].isDel = true
                }
                that.setData({
                    arrOne: arrOne,
                    flagAll: false,
                    deColor: true
                })
            } else {
                console.log('取消全选');
                for (let i = 0; i < arrOne.length; i++) {
                    arrOne[i].isDel = false
                }
                that.setData({
                    arrOne: arrOne,
                    flagAll: true,
                    deColor: false
                })
            }


        }
        if (that.data.tabNum == 1) {
            if (flagAll == true) {
                //收藏全选
                console.log('全选');
                for (let i = 0; i < arr_next.length; i++) {
                    arr_next[i].isDel = true
                }
                that.setData({
                    arr_next: arr_next,
                    flagAll: false,
                    deColor: true
                })
            } else {
                console.log('取消全选');
                for (let i = 0; i < arr_next.length; i++) {
                    arr_next[i].isDel = false
                }
                that.setData({
                    arr_next: arr_next,
                    flagAll: true,
                    deColor: false
                })
            }


        }

    }
    ,

    //点击删除按钮
    del: function (e) {
        let [delArr, that, book_id, arrOne, arr_next] = [[], this, '', this.data.arrOne, this.data.arr_next];
        if (that.data.deColor == true) {//删除按钮是红色，表示有选择要删除（false不请求数据）
            if (that.data.tabNum == 0) {//删除收藏
                for (let i = 0; i < arrOne.length; i++) {
                    if (arrOne[i].isDel == true) {
                        book_id += arrOne[i].book_id + ','
                    }
                }
                console.log(book_id);
                book_id=book_id.substring(book_id.length-1,-1);
                shuJiaShouCangDel(book_id).then(res => {
                    console.log(res);
                    if (res.data.result.status.code == 0) {
                        console.log('删除成功');
                        that.setData({
                            show: false,
                            shouCangDel: false,
                            allDel: false,
                            deColor: false,
                            flag: true,
                            page: 1,
                            historyDel: false,
                            tabThr: false

                        });
                        //重新请求数据
                        shuJiaShouCang(that.data.page, that.data.num).then((res) => {
                            console.log(res);
                            let arr = res.data.result.data;
                            for (let i = 0; i < arr.length; i++) {
                                arr[i].isDel = false;
                            }
                            that.setData({
                                arrOne: arr
                            })
                        });
                    }

                })
            }

            //.........................................................
            if (that.data.tabNum == 1) {//删除历史
                for (let i = 0; i < arr_next.length; i++) {
                    if (arr_next[i].isDel == true) {
                        book_id += arr_next[i].book_id + ','
                    }
                }
                book_id = book_id.substring(0, book_id.length - 1);
                console.log(book_id);
                shuJiaHistoryDel(book_id).then(res => {
                    console.log(res);
                    if (res.data.result.status.code == 0) {
                        console.log('删除成功');
                        that.setData({
                            show: false,
                            shouCangDel: false,
                            allDel: false,
                            deColor: false,
                            flag: true,
                            page: 1,
                            historyDel: false,
                            tabThr: false
                        });
                        //重新请求数据
                        shuJiaHistory(that.data.page_next, that.data.num_next).then((res) => {
                            console.log(res);
                            let arr = res.data.result.data;
                            for (let i = 0; i < arr.length; i++) {
                                arr[i].isDel = false;
                            }
                            that.setData({
                                arr_next: arr
                            })
                        });
                    }

                })
            }

        }

    },


    onLoad: function () {


    },

    onReachBottom: function () {
        console.log('到底部拉');
        let that = this;
        if (that.data.tabThr == false) {
            if (that.data.tabNum == 0) {//收藏
                if (that.data.flag == true) {
                    that.setData({
                        show: true,
                        page: that.data.page + 1,
                        flag:false
                    });
                    shuJiaShouCang(that.data.page, that.data.num).then((res) => {
                        console.log(res);
                        let arr = res.data.result.data;
                        if (arr.length > 0) {
                            that.setData({
                                arrOne: that.data.arrOne.concat(arr),
                                flag:true
                            })
                        } else {
                            that.setData({
                                flag: false
                            })
                        }

                    });
                    setTimeout(function () {
                        that.setData({
                            show: false,
                        })
                    }, 300)
                }
            }

            if (that.data.tabNum == 1) {//历史
                if (that.data.flag == true) {
                    that.setData({
                        show: true,
                        page_next: that.data.page_next + 1,
                        flag:false
                    });
                    shuJiaHistory(that.data.page_next, that.data.num_next).then((res) => {
                        console.log(res);
                        let arr = res.data.result.data;
                        if (arr.length > 0) {
                            that.setData({
                                arr_next: that.data.arrOne.concat(arr),
                                flag: true
                            })
                        } else {
                            that.setData({
                                flag: false
                            })
                        }

                    });
                    setTimeout(function () {
                        that.setData({
                            show: false,
                        })
                    }, 300)
                }

            }
        }

    },


    onShow: function () {
        let that = this;
        //默认展示收藏内容
        that.setData({
            page:1,
            flag:true,
            page_next:1,
            flagAll	:true
        });
        shuJiaShouCang(that.data.page, that.data.num).then((res) => {
            console.log(res);
            let arr = res.data.result.data;
            for (let i = 0; i < arr.length; i++) {
                arr[i].isDel = false;
            }
            that.setData({
                arrOne: arr
            })
        });
    }

});




















