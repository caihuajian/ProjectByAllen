/**
 * Created by Allen on 2017/1/24.
 * Copyright © 2016年 JX. All rights reserved.
 */
import * as types from '../constants/ActionTypes'

export const add = () => {
    return {type: types.INCREMENT}
}
export const decrement = () => {
    return {type: types.DECREMENT}
}
