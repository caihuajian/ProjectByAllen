/**
 * Created by Sam on 2016/11/28.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import TCFC3D_DPS from '../data/TCFC3D_DPS'

let SingletonDPS = new TCFC3D_DPS()

import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import TCFC3DNumberSelectView from './TCFC3DNumberSelectView'
import ShakeButton from '../../../View/TCBetShakeButtonView'
import RNShakeEvent from 'react-native-shake-event';


export default class TCMarkSix_MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '3D直选',
        };
    }

    static defaultProps = {};

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
        return (
            <View style={styles.container}>
                {/*<ShakeButton shakeEvent={()=>this.byShake()}/>*/}
                {this.renderNumberView()}
            </View>
        );
    };

    renderNumberView() {
        let itemArray = []
        let duplexMaxCount = 1
        switch (this.state.type) {
            case '3D直选': {
                itemArray.push(<TCFC3DNumberSelectView titleName='百位' key={1} areaIndex={0}
                                                       numberArray={SingletonDPS.config.getNumbersArray()}/>)

                itemArray.push(<TCFC3DNumberSelectView titleName='十位' key={2} areaIndex={1}
                                                       numberArray={SingletonDPS.config.getNumbersArray()}/>)

                itemArray.push(<TCFC3DNumberSelectView titleName='个位' key={3} areaIndex={2}
                                                       numberArray={SingletonDPS.config.getNumbersArray()}/>)
            }
                break
            case '3D组三单式': {
                itemArray.push(<TCFC3DNumberSelectView titleName='重号' key={1} areaIndex={0} ref="ref1"
                                                       numberAddEvent={(e, p)=>this._numberButtonCall(e, p)}
                                                       numberArray={SingletonDPS.config.getNumbersArray()}/>)
                itemArray.push(<TCFC3DNumberSelectView titleName='单号' key={2} areaIndex={1} ref="ref2"
                                                       numberAddEvent={(e, p)=>this._numberButtonCall(e, p)}
                                                       numberArray={SingletonDPS.config.getNumbersArray()}/>)
            }
                break
            case '3D组三复式': {
                itemArray.push(<TCFC3DNumberSelectView titleName='选号' key={2} areaIndex={0}
                                                       numberArray={SingletonDPS.config.getNumbersArray()}/>)
            }
                break
            case '3D组六': {
                itemArray.push(<TCFC3DNumberSelectView titleName='选号' key={1} areaIndex={0}
                                                       numberArray={SingletonDPS.config.getNumbersArray()}/>)
            }
                break
        }

        this.getDuplexItemArray(itemArray, duplexMaxCount)
        return itemArray;
    }

    getDuplexItemArray(itemArray, duplexMaxCount) {
        for (let i = 0; i < duplexMaxCount; i++) {
        }
    }

    setPlayMathWith(mathName) {
        this.props.type = mathName;
        console.log(mathName)
        this.setState({
            type: mathName
        })
    }

    _numberButtonCall(number, areaIndex) {
        //重号区点击
        // 如果已经有号码清空
        // 判断单号区是否存在该号码 如果存在 清空 不让这个号码被选中
        // 否则被选中


        //单号区
        // 如果已经有号码清空
        // 判断重号区是否存在该号码 如果存在 清空 不让这个号码被选中
        // 否则被选中


        let duplexSelectViewC = this.refs['ref1']
        let duplexSelectViewD = this.refs['ref2']

        let CHQ = SingletonDPS.getAreaArrayWith(0)
        let DHQ = SingletonDPS.getAreaArrayWith(1)

        if (areaIndex == 0){
            if (CHQ.length > 0){
                duplexSelectViewC.resetNumberViewWithNumber(CHQ[0])
            }
            if(DHQ.length > 0){
                 if (DHQ[0]== number){
                     duplexSelectViewC.resetNumberViewWithNumber(number)
                     return
                 }
            }
        }else {
            if (DHQ.length > 0){
                duplexSelectViewD.resetNumberViewWithNumber(DHQ[0])
            }
            if(CHQ.length > 0){
                if (CHQ[0]== number){
                    duplexSelectViewD.resetNumberViewWithNumber(number)
                    return
                }
            }
        }
        RCTDeviceEventEmitter.emit('FC3DNumberCall', areaIndex, number, true)
    }

    byShake() {
        if (this.props.shakeEvent == null) return
        this.props.shakeEvent()
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2'
    }
});