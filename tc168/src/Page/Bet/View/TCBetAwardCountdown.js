/**
 * Created by Sam on 2016/11/19.
 */
/**
 * Created by Sam on 2016/11/11.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    AppState,
    Image,
} from 'react-native';
import _ from 'lodash'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import HappyPokerHelper from '../../../Common/JXHelper/HappyPokerHelper'

var {width} = Dimensions.get('window');
let timeoutTime = 0
let happyPoker = new HappyPokerHelper()

export default class TCBetAwardCountdown extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            surplus:null
        };
    }

    static defaultProps = {
        cpInfoData:{
            planNo: ' ',
            lastOpenCode:' ',
            surplus:'0'
        },
        duration:1000,
        timeOutCallBack:null,
        isHappyPoker: false,
    };

    componentDidMount() {
        this.startTimer();
        AppState.addEventListener('change', this.handleAppStateChange);
        this.listener = RCTDeviceEventEmitter.addListener('goActiveRefresh', () => {
            this.props.timeOutCallBack&&this.props.timeOutCallBack(true)
        })
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
        AppState.removeEventListener('change', this.handleAppStateChange);
        this.listener.remove()
    }

    handleAppStateChange(nextAppState){
        if (nextAppState === 'active') {
            RCTDeviceEventEmitter.emit('goActiveRefresh');
        }
    }

    render() {
        let planNo = ''
        if (this.props.cpInfoData.lastPlanNo){
            planNo = this.props.cpInfoData.lastPlanNo.toString()
            planNo = ((planNo.length<3)?('0'+planNo):planNo)+'期'
        }

        let planNoNow = ''
        if (this.props.cpInfoData.planNo){
            planNoNow = this.props.cpInfoData.planNo.toString()
            planNoNow = ((planNoNow.length<3)?('0'+planNoNow):planNoNow)
        }

        let lastOpenCode = this.props.cpInfoData.lastOpenCode
        if (this.props.cpInfoData.lastOpenCode&&this.props.cpInfoData.lastOpenCode.indexOf("等待开奖") < 0&&(this.props.cpInfoData.gameUniqueId == 'HF_SG28'||this.props.cpInfoData.gameUniqueId == 'HF_BJ28'||this.props.cpInfoData.gameUniqueId == 'HF_LF28')){
            let numArray = lastOpenCode.split(" ")
            let num = 0
            let str = ''
            numArray.map((item)=>{
                num += parseInt(item)
                str += (item+'+')
            })
            str = _.trimEnd(str, "+")
            str += (' = '+num)
            lastOpenCode = str
        }

        return (
            <View style={[styles.container, this.props.isHappyPoker && styles.happyPokerBg]}>
                <View style={{justifyContent:'center',backgroundColor:'transparent',marginLeft:10}}>
                    <Text style={{fontSize: 16, color: '#333333',backgroundColor:'transparent'}}> {planNo} </Text>
                    {this.getLastOpenCodeView(lastOpenCode)}
                </View>
                <View style={{marginRight:10,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize: 16, color: '#333333'}}>距{planNoNow}期截止 </Text>
                    <Text style={{fontSize: 23, fontWeight: 'bold', color: '#f4492d',marginTop:5, width:110,marginLeft:10}}>{this.getSurplusTime()}</Text>
                </View>
            </View>
        );
    };

    getLastOpenCodeView = (lastOpenCode) => {
        if (this.props.isHappyPoker) {
            if (!lastOpenCode || lastOpenCode.indexOf("等待开奖") > 0) {
                return (
                    <View style={styles.openCodeContainer}>
                        {this.getWaitLottery()}
                    </View>
                );
            }

            lastOpenCode = lastOpenCode.replace(/ /g, ',');
            return (
                <View style={styles.openCodeContainer}>
                    {happyPoker.getOpenCodeView(lastOpenCode, false)}
                </View>
            );

        } else {
            return  (
            <Text style={{fontSize: 18,color: '#f4492d',width:width/2-12 ,marginTop:2,backgroundColor:'transparent'}}>{lastOpenCode}</Text>
            );
        }
    }

    getWaitLottery = () => {
        let itemArray = [];
        for (let i = 0; i < 3; i++) {
            itemArray.push(
                <Image
                    key={i+1000}
                    source={require('../../images/pokerIcons/pk_moren.png')}
                    style={styles.imgPokerStyle}
                    resizeMode={'contain'}
                />
            );
        }

        return itemArray;
    }

    startTimer = () => {
        // 2.添加定时器  this.timer --->可以理解成一个隐式的全局变量
        this.timer = setInterval(() => {
            if (this.state.surplus <= 0) {
                if (timeoutTime==0){
                    this.props.timeOutCallBack&&this.props.timeOutCallBack(true)
                }
                timeoutTime++
                let max = _.random(3) + 3
                if (timeoutTime >= max){
                    if (this.props.timeOutCallBack != null){
                        this.props.timeOutCallBack&&this.props.timeOutCallBack(true)
                    }
                    timeoutTime = 0
                }
                return;
            }

            if (this.state.surplus<=600&&(this.props.cpInfoData.lastOpenCode.indexOf("等待开奖") > 0)||(this.props.cpInfoData.planNo-this.props.cpInfoData.lastPlanNo==2)){
                timeoutTime++
                let max = _.random(3) + 3
                JXLog('max == ' +max)
                if (timeoutTime >= max) {
                    if (this.props.timeOutCallBack != null){
                        this.props.timeOutCallBack(true)
                    }
                    timeoutTime = 0
                }
            }else {
                timeoutTime = 0
            }

            this.setState({
                surplus: (this.state.surplus - 1)
            });
        }, this.props.duration);
    }

    getSurplusTime = () => {

        let hh = '00'
        let mm = '00'
        let ss = '00'

        if (this.state.surplus) {
            hh = Math.floor(this.state.surplus / 3600)
            if (hh<=0) hh = '0'
            hh = hh < 10 ? "0" + hh : hh
        }

        if (this.state.surplus) {
            mm = Math.floor(this.state.surplus % 3600 / 60)
            if (mm<=0) mm = '0'
            mm = mm < 10 ? "0" + mm : mm
        }

        if (this.state.surplus) {
            ss = Math.floor(this.state.surplus % 60)
            if (ss<=0) ss = '0'
            ss = ss < 10 ? "0" + ss : ss
        }
        return hh + ":" + mm + ":" + ss
    }

    _resetDate(date) {
        this.setState({surplus:date})
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomWidth: TCLineW,
        borderBottomColor: '#DEDEDE',
        height: 70,
    },
    happyPokerBg: {
        backgroundColor: '#F5F5F5',
    },
    openCodeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        width: width/2-12 ,
        marginTop: 2
    },
    imgPokerStyle: {
        height: 50,
        width: 40,
        marginHorizontal: 0.1,
    },
    textOpenCodeBlack: {
        marginLeft: 8,
        marginTop: 3,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    textOpenCodeRed: {
        marginLeft: 8,
        marginTop: 3,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
    },
});