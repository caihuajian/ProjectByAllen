/**
 * Created by Sam on 2016/11/11.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image
} from 'react-native';

import NumbersView from '../../../Common/View/TCLotteryNumbersView'
import JXHelper from '../../../Common/JXHelper/JXHelper'
import Moment from 'moment'
import {lotteryLobby} from '../../../Page/resouce/appColorsConfig'
var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');

export default class TCLotteryLobbyRowView extends React.Component {

    constructor(state) {
        super(state);
        this.state = {};
    }

    static defaultProps = {
        cpName: '',
        cpDate: '',
        cpNumbers: null,
        openStatus: true,
        pushEvent: null,
        rowData: null
    };

    componentDidMount() {
    }

    render() {
        let planNoNow = ''
        if (this.props.rowData.planNo){
            planNoNow = this.props.rowData.planNo.toString()
            planNoNow = ((planNoNow.length<3)?('0'+planNoNow):planNoNow)
        }
        return (
            <TouchableHighlight
                onPress={this.pushToBet.bind(this)}
                underlayColor='#DEDEDE'
            >
                <View style={{
                    flexDirection: 'row', width: width, backgroundColor: '#ffffff', marginBottom: 0.5,alignItems:'center'
                }}>
                    <Image source={JXHelper.getGameIconWithUniqueId(this.props.rowData.gameUniqueId)} style={{backgroundColor: '#ffffff',width:50,height:50,marginLeft:7}}/>
                    <View style={styles.container}>
                        <View style={styles.topTitleViewStyle}>
                            <Text style={styles.topTitleStyle}> {this.props.cpName} </Text>
                            <Text style={styles.topRightTitleStyle}>第{planNoNow}期 </Text>
                            <Text style={styles.topBottomTitleStyle}>{this.getTime()}</Text>
                        </View>
                        {this.getResultView()}
                    </View>
                    <View style={{backgroundColor: '#ffffff',marginRight:5}}>
                        <Image source={require('image!icon_next')} style={{backgroundColor: '#ffffff',width:12,height:12,}}/>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    getImageUrl(){
        let url = 'icon_cp_3'
        if (this.props.rowData){
            let gameInfo =  JXHelper.getGameInfoWithUniqueId(this.props.rowData.gameUniqueId)
            if (gameInfo){
                url = gameInfo.gameIconUrl
            }
        }
        return url
    }

    getTime(){
        if (width<375){return Moment(this.props.rowData.openTime).format("MM-DD HH:mm")}
        return Moment(this.props.rowData.openTime).format("YYYY-MM-DD HH:mm:ss")
    }

    getResultView() {
        if (this.props.openStatus && this.props.cpNumbers != null) {
            if (this.props.cpNumbers != null) {
                return <NumbersView cpNumbers={this.props.cpNumbers.split(',')} style={{marginRight: 10, width: width}} showStyle={this.props.rowData.gameUniqueId}  />
            }
        } else {
            return (<View style={{marginBottom: 15,marginLeft:20,backgroundColor:lotteryLobby.waitbgColor,borderRadius:20,width:160,marginTop: 15,marginBottom:15,justifyContent:'center',alignItems:'center'}}><Text style={{fontSize: 16, color: 'white',marginTop:5,marginBottom:5,marginRight:5}}>等待开奖</Text></View>)
        }
    }

    pushToBet() {
        if (this.props.pushEvent == null) return;
        this.props.pushEvent(this.props.cpName);
    }
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: width - 60,
        marginBottom: 0.8,
    },
    topTitleViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 10,
    },
    topTitleStyle: {
        fontSize: 16,
        color: '#333333'
    },
    topBottomTitleStyle: {
        fontSize: 12,
        color: 'gray',
        marginLeft:5
    },
    topRightTitleStyle: {
        fontSize: 15,
        color: 'gray',
        marginLeft:5
    },
});