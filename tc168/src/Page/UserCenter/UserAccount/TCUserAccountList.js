'use strict'
/**
 * 全部账户记录
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import  TimerMixin from 'react-timer-mixin'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    TextInput,
    ListView
} from 'react-native';
import ScrollableTabView, {DefaultTabBar,} from 'react-native-scrollable-tab-view'
import  UserPayLottery from './TCUserPayLotteryPage'
import UserAccount from './TCUserAccountPage'
import UserAllAccountPage from './TCUserAccountAllPage'
import BaseComponent from '../../Base/TCBaseComponent'
import Helper from '../../../Common/JXHelper/TCNavigatorHelper'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
export  default  class TCUserAccountList extends BaseComponent {

    constructor(props) {
        super(props)
    }

    static defaultProps = {
        initPage: 0,
    }

    componentDidMount() {
        super.componentDidMount();
        this.timer = setTimeout(() => {
            this.dataLoadOver()
        }, 500)
    }

    componentWillUnmount() {
        super.componentWillUnmount()
        this.timer && clearTimeout(this.timer);
    }

    render() {
        let sp = super.render()
        if (sp) return sp;
        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={this.props.accountType ===1?'充值记录':'提款记录'}
                    needBackButton={true}
                    backButtonCall={() =>{this.back()}}
                />
                <ScrollableTabView
                    renderTabBar={() => <DefaultTabBar style={{height: 45}} textStyle={{marginTop: 30}}/>}
                    tabBarUnderlineStyle={{backgroundColor: '#f3482c', height: 2}}
                    tabBarBackgroundColor='#FFFFFF'
                    locked={true}
                    initialPage={0}
                    tabBarActiveTextColor='#f3482c'
                    tabBarInactiveTextColor='#989898'
                    tabBarTextStyle={{fontSize: 15, fontWeight: 'normal', marginTop: 10}}
                >
                    <UserAccount tabLabel='全部' navigator={this.props.navigator} type={1} accountType={this.props.accountType}/>
                    <UserAccount tabLabel='已完成' navigator={this.props.navigator} type={2} accountType={this.props.accountType}/>
                    <UserAccount tabLabel='失败' navigator={this.props.navigator} type={3} accountType={this.props.accountType}/>
                    {/*  <UserPayLottery tabLabel='购彩' navigator={this.props.navigator}/>*/}
                </ScrollableTabView>
            </View>
        );

    };


    dataLoadOver() {
        this.setState({renderPlaceholderOnly: false});
    }

    onBackAndroid() {
        if (this.props.isBackToTop) {
             RCTDeviceEventEmitter.emit('balanceChange')
            Helper.popToTop()
        } else {
            Helper.popToBack()
        }
    }

    back() {
        this.onBackAndroid()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});