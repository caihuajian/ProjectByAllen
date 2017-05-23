/**
 * Created by Sam on 2017/1/3.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    AppState,
    Platform
} from 'react-native';


import TopNavigationBar from '../../Common/View/TCNavigationBar'

// import ScrollableTabView, {ScrollableTabBar,} from 'react-native-scrollable-tab-view';

import  ScrollableTabView from '../../Common/View/ScrollableTab/index'
import  ScrollableTabBar from '../../Common/View/ScrollableTab/FixedFristTabBar'

import ShopingListStyle from './View/TCShopingListStyle'
import SudokuStyle from './View/TCShopingSudokuStyle'
import ListStyle from './View/TCShopingListStyle'

import {config} from '../../Common/Network/TCRequestConfig'
import NetUitls from '../../Common/Network/TCRequestUitls'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import {shoppingLobby} from '../resouce/appColorsConfig'

let isLoadFinish = false

export default class MyComponent extends React.Component {
    constructor(state) {
        super(state)
        this.state = {
            listStyle: true,
            cpArray: this.props.cpArray,
            initPage: 0
        }
    }

    static defaultProps = {};

    componentDidMount() {

        this.listener = RCTDeviceEventEmitter.addListener('TCShopingLobbyChangeType', (selectIndex) => {
            if (this.refs['ScrollableTabView']) {
                this.refs['ScrollableTabView'].goToPage(selectIndex)
                this.setState({
                    initPage: selectIndex
                })
            }
        })

        this.loadDataFormNet()
        this.timer = setInterval(() => {
            this.loadDataFormNet()
        }, 30000)

        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount() {
        //  this.listener&&this.listener.remove()()
        /*  this.timer && clearInterval(this.timer)*/
        this.timer2 && clearTimeout(this.timer2)
        AppState.removeEventListener('change', this.handleAppStateChange)
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar title='购彩大厅' needBackButton={true}
                                  backButtonCall={() => {
                                      RCTDeviceEventEmitter.emit('setSelectedTabNavigator', 'home');
                                  }}
                                  rightImage={this.state.listStyle ? 'bar_toplist2' : 'bar_toplist'}
                                  rightButtonCall={()=> this.rightButtonCall()}
                />
                {this.getContentView()}
            </View>
        )
    }

    getContentView() {
        if (!this.state.listStyle) {
            return (
                <ScrollableTabView
                    ref="ScrollableTabView"
                    removeClippedSubviews={false}
                    renderTabBar={() => <ScrollableTabBar/>}
                    tabBarUnderlineStyle={{backgroundColor: shoppingLobby.tabBarHighlightTitle, height: 2}}
                    tabBarBackgroundColor='#FFFFFF'
                    locked={true}
                    initialPage={this.state.initPage}
                    tabBarActiveTextColor={shoppingLobby.tabBarHighlightTitle}
                    tabBarInactiveTextColor={shoppingLobby.tabBarNormalTitle}
                    tabBarTextStyle={{fontSize: 15, fontWeight: 'normal'}}
                >
                    <SudokuStyle cpArray={this.state.cpArray} key={0} tabLabel='全部彩种'
                                 navigator={this.props.navigator}></SudokuStyle>
                    <SudokuStyle cpArray={this.state.cpArray} key={1} tabLabel='时时彩'
                                 navigator={this.props.navigator}></SudokuStyle>
                    <SudokuStyle cpArray={this.state.cpArray} key={2} tabLabel='PC蛋蛋'
                                 navigator={this.props.navigator}></SudokuStyle>
                    <SudokuStyle cpArray={this.state.cpArray} key={3} tabLabel='PK拾'
                                 navigator={this.props.navigator}></SudokuStyle>
                    <SudokuStyle cpArray={this.state.cpArray} key={4} tabLabel='11选5'
                                 navigator={this.props.navigator}></SudokuStyle>
                    <SudokuStyle cpArray={this.state.cpArray} key={5} tabLabel='快3'
                                 navigator={this.props.navigator}></SudokuStyle>
                    <SudokuStyle cpArray={this.state.cpArray} key={6} tabLabel='高频彩'
                                 navigator={this.props.navigator}></SudokuStyle>
                    <SudokuStyle cpArray={this.state.cpArray} key={7} tabLabel='低频彩'
                                 navigator={this.props.navigator}></SudokuStyle>

                </ScrollableTabView>
            )
        } else {
            return (
                <ScrollableTabView
                    ref="ScrollableTabView"
                    removeClippedSubviews={false}
                    renderTabBar={() => <ScrollableTabBar />}
                    tabBarUnderlineStyle={{backgroundColor: shoppingLobby.tabBarHighlightTitle, height: 2}}
                    tabBarBackgroundColor='#FFFFFF'
                    locked={true}
                    initialPage={this.state.initPage}
                    tabBarActiveTextColor={shoppingLobby.tabBarHighlightTitle}
                    tabBarInactiveTextColor={shoppingLobby.tabBarNormalTitle}
                    tabBarTextStyle={{fontSize: 15, fontWeight: 'normal'}}
                >
                    <ListStyle cpArray={this.state.cpArray} key={0} tabLabel='全部彩种'
                               navigator={this.props.navigator}></ListStyle>
                    <ListStyle cpArray={this.state.cpArray} key={1} tabLabel='时时彩'
                               navigator={this.props.navigator}></ListStyle>
                    <ListStyle cpArray={this.state.cpArray} key={2} tabLabel='PC蛋蛋'
                               navigator={this.props.navigator}></ListStyle>
                    <ListStyle cpArray={this.state.cpArray} key={3} tabLabel='PK拾'
                               navigator={this.props.navigator}></ListStyle>
                    <ListStyle cpArray={this.state.cpArray} key={4} tabLabel='11选5'
                               navigator={this.props.navigator}></ListStyle>
                    <ListStyle cpArray={this.state.cpArray} key={5} tabLabel='快3'
                               navigator={this.props.navigator}></ListStyle>
                    <ListStyle cpArray={this.state.cpArray} key={6} tabLabel='高频彩'
                               navigator={this.props.navigator}></ListStyle>
                    <ListStyle cpArray={this.state.cpArray} key={7} tabLabel='低频彩'
                               navigator={this.props.navigator}></ListStyle>

                </ScrollableTabView>
            )
        }
    }

    loadDataFormNet() {
        NetUitls.getUrlAndParamsAndCallback(config.api.getCurrentResults, null, (data)=> {
            if (data && data.rs && data.content.length > 0) {
                isLoadFinish = true
                this.setState({cpArray: data.content})
            } else {
                if (!isLoadFinish) {
                    this.timer2 = setTimeout(() => {
                        this.loadDataFormNet()
                    }, 5000)
                }
            }
        })
    }

    rightButtonCall() {
        this.setState({listStyle: !this.state.listStyle})
    }

    handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'active') {
            this.loadDataFormNet()
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    }
});
