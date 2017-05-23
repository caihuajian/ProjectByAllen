/**
 * Created by Allen on 2017/1/24.
 * Copyright © 2016年 JX. All rights reserved.
 */
'use strict';

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';//引入异步操作
//引入所有的reducers,切记要在index.js封装下.
import  reducers from '../reducers/index';
const createSoreWithMiddleware = applyMiddleware(thunk)(createStore);
//配置store信息
export default function configureStore(initialState) {
    //创建store
    const store = createSoreWithMiddleware(reducers, initialState)
    return store;
}