'use strict'
/**
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
var {width, height} = Dimensions.get('window');
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
import  UserRealName from './TCUserMessage'
import BackBaseComponent from '../../Base/TCBaseBackComponent'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import UserInfo from '../../UserCenter/UserInfo/TCAddUserInfo'
import  InitHelper from '../../../Common/JXHelper/TCInitHelper'

import Toast from '@remobile/react-native-toast'
let helper = new InitHelper()
export  default  class TCUserDetailMsg extends BackBaseComponent {

    constructor(props) {
        super(props)
        this.state = {}
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
                    title={'个人信息'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.back()
                    }}
                />
                <View style={styles.setItem}>
                    <Text style={styles.itemTxt}>头像</Text>
                    <View style={styles.itemRight}>
                        <Image source={{uri: 'user_default_icon'}} style={styles.imgUser}/>
                        <Image source={require('image!icon_next')} style={styles.imgNext}/>
                    </View>
                </View>

                <View style={styles.setItem}>
                    <Text style={styles.itemTxt}>用户名</Text>
                    <View style={styles.itemRight}>
                        <Text style={styles.itemRightTxt}>{TCUSER_DATA.username}</Text>
                        <Image source={require('image!icon_next')} style={styles.imgNext}/>
                    </View>
                </View>

                {/*<View style={styles.setItem}>
                 <Text style={styles.itemTxt}>昵称</Text>
                 <Text style={styles.itemRightTxt}>待补全</Text>
                 <View style={styles.pointStyle}/>
                 <Image source={require('image!icon_next')} style={styles.imgNext}/>
                 </View>
                 */}

                <TouchableOpacity onPress={()=> {
                    this.gotoChangeRealName()
                }}>
                    <View style={styles.setItem}>
                        <Text style={styles.itemTxt}>身份信息</Text>
                        {this.getUserInfo()}
                    </View>
                </TouchableOpacity>
                {this.getPrizeGroup()}
            </View>

        );

    };

    back() {
        RCTDeviceEventEmitter.emit('balanceChange')
        this.props.navigator.pop()
    }

    gotoChangeRealName() {

        // if(TCUSER_DATA.realname){
        //     return
        // }

        if (helper.isGuestUser()) {
            Toast.showShortCenter('试玩账号不能修改身份信息！')
            return
        }

        let {navigator} = this.props;
        if (navigator) {
            var page = UserRealName
            if (!TCUSER_DATA.realname) {
                page = UserInfo
            }
            navigator.push({
                name: 'userRealName',
                component: page,
                passProps: {
                    ...this.props,
                }
            })
        }
    }

    getPrizeGroup() {
        if (TCUSER_DATA.prizeGroup) {
            return ( <View style={styles.setItem}>
                <Text style={styles.itemTxt}>奖金组</Text>
                <View style={styles.itemRight}>
                    <Text style={styles.itemRightTxt}>{TCUSER_DATA.prizeGroup}</Text>
                    <Image source={require('image!icon_next')} style={styles.imgNext}/>
                </View>
            </View>)
        }
    }

    getUserInfo() {

        if (TCUSER_DATA.realname) {
            return (<View style={styles.itemRight}>
                <Text style={styles.itemRightTxt}>{TCUSER_DATA.realname}</Text>
                <Image source={require('image!icon_next')} style={styles.imgNext}/>
            </View>)
        } else {
            return (   <View style={styles.itemRight}>
                <Text style={styles.itemRightTxt}>待认证</Text>
                <View style={styles.pointStyle}/>
                <Image source={require('image!icon_next')} style={styles.imgNext}/>
            </View>)
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
    },
    imgNext: {
        width: 10,
        height: 15,
        marginRight: 20
    },
    setItem: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 1,
        justifyContent: 'space-between'
    },
    itemTxt: {
        marginLeft: 10,
        fontSize: 16,
    }, itemRightTxt: {
        fontSize: Size.large,
        marginRight: 10
    },
    pointStyle: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: 'red'
    },
    imgUser: {
        width: 40,
        height: 40,
        marginRight: 10
    }, itemRight: {
        flexDirection: 'row', alignItems: 'center'
    }
});