'use strict'
/**
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import  TimerMixin from 'react-timer-mixin'
import ForgotPwd from './TCForgotPassword'
import ModifyPwd from './TCModifyPassword'
import ModifySecurityPwd from './TCModifySecurityPwd'
import  InitHelper from '../../../Common/JXHelper/TCInitHelper'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Toast from '@remobile/react-native-toast'
let helper = new InitHelper()
export  default  class TCPwdManager extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    static defaultProps = {};

    componentDidMount() {
    }

    render() {

        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={'密码管理'}
                    needBackButton={true}
                    backButtonCall={() => {
                        if (TCUSER_DATA.username) {
                            RCTDeviceEventEmitter.emit('balanceChange')
                        }
                        this.props.navigator.pop()
                    }}
                />

                <TouchableOpacity onPress={()=> {
                    this.gotoModifyPwd()
                }}>
                    <View style={[styles.setItem, {marginTop: 20}]}>
                        <Image source={require('image!tools_password')} style={styles.img}/>
                        <Text style={styles.itemTxt}>登录密码</Text>
                        <Image source={require('image!icon_next')} style={styles.imgNext}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> {
                    this.goModifySecurityPwd()
                }}>
                    <View style={styles.setItem}>
                        <Image source={require('image!tools_password2')} style={styles.img}/>
                        <Text style={styles.itemTxt}>交易密码</Text>
                        <Image source={require('image!icon_next')} style={styles.imgNext}/>
                    </View>
                </TouchableOpacity>
            </View>

        );

    };

    gotoModifyPwd() {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'modifyPwd',
                component: ModifyPwd,
                passProps: {
                    ...this.props,
                }
            })
        }
    }

    /**
     * 修改取款密码
     */
    goModifySecurityPwd() {
        if (helper.isGuestUser()) {
            Toast.showShortCenter('对不起，试玩账号不能修改交易密码!')
            return
        }

        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'modifySecurity',
                component: ModifySecurityPwd,
                passProps: {
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
        left: Window.width * 0.9
    },
});