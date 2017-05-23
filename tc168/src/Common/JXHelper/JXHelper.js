/**
 * Created by Sam on 2016/12/6.
 */
import _ from 'lodash';
import {gameIconKeyValue,defaultIcon} from '../../Page/resouce/gameIcon/JXGameIconConfig'
global.JXLog = (string, str2) => {
    if (str2) {
        if (__DEV__) console.log(string, str2)
    } else if (__DEV__) console.log(string)
}

Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

let Helper = {};

Helper.getRandomNumber = (MaxDigits) => {
    return _.random(MaxDigits)
}


Helper.getRandomNumberWithFoo = (MaxDigits) => {
    return Helper.foo(_.random(MaxDigits))
}


Helper.calc = (n) => {
    if (n > 0)return (Helper.calc(n - 1) * n);
    return (1)
}

Helper.getCombinatorialNumber = (m, n) => {
    return ( Helper.calc(m) / (Helper.calc(m - n) * Helper.calc(n)))
}

Helper.hasDot = (num) => {
    if (!isNaN(num)) {
        return ((num + '').indexOf('.') != -1) ? true : false;
    }
    return true
}

Helper.foo = (str) => {
    str = '0' + str;
    return str.substring(str.length - 2, str.length);
}

/***  业务相关  ***/
Helper.getGameInfoWithUniqueId = (gameUniqueId) => {
    if (TCHomeContents.content) {
        let gameInfosHot = TCHomeContents.content.gameInfosHot
        let gameInfosRecommend = TCHomeContents.content.gameInfosRecommend
        let array = gameInfosHot
        if (gameInfosHot && gameInfosRecommend) {
            array = _.concat(gameInfosHot, gameInfosRecommend)
        }
        for (let item in array) {
            if (array[item].gameUniqueId == gameUniqueId) {
                return array[item]
            }
        }
    }
    return null
}

/** 获取用户协议 */
Helper.getGeneralContents = (type) => {
    if (TCHomeContents.content) {
        let generalContents = TCHomeContents.content.generalContents
        for (var i = 0; i < generalContents.length; i++) {
            if (generalContents[i].type === type) {
                return generalContents[i].contentUrl
            }
        }
    }
    return null
}

/** 获取图标菜单链接 */
Helper.getMenuIconsUrl = (type) => {
    if (TCHomeContents.content) {
        let menuIcons = TCHomeContents.content.menuIcons;
        for (var i = 0; i < menuIcons.length; i++) {
            if (menuIcons[i].type === type) {
                return menuIcons[i].contentUrl
            }
        }
    }
    return null
}

Helper.getGameIconWithUniqueId = (id) => {

    let icon = gameIconKeyValue[(id)]
    if (icon == null){
        icon = defaultIcon
    }
    return icon
}

Helper.checkHaveTrend = (gameUniqueId) => {
    if (!gameUniqueId) return
    switch (gameUniqueId){
        case 'HF_LFSSC':
        case 'HF_CQSSC':
        case 'HF_TJSSC':
        case 'HF_XJSSC':
        case 'HF_JXSSC':
        case 'HF_LFPK10':
        case 'HF_BJPK10':
        case 'HF_LFD11':
        case 'HF_GDD11':
        case 'HF_AHD11':
        case 'HF_JXD11':
        case 'HF_SDD11':
        case 'HF_SHD11':
        case 'HF_JSK3':
        case 'HF_GXK3':
        case 'HF_AHK3':
        case 'X3D':
        case 'HF_SHSSL':
        case 'PL3':{
            return true
        }
    }
    return false
}


module.exports = Helper