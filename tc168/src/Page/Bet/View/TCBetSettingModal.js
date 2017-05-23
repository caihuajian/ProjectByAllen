/**
 * Created by Sam on 2016/12/17.
 */

import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Dimensions,
    Platform
} from 'react-native';

// （原赔率 - x% * 原赔率）

import Toast from '@remobile/react-native-toast';
import  dismissKeyboard from 'dismissKeyboard';

var {width, height} = Dimensions.get('window');
var Modal = require('react-native-modalbox');
var Slider = require('react-native-slider');

let price = 2

var JXHelper = require('../../../Common/JXHelper/JXHelper')

export default class MyComponent extends React.Component {
    constructor(state) {
        super(state);
        this.state = {
            animationType: 'fade',//none slide fade
            modalVisible: false,
            transparent: true,

            odds: 1, //初始赔率
            maxRebate: 13,    //最大返利
            numberOfUnits: 1, //注数
            unitPrice: 2, //单注金额
            rebate: 0,//初始返利

            unitPriceInput: 2,

            multiple: 1 //倍数 元 角 分
        }
    }

    static defaultProps = {
        settingEndingEvent: null,
        needSetOdds:true
    };

    reset() {
        price = 2
        this.setState({
            unitPriceInput: '2',
            unitPrice: '2',
            multiple: 1,
            rebate:0
        });
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        price = 2
    }

