/**
 * Created by Allen on 2017/2/9.
 * Copyright © 2016年 JX. All rights reserved.
 */


import {Platform} from 'react-native'
let instance = null
var Bcrypt = require('react-native-bcrypt')
export default class SecretUtils {
    constructor() {
        if (!instance) {
            instance = this
        }
        return instance;
    }

    getSecretFromUserNamePassword(username, password) {
        return username.substring(0, 3) + password.substring(0, 3) +
            username.substring(username.length - 2, username.length) +
            password.substring(password.length - 2, password.length) +
            username.length + password.length
    }

    encode(username, password, callBack) {
            Bcrypt.setRandomFallback(this.callBack)
        var str = this.getSecretFromUserNamePassword(username, password)
        Bcrypt.genSalt(6, function (err, salt) {
            Bcrypt.hash(str, salt, (err, hash) => {
                callBack(hash.substring(7))
            })
        })
    }

    callBack(len) {
        var buf = new Uint8Array(len)
        for (var i = 0; i < buf.length; i++)
            buf[i] = Math.floor(Math.random() * (256 - 1 + 1) + 1)
        return buf
    }
}

