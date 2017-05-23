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

import NumberW from './TCChongQingSSC_numberSelectView';
TCChongQingNumberView = new NumberW()
let showItemArray = [];

import TCChongQingSSC_DPS from '../data/TCChongQingSSC_DPS'
let SingletonSSC = new TCChongQingSSC_DPS()

import RNShakeEvent from 'react-native-shake-event';

import ShakeButton from '../../../View/TCBetShakeButtonView'

export default class TCChongQing_WXZX extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            type: '定位胆-定位胆',
        };
    }

    static defaultProps = {
        type: '定位胆-定位胆',
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
            case '任选二-直选复式':
            case '任选三-直选复式':
            case '任选四-直选复式':
            case '五星-五星通选':
            case '五星-五星直选':
            case '定位胆-定位胆': {
                itemArr.push(<NumberW titleName='万位' key={1} areaIndex={0} ref="ref1"/>)
                itemArr.push(<NumberW titleName='千位' key={2} areaIndex={1} ref="ref2"/>)
                itemArr.push(<NumberW titleName='百位' key={3} areaIndex={2} ref="ref3"/>)
                itemArr.push(<NumberW titleName='十位' key={4} areaIndex={3} ref="ref4"/>)
                itemArr.push(<NumberW titleName='个位' key={5} areaIndex={4} ref="ref5"/>)
                break;
            }
            //三星直选
            case '三星-三星直选': {
                itemArr.push(<NumberW titleName='百位' key={1} areaIndex={0} ref="ref1"/>)
                itemArr.push(<NumberW titleName='十位' key={2} areaIndex={1} ref="ref2"/>)
                itemArr.push(<NumberW titleName='个位' key={3} areaIndex={2} ref="ref3"/>)
                break;
            }
            //三星组三  // 三星组六
            case '三星-三星组三':
            case '三星-三星组六':
            case '任选三-组六复式':
            case '任选三-组三复式': {
                itemArr.push(<NumberW titleName='选号' areaIndex={0} key={1} ref="ref1"/>)
                break;
            }
            //二星直选
            case '二星-二星直选': {
                itemArr.push(<NumberW titleName='十位' areaIndex={0} key={1} ref="ref1"/>)
                itemArr.push(<NumberW titleName='个位' areaIndex={1} key={2} ref="ref2"/>)
                break;
            }
            //二星组选
            case '二星-二星组选': {
                itemArr.push(<NumberW titleName='选号' areaIndex={0} key={1} ref="ref1"/>)
                break;
            }
            //一星组选
            case '一星-一星直选': {
                itemArr.push(<NumberW titleName='个位' areaIndex={0} key={1} ref="ref1"/>)
                break;
            }
            //大小单双
            case '大小单双-后二大小单双': {
                itemArr.push(<NumberW titleName='十位' dsStyle={true} areaIndex={0} key={1} ref="ref1"/>)
                itemArr.push(<NumberW titleName='个位' dsStyle={true} areaIndex={1} key={2} ref="ref2"/>)
                break;
            }
            case '大小单双-前二大小单双': {
                itemArr.push(<NumberW titleName='万位' dsStyle={true} areaIndex={0} key={1} ref="ref1"/>)
                itemArr.push(<NumberW titleName='千位' dsStyle={true} areaIndex={1} key={2} ref="ref2"/>)
                break;
            }
            case '大小单双-后三大小单双': {
                itemArr.push(<NumberW titleName='百位' dsStyle={true} areaIndex={0} key={0} ref="ref0"/>)
                itemArr.push(<NumberW titleName='十位' dsStyle={true} areaIndex={1} key={1} ref="ref1"/>)
                itemArr.push(<NumberW titleName='个位' dsStyle={true} areaIndex={2} key={2} ref="ref2"/>)
                break;
            }
            case '大小单双-前三大小单双': {
                itemArr.push(<NumberW titleName='万位' dsStyle={true} areaIndex={0} key={0} ref="ref0"/>)
                itemArr.push(<NumberW titleName='千位' dsStyle={true} areaIndex={1} key={1} ref="ref1"/>)
                itemArr.push(<NumberW titleName='百位' dsStyle={true} areaIndex={2} key={2} ref="ref2"/>)
                break;
            }
            case '不定位-五星三码':
            case '不定位-五星二码':
            case '不定位-五星一码':
            case '不定位-后四二码':
            case '不定位-后四一码':
            case '不定位-前四二码':
            case '不定位-前四一码':
            case '不定位-后三二码':
            case '不定位-后三一码':
            case '不定位-前三二码':
            case '不定位-前三一码': {
                itemArr.push(<NumberW titleName='不定位' areaIndex={0} key={1} ref="ref1"/>)
                break;
            }

            case '任选二-直选和值': {
                itemArr.push(<NumberW titleName='和值' areaIndex={0} key={1} ref="ref1" numberArray={SingletonSSC.config.getRX2HZNumbersArray()}/>)
                break;
            }
            case '任选三-直选和值': {
                itemArr.push(<NumberW titleName='和值' areaIndex={0} key={1} ref="ref1" numberArray={SingletonSSC.config.getRX3HZNumbersArray()}/>)
                break;
            }

            case '任选二-组选和值': {
                itemArr.push(<NumberW titleName='和值' areaIndex={0} key={1} ref="ref1" numberArray={SingletonSSC.config.getRX2HZNumbersArray()}/>)
                break;
            }
            case '任选三-组选和值': {
                itemArr.push(<NumberW titleName='和值' areaIndex={0} key={1} ref="ref1" numberArray={SingletonSSC.config.getRX3HZNumbersArray()}/>)
                break;
            }
            case '任选二-组选复式': {
                itemArr.push(<NumberW titleName='组选' areaIndex={0} key={1} ref="ref1"/>)
                break;
            }
            case '任选四-组选24': {
                itemArr.push(<NumberW titleName='组选24' areaIndex={0} key={1} ref="ref1"/>)
                break;
            }
            case '任选四-组选12': {
                itemArr.push(<NumberW titleName='二重号' areaIndex={0} key={1} ref="ref1"/>)
                itemArr.push(<NumberW titleName='单号' areaIndex={1} key={2} ref="ref2"/>)
                break;
            }
            case '任选四-组选6': {
                itemArr.push(<NumberW titleName='二重号' areaIndex={0} key={1} ref="ref1"/>)
                break;
            }
            case '任选四-组选4': {
                itemArr.push(<NumberW titleName='三重号' areaIndex={0} key={1} ref="ref1"/>)
                itemArr.push(<NumberW titleName='单号' areaIndex={1} key={2} ref="ref2"/>)
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