    render() {
        return (
            <Modal
                isOpen={this.state.modalVisible}
                style={{width: width - 60, height: 380, borderRadius: 8, backgroundColor: 'transparent'}}

                position='center'
                animationDuration={500}

                backdropPressToClose={false}
                animationType={this.state.animationType}
                transparent={this.state.transparent}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this._setModalVisible(false)
                } }
            >
                {this.getRenderView()}
            </Modal>
        )
    }

    getRenderView() {
        if (this.props.needSetOdds){
            return (<TouchableHighlight onPress={ ()=> {
                dismissKeyboard()
            }} style={{width: width, height: height}} activeOpacity={1} underlayColor='transparent'>
                <View style={styles.container}>
                    <Text style={styles.titleStyle}>注单设定</Text>
                    <View style={styles.plTextStyle}>
                        <Text style={{marginLeft: 15, marginTop: 5, fontSize: 13, color: '#999999'}}>赔率:{(this.state.odds - this.state.rebate/100*this.state.odds).toFixed(2)}</Text>
                        <Text style={{marginRight: 15, marginTop: 5, fontSize: 13, color: '#999999'}}>返利:{(this.state.rebate).toFixed(1)}%</Text>
                    </View>
                    <Slider
                        value={0}
                        onValueChange={(e)=>this.setState({rebate: e})}
                        minimumValue={0}
                        maximumValue={this.state.maxRebate}
                        step={0.01}
                        maximumTrackTintColor='#eeeeee'
                        minimumTrackTintColor='#ff9600'
                        style={{marginTop: 5, marginLeft: 20, width: width - 60 - 50}}
                        trackStyle={{height: 10}}
                        thumbStyle={styles.sliderStyle}
                    />
                    <View style={styles.priceSettingStyle}>
                        <Text style={styles.textStyle}>单注金额:</Text>
                        {this.getInputView()}
                        {this.getYJFButton()}
                    </View>

                    <Text style={[styles.textStyle, {marginLeft: 20, marginTop: 10}]}>注数: {this.state.numberOfUnits}注 </Text>
                    <Text style={[styles.textStyle, {marginLeft: 20, marginTop: 10}]}>总额: {this.getPrice()}元 </Text>
                    <View style={styles.lotteryPriceStyle}>
                        <Text style={styles.textStyle}>若中奖,最高中: </Text>
                        <Text style={[styles.textStyle, {color: '#00b439'}]}>
                            {JXLog(this.state.rebate)}
                            {((this.state.odds - this.state.rebate/100*this.state.odds) * this.state.unitPrice * this.state.multiple).toFixed(3)}
                        </Text>
                        <Text style={styles.textStyle}> 元</Text>
                    </View>
                    <View style={styles.bottomStyle}>
                        <TouchableHighlight onPress={()=>this.bottomButtonCall('取消')} style={{height: 45, marginTop: 0, flex: 1}} activeOpacity={0.5}
                                            underlayColor='transparent'>
                            <Text style={[styles.bottomButtonStyle, {color: '#999999'}]}>取消</Text>
                        </TouchableHighlight>
                        <View style={{width: 0.8, height: 15, backgroundColor: '#dcdcdc'}}/>
                        <TouchableHighlight onPress={()=>this.bottomButtonCall('确定')} style={{height: 45, marginTop: 0, flex: 1}} activeOpacity={0.5}
                                            underlayColor='transparent'>
                            <Text style={styles.bottomButtonStyle}>确定</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </TouchableHighlight>)
        }else {
            return (
                <TouchableHighlight onPress={ ()=> {
                    dismissKeyboard()
                }} style={{width: width, height: height}} activeOpacity={1} underlayColor='transparent'>
                    <View style={styles.container}>
                        <Text style={styles.titleStyle}>注单设定</Text>
                        <View style={styles.plTextStyle}></View>

                        <View style={[styles.priceSettingStyle,{justifyContent:'flex-start'}]}>
                            <Text style={[styles.textStyle,{marginRight:20}]}>单注金额:</Text>
                            {this.getInputView()}
                            <Text style={[styles.textStyle, {
                                color: '#666666',
                                padding: 5,
                                marginLeft:5
                            }]}>元</Text>
                        </View>

                        <Text style={[styles.textStyle, {marginLeft: 20, marginTop: 10}]}>注数: {this.state.numberOfUnits}注 </Text>
                        <Text style={[styles.textStyle, {marginLeft: 20, marginTop: 10}]}>总额: {this.getPrice()}元 </Text>
                        <View style={styles.lotteryPriceStyle}>
                            <Text style={styles.textStyle}></Text>
                        </View>
                        <View style={styles.bottomStyle}>
                            <TouchableHighlight onPress={()=>this.bottomButtonCall('取消')} style={{height: 45, marginTop: 0, flex: 1}} activeOpacity={0.5}
                                                underlayColor='transparent'>
                                <Text style={[styles.bottomButtonStyle, {color: '#999999'}]}>取消</Text>
                            </TouchableHighlight>
                            <View style={{width: 0.8, height: 15, backgroundColor: '#dcdcdc'}}/>
                            <TouchableHighlight onPress={()=>this.bottomButtonCall('确定')} style={{height: 45, marginTop: 0, flex: 1}} activeOpacity={0.5}
                                                underlayColor='transparent'>
                                <Text style={styles.bottomButtonStyle}>确定</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </TouchableHighlight>)
        }
    }

    getPrice(){
        return parseFloat((this.state.numberOfUnits * this.state.unitPrice * this.state.multiple)).toFixed(2)
    }

    getInputView() {
        if (Platform.OS == 'ios') {
            return (
                <View style={{borderBottomColor: 'red', borderBottomWidth: 1, width: 70, height: 40}}>
                    <TextInput ref="textInputView" defaultValue={'2'} placeholder={'2'} keyboardType="numeric" maxLength={7} style={styles.textInputStyle}
                               onChangeText={(e)=>this.textInputOnChangeText(e)} onEndEditing={()=> {
                        this.textInputOnEndEditing()
                    }}/>
                </View>)
        } else {
            return (<TextInput placeholder={'2'} keyboardType="numeric" maxLength={7}
                               style={styles.textInputStyle} onChangeText={(e)=>this.textInputOnChangeText(e)} onEndEditing={()=> {
                this.textInputOnEndEditing()
            }}/>)
        }
    }

    getYJFButton() {
        return (
            <View style={{flexDirection: 'row', borderRadius: 5, overflow: 'hidden', marginRight: 20}}>
                <TouchableHighlight style={{borderRightWidth: 0.5, borderRightColor: '#dcdcdc'}} onPress={()=>this.priceUnitButtonCall('元')}>
                    <Text style={[styles.textStyle, {
                        backgroundColor: this.state.multiple == 1 ? '#ff9600' : '#eeeeee',
                        color: this.state.multiple == 1 ? 'white' : '#666666',
                        padding: 10
                    }]}>元</Text>
                </TouchableHighlight>
                <TouchableHighlight style={{borderRightWidth: 0.5, borderRightColor: '#dcdcdc'}} onPress={()=>this.priceUnitButtonCall('角')}>
                    <Text style={[styles.textStyle, {
                        backgroundColor: this.state.multiple == 0.1 ? '#ff9600' : '#eeeeee',
                        color: this.state.multiple == 0.1 ? 'white' : '#666666',
                        padding: 10
                    }]}>角</Text>
                </TouchableHighlight>
                <TouchableHighlight style={{}} onPress={()=>this.priceUnitButtonCall('分')}>
                    <Text style={[styles.textStyle, {
                        backgroundColor: this.state.multiple == 0.01 ? '#ff9600' : '#eeeeee',
                        color: this.state.multiple == 0.01 ? 'white' : '#666666',
                        padding: 10
                    }]}>分</Text>
                </TouchableHighlight>
            </View>
        )
    }

    textInputOnChangeText(text) {
        if (text == ''||text<1){
            text = 2
        }
        price = parseInt(text)
        if (text>price){
            Toast.showShortCenter('单注金额必须为整数 默认投注 2 ')
        }
        this.setState({unitPriceInput: price,unitPrice:price})
        return price
    }

    textInputOnEndEditing() {
        if (JXHelper.hasDot(this.state.unitPriceInput) || this.state.unitPriceInput == 0) {
            this.setState({unitPriceInput: '2', unitPrice: '2'});
        } else {
            this.setState({unitPrice: this.state.unitPriceInput})
        }
    }

    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    _setModalVisibleAndOddsAndMaxRebateAndNumberOfUnits(visible, odds, maxRebate, numberOfUnits) {
        this.setState({
            modalVisible: visible,
            odds: odds, //初始赔率
            maxRebate: maxRebate,    //最大返利
            numberOfUnits: numberOfUnits, //注数
        })
    }

    //元 角 分
    priceUnitButtonCall(str) {
        if (str == '元') {
            this.setState({multiple: 1});
        } else if (str == '角') {
            this.setState({multiple: 0.1});
        } else {
            this.setState({multiple: 0.01});
        }
    }

    bottomButtonCall(str) {
        dismissKeyboard()
        if (str == '确定') {
            this._setModalVisible(false)
            this.textInputOnEndEditing()
            if (this.props.settingEndingEvent == null) return
            let json = {}
            json.odds = (this.state.odds - this.state.rebate / 10).toFixed(2)
            json.maxRebate = this.state.maxRebate
            json.numberOfUnits = this.state.numberOfUnits
            json.unitPrice = (price * this.state.multiple).toFixed(2)
            json.rebate = this.state.rebate
            json.maxLotteryPrice = this.state.maxLotteryPrice
            this.props.settingEndingEvent(json)
        } else {

        }

        this._setModalVisible(false)
        this.reset()
    }
}


