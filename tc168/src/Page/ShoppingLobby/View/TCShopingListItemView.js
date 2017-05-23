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
import JXHelper from '../../../Common/JXHelper/JXHelper'
import SoundHelper from '../../../Common/JXHelper/SoundHelper'
import HappyPokerHelper from '../../../Common/JXHelper/HappyPokerHelper'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Moment from 'moment'
import _ from 'lodash'
import {shoppingLobby} from '../../resouce/appColorsConfig'
import {defaultIcon, gameIconKeyValue} from '../../resouce/gameIcon/JXGameIconConfig'

let timeoutTime = 0
let lastMoment = 0
let happyPoker = new HappyPokerHelper()
export default class MyComponent extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            timeStr: this.props.mTimer - Moment().format('X')
        };
        lastMoment = this.props.moment
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
            this.setState({timeStr: sTime})
        }, this.props.duration)
    }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.buttonCall}>
                {
                    this.getImage()
                }
                <View style={{justifyContent: 'space-around', flex: 1, marginTop: 5, marginBottom: 10, height: 100} }>
                    <View style={{flexDirection: 'row', marginLeft: 15, justifyContent: 'space-between'}}>
                        <Text style={{color: '#333333', fontSize: 17, marginTop: 5}} ellipsizeMode='tail'
                              numberOfLines={1}> {this.props.title} </Text>
                        <Text style={{
                            color:shoppingLobby.lastIssueNumberColor,
                            marginTop: 5,
                            marginRight: 10
                        }}>第{this.props.rowData.lastIssueNumber}期</Text>
                    </View>

                    {this.getOpenCode()}

                    <View style={{flexDirection: 'row', marginLeft: 15}}>
                        <Text style={{
                            color: '#999999',
                            fontSize: width >= 375 ? 14 : 12
                        }}>距第{this.props.rowData.uniqueIssueNumber}期截止还有</Text>
                        <Text style={{color: '#999999', fontSize: 14, width: 80, textAlign: "center"}}
                              ellipsizeMode='tail'
                              numberOfLines={1}> {this.getSurplusTime()} </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    getImage() {
        if (this.props.gameInfo && this.props.gameInfo.status && this.props.gameInfo.status == 'FORBIDDEN') {
            return <Image source={{uri: this.props.icon}} style={styles.leftImgStyle}/>
        } else {
            return <Image source={JXHelper.getGameIconWithUniqueId(this.props.rowData.gameUniqueId)}
                          style={styles.leftImgStyle}/>
        }
    }

    getOpenCode() {

        let str = ''
        if (this.props.rowData.lastOpenCode && (this.props.rowData.gameUniqueId == 'HF_SG28' || this.props.rowData.gameUniqueId == 'HF_BJ28' || this.props.rowData.gameUniqueId == 'HF_LF28')) {
            let numArray = this.props.rowData.lastOpenCode.split(",")
            let num = 0

            numArray.map((item)=> {
                num += parseInt(item)
                str += (item + '+')
            })
            str = _.trimEnd(str, "+")
            str += (' = ' + num)
        } else if (this.props.rowData.lastOpenCode) {
            str = this.props.rowData.lastOpenCode.replace(/\,/g, " ")
        } else {
            str = ' 正在开奖'
        }
        if (this.props.rowData.lastOpenCode && this.props.rowData.gameUniqueId == 'HF_LFKLPK') {
            return (<View
                style={styles.openCodeContainer}>{happyPoker.getOpenCodeView(this.props.rowData.lastOpenCode, false)}</View>)
        } else if (!this.props.rowData.lastOpenCode && this.props.rowData.gameUniqueId == 'HF_LFKLPK') {
            str = ' 正在开奖'
        }

        return (
            <Text style={{
                marginLeft: 15,
                color: this.props.rowData.lastOpenCode ? 'red' : '#999999',
                fontSize: this.props.rowData.lastOpenCode ? 17 : 15
            }}>
                {str}
            </Text>
        )
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

        if (this.props.title.length <= 0) {
            return ' '
        }

        if (!this.state.timeStr) {
            return ''
        }

        if (!this.props.mTimer || this.props.mTimer <= 0) {
            if (this.props.title && this.props.title.length > 0)
                return hh + ":" + mm + ":" + ss
        }

        if (this.state.timeStr) {
            hh = Math.floor(this.state.timeStr / 3600)
            if (hh < 0) {
                hh = 0
            }
            hh = hh < 10 ? "0" + hh : hh
        }

        if (this.state.timeStr) {
            mm = Math.floor(this.state.timeStr % 3600 / 60)
            if (mm < 0) {
                mm = 0
            }
            mm = mm < 10 ? "0" + mm : mm
        }

        if (this.state.timeStr) {
            ss = Math.floor(this.state.timeStr % 60)
            if (ss < 0) {
                ss = 0
            }
            ss = ss < 10 ? "0" + ss : ss
        }
        return hh + ":" + mm + ":" + ss
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 110,
        width: width,
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1,
    },

    leftImgStyle: {
        width: 60,
        height: 60,
        marginLeft: 10
    }, openCodeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        width: width / 2 - 12,
        marginTop: 2,

    },

});
