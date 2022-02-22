/*
*host服务器地址
*以及参数中的公共参数
*/
var host = 'http://localhost:9090';
var contentTypeStr = "application/json;charset=UTF-8";
 
// 获取首页内容
function getDataGet(doSuccess, doFail) {
  wx.request({
    url: host + '/friends',
    header: {
      "content-type": contentTypeStr
    },
    method: 'GET',
    success: function (res) {
      doSuccess(res);
    },
    fail: function (msg) {
      doFail(msg);
    },
  })
}
// 发表内容
function getDataPost(postData, doSuccess1, doFail1) {
  wx.request({
    url : host+'/friends',
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "POST",
    data:postData,
    success: function (res) {
      doSuccess1(res);
    },
    fail: function (msg) {
      doFail1(msg);
    },
  })
}

// 通过id获取详情
function getIdGet(fid,doSuccess, doFail) {
  wx.request({
    url: host + '/friends/'+fid,
    header: {
      "content-type": contentTypeStr
    },
    method: 'GET',
    success: function (res) {
      doSuccess(res);
    },
    fail: function (msg) {
      doFail(msg);
    },
  })
}

// 获取点赞评论内容
function getDetailsGet(fid,doSuccess, doFail) {
  wx.request({
    url: host + '/user/page?fid='+fid,
    header: {
      "content-type": contentTypeStr
    },
    method: 'GET',
    success: function (res) {
      doSuccess(res);
    },
    fail: function (msg) {
      doFail(msg);
    },
  })
}
// 修改点赞状态
function getYesPut(userdata,doSuccess, doFail) {
  wx.request({
    url: host + '/friends',
    header: {
      "content-type": contentTypeStr
    },
    method: 'PUT',
    data:userdata,
    success: function (res) {
      doSuccess(res);
    },
    fail: function (msg) {
      doFail(msg);
    },
  })
}
// 添加评论
function getUserPost(userData, doSuccess1, doFail1) {
  wx.request({
    url : host+'/user',
    header: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method: "POST",
    data:userData,
    success: function (res) {
      doSuccess1(res);
    },
    fail: function (msg) {
      doFail1(msg);
    },
  })
}

// 获取新闻内容
function getNewsDataGet(doSuccess, doFail) {
  wx.request({
    url: host + '/news',
    header: {
      "content-type": contentTypeStr
    },
    method: 'GET',
    success: function (res) {
      doSuccess(res);
    },
    fail: function (msg) {
      doFail(msg);
    },
  })
}
// 通过id获取新闻详情
function getNewsIdGet(id,doSuccess, doFail) {
  wx.request({
    url: host + '/news/'+id,
    header: {
      "content-type": contentTypeStr
    },
    method: 'GET',
    success: function (res) {
      doSuccess(res);
    },
    fail: function (msg) {
      doFail(msg);
    },
  })
}
// 搜索新闻标题
function getNewsTitleGet(title,doSuccess, doFail) {
  wx.request({
    url: host + '/news/page?title='+title,
    header: {
      "content-type": contentTypeStr
    },
    method: 'GET',
    success: function (res) {
      doSuccess(res);
    },
    fail: function (msg) {
      doFail(msg);
    },
  })
}
/**
 * module.exports用来导出代码
 */
module.exports = {
  getDataGet:getDataGet,
  getDataPost:getDataPost,
  getIdGet:getIdGet,

  getDetailsGet:getDetailsGet,
  getUserPost:getUserPost,
  getYesPut:getYesPut,

  getNewsDataGet:getNewsDataGet,
  getNewsIdGet:getNewsIdGet,
  getNewsTitleGet:getNewsTitleGet
}