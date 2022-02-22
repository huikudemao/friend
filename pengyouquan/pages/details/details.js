// pages/details/details.js
var util = require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isshow:false,
        shows:false,
        dzname:'赞',
        zan:0
    },
    // 图片预览功能
    getimage(e){
        wx.previewImage({
            current: e.target.dataset.item, // 当前显示图片的http链接
            urls:this.data.details.picture// 需要预览的图片http链接列表
          })
    },
    // 评论点赞按钮的显示
    chooseMore(){
        var sh=this.data.isshow;
        this.setData({
            isshow:!sh,
            shows:false
        })
        //   console.log(this.data.userInfo.nickName);
    },
    // 控制输入框的显示
    getcommen(){
        var sh1=this.data.shows;
        this.setData({
            shows:!sh1
        })
    },
    // 点赞功能的实现
    getyes(){
        var pics=''
        if(this.data.details.picture){
            pics=this.data.details.picture.join()
        }
       
        this.setData({
            dzname:'已赞',
            zan:1
        })
        // this.data.details.id
        console.log(pics);
        var userData={
            id:this.data.details.id,
            text:this.data.details.text,
            picture:pics,
            video:this.data.details.video,
            time:this.data.details.time,
            position:this.data.details.position,
            numbers:this.data.details.numbers+1
        }
        util.getYesPut(userData,this.doSuccess3,this.doFail3)
        console.log("加赞"+this.data.zan);
        this.getData()
        wx.redirectTo({
            url:"/pages/details/details?fid="+this.data.fid+"&zan="+this.data.zan+"&dzname="+this.data.dzname
        })
    },
    getyes1(){
        console.log('减赞'+this.data.zan);
        var pics=''
        if(this.data.details.picture){
            pics=this.data.details.picture.join()
        }
        this.setData({
            dzname:'赞',
            zan:0
        })
        // this.data.details.id
        console.log(pics);
        var userData={
            id:this.data.details.id,
            text:this.data.details.text,
            picture:pics,
            video:this.data.details.video,
            time:this.data.details.time,
            position:this.data.details.position,
            numbers:this.data.details.numbers-1
        }
        util.getYesPut(userData,this.doSuccess3,this.doFail3)
        console.log("减赞"+this.data.zan);
        this.getData()
        wx.redirectTo({
            url:"/pages/details/details?fid="+this.data.fid+"&zan="+this.data.zan+"&dzname="+this.data.dzname
        })
    },
    //正确 
    doSuccess3: function(e){
        console.log(e);
        },
      //错误 
     doFail3: function(e){
        console.log(e);
     },
    // 获取用户信息
    getUserProfile(e){
        wx.getUserProfile({
            desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
            }
          })
        
    },
    // 添加评论
    formSubmit(e) {
        // console.log(this.data.fid);
        var userData={
            fid:this.data.fid,
            // name:this.data.userInfo.nickName,
            name:'??',
            commentary: e.detail.value.input
        }
        // 网络请求，添加评论
        util.getUserPost(userData,this.doSuccess2,this.doFail2)
        var sh1=this.data.shows;
        this.setData({
            shows:!sh1,
            isshow:false
        })
        // 重新调用本页的数据
        this.getData()
      },
      //正确 
     doSuccess2: function(e){
       console.log(e);
       },
     //错误 
    doFail2: function(e){
       console.log(e);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            fid:options.fid
        })
        // 点赞刷新页面得到的数据
        if(options.zan){
            this.setData({
                zan:options.zan
            })
        }
        if(options.dzname){
            this.setData({
                dzname:options.dzname
            })
        }
        this.getData()
    },
    // 根据fid获取发布的信息，及评论等相关内容
     getData(){
        util.getIdGet(this.data.fid,this.doSuccess,this.doFail)
        util.getDetailsGet(this.data.fid,this.doSuccess1,this.doFail1)
        console.log(this.data.fid);
     },
     //正确 
    doSuccess: function(e){
        // console.log(e);
        this.setData({
            details:e.data.data,
        })
        console.log(this.data.details);

        if(e.data.data.picture){
            // 给对象content添加新数组pictures，新数组是字符串picture转换成的数组
            this.data.details.picture=e.data.data.picture.split(",")
        }else{
            // this.data.content[i].picture=[]
        }
        this.setData({
            details:this.data.details
        })
        console.log(this.data.details);
    },
    //错误 
    doFail: function(e){
        console.log(e);
    },
     //正确 
     doSuccess1: function(e){
         this.setData({
            commentary:e.data.data
         })
        console.log(this.data.commentary);
        },
    //错误 
    doFail1: function(e){
        console.log(e);
    },
})