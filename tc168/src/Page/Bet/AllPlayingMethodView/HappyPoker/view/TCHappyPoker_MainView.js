import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';


import HappyPoker_DPS from '../data/TCHappyPoker_DPS'
import TCHappyPokerSelectView from './TCHappyPokerSelectView'
import RNShakeEvent from 'react-native-shake-event';
import {Color, Window} from '../../../../../Common/Style/AppStyle'

let SingletonDPS = new HappyPoker_DPS()

export default class TCHappyPoker_MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '包选',
        };
    }

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
        let textRuleRemind = '';
        switch (this.state.type) {
            case '包选':
                textRuleRemind = '即将开出3张扑克，你猜会开';
                break
            case '同花单选':
                textRuleRemind = '开出的3张牌都是所选花色即中奖';
                break
            case '顺子单选':
                textRuleRemind = '所选的顺子开出（不分花色）即中奖';
                break
            case '同花顺单选':
                textRuleRemind = '开出同花顺且为所选花色即中奖';
                break
            case '豹子单选':
                textRuleRemind = '所选的豹子开出（不分花色）即中奖';
                break
            case '对子单选':
                textRuleRemind = '所选的对子开出（不分花色）即中奖';
                break
            case '任选一':
                textRuleRemind = '至少选1个号，猜对任意1个开奖号（不分花色）即中奖';
                break
            case '任选二':
                textRuleRemind = '至少选2个号，猜对任意2个开奖号（不分花色）即中奖';
                break
            case '任选三':
                textRuleRemind = '至少选3个号，选号包含开奖号（不分花色）即中奖';
                break
            case '任选四':
                textRuleRemind = '至少选4个号，选号包含开奖号（不分花色）即中奖';
                break
            case '任选五':
                textRuleRemind = '至少选5个号，选号包含开奖号（不分花色）即中奖';
                break
            case '任选六':
                textRuleRemind = '至少选6个号，选号包含开奖号（不分花色）即中奖';
        }

        return (
            <View style={styles.container}>
                <View style={styles.topTextContainer}>
                    <Text style={styles.topText}>{textRuleRemind}</Text>
                </View>
                <View style={styles.contentContainer}>
                    {this.getContentView()}
                </View>
            </View>
        );
    };

    getContentView() {
        let itemArray = [];
        switch (this.state.type) {
            case '包选':
                    itemArray.push(this.getBaoXuanItemArray());
                break
            case '同花单选':
                itemArray.push(this.getTongHuaItemArray());
                break
            case '顺子单选':
                    itemArray.push(this.getShunZiItemArray());
                break
            case '同花顺单选':
                itemArray.push(this.getTongHuaShunItemArray());
                break
            case '豹子单选':
                itemArray.push(this.getBaoZiItemArray() );
                break
            case '对子单选':
                itemArray.push(this.getDuiZiItemArray());
                break
            case '任选一':
            case '任选二':
            case '任选三':
            case '任选四':
            case '任选五':
            case '任选六':
                itemArray.push(this.getDanXuanItemArray());
        }

        return itemArray;
    }

    getDanXuanItemArray() {
        let itemArray = [];
        let icon = null;
        for (let index = 0; index < 13; index++) {
            switch (index.toString()) {
                case '0':
                    icon = require('../../../../images/pokerIcons/pk_a.png');
                    break
                case '1':
                    icon = require('../../../../images/pokerIcons/pk_2.png');
                    break
                case '2':
                    icon = require('../../../../images/pokerIcons/pk_3.png');
                    break
                case '3':
                    icon = require('../../../../images/pokerIcons/pk_4.png');
                    break
                case '4':
                    icon = require('../../../../images/pokerIcons/pk_5.png');
                    break
                case '5':
                    icon = require('../../../../images/pokerIcons/pk_6.png');
                    break
                case '6':
                    icon = require('../../../../images/pokerIcons/pk_7.png');
                    break
                case '7':
                    icon = require('../../../../images/pokerIcons/pk_8.png');
                    break
                case '8':
                    icon = require('../../../../images/pokerIcons/pk_9.png');
                    break
                case '9':
                    icon = require('../../../../images/pokerIcons/pk_10.png');
                    break
                case '10':
                    icon = require('../../../../images/pokerIcons/pk_j.png');
                    break
                case '11':
                    icon = require('../../../../images/pokerIcons/pk_q.png');
                    break
                case '12':
                    icon = require('../../../../images/pokerIcons/pk_k.png');
            }

            this.setItemArray(itemArray, index, icon);
        }

        return itemArray;
    }

    getDuiZiItemArray() {
        let itemArray = [];
        let icon = null;
        for (let index = 0; index < 13; index++) {
            switch (index.toString()) {
                case '0':
                    icon = require('../../../../images/pokerIcons/pk_aa.png');
                    break
                case '1':
                    icon = require('../../../../images/pokerIcons/pk_22.png');
                    break
                case '2':
                    icon = require('../../../../images/pokerIcons/pk_33.png');
                    break
                case '3':
                    icon = require('../../../../images/pokerIcons/pk_44.png');
                    break
                case '4':
                    icon = require('../../../../images/pokerIcons/pk_55.png');
                    break
                case '5':
                    icon = require('../../../../images/pokerIcons/pk_66.png');
                    break
                case '6':
                    icon = require('../../../../images/pokerIcons/pk_77.png');
                    break
                case '7':
                    icon = require('../../../../images/pokerIcons/pk_88.png');
                    break
                case '8':
                    icon = require('../../../../images/pokerIcons/pk_99.png');
                    break
                case '9':
                    icon = require('../../../../images/pokerIcons/pk_1010.png');
                    break
                case '10':
                    icon = require('../../../../images/pokerIcons/pk_jj.png');
                    break
                case '11':
                    icon = require('../../../../images/pokerIcons/pk_qq.png');
                    break
                case '12':
                    icon = require('../../../../images/pokerIcons/pk_kk.png');
            }

            this.setItemArray (itemArray, index, icon);
        }

        return itemArray;
    }

    getBaoZiItemArray() {
        let itemArray = [];
        let icon = null;
        for (let index = 0; index < 13; index++) {
            switch (index.toString()) {
                case '0':
                    icon = require('../../../../images/pokerIcons/pk_aaa.png');
                    break
                case '1':
                    icon = require('../../../../images/pokerIcons/pk_222.png');
                    break
                case '2':
                    icon = require('../../../../images/pokerIcons/pk_333.png');
                    break
                case '3':
                    icon = require('../../../../images/pokerIcons/pk_444.png');
                    break
                case '4':
                    icon = require('../../../../images/pokerIcons/pk_555.png');
                    break
                case '5':
                    icon = require('../../../../images/pokerIcons/pk_666.png');
                    break
                case '6':
                    icon = require('../../../../images/pokerIcons/pk_777.png');
                    break
                case '7':
                    icon = require('../../../../images/pokerIcons/pk_888.png');
                    break
                case '8':
                    icon = require('../../../../images/pokerIcons/pk_999.png');
                    break
                case '9':
                    icon = require('../../../../images/pokerIcons/pk_101010.png');
                    break
                case '10':
                    icon = require('../../../../images/pokerIcons/pk_jjj.png');
                    break
                case '11':
                    icon = require('../../../../images/pokerIcons/pk_qqq.png');
                    break
                case '12':
                    icon = require('../../../../images/pokerIcons/pk_kkk.png');
            }

            this.setItemArray (itemArray, index, icon);
        }

        return itemArray;
    }

    getTongHuaShunItemArray() {
        let itemArray = [];
        let icon = null;
        for (let index = 0; index < 4; index++) {
            switch (index.toString()) {
                case '0':
                    icon = require('../../../../images/pokerIcons/pk_heitao_shunzi.png');
                    break
                case '1':
                    icon = require('../../../../images/pokerIcons/pk_taoxin_shunzi.png');
                    break
                case '2':
                    icon = require('../../../../images/pokerIcons/pk_meihua_shunzi.png');
                    break
                case '3':
                    icon = require('../../../../images/pokerIcons/pk_fangkuai_shunzi.png');
            }

            this.setItemArray (itemArray, index, icon);
        }

        return itemArray;
    }

    getShunZiItemArray() {
        let itemArray = [];
        let icon = null;
        for (let index = 0; index < 12; index++) {
            switch (index.toString()) {
                case '0':
                    icon = require('../../../../images/pokerIcons/pk_123.png');
                    break
                case '1':
                    icon = require('../../../../images/pokerIcons/pk_234.png');
                    break
                case '2':
                    icon = require('../../../../images/pokerIcons/pk_345.png');
                    break
                case '3':
                    icon = require('../../../../images/pokerIcons/pk_456.png');
                    break
                case '4':
                    icon = require('../../../../images/pokerIcons/pk_567.png');
                    break
                case '5':
                    icon = require('../../../../images/pokerIcons/pk_678.png');
                    break
                case '6':
                    icon = require('../../../../images/pokerIcons/pk_789.png');
                    break
                case '7':
                    icon = require('../../../../images/pokerIcons/pk_8910.png');
                    break
                case '8':
                    icon = require('../../../../images/pokerIcons/pk_910j.png');
                    break
                case '9':
                    icon = require('../../../../images/pokerIcons/pk_10jq.png');
                    break
                case '10':
                    icon = require('../../../../images/pokerIcons/pk_jqk.png');
                    break
                case '11':
                    icon = require('../../../../images/pokerIcons/pk_qka.png');
            }

            this.setItemArray(itemArray, index, icon);
        }

        return itemArray;
    }

    getTongHuaItemArray() {
        let itemArray = [];
        let icon = null;
        for (let index = 0; index < 4; index++) {
            switch (index.toString()) {
                case '0':
                    icon = require('../../../../images/pokerIcons/pk_center_heitao.png');
                    break
                case '1':
                    icon = require('../../../../images/pokerIcons/pk_center_taoxin.png');
                    break
                case '2':
                    icon = require('../../../../images/pokerIcons/pk_center_meihua.png');
                    break
                case '3':
                    icon = require('../../../../images/pokerIcons/pk_center_fangkuai.png');
            }

            this.setItemArray (itemArray, index, icon);
        }

        return itemArray;
    }

    getBaoXuanItemArray() {
        let itemArray = [];
        let itemName = '';
        let icon = null;
        for (let index = 0; index < 5; index++) {
            switch (index.toString()) {
                case '0':
                    itemName = '对子';
                    icon = require('../../../../images/pokerIcons/pk_duizi.png');
                    break
                case '1':
                    itemName = '豹子';
                    icon = require('../../../../images/pokerIcons/pk_baozi.png');
                    break
                case '2':
                    itemName = '同花';
                    icon = require('../../../../images/pokerIcons/pk_tonghua.png');
                    break
                case '3':
                    itemName = '顺子';
                    icon = require('../../../../images/pokerIcons/pk_shunzi.png');
                    break
                case '4':
                    itemName = '同花顺';
                    icon = require('../../../../images/pokerIcons/pk_tonghuashun.png');
                    break
            }

            this.setItemArray (itemArray, index, icon, itemName);
        }

        return itemArray;
    }

    setItemArray (itemArray, index, icon, itemName) {
        itemArray.push(
            <TCHappyPokerSelectView
                key={index+700}
                titleName={this.state.type}
                itemName={itemName}
                icon={icon}
                number={SingletonDPS.getMathTypeArray()[index]}
            />
        );

        return itemArray;
    }

    setPlayMathWith(mathName) {
        this.props.type = mathName;
        this.setState({type: mathName})
    }

    byShake() {
        if (this.props.shakeEvent == null) return
        this.props.shakeEvent()
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.btnBg,
    },
    topTextContainer: {
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 10,
    },
    topText: {
        fontSize: 14,
        color: '#666666',
    },
    contentContainer: {
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: 'row',
        width: Window.width,
        backgroundColor: 'transparent',
    },
    tonghuaContainer: {
        justifyContent: 'space-around'
    },
});
