//index.js
//获取应用实例
var app = getApp()

var cpArray =[
  {cpId:1,cpName:'北京PK10',img:'../../imgs/bj_pk10.png',openIssue:'第1223期',openTime:'2017-05-03 17:23',onpenNum:[12,21,23,12,11,10]},
  {cpId:1,cpName:'二分PK10',img:'../../imgs/2f_pk10.png',openIssue:'第1222期',openTime:'2017-05-03 17:23',onpenNum:[12,21,23,12,11,10]},
  {cpId:1,cpName:'二分时时彩',img:'../../imgs/2f_ssc.png',openIssue:'第11223期',openTime:'2017-05-03 17:23',onpenNum:[12,21,23,12,11,10]},
  {cpId:1,cpName:'安徽11选5',img:'../../imgs/ah_115.png',openIssue:'第1223期',openTime:'2017-05-03 17:23',onpenNum:[12,21,23,12,11,10]},
  {cpId:1,cpName:'安徽快3',img:'../../imgs/ahk3.png',openIssue:'第1223期',openTime:'2017-05-03 17:23',onpenNum:[12,21,23,12,11,10]},
  {cpId:1,cpName:'北京28',img:'../../imgs/bj28.png',openIssue:'第1223期',openTime:'2017-05-03 17:23',onpenNum:[12,21,23,12,11,10]},
  {cpId:1,cpName:'北京快3',img:'../../imgs/bjk3.png',openIssue:'第1223期',openTime:'2017-05-03 17:23',onpenNum:[12,21,23,12,11,10]},
  {cpId:1,cpName:'重庆快乐10分',img:'../../imgs/cq_kl10f.png',openIssue:'第1223期',openTime:'2017-05-03 17:23',onpenNum:[12,21,23,12,11,10]},
  {cpId:1,cpName:'福彩3D',img:'../../imgs/fc_3d.png',openIssue:'第1223期',openTime:'2017-05-03 17:23',onpenNum:[12,21,23]},
  {cpId:1,cpName:'广东11选5',img:'../../imgs/gd_115.png',openIssue:'第1223期',openTime:'2017-05-03 17:23',onpenNum:[12,21,23,12,11,10]},
  {cpId:1,cpName:'广东快乐10分',img:'../../imgs/gd_kl10f.png',openIssue:'第1223期',openTime:'2017-05-03 17:23',onpenNum:[12,21,23,12,11,10]},
  {cpId:1,cpName:'广西快3',img:'../../imgs/gxk3.png',openIssue:'第1223期',openTime:'2017-05-03 17:23',onpenNum:[12,21,23,12,11,10]},
  {cpId:1,cpName:'香港六合彩',img:'../../imgs/hk_lhc.png',openIssue:'第1223期',openTime:'2017-05-03 17:23',onpenNum:[12,21,23,12,11,10]},
  {cpId:1,cpName:'吉林快3',img:'../../imgs/jlk3.png',openIssue:'第1223期',openTime:'2017-05-03 17:23',onpenNum:[12,21,23,12,11,10]},
  {cpId:1,cpName:'江苏快3',img:'../../imgs/jsk3.png',openIssue:'第1223期',openTime:'2017-05-03 17:23',onpenNum:[12,21,23,12,11,10]},
  {cpId:1,cpName:'江西11选5',img:'../../imgs/jx_115.png',openIssue:'第1223期',openTime:'2017-05-03 17:23',onpenNum:[12,21,23,12,11,10]},
  {cpId:1,cpName:'排列5',img:'../../imgs/pl5.png',openIssue:'第1223期',openTime:'2017-05-03 17:23',onpenNum:[12,21,23,12,11,10]},
  ]


Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    imgsrc:'../images/images.png',
    cpArray:cpArray
  },
  //事件处理函数
  bindViewTap: function() {
    wx.reLaunch({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },clickItem(e){
wx.navigateTo({
  url: '../wxDrawer/index',
  success: function(res){
    // success
  },
  fail: function(res) {
    // fail
  },
  complete: function(res) {
    // complete
  }
})
  }
})
