'use strict'
/**
 * 用户信息
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import  TimerMixin from 'react-timer-mixin'
import LoadingSpinnerOverlay from 'react-native-smart-loading-spinner-overlay'
import  dismissKeyboard from 'dismissKeyboard';
import Toast from '@remobile/react-native-toast';
import {config} from '../../../Common/Network/TCRequestConfig'
import TCInitHelperC from '../../../Common/JXHelper/TCInitHelper'
import NetUtils from '../../../Common/Network/TCRequestUitls'
import TCModifySecurityPwd from './TCModifySecurityPwd'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    TextInput,
    Alert
} from 'react-native';
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
import BackBaseComponent from '../../Base/TCBaseBackComponent'
let TCInitHelper = new TCInitHelperC()
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Helper from '../../../Common/JXHelper/TCNavigatorHelper'
export  default  class TCUserMessage extends BackBaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            realName: '',
            user: {}
        }
    }

    static defaultProps = {};

    componentDidMount() {
        super.componentDidMount()
    }

    componentWillUnmount() {
        super.componentWillUnmount()
    }

    render() {

        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={'领奖身份信息'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.back()
                    }}
                />

                <View>
                    <Text style={styles.topTipStyle}>
                        亲，中了大奖要凭身份信息进行领取哦，来花一分钟填写一下吧！
                    </Text>
                </View>
                <View style={{flexDirection: 'column'}}>
                    <View >
                        <View style={styles.inputItem}>
                            <Text style={styles.userTitleStyle}>真实姓名</Text>
                            <TextInput
                                style={styles.inputStyle}
                                placeholder='领取大奖凭证，不可更改'
                                placeholderTextColor='#cccccc'
                                underlineColorAndroid='transparent'
                                maxLength={15}
                                onChangeText={(text)=>this.changeRealName(text)}
                            />
                        </View>
                        <View style={{alignItems: 'center'}}>

                            <Text style={{color: '#f4492d',marginTop:10}}>此姓名可能会影响到您提现，请谨慎填写!</Text>
                        </View>
                    </View>

                </View>
                <View style={{alignItems: 'center'}}>

                    <TouchableOpacity
                        style={styles.bottomBarButtonStyle}
                        onPress={()=> {
                            this.updateRealName()
                        }}
                    >
                        <Text style={{color: 'white', fontWeight: 'bold'}}>
                            {this.props.isFirst ? '下一步' : '提交'}
                        </Text>
                    </TouchableOpacity>

                    <LoadingSpinnerOverlay
                        ref={ component => this._modalLoadingSpinnerOverLay = component }/>
                </View>
            </View>

        );

    };

    changeRealName(text) {
        this.state.realName = text;
    }


    back() {
        this.onBackAndroid()
    }

    onBackAndroid() {
        dismissKeyboard()
        if (this.props.isFirst) {
            Helper.popToTop()
        } else {
            Helper.popToBack()
        }
    }

    updateRealName() {
        dismissKeyboard()
        let realName = this.state.realName
        // let reg = /^[\u4e00-\u9fa5]{2,15}$/
        let reg =/^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/
        if (!realName.match(reg)) {
            Toast.showShortCenter("格式错误，请输入中文名!")
            return
        }
        if (realName) {
            this._modalLoadingSpinnerOverLay.show();
            NetUtils.PutUrlAndParamsAndCallback(config.api.updateRealName + "?realName=" + encodeURI(realName), null, (response) => {
                    this._modalLoadingSpinnerOverLay.hide();
                    if (response.rs) {
                        // TCInitHelper.getUserData()
                        this.timer = setTimeout(()=> {
                            Alert.alert(
                                '温馨提示',
                                '修改已提交，请等待管理员审核!',
                                [
                                    {text: '确定', onPress: () => this.updateSuccess()},
                                ]
                            )
                        }, 500)
                    } else {
                        if (response.status === 500) {
                            Toast.showShortCenter('服务器出错啦!')
                        } else {
                            if (response.message) {
                                Toast.showShortCenter(response.message)
                            } else {
                                Toast.showShortCenter('修改失败，请稍后再试！')
                            }
                        }
                    }
                }
            )
        } else {
            Toast.showShortCenter("真实姓名不能为空!")
        }
    }

    updateSuccess() {
        RCTDeviceEventEmitter.emit('realNameChange', this.state.realName)
        let {navigator} = this.props;
        if (navigator) {
            if (this.props.isFirst) {
                navigator.push({
                    name: 'userMessage',
                    component: TCModifySecurityPwd,
                    passProps: {
                        isFirst: true,
                        ...this.props,
                    }
                })
            } else {

                navigator.pop()
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
    },
    inputItem: {
        flexDirection: 'row',
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: Color.bg.mainBg,
        paddingLeft: 10,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    bottomBarButtonStyle: {
        backgroundColor: Color.bg.red,
        justifyContent: 'center',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
        width: Window.width * 0.8,
        marginTop: 20
    },
    inputStyle: {
        flex: 1,
        marginLeft: 5
    },
    tipTextStyle: {
        marginTop: 30,
        marginLeft: Window.width * 0.1,
        color: '#cccccc'
    },
    topTipStyle: {
        color: '#d47d00',
        fontSize: 20,
        margin: 20,
    },
    userTitleStyle: {
        color: '#333333',
        fontSize: 16,
        marginLeft: 5
    }
});