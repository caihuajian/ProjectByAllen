/**
 * Created by Sam on 10/02/2017.
 * Copyright © 2017年 JX. All rights reserved.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Dimensions,
    TouchableOpacity,
    Animated,
    Easing
} from 'react-native';

/**系统 npm类 */

/**组件内部显示需要引入的类 */
var {width, height} = Dimensions.get('window');

/** 外部关系组件 如 页面跳转用 */
import NavigatorHelper from '../../../Common/JXHelper/TCNavigatorHelper'

import {homePageStyle} from '../../resouce/appColorsConfig'

let listItem = []

export default class MyComponent extends React.Component {
    constructor(state) {
        super(state)
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            y:new Animated.Value(0)
        }
    }

    static defaultProps = {
        rowData: []
    }

    componentDidMount() {
        if (!this.props.rowData||this.props.rowData.length == 0){
            return
        }
        let array = this.props.rowData.slice(0,4)
        let c = this.props.rowData.concat(array)

        listItem = c
        this.animatedWithValue()

        this.setState({
            rowData:this.props.rowData
        })
    }

    componentWillUnmount() {
        if (this._autoPlayer) {
            clearInterval(this._autoPlayer);
            this._autoPlayer = null;
        }
    }

    componentWillReceiveProps() {
        this.setState({
            rowData:this.props.rowData
        })
    }

    animatedWithValue() {
        let value = -listItem.length*25+25*4
        Animated.timing(this.state.y, {
            toValue:value<0?value:-30,
            duration: listItem.length*1500,
            easing: Easing.linear
        }).start(()=>{
            Animated.timing(this.state.y, {toValue:0, duration: 0, easing: Easing.linear}).start(()=>{this.animatedWithValue()});
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{backgroundColor: '#F5F5F5', height: 10}}></View>
                <Text style={{marginLeft: 10, marginTop:8 , marginBottom: 10,color:homePageStyle.topWinTitle}}>最新中奖榜</Text>
                <TouchableOpacity style={{height: 110, marginBottom: 5,overflow:'hidden'}} onPress={()=>NavigatorHelper.pushToTopWinnerDetail()}>
                    <Animated.View style={{height: 105,position: 'absolute',top:this.state.y}} >
                    {this.getInputView()}
                    </Animated.View>
                </TouchableOpacity>
            </View>
        )
    }

    getInputView(){
        if (!this.state.rowData||this.state.rowData.length == 0){
            return
        }

        let array = this.state.rowData.slice(0,4)
        let c = this.state.rowData.concat(array)
        listItem = c

        let Arr = []
        listItem.map(
            (item,index)=>{
                Arr.push(<TopWinnerLabel data={item} key={index}/>)
            }
        )
        return Arr
    }

    renderRow(rowData, sectionID, rowID) {
        return (<TopWinnerLabel data={rowData}/>)
    }
}


class TopWinnerLabel extends React.Component {
    constructor(state) {
        super(state)
        this.state = {}
    }

    static defaultProps = {
        data: {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.labelStyle}>
                <Text style={{width: 70, marginLeft: 10,marginRight:20,color:homePageStyle.topWinUserName}}>{this.props.data.username}</Text>
                <Text style={{width: width / 3+20, color: homePageStyle.topWinMoney,fontSize:(width>=375?15:13)}}>喜中{this.props.data.winningAmount}元</Text>
                <Text style={{width: width / 3+30, color: homePageStyle.topWinCPName,fontSize:(width>=375?15:13)}}>购买{this.props.data.gameNameInChinese}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 150,
        width: width,
    },
    labelStyle: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 25,
    }

});
