import React, {Component, PropTypes,} from 'react'

import {View, StyleSheet, Text, TouchableOpacity, NativeModules, CameraRoll, Platform, Image} from 'react-native'
import UserPay from './View/TCUserPayView'
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import  PayMessage from './TCUserAliPayAndWechatMessage'
import  Dialog from './Dialog'
import {takeSnapshot} from "react-native-view-shot";
import NavigatorHelper from "../../../Common/JXHelper/TCNavigatorHelper";
/**
 * 支付宝支付
 */
export default class TCUserAliAndWechatPay extends Component {



    // 构造函数
    constructor(props) {

        super(props)

        this.state = {
            show: false,
            value: {
                format: "png",
                quality: 0.9,
                result: "file",
            },
            typeName: this.props.type == 'ZHB' ? '支付宝' : '微信'
        }
    }

    static defaultProps = {};

    componentDidMount() {
    }

    componentWillUnmount() {
        this.timer2 && clearTimeout(this.timer2)
    }

    render() {

        return (
            <View

                style={styles.container}>
                < TopNavigationBar
                    title={this.props.type == 'ZHB' ? '支付宝充值' : '微信充值'}
                    needBackButton={true}
                    rightTitle={'充值明细'}
                    rightButtonCall={()=> {
                        NavigatorHelper.pushToUserPayAndWithDraw(1)
                    }}
                    backButtonCall={() => {
                        this.props.navigator.pop()
                    }}
                />
                <UserPay ref="erweimaaa"
                         payType={this.props.type == 'ZHB' ? '支付宝' : '微信'}
                         gotoPay={()=> {
                             this.gotoPay()
                         }}
                         hadPay={()=>this.next()}
                         codeType={'IMG'}
                         codeValue={this.props.data.bankCardNo}
                         money={this.props.money}
                         leftBtnTitle={'扫码加好友'}
                         rightBtnTitle={'已支付,我要提单'}
                         transfer={true}
                />


                <Dialog
                    ref="Dialog"
                    show={this.state.show}
                    rightBtnClick={()=>this.onOpen()}
                    leftBtnClick={()=>this.setModalVisible()}
                    dialogTitle={'温馨提示'}
                    dialogContent={Platform.OS == 'ios111' ? '请先手动截屏后\n 再打开' : '将为您截屏并打开' + (this.props.type == 'ZHB' ? '支付宝' : '微信') + '，\n 是否立即打开？'}
                    btnTxt={'打开'}
                    leftTxt={'取消'}
                />
            </View>
        )
    }

    onOpen() {
        this.timer2 = setTimeout(() => {
            this.snapshot()
            if (this.props.type === 'ZHB') {
                NativeModules.TCOpenOtherAppHelper.openAlipay();
            } else {
                NativeModules.TCOpenOtherAppHelper.openWeiXin();
            }
        }, 500)
        this.setModalVisible();
    }

    snapshot() {
        if (Platform.OS == 'ios') {
            NativeModules.TCOpenOtherAppHelper.screenShotSave();
        } else {
            takeSnapshot(this.refs['erweimaaa'], this.state.value)
                .then(res => {
                    CameraRoll.saveToCameraRoll(res, 'photo');
                })
        }
    }

    // 显示/隐藏 modal
    setModalVisible() {
        let dialog = this.refs.Dialog
        if (dialog.state.modalVisible) {
            dialog._setModalVisible(false);
        } else {
            dialog._setModalVisible(true);
        }
    }

    gotoPay() {
        this.setModalVisible();
    }

    next() {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'payMessage',
                component: PayMessage,
                passProps: {
                    type: this.props.type,
                    topupAmount: this.props.money,
                    ...this.props,
                }
            })
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,

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
        width: Window.width * 0.8,
        marginTop: 20,
        alignItems: 'center',
        height: Window.height * 0.1
    }, btmBtnTxtStyle: {
        backgroundColor: Color.bg.btnBg,
        color: '#fff',
        padding: 10,
        borderRadius: 5,
        textAlign: 'center'
    }, tipTxtStyle: {
        color: 'white',
        padding: 10,
        fontSize: Size.small
    }, btmBtnStyle: {
        height: Window.height * 0.1,
        width: Window.width * 0.3

    }, moneyTxtStyle: {
        color: Color.text.red1
    }, mainStyle: {
        alignItems: 'center'
    }, tipTxtStyle: {
        color: 'red',
        padding: 10,
        fontSize: Size.small
    }
})