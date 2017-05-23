/**
 * Created by Allen on 2017/1/24.
 * Copyright © 2016年 JX. All rights reserved.
 */
import * as types from '../constants/ActionTypes'
import {Alert}from 'react-native'

//登陆(登陆操作属于耗时操作，所以需要异步执行，这里采用dispatch分发)
export function login(user) {
    return dispatch => {
        //登陆中,派遣给LOGIN_ING
        dispatch({type: types.LOGIN_ING});
        let result = fetch('http://www.google.com')
            .then((res) => {
                //延时2s为了模拟效果
                setTimeout(() => {
                    if (user.phone == '123456' && user.password == '123456') {
                        dispatch({type: types.LOGIN, user: user});
                    } else {
                        //这里分发的是action
                        // Alert.alert('用户名或密码错误');
                        dispatch(error());
                    }
                }, 2000);
            }).catch((err) => {
                alert(err);
                dispatch({type: types.LOGIN_ERROR});
            })
    }
}

export const error = () => {
    return {
        type: types.LOGIN_ERROR
    };
}

//登出(由于登出操作一般都只是清空一些数据，不需要异步执行直接返回就可以了，)
export const logout = () => {
    return {
        type: types.LOGOUT,
    };
}