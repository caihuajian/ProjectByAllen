import React, {Component, PropTypes,} from 'react'

import {View, StyleSheet, Text, TouchableOpacity, NativeModules, CameraRoll, Platform} from 'react-native'
import UserPay from './View/TCUserPayView'
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import Toast from '@remobile/react-native-toast';
import Help01 from '../UserPayHelp/TCUserHelp01'
import Help02 from '../UserPayHelp/TCUserHelp02'
import Help03 from '../UserPayHelp/TCUserHelp03'
import Help04 from '../UserPayHelp/TCUserHelp04'
import  PayProgress from './TCUserPayProgress'
import  Dialog from './Dialog'
import {takeSnapshot} from "react-native-view-shot";
let openApp = NativeModules.TCOpenOtherAppHelper;
/**
 * 支付宝支付
 */
export default class TCUserAliAndWechatPay extends Component {



    // 构造函数
    constructor(props) {

        super(props)

        this.state = {
            isShow: false,
            show1: false,
            show2: false,
            show3: false,
            show: false,
            value: {
                format: "png",
                quality: 0.9,
                result: "file",
            },
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
            <View style={styles.container}>
                < TopNavigationBar
                    title={this.props.type == 1 ? '支付宝充值' : '微信充值'}
                    needBackButton={true}
                    rightTitle={'帮助'}
                    rightButtonCall={()=> {
                        this.help()
                    }}
                    backButtonCall={() => {
                        this.props.navigator.pop()
                    }}
                />

                <UserPay ref="erweimaaa"
                         payType={this.props.type == 1 ? '支付宝' : '微信'}
                         gotoPay={()=> {
                             this.gotoPay()
                         }}
                         hadPay={()=>this.hadPay()}
                         codeType={this.props.codeType}
                         codeValue={this.props.codeValue}
                         money={this.props.money}
                         leftBtnTitle={'立即充值'}
                         rightBtnTitle={'我已支付'}
                />

                <Help01 show={this.state.isShow} next={()=>this.next(1)}
                        isWeChat={this.props.type !== 1}/>
                <Help02 show={this.state.show1} next={()=>this.next(2)} isWeChat={this.props.type !== 1}/>
                <Help03 show={this.state.show2} next={()=>this.next(3)} isWeChat={this.props.type !== 1}/>
                <Help04 show={this.state.show3} next={()=>this.next(4)} isWeChat={this.props.type !== 1}/>

                <Dialog
                    ref="Dialog"
                    show={this.state.show}
                    rightBtnClick={()=>this.onOpen()}
                    leftBtnClick={()=>this.setModalVisible()}
                    dialogTitle={'温馨提示'}
                    dialogContent={Platform.OS == 'ios111' ? '请先手动截屏后\n 再打开' : '将为您截屏并打开' + (this.props.type == 1 ? '支付宝' : '微信') + '\n是否立即充值？'}
                    btnTxt={'打开'}
                    leftTxt={'取消'}
                />
            </View>
        )
    }

    onOpen() {
        this.timer2 = setTimeout(() => {
            this.snapshot()
            if (this.props.type === 1) {
                NativeModules.TCOpenOtherAppHelper.openAlipay();
            } else {
                NativeModules.TCOpenOtherAppHelper.openWeiXin();
            }
        }, 1000)
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

    help() {
        this.setState({
            isShow: !this.state.isShow
        })
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

    next(index) {

        switch (index) {

            case 1:
                this.setState({
                    isShow: !this.state.isShow,
                    show1: !this.state.show1
                })
                break;
            case 2:
                this.setState({
                    show1: !this.state.show1,
                    show2: !this.state.show2
                })
                break
            case 3:
                this.setState({
                    show2: !this.state.show2,
                    show3: !this.state.show3
                })
                break;
            case 4:
                this.setState({
                    show3: !this.state.show3
                })
                break;
        }
    }

    gotoPay() {
        this.setModalVisible();
    }

    hadPay() {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'payProgress',
                component: PayProgress,
                passProps: {
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
        backgroundColor: Color.bg.mainBg,
    },
})