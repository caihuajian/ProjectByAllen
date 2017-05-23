/**
 * Created by Sam on 2016/11/14.
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
let showItemArray = [];

// let selectedButton = null
let areaIndex = ''

import TCBetChoiceTitleView from '../../../View/TCBetChoiceTitleView'
import TCBetCommonStyle from '../../../View/TCBetCommonStyle'

export default class TCShangDong115NumberSelectView extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            selectedButton: null
        };
    }

    static defaultProps = {
        titleName: '',
        numberArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        areaIndex: '0',
        numberAddEvent: null
    };

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state != nextState) {
            return false
        }
        return true
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.leftViewStyle}>
                    <TCBetChoiceTitleView titleName={this.props.titleName}/>
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
        for (let i = 0; i < numberArray.length; i++) {
            if (this.props.numberAddEvent) {
                itemArr.push(<NumberView number={numberArray[i]} ref={'NumberView' + numberArray[i]} key={i} areaIndex={areaIndex} selectedEvent={(e, p)=>this.buttonCall(e, p)}/>)
            } else {
                itemArr.push(<NumberView number={numberArray[i]} ref={'NumberView' + numberArray[i]} key={i} areaIndex={areaIndex}/>)
            }
        }
        showItemArray = itemArr
        return itemArr;
    }

    buttonCall(number, areaIndex) {
        if (this.props.numberAddEvent == null) return
        this.props.numberAddEvent(number, areaIndex)
    }


    //清除指定号码
    resetNumberViewWithNumber(number) {
        let refStr = 'NumberView' + number
        let NumberView = this.refs[refStr]
        NumberView.reset()
        NumberView.clear()
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
        this.listener = RCTDeviceEventEmitter.addListener('FC3DNumberCall_clear', () => {
            this.reset()
        })

        this.listener2 = RCTDeviceEventEmitter.addListener('randomSelectedNumber', (areaIndex, number) => {
            if (this.props.areaIndex == areaIndex && this.props.number == number) {
                RCTDeviceEventEmitter.emit('FC3DNumberCall', this.props.areaIndex, this.props.number, true);
                this.setState({
                    selected: true
                })

            }
        })
    }

    componentWillUnmount() {
         this.listener&&this.listener.remove()
        this.listener2&&this.listener2.remove()
    }

    render() {
        return (
            <TouchableOpacity style={this.getNumberStyle()} onPress={()=>this.numberSelected()}>
                <Text style={this.getTitleStyle()}>{this.props.number}</Text>
            </TouchableOpacity>
        )
    }

    getNumberStyle() {
        if (this.state.selected) {
            return TCBetCommonStyle.numberViewSelectedStyle
        } else {
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
        this.setState({selected: !this.state.selected})
        if (this.props.selectedEvent != null && !this.state.selected) {
            this.props.selectedEvent(this.props.number, this.props.areaIndex)
        } else {
            RCTDeviceEventEmitter.emit('FC3DNumberCall', this.props.areaIndex, this.props.number, !this.state.selected);
        }
    }

    reset() {
        this.setState({
            selected: false
        })
    }

    clear() {
        RCTDeviceEventEmitter.emit('FC3DNumberCall', this.props.areaIndex, this.props.number, false);
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#F5FCFF',
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: '#DEDEDE',
    },
    rightViewStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
        width: width - 50
    },
    leftViewStyle: {
        marginLeft: 10,
        marginRight: 10,
        width: 60,
        justifyContent: 'center',
    },
});