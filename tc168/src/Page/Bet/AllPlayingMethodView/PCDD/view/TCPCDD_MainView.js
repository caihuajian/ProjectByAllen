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

import MarkSix_DPS from '../data/TCPCDD_DPS'
import _ from 'lodash';

import  * as PlayConfig from '../../../../../Data/JXPlayMathConfig'


let SingletonDPS = new MarkSix_DPS()

import TCMarkSixSpecialKindSelectView from './TCPCDDSpecialKindSelectView'
import TCPCDDNumberSelectView from './TCPCDDNumberSelectView'

import ShakeButton from '../../../View/TCBetShakeButtonView'
import RNShakeEvent from 'react-native-shake-event';

export default class TCMarkSix_MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '混合',
        };
    }

    static defaultProps = {};

    componentDidMount() {
        if (!__DEV__) {
            RNShakeEvent.addEventListener('shake', () => {
                this.byShake()
            });
        }
    }

    componentWillUnmount() {
        if (!__DEV__) {
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
        let type = this.state.type
        let playGameSetting = this.getSingleGamePrizeSettings(type)
        if (!playGameSetting)return

        switch (type) {
            case '混合': {
                itemArray.push(<TCMarkSixSpecialKindSelectView titleName={'混合'} key={1} odds={' '} numberArray={SingletonDPS.config.getSpecialKindArray()}
                                                               prizeSettings={playGameSetting['prizeSettings']}
                />)
            }
                break
            case '特码': {
                itemArray.push(<TCPCDDNumberSelectView titleName={'特码'} key={1} odds={' '} numberArray={SingletonDPS.config.getNumbersArray()}
                                                               prizeSettings={playGameSetting['prizeSettings']}
                />)
            }
                break
            case '特码包三': {
               let xprizeSettings= playGameSetting['prizeSettings']
                let set = xprizeSettings[0]
                itemArray.push(<TCPCDDNumberSelectView titleName={'包三'} key={1} odds={set.prizeAmount} numberArray={SingletonDPS.config.getNumbersArray()}
                />)
            }
                break
            case '波色': {
                itemArray.push(<TCMarkSixSpecialKindSelectView titleName={'波色'} key={1} odds={' '} numberArray={SingletonDPS.config.getSheBo()}
                                                               prizeSettings={playGameSetting['prizeSettings']}
                />)
            }
                break
            case '豹子': {
                itemArray.push(<TCMarkSixSpecialKindSelectView titleName={'豹子'} key={1} odds={' '} numberArray={SingletonDPS.config.getBaoZi()}
                                                               prizeSettings={playGameSetting['prizeSettings']}
                />)
            }
                break

        }
        return itemArray;
    }

    getSingleGamePrizeSettings(playMath) {
        let pys = SingletonDPS.getmyMathTypeIDWithChineseName(playMath)
        if (pys && TCGameSetting) {
            let playGameSetting = TCGameSetting.content['allGamesPrizeSettings'][this.props.gameUniqueId]['singleGamePrizeSettings'][pys]
            return playGameSetting
        }
        return null
    }

    setPlayMathWith(mathName) {
        this.props.type = mathName;
        console.log(mathName)
        this.setState({
            type: mathName
        })
    }

    byShake() {
        if (this.props.shakeEvent == null) return
        this.props.shakeEvent()
    };

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
    }
});