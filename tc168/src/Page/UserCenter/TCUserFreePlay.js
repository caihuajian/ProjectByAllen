'use strict'
/**
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import Toast from '@remobile/react-native-toast'
import TopNavigationBar from '../../Common/View/TCNavigationBar';
import  UserRegister from './TCUserRegister'
import LoadingSpinnerOverlay from 'react-native-smart-loading-spinner-overlay'
import  dismissKeyboard from 'dismissKeyboard'
import ForgetPwd from './UserInfo/TCForgotPassword'
import {userRegisterAndLogin} from  '../resouce/appColorsConfig'
import {Size, Color, Window, Direction} from '../../Common/Style/AppStyle'

import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    NativeModules
} from 'react-native';
import {config} from '../../Common/Network/TCRequestConfig'
import NetUtils from '../../Common/Network/TCRequestUitls'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Base64 from '../../Common/JXHelper/Base64'
import BackBaseComponent from '../Base/TCBaseBackComponent'
import SecretUtils from '../../Common/JXHelper/SecretUtils'
let base64 = new Base64()
let secretUtils = new SecretUtils()
export  default  class TCUserFreePlay extends BackBaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            password: ''
        }
    }

    static defaultProps = {};

    componentDidMount() {
        super.componentDidMount()
        this.getGuestUserName()
    }


    componentWillUnmount() {
        super.componentWillUnmount()
    }

    render() {

        return (
            <View style={[styles.container]}>
                < TopNavigationBar
                    title={'免费试玩'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.gotoBack()
                    }}
                />

                <ScrollView
                    keyboardShouldPersistTaps={true}
                    keyboardDismissMode={'on-drag'}
                >
                    <View style={{alignItems: 'center', marginTop: 20}}>
                        < View style={styles.formstyle}>

                            <View style={styles.loginInputStyle}>
                                <Text>试玩账号</Text>
                                <Text style={styles.guestNameStyle}>{this.state.userName}</Text>
                            </View>

                            <View style={styles.loginInputStyle}>
                                <Text>登录密码</Text>
                                <TextInput
                                    ref="login_pwd"
                                    placeholder='密码(6-15位字母或数字)'
                                    style={styles.loginInput}
                                    secureTextEntry={true}
                                    maxLength={15}
                                    defaultValue={this.state.password}
                                    placeholderTextColor='#cccccc'
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text)=>this.onChangePassword(text)}
                                />

                            </View>
                            <TouchableOpacity
                                style={styles.bottomBarButtonStyle}
                                onPress={()=>this.loginVal()}
                            >
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: Size.large}}>
                                    立即登录
                                </Text>
                            </TouchableOpacity>
                        </ View >

                        {/*     <View style={styles.registerWrap}>
                         <TouchableOpacity style={{alignItems: 'flex-start', flex: 1}} onPress={()=>this.register()}>
                         <Text style={{color: userRegisterAndLogin.bluetxtColor}}>立即注册 ></Text>
                         </TouchableOpacity>
                         <TouchableOpacity style={{alignItems: 'flex-end', flex: 1}} onPress={()=>this.forgetPwd()}>
                         <Text style={{color: userRegisterAndLogin.bluetxtColor}}>忘记密码 ?</Text>
                         </TouchableOpacity>
                         </View>*/}

                        <View style={styles.tipTxt}>
                            <Text style={styles.tipTxtColor}>1、每个试玩账号初始金额为2000RMB，不允许充值；</Text>
                            <Text style={styles.tipTxtColor}>2、每个IP每天仅允许有3个试玩账号；</Text>
                            <Text style={styles.tipTxtColor}>3、每个试玩账号从注册开始，有效时间为72小时，超过时间系统自动回收；</Text>
                            <Text style={styles.tipTxtColor}>4、试玩账号仅供玩家熟悉游戏，不允许充值和提款；</Text>
                            <Text style={styles.tipTxtColor}>5、试玩账号不享有参加优惠活动的权利；</Text>
                            <Text style={styles.tipTxtColor}>6、试玩账号的赔率仅供参考，可能与正式账号赔率不相符；</Text>
                        </View>
                    </View>
                </ScrollView>
                <LoadingSpinnerOverlay
                    ref={ component => this._partModalLoadingSpinnerOverLay = component }
                    modal={true}
                    marginTop={64}/>
            </View>

        );

    };


    gotoBack() {
        let {navigator} = this.props
        if (navigator) {
            dismissKeyboard()
            navigator.pop()
        }
    }


    gotoUserCenter() {
        let {navigator} = this.props;
        if (navigator) {
            dismissKeyboard()
            navigator.popToTop();
            RCTDeviceEventEmitter.emit('setSelectedTabNavigator', 'mine');
        }
    }


    getGuestUserName() {
        this._partModalLoadingSpinnerOverLay.show()
        NetUtils.PostUrlAndParamsAndCallback(config.api.getGuestId, null, (res)=> {
            this._partModalLoadingSpinnerOverLay.hide()
            if (res.rs) {
                if (res.content && res.content.username) {
                    this.setState({
                        userName: res.content.username.toLocaleLowerCase()
                    })
                } else {
                    Toast.showLongCenter('服务器出错，请稍后再试!')
                    this.gotoBack()
                }
            } else {
                Toast.showLongCenter('服务器出错，请稍后再试!')
                this.gotoBack()
            }

        })
    }


    loginVal() {

        let {userName, password} = this.state;
        if (!password.length) {
            Toast.showShortCenter("请输入密码");
            return;
        }

        let rep = /^[0-9A-Za-z]{6,15}$/
        if (password.length < 6 || password.length > 15 || !password.match(rep)) {
            Toast.showShortCenter("密码格式错误(6-15位数字或字母)");
            return;
        }

        dismissKeyboard();
        this._partModalLoadingSpinnerOverLay.show()
        this.login(userName.toLocaleLowerCase(), password);
    }


    login(userName, password) {

        secretUtils.encode(userName, password, (hash) => {
            let data = {'username': userName, 'password': password, 'hash': hash};
            NetUtils.PostUrlAndParamsAndCallback(config.api.registerGuest, data, (res) => {
                this._partModalLoadingSpinnerOverLay.hide()
                if (res.rs) {
                    let user = res.content
                    if (user !== null) {
                        user.password = base64.encode(this.state.password)
                        user.islogin = true
                        this.saveUser(user)
                        RCTDeviceEventEmitter.emit('userBankChange')
                        RCTDeviceEventEmitter.emit('userStateChange')
                        RCTDeviceEventEmitter.emit('userStateChange', 'login')
                    } else {
                        Toast.showShortCenter('服务器错误，登录失败!')
                    }
                } else {
                    if (res.message) {
                        Toast.showShortCenter(res.message)
                    } else {
                        Toast.showShortCenter('服务器错误，登录失败!')
                    }
                }
            }, null, true);
        })

    }

    saveUser(user) {
        storage.save({
            key: 'user',
            rawData: user
        })
        storage.save({
            key: 'balance',
            rawData: user.balance
        })
        TCUSER_BALANCE = user.balance
        TCUSER_DATA = user
        RCTDeviceEventEmitter.emit('balanceChange')
        if (this.props.gotoCenter) {
            this.gotoUserCenter()
        } else {
            this.gotoBack()
        }
    }

    onChangeUserName(text) {
        this.state.userName = text;
    }

    onChangePassword(text) {
        this.state.password = text;
    }

}


const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Color.bg.mainBg,
        },
        bottomBarButtonStyle: {
            backgroundColor: userRegisterAndLogin.btnBgColor,
            justifyContent: 'center',
            flexDirection: Direction.row,
            height: 40,
            alignItems: 'center',
            borderRadius: 4,
            padding: 10,
            width: Window.width * 0.8,
            marginTop: 20
        },
        loginInputStyle: {
            flexDirection: 'row',
            height: 50,
            borderRadius: 4,
            borderBottomWidth: 1,
            borderBottomColor: userRegisterAndLogin.inputStyle,
            margin: 5,
            paddingLeft: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white'
        },
        loginInput: {
            height: 50,
            flex: 1,
            paddingLeft: 5,
            fontSize: 17,
            width: Window.width * 0.6,
            color: userRegisterAndLogin.inputTxtStyle
        },
        guestNameStyle: {
            flex: 1,
            paddingLeft: 5,
            fontSize: 17,
            width: Window.width * 0.6,
            color: userRegisterAndLogin.inputTxtStyle,
            alignItems: 'center',
        },
        registerWrap: {
            flexDirection: 'row',
            marginTop: 20,
            width: Window.width * 0.9,
            paddingLeft: 20,
            paddingRight: 20,
        }, tipTxt: {
            margin: 10,
            padding: 10,
        }, tipTxtColor: {
            color: userRegisterAndLogin.btnBgColor
        }
    });
