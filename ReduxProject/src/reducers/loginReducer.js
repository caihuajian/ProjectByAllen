/**
 * Created by Allen on 2017/1/24.
 * Copyright © 2016年 JX. All rights reserved.
 */
import * as types from '../constants/ActionTypes';

const initialState = {
    isLoggedIn: false,//登陆状态
    user: {},
    status: null,//登陆操作状态 ‘done’:已登陆,'doing':正在登陆，null：没有登陆
};
export default function loginReducer(state = initialState,action) {
    switch (action.type) {
        case types.LOGIN:
            console.log('types.LOGIN...');
            return Object.assign({}, state, {
                isLoggedIn: true,
                user: action.user,
                status: 'done',
            })
            break;
        case types.LOGIN_ING:
            console.log('types.LOGIN_ING...');
            return Object.assign({}, state, {
                isLoggedIn: false,
                status: 'doing',

            })
            break;
        case types.LOGIN_ERROR:
            console.log('types.LOGIN_ERROR...');
            return Object.assign({}, state, {
                isLoggedIn: false,
                status: null,
            })
            break;
        case types.LOGOUT:
            console.log('types.LOGOUT...');
            return Object.assign({}, state, {
                isLoggedIn: false,
                status: null,
            })
            break;
        //切莫忘记default返回值
        default:
            return state;
    }
}