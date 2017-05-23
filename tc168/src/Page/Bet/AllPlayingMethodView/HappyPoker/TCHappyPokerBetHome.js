
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Platform,
    ScrollView,
    Alert
} from 'react-native';

//系统 npm类
import Toast from '@remobile/react-native-toast';
import LoadingSpinnerOverlay from 'react-native-smart-loading-spinner-overlay'
import Moment from 'moment'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'

//组件内部显示需要引入的类
import TopNavigationBar from '../../View/TCBetBar'
import TCHappyPoker_MainView from './view/TCHappyPoker_MainView'
import TCSelectPopupView from '../../View/TCPlayMethodSelectPopupView'
import AwardCoundtdownView from '../../View/TCBetAwardCountdown'
import TCBetHomeBottomView from '../../View/TCBetHomeBottomView'
import TCBetSettingModal from '../../View/TCBetSettingModal'
import TCBetHelperModal from '../../View/TCBetHelperModal'
import TCBetGoBackShoppingCart from '../../View/TCBetGoBackShoppingCart'
import TCBetShakeButtonView from '../../View/TCBetShakeButtonView'

// 外部关系组件 如 页面跳转用
import TCBetBill from '../../../Bill/TCBetBill'
import HappyPokerDPS from './data/TCHappyPoker_DPS'
import NavigatorHelper from '../../../../Common/JXHelper/TCNavigatorHelper'
import {config} from '../../../../Common/Network/TCRequestConfig'
import NetUitls from '../../../../Common/Network/TCRequestUitls'
import JXHelper from '../../../../Common/JXHelper/JXHelper'

let SingletonDPS = new HappyPokerDPS()
let myPlayMath = '';
var {height} = Dimensions.get('window');
let myGameSetting = null

export default class TCHappyPokerBetHome extends React.Component {
    constructor(state) {
        super(state);
        this.state = {
            cpInfoData: {}
        };
        this.helperJumpTo = this.helperJumpTo.bind(this);
    }

