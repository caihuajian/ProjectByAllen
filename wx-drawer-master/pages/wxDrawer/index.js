//wx-drawer
const MENU_WIDTH_SCALE = 0.70;
const FAST_SPEED_SECOND = 300;
const FAST_SPEED_DISTANCE = 5;
const FAST_SPEED_EFF_Y = 50;


var cp_category =[{id:1,name:'北京赛车'},{id:2,name:'安徽快3'},{id:3,name:'广东11选5'},{id:4,name:'时时彩'},{id:5,name:'北京快乐28'},{id:6,name:'幸运28'}]
var cp_history =[{id:1,cpissue:'20170505-115',cpNum:[11,23,12,13,15,16,17,18,15,19]},
{id:1,cpissue:'20170505-115',cpNum:[11,23,12,13,15,16,17,18,15,19]},
{id:2,cpissue:'20170505-116',cpNum:[11,23,12,13,15,16,17,18,15,19]},
{id:3,cpissue:'20170505-117',cpNum:[11,23,12,13,15,16,17,18,15,19]},
{id:4,cpissue:'20170505-115',cpNum:[11,23,12,13,15,16,17,18,15,19]},
{id:5,cpissue:'20170505-115',cpNum:[11,23,12,13,15,16,17,18,15,19]},
{id:6,cpissue:'20170505-115',cpNum:[11,23,12,13,15,16,17,18,15,19]},
{id:7,cpissue:'20170505-115',cpNum:[11,23,12,13,15,16,17,18,15,19]},
{id:8,cpissue:'20170505-115',cpNum:[11,23,12,13,15,16,17,18,15,19]},
{id:9,cpissue:'20170505-115',cpNum:[11,23,12,13,15,16,17,18,15,19]},
{id:10,cpissue:'20170505-115',cpNum:[11,23,12,13,15,16,17,18,15,19]},
{id:11,cpissue:'20170505-115',cpNum:[11,23,12,13,15,16,17,18,15,19]},
{id:12,cpissue:'20170505-115',cpNum:[11,23,12,13,15,16,17,18,15,19]},
{id:13,cpissue:'20170505-115',cpNum:[11,23,12,13,15,16,17,18,15,19]},
{id:14,cpissue:'20170505-115',cpNum:[11,23,12,13,15,16,17,18,15,19]},
{id:15,cpissue:'20170505-115',cpNum:[11,23,12,13,15,16,17,18,15,19]},
{id:16,cpissue:'20170505-115',cpNum:[11,23,12,13,15,16,17,18,15,19]}
]
var app = getApp()
Page({
  data: {
    ui: {
      windowWidth: 0,
      menuWidth: 0,
      offsetLeft: 0,
      tStart: true
    },
    cp_data:{
      cp_category:cp_category,
      cp_history:cp_history
    }
  },
  onLoad() {
    try {
      let res = wx.getSystemInfoSync()
      this.windowWidth = res.windowWidth;
      this.data.ui.menuWidth = this.windowWidth * MENU_WIDTH_SCALE;
      this.data.ui.offsetLeft = 0;
      this.data.ui.windowWidth = res.windowWidth;
      this.setData({ui: this.data.ui})
    } catch (e) {
    }
  },
  handlerStart(e) {
    let {clientX, clientY} = e.touches[0];
    this.tapStartX = clientX;
    this.tapStartY = clientY;
    this.tapStartTime = e.timeStamp;
    this.startX = clientX;
    this.data.ui.tStart = true;
    this.setData({ui: this.data.ui})
  },
  handlerMove(e) {
    let {clientX} = e.touches[0];
    let {ui} = this.data;
    let offsetX = this.startX - clientX;
    this.startX = clientX;
    ui.offsetLeft -= offsetX;
    if(ui.offsetLeft <= 0) {
      ui.offsetLeft = 0;
    } else if(ui.offsetLeft >= ui.menuWidth) {
      ui.offsetLeft = ui.menuWidth;
    }
    this.setData({ui: ui})
  },
  handlerCancel(e) {
    // console.log(e);
  },
  handlerEnd(e) {
    this.data.ui.tStart = false;
    this.setData({ui: this.data.ui})
    let {ui} = this.data;
    let {clientX, clientY} = e.changedTouches[0];
    let endTime = e.timeStamp;
    //快速滑动
    if(endTime - this.tapStartTime <= FAST_SPEED_SECOND) {
      //向左
      if(this.tapStartX - clientX > FAST_SPEED_DISTANCE) {
        ui.offsetLeft = 0;
      } else if(this.tapStartX - clientX < -FAST_SPEED_DISTANCE && Math.abs(this.tapStartY - clientY) < FAST_SPEED_EFF_Y) {
        ui.offsetLeft = ui.menuWidth;
      } else {
        if(ui.offsetLeft >= ui.menuWidth/2){
          ui.offsetLeft = ui.menuWidth;
        } else {
          ui.offsetLeft = 0;
        }
      }
    } else {
      if(ui.offsetLeft >= ui.menuWidth/2){
        ui.offsetLeft = ui.menuWidth;
      } else {
        ui.offsetLeft = 0;
      }
    }
    this.setData({ui: ui})
  },
  handlerPageTap(e) {
    let {ui} = this.data;
    if(ui.offsetLeft != 0) {
      ui.offsetLeft = 0;
      this.setData({ui: ui})
    }
  },
  handlerAvatarTap(e) {
    changeSlideMenu.call(this)
  },
  clickItem(e){
    changeSlideMenu.call(this)
  }
})

function changeSlideMenu(){
    let {ui} = this.data;
    if(ui.offsetLeft == 0) {
      ui.offsetLeft = ui.menuWidth;
      this.setData({ui: ui})
    }else{
        ui.offsetLeft =0;
        this.setData({ui: ui})
    }
}