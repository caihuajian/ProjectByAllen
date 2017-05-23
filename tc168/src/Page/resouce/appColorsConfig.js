/**
 * Created by Sam on 18/02/2017.
 * Copyright © 2017年 JX. All rights reserved.
 *
 *
 *
 *  106彩票  色值配置表
 */

import {
    Platform,
    Dimensions
} from 'react-native';

global.TCLineW = (Platform.OS == 'ios' && Dimensions.get('window').width > 375) ? 0.33 : 0.5

//底部导航栏
export const BottemNavigatorBar = {
    backgroundColor: '#f5f5f5',
    flex: 1,
    iconStyle: {
        width: Platform.OS === 'ios' ? 25 : 25,
        height: Platform.OS === 'ios' ? 25 : 25,
        marginTop: Platform.OS === 'ios' ? 18 : 30
    },
    iconStyleSelected: {
        width: Platform.OS === 'ios' ? 25 : 25,
        height: Platform.OS === 'ios' ? 25 : 25,
        marginTop: Platform.OS === 'ios' ? 18 : 30
    },
    selectedTitleStyle: {
        color: '#4292cd',
        fontSize: 14.5
    },
    titleStyle: {
        color: '#7c7c7c',
        fontSize: 14.5
    },
}

//顶部导航
export const NavigatorBarTitle = {
    titleColor: 'white'
}

export const homePageStyle = {
    //公告
    noticeTitleColor: '#ef2d0e',
    noticeInfoColor: '#333333',

    //彩票区
    cpBlockTitle: '',
    cpTitle: '#333333',
    cpDescribe: '#999999',

    //中奖榜
    topWinTitle: '#333333',
    topWinUserName: '#999999',
    topWinMoney: 'red',
    topWinCPName: '#999999'
}

//首页 充值 取款 客服
export const homePageMenuIconsTitleStyle = ['#FF9F4B', '#02BCF2', '#00CB7C', '#FB6387']

//热门彩种色值
export const homePageHotCPStyle = ['#4292cd', '#ef2d0e', '#18a53d', '#e79811', '#ef2d0e', '#18a53d', '#e79811']

//购彩大厅
export const shoppingLobby = {
    tabBarNormalTitle: '#989898',
    tabBarHighlightTitle: '#f3482c',
    cpTitle: '',
    countDownTitle: '',
    lastIssueNumberColor: 'red'
}

//开奖大厅
export const lotteryLobby = {
    highlightColor: '#5891db',
    waitbgColor: '#5891db'
}

//个人中心
export const userCenter = {
    topTitleColor: '#FFFFFF',
    orderTitleColor: '#333333',
}

export const userRegisterAndLogin = {
    btnUnableColor: '#cccccc',
    btnBgColor: '#3056b2',
    inputStyle: '#dcdcdc',
    inputTxtStyle: '#333333',
    bluetxtColor: '#1b81fb'
}