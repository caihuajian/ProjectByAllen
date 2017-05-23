/**
 * Created by Sam on 2017/1/2.
 * Copyright © 2016年 JX. All rights reserved.
 *
 *
 *  首页一行四列 itemCell
 *
 */

import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import {homePageMenuIconsTitleStyle} from '../../resouce/appColorsConfig'

const titleArray = ['存/取款', '投注记录', '优惠活动', '在线客服']
const iconArray = ['index_access', 'index_order', 'index_youhui', 'index_kefu']
const colorArray = homePageMenuIconsTitleStyle
import {Window} from '../../../Common/Style/AppStyle'
import JXHelper from '../../../Common/JXHelper/JXHelper'

export default class MyComponent extends React.Component {
    constructor(state) {
        super(state)
        this.state = {}
    }

    static defaultProps = {
        pushToEvent: null
    };

    componentDidMount() {
    }

    render() {

        return (
            <View style={styles.container}>
                {this.getItemsView()}
            </View>
        );
    }

    getItemsView() {
        let itemsArray = []
        for (let i = 0; i < 4; i++) {
            itemsArray.push(<MyComponent2 key={i} rowData={this.props.rowData[i]} url={this.props.rowData[i].iconUrl} title={this.props.rowData[i].nameInChinese}
                                          color={colorArray[i]} pushToEvent={this.props.pushToEvent}/>)
        }
        return itemsArray
    }
}

export class MyComponent2 extends React.Component {
    constructor(state) {
        super(state)
        this.state = {}
    }

    static defaultProps = {};

    componentDidMount() {

    }

    render() {
        return (
            <View style={{width: Window.width / 4, height: 70, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style={{width: Window.width / 4, height: 70, alignItems: 'center', justifyContent: 'center'}} onPress={()=> {
                    this.props.pushToEvent(this.props.rowData)
                }}>
                    {this.getImage()}
                    <Text style={{fontSize: 14, color: '#333333', marginTop: 2, color: this.props.color}}>{this.props.title}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    getImage(){
      return (<Image source={JXHelper.getGameIconWithUniqueId(this.props.rowData.type)} style={{width: 55, height: 55}}/>)
    }
}


const styles = StyleSheet.create({
    container: {
        height: 90,
        width: Window.width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white',
    }
});
