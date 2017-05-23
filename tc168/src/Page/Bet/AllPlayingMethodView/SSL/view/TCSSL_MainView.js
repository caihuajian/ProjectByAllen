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
    TouchableHighlight,
    Vibration,
    Platform
} from 'react-native';

import NumberW from './TCSSL_numberSelectView';
TCChongQingNumberView = new NumberW()
let showItemArray = [];

import TCChongQingSSC_DPS from '../data/TCSSL_DPS'
let SingletonSSC = new TCChongQingSSC_DPS()

import RNShakeEvent from 'react-native-shake-event';

import ShakeButton from '../../../View/TCBetShakeButtonView'

export default class TCChongQing_WXZX extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            type: '三星-直选复式',
        };
    }

    static defaultProps = {
        type: '三星-直选复式',
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
        if (Platform.OS == 'ios'){
            Vibration.vibrate()
        }
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
            case '三星-直选和值': {
                itemArr.push(<NumberW titleName='和值' areaIndex={0} key={1} ref="ref1" numberArray={SingletonSSC.config.getRX3HZNumbersArray()}/>)
                break;
            }
            //三星直选
            case '三星-直选复式': {
                itemArr.push(<NumberW titleName='百位' key={1} areaIndex={0} ref="ref1"/>)
                itemArr.push(<NumberW titleName='十位' key={2} areaIndex={1} ref="ref2"/>)
                itemArr.push(<NumberW titleName='个位' key={3} areaIndex={2} ref="ref3"/>)
                break;
            }

            case '三星-组六复式':
            case '三星-组三复式': {
                itemArr.push(<NumberW titleName='选号' areaIndex={0} key={1} ref="ref1"/>)
                break;
            }
            case '三星-组三和值': {
                itemArr.push(<NumberW titleName='和值' areaIndex={0} key={1} ref="ref1" numberArray={SingletonSSC.config.getZ3HZNumbersArray()}/>)
                break;
            }
            case '三星-组六和值': {
                itemArr.push(<NumberW titleName='和值' areaIndex={0} key={1} ref="ref1" numberArray={SingletonSSC.config.getZ6HZNumbersArray()}/>)
                break;
            }

            //二星直选
            case '二星-前二直选':
            {
                itemArr.push(<NumberW titleName='百位' areaIndex={0} key={0} ref="ref1"/>)
                itemArr.push(<NumberW titleName='十位' areaIndex={1} key={1} ref="ref2"/>)
                break;
            }
            case '二星-后二直选': {
                itemArr.push(<NumberW titleName='十位' areaIndex={0} key={0} ref="ref1"/>)
                itemArr.push(<NumberW titleName='个位' areaIndex={1} key={1} ref="ref2"/>)
                break;
            }
            //二星组选
            case '二星-前二组选':
            case '二星-后二组选': {
                itemArr.push(<NumberW titleName='选号' areaIndex={0} key={1} ref="ref1"/>)
                break;
            }

            case '定位胆-定位胆': {
                itemArr.push(<NumberW titleName='百位' key={3} areaIndex={0} ref="ref3"/>)
                itemArr.push(<NumberW titleName='十位' key={4} areaIndex={1} ref="ref4"/>)
                itemArr.push(<NumberW titleName='个位' key={5} areaIndex={2} ref="ref5"/>)
                break;
            }

            case '不定位-一码不定位': {
                itemArr.push(<NumberW titleName='一码' areaIndex={0} key={1} ref="ref1"/>)
                break;
            }

            case '不定位-二码不定位': {
                itemArr.push(<NumberW titleName='二码' areaIndex={0} key={1} ref="ref1"/>)
                break;
            }

            //大小单双
            case '大小单双-后二大小单双': {
                itemArr.push(<NumberW titleName='十位' dsStyle={true} areaIndex={0} key={1} ref="ref1"/>)
                itemArr.push(<NumberW titleName='个位' dsStyle={true} areaIndex={1} key={2} ref="ref2"/>)
                break;
            }
            case '大小单双-前二大小单双': {
                itemArr.push(<NumberW titleName='百位' dsStyle={true} areaIndex={0} key={1} ref="ref1"/>)
                itemArr.push(<NumberW titleName='十位' dsStyle={true} areaIndex={1} key={2} ref="ref2"/>)
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
        backgroundColor: '#f6f6f6'
    }
});