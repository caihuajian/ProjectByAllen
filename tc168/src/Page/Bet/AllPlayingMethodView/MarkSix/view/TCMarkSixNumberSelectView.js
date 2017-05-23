/**
 * Created by Sam on 2016/11/30.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
const {width, height} = Dimensions.get('window')

import TCBetChoiceTitleView from '../../../View/TCBetChoiceTitleView'
import TCBetCommonStyle from '../../../View/TCBetCommonStyle'

export default class TCMarkSixNumberSelectView extends React.Component{

    constructor(state){
        super(state);
        this.state = {
            selectedButton:null
        };
    }

    static defaultProps = {
        titleName:'选码',
        numberArray:[0,1,2,3,4,5,6,7,8,9],
        areaIndex:'0',
        odds:'1.98',
        oddsArray:null,
        prizeSettings:null
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.leftViewStyle}>
                    <TCBetChoiceTitleView titleName={this.props.titleName} style={{marginTop:5}} />
                    <TCBetChoiceTitleView titleName='赔率' isGrayBackground={true} style={{marginTop:10}}/>
                </View>

                <View style={styles.rightViewStyle}>
                    {this.getAllNumbers()}
                </View>
            </View>
        )
    }

    getAllNumbers(){
        var itemArr = [];
        let numberArray = this.props.numberArray
        let areaIndex = this.props.areaIndex

        let prizeAmount =  this.props.prizeSettings[0]
        for (let i = 0;i<numberArray.length;i++){
            if (prizeAmount){
                itemArr.push(<NumberView number={numberArray[i]} myOdds={prizeAmount.prizeAmount} key={i} areaIndex={areaIndex}/>)
            }else {
                if (this.props.oddsArray){
                    itemArr.push(<NumberView number={numberArray[i]} myOdds={this.props.oddsArray[i]} key={i} areaIndex={areaIndex}/>)
                }else {
                    itemArr.push(<NumberView number={numberArray[i]} key={i} areaIndex={areaIndex} myOdds={this.props.odds}/>)
                }
            }
        }
        return itemArr;
    }

    buttonCall(e){
        if (this.state.selectedButton != null){
            this.state.selectedButton.reset()
        }
        this.setState({
            selectedButton:e
        })
    }
}


class NumberView  extends React.Component{

    constructor(state){
        super(state);
        this.state = {
            selected:false
        };
    }

    static defaultProps = {
        number:'',
        areaIndex:'0',
        selectedEvent:null,
    }

    componentDidMount() {
        this.listener = RCTDeviceEventEmitter.addListener('TCMarkSixSelectView_clear',() => {
            this.reset()
        })

        this.listener2 = RCTDeviceEventEmitter.addListener('randomSelectedNumber', (areaIndex, number) => {
            if (this.props.areaIndex == areaIndex && this.props.number == number) {
                RCTDeviceEventEmitter.emit('TCMarkSixSelectView_numberSelected',this.props.areaIndex,this.props.number,true);
                this.setState({
                    selected: true
                })
            }
        })
    }
    componentWillUnmount() {
         this.listener&&this.listener.remove()
        this.listener2&& this.listener2.remove()
    }

    render() {
        return (
            <View style={styles.numberItemStyle}>
                <TouchableOpacity style={this.getNumberStyle()} onPress={()=>this.numberSelected()} >
                    <Text style={this.getTitleStyle()}>{this.props.number}</Text>
                </TouchableOpacity>
                <Text style={{marginLeft:-20,fontSize:12,color:'#999999',marginTop:3}}>{this.props.myOdds}</Text>
            </View>
        )
    }

    getNumberStyle() {
        if (this.state.selected) {
            return TCBetCommonStyle.numberViewSelectedStyle
        }else {
            return TCBetCommonStyle.numberViewStyle
        }
    }

    getTitleStyle() {
        if (this.state.selected) {
            return TCBetCommonStyle.numberViewTitleSelectedStyle;
        }
        return TCBetCommonStyle.numberViewTitleStyle;
    }

    numberSelected() {
        if(this.props.selectedEvent!=null){
            this.props.selectedEvent(this)
        }
        this.setState({
            selected:!this.state.selected
        })
        RCTDeviceEventEmitter.emit('TCMarkSixSelectView_numberSelected',this.props.areaIndex,this.props.number,!this.state.selected);
    }

    reset(){
        this.setState({
            selected:false
        })
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        marginTop:5
        // borderBottomWidth:1,
        // borderColor:'#DEDEDE',
    },
    rightViewStyle: {
        flexDirection:'row',
        flexWrap:'wrap',
        marginBottom:10,
        width:width-60
    },
    leftViewStyle: {
        marginLeft:10,
        marginRight:10,
        marginTop:12
    },
    leftTitleStyle: {
        backgroundColor:'#FAEBD7',
        borderColor:'gray',
        borderWidth:0.5,
        padding:5,
        borderRadius:3,
    },
    numberViewStyle: {
        backgroundColor:'white',
        borderRadius:30,
        marginTop:10,
        marginRight:20,
        width:40,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'gray',
        borderWidth:0.5
    },
    numberItemStyle:{
        justifyContent:'center',
        alignItems:'center',
        width:40,
        height:60,
        marginRight:10,
        marginLeft:10,
        marginBottom:10
    }
});