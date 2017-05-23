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

import MarkSix_DPS from '../data/TCMarkSix_DPS'
import _ from 'lodash';

import  * as PlayConfig from '../../../../../Data/JXPlayMathConfig'


let SingletonDPS = new MarkSix_DPS()

import TCMarkSixNumberSelectView from './TCMarkSixNumberSelectView'
import TCMarkSixSpecialKindSelectView from './TCMarkSixSpecialKindSelectView'
import TCMarkSixColorSelectView from './TCMarkSixColorSelectView'
import ShakeButton from '../../../View/TCBetShakeButtonView'
import RNShakeEvent from 'react-native-shake-event';

export default class TCMarkSix_MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '特码B',
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

        switch (type) {
            case '特码A': {
                itemArray.push(<TCMarkSixNumberSelectView key={1} odds={' '} numberArray={SingletonDPS.config.getNumbersArray()} prizeSettings={playGameSetting['prizeSettings']}/>)
            }
                break
            case '特码B': {
                itemArray.push(<TCMarkSixNumberSelectView key={1} odds={' '} numberArray={SingletonDPS.config.getNumbersArray()} prizeSettings={playGameSetting['prizeSettings']}/>)
            }
                break
            case '特码-种类': {
                itemArray.push(<TCMarkSixSpecialKindSelectView key={1} oddsArray={SingletonDPS.config.getSpecialKindOddsArray()}
                                                               numberArray={SingletonDPS.config.getSpecialKindArray()} prizeSettings={playGameSetting['prizeSettings']}/>)
            }
                break
            case '特码-色波': {
                playGameSetting = _.cloneDeep(playGameSetting['prizeSettings']).slice(0, 3)
                itemArray.push(<TCMarkSixColorSelectView key={1} oddsArray={SingletonDPS.config.getNumberOfColorOddsArray()}
                                                         numberArray={SingletonDPS.config.getNumberOfColorArray()} prizeSettings={playGameSetting}/>)
            }
                break
            case '色波-半波': {
                playGameSetting = _.cloneDeep(playGameSetting['prizeSettings']).slice(3, 15)
                itemArray.push(<TCMarkSixSpecialKindSelectView key={1} oddsArray={SingletonDPS.config.getNumbersOfColorOddsArray_half()}
                                                               numberArray={SingletonDPS.config.getNumbersOfColorArray_half()} prizeSettings={playGameSetting}/>)
            }
                break
            case '色波-半半波': {
                playGameSetting = _.cloneDeep(playGameSetting['prizeSettings']).slice(15)
                itemArray.push(<TCMarkSixSpecialKindSelectView key={1} oddsArray={SingletonDPS.config.getNumbersOfColorOddsArray_half_half()}
                                                               numberArray={SingletonDPS.config.getNumbersOfColorArray_half_half()} prizeSettings={playGameSetting}/>)
            }
                break
            case '特肖-生肖': {
                // --
                itemArray.push(<TCMarkSixSpecialKindSelectView key={1} oddsArray={SingletonDPS.config.getNumbersOfOddsArraySpecial_Animal()}
                                                               numberArray={SingletonDPS.config.getNumbersOfSpecial_Animal()} prizeSettings={playGameSetting['prizeSettings']}
                                                               prizeType_CUR={PlayConfig.getGameSetingSpecialSymbolicWithKey(playGameSetting['symbolic'])}/>)
            }
                break
            case '合肖': {
                itemArray.push(<TCMarkSixSpecialKindSelectView key={1} numberArray={SingletonDPS.config.getNumbersOfSpecial_Animal()}
                                                               prizeSettings={playGameSetting['prizeSettings']}/>)
            }
                break
            case '头尾数': {
                itemArray.push(<TCMarkSixSpecialKindSelectView key={1} oddsArray={SingletonDPS.config.getEndToEndNumbersOddsArray()}
                                                               numberArray={SingletonDPS.config.getEndToEndNumbersArray()}
                                                               prizeSettings={playGameSetting['prizeSettings']}/>)
            }
                break
            case '正码-选号': {
                itemArray.push(<TCMarkSixNumberSelectView key={1} odds={' '} numberArray={SingletonDPS.config.getNumbersArray()} prizeSettings={playGameSetting['prizeSettings']}/>)
            }
                break
            case '正码-种类': {
                itemArray.push(<TCMarkSixSpecialKindSelectView key={1} odds={'1.98'} numberArray={SingletonDPS.config.getNormalNumberKind()}
                                                               prizeSettings={playGameSetting['prizeSettings']}/>)
            }
                break
            case '五行': {
                itemArray.push(<TCMarkSixSpecialKindSelectView key={1} oddsArray={SingletonDPS.config.getWuXingNumbersOddsArray()}
                                                               numberArray={SingletonDPS.config.getWuXingNumbersArray()} prizeSettings={playGameSetting['prizeSettings']}/>)
            }
                break
            case'正肖-生肖': {
                // --
                itemArray.push(<TCMarkSixSpecialKindSelectView key={1} oddsArray={SingletonDPS.config.getNumbersOfZhengXiaoOddsArraySpecial_Animal()}
                                                               numberArray={SingletonDPS.config.getNumbersOfSpecial_Animal()} prizeSettings={playGameSetting['prizeSettings']}
                                                               prizeType_CUR={PlayConfig.getGameSetingSpecialSymbolicWithKey(playGameSetting['symbolic'])}/>)
            }
                break
            case'7色波-种类': {
                itemArray.push(<TCMarkSixSpecialKindSelectView key={1} oddsArray={SingletonDPS.config.get7SheBoOddsArray()}
                                                               numberArray={SingletonDPS.config.get7SheBo()} prizeSettings={playGameSetting['prizeSettings']}/>)
            }
                break
            case'总肖-种类': {
                itemArray.push(<TCMarkSixSpecialKindSelectView key={1} oddsArray={SingletonDPS.config.getAllAnimalOddsArray()}
                                                               numberArray={SingletonDPS.config.getAllAnimalArray()} prizeSettings={playGameSetting['prizeSettings']}/>)
            }
                break
            case'平特一肖': {


                let animal =  SingletonDPS.config.getNumbersOfSpecial_Animal()
                let ptyx = SingletonDPS.config.getPingTeYiXiaoOddsArray()
                itemArray.push(<TCMarkSixSpecialKindSelectView key={1} oddsArray={ptyx}
                                                               numberArray={animal}
                                                               prizeSettings={playGameSetting['prizeSettings']}
                                                               prizeType_CUR={PlayConfig.getGameSetingSpecialSymbolicWithKey(playGameSetting['symbolic'])}/>)
            }
                break
            case'平特尾数': {
                // --
                itemArray.push(<TCMarkSixSpecialKindSelectView key={1} oddsArray={SingletonDPS.config.getPingTeWeiShuOddsArray()}
                                                               numberArray={SingletonDPS.config.getPingTeWeiShu()} prizeSettings={playGameSetting['prizeSettings']}
                                                               prizeType_CUR={PlayConfig.getGameSetingSpecialSymbolicWithKey(playGameSetting['symbolic'])}/>)
            }
                break
        }
        return itemArray;
    }

    getSingleGamePrizeSettings(playMath) {
        let pys = SingletonDPS.getmyMathTypeIDWithChineseName(playMath)
        if (pys && TCGameSetting) {
            let playGameSetting = TCGameSetting.content['allGamesPrizeSettings']['MARK_SIX']['singleGamePrizeSettings'][pys]
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