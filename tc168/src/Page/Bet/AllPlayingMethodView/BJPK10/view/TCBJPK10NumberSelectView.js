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
    Dimensions,
    Image
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
            itemArr.push(<NumberView number={numberArray[i]} key={i} areaIndex={areaIndex}/>)
        }
        showItemArray = itemArr
        return itemArr;
    }

    buttonCall(e) {
        if (this.state.selectedButton != null) {
            this.state.selectedButton.reset()
        }
        this.setState({
            selectedButton: e
        })
        areaIndex = e.props.areaIndex
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
        this.listener = RCTDeviceEventEmitter.addListener('BJPK10NumberCall_clear', () => {
            this.reset()
        })

        this.listener2 = RCTDeviceEventEmitter.addListener('randomSelectedNumber', (areaIndex, number) => {
            if (this.props.areaIndex == areaIndex && this.props.number == number){
                RCTDeviceEventEmitter.emit('BJPK10NumberCall', this.props.areaIndex, this.props.number, true);
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
            <TouchableOpacity style={this.getNumberStyle()} onPress={()=>this.numberSelected()}>
                <Text style={this.getTitleStyle()}>{this.props.number}</Text>
            </TouchableOpacity>
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
        if (this.props.selectedEvent != null) {
            this.props.selectedEvent(this)
        }
        this.setState({
            selected: !this.state.selected
        })
        RCTDeviceEventEmitter.emit('BJPK10NumberCall', this.props.areaIndex, this.props.number, !this.state.selected);
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
        backgroundColor: '#f6f6f6',
        flexDirection: 'row',
        borderBottomWidth: TCLineW,
        borderColor: '#DCDCDC',
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
        width: 50,
        justifyContent: 'center',
    },
});