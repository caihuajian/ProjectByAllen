import React, {Component, PropTypes} from 'react'

import {View, StyleSheet, Text, TouchableOpacity, Image, Platform} from 'react-native'
import {Size, Color, Window, Direction} from '../../../../Common/Style/AppStyle'
import  QRCode from 'react-native-qrcode'
export default class TCUserPayView extends Component {



    // 构造函数
    constructor(props) {

        super(props)

        this.state = {}
    }


    render() {

        return (
            <View style={styles.container}>

                <View style={styles.topItemStyle}>
                    <View style={styles.payTitleItemStyle}><Text
                        style={styles.payTitleTxtStyle}>充值金额：<Text
                        style={styles.moneyTxtStyle}>{this.props.money} 元</Text></Text></View>
                    <View style={styles.ewmImgItemStyle}>
                        {this.getQRCode()}
                    </View>
                </View>
                <View style={styles.btmBtnItemStyle}>
                    <TouchableOpacity onPress={()=>this.props.gotoPay()}
                                      style={this.props.transfer ? styles.btmBtnStyle1 : styles.btmBtnStyle}><Text
                        style={styles.btmBtnTxtStyle}>{this.props.leftBtnTitle}</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.hadPay()}
                                      style={this.props.transfer ? styles.btmBtnStyle1 : styles.btmBtnStyle}><Text
                        style={styles.btmBtnTxtStyle}>{this.props.rightBtnTitle}</Text></TouchableOpacity>
                </View>

                <View>
                    {this.props.transfer ? this.getTransferTip() : this.getInfoText()}
                </View>
            </View>
        )
    }

    getInfoText() {
        if (Platform.OS == 'ios1111') {
            return (<Text style={styles.tipTxtStyle}>扫码步骤：{'\n'}
                1.同时按下【开机电源】键+【Home】截屏保存到相册。{'\n'}
                2.点“立即充值”同时打开{this.props.payType}。{'\n'}
                3.请在{this.props.payType}中打开“扫一扫”。{'\n'}
                4.在扫一扫中点击右上角，选择“从相册选取二维码”选取截屏的图片。{'\n'}
                5.输入您欲充值的金额并进行转账。如充值未及时到账，请联系客服。{'\n'}</Text>)
        } else {
            return (<Text style={styles.tipTxtStyle}>扫码步骤：{'\n'}
                1.点“立即充值”将自动为您截屏并保存到相册,同时打开{this.props.payType}。{'\n'}
                (若图片未保存至相册，请手动截屏){'\n'}
                2.请在{this.props.payType}中打开“扫一扫”。{'\n'}
                3.在扫一扫中点击右上角，选择“从相册选取二维码”选取截屏的图片。{'\n'}
                4.输入您欲充值的金额并进行转账。如充值未及时到账，请联系客服。{'\n'}</Text>)
        }
    }

    getQRCode() {

        let codeType = this.props.codeType;
        if (codeType === 'CODE_URL') {
            return ( <QRCode
                value={this.props.codeValue}
                size={Platform.OS == 'ios' ? 180 : Window.width * 0.5}
                bgColor='black'
                fgColor='white'/>)
        } else if (codeType === 'IMG') {
            return (<Image style={styles.imgewmStyle} source={{uri: this.props.codeValue}} resizeMode={'contain'}/>)
        }
    }

    getTransferTip() {
        if (Platform.OS == 'ios1111') {
            return (<Text style={styles.tipTxtStyle}>扫码步骤：{'\n'}
                1.同时按下【开机电源】键+【Home】截屏保存到相册。{'\n'}
                2.点“扫码加好友”同时打开{this.props.type == 'ZHB' ? '支付宝' : '微信'}。{'\n'}
                3.请在{this.props.type == 'ZHB' ? '支付宝' : '微信'}中打开“扫一扫”。{'\n'}
                4.在扫一扫中点击右上角，选择“从相册选取二维码”选取截屏的图片。{'\n'}
                5.输入您欲充值的金额并进行转账。如充值未及时到账，请联系客服。{'\n'}</Text>)
        } else {
            return (<Text style={styles.tipTxtStyle}>扫码步骤：{'\n'}
                1.点“扫码加好友”将自动为您截屏并保存到相册,同时打开{this.props.type == 'ZHB' ? '支付宝' : '微信'}。{'\n'}
                (若图片未保存至相册，请手动截屏){'\n'}
                2.请在{this.props.type == 'ZHB' ? '支付宝' : '微信'}中打开“扫一扫”。{'\n'}
                3.在扫一扫中点击右上角，选择“从相册选取二维码”选取截屏的图片。{'\n'}
                4.输入您欲充值的金额并进行转账。如充值未及时到账，请联系客服。{'\n'}</Text>)
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.btnBg,
        alignItems: 'center',
    },
    topItemStyle: {
        marginTop: 20,
        backgroundColor: 'white',
        height: Window.height * 0.45,
        width: Window.width * 0.8
    }, payTitleItemStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#cccccc',
        height: Window.height * 0.08
    }, payTitleTxtStyle: {
        color: '#666666',
        fontSize: Size.large
    }, ewmImgItemStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Window.height * 0.35,
        marginTop: 10
    },
    imgewmStyle: {
        height: Window.height * 0.3,
        width: Window.width * 0.6
    },
    btmBtnItemStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: Window.width * 0.9,
        marginTop: 20,
        alignItems: 'center',
        height: Window.height * 0.08
    }, btmBtnTxtStyle: {
        backgroundColor: '#fff',
        color: Color.bg.btnBg,
        padding: 8,
        borderRadius: Platform.OS =='ios'?0:5,
        textAlign: 'center',
    }, tipTxtStyle: {
        color: 'white',
        padding: 10,
        fontSize: Size.small
    }, btmBtnStyle: {
        height: Window.height * 0.08,
        width: Window.width * 0.3,
    }, moneyTxtStyle: {
        color: Color.text.red1
    }, btmBtnStyle1: {
        height: Window.height * 0.08,
        width: Window.width * 0.39,
    }
})