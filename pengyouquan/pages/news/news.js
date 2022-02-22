// pages/news/news.js
var util = require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    // 图片预览功能
    getimage(){
        var img=this.data.news.img
        wx.previewImage({
            current: img, // 当前显示图片的http链接
            urls:img.split(",")// 需要预览的图片http链接列表,.split(",")转换成数组
          })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.id);
        // 进行网络请求
        util.getNewsIdGet(options.id,this.doSuccess,this.doFail);
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