// pages/find/find.js
var util = require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    // 获取输入框的内容
    getinput(e){
      this.setData({
        input:e.detail.value
      })
    },
    // 搜索标题功能的实现
    getsearch(){
      if(this.data.input==' '||!this.data.input){
        // 请求所有新闻数据
        util.getNewsDataGet(this.doSuccess,this.doFail);
        return
      }
      console.log(this.data.input);
      util.getNewsTitleGet(this.data.input,this.doSuccess1,this.doFail1)
    },
    //正确 
    doSuccess1: function(e){
      this.setData({
          news:e.data.data
      })
      console.log(e);
    },
    //错误 
    doFail1: function(e){
        console.log(e);
    },
    // 跳转到新闻详情页
    getnews(e){
      console.log(e.currentTarget.dataset.id);
        wx.navigateTo({
          url: '/pages/news/news?id='+e.currentTarget.dataset.id,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      // 进行网络请求
      util.getNewsDataGet(this.doSuccess,this.doFail);
    },
    //正确 
    doSuccess: function(e){
      this.setData({
          news:e.data.data
      })
      console.log(this.data.news);
    },
    //错误 
    doFail: function(e){
        console.log(e);
    },

})