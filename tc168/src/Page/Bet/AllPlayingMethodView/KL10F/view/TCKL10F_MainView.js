/**
 * Created by Sam on 2016/11/14.
 */


import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight
} from 'react-native';

import NumberW from './TCKL10F_numberSelectView';
TCChongQingNumberView = new NumberW()
let showItemArray = [];

import TCKL10F_DPS from '../data/TCKL10F_DPS'
let SingletonSSC = new TCKL10F_DPS()

import RNShakeEvent from 'react-native-shake-event';

import ShakeButton from '../../../View/TCBetShakeButtonView'

export default class TCKL10F_MainView extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            type: '首位数投',
        };
    }

    static defaultProps = {
        type: '首位数投',
        shakeEvent:null
    };

    componentDidMount() {
        if(!__DEV__){
            RNShakeEvent.addEventListener('shake', () => {
                this.byShake()
            });
        }
    }

    componentWillUnmount() {
        if(!__DEV__){
            RNShakeEvent.removeEventListener('shake')
        }
    }

    render() {
        /* <Text style={{marginLeft: 10, marginTop: 10, color: '#666666'}}>{this.getPlayInfo()}</Text> */
        return (
            <View style={styles.container}>
                {/*{this.getShakeView()}*/}
                {this.renderNumberView()}
            </View>
        );
    };

    getShakeView() {
        return (
            <ShakeButton shakeEvent={()=>this.byShake()}/>
        )
    };

    byShake() {
        if (this.props.shakeEvent == null) return
        this.props.shakeEvent()
    };

    getPlayInfo() {
        let index = SingletonSSC.config.PlayType.indexOf(this.state.type)
        if (index >= 0) {
            return SingletonSSC.config.playInfo[index]
        }
        return ''
    };

    renderNumberView() {
        let itemArr = []
        switch (this.state.type) {
            case '首位数投': {
                itemArr.push(<NumberW titleName='首位' numberArray={SingletonSSC.config.getNumbersArray().concat().splice(0,18)} key={1} areaIndex={0} ref="ref1"/>)
                break;
            }
            case '首位红投': {
                itemArr.push(<NumberW titleName='首位' key={1} numberArray={SingletonSSC.config.getNumbersArray().concat().splice(18,2)} areaIndex={0} ref="ref1"/>)
                break;
            }
            case '二连直':{
                itemArr.push(<NumberW titleName='前位' key={1} areaIndex={0} ref="ref1"/>)
                itemArr.push(<NumberW titleName='后位' key={2} areaIndex={1} ref="ref2"/>)
                break;
            }
            case '二连组': {
                itemArr.push(<NumberW titleName='二连组' key={1} areaIndex={0} ref="ref1"/>)
                break;
            }
            case '前三直': {
                itemArr.push(<NumberW titleName='第一位' key={1} areaIndex={0} ref="ref1"/>)
                itemArr.push(<NumberW titleName='第二位' key={2} areaIndex={1} ref="ref2"/>)
                itemArr.push(<NumberW titleName='第三位' key={3} areaIndex={2} ref="ref3"/>)
                break;
            }
            case '前三组': {
                itemArr.push(<NumberW titleName='前三组' areaIndex={0} key={1} ref="ref1"/>)
                break;
            }
            case '快乐二': {
                itemArr.push(<NumberW titleName='快乐二' areaIndex={0} key={1} ref="ref1"/>)
                break;
            }
            case '快乐三': {
                itemArr.push(<NumberW titleName='快乐三' areaIndex={0} key={1} ref="ref1"/>)
                break;
            }
            case '快乐四': {
                itemArr.push(<NumberW titleName='快乐四' areaIndex={0} key={1}  ref="ref1"/>)
                break;
            }
            case '快乐五': {
                itemArr.push(<NumberW titleName='快乐五' areaIndex={0} key={1} ref="ref1"/>)
                break;
            }
        }
        showItemArray = itemArr;
        return itemArr;
    }

    setPlayMathWith(mathName) {
        this.props.type = mathName;
        this.setState({
            type: mathName
        })
    }
}

function alertObj(obj){
    var output = "";
    for(var i in obj){
        var property=obj[i];
        output+=i+" = "+property+"\n";
    }
    alert(output);
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
    }
});