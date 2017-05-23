/**
 * Created by Sam on 2017/1/14.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, {
    Component,
    PropTypes,
} from 'react'
import {config, base, baseUrl} from './TCRequestConfig';
import queryString from 'query-string';
import _ from 'lodash';
import TCInitHelperC from '../JXHelper/TCInitHelper'
import NavigatorHelper from '../JXHelper/TCNavigatorHelper'

let TCInitHelper = new TCInitHelperC()

export default class NetUitls extends Component {
    /**
     *url :请求地址
     *params:参数(Json对象)
     *callback:回调函数
     */
    static getUrlAndParamsAndCallback(url, params, callback, timeout, dontAddHeadersAuthorization) {
        url = this.getServerUrl(url)
        if (typeof params == 'string') {
            url += '/' + params
        } else if (params) {
            url += '?' + queryString.stringify(params)
        }
        if (timeout > 0) {
            config.mapGet.timeout = timeout
        }
        this.fetchAsync(url, config.mapGet, callback, dontAddHeadersAuthorization)
    }

    static PostUrlAndParamsAndCallback(url, params, callback, timeout, dontAddHeadersAuthorization) {
        url = this.getServerUrl(url)

        JXLog(JSON.stringify(config.map))

        let map = _.assignIn(config.map, {
            body: JSON.stringify(params)
        })
        if (timeout > 0) {
            map.timeout = timeout
        }

        this.fetchAsync(url, map, callback, dontAddHeadersAuthorization)
    }

    static PutUrlAndParamsAndCallback(url, params, callback, timeout) {
        url = this.getServerUrl(url)
        let map = _.assignIn(config.mapPut, {
            body: JSON.stringify(params)
        })
        if (timeout > 0) {
            map.timeout = timeout
        }
        this.fetchAsync(url, map, callback)
    }

    static async fetchAsync(url, map, callback, dontAddHeadersAuthorization) {
        // JXLog('URL:' + url)
        if (!dontAddHeadersAuthorization) {
            map = addHeadersAuthorization(map)
        } else {
            delete map.headers.Authorization
        }

        let response = {}
        try {
            response = await fetch(url, map)
        } catch (e) {
            response = {}
        } finally {
            // JXLog('header', map)
            // JXLog('response:', JSON.stringify(response))
        }

        let responseJson = {}
        let result = {}
        try {
            responseJson = await response.json()
        } catch (e) {
            responseJson = null
        } finally {
            if (response.status >= 200 && response.status < 305) {
                if (response.status === 204) {
                    result = {"rs": true}
                } else {
                    result = {"content": responseJson, "rs": true}
                }
            } else if (response.status >= 400) {
                if (response.status == 401) {
                    // JXLog('======response=======',response)
                    result = {"rs": false, "error": '无效token', "status": response.status,}
                    if (!TCPUSH_TO_LOGIN)
                        NavigatorHelper.pushToUserLogin()
                } else if (response.status === 422) {
                    if (url.match(/refreshToken/)) {
                        NavigatorHelper.pushToUserLogin()
                    } else {
                        result = _.assignIn(responseJson, {"rs": false, "status": response.status,})
                    }
                } else if (responseJson) {
                    JXLog('responseJson:', JSON.stringify(responseJson))
                    result = _.assignIn(responseJson, {"rs": false, "status": response.status,})
                } else {
                    result = {"rs": false, "status": response.status,}
                }
            } else {
                result = {"rs": false, "status": response.status, "massage": response.massage}
            }
        }
        JXLog('\n\n*******   ' + map.method + '请求 url:\n' + url + '\n' + '\nrequestMap = ' + JSON.stringify(map) + '\n\n*******   状态码:' + response.status + '  *******返回结果：  \n' + JSON.stringify(result) + '\n')
        callback(result)
    }

    static getServerUrl(url) {
        if (url && (_.startsWith(url, 'http://') || _.startsWith(url, 'https://'))) {
            return url
        }
        if (TCInitHelper.baseDomain) {
            url = TCInitHelper.baseDomain + baseUrl.baseUrl + url
        } else {
            url = TCInitHelper.defaultBaseDomain + baseUrl.baseUrl + url
        }
        return url
    }
}

function addHeadersAuthorization(map) {
    if (TCUSER_DATA.oauthToken && TCUSER_DATA.islogin) {
        map.headers.Authorization = 'bearer ' + TCUSER_DATA.oauthToken.access_token;
    } else {
        map.headers.Authorization = '';
    }
    if (TCUSER_DEVICE_TOKEN && TCUSER_DEVICE_TOKEN.length > 0)
        map.headers.device_token = TCUSER_DEVICE_TOKEN

    return map
}

