/**
 * Created by Sam on 19/01/2017.
 * Copyright © 2016年 JX. All rights reserved.
 */

import {
    NativeModules,
    Platform
} from 'react-native'
import {
    config,
    base,
    appId,
    hotfixUpdataBase,
    hotfixDeploymentKey
} from '../Network/TCRequestConfig';
import NetUitls from '../Network/TCRequestUitls'
import _ from 'lodash';
import Base64 from '../../Common/JXHelper/Base64'
let base64 = new Base64()
import SecretUtils from './SecretUtils'
let secretUtils = new SecretUtils()
import NavigatorHelper from '../JXHelper/TCNavigatorHelper'
import Toast from '@remobile/react-native-toast'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
let instance = null
let isCallBack = false
let checkIpIsCallBack = false
let failCount = 0
export default class TCInitHelper {
    // 构造
    constructor() {
        if (!instance) {
            instance = this

            let array = []
            for (let str in base) {
                array.push(str)
            }
            if (array.length > 0) {
                this.defaultBaseDomain = base[array[_.random(0, array.length - 1)]]
            }
            this.initUUID()
        }
        return instance;
    }

    async initUUID() {
        TCUSER_DEVICE_TOKEN = await this.getUUID()
    }

    getUUID() {
        return new Promise(resolve => {
            NativeModules.JXHelper.getCFUUID(
                (err, uuid) => {
                    resolve(uuid)
                })
        })
    }

    _requestGameSetting() {
        NetUitls.getUrlAndParamsAndCallback(config.api.gameSetting, appId, (data) => {
            if (data && data.rs && data.content) {
                this.timer && clearInterval(this.timer);
                this.saveGameSetting(data)
            } else {
                this.timer = setTimeout(() => {
                    this._requestGameSetting()
                }, 6000);
            }
        }, null, true)
    }

    saveGameSetting(json) {
        storage.save({
            key: 'TCGameSetting',
            rawData: json
        })
        TCGameSetting = json
    }


    checkDomain(callback) {
        // NativeModules.JXHelper.getCFUUID(
        //     (err, uuid) => {

                // TCUSER_DEVICE_TOKEN = uuid
                failCount = 0;
                let allCount = 0
                isCallBack = false
                for (let str in base) {
                    allCount++
                }
                for (let str in base) {
                    let baseUrl = base[str]
                    let url = baseUrl + '/update/checkIpInfo'

                    NetUitls.getUrlAndParamsAndCallback(url, null, (data) => {
                        if (data && data.rs && data.content) {
                            if (!this.baseDomain) {
                                this.baseDomain = baseUrl
                            }
                            if (callback && !isCallBack) {
                                isCallBack = true
                                callback(data.content.allowAppUpdate)
                                // this.checkHotfixServer(callback,data.content.allowAppUpdate)
                            }
                            this.saveDomainCacheData(baseUrl)
                        } else {
                            failCount++
                            if (failCount >= allCount) {
                                failCount = 0
                                callback('ErrorNetwork')
                            }
                        }
                    }, 10000)
                }

            // })
    }

    checkHotfixServer(callback,allowAppUpdate) {
        failCount = 0;
        let allCount = 0
        checkIpIsCallBack = false
        for (let str in hotfixUpdataBase) {
            allCount++
        }

        for (let str in hotfixUpdataBase) {
            let baseUrl = hotfixUpdataBase[str]
            let url = baseUrl + '/updateCheck?deploymentKey=' + hotfixDeploymentKey + '&appVersion=3.3.3'
            NetUitls.getUrlAndParamsAndCallback(url, null, (data) => {
                if (data && data.rs && data.content.updateInfo && !checkIpIsCallBack) {
                    if (Platform.OS == 'ios') {
                        NativeModules.JXCodepush.resetDeploymentKey(hotfixDeploymentKey)
                        NativeModules.JXCodepush.resetServerUrl(baseUrl)
                    } else {
                        NativeModules.CodePush.resetDeploymentKey(hotfixDeploymentKey)
                        NativeModules.CodePush.resetServerUrl(baseUrl)
                    }
                    checkIpIsCallBack = true
                    callback(allowAppUpdate)
                } else {
                    failCount++
                    if (failCount == allCount) {
                        callback(true)
                    }
                }
            }, 5000)
        }
    }

    async getDefaultDomainCacheData(callback) {
        await storage.load({
            key: 'TCDefaultDomain',
        }).then(res => {
            if (res) {
                this.defaultBaseDomain = res
                callback(res)
            }
        }).catch(err => {

        })
    }

    saveDomainCacheData(domain) {
        storage.save({
            key: 'TCDefaultDomain',
            rawData: domain
        })
    }

    async freshToken() {
        await storage.load({
            key: 'user'
        }).then(res => {
            if (res) {
                TCUSER_DATA = res
                NetUitls.getUrlAndParamsAndCallback(config.api.refreshToken + res.oauthToken.refresh_token, null, (result) => {
                    if (result.rs) {
                        TCUSER_DATA.oauthToken = result
                        storage.save({
                            key: 'user',
                            rawData: TCUSER_DATA
                        })
                    }

                }, null, true)
            }
        })
    }


    async getUserData() {
        await storage.load({
            key: 'user',
        }).then(res => {
            if (res) {
                TCUSER_DATA = res
                if (res.username && res.password) {
                    secretUtils.encode(res.username, base64.decode(res.password), (hash) => {
                        NetUitls.PostUrlAndParamsAndCallback(config.api.login, {
                            username: res.username,
                            password: base64.decode(res.password),
                            'hash': hash
                        }, (response) => {
                            if (response.rs) {
                                let user = response.content
                                user.password = res.password
                                user.islogin = true
                                storage.save({
                                    key: 'user',
                                    rawData: user
                                })
                                storage.save({
                                    key: 'balance',
                                    rawData: user.balance
                                })
                                TCUSER_BALANCE = user.balance
                                TCUSER_DATA = user
                            } else {
                                if (response.status) {
                                    Toast.showShortCenter(response.message)
                                    NavigatorHelper.pushToUserLogin()
                                }
                            }
                        }, null, true)
                    })
                }
            }
        }).catch(err => {

        })
    }

    async getLoginUserNames() {
        await storage.load({
            key: 'loginUserNames',
        }).then(res => {
            if (res) {
                TC_LOGINED_USER_NAME = _.concat(TC_LOGINED_USER_NAME, res)
            }
        }).catch(err => {

        })
    }


    isGuestUser() {
        let userName = TCUSER_DATA.username.toLocaleLowerCase()
        if (userName.indexOf('guest') === 0) {
            return true
        } else {
            return false
        }
    }

    async getButtonSoundStatus() {
        await storage.load({
            key: 'ButtonSoundStatus',
        }).then(res => {
            TC_BUTTON_SOUND_STATUS = res;
        }).catch(err => {
        })
    }

    getMsgStatus() {

        NetUitls.getUrlAndParamsAndCallback(config.api.getMessageStatus, null, (res)=> {
            if (res.rs) {
                TC_NEW_MSG_COUNT = res.content.messageCount
                RCTDeviceEventEmitter.emit('newMsgCall')
            }
        })
    }
}
