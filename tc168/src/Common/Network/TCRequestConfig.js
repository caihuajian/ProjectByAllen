/**
 * Created by Sam on 2016/12/13.
 * Copyright © 2016年 JX. All rights reserved.
 */

import {
    appDomainBase,
    configAppId,
    appHotFixUpdataServers,
    deploymentKey,
    trendServer,
    MyAppName,
} from '../../Page/resouce/appConfig'

import {
    NativeModules,
    Platform
} from 'react-native'

export const base = appDomainBase

export const appId = configAppId

export const hotfixUpdataBase = appHotFixUpdataServers

export const hotfixDeploymentKey = deploymentKey

export const trendServerAddress = trendServer

export const appVersion = '1.0.1'

export const AppName = MyAppName

export const baseUrl = {
    baseUrl: '/api/v1/',
}

let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': Platform.OS == 'ios' ? 'iphone' : 'android',
    'ClientId': appId,
    'AppVersion': appVersion,
    'Version-hotFix': '20170405'
}

export const config = {
    api: {
        checkIpInfo: 'update/checkIpInfo', //热更新开关

        gameSetting: 'adminsettings/user/gamessettings', //获取游戏设定

        getHome: 'cms/internal/mobile/', //首页接口
        updateVersion: 'cms/internal/lastVersion/', //获取新版本
        getMessageList: 'cms/Message/playerMessages', //获取系统消息
        getMessageStatus: 'cms/Message/playerMessagesStatus', //获取是否有新消息状态

        getHistoryList: 'result/service/mobile/results/today', //历史数据
        getAllHistory: 'result/service/mobile/results/lastOpen', //开奖大厅
        getCurrentResults: 'result/service/mobile/results/current', //购彩大厅
        plannodetail: 'result/service/mobile/results/currentTwo', //请求bet首页获取当期与上期信息


        changePwd: 'account/webapi/account/users/change/password', //修改用户密码或取款密码
        updateRealName: 'account/webapi/account/users/updateRealName', //更新真实姓名
        register: 'account/webapi/account/users/register', //用户注册
        login: 'account/webapi/account/users/login', //用户登录
        userInfo: 'account/webapi/account/users/current', //获取用户信息
        logout: 'account/account/system/logout', //用户登出
        refreshToken: 'account/account/system/refreshToken/', //刷新token
        register_info: 'account/webapi/account/users/register_info', //添加用户信息

        getuserCardsAndWithdrawInfo: 'cashmgt/me/cards/cardsAndWithdrawDetail', //获取银行卡和取款信息
        userCards: 'cashmgt/me/cards', //获取列表和添加银行卡
        banktransfers: 'cashmgt/me/transfer/topups/banktransfers/v2', //用户银行卡手工转账申请
        banktransfersQuery: 'cashmgt/me/transfer/topups/banktransfers/v2', //用户银行卡手工转账确认
        banktransfersQueryv3: 'cashmgt/me/transfer/topups/banktransfers/v3', //用户银行卡手工转账确认
        bankList: 'cashmgt/me/transfer/topups/banktransfers/banklist/v2', //获取用户银行卡转账列表
        userWithDraw: 'cashmgt/me/transfer/withdrawals', //用户申请取款
        paymentList: 'cashmgt/me/transfer/topups/payment/list', //获取用户的充值方式
        orderhistory: 'cashmgt/me/transfer/orderhistory', //获取订单历史记录
        otherPay: 'cashmgt/me/transfer/topups', //用户自动充值


        ordercap: 'ordercap/me', //下订投注接口


        orderRecord: 'orderdata/me/orders/findByState', //订单记录
        orderDetail: 'orderdata/me/orders/findByTimeuuid', //订单详情
        findTopWinners: 'orderdata/me/orders/findTopWinners',

        balanceHistory: 'balance/me/history', //获取余额变动历史
        userBalance: 'balance/me', //获取用户余额

        applyWhite: 'ip/user/wl/apply', //玩家白名单申请


        getGuestId: 'account/webapi/account/users/preRegisterGuest', //获取试玩用户账号
        registerGuest: 'account/webapi/account/users/registerGuest', //注册试玩用户

        userFeedback: 'cms/QA', //用户反馈

        getUserTeam: 'account/webapi/team/users',//获取团队
        agentBrokerageCalculation: 'agentBrokerage/me/commissions/daily',//获取代理佣金统计列表
    },
    map: {
        method: 'POST',
        headers: headers,
        follow: 20,
        timeout: 15000,
        size: 0,
    },
    mapGet: {
        method: 'GET',
        headers: headers,
        follow: 20,
        timeout: 15000,
        size: 0,
    },
    mapPut: {
        method: 'PUT',
        headers: headers,
        follow: 20,
        timeout: 15000,
        size: 0,
    }
}