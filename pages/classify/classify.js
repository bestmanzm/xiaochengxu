// pages/classify/classify.js
import {classifyType, clickType} from '../../API/request'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //控制上拉加载样式是否显示
        show: true,//true:显示

        //滑动显示另一个头部title
        title_one: '全部',
        title_two: '全部',

        //页面顶部小说类别
        typeOne: 0,
        //页面顶部连载、完结
        typeTwo: 0,//0:全部，1：连载，2：完结

        //控制header显示隐藏替换
        header: true,

        //类别
        arrTypes: [],
        //点击相应类别选择的展示的数据
        arr: [],

        //请求数据传输的参数
        askData: {
            optionId: '',
            loadStatus: '',//是否连载（1：完结，0：连载）
            types: 'bt',//更新时间倒叙
            page: 1,
            num: 12,
        },

        //判断滑动到底部是否继续加载数据
        flag: true,//true:继续加载，false：不加载


    },


    //页面顶部小说类别点击
    tabOne: function (e) {
        let [that, id, option_id, title_one] = [this, e.currentTarget.dataset.id, e.currentTarget.dataset.option_id, e.currentTarget.dataset.title_one];
        console.log(id, option_id, title_one);
        that.setData({
            typeOne: id,
            'askData.optionId': option_id,
            'askData.page': 1,
            flag: true,
            title_one: title_one,

        });
        clickType(that.data.askData).then((res) => {
            console.log('展示内容数据', res);
            that.setData({
                arr: res.data.result.data
            });
            console.log(that.data.arr);
        });

    },

    //页面顶部小说连载、完结
    tabTwo: function (e) {
        let [that, id, load_status, title_two] =
            [
                this,
                e.currentTarget.dataset.id,
                e.currentTarget.dataset.load_status,
                e.currentTarget.dataset.title_two
            ];
        console.log(id, load_status, title_two);

        that.setData({
            typeTwo: id,
            'askData.loadStatus': load_status,
            'askData.page': 1,
            flag: true,
            title_two: title_two,
        });

        clickType(that.data.askData).then((res) => {
            console.log('展示内容数据', res);
            that.setData({
                arr: res.data.result.data
            });
            console.log(that.data.arr);
        })
    },

    //页面滚动事件
    scroll: function (e) {
        // console.log(e);
        let [that, scrollTop] = [this, e.detail.scrollTop];
        if (scrollTop > 80) {
            that.setData({
                header: false,
            })
        }
    },


    //页面滑动到顶部
    upper: function () {
        console.log("到顶部了");
        let that = this;
        that.setData({
            header: true,
        })
    },
    //页面滑动到底部
    lower: function () {
        console.log('到底部了');
        let that = this;
        if (that.data.flag == true) {//到底部加载数据
            that.setData({
                show: true,
                askData: {
                    optionId: that.data.askData.optionId,
                    loadStatus: that.data.askData.loadStatus,//是否连载（1：完结，0：连载）
                    types: 'bt',//更新时间倒叙
                    page: that.data.askData.page + 1,
                    num: that.data.askData.num,
                },
                flag:false
            });
            clickType(that.data.askData).then((res) => {
                console.log(res);
                if (res.data.result.data.length > 0) {
                    console.log(res.data.result.data.length);
                    that.setData({
                        arr: that.data.arr.concat(res.data.result.data),
                        flag:true
                    });
                } else {
                    that.setData({
                        flag: false,

                    })
                }

                console.log(that.data.arr);
            });
            setTimeout(function () {
                that.setData({
                    show: false,
                })
            }, 1500);


        } else {//到底部不加载数据
            console.log('没有加载的数据了');
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        //顶部类别列表
        classifyType().then((res) => {
            console.log('类别数据', res);
            that.setData({
                arrTypes: res.data.result.data
            });
            console.log(that.data.arrTypes);
        });

        //刚进入页面展示的数据（都是全部）
        clickType(that.data.askData).then((res) => {
            console.log('展示内容数据', res);
            that.setData({
                arr: res.data.result.data
            });
            console.log(that.data.arr);
        })
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})