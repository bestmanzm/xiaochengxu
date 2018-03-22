import { search_hot, search_cont } from '../../API/request'
var CommonEvent = require('../common/commonEvent');

Page({
    data: {
        //show控制搜索内容的加载
        show: false,

        page: 1,
        //判断是否显示搜索和历史
        showOne: true,
        val: '',
        //没有搜索到
        val_next:'',

        //搜索结果没有时侯有书true
        fruit: true,

        //热门搜索
        hotArr: [],

        historyArr: [],

        //搜的结果列表
        fruitArr: [],

        //没有搜索到的文字
        val_next: '',

        loadFlag:true,//true:可加载，false：禁止加载

    },

    //绑定搜索框输入的内容
    userInput: function (e) {
        let that=this;
        console.log(e.detail.value);
        that.setData({
            val: e.detail.value,
            loadFlag:true,
            page:1
        });
        let cont = that.data.val;
        if (cont != '') {
            this.setData({
                addColor: false,
            });
            search_cont(1, cont).then((res) => {
                console.log(res);
                console.log(res.data.result.data);

                let fruitArr = res.data.result.data;
                if (res.data.result.data.length == 0) {
                    this.setData({
                        showOne: false,
                        fruit: false,
                        val_next: this.data.val
                    });
                } else {
                    //有搜索数据
                    for (let i = 0; i < fruitArr.length; i++) {
                        // console.log(fruitArr[i].book_title);
                        if (fruitArr[i].book_title.indexOf(cont) != -1){
                            let newArrColorFont = fruitArr[i].book_title;
                            let contLength = cont.length;
                            let index = newArrColorFont.indexOf(cont);
                            console.log(index);
                            fruitArr[i].book_title_cont = cont;
                            fruitArr[i].book_title_l = newArrColorFont.substr(0, index);
                            fruitArr[i].book_title_r = newArrColorFont.substr(index + contLength, newArrColorFont.length);
                            fruitArr[i].addColor =true;
                        }else {
                            fruitArr[i].addColor =false;
                        }
                    }
                    this.setData({
                        showOne: false,
                        fruit: true,
                        fruitArr: fruitArr
                    });
                }

            });
        }

    },

    //添加搜索历史纪录
    addHistory: function () {
        //判断是否有搜索过的历史
        let historyArr = wx.getStorageSync('historyArr');//拿下是字符串
        let cont = this.data.val;
        if (historyArr) {
            console.log('存储过搜索记录');
            if (cont != '') {
                historyArr.push(cont);
            }
            //去重
            historyArr = Array.from(new Set(historyArr));
            wx.setStorageSync('historyArr', historyArr)//存储需要是字符串
            this.setData({
                historyArr: historyArr
            })
        } else {
            console.log('没有存储过搜索记录');
            if (cont != '') {
                let historyArr = [];
                historyArr.push(cont);
                wx.setStorageSync('historyArr', historyArr);
                this.setData({
                    historyArr: historyArr
                })
            }

        }
    },


    //点击小叉叉清除input内容
    clearFont: function () {
        console.log(11111);
        this.setData({
            val: '',
            showOne:true
        });
    },

    //点击热门搜索和搜索历史的选项
    search: function (e) {
        let cont = e.currentTarget.dataset.cont;
        console.log(cont);
        this.setData({
            val: cont
        });
        search_cont(1, cont).then((res) => {
            console.log(res);
            console.log(res.data.result.data);
            let fruitArr = res.data.result.data;
            if (res.data.result.data.length == 0) {
                this.setData({
                    showOne: false,
                    fruit: false,
                    val_next: this.data.val
                });
            } else {
                //有搜索数据
                for (let i = 0; i < fruitArr.length; i++) {
                    // console.log(fruitArr[i].book_title);
                    if (fruitArr[i].book_title.indexOf(cont) != -1){
                        let newArrColorFont = fruitArr[i].book_title;
                        let contLength = cont.length;
                        let index = newArrColorFont.indexOf(cont);
                        console.log(index);
                        fruitArr[i].book_title_cont = cont;
                        fruitArr[i].book_title_l = newArrColorFont.substr(0, index);
                        fruitArr[i].book_title_r = newArrColorFont.substr(index + contLength, newArrColorFont.length);
                        fruitArr[i].addColor =true;
                    }else {
                        fruitArr[i].addColor =false;
                    }
                }
                this.setData({
                    showOne: false,
                    fruit: true,
                    fruitArr: fruitArr
                });
            }
        });

        let historyArr = wx.getStorageSync('historyArr');//拿下是字符串
        if (historyArr) {
            console.log('存储过搜索记录');
            if (cont != '') {
                historyArr.push(cont);
            }
            //去重
            historyArr = Array.from(new Set(historyArr));
            wx.setStorageSync('historyArr', historyArr)//存储需要是字符串
            this.setData({
                historyArr: historyArr
            })
        } else {
            console.log('没有存储过搜索记录');
            if (cont != '') {
                let historyArr = [];
                historyArr.push(cont);
                historyArr = Array.from(new Set(historyArr));
                wx.setStorageSync('historyArr', historyArr);
            }
            this.setData({
                historyArr: historyArr
            })
        }
    },

    //点击取消按钮
    cancle:function () {
        this.setData({
            val:'',
            showOne:true
        });
        wx.switchTab({
            url: '../tuiJian/tuiJian',
        });
    },

    //清除搜索按钮的点击
    delHistory:function (e) {
        wx.removeStorage({
            key: 'historyArr',
            success: function(res) {
                console.log(res)
            }
        });
        this.setData({
            historyArr:[]
        })
    },



    onLoad: function (options) {
        search_hot().then((res) => {
            let hotArr = res.data.result.data;
            console.log(hotArr);
            this.setData({
                hotArr: hotArr
            })
        });



        // //存储的搜索历史
        let historyArr = wx.getStorageSync('historyArr');//拿下是字符串
        historyArr = Array.from(new Set(historyArr));
        if (historyArr) {
            this.setData({
                historyArr: historyArr
            })
        }


    },

    onReachBottom: function () {
        console.log('到底了');
        let that = this;
        if(that.data.loadFlag==true){
            that.setData({
                show: true,
                page: that.data.page + 1,
                loadFlag:false
            });
            search_cont(that.data.page, that.data.val).then((res) => {
                console.log(res);
                let arr = res.data.result.data;
                console.log(arr);
                if (arr.length > 0) {

                    //有搜索数据
                    let cont=that.data.val;
                    for (let i = 0; i < arr.length; i++) {
                        // console.log(fruitArr[i].book_title);
                        if (arr[i].book_title.indexOf(cont) != -1){
                            let newArrColorFont = arr[i].book_title;
                            let contLength = cont.length;
                            let index = newArrColorFont.indexOf(cont);
                            console.log(index);
                            arr[i].book_title_cont = cont;
                            arr[i].book_title_l = newArrColorFont.substr(0, index);
                            arr[i].book_title_r = newArrColorFont.substr(index + contLength, newArrColorFont.length);
                            arr[i].addColor =true;
                        }else {
                            arr[i].addColor =false;
                        }
                    }
                    let newarr = that.data.fruitArr.concat(arr);

                    that.setData({
                        fruitArr: newarr,
                        loadFlag:true
                    })
                }else {
                    that.setData({
                        loadFlag:false
                    });
                }

            });

            setTimeout(function () {
                that.setData({
                    show:false
                })
            }, 1500);
        }else {
            console.log('没有数据了');
        }

    },

});






