const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        backgroundColor: 'white',
        width: width - 60,
        position: 'absolute',
        top: 0,
        left: 0
    },
    sliderStyle: {
        width: 20,
        height: 20,
        backgroundColor: 'white',
        borderColor: '#ff9600',
        borderWidth: 5,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 2,
        shadowOpacity: 0.35,
    },
    textInputStyle: {
        width: 70,
        height: 40,
        color: 'red',
        textAlign: 'center'
    },
    titleStyle: {
        width: width - 70,
        height: 30,
        marginTop: 15,
        color: '#333333',
        textAlign: 'center',
        fontSize: 18
    },
    plTextStyle: {
        borderTopWidth: TCLineW,
        borderTopColor: '#dcdcdc',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    priceSettingStyle: {
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    lotteryPriceStyle: {
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    bottomButtonStyle: {
        width: (width - 60) / 2,
        color: '#f4492d',
        textAlign: 'center',
        fontSize: 17,
        marginRight: 0.7,
        flex: 1,
        marginTop: 15
    },
    textStyle: {
        fontSize: 14,
        color: '#999999'
    },
    bottomStyle: {
        height: 45,
        flexDirection: 'row',
        borderTopWidth: TCLineW,
        borderTopColor: '#dcdcdc',
        justifyContent: 'center',
        alignItems: 'center'
    }
});