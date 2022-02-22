// pages/publish/publish.js
var util = require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
      text:'',
      picture:'',
      time:'',
      pos:'当前位置'
    },
    /*图片处理 */
    chooseImage:function(){
      if(this.data.video){
        // 提示框
        wx.showToast({
          title: '视频图片选一种',
          icon: 'error',
          image:'../../image/shibai.png',
          duration: 2000
        })
        return
      }
        var _this=this;
          wx.chooseImage({
            count:9, //图片上传多少张设置，默认上限9
            sizeType:['original','compressed'],  // 可以指定是原图还是压缩图，默认都有
            sourceType:['album','camera'],   // 可以指定来源是相册还是相机，默认都有
            success: function(res) {
              console.log(res);
            _this.setData({
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              picture:res.tempFilePaths
            })
            },
          })
         
    },
    // 视频处理
    getvideo(){
      if(this.data.picture){
        // 提示框
        wx.showToast({
          title: '视频图片选一种',
          icon: 'error',
          image:'../../image/shibai.png',
          duration: 2000
        })
        return
      }
      var than=this;
      wx.chooseVideo({
        sourceType: ['album','camera'],
        maxDuration: 60,
        camera: 'back',
        success(res) {
          console.log(res.tempFilePath)
          than.setData({
            video:res.tempFilePath
          })
        }
      })
    },
    // 选择位置
    getposition(){
      //   关闭当前页，再跳转到某个页面
      wx.redirectTo({
        url: '/pages/position/position',
      })
    },
    // 输入的文字
    gettext(e){
      this.setData({
        text:e.detail.value
      })
      console.log(this.data.text);
    },
    // 发表
    getsubmit(){
      if(!this.data.text){
        wx.showToast({
          title: '内容不能为空',
          icon: 'error',
          image:'../../image/shibai.png',
          duration: 2000
        })
        return
      }

      var myDate = new Date();//获取系统当前时间
      // 获取当前年月日 具体时间
      var h=myDate.getHours()<10?'0'+myDate.getHours():myDate.getHours()
      var m=myDate.getMinutes()<10?'0'+myDate.getMinutes():myDate.getMinutes()
      var s=myDate.getSeconds()<10?'0'+myDate.getSeconds():myDate.getSeconds()
      var times=myDate.getFullYear()+'-'+myDate.getMonth()+'-' +myDate.getDate()+'  '+h+':'+m+":"+s
      // 图片信息
      var pics=''
      if(this.data.picture){
        // toString()也可转换成字符串
        var pics=this.data.picture.join()
      }
       // 视频信息
       var vide=''
       if(this.data.video){
         vide=this.data.video
         console.log(vide);
       }
      // 位置
      var posi='';
      if(this.data.pos){
        posi=this.data.pos
      }
      var postData={
        text:this.data.text,
        time:times,
        position:posi,
        picture:pics,
        numbers:0,
        video:vide
      }
      // 进行网络请求
      util.getDataPost(postData,this.doSuccess,this.doFail)
    // 提示框
      wx.showToast({
        title: '发表成功',
        icon: 'success',
        image:'../../image/chenggong.png',
        duration: 2000
      })
      setTimeout(function() {
        // 跳转到tab界面
        wx.switchTab({
          url:'/pages/index/index'
        })
      }, 2000);
      
    },
      // 返回正确的结果
  doSuccess: function(e){
    console.log(e);
  },
  //错误 
  doFail: function(e){
    console.log(e);
  },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      // 存储位置信息到data
      console.log(options);
      this.setData({
        pos:options.title
      })
    },
})