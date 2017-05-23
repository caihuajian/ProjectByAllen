/**
 * 全局样式
 * Created by Allen on 2016/12/19.
 */
import {PixelRatio, Dimensions} from 'react-native'

// 全局颜色
export const Color = {
    primary: '#f75a47',    // App主色调
    white: '#ffffff',      // 白色
    navBar: '#f9f9f9',     // NavBar的背景颜色
    text: {                // 给文本使用
        grey1: '#999999',
        grey2: '#cccccc',
        grey3: '#9B9B9B',
        grey4: '#B5B5B5',
        red: '#FC4586',
        blue: '#1b81fb',
        blue1:'#39c7ff',
        black1: '#333333',
        tipTxtColor:'#ffc583',
        red1:'#f4492d',
        green:'#12b120'
    },
    bg: {                 // 背景色
        red: '#d91d37',
        mainBg: '#F2F2F2',//主体背景
        grey1: '#999999',
        grey2: '#cccccc',
        grey3: '#9B9B9B',
        grey4: '#B5B5B5',
        grey5: '#f5f5f5',
        topTipBg:'#ffe5bf',
        btnBg:'#3056b2'
    },
    border: {            // 边框颜色
        grey1: '#ddd',
        grey2: '#eee',
        grey4: '#f5f5f5',
        grey3: '#f4f4f4',
        grey5: '#dcdcdc',
        red: '#FC4586',
        green:'#12b120'
    },
};

export const Direction = {
    row: 'row',
    column: 'column'
}

// 全局字体大小
export const Size = {
    xxsmall: 10,
    xsmall: 12,
    small: 14,
    default: 16,
    large: 18,
    xlarge: 20,
    xxlarge: 24,
    pixel: 1 / PixelRatio.get(),  // 最细边框
}

// 全局Window尺寸
export const Window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}