// 导入React核心模块
import React, {Component, PropTypes,} from 'react'
// 导入组件使用到的Native依赖模块
import {View, StyleSheet, Text, TouchableOpacity,} from 'react-native'
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import ScrollableTabView, {DefaultTabBar,} from 'react-native-scrollable-tab-view'
import BaseComponent from '../../Base/TCBaseComponent'
import OrderRecordPage from './TCUserOrderPage'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
// 定义并默认导出自己的component 
export default class TCUserOrderRecord extends BaseComponent {



    // 构造函数
    constructor(props) {
        // 继承父类的this对象和传入的外部属性
        super(props)
    }

    static defaultProps = {
        initPage: 0,

    }

    componentDidMount() {
        super.componentDidMount()
        this.timer = setTimeout(() => {
            this.dataLoadOver()
        }, 500)
    }

    componentWillUnmount() {
        super.componentWillUnmount()
        this.timer && clearTimeout(this.timer);
    }

    // 主渲染函数
    render() {
        let sp = super.render()
        if (sp) return sp;
        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={'投注记录'}
                    needBackButton={true}
                    backButtonCall={() =>{this.props.navigator.pop()}}
                />
                <ScrollableTabView
                    renderTabBar={() => <DefaultTabBar />}
                    tabBarUnderlineStyle={{backgroundColor:'#f3482c',height:2}}
                    tabBarBackgroundColor='#FFFFFF'
                    locked={true}
                    initialPage={this.props.initPage}
                    tabBarActiveTextColor='#f3482c'
                    tabBarInactiveTextColor='#989898'
                    tabBarTextStyle={{fontSize: 15, fontWeight: 'normal', marginTop: 10}}
                >

                    <OrderRecordPage tabLabel='全部订单' navigator={this.props.navigator} loadBack={()=>this.dataLoadOver()}/>
                    <OrderRecordPage tabLabel='中奖订单' navigator={this.props.navigator} orderType={'WIN'} loadBack={()=>this.dataLoadOver()}/>
                    <OrderRecordPage tabLabel='等待开奖' navigator={this.props.navigator} orderType={'PENDING'} loadBack={()=>this.dataLoadOver()}/>
                    <OrderRecordPage tabLabel='已开奖订单' navigator={this.props.navigator} orderType={'WIN,LOSS'} loadBack={()=>this.dataLoadOver()}/>

                </ScrollableTabView>
            </View>
        )
    }

    dataLoadOver() {
        this.setState({renderPlaceholderOnly: false});
    }

}

// style写在最下面
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})