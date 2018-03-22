import {gengXin, gengXinCont, gengXinAdd, gengXinDel} from "../../API/request";

Page({
    data: {
        isGengXin: false,

        show: false,
        //日期的数组
        arr: [],

        //控制tab栏显示样式
        tabNum: 0,

        //展示的七天数组

        arrCont: [],
        page: 1,
        num: 5,
        times: '',

        //今天昨天等数据
        arr0: [],
        arr1: [],
        arr2: [],
        arr3: [],
        arr4: [],
        arr5: [],
        arr6: [],
        flag: true,
    },

    onLoad: function () {
        let that = this;
        gengXin().then((res) => {
            console.log(res);

            that.setData({
                arr: res.data.result.data
            });
            //默认展示今天数据
            gengXinCont(that.data.page, that.data.num, that.data.arr[0].times).then((res) => {
                console.log(res);
                that.setData({
                    arrCont: res.data.result.data,
                    arr0: res.data.result.data,
                    times: that.data.arr[0].times
                });

                if (that.data.arrCont.length == 0) {
                    that.setData({
                        isGengXin: true
                    })
                }
            })


        });
    },

    //tab栏点击显示样式
    tapTab: function (e) {
        let [that, id, times] = [this, e.currentTarget.dataset.id, e.currentTarget.dataset.times];
        //console.log(id, times);
        that.setData({
            tabNum: id,
            page: 1,
            times: times,
            flag:true
        });
        console.log(that);
        if (id == 0) {
            if (that.data.arr0.length == 0) {
                console.log('一，无数据');
                gengXinCont(that.data.page, that.data.num, that.data.arr[0].times).then((res) => {
                    console.log(res);
                    that.setData({
                        arrCont: res.data.result.data,
                        arr0: res.data.result.data,
                    });
                    if (that.data.arrCont.length == 0) {
                        console.log(1)
                        that.setData({
                            isGengXin: true
                        })
                    } else {
                        console.log(2)
                        that.setData({
                            isGengXin: false
                        })
                    }

                });
            } else {
                console.log('一，有数据');
                that.setData({
                    arrCont: that.data.arr0
                });
                if (that.data.arrCont.length == 0) {
                    console.log(1)
                    that.setData({
                        isGengXin: true
                    })
                } else {
                    console.log(2)
                    that.setData({
                        isGengXin: false
                    })
                }

            }

        }
        if (id == 1) {
            if (that.data.arr1.length == 0) {
                console.log('二，无数据');
                gengXinCont(that.data.page, that.data.num, that.data.arr[1].times).then((res) => {
                    console.log(res);
                    that.setData({
                        arrCont: res.data.result.data,
                        arr1: res.data.result.data,
                    });
                    if (that.data.arrCont.length == 0) {
                        console.log(1)
                        that.setData({
                            isGengXin: true
                        })
                    } else {
                        console.log(2)
                        that.setData({
                            isGengXin: false
                        })
                    }

                });
            } else {
                console.log('二，有数据');
                that.setData({
                    arrCont: that.data.arr1
                });
                if (that.data.arrCont.length == 0) {
                    console.log(1)
                    that.setData({
                        isGengXin: true
                    })
                } else {
                    console.log(2)
                    that.setData({
                        isGengXin: false
                    })
                }

            }

        }
        if (id == 2) {
            if (that.data.arr2.length == 0) {
                console.log('三，无数据');
                gengXinCont(that.data.page, that.data.num, that.data.arr[2].times).then((res) => {
                    console.log(res);
                    that.setData({
                        arrCont: res.data.result.data,
                        arr2: res.data.result.data,
                    });
                    if (that.data.arrCont.length == 0) {
                        console.log(1)
                        that.setData({
                            isGengXin: true
                        })
                    } else {
                        console.log(2)
                        that.setData({
                            isGengXin: false
                        })
                    }

                });
            } else {
                console.log('三，有数据');
                that.setData({
                    arrCont: that.data.arr2
                });
                if (that.data.arrCont.length == 0) {
                    console.log(1)
                    that.setData({
                        isGengXin: true
                    })
                } else {
                    console.log(2)
                    that.setData({
                        isGengXin: false
                    })
                }

            }

        }
        if (id == 3) {
            if (that.data.arr3.length == 0) {
                console.log('四，无数据');
                gengXinCont(that.data.page, that.data.num, that.data.arr[3].times).then((res) => {
                    console.log(res);
                    that.setData({
                        arrCont: res.data.result.data,
                        arr3: res.data.result.data,
                    });
                    if (that.data.arrCont.length == 0) {
                        console.log(1)
                        that.setData({
                            isGengXin: true
                        })
                    } else {
                        console.log(2)
                        that.setData({
                            isGengXin: false
                        })
                    }

                });
            } else {
                console.log('四，有数据');
                that.setData({
                    arrCont: that.data.arr3
                });
                if (that.data.arrCont.length == 0) {
                    console.log(1)
                    that.setData({
                        isGengXin: true
                    })
                } else {
                    console.log(2)
                    that.setData({
                        isGengXin: false
                    })
                }

            }

        }
        if (id == 4) {
            if (that.data.arr4.length == 0) {
                console.log('五，无数据');
                gengXinCont(that.data.page, that.data.num, that.data.arr[4].times).then((res) => {
                    console.log(res);
                    that.setData({
                        arrCont: res.data.result.data,
                        arr4: res.data.result.data,
                    });
                    if (that.data.arrCont.length == 0) {
                        console.log(1)
                        that.setData({
                            isGengXin: true
                        })
                    } else {
                        console.log(2)
                        that.setData({
                            isGengXin: false
                        })
                    }

                });
            } else {
                console.log('五，有数据');
                that.setData({
                    arrCont: that.data.arr4
                });
                if (that.data.arrCont.length == 0) {
                    console.log(1)
                    that.setData({
                        isGengXin: true
                    })
                } else {
                    console.log(2)
                    that.setData({
                        isGengXin: false
                    })
                }

            }

        }
        if (id == 5) {
            if (that.data.arr5.length == 0) {
                console.log('六，无数据');
                gengXinCont(that.data.page, that.data.num, that.data.arr[5].times).then((res) => {
                    console.log(res);
                    that.setData({
                        arrCont: res.data.result.data,
                        arr5: res.data.result.data,
                    });
                    if (that.data.arrCont.length == 0) {
                        console.log(1)
                        that.setData({
                            isGengXin: true
                        })
                    } else {
                        console.log(2)
                        that.setData({
                            isGengXin: false
                        })
                    }

                });
            } else {
                console.log('一，有数据');
                that.setData({
                    arrCont: that.data.arr5
                });
                if (that.data.arrCont.length == 0) {
                    console.log(1)
                    that.setData({
                        isGengXin: true
                    })
                } else {
                    console.log(2)
                    that.setData({
                        isGengXin: false
                    })
                }

            }

        }
        if (id == 6) {
            if (that.data.arr6.length == 0) {
                console.log('七，无数据');
                gengXinCont(that.data.page, that.data.num, that.data.arr[6].times).then((res) => {
                    console.log(res);
                    that.setData({
                        arrCont: res.data.result.data,
                        arr6: res.data.result.data,
                    });
                    if (that.data.arrCont.length == 0) {
                        console.log(1)
                        that.setData({
                            isGengXin: true
                        })
                    } else {
                        console.log(2)
                        that.setData({
                            isGengXin: false
                        })
                    }

                });
            } else {
                console.log('七，有数据');
                that.setData({
                    arrCont: that.data.arr6
                });
                if (that.data.arrCont.length == 0) {
                    console.log(1)
                    that.setData({
                        isGengXin: true
                    })
                } else {
                    console.log(2)
                    that.setData({
                        isGengXin: false
                    })
                }

            }

        }


    },

    //收藏事件
    addBook: function (e) {
        let [that, book_id, index, is_collection] = [this, e.currentTarget.dataset.book_id, e.currentTarget.dataset.index, e.currentTarget.dataset.is_collection];
        console.log(book_id, index, is_collection);
        if (is_collection == 0) {
            //收藏
            gengXinAdd(book_id).then((res) => {
                console.log('收藏成功');
                console.log(res);
                if (res.data.result.status.code == 0) {
                    that.changeShouCang(index)
                }
            });
        } else if (is_collection == 1) {
            //移除收藏
            gengXinDel(book_id).then((res) => {
                console.log('移除收藏成功');
                console.log(res);
                that.changeShouCang(index)
            })
        }


    },
    //收藏移除调用
    changeShouCang: function (index) {
        let that = this;
        let arrCont = that.data.arrCont;
        if (that.data.tabNum == 0) {
            let arr0 = that.data.arr0;
            arrCont[index].is_collection = !arrCont[index].is_collection;
            if (index < 5) {//默认加载五本书 默认加上上拉的额数据都需要修改 大于5就不需要修改默认加载的五本
                arr0[index].is_collection = !arr0[index].is_collection;
            }
            that.setData({
                arrCont: arrCont,
                arr0: arr0,
            })


        }
        if (that.data.tabNum == 1) {
            let arr1 = that.data.arr1;
            arrCont[index].is_collection = !arrCont[index].is_collection;
            if (index < 5) {
                arr1[index].is_collection = !arr1[index].is_collection;
            }
            that.setData({
                arrCont: arrCont,
                arr1: arr1,
            })
        }
        if (that.data.tabNum == 2) {
            let arr2 = that.data.arr2;
            arrCont[index].is_collection = !arrCont[index].is_collection;
            if (index < 5) {
                arr2[index].is_collection = !arr2[index].is_collection;
            }
            that.setData({
                arrCont: arrCont,
                arr2: arr2,
            })
        }
        if (that.data.tabNum == 3) {
            let arr3 = that.data.arr3;
            arrCont[index].is_collection = !arrCont[index].is_collection;
            if (index < 5) {
                arr3[index].is_collection = !arr3[index].is_collection;
            }
            that.setData({
                arrCont: arrCont,
                arr3: arr3,
            })
        }
        if (that.data.tabNum == 4) {
            let arr4 = that.data.arr4;
            arrCont[index].is_collection = !arrCont[index].is_collection;
            if (index < 5) {
                arr4[index].is_collection = !arr4[index].is_collection;
            }
            that.setData({
                arrCont: arrCont,
                arr4: arr4,
            })
        }
        if (that.data.tabNum == 5) {
            let arr5 = that.data.arr5;
            arrCont[index].is_collection = !arrCont[index].is_collection;
            if (index < 5) {
                arr5[index].is_collection = !arr5[index].is_collection;
            }
            that.setData({
                arrCont: arrCont,
                arr5: arr5,
            })
        }
        if (that.data.tabNum == 6) {
            let arr6 = that.data.arr6;
            arrCont[index].is_collection = !arrCont[index].is_collection;
            if (index < 5) {
                arr6[index].is_collection = !arr6[index].is_collection;
            }
            that.setData({
                arrCont: arrCont,
                arr6: arr6,
            })
        }
    },

    onReachBottom: function () {
        console.log('到底啦');
        let that = this;
        if (that.data.flag == true) {
            that.setData({
                show: true,
                page: that.data.page + 1,
                flag:false
            });

            gengXinCont(that.data.page, that.data.num, that.data.times).then((res) => {
                console.log(res);
                if (res.data.result.data.length == 0) {
                    that.setData({
                        flag: false,
                   //     show: false,
                    })
                } else {
                    that.setData({
                        arrCont: that.data.arrCont.concat(res.data.result.data),
                     //   show: false,
                        flag:true
                    })
                }

            });

            setTimeout(function () {
                that.setData({
                    show: false,
                })
            }, 1500)
        }
    }


});

















