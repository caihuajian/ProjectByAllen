/**
 * Created by Allen on 2017/1/24.
 * Copyright © 2016年 JX. All rights reserved.
 */

import *as types from '../constants/ActionTypes'

const initialState = {
    count: 0
}

const counterReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.INCREMENT:
            return {
                ...state,
                count: state.count + 1
            }
        case types.DECREMENT:
            return state - 1
        default:
            return state
    }
}

export default counterReducer