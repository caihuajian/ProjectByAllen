/**
 * Created by allen-jx on 2017/5/12.
 */
import React, {Component, PropTypes,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    Image
} from 'react-native'
import {Size, Color, Window, Direction} from '../../Common/Style/AppStyle'
let BLACK = '1', RED = '2', FLOWER = '3', FK = '4'
let A = '01', J = '11', Q = '12', K = '13'
/**
 * 提示对话框
 */
export default class HappyPokerHelper {


    getOpenCodeView(lastOpenCode, isHistory, withBorder) {
        let codeArr = isHistory ? lastOpenCode : this.splitCode(lastOpenCode)
        let viewArray = []
        for (var i = 0; i < 3; i++) {
            let numArray = this.splitStr(codeArr[i] + '')
            let icon = isHistory ? this.getHistoryCodeColorView(numArray[0]) : this.getOpenCodeColorView(numArray[0])
            let numStr = this.getNumStr(numArray[1])
            viewArray.push(this.getCodeView(icon, numStr, numArray[0], i, isHistory, withBorder))
            // this.getOpenCodeColorView(numArray[0])
        }
        return viewArray
    }

    splitStr(num) {
        let arr = [];

        arr[0] = num.substr(0, 1)
        arr[1] = num.substr(1, 2)
        return arr;
    }

    splitCode(code) {
        let arr = []
        arr = code.split(',')
        return arr
    }

    getCodeView(icon, num, color, index, isHistory, withBorder) {
        return (
            <Image
                source={icon}
                style={[isHistory && styles.imgHistoryPokerStyle, !isHistory && styles.imgPokerStyle, withBorder && styles.borderStyle]}
                resizeMode={'contain'}
                key={color + num + index + ''}
            >
                <Text
                    style={color == BLACK || color == FLOWER ? (isHistory ? styles.textHistoryCodeBlack : styles.textOpenCodeBlack) : (isHistory ? styles.textHistoryCodeRed : styles.textOpenCodeRed)}>{num}</Text>
            </Image>
        )
    }


    getOpenCodeColorView(color) {
        var icon;
        switch (color) {
            case BLACK://黑桃
                icon = require('../../Page/images/pokerIcons/pk_top_heitao.png')
                break;
            case  RED://红桃
                icon = require('../../Page/images/pokerIcons/pk_top_taoxin.png')
                break;
            case FLOWER://梅花
                icon = require('../../Page/images/pokerIcons/pk_top_meihua.png')
                break;
            case FK://方块
                icon = require('../../Page/images/pokerIcons/pk_top_fangkuai.png')
                break;
        }
        return icon
    }

    getHistoryCodeColorView(color) {
        let icon;
        switch (color) {
            case BLACK://黑桃
                return icon = require('../../Page/images/pokerIcons/pk_buttom_heitao.png')
            case RED://红桃
                return icon = require('../../Page/images/pokerIcons/pk_buttom_taoxin.png')
            case FLOWER://梅花
                return icon = require('../../Page/images/pokerIcons/pk_buttom_meihua.png')
            case FK://方块
                return icon = require('../../Page/images/pokerIcons/pk_buttom_fangkuai.png')
        }
    }

    getNumStr(num) {
        switch (num) {
            case A:
                return 'A'
            case J:
                return 'J'
            case Q:
                return 'Q'
            case K:
                return 'K'
            default:
                if (num.length > 1) {
                    let first = num.substr(0, 1)
                    if (first == '0') {
                        return num.substr(1, 1)
                    }
                }
                return num
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
    }, imgPokerStyle: {
        height: 50,
        width: 40,
        marginHorizontal: 0.1,
        borderWidth: 0.5,
        borderColor: '#ddd'
    },
    textOpenCodeBlack: {
        marginLeft: 8,
        marginTop: 3,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    }, textHistoryCodeBlack: {
        marginTop: 3,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'right',
        marginRight: 8,
        backgroundColor: 'transparent',
    },
    textOpenCodeRed: {
        marginLeft: 8,
        marginTop: 3,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
    },
    textHistoryCodeRed: {
        marginTop: 3,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
        textAlign: 'right',
        marginRight: 8,
        backgroundColor: 'transparent',
    },
    imgHistoryPokerStyle: {
        height: 40,
        width: 50,
        marginHorizontal: 0.1,
    },
    borderStyle: {
        backgroundColor: '#F5F5F5',
        borderWidth: 1,
        borderColor: '#F5F5F5',
        borderRadius: 5,
    },
})