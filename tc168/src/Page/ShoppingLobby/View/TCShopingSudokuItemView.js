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
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';

const {width, height} = Dimensions.get('window');

import NavigatorHelper from '../../../Common/JXHelper/TCNavigatorHelper'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Moment from 'moment'
import JXHelper from '../../../Common/JXHelper/JXHelper'
import SoundHelper from '../../../Common/JXHelper/SoundHelper'

export default class MyComponent extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            timeStr:this.props.mTimer - Moment().format('X')
        };
        this.buttonCall = this.buttonCall.bind(this);
    }

    static defaultProps = {
        icon: 'icon_cp_3',
        title: '',
        mTimer: 1000,
        describe: '',
        duration: 1000,
        pushToEvent: null
    };

    componentDidMount() {
        this.startTimer();
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    componentWillReceiveProps() {
        this.startTimer()
    }

    startTimer = () => {
        this.timer && clearInterval(this.timer);
        // 2.添加定时器  this.timer --->可以理解成一个隐式的全局变量
        this.timer = setInterval(() => {
            let sTime = this.props.mTimer - Moment().format('X')
            this.setState({timeStr:sTime})
        }, this.props.duration)
    }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.buttonCall}>
                {this.getImage()}
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 5, marginBottom: 10} }>
                    <Text style={{color: '#333333', fontSize: 16,marginTop:5}} ellipsizeMode='tail' numberOfLines={1}> {this.props.title} </Text>
                    <Text style={{color: '#999999', fontSize: 16, marginTop:3,marginBottom:5,width:80,textAlign:"center"}} ellipsizeMode='tail' numberOfLines={1}> {this.getSurplusTime()} </Text>
                </View>
            </TouchableOpacity>
        );
    }

    getImage(){
        if (this.props.gameInfo&&this.props.gameInfo.status&&this.props.gameInfo.status == 'FORBIDDEN'){
            return <Image source={{uri: this.props.icon}} style={styles.leftImgStyle}/>
        }else {
            if (this.props.rowData){
                return <Image source={JXHelper.getGameIconWithUniqueId(this.props.rowData.gameUniqueId)} style={styles.leftImgStyle}/>
            }
        }
    }

    buttonCall = () => {
        if (this.props.title) {
            if (TC_BUTTON_SOUND_STATUS) {
                SoundHelper.playSoundBundle();
            }

            NavigatorHelper.pushToBetHome(this.props.rowData)
        }
    }

    getSurplusTime = () => {

        let hh = '00'
        let mm = '00'
        let ss = '00'

        if (this.props.title.length <= 0){
            return ' '
        }

        if (!this.state.timeStr){
            return ''
        }

        if (!this.props.mTimer||this.props.mTimer <= 0){
            if (this.props.title&&this.props.title.length>0)
            return hh + ":" + mm + ":" + ss
        }

        if (this.state.timeStr) {
            hh = Math.floor(this.state.timeStr / 3600)
            if (hh < 0){hh = 0}
            hh = hh < 10 ? "0" + hh : hh
        }

        if (this.state.timeStr) {
            mm = Math.floor(this.state.timeStr % 3600 / 60)
            if (mm < 0){mm = 0}
            mm = mm < 10 ? "0" + mm : mm
        }

        if (this.state.timeStr) {
            ss = Math.floor(this.state.timeStr % 60)
            if (ss < 0){ss = 0}
            ss = ss < 10 ? "0" + ss : ss
        }
        return hh + ":" + mm + ":" + ss
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: width / 3,
        width: width / 3,
        backgroundColor: 'white',
        marginBottom:1
    },

    leftImgStyle: {
        width: 60,
        height: 60,
        marginTop: 10
    }

});
