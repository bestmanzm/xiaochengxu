import {commonAjax} from '../../API/request'

var CommonEvent = require('../common/commonEvent');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        duration:'',
        wid: '0%',
        value: '',
        src: '',
        flag: true,//开关样式
        flag_next:true,//slider是否可以拖动,

        //时间
        m_l:'00',//分钟左边
        s_l:'00',//秒钟zuo边
        m_r:'00',
        s_r:'00',

        data:'',
        book_title:'',
        order:1,
        title:'',
        chapter_count:'',
        sound_content_id:'',
        sound_book_id:'',

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        // 使用 wx.createAudioContext 获取 audio 上下文 context
        let that=this;
        this.audioCtx = wx.createAudioContext('myAudio');
        let sound_book_id=options.sound_book_id;
        let sound_content_id=options.sound_content_id;
        console.log('sound_book_id,sound_content_id',sound_book_id,sound_content_id);
        that.setData({
            sound_book_id:sound_book_id,
            sound_content_id:sound_content_id,
        });
        CommonEvent.apply(this, []);

        commonAjax({
            url: '/yd/soundbook/details',
            data: {
                sound_book_id:sound_book_id
            }
        }).then((res) => {
            console.log(res);
            that.setData({
                data:res.data.result.data,
                chapter_count:res.data.result.data.chapter_count
            })
        });

        if(sound_content_id==undefined){
            console.log(1);
            commonAjax({
                url: '/yd/soundbook/chapterlists',
                data: {
                    sound_book_id:sound_book_id,
                    num:1,
                    page:1
                }
            }).then((res) => {
                console.log(res);
                that.setData({
                    sound_content_id:res.data.result.data[0].sound_content_id,
                    sound_book_id:sound_book_id,
                    book_title:res.data.result.data[0].book_title,
                    order:Number(res.data.result.data[0].order),
                    title:res.data.result.data[0].title,
                });
                wx.setNavigationBarTitle({
                    title: that.data.book_title
                });
                commonAjax({
                    url: '/yd/soundbook/chaptercontent',
                    data: {
                        sound_book_id:sound_book_id,
                        sound_content_id:that.data.sound_content_id
                    }
                }).then((res) => {
                    console.log(res);
                    that.setData({
                        src:res.data.result.data.source_url
                    })
                });
            });
        }else {
            commonAjax({
                url: '/yd/soundbook/chaptercontent',
                data: {
                    sound_book_id:sound_book_id,
                    sound_content_id:sound_content_id
                }
            }).then((res) => {
                console.log(res);
                that.setData({
                    src:res.data.result.data.source_url,
                    order:Number(res.data.result.data.order),
                    title:res.data.result.data.title,
                    book_title:res.data.result.data.book_info.book_title
                });
                wx.setNavigationBarTitle({
                    title: that.data.book_title
                });

            });
        }
    },

    askData:function (e) {
        this.audioCtx.seek(0);
        let that=this;
        let order=e.currentTarget.dataset.order;
        that.setData({
            duration:'',
            wid: '0%',
            value: '',
            src: '',
            flag: true,//开关样式
            flag_next:true,//slider是否可以拖动,

            //时间
            m_l:'00',//分钟左边
            s_l:'00',//秒钟zuo边
            m_r:'00',
            s_r:'00',
        });
        commonAjax({
            url: '/yd/soundbook/chapterlists',
            data: {
                sound_book_id:that.data.sound_book_id,
                num:1,
                page:order
            }
        }).then((res) => {
            console.log(res);
            console.log(res.data.result.data[0].price);
            if(res.data.result.data[0].price==0){
                that.setData({
                    arr:res.data.result.data,
                    sound_content_id:res.data.result.data[0].sound_content_id,
                    title:res.data.result.data[0].title,
                    order:order,
                });
                commonAjax({
                    url: '/yd/soundbook/chaptercontent',
                    data: {
                        sound_book_id:that.data.sound_book_id,
                        sound_content_id:that.data.sound_content_id
                    }
                }).then((res) => {
                    console.log(res);
                    that.setData({
                        src:res.data.result.data.source_url
                    })
                });
            }else {
                that.audioPause();
            }

        });

    },

    sliderChange: function (e) {
        let that = this;
        console.log(e.detail.value);
        that.setData({
            value:e.detail.value,
            wid: "" + e.detail.value + "%"
        });
        console.log(e.detail.value/100*that.data.duration);
        //指定位置播放
        this.audioCtx.seek(e.detail.value/100*that.data.duration);

    },
    audioPlay: function (e) {
        console.log('开');
        console.log(e);
        this.audioCtx.play();
        this.setData({
            flag: false,
            flag_next:false
        })
    },
    audioPause: function (e) {
        console.log('关');
        this.audioCtx.pause();
        this.setData({
            flag:true
        })
    },
    timeUpdate: function (e) {
        console.log(e);
        let wid = e.detail.currentTime / e.detail.duration * 100 + '%';
        let value = e.detail.currentTime / e.detail.duration * 100;
        let  m_l, s_l, m_r, s_r;
        m_l=Math.floor(e.detail.currentTime/60);
        s_l=Math.floor(e.detail.currentTime-60*m_l);
        m_r=Math.floor(e.detail.duration/60);
        s_r=Math.floor(e.detail.duration-60*m_r);

        if(m_l<10){
            m_l='0'+m_l
        }
        if(s_l<10){
            s_l='0'+s_l
        }

        console.log(wid, value);
        this.setData({
            wid: wid,
            value: value,
            duration:e.detail.duration,
            m_l:m_l,
            s_l:s_l,
            m_r:m_r,
            s_r:s_r,
        })
    },
    end:function () {
        console.log('播放完了');
        this.setData({
            flag:true
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
});