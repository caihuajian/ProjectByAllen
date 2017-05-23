/**
 * Created by Sam on 2017/1/5.
 * Copyright © 2016年 JX. All rights reserved.
 */
import Toast from '@remobile/react-native-toast'
import ChongQingSSCBetHome from '../../Page/Bet/AllPlayingMethodView/ChongQingSSC/TCChongQingSSCBetHome';
import MarkSixBetHome from '../../Page/Bet/AllPlayingMethodView/MarkSix/TCMarkSixBetHome'
import TCShangDong115BetHome from '../../Page/Bet/AllPlayingMethodView/ShangDong_11_5/TCShangDong115BetHome'
import TCBJPK10BetHome from '../../Page/Bet/AllPlayingMethodView/BJPK10/TCBJPK10BetHome'
import TCFC3DBetHome from '../../Page/Bet/AllPlayingMethodView/FC_3D/TCFC3DBetHome'
import TCSSLBetHome from '../../Page/Bet/AllPlayingMethodView/SSL/TCSSLBetHome'
import TCKL10FBetHome from '../../Page/Bet/AllPlayingMethodView/KL10F/TCKL10FBetHome'
import TCPCDDBetHome from '../../Page/Bet/AllPlayingMethodView/PCDD/TCPCDDBetHome'
import TCK3BetHome from '../../Page/Bet/AllPlayingMethodView/K3/TCK3BetHome'
import TCHappyPokerBetHome from '../../Page/Bet/AllPlayingMethodView/HappyPoker/TCHappyPokerBetHome'
import UserOderRecord from '../../Page/UserCenter/UserOrder/TCUserOrderSelectPage'
import TCLotteryHistory from '../../Page/LotteryLobby/TCLotteryHistoryList'
import UserAcount from '../../Page/UserCenter/UserAccount/TCUserAccountAllPage'
import UserAcountPay from '../../Page/UserCenter/UserAccount/TCUserAccountList'
import UserPay from  '../../Page/UserCenter/UserPay/TCUserPayNew'
import UserLogin from '../../Page/UserCenter/TCUserLoginNew'
import UserRegister from '../../Page/UserCenter/TCUserRegister'
import WebView from  '../../Page/WebView/TCWebView'
import UserSetting from '../../Page/UserCenter/TCUserSetting'
import UserProtocol from '../../Page/UserCenter/TCUserProtocol'
import TCNoticeDetail from '../../Page/Home/View/TCNoticeDetail'
import TCTopWinnerDetail from '../../Page/Home/View/TCTopWinnerDetail'
import  InitHelper from './TCInitHelper'
import JXHelper from  './JXHelper'
import  UserCollect from '../../Page/UserCenter/UserCollect/TCUserCollect'
import PCDDShopping from '../../Page/ShoppingLobby/TCPCDDShopingLobby'
let initHelper = new InitHelper()
export default class Helper {
}

var navigator = null;

Helper.setNavigator = (args) => {
    navigator = args;
}

Helper.checkUserWhetherLogin = () => {
    if (TCUSER_DATA.username && TCUSER_DATA.islogin) return true
    return false
}

Helper.pushToBetHome = (rowData) => {

    let page = null
    switch (rowData.gameUniqueId) {
        case 'MARK_SIX':
        case '六合彩': {
            page = MarkSixBetHome
        }
            break
        case 'HF_LFSSC':
        case "HF_CQSSC":
        case 'HF_TJSSC':
        case 'HF_XJSSC':
        case 'HF_JXSSC':
        case '重庆时时彩': {
            page = ChongQingSSCBetHome
        }
            break
        case 'HF_LFD11':
        case 'HF_GDD11':
        case 'HF_AHD11':
        case 'HF_JXD11':
        case 'HF_SDD11':
        case 'HF_SHD11':
        case '山东11选5': {
            page = TCShangDong115BetHome
        }
            break
        case 'HF_LFPK10':
        case 'HF_BJPK10':
        case '北京PK10': {
            page = TCBJPK10BetHome
        }
            break
        // case 'X3D':
        // case '福彩3D': {
        //     page = TCFC3DBetHome
        // }
        //     break
        case 'HF_CQKL10F':
        case 'HF_TJKL10F':
        case 'HF_GDKL10F':
        case '重庆快乐十分': {
            page = TCKL10FBetHome
        }
            break

        case 'HF_LF28':
        case 'HF_SG28':
        case 'HF_BJ28': {
            page = TCPCDDBetHome
        }
            break

        case 'X3D':
        case '福彩3D':
        case 'HF_SHSSL':
        case 'PL3': {
            page = TCSSLBetHome
        }
            break
        case 'HF_AHK3':
        case 'HF_GXK3':
        case 'HF_JSK3':
        case 'HF_KUAI3': {
            page = TCK3BetHome
        }
            break
        case 'HF_LFKLPK':
            page = TCHappyPokerBetHome
            break
    }

    let model = JXHelper.getGameInfoWithUniqueId(rowData.gameUniqueId)
    if (!model || !model.status || model.status != 'NORMAL') {
        Toast.showShortCenter('该玩法维护中暂停开放')
        return
    }

    if (navigator && page) {
        navigator.push({
            name: 'detail',
            component: page,
            passProps: {title: rowData.gameNameInChinese, gameUniqueId: rowData.gameUniqueId}
        })
    } else {
        Toast.showShortCenter('该玩法暂未开放')
    }
}

