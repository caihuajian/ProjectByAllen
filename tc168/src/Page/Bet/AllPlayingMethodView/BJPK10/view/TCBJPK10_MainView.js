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


import MarkSix_DPS from '../data/TCBJPK10_DPS'
import ShakeButton from '../../../View/TCBetShakeButtonView'
import TCBetGoBackShoppingCart from '../../../View/TCBetGoBackShoppingCart'

import TCBJPK10NumberSelectView from './TCBJPK10NumberSelectView'
import RNShakeEvent from 'react-native-shake-event';

let SingletonDPS = new MarkSix_DPS()

export default class TCMarkSix_MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '任选二',
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
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    {/*<ShakeButton shakeEvent={()=>this.byShake()}/>*/}
                </View>
                {this.renderNumberView()}
            </View>
        );
    };

    renderNumberView() {
        let itemArray = []
        let duplexMaxCount = 1
        switch (this.state.type) {
            case '前一': {
                duplexMaxCount = 1
            }
                break
            case '前二': {
                duplexMaxCount = 2
            }
                break
            case '前三': {
                duplexMaxCount = 3
            }
                break
            case '定位胆': {
                duplexMaxCount = 10
            }
                break
        }

        this.getDuplexItemArray(itemArray, duplexMaxCount)
        return itemArray;
    }

    getDuplexItemArray(itemArray, duplexMaxCount) {
        for (let i = 0; i < duplexMaxCount; i++) {
            itemArray.push(<TCBJPK10NumberSelectView titleName={SingletonDPS.config.typeTitles[i]} key={i} areaIndex={i} ref={"ref" + i}
                                                     numberArray={SingletonDPS.config.getNumbersArray()}/>)
        }
    }

    setPlayMathWith(mathName) {
        this.props.type = mathName;
        this.setState({
            type: mathName
        })
    }

    byShake() {
        if (this.props.shakeEvent == null) return
        this.props.shakeEvent()
    };

    _numberButtonCall(number, areaIndex) {

    }
}


const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#f6f6f6',
    }
});