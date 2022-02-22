// pages/position/position.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pois:[]
    },
    getweizhi(){
        var _this=this
        wx.getLocation({
          type: 'gcj02',
          success: function (res) {
            console.log("获取当前经纬度：" + JSON.stringify(res));
            //获取的位置是 "latitude":23.02067,"longitude":113.75179, 工具中是ip定位,即精确到市级
            // 实际位置'22.97610329415133' + "," + '113.84714513232419'
            //发送请求通过经纬度反查地址信息  
            // var getAddressUrl = "https://apis.map.qq.com/ws/geocoder/v1/?location=" + res.latitude + "," + res.longitude + "&key=J4XBZ-AW6KX-K5S4N-7HGX3-THTAT-A5BWA&get_poi=1";
            var getAddressUrl = "https://apis.map.qq.com/ws/geocoder/v1/?location=" + '22.97610329415133' + "," + '113.84714513232419' + "&key=J4XBZ-AW6KX-K5S4N-7HGX3-THTAT-A5BWA&get_poi=1";
            wx.request({
              url: getAddressUrl,
              method: 'GET',
              success: function (res) {
                  console.log(res);
                _this.setData({
                    pois:res.data.result.pois
                })
              },
            })
            
          }
        }) 
      },

      getposition(e){
          var index=e.currentTarget.dataset.index
          // console.log(e.currentTarget.dataset.index);
          // console.log(this.data.pois[index].title);
        //   关闭当前页，再跳转到某个页面
          wx.redirectTo({
            url: '/pages/publish/publish?title='+this.data.pois[index].title,
          })
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getweizhi()
    },
})