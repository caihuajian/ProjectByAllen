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
import  FreePlay from './TCUserFreePlay'
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
import JXHelpers from '../../Common/JXHelper/JXHelper'
import NavigatorHelper from '../../Common/JXHelper/TCNavigatorHelper'
import ModalDropdown from '../../Common/View/ModalDropdown'
import TCUserCollectHelper from '../../Common/JXHelper/TCUserCollectHelper'
let UserCollectHelper = new TCUserCollectHelper()
let base64 = new Base64()
let secretUtils = new SecretUtils()
import TCInitHelperC from '../../Common/JXHelper/TCInitHelper'
let TCInitHelper = new TCInitHelperC()

export  default  class TCUserLogin extends BackBaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            userName: TCUSER_DATA.username ? TCUSER_DATA.username : '',
            password: TCUSER_DATA.password ? base64.decode(TCUSER_DATA.password) : '',
        }
    }

    static defaultProps = {};

    componentDidMount() {
        super.componentDidMount()
        if (TCUSER_DATA.oauthToken && !TCUSER_DATA.islogin) {
            TCUSER_DATA.oauthToken = null
        }
    }


    componentWillUnmount() {
        super.componentWillUnmount()
    }

    render() {

        return (
            <View style={[styles.container]}>
                < TopNavigationBar
                    title={'登录'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.gotoBack()
                    }}
                />

                <ScrollView
                    keyboardShouldPersistTaps={true}
                    keyboardDismissMode={'on-drag'}
                >
                    <View style={{alignItems: 'center'}}>
                        < View style={styles.formstyle}>

                            <View style={styles.loginInputStyle}>
                                <Image source={require('image!user')}
                                       style={styles.imgstyle}
                                       resizeMode={'contain'}
                                />
                                <TextInput
                                    ref="login_name"
                                    placeholder='请输入用户名'
                                    style={[styles.loginInput, {marginRight: 30}]}
                                    maxLength={12}
                                    placeholderTextColor='#cccccc'
                                    underlineColorAndroid='transparent'
                                    defaultValue={this.state.userName}
                                    onChangeText={(text)=>this.onChangeUserName(text)}
                                />

                                <ModalDropdown
                                    textStyle={styles.dropDownTxtStyle}
                                    options={TC_LOGINED_USER_NAME}
                                    style={styles.dropStyle}
                                    dropdownStyle={styles.dropdownStyle}
                                    renderRow={(rowData, rowID)=>this.renderDropDownRow(rowData, rowID)}
                                    onSelect={(idx, value)=>this.onSelect(idx, value)}
                                >
                                    <Image source={require('image!icon_next')} style={styles.imgNext}/>
                                </ModalDropdown>
                            </View>

                            <View style={styles.loginInputStyle}>
                                <Image source={{uri: 'password'}}
                                       style={styles.imgstyle}
                                />
                                <TextInput
                                    ref="login_pwd"
                                    placeholder='请输入密码'
                                    style={styles.loginInput}
                                    secureTextEntry={true}
                                    maxLength={15}
                                    defaultValue={this.state.password}
                                    placeholderTextColor='#cccccc'
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text)=>this.onChangePassword(text)}
                                />

                            </View>
                            <View style={styles.registerWrap}>
                                <TouchableOpacity style={{alignItems: 'flex-start', flex: 1}}
                                                  onPress={()=>this.onlineService()}>
                                    <Text style={{color: userRegisterAndLogin.bluetxtColor}}>在线客服 ></Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{alignItems: 'flex-end', flex: 1}}
                                                  onPress={()=>this.forgetPwd()}>
                                    <Text style={{color: userRegisterAndLogin.bluetxtColor}}>忘记密码 ?</Text>
                                </TouchableOpacity>
                            </View>
                        </ View >
                        <TouchableOpacity
                            style={styles.bottomBarButtonStyle}
                            onPress={()=>this.loginVal()}
                        >
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: Size.large}}>
                                登 录
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bottomBarButtonStyle}
                            onPress={()=>this.register()}
                        >
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: Size.large}}>
                                立即注册
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bottomBarButtonStyle1}
                            onPress={()=> {
                                this.props.navigator.push({
                                    name: 'freePlay', component: FreePlay, passProps: {gotoCenter: true}
                                })
                            }}
                        >
                            <Text style={{
                                color: userRegisterAndLogin.btnBgColor,
                                fontWeight: 'bold',
                                fontSize: Size.large
                            }}>
                                免费试玩
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <LoadingSpinnerOverlay
                    ref={ component => this._partModalLoadingSpinnerOverLay = component }
                    modal={true}
                    marginTop={64}/>
            </View>

        );

    };


    register() {
        let {navigator} = this.props;
        if (navigator) {
            dismissKeyboard()
            navigator.push({
                name: 'userRegister',
                component: UserRegister,
                passProps: {
                    ...this.props,
                }
            })
        }
    }

    gotoBack() {
        let {navigator} = this.props
        if (navigator) {
            dismissKeyboard()
            navigator.pop()
        }
    }

    onlineService() {
        let res = JXHelpers.getMenuIconsUrl('CUS_SERVICE')
        if (res) {
            NavigatorHelper.pushToWebView(res, '在线客服')
        }
    }

    forgetPwd() {
        let {navigator} = this.props;
        if (navigator) {
            dismissKeyboard()
            navigator.push({
                name: 'forgetpwd',
                component: ForgetPwd,
                passProps: {
                    ...this.props,
                }
            })
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

    loginVal() {
        let {userName, password} = this.state;
        if (!userName.length) {
            Toast.showShortCenter("请输入用户名");
            return;
        }
        let re = /^[0-9A-Za-z]{4,12}$/
        if (userName.length < 4 || userName.length > 12 || !userName.match(re)) {
            Toast.showShortCenter("用户名格式错误");
            return;
        }
        if (!password.length) {
            Toast.showShortCenter("请输入密码");
            return;
        }
        dismissKeyboard();
        this._partModalLoadingSpinnerOverLay.show()
        this.login(userName, password);
    }


    login(userName, password) {

        secretUtils.encode(userName, password, (hash) => {
            let data = {'username': userName.toLocaleLowerCase(), 'password': password, 'hash': hash};
            NetUtils.PostUrlAndParamsAndCallback(config.api.login, data, (res) => {
                this._partModalLoadingSpinnerOverLay.hide()
                if (res.rs) {
                    let user = res.content
                    if (user !== null) {
                        user.password = base64.encode(this.state.password)
                        user.islogin = true
                        TCPUSH_TO_LOGIN = false
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
        TCUSER_BALANCE = user.balance
        TCUSER_DATA = user
        storage.save({
            key: 'user',
            rawData: user
        })
        storage.save({
            key: 'balance',
            rawData: user.balance
        })

        if (!UserCollectHelper.isExistCollect()) {
            let collect = {username: user.username, userCollects: []}
            UserCollectHelper.addCollectWithUser(collect)
        }
        TCInitHelper.getMsgStatus()
        this.saveUserName(user.username)
        RCTDeviceEventEmitter.emit('balanceChange')
        if (this.props.gotoCenter) {
            this.gotoUserCenter()
        } else {
            this.gotoBack()
        }
    }


    saveUserName(userName) {
        if (TC_LOGINED_USER_NAME && TC_LOGINED_USER_NAME.length > 0) {
            for (var i = 0; i < TC_LOGINED_USER_NAME.length; i++) {
                if (TC_LOGINED_USER_NAME[i] == userName) {
                    return
                }
            }
        }
        TC_LOGINED_USER_NAME.push(userName)
        storage.save({
            key: 'loginUserNames',
            rawData: TC_LOGINED_USER_NAME
        })
    }

    onChangeUserName(text) {
        this.state.userName = text;
    }

    onChangePassword(text) {
        this.state.password = text;
    }

    onSelect(idx, value) {
        this.setState({
            userName: value
        })
    }

    renderDropDownRow(rowData, rowId) {
        return (
            <TouchableOpacity>
                <View style={styles.dropDownItemStyle}>
                    <Text style={{fontSize: 18}}>{rowData}</Text>
                </View>
            </TouchableOpacity>
        )
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
            backgroundColor: 'white',
            width: Window.width * 0.9,
        },
        loginInput: {
            height: 50,
            flex: 1,
            paddingLeft: 5,
            fontSize: 17,
            width: Window.width * 0.55,
            color: userRegisterAndLogin.inputTxtStyle
        },
        imgstyle: {
            width: 25,
            height: 25,
        },
        formstyle: {
            flexDirection: 'column',
            width: Window.width * 0.9,
            alignItems: 'center',
            marginTop: 20,
        },
        registerWrap: {
            flexDirection: 'row',
            marginTop: 20,
            width: Window.width * 0.9,
            paddingLeft: 20,
            paddingRight: 20,
        }, bottomBarButtonStyle1: {
            backgroundColor: 'white',
            justifyContent: 'center',
            flexDirection: Direction.row,
            height: 40,
            alignItems: 'center',
            borderRadius: 4,
            padding: 10,
            width: Window.width * 0.8,
            marginTop: 20,
            borderBottomWidth: 1,
            borderColor: Color.bg.grey1
        }, dropdownStyle: {
            width: Window.width * 0.9,
            height: Window.height * 0.5,
            borderWidth: 1,
            borderRadius: 3,
            marginTop: 15
        }, dropDownItemStyle: {
            alignItems: 'center',
            margin: 20
        }, imgNext: {
            width: 15,
            height: 20,
            marginRight: 10,
            transform: [{rotate: '90deg'}]
        }, dropDownTxtStyle: {
            color: Color.text.black1,
        }

    });
