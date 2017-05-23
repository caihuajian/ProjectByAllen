/**
 * Created by Sam on 2016/11/10.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator,
    Platform,
    Image,
    BackAndroid,
    PanResponder,
    Dimensions,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Home from '../Home/TCHome';
import LotteryLobby from '../LotteryLobby/TCLotteryLobby';
import TCUserCenterHome from '../UserCenter/TCUserCenter';
import Discover from '../Discover/TCDiscover'
import ShopingLobby from '../ShoppingLobby/TCShopingLobby'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import JXHelper from '../../Common/JXHelper/TCNavigatorHelper'
import BackBaseComponent from '../../Page/Base/TCBaseBackComponent'
import {BottemNavigatorBar} from '../resouce/appColorsConfig'
import Toast from "@remobile/react-native-toast";
import Moment from 'moment';
import SoundHelper from '../../Common/JXHelper/SoundHelper'
import {Size, Color, Window, Direction} from '../../Common/Style/AppStyle'
var CIRCLE_SIZE = 50;

export default class TC168 extends BackBaseComponent {
    constructor(state) {
        super(state);
        this.state = {
            selectedTab: 'home',
            cpArray: [],
            newMsg:0
        };

        this._handlePanResponderGrant = this._handlePanResponderGrant.bind(this)
        this._handlePanResponderMove = this._handlePanResponderMove.bind(this)
        this._handlePanResponderEnd = this._handlePanResponderEnd.bind(this)
        this._handleStartShouldSetPanResponder = this._handleStartShouldSetPanResponder.bind(this)
        this._handleMoveShouldSetPanResponder = this._handleMoveShouldSetPanResponder.bind(this)
    }

    componentDidMount() {
        this.listener = RCTDeviceEventEmitter.addListener('setSelectedTabNavigator', (tabName, page) => {
            this.setSelectedTab(tabName, page)
        })
        this.listener =RCTDeviceEventEmitter.addListener('newMsgCall',()=>{
            this.setState({
                newMsg:TC_NEW_MSG_COUNT
            })
        })
        super.componentDidMount()

        BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);

        this._panResponder = {}

        this._circleStyles = {
            style: {
                left: this._previousLeft,
                top: this._previousTop,
                backgroundColor: 'green',
            }
        }
    }

    componentWillMount() {

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd,
        });
        this._previousLeft = 20;
        this._previousTop = 84;

    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        this.listener && this.listener.remove()
        this.timer && clearTimeout(this.timer);
        super.componentWillUnmount()
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <TabNavigator tabBarStyle={{backgroundColor: BottemNavigatorBar.backgroundColor}}>
                    {/*--首页--*/}
                    {this.renderTabBarItem(<Home
                        navigator={this.props.navigator}
                        cpArray={this.state.cpArray}/>, '首页', 'bottom_bar_icon1', 'bottom_bar_icon11', 'home')}
                    {/*--开奖大厅--*/}
                    {this.renderTabBarItem(<ShopingLobby
                        navigator={this.props.navigator}
                        cpArray={this.state.cpArray}/>, '购彩', 'bottom_bar_icon5', 'bottom_bar_icon55', 'shoping')
                    }
                    {/*--开奖大厅--*/}
                    {this.renderTabBarItem(<LotteryLobby
                        navigator={this.props.navigator}/>, '开奖', 'bottom_bar_icon3', 'bottom_bar_icon33', 'lobby')}
                    {/*--发现--*/}
                    {/*{this.renderTabBarItem(<Discover navigator={this.props.navigator} />,'发现', 'bottom_bar_icon2', 'bottom_bar_icon22','discover')}*/}
                    {/*--用户中心--*/}
                    {this.renderTabBarItem(<TCUserCenterHome
                        navigator={this.props.navigator}/>, '我的', 'bottom_bar_icon4', 'bottom_bar_icon44', 'mine')}
                </TabNavigator>
            </View>
        );
    };

