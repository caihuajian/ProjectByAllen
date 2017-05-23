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
    Dimensions
} from 'react-native';

var {width} = Dimensions.get('window');
let timeoutTime = 0
import Moment from 'moment'

export default class TCBetAwardCountdown extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            surplus: this.props.awardCountdown - Moment().format('X')
        };
    }

    static defaultProps = {
        lotteryNo: '',
        awardCountdown: 0,
        duration: 1000,
        lastIssue: '01 11 08 08 05 05 02 05 05 02'
    }

    componentDidMount() {
        this.startTimer();
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    render() {
        let planNoNow = ''
        if (this.props.lotteryNo){
            planNoNow = this.props.lotteryNo.toString()
            planNoNow = ((planNoNow.length<3)?('0'+planNoNow):planNoNow)
        }
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 17, color: '#333333',marginLeft: 10}}>距{planNoNow}期截止 </Text>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#f4492d', width: 120, marginLeft: 10}}>{this.getSurplusTime()}</Text>
            </View>
        )
    }

    startTimer = () => {
        // 2.添加定时器  this.timer --->可以理解成一个隐式的全局变量
        this.timer = setInterval(() => {
            // JXLog(this.state.surplus)
            if (this.state.surplus <= 0) {
                if (timeoutTime==0){
                    this.props.timeOutCallBack(true)
                }
                timeoutTime++
                if (timeoutTime >= 12){
                    if (this.props.timeOutCallBack != null){
                        this.props.timeOutCallBack(true)
                    }
                    timeoutTime = 0
                }
                return;
            }

            this.setState({
                surplus: (this.state.surplus - 1)
            })
        }, this.props.duration)
    }

    getSurplusTime = () => {

        let hh = '00'
        let mm = '00'
        let ss = '00'

        if (this.state.surplus) {
            hh = Math.floor(this.state.surplus / 3600)
            if (hh < 0){hh = 0}
            hh = hh < 10 ? "0" + hh : hh
        }

        if (this.state.surplus) {
            mm = Math.floor(this.state.surplus % 3600 / 60)
            if (mm < 0){mm = 0}
            mm = mm < 10 ? "0" + mm : mm
        }

        if (this.state.surplus) {
            ss = Math.floor(this.state.surplus % 60)
            if (ss < 0){ss = 0}
            ss = ss < 10 ? "0" + ss : ss
        }
        return hh + ":" + mm + ":" + ss
    }

    _resetDate(date){
        let downTime = date - Moment().format('X')
        if (downTime < 0){
            downTime = 0
        }
        this.setState({surplus:downTime})
    }

    _getAwardCountdownTime(){
        return this.state.surplus
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        borderBottomColor: '#DEDEDE',
        height: 28,
    }
});