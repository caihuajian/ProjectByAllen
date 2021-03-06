/**
 * Created by Sam on 2016/11/30.
 */
/**
 * Created by Sam on 2016/11/30.
 */

import React, {Component} from 'react';
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


//特码种类
export default class TCMarkSixSpecialKind extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            selectedButton: null
        };
    }

    static defaultProps = {
        titleName: '种类',
        numberArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        areaIndex: '0',
        odds: '1.98',
        oddsArray: null,
        prizeSettings: null,
        prizeType_CUR:false
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.leftViewStyle}>
                    <TCBetChoiceTitleView titleName={this.props.titleName} style={{marginTop: 10}}/>
                    <TCBetChoiceTitleView titleName='赔率' style={{marginTop: 10}} isGrayBackground={true}/>
                </View>
                <View style={styles.rightViewStyle}>
                    {this.getAllNumbers()}
                </View>
            </View>
        );
    }

    getAllNumbers() {
        var itemArr = [];
        let numberArray = this.props.numberArray
        let areaIndex = this.props.areaIndex
        let prizeAmount = this.props.prizeSettings
        if (prizeAmount &&!this.props.prizeType_CUR) {
            for (let i = 0; i < prizeAmount.length; i++) {
                let set = prizeAmount[i]
                itemArr.push(<NumberView number={set.prizeNameForDisplay} myOdds={set.prizeAmount} key={i} areaIndex={areaIndex}/>)
            }
            return itemArr
        } else if (prizeAmount && this.props.prizeType_CUR) {
            for (let i = 0; i < numberArray.length; i++) {
                if (this.props.prizeType_CUR == numberArray[i]) {
                    let set = prizeAmount[0]
                    itemArr.push(<NumberView number={numberArray[i]} myOdds={set.prizeAmount} key={i} areaIndex={areaIndex}/>)
                } else {
                    let set = prizeAmount[1]
                    itemArr.push(<NumberView number={numberArray[i]} key={i} areaIndex={areaIndex} myOdds={set.prizeAmount}/>)
                }
            }
            return itemArr;
        } else {
            for (let i = 0; i < numberArray.length; i++) {
                if (this.props.oddsArray) {
                    console.log('---', this.props.oddsArray[i])
                    itemArr.push(<NumberView number={numberArray[i]} myOdds={this.props.oddsArray[i]} key={i} areaIndex={areaIndex}/>)
                } else {
                    itemArr.push(<NumberView number={numberArray[i]} key={i} areaIndex={areaIndex} myOdds={this.props.odds}/>)
                }
            }
            return itemArr;
        }
    }
}


class NumberView extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            selected: false
        };
    }

    static defaultProps = {
        number: '',
        areaIndex: '0',
        selectedEvent: null
    }

    componentDidMount() {
        this.listener = RCTDeviceEventEmitter.addListener('TCMarkSixSelectView_clear', () => {
            this.reset()
        })

        this.listener2 = RCTDeviceEventEmitter.addListener('randomSelectedNumber', (areaIndex, number) => {
            if (this.props.areaIndex == areaIndex && this.props.number == number) {
                this.setState({
                    selected: true
                })
                RCTDeviceEventEmitter.emit('TCMarkSixSelectView_numberSelected', this.props.areaIndex, this.props.number, true);
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
                <TouchableOpacity style={this.getNumberStyle()} onPress={()=>this.numberSelected()}>
                    <Text style={this.getTitleStyle()}>{this.props.number}</Text>
                </TouchableOpacity>
                <Text style={{marginLeft: -20, fontSize: 12, color: '#999999', marginTop: 3}}>{this.props.myOdds}</Text>
            </View>
        )
    }

    getNumberStyle() {
        if (this.state.selected) {
            return [TCBetCommonStyle.numberViewSelectedStyle, {
                width: 70,
                height: 40,
                padding: 5,
                borderRadius: 8
            }]
        } else {
            return [TCBetCommonStyle.numberViewStyle, {
                width: 70,
                height: 40,
                padding: 5,
                borderRadius: 8
            }]
        }
    }

    getTitleStyle() {
        if (this.state.selected) {
            return [TCBetCommonStyle.numberViewTitleSelectedStyle, {fontSize: 17}];
        }
        return [TCBetCommonStyle.numberViewTitleStyle, {fontSize: 17}];
    }

    numberSelected() {
        if (this.props.selectedEvent != null) {
            this.props.selectedEvent(this)
        }
        this.setState({
            selected: !this.state.selected
        })
        RCTDeviceEventEmitter.emit('TCMarkSixSelectView_numberSelected', this.props.areaIndex, this.props.number, !this.state.selected);
    }

    reset() {
        this.setState({
            selected: false
        })
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        marginTop: 5
    },
    rightViewStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 10,
        width: width - 60
    },
    leftViewStyle: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 12
    },
    numberItemStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 50,
        marginTop: 10,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 10
    }
});