Helper.pushToOrderRecord = (orderType) => {
    let page = UserOderRecord;
    if (navigator) {
        if (!Helper.checkUserWhetherLogin()) {
            Helper.pushToUserLogin()
            return
        }
        navigator.push({
            name: 'orderRecord', component: page, passProps: {initPage: orderType}
        });
    }
}

Helper.pushToLotteryHistoryList = (title, gameUniqueId,betBack) => {
    if (navigator) {
        navigator.push({
            name: 'detail', component: TCLotteryHistory, passProps: {title: title, gameUniqueId: gameUniqueId,betBack:betBack}
        })
    }
}

//用户账户明细
Helper.pushToUserAccount = (accountType) => {

    let page = UserAcount;
    if (navigator) {
        navigator.push({
            name: 'userAccount', component: page, passProps: {initPage: accountType}
        });
    }
}
//用户充值提现
Helper.pushToUserPayAndWithDraw = (accountType) => {

    let page = UserAcountPay;
    if (navigator) {
        navigator.push({
            name: 'userAccount', component: page, passProps: {accountType: accountType}
        });
    }
}

Helper.pushToPay = () => {
    if (initHelper.isGuestUser()) {
        Toast.showShortCenter('对不起，试玩账号不能进行存取款操作!')
        return
    }
    let page = UserPay;
    if (navigator) {
        navigator.push({
            name: 'pushToPay', component: page
        });
    }
}

Helper.pushToTopUp = () => {
    if (navigator) {
        navigator.push({
            name: 'userPay',
            component: UserPay,
            passProps: {
                ...this.props,
            }
        })
    }
}


Helper.pushToUserLogin = (gotoCenter) => {
    let page = UserLogin;
    TCPUSH_TO_LOGIN = true
    if (navigator) {
        navigator.push({name: 'userLogin', component: page, passProps: {gotoCenter: gotoCenter}});
    }
}

Helper.pushToUserCollect = () => {
    let page = UserCollect;
    if (navigator) {
        navigator.push({name: 'userCollect', component: page});
    }
}

Helper.pushToUserRegister = () => {
    let page = UserRegister;
    if (navigator) {
        navigator.push({name: 'userRegister', component: page});
    }
}

Helper.pushToWebView = (url, title) => {
    if (url && url.length > 0) {
        let page = WebView
        if (navigator) {
            navigator.push({'webView': '', component: page, passProps: {url: url, title: title}});
        }
    }
}


Helper.gotoSetting = () => {
    if (navigator) {
        navigator.push({
            name: 'userSetting',
            component: UserSetting,
            passProps: {
                ...this.props,
            }
        })
    }
}


Helper.gotoProtocol = () => {
    if (navigator) {
        navigator.push({
            name: 'userProtocol',
            component: UserProtocol,
            passProps: {
                ...this.props,
            }
        })
    }
}

Helper.gotoPCDD = (cpArray)=> {
    if (navigator) {
        navigator.push({
            name: 'pcdd',
            component: PCDDShopping,
            passProps: {
                ...this.props,
                cpArray: cpArray
            }
        })
    }
}


Helper.pushToNotice = (announcement) => {
    if (navigator) {
        navigator.push({
            name: 'TCNoticeDetail',
            component: TCNoticeDetail,
            passProps: {
                announcement: announcement
            }
        })
    }
}

Helper.pushToTopWinnerDetail = () => {
    if (navigator) {
        navigator.push({
            name: 'TCTopWinnerDetail',
            component: TCTopWinnerDetail
        })
    }
}


Helper.isTopPage = () => {
    if (navigator) {
        return navigator.getCurrentRoutes().length === 1
    }
}

Helper.popToBack = () => {
    if (navigator) {
        navigator.pop()
    }
}

Helper.popToTop = () => {
    if (navigator) {
        navigator.popToTop()
    }
}

Helper.popN = (n) => {
    if (navigator) {
        navigator.popN(n)
    }
}

Helper.popToN = (n) => {
    if (navigator) {
        navigator.popToN(n)
    }
}

module.exports = Helper