    static defaultProps = {
        cp_playMath: '包选',
        unit_price: 2,
        gameUniqueId: ''
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    ref='TopNavigationBar'
                    backButtonCall={()=> {
                        this.goBack()
                    }}
                    centerButtonCall={()=> {
                        this.showPopView()
                    }}
                    rightButtonCall={ () => {
                        this.refs['TCBetHelperModal']._setModalVisible(true)
                    } }
                    title={this.props.cp_playMath}
                />
                <TCSelectPopupView
                    ref='TCSelectPopupView'
                    selectTitleArr={this.initialPlayMath()}
                    selectedFunc={(index, areaIndex) => {
                       this.choosePlayType(index, areaIndex)
                    }}
                />
                <TCBetHelperModal
                    ref="TCBetHelperModal"
                    selectedFunc={this.helperJumpTo}
                    gameUniqueId={this.props.gameUniqueId}
                />
                <AwardCoundtdownView
                    ref="AwardCountDownView"
                    cpInfoData={this.state.cpInfoData}
                    isHappyPoker={true}
                    timeOutCallBack={()=> {
                        this.getPlanNoDetailRequest(true)
                    }}
                />

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TCBetShakeButtonView style={{position: 'absolute', top: 0}} shakeEvent={()=>this.byShake()}/>
                    {this.getShoppingCartView()}
                </View>

                <View style={{height: (Platform.OS == 'ios' ? (height - 64 - 70 - 49 -32) : (height - 64 - 70 - 49 -32))}}>
                    <ScrollView ref="contentScrollView">{this.initialContentView()}</ScrollView>
                </View>
                <TCBetHomeBottomView ref="TCBetHomeBottomView"
                                     leftButtonCallEvent={()=>this.randomSelect()}
                                     rightButtonCallEvent={()=>this.checkNumbers()}
                                     clearButtonCallEvent={()=>this.clearSelectedNumbers()}
                />
                <TCBetSettingModal ref='betSettingModal' settingEndingEvent={(e)=>this.betSetEndingEvent(e)}/>
                <LoadingSpinnerOverlay
                    ref={ component => this._modalLoadingSpinnerOverLay = component }
                />
            </View>
        )
    }

    getShoppingCartView(){
        if (SingletonDPS.getAlreadyNumberArray().length>0){
            return (<TCBetGoBackShoppingCart style={{position: 'absolute', top: 0}} cc={SingletonDPS.getAlreadyNumberArray().length} shakeEvent={()=>this.pushToBetBill()}/>)
        }
    }

    componentDidMount() {
        this.clearSelectedNumbers()

        myPlayMath = this.props.cp_playMath
        SingletonDPS.resetPlayGameUniqueId(this.props.gameUniqueId)
        SingletonDPS.resetPlayMath(myPlayMath)

        this.listener = RCTDeviceEventEmitter.addListener('HappyPokerNumberCall', (number, isAdd) => {
            if (isAdd) {
                SingletonDPS.addNumberWithType(number)
            } else {
                SingletonDPS.removeNumberWithType(number)
            }
            let str = SingletonDPS.getAllJSon()

            let count = SingletonDPS.getNumberOfUnits(myPlayMath)
            let price = count * this.props.unit_price
            let bottomView = this.refs['TCBetHomeBottomView']
            bottomView.resetWithNumbers(str, count, price)
        })
        this.loadDataFormNet()
        this.checkGameSetting()
    }

    componentWillUnmount() {
        this.listener&& this.listener&&this.listener.remove()
    }

    loadDataFormNet() {
        this.getPlanNoDetailRequest()
    }

    helperJumpTo = (index) => {
        if (index == 0) {
            NavigatorHelper.pushToOrderRecord()
        } else if (index == 1) {
            NavigatorHelper.pushToLotteryHistoryList(this.props.title,this.props.gameUniqueId,true)
        } else if (index == 2) {
           let gameInfo = JXHelper.getGameInfoWithUniqueId(this.props.gameUniqueId)
            if (gameInfo){
                NavigatorHelper.pushToWebView(gameInfo['guideUrl'])
           }
        }
    }

    async checkGameSetting() {
        await  storage.load({
            key: 'TCGameSetting',
        }).then(res => {
            if (res) {
                myGameSetting = res.content['allGamesPrizeSettings'][this.props.gameUniqueId]
            }
        }).catch(err => {

        })
    }

    getPlanNoDetailRequest(dontShowLoading) {
        if (!dontShowLoading) {
            this._modalLoadingSpinnerOverLay.show()
        }
        NetUitls.getUrlAndParamsAndCallback(config.api.plannodetail, this.props.gameUniqueId, (data)=> {
            this._modalLoadingSpinnerOverLay.hide()
            if (data && data.rs && data.content) {
                let cpInfoData = {};

                cpInfoData.gameUniqueId = data.content.current.gameUniqueId
                cpInfoData.uniqueIssueNumber = data.content.current.uniqueIssueNumber
                cpInfoData.gameNameInChinese = data.content.current.gameNameInChinese
                cpInfoData.planNo = data.content.current.planNo
                cpInfoData.surplus = data.content.current.stopOrderTimeEpoch - Moment().format('X')
                cpInfoData.stopOrderTimeEpoch = data.content.current.stopOrderTimeEpoch

                if (data.content.lastOpen){
                    let openCode = data.content.lastOpen.openCode
                    if (openCode) {
                        openCode = openCode.replace(/,/g, ' ')
                    } else {
                        openCode = ' 等待开奖'
                    }
                    cpInfoData.lastOpenCode = openCode
                    cpInfoData.lastPlanNo = data.content.lastOpen.planNo
                }

                this.setState({cpInfoData: cpInfoData})
                this.refs['AwardCountDownView']._resetDate(cpInfoData.surplus)

            } else {
                this.setState({cpInfoData: gameInfo})
                Toast.showShortCenter('网络异常，请检查网络后重试');
            }
        })
    }

    //初始化玩法号码选择
    initialContentView() {
        return <TCHappyPoker_MainView ref='TCHappyPoker_MainView' shakeEvent={()=>this.byShake()}/>
    }

    //初始化玩法选择器
    initialPlayMath() {
        return SingletonDPS.config.PlayType
    }

    //玩法选择切换
    choosePlayType(index, areaIndex) {
        let platMath = SingletonDPS.config.getPlayMathNameWithIndex(index);
        if (myPlayMath == platMath) return
        myPlayMath = platMath;
        SingletonDPS.resetPlayMath(platMath);

        let contentView = this.refs['TCHappyPoker_MainView']
        contentView.setPlayMathWith(platMath)

        let navBar = this.refs['TopNavigationBar']
        navBar.setTitle(platMath)

        var popView = this.refs['TCSelectPopupView']
        popView._setModalSelectedIndex(index, areaIndex)
        this.clearSelectedNumbers()
    }

    checkNumbers() {
        if (!NavigatorHelper.checkUserWhetherLogin()) {
            NavigatorHelper.pushToUserLogin()
            return
        }
        let res = SingletonDPS.getNumberOfUnits(myPlayMath)
        if (res == 0) {
            //验证未通过
            Toast.showShortCenter('号码选择有误');
            return
        }
        this.showBetSettingModal()
    }

    showBetSettingModal() {
        if (!myGameSetting) {
            Toast.showShortCenter('玩法异常，请切换其他玩法');
            return
        }
        let prizeSettings = myGameSetting['singleGamePrizeSettings'][SingletonDPS.getmyMathTypeID()]
        if (!prizeSettings) {
            Toast.showShortCenter('玩法异常，请切换其他玩法');
            return
        }

        let odds = 0;
        if (SingletonDPS.getmyMathType() == '包选') {
            let selectedNumbers = SingletonDPS.getWillAddNumbers();
            let prizeSetting = prizeSettings['prizeSettings'];
            for (let i = 0; i < selectedNumbers.length; i++) {
                for (let j = 0; j< prizeSetting.length; j++) {
                    if (selectedNumbers[i] == prizeSetting[j]['prizeNameForDisplay']) {
                        if (odds < prizeSetting[j]['prizeAmount']) {
                            odds = prizeSetting[j]['prizeAmount']
                        }
                        break;
                    }
                }
            }
        } else {
            odds = prizeSettings['prizeSettings'][0]['prizeAmount'];
        }
        
        let betSettingView = this.refs['betSettingModal']
        betSettingView._setModalVisibleAndOddsAndMaxRebateAndNumberOfUnits(true,
            odds,
            prizeSettings['ratioOfReturnAmount'] * 100,
            SingletonDPS._getNoAddNumberOfUnits())
    }

    betSetEndingEvent(json) {
        SingletonDPS.addNumbersDicToArray(json.odds, json.unitPrice, json.rebate)
        this.pushToBetBill()
    }

    pushToBetBill() {
        this.clearSelectedNumbers()
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'detail',
                component: TCBetBill,
                passProps: {
                    title: this.props.title,
                    gameName: 'KLPK',
                    cpInfoData: this.state.cpInfoData
                }
            })
        }

        this.refs['contentScrollView'].scrollTo({x:0,y:0,animated:false})
    }

    clearSelectedNumbers() {
        SingletonDPS.clearCurrentSelectData()
        RCTDeviceEventEmitter.emit('HappyPokerNumberCall_clear');
        let bottomView = this.refs['TCBetHomeBottomView']
        bottomView.resetWithNumbers('', '0', '0')
    }

    showPopView() {
        var popView = this.refs['TCSelectPopupView']
        if (popView.state.modalVisible) {
            popView._setModalVisible(false,);
        } else {
            popView._setModalVisible(true);
        }
    }

    randomSelect() {
        if (!NavigatorHelper.checkUserWhetherLogin()) {
            NavigatorHelper.pushToUserLogin()
            return
        }
        SingletonDPS.randomSelect(1)
        this.pushToBetBill()
    }

    byShake() {
        this.clearSelectedNumbers()
        let tempArr = SingletonDPS._getRandomNumber();

        for (let i = 0; i < tempArr.length; i++) {
            RCTDeviceEventEmitter.emit('randomHappyPokerSelectedNumber', tempArr[i]);
        }
    }

    goBack() {
        if (SingletonDPS.getAlreadyNumberArray().length > 0) {
            Alert.alert(
                '退出页面会清空已选注单，\n是否退出？', null,
                [{
                    text: '确定', onPress: () => {
                        SingletonDPS.clearAllData()
                        this.props.navigator.pop()
                    }
                },
                    {
                        text: '取消', onPress: () => {
                    }
                    },
                ])
        }else {
            this.props.navigator.pop()
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEE',
    }
});