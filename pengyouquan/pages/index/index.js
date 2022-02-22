var util = require('../../utils/request.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    tempFilePaths:'../../image/fengmian.jpg'
  },
  // 空方法，防止跳转冒泡
  getPublish(){
  },
  /*换封面*/
  chooseImage:function(){
    var _this=this;
      wx.chooseImage({
        count:1, //图片上传多少张设置，默认上限9
        sizeType:['original','compressed'],  // 可以指定是原图还是压缩图，默认都有
        sourceType:['album','camera'],   // 可以指定来源是相册还是相机，默认都有
        success: function(res) {
          console.log(res);
        _this.setData({
        
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            tempFilePaths:res.tempFilePaths
          })
        },
      })
  },
  // 跳转到details页面
  getdetails(e){
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/details/details?fid='+e.currentTarget.dataset.id,
    })
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
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // // 数组图片存储逻辑，通过join方法将数组转换成字符串，再存入数据库
    // // 字符串拼接图片获取，从数据库中获取字符串，再使用split转换成数组
    // var a1=['a','b','c','d']
    // // 数组转换成字符串
    // var a2=a1.join()
    // console.log(a2);//返回   a,b,c,d
    // // 字符串转换成数组
    // var a3=a2.split(",")
    // console.log(a3);//返回   ["a", "b", "c", "d"]
    // 进行网络请求
    util.getDataGet(this.doSuccess,this.doFail);
  },
  onShow(){
    util.getDataGet(this.doSuccess,this.doFail);
  },
  // 返回正确的结果
  doSuccess: function(e){
    // console.log(e)
    this.setData({
      content:e.data.data
    })
    // console.log(e.data.data);
    // 进行字符串转换成数组
    var pic=e.data.data
    for(let i=0;i<pic.length;i++){
      if(e.data.data[i].picture){
        // 给对象content添加新数组pictures，新数组是字符串picture转换成的数组
        this.data.content[i].picture=e.data.data[i].picture.split(",")
      }else{
        // this.data.content[i].picture=[]
      }
    }
    this.setData({
      content:this.data.content
    })
    // console.log(this.data.content);
  },
  //错误 
  doFail: function(e){
    console.log(e);
  },

  // onPullDownRefresh:function(){
  //   wx.stopPullDownRefresh({
  //     success: (res) => {
  //       console.log(res);
  //     },
  //   })
  // }
})