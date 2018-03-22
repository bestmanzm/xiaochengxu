import {paiHang} from "../../API/request";

Page({
    data:{
        //顶部tab栏
        tabNum:0,
        //最右上角总榜月榜周榜
        bangName:'0',//总：0，月：1，周：2

        //总榜遮罩的显示
        zongBang:false,

        askData:{
            page:1,
            num:20,
            classs:'d',//d:点击，s:收藏，x:消费
            types:'t'// w周榜 m月榜 t总榜
        },
        //列表内容展示的数组
        arr:[],
        //存储的数组
        arrOne_t:[],//点击总榜
        arrOne_m:[],//点击月榜
        arrOne_w:[],//点击周榜

        arrTwo_t:[],//付费总榜
        arrTwo_m:[],//付费月榜
        arrTwo_w:[],//付费周榜

        arrThr_t:[],//收藏总榜
        arrThr_m:[],//收藏月榜
        arrThr_w:[],//收藏周榜
    },
    //关闭总月周榜
    close:function () {
        this.setData({
            zongBang:false,
        })
    },

    //tab的点击事件
    tapTab:function (e) {
        let [that,id]=[this,e.currentTarget.dataset.id];
        console.log(id);
        if(id==3){//点击的是总榜
            that.setData({
                zongBang:!that.data.zongBang,
            })
        }else {
            that.setData({
                tabNum:id
            })
        }

        //点击榜+总榜
       if(id==0 && that.data.bangName==0){
            console.log('点击榜+总榜');
            if(that.data.arrOne_t.length==0){
                console.log("点击榜+总榜未存储");
                that.setData({
                    askData:{
                        page:1,
                        num:20,
                        classs:'d',//d:点击，s:收藏，x:消费
                        types:'t'// w周榜 m月榜 t总榜
                    }
                })
                paiHang(that.data.askData).then((res)=>{
                    console.log(res);
                    console.log(res.data.result.data);
                    that.setData({
                        arr:res.data.result.data,
                        arrOne_t:res.data.result.data,
                    })
                })

            }
           if(that.data.arrOne_t.length>0){
               console.log("点击榜+总榜已经存储");
               that.setData({
                   arr:that.data.arrOne_t
               })
           }
           return;
       }

        //点击榜+周榜
        if(id==0 && that.data.bangName==2){
            console.log('点击榜+周榜');
            if(that.data.arrOne_w.length==0){
                console.log("点击榜+周榜未存储");
                that.setData({
                    askData:{
                        page:1,
                        num:20,
                        classs:'d',//d:点击，s:收藏，x:消费
                        types:'w'// w周榜 m月榜 t总榜
                    }
                });
                paiHang(that.data.askData).then((res)=>{
                    console.log(res);
                    console.log(res.data.result.data);
                    that.setData({
                        arr:res.data.result.data,
                        arrOne_w:res.data.result.data,
                    })
                })

            }
            if(that.data.arrOne_t.length>0){
                console.log("点击榜+周榜已经存储");
                that.setData({
                    arr:that.data.arrOne_w
                })
            }
            return;

        }

        //点击榜+月榜
        if(id==0 && that.data.bangName==1){
            console.log('点击榜+yue榜');
            if(that.data.arrOne_m.length==0){
                console.log("点击榜+yue榜未存储");
                that.setData({
                    askData:{
                        page:1,
                        num:20,
                        classs:'d',//d:点击，s:收藏，x:消费
                        types:'m'// w周榜 m月榜 t总榜
                    }
                });
                paiHang(that.data.askData).then((res)=>{
                    console.log(res);
                    console.log(res.data.result.data);
                    that.setData({
                        arr:res.data.result.data,
                        arrOne_m:res.data.result.data,
                    })
                })

            }
            if(that.data.arrOne_m.length>0){
                console.log("点击榜+yue榜已经存储");
                that.setData({
                    arr:that.data.arrOne_m
                })
            }
            return;
        }

        //付费榜+总榜
        if(id==1 && that.data.bangName==0){
            console.log('付费榜+总榜');
            if(that.data.arrTwo_t.length==0){
                console.log("付费榜+总榜未存储");
                that.setData({
                    askData:{
                        page:1,
                        num:20,
                        classs:'x',//d:点击，s:收藏，x:消费
                        types:'t'// w周榜 m月榜 t总榜
                    }
                })
                paiHang(that.data.askData).then((res)=>{
                    console.log(res);
                    console.log(res.data.result.data);
                    that.setData({
                        arr:res.data.result.data,
                        arrTwo_t:res.data.result.data,
                    })
                })

            }
            if(that.data.arrTwo_t.length>0){
                console.log("付费榜+总榜已经存储");
                that.setData({
                    arr:that.data.arrTwo_t
                })
            }
            return;
        }

        //付费榜+周榜
        if(id==1 && that.data.bangName==2){
            console.log('付费榜+周榜');
            if(that.data.arrTwo_w.length==0){
                console.log("付费榜+周榜未存储");
                that.setData({
                    askData:{
                        page:1,
                        num:20,
                        classs:'x',//d:点击，s:收藏，x:消费
                        types:'w'// w周榜 m月榜 t总榜
                    }
                });
                paiHang(that.data.askData).then((res)=>{
                    console.log(res);
                    console.log(res.data.result.data);
                    that.setData({
                        arr:res.data.result.data,
                        arrTwo_w:res.data.result.data,
                    })
                })

            }
            if(that.data.arrTwo_t.length>0){
                console.log("付费榜+周榜已经存储");
                that.setData({
                    arr:that.data.arrTwo_w
                })
            }
            return;

        }

        //付费榜+月榜
        if(id==1 && that.data.bangName==1){
            console.log('付费榜+yue榜');
            if(that.data.arrTwo_m.length==0){
                console.log("付费榜+yue榜未存储");
                that.setData({
                    askData:{
                        page:1,
                        num:20,
                        classs:'x',//d:点击，s:收藏，x:消费
                        types:'m'// w周榜 m月榜 t总榜
                    }
                });
                paiHang(that.data.askData).then((res)=>{
                    console.log(res);
                    console.log(res.data.result.data);
                    that.setData({
                        arr:res.data.result.data,
                        arrTwo_m:res.data.result.data,
                    })
                })

            }
            if(that.data.arrTwo_m.length>0){
                console.log("付费榜+yue榜已经存储");
                that.setData({
                    arr:that.data.arrTwo_m
                })
            }
            return;
        }

        //收藏榜+总榜
        if(id==2 && that.data.bangName==0){
            console.log('收藏榜+总榜');
            if(that.data.arrThr_t.length==0){
                console.log("收藏榜+总榜未存储");
                that.setData({
                    askData:{
                        page:1,
                        num:20,
                        classs:'s',//d:点击，s:收藏，x:消费
                        types:'t'// w周榜 m月榜 t总榜
                    }
                })
                paiHang(that.data.askData).then((res)=>{
                    console.log(res);
                    console.log(res.data.result.data);
                    that.setData({
                        arr:res.data.result.data,
                        arrThr_t:res.data.result.data,
                    })
                })

            }
            if(that.data.arrThr_t.length>0){
                console.log("收藏榜+总榜已经存储");
                that.setData({
                    arr:that.data.arrThr_t
                })
            }
            return;
        }

        //收藏榜+周榜
        if(id==2 && that.data.bangName==2){
            console.log('收藏榜+周榜');
            if(that.data.arrThr_w.length==0){
                console.log("收藏榜+周榜未存储");
                that.setData({
                    askData:{
                        page:1,
                        num:20,
                        classs:'s',//d:点击，s:收藏，x:消费
                        types:'w'// w周榜 m月榜 t总榜
                    }
                });
                paiHang(that.data.askData).then((res)=>{
                    console.log(res);
                    console.log(res.data.result.data);
                    that.setData({
                        arr:res.data.result.data,
                        arrThr_w:res.data.result.data,
                    })
                })

            }
            if(that.data.arrThr_t.length>0){
                console.log("收藏榜+周榜已经存储");
                that.setData({
                    arr:that.data.arrThr_w
                })
            }
            return;

        }

        //收藏榜+月榜
        if(id==2 && that.data.bangName==1){
            console.log('收藏榜+yue榜');
            if(that.data.arrThr_m.length==0){
                console.log("收藏榜+yue榜未存储");
                that.setData({
                    askData:{
                        page:1,
                        num:20,
                        classs:'s',//d:点击，s:收藏，x:消费
                        types:'m'// w周榜 m月榜 t总榜
                    }
                });
                paiHang(that.data.askData).then((res)=>{
                    console.log(res);
                    console.log(res.data.result.data);
                    that.setData({
                        arr:res.data.result.data,
                        arrThr_m:res.data.result.data,
                    })
                })

            }
            if(that.data.arrThr_m.length>0){
                console.log("收藏榜+yue榜已经存储");
                that.setData({
                    arr:that.data.arrThr_m
                })
            }
            return;
        }


    },

    //总月周的点击
    tapBang:function (e) {
        let [that,bangName]=[this,e.currentTarget.dataset.bangname];
        console.log(bangName);
        setTimeout(function () {
            that.setData({
                bangName:bangName,
                zongBang:false,
            })
        },300);


        //点击榜+总榜
        if(that.data.tabNum==0 && bangName==0){
            console.log('点击榜+总榜');
            if(that.data.arrOne_t.length==0){
                console.log("点击榜+总榜未存储");
                that.setData({
                    askData:{
                        page:1,
                        num:20,
                        classs:'d',//d:点击，s:收藏，x:消费
                        types:'t'// w周榜 m月榜 t总榜
                    }
                })
                paiHang(that.data.askData).then((res)=>{
                    console.log(res);
                    console.log(res.data.result.data);
                    that.setData({
                        arr:res.data.result.data,
                        arrOne_t:res.data.result.data,
                    })
                })

            }
            if(that.data.arrOne_t.length>0){
                console.log("点击榜+总榜已经存储");
                that.setData({
                    arr:that.data.arrOne_t
                })
            }
            return;
        }

        //点击榜+周榜
        if(that.data.tabNum==0 && bangName==2){
            console.log('点击榜+周榜');
            if(that.data.arrOne_w.length==0){
                console.log("点击榜+周榜未存储");
                that.setData({
                    askData:{
                        page:1,
                        num:20,
                        classs:'d',//d:点击，s:收藏，x:消费
                        types:'w'// w周榜 m月榜 t总榜
                    }
                });
                paiHang(that.data.askData).then((res)=>{
                    console.log(res);
                    console.log(res.data.result.data);
                    that.setData({
                        arr:res.data.result.data,
                        arrOne_w:res.data.result.data,
                    })
                })

            }
            if(that.data.arrOne_t.length>0){
                console.log("点击榜+周榜已经存储");
                that.setData({
                    arr:that.data.arrOne_w
                })
            }
            return;

        }

        //点击榜+月榜
        if(that.data.tabNum==0 && bangName==1){
            console.log('点击榜+yue榜');
            if(that.data.arrOne_m.length==0){
                console.log("点击榜+yue榜未存储");
                that.setData({
                    askData:{
                        page:1,
                        num:20,
                        classs:'d',//d:点击，s:收藏，x:消费
                        types:'m'// w周榜 m月榜 t总榜
                    }
                });
                paiHang(that.data.askData).then((res)=>{
                    console.log(res);
                    console.log(res.data.result.data);
                    that.setData({
                        arr:res.data.result.data,
                        arrOne_m:res.data.result.data,
                    })
                })

            }
            if(that.data.arrOne_m.length>0){
                console.log("点击榜+yue榜已经存储");
                that.setData({
                    arr:that.data.arrOne_m
                })
            }
            return;
        }

        //付费榜+总榜
        if(that.data.tabNum==1 && bangName==0){
            console.log('付费榜+总榜');
            if(that.data.arrTwo_t.length==0){
                console.log("付费榜+总榜未存储");
                that.setData({
                    askData:{
                        page:1,
                        num:20,
                        classs:'x',//d:点击，s:收藏，x:消费
                        types:'t'// w周榜 m月榜 t总榜
                    }
                })
                paiHang(that.data.askData).then((res)=>{
                    console.log(res);
                    console.log(res.data.result.data);
                    that.setData({
                        arr:res.data.result.data,
                        arrTwo_t:res.data.result.data,
                    })
                })

            }
            if(that.data.arrTwo_t.length>0){
                console.log("付费榜+总榜已经存储");
                that.setData({
                    arr:that.data.arrTwo_t
                })
            }
            return;
        }

        //付费榜+周榜
        if(that.data.tabNum==1 && bangName==2){
            console.log('付费榜+周榜');
            if(that.data.arrTwo_w.length==0){
                console.log("付费榜+周榜未存储");
                that.setData({
                    askData:{
                        page:1,
                        num:20,
                        classs:'x',//d:点击，s:收藏，x:消费
                        types:'w'// w周榜 m月榜 t总榜
                    }
                });
                paiHang(that.data.askData).then((res)=>{
                    console.log(res);
                    console.log(res.data.result.data);
                    that.setData({
                        arr:res.data.result.data,
                        arrTwo_w:res.data.result.data,
                    })
                })

            }
            if(that.data.arrTwo_t.length>0){
                console.log("付费榜+周榜已经存储");
                that.setData({
                    arr:that.data.arrTwo_w
                })
            }
            return;

        }

        //付费榜+月榜
        if(that.data.tabNum==1 && bangName==1){
            console.log('付费榜+yue榜');
            if(that.data.arrTwo_m.length==0){
                console.log("付费榜+yue榜未存储");
                that.setData({
                    askData:{
                        page:1,
                        num:20,
                        classs:'x',//d:点击，s:收藏，x:消费
                        types:'m'// w周榜 m月榜 t总榜
                    }
                });
                paiHang(that.data.askData).then((res)=>{
                    console.log(res);
                    console.log(res.data.result.data);
                    that.setData({
                        arr:res.data.result.data,
                        arrTwo_m:res.data.result.data,
                    })
                })

            }
            if(that.data.arrTwo_m.length>0){
                console.log("付费榜+yue榜已经存储");
                that.setData({
                    arr:that.data.arrTwo_m
                })
            }
            return;
        }

        //收藏榜+总榜
        if(that.data.tabNum==2 && bangName==0){
            console.log('收藏榜+总榜');
            if(that.data.arrThr_t.length==0){
                console.log("收藏榜+总榜未存储");
                that.setData({
                    askData:{
                        page:1,
                        num:20,
                        classs:'s',//d:点击，s:收藏，x:消费
                        types:'t'// w周榜 m月榜 t总榜
                    }
                })
                paiHang(that.data.askData).then((res)=>{
                    console.log(res);
                    console.log(res.data.result.data);
                    that.setData({
                        arr:res.data.result.data,
                        arrThr_t:res.data.result.data,
                    })
                })

            }
            if(that.data.arrThr_t.length>0){
                console.log("收藏榜+总榜已经存储");
                that.setData({
                    arr:that.data.arrThr_t
                })
            }
            return;
        }

        //收藏榜+周榜
        if(that.data.tabNum==2 && bangName==2){
            console.log('收藏榜+周榜');
            if(that.data.arrThr_w.length==0){
                console.log("收藏榜+周榜未存储");
                that.setData({
                    askData:{
                        page:1,
                        num:20,
                        classs:'s',//d:点击，s:收藏，x:消费
                        types:'w'// w周榜 m月榜 t总榜
                    }
                });
                paiHang(that.data.askData).then((res)=>{
                    console.log(res);
                    console.log(res.data.result.data);
                    that.setData({
                        arr:res.data.result.data,
                        arrThr_w:res.data.result.data,
                    })
                })

            }
            if(that.data.arrThr_t.length>0){
                console.log("收藏榜+周榜已经存储");
                that.setData({
                    arr:that.data.arrThr_w
                })
            }
            return;

        }

        //收藏榜+月榜
        if(that.data.tabNum==2 && bangName==1){
            console.log('收藏榜+yue榜');
            if(that.data.arrThr_m.length==0){
                console.log("收藏榜+yue榜未存储");
                that.setData({
                    askData:{
                        page:1,
                        num:20,
                        classs:'s',//d:点击，s:收藏，x:消费
                        types:'m'// w周榜 m月榜 t总榜
                    }
                });
                paiHang(that.data.askData).then((res)=>{
                    console.log(res);
                    console.log(res.data.result.data);
                    that.setData({
                        arr:res.data.result.data,
                        arrThr_m:res.data.result.data,
                    })
                })

            }
            if(that.data.arrThr_m.length>0){
                console.log("收藏榜+yue榜已经存储");
                that.setData({
                    arr:that.data.arrThr_m
                })
            }
            return;
        }

    },





    onLoad:function () {
        let that=this;
        //默认点击榜总榜
        paiHang(that.data.askData).then((res)=>{
            console.log(res);
            console.log(res.data.result.data);
            that.setData({
                arr:res.data.result.data,
                arrOne_t:res.data.result.data,
            })
        })

    }

  
})