// <View ref={(circle) => {this.circle = circle}}
// style={styles.circle}
// {...this._panResponder.panHandlers}
// />

    renderTabBarItem(model, title, iconName, selectedIconName, selectedTab) {
        return (
            <TabNavigator.Item
                title={title}
                renderIcon={()=>this.getTab(title, false, iconName, null)}
                renderSelectedIcon={() => this.getTab(title, true, null, selectedIconName)} //选中
                onPress={()=> {
                    if (TC_BUTTON_SOUND_STATUS) {
                        SoundHelper.playSoundBundle();
                    }
                    this.setSelectedTab(selectedTab, this.state.initPage)
                }}
                selected={this.state.selectedTab === selectedTab}
                selectedTitleStyle={BottemNavigatorBar.selectedTitleStyle}
                titleStyle={BottemNavigatorBar.titleStyle}
            >
                {model}
            </TabNavigator.Item>
        )
    }

    setSelectedTab(tabName, page) {
        if (tabName == 'mine') {
            if (!JXHelper.checkUserWhetherLogin()) {
                JXHelper.pushToUserLogin(true)
                return
            }
            if (TCUSER_DATA.username) {
                RCTDeviceEventEmitter.emit('balanceChange')
            }
        }

        if (page > 0) {
            this.setState({
                initPage: page
            })
        }
        this.setState({selectedTab: tabName})
    }

    getTab(title, isSelected, iconName, selectedIconName) {


        if (title == "我的") {
            return (
                <View style={styles.tabStyle}>

                    <Image source={{uri: !isSelected ? iconName : selectedIconName}}
                           style={!isSelected ? BottemNavigatorBar.iconStyle : BottemNavigatorBar.iconStyleSelected}/>
                    { TC_NEW_MSG_COUNT != 0 ? <View style={styles.pointStyle}/> : null}
                </View>

            )
        } else {
            return (
                <View>
                    <Image source={{uri: !isSelected ? iconName : selectedIconName}}
                           style={!isSelected ? BottemNavigatorBar.iconStyle : BottemNavigatorBar.iconStyleSelected}/>
                </View>

            )
        }

    }


    onBackAndroid() {
        if (TC168.lastBackPressed && TC168.lastBackPressed >= Moment().subtract(2, 'seconds')) {
            //最近2秒内按过back键，可以退出应用。
            return false;
        }

        TC168.lastBackPressed = Moment();
        Toast.showShortCenter('再按一次退出应用');
        return true;
    }


    _highlight() {
        this._circleStyles.style.backgroundColor = 'blue';
        this._updateNativeStyles();
    }

    _unHighlight() {
        this._circleStyles.style.backgroundColor = 'green';
        this._updateNativeStyles();
    }

    _updateNativeStyles() {
        this.circle && this.circle.setNativeProps(this._circleStyles);
    }

    _handleStartShouldSetPanResponder() {
        return true;
    }

    _handleMoveShouldSetPanResponder(e, gestureState) {
        return true;
    }

    _handlePanResponderGrant(e, gestureState) {
        this._highlight()
    }

    _handlePanResponderMove(e, gestureState) {
        let dx = this._previousLeft + gestureState.dx
        let dy = this._previousTop + gestureState.dy

        dx = dx < 0 ? 0 : dx
        dy = dy < 0 ? 0 : dy

        dx = dx > Dimensions.get('window').width ? Dimensions.get('window').width : dx
        dy = dx > (Dimensions.get('window').height - CIRCLE_SIZE * 2) ? (Dimensions.get('window').height - CIRCLE_SIZE * 2) : dy


        this._circleStyles.style.left = dx;
        this._circleStyles.style.top = dy;


        this._updateNativeStyles();
    }

    _handlePanResponderEnd(e, gestureState) {
        this._unHighlight();

        let dx = gestureState.dx
        let dy = gestureState.dy

        this._previousLeft += dx;
        this._previousTop += dy;
    }
}

const styles = StyleSheet.create({
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        position: 'absolute',
        left: 20,
        top: 84,
        backgroundColor: 'red'
    }, pointStyle: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'red',
        position: 'absolute',
        top: Platform.OS == 'ios' ? Window.width * 0.06 : 30,
        left: 25
    }, tabStyle: {
        flexDirection: 'row'
    }
});
