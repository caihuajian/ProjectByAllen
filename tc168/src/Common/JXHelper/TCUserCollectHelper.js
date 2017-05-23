/**
 * Created by Sam on 19/01/2017.
 * Copyright © 2016年 JX. All rights reserved.
 */

import {
    NativeModules,
    Platform
} from 'react-native'

import _ from 'lodash';

import Toast from '@remobile/react-native-toast'
let instance = null
export default class TCInitHelper {
    // 构造
    constructor() {
        if (!instance) {
            instance = this
        }
        return instance;
    }


    async  getUserCollects() {
        await storage.load({
            key: 'collects',
        }).then(res => {
            if (res) {
                TCUSER_COLLECTS = _.concat(TCUSER_COLLECTS, res)
                this.getCollectWithUser()
            }
        }).catch(err => {

        })
    }

    isCollectFromGameId(gameId) {
        if (TCUSER_COLLECT && TCUSER_COLLECT.length > 0) {
            for (var i = 0; i < TCUSER_COLLECT.length; i++) {
                let collet = TCUSER_COLLECT[i]
                if (collet) {
                    if (collet.gameUniqueId === gameId) {
                        return true
                    }
                }
            }
        }
        return false
    }

    removeCollect(gameId) {
        if (!TCUSER_COLLECT) {
            return
        } else {
            for (var i = 0; i < TCUSER_COLLECT.length; i++) {
                if (TCUSER_COLLECT[i].gameUniqueId === gameId) {
                    TCUSER_COLLECT.splice(i, 1)
                }
            }
            this.updateCollectWithUser()
        }
    }

    getCollectWithUser() {
        for (var i = 0; i < TCUSER_COLLECTS.length; i++) {
            let userCollects = TCUSER_COLLECTS[i]
            if (userCollects.username === TCUSER_DATA.username) {
                TCUSER_COLLECT = userCollects.userCollects
                console.log('============', TCUSER_COLLECT)
                return
            }
        }
    }

    updateCollectWithUser() {
        for (var i = 0; i < TCUSER_COLLECTS.length; i++) {
            let userCollects = TCUSER_COLLECTS[i]
            if (userCollects.username === TCUSER_DATA.username) {
                TCUSER_COLLECTS[i].userCollects = TCUSER_COLLECT
                storage.save({
                    key: 'collects',
                    rawData: TCUSER_COLLECTS
                })
                return
            }
        }
    }

    addCollectWithUser(collect) {
        TCUSER_COLLECTS = _.concat(TCUSER_COLLECTS, collect)
        storage.save({
            key: 'collects',
            rawData: TCUSER_COLLECTS
        })
    }

    isExistCollect() {
        for (var i = 0; i < TCUSER_COLLECTS.length; i++) {
            let userCollects = TCUSER_COLLECTS[i]
            if (userCollects.username === TCUSER_DATA.username) {
                TCUSER_COLLECT = userCollects.userCollects
                return true
            }
        }
        return false
    }

    removeAllCollect() {
        if (!TCUSER_COLLECT) {
            return
        } else {
            TCUSER_COLLECT = []
            this.updateCollectWithUser()
        }
    }

    addCollect(game) {
        if (TCUSER_COLLECT) {
            TCUSER_COLLECT.push(game)
        }
        this.updateCollectWithUser()
    }


}