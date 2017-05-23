'use strict'
/**
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    TextInput,
    BackAndroid,
    Platform,
    Linking,
    NativeModules,
    Switch,
} from 'react-native'
import TopNavigationBar from '../../Common/View/TCNavigationBar'
var {width, height} = Dimensions.get('window');
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Pay from '../UserCenter/UserPay/TCUserAliAndWechatPay'
import LoadingSpinnerOverlay from 'react-native-smart-loading-spinner-overlay'
import {Size, Color, Window, Direction} from '../../Common/Style/AppStyle'
import TCWebView from '../UserCenter/UserPay/TCUserHTMLPay'
import NetUtils from '../../Common/Network/TCRequestUitls'
import Helper from '../../Common/JXHelper/TCNavigatorHelper'
import BackBaseComponent from '../Base/TCBaseBackComponent'
import {config, appId, appVersion} from '../../Common/Network/TCRequestConfig';
import NetUitls from '../../Common/Network/TCRequestUitls'
import Toast from '@remobile/react-native-toast'
import JXHelpers from '../../Common/JXHelper/JXHelper'
import NavigatorHelper from '../../Common/JXHelper/TCNavigatorHelper'
import  Feedback from './TCUserFeedback'
export  default  class TCUserSetting extends BackBaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            appVersion: '1.0.0',
            switchStatus: TC_BUTTON_SOUND_STATUS,
        }
    }

    static defaultProps = {};

    componentDidMount() {
        super.componentDidMount()
        this.getAppVersion()
    }

    componentWillUnmount() {
        super.componentWillUnmount()
    }

    render() {
        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={'设置'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.goBack()
                    }}
                />

                {/*<TouchableOpacity onPress={()=>{this.gotoPwdManager()}}>*/}
                {/*<View style={[styles.setItem,{marginTop:20}]}>*/}
                {/*<Image source={require('image!tools_password')} style={styles.img}/>*/}
                {/*<Text style={styles.itemTxt}>密码管理</Text>*/}
                {/*<Image source={require('image!icon_next')} style={styles.imgNext}/>*/}
                {/*</View>*/}
                {/*</TouchableOpacity>*/}
                {/*<View style={styles.setItem}>*/}
                {/*<Image source={require('image!tool_bank')} style={styles.img}/>*/}
                {/*<Text style={styles.itemTxt}>绑定银行卡</Text>*/}
                {/*<Image source={require('image!icon_next')} style={styles.imgNext}/>*/}
                {/*</View>*/}
                {this.getUpdate()}
                <TouchableOpacity onPress={()=>this.gotoHtml('LEGALNOTICES', '法律声明')}>
                    <View style={styles.setItem}>
                        <Image source={require('image!tool_agreement')} style={styles.img}/>
                        <Text style={styles.itemTxt}>法律声明</Text>
                        <Image source={require('image!icon_next')} style={styles.imgNext}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.gotoAbout()}>
                    <View style={styles.setItem}>
                        <Image source={require('image!tool_about')} style={styles.img}/>
                        <Text style={styles.itemTxt}>关于我们</Text>
                        <Image source={require('image!icon_next')} style={styles.imgNext}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.gotoFeedback()}>
                    <View style={styles.setItem}>
                        <Image source={require('image!tool_push')} style={styles.img}/>
                        <Text style={styles.itemTxt}>意见反馈</Text>
                        <Image source={require('image!icon_next')} style={styles.imgNext}/>
                    </View>
                </TouchableOpacity>
                {/*<View style={styles.setItem}>*/}
                {/*<Image source={require('image!tool_music')} style={styles.img}/>*/}
                {/*<Text style={[styles.itemTxt]}> 按钮声音开关</Text>*/}
                {/*<Switch*/}
                {/*value={this.state.switchStatus}*/}
                {/*style={{marginLeft: 10}}*/}
                {/*onValueChange={(value)=> {*/}
                {/*this.changeSwitchValue(value)*/}
                {/*}}*/}
                {/*/>*/}
                {/*</View>*/}

                <View style={{alignItems: 'center'}}>

                    <TouchableOpacity
                        style={styles.bottomBarButtonStyle}
                        onPress={()=> {
                            this.exitLogin()
                        }}
                    >
                        <Text>
                            退出登录
                        </Text>
                    </TouchableOpacity>
                </View>
                <LoadingSpinnerOverlay
                    ref={ component => this._modalLoadingSpinnerOverLay = component }/>
            </View>

        );

    };


    getAppVersion() {
        if (Platform.OS != 'ios') {
            try {
                NativeModules.JXHelper.getVersionCode((version)=> {
                    this.setState({
                        appVersion: version
                    })
                })
            } catch (e) {
                this.setState({
                    appVersion: appVersion
                })
            }
        }
    }

    getUpdate() {
        if (Platform.OS === 'ios') {
            return
        } else {
            return (<TouchableOpacity onPress={()=> {
                this.update()
            }}>
                <View style={styles.setItem}>
                    <Image source={require('image!tool_update')} style={styles.img}/>
                    <Text style={styles.itemTxt}>检测更新</Text>
                    <Text style={{marginLeft: 10, color: Color.text.grey1}}>当前版本:{this.state.appVersion}</Text>
                    <Image source={require('image!icon_next')} style={styles.imgNext}/>
                </View>
            </TouchableOpacity>)
        }
    }

    update() {
        this._modalLoadingSpinnerOverLay.show()
        NetUitls.getUrlAndParamsAndCallback(config.api.updateVersion + appId, null, (response => {
            if (response.rs) {
                if (response.content && response.content.version !== this.state.appVersion) {
                    this.openDownUrl(response.content.downPath)
                } else {
                    Toast.showShortCenter('已经是最新版本了!')
                }
            }
            this._modalLoadingSpinnerOverLay.hide()
        }))
    }

    openDownUrl(url) {

        try {
            NativeModules.JXHelper.updateApp(this.state.appUrl)
            this.setModalVisible()
        } catch (e) {
            Linking.canOpenURL(this.state.appUrl).then(supported => {
                if (supported) {
                    Linking.openURL(this.state.appUrl);
                } else {
                    JXLog('无法打开该URL:' + url);
                }
                this.setModalVisible()
            })
        }
    }

    gotoAbout() {
        let res = JXHelpers.getGeneralContents('ABOUTUS')
        if (res) {
            NavigatorHelper.pushToWebView(res, '关于我们')
        } else {
            NavigatorHelper.pushToWebView('http://www.mlsy555.com/web/phone/about_us/index.html', '关于我们')
        }
    }

    gotoFeedback() {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'messageList',
                component: Feedback,
                passProps: {
                    ...this.props,
                }
            })
        }
    }

    changeSwitchValue(switchStatus) {
        this.setState({switchStatus: switchStatus})
        TC_BUTTON_SOUND_STATUS = switchStatus;
        this.saveButtonSoundStatus(switchStatus);
    }

    goBack() {
        RCTDeviceEventEmitter.emit('balanceChange')
        this.props.navigator.pop()
    }

    gotoHtml(type, titleName) {
        let res = JXHelpers.getGeneralContents(type)
        if (res) {
            NavigatorHelper.pushToWebView(res, titleName)
        }
    }

    gotoCode() {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'protocol',
                component: Pay,
                passProps: {
                    type: 1,
                    codeType: 'CODE_URL',
                    codeValue: 'http://192.168.1.88:8080/html/11.html',
                    ...this.props,
                }
            })
        }
    }

    saveButtonSoundStatus(status) {
        storage.save({
            key: 'ButtonSoundStatus',
            rawData: status
        });
    }

//退出登录
    exitLogin() {
        this.logout()

    }

    saveUser() {
        let user = {}
        user.username = TCUSER_DATA.username
        user.islogin = false
        TCUSER_BALANCE = 0
        TCUSER_DATA = user
        TCUSER_COLLECT = []
        storage.save({
            key: 'user',
            rawData: user
        })
    }

    logout() {

        NetUtils.getUrlAndParamsAndCallback(config.api.logout, null, (response) => {
            this.saveUser()
            let {navigator} = this.props
            if (navigator) {
                navigator.popToTop();
                RCTDeviceEventEmitter.emit('setSelectedTabNavigator', 'home')
                RCTDeviceEventEmitter.emit('userStateChange', 'logout')
            }
        })

    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
    },
    img: {
        width: 30,
        height: 30,
        marginLeft: 20
    },
    imgNext: {
        width: 10,
        height: 15,
        position: 'absolute',
        top: 23,
        left: width * 0.9
    },
    setItem: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 1,
    },
    itemTxt: {
        marginLeft: 10,
        fontSize: 16,

    },
    bottomBarButtonStyle: {
        backgroundColor: 'white',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
        width: width * 0.8,
        marginTop: 40
    },
});