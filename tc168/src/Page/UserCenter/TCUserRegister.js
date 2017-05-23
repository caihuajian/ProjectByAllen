'use strict'
/**
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
var {width, height} = Dimensions.get('window');
import TopNavigationBar from '../../Common/View/TCNavigationBar';
import Toast from '@remobile/react-native-toast';
import {config} from '../../Common/Network/TCRequestConfig'
import  TimerMixin from 'react-timer-mixin'
import LoadingSpinnerOverlay from 'react-native-smart-loading-spinner-overlay'
import ForgetPwd from './UserInfo/TCForgotPassword'
import  dismissKeyboard from 'dismissKeyboard';
import UserMessage from './UserInfo/TCUserMessage'
import {Size, Color, Window, Direction} from '../../Common/Style/AppStyle'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import NavigatorHelper from '../../Common/JXHelper/TCNavigatorHelper'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    TextInput,
    Platform,
    ScrollView
} from 'react-native';
import  Dialog from './View/DialogView'
import NetUtils from '../../Common/Network/TCRequestUitls'
import Base64 from '../../Common/JXHelper/Base64'
import BackBaseComponent from '../Base/TCBaseBackComponent'
import Helper from '../../Common/JXHelper/TCNavigatorHelper'
import JXHelpers from '../../Common/JXHelper/JXHelper'
import TCWebView from '../../Page/WebView/TCWebView'
let base64 = new Base64()
import SecretUtils from '../../Common/JXHelper/SecretUtils'
import  FreePlay from './TCUserFreePlay'
let secretUtils = new SecretUtils()
import UserInfo from '../UserCenter/UserInfo/TCAddUserInfo'
import {userRegisterAndLogin} from  '../resouce/appColorsConfig'
export  default  class TCUserRegister extends BackBaseComponent {


    constructor(props) {
        super(props)
        this.state = {
            isHide: true,
            userName: '',
            password: '',
            password1: '',
            needToShowDialog: false,
            affCode: '',
            isDisabled: false,
            isChecked: true,
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

        // if (this.state.needToShowDialog) return this.renderWithDialog();
        return (
            <View style={[styles.container]}>
                < TopNavigationBar
                    title="立即注册"
                    needBackButton={true}
                    backButtonCall={() =>this.back()}
                />

                <ScrollView
                    keyboardShouldPersistTaps={Platform.OS !== 'ios'}
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
                                    placeholder='用户名(手机号,字母或数字[4-12位])'
                                    style={styles.loginInput}
                                    placeholderTextColor='#cccccc'
                                    underlineColorAndroid='transparent'
                                    maxLength={12}
                                    onChangeText={(text)=>this.onChangeUserName(text)}
                                />

                            </View>

                            <View style={styles.loginInputStyle}>
                                <Image source={require('image!password')}
                                       style={styles.imgstyle}
                                       resizeMode={'contain'}
                                />
                                <TextInput
                                    ref="login_pwd"
                                    placeholder='密码(6-15位字母或数字)'
                                    style={styles.loginInput}
                                    secureTextEntry={this.state.isHide}
                                    placeholderTextColor='#cccccc'
                                    underlineColorAndroid='transparent'
                                    maxLength={15}
                                    onChangeText={(text)=>this.onChangePassword(text)}
                                />

                                <TouchableOpacity onPress={()=>this.changeShowPwd()} activeOpacity={1}>
                                    <Image
                                        source={!this.state.isHide ? require('image!icon_eye') : require('image!icon_eye2')}
                                        style={styles.imgpwdeye}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.loginInputStyle}>
                                <Image source={require('image!password')}
                                       style={styles.imgstyle}
                                       resizeMode={'contain'}
                                />
                                <TextInput
                                    ref="login_pwd"
                                    placeholder='再次输入密码'
                                    style={styles.loginInput}
                                    secureTextEntry={this.state.isHide}
                                    placeholderTextColor='#cccccc'
                                    underlineColorAndroid='transparent'
                                    maxLength={15}
                                    onChangeText={(text)=>this.onChangePassword1(text)}
                                />

                                {/*       <TouchableOpacity onPress={()=>this.changeShowPwd()} activeOpacity={1}>
                                 <Image
                                 source={this.state.isHide?require('image!password_eye'):require('image!icon_eye2')}
                                 style={styles.imgpwdeye}
                                 />
                                 </TouchableOpacity>*/}
                            </View>

                            <View style={styles.loginInputStyle}>
                                <Image source={require('../../Page/resouce/affcode.png')}
                                       style={styles.imgstyle}
                                       resizeMode={'contain'}
                                />
                                <TextInput
                                    ref="login_name"
                                    placeholder='推荐人(选填)'
                                    style={styles.loginInput}
                                    placeholderTextColor='#cccccc'
                                    underlineColorAndroid='transparent'
                                    maxLength={6}
                                    onChangeText={(text)=>this.onChangeAffCode(text)}
                                />

                            </View>

                            <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>

                                <View>
                                    <TouchableOpacity onPress={()=> {
                                        this.changeCheck()
                                    }}>
                                        {
                                            this.state.isChecked ? ( <Image
                                                source={require('../../Page/resouce/icon_checked.png')}
                                                style={styles.agreeStyle}
                                                resizeMode={'contain'}
                                            />) : <Image
                                                source={require('../../Page/resouce/icon_uncheck.png')}
                                                style={styles.agreeStyle}
                                                resizeMode={'contain'}
                                            />
                                        }
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.protocolTxtStyle}>我已看过并同意《</Text>
                                <TouchableOpacity
                                    onPress={()=> {
                                        this.gotoProtocol()
                                    }}
                                >
                                    <Text style={styles.protocolStyle}>用户购彩服务协议</Text>
                                </TouchableOpacity><Text style={styles.protocolTxtStyle}>》</Text>

                            </View>

                            <TouchableOpacity
                                onPress={()=>this.registerVal()}
                                style={this.getBtnStyle()}
                                activeOpacity={this.state.isDisabled ? 1 : 0.2}
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
                        </ View >

                        <View style={styles.registerWrap}>
                            <TouchableOpacity style={{alignItems: 'flex-start', flex: 1}}
                                              onPress={()=>Helper.pushToUserLogin(true)}>
                                <Text style={{color: userRegisterAndLogin.bluetxtColor}}>快速登录 ></Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{alignItems: 'flex-end', flex: 1}} onPress={()=>this.forgetPwd()}>
                                <Text style={{color: userRegisterAndLogin.bluetxtColor}}>忘记密码 ?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <Dialog show={this.state.needToShowDialog} promptToUser="恭喜您已注册成功!" skip={()=>this.skip()}
                        gotoWriteMsg={()=>this.gotoWriteMsg()}/>
                <LoadingSpinnerOverlay
                    ref={ component => this._modalLoadingSpinnerOverLay = component }/>
            </ View >

        );

    };


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

    gotoProtocol() {
        let res = JXHelpers.getGeneralContents('PROTOCOL')
        if (res) {
            NavigatorHelper.pushToWebView(res, '用户购彩服务协议')
        }
    }

    gotoHtml(res) {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'protocol',
                component: TCWebView,
                passProps: {
                    url: res,
                    ...this.props,
                }
            })
        }
    }

    registerSuccessTip() {
        this.setState(() => {
            return {
                needToShowDialog: true
            }
        });

    }


    changeCheck() {
        this.setState({
            isChecked: !this.state.isChecked,
            isDisabled: this.state.isChecked,
        })
    }

    getBtnStyle() {
        if (!this.state.isDisabled) {
            return styles.bottomBarButtonStyle;
        } else {
            return styles.bottomBarButtonUnableStyle
        }
    }

    // 跳过
    skip() {
        this.setState({needToShowDialog: false});
        let {navigator} = this.props;
        if (navigator) {
            RCTDeviceEventEmitter.emit('balanceChange')
            RCTDeviceEventEmitter.emit('UserLoginStateChangeCall');
            navigator.popToTop();
        }
    }

    // 填写资料
    gotoWriteMsg() {
        this.setState({needToShowDialog: false});
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'addUserInfo',
                component: UserInfo,
                passProps: {
                    isBackToTop: true,
                    ...this.props,
                }
            })
        }
    }


    back() {
        dismissKeyboard();
        this.props.navigator.pop()
    }

    changeShowPwd() {
        this.setState({
            isHide: !this.state.isHide
        });
    }


    registerVal() {
        if (this.state.isDisabled) {
            return
        }

        let {userName, password, password1} = this.state;
        let re = /^[0-9A-Za-z]{4,12}$/
        if (!userName.length) {
            Toast.showShortCenter("请输入用户名");
            return;
        }
        if (userName.length < 4 || userName.length > 12 || !userName.match(re)) {
            Toast.showShortCenter("用户名错误(4-12位数字或字母)");
            return;
        }

        if (!password.length) {
            Toast.showShortCenter("请输入密码");
            return;
        }
        if (!password1.length) {
            Toast.showShortCenter("请输入确认密码");
            return;
        }

        let rep = /^[0-9A-Za-z]{6,15}$/
        if (password.length < 6 || password.length > 15 || !password.match(rep)) {
            Toast.showShortCenter("密码格式错误(6-15位数字或字母)");
            return;
        }


        if (password != password1) {
            Toast.showShortCenter("两次密码不一致");
            return;
        }
        dismissKeyboard();
        this._modalLoadingSpinnerOverLay.show()
        this.register(userName, password)
    }


    register(userName, password) {
        secretUtils.encode(userName, password, (hash) => {
            let data = {
                'username': userName.toLocaleLowerCase(),
                'password': password,
                'hash': hash,
                affCode: this.state.affCode
            };
            NetUtils.PostUrlAndParamsAndCallback(config.api.register, data, (response) => {
                this._modalLoadingSpinnerOverLay.hide();
                if (response.rs) {
                    let user = response.content
                    user.password = base64.encode(this.state.password)
                    user.islogin = true
                    this.timer = setTimeout(()=> {
                        this.saveUser(user)

                    }, 500)
                } else {
                    if (response.status === 400) {
                        if (response.message) {
                            Toast.showShortCenter(response.message)
                        } else {
                            Toast.showShortCenter('服务器错误，注册失败!');
                        }
                    } else {
                        Toast.showShortCenter('注册失败!');
                    }
                }
            }, null, true)
        })
    }


    saveUser(user) {
        storage.save({
            key: 'user',  // 注意:请不要在key中使用_下划线符号!
            rawData: user
        });
        TCUSER_DATA = user;
        TCUSER_BALANCE = user.balance
        this.saveUserName(user.username)
        RCTDeviceEventEmitter.emit('userStateChange', 'login');
        this.registerSuccessTip();
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

    onChangePassword1(text) {
        this.state.password1 = text;
    }

    onChangeAffCode(text) {
        this.state.affCode = text;
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
    },
    bottomBarButtonStyle: {
        backgroundColor: userRegisterAndLogin.btnBgColor,
        justifyContent: 'center',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
        width: width * 0.8,
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
        width: width * 0.6,
        color: userRegisterAndLogin.inputTxtStyle
    },
    imgstyle: {
        width: 20,
        height: 25,
    },
    agreeStyle: {
        width: 30,
        height: 30
    },
    formstyle: {
        flexDirection: 'column',
        width: width * 0.9,
        alignItems: 'center',
        marginTop: 20,
    },
    registerWrap: {
        flexDirection: 'row',
        marginTop: 20,
        width: width * 0.9,
        paddingLeft: 20,
        paddingRight: 20,
    },
    imgpwdeye: {
        width: 25,
        height: 15,
        marginRight: 5
    },
    bottomBarButtonUnableStyle: {
        backgroundColor: userRegisterAndLogin.btnUnableColor,
        justifyContent: 'center',
        flexDirection: Direction.row,
        height: 40,
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
        width: Window.width * 0.8,
        marginTop: 20
    },
    protocolTxtStyle: {
        fontSize: Size.default,
        color: Color.text.grey1,
        textAlign: 'center'
    }, protocolStyle: {
        fontSize: Size.default,
        color: userRegisterAndLogin.bluetxtColor
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
    },
})

