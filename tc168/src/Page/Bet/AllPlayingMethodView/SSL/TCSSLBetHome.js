/**
 * Created by Sam on 2016/11/12.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Modal,
    Platform,
    Alert
} from 'react-native';

import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import TopNavigationBar from '../../View/TCBetBar'
import NavigatorHelper from '../../../../Common/JXHelper/TCNavigatorHelper'
import TCChongQingSSC from './view/TCSSL_MainView'
import TCSelectPopupView from './view/TCSSLPlayMethodSelectPopupView'
import TCBetBill from '../../../Bill/TCBetBill'
import AwardCoundtdownView from '../../View/TCBetAwardCountdown'
import TCBetHomeBottomView from '../../View/TCBetHomeBottomView'
import Toast from '@remobile/react-native-toast'
import TCBetSettingModal from '../../View/TCBetSettingModal'
import TCBetHelperModal from '../../View/TCBetHelperModal'
import LoadingSpinnerOverlay from 'react-native-smart-loading-spinner-overlay'
import {config} from '../../../../Common/Network/TCRequestConfig'
import NetUitls from '../../../../Common/Network/TCRequestUitls'
import JXHelper from '../../../../Common/JXHelper/JXHelper'
import JXGSBQWView from './view/TCSSLPositionView'

import Moment from 'moment'
import TCBetGoBackShoppingCart from '../../View/TCBetGoBackShoppingCart'
import TCBetShakeButtonView from '../../View/TCBetShakeButtonView'
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

import TCChongQingSSC_DPS from './data/TCSSL_DPS'
let SingletonDPS = new TCChongQingSSC_DPS()

let myPlayMath = '';
let myGameSetting = null

export default class TCBetHome extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            selectedType: null,
            showGSBQW:false,
            showGSBQWArr:[]
        }
        this.helperJumpTo = this.helperJumpTo.bind(this);
    }

    static defaultProps = {
        gameUniqueId: '',
        cp_playMath: '三星-直选复式',
        unit_price: 2
    }

    componentDidMount() {

        this.clearSelectedNumbers()
        myPlayMath = this.props.cp_playMath
        SingletonDPS.resetPlayGameUniqueId(this.props.gameUniqueId)
        SingletonDPS.resetPlayMath(myPlayMath)

        this.listener = RCTDeviceEventEmitter.addListener('numberCall', (areaIndex, number, isAdd) => {
            if (isAdd) {
                SingletonDPS.addNumberWithType(areaIndex, number);
            } else {
                SingletonDPS.removeNumberWithType(areaIndex, number);
            }
           this.refreshBottomView()
        })
        this.loadDataFormNet()
        this.checkGameSetting()
    }

    componentWillUnmount() {
         this.listener&&this.listener.remove()
    }

    refreshBottomView(){
        let str = SingletonDPS.getAllJSon()
        let count = SingletonDPS.getNumberOfUnits(myPlayMath)
        let price = count * this.props.unit_price
        let bottomView = this.refs.TCBetHomeBottomView
        bottomView.resetWithNumbers(str, count, price)
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
            if (gameInfo) {
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

                if (data.content.lastOpen) {
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
                // this.setState({cpInfoData: gameInfo})
                Toast.showShortCenter('网络异常，请检查网络后重试');
            }
        })
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

                    title={SingletonDPS.config.getPlayMathNameWithIndex(0,0)}
                />


                <TCSelectPopupView
                    ref='TCSelectPopupView'
                    selectTitleArr={this.initialPlayMath()}
                    secondAreaTitleArr={this.initialPlayMatnItem()}
                    selectTitle={true}
                    selectedFunc={(parentIndex, itemIndex) => {
                        this.choosePlayType(parentIndex, itemIndex)
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
                    timeOutCallBack={()=> {
                        this.getPlanNoDetailRequest(true)
                    }}
                />

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TCBetShakeButtonView style={{position: 'absolute', top: 0}} shakeEvent={()=>this.byShake()}/>
                    {this.getShoppingCartView()}
                </View>

                <View style={{height: (Platform.OS == 'ios' ? (height - 64 - 70 - 49-(this.state.showGSBQW?40:0)-32) : (height - 64 - 70 - 49-(this.state.showGSBQW?40:0) -32))}}>
                    <ScrollView ref="contentScrollView">{this.initialContentView()}</ScrollView>
                </View>

                {this.getGSBQW()}

                <TCBetHomeBottomView ref="TCBetHomeBottomView"
                                     leftButtonCallEvent={()=>this.randomSelect()}
                                     rightButtonCallEvent={()=>this.checkNumbers()}
                                     clearButtonCallEvent={()=>this.clearSelectedNumbers()}
                />
                <TCBetSettingModal ref='betSettingModal' settingEndingEvent={(e)=>this.betSetEndingEvent(e)}/>
                <LoadingSpinnerOverlay ref={ component => this._modalLoadingSpinnerOverLay = component }/>
            </View>
        )
    }

    getGSBQW(){
        let checkList = SingletonDPS.config.getWhetherNeedShowGSBQW(myPlayMath)
        if (this.state.showGSBQW){
            return (<JXGSBQWView ref="GSBQW" style={{overflow:this.state.showGSBQW?'visible':'hidden'}} checkedList={checkList} positionArr={SingletonDPS.config.Position} checkedChangeCallback={(e)=>this.GSBQWChange(e)}/>)
        }else {

        }
    }

    //初始化玩法号码选择
    initialContentView() {
        return <TCChongQingSSC ref='TCChongQingSSC' shakeEvent={()=>this.byShake()}/>
    }

    //初始化子玩法选择
    initialPlayMatnItem() {
        return SingletonDPS.config.PlayMathItemType
    }


    //初始化玩法选择器
    initialPlayMath() {
        return SingletonDPS.config.PlayMathType
    }

    //玩法选择切换
    choosePlayType(parentIndex, itemIndex) {
        let platMath = SingletonDPS.config.getPlayMathNameWithIndex(parentIndex,itemIndex);
        if (myPlayMath == platMath) return

        this.refs['contentScrollView'].scrollTo({x: 0, y: 0, animated: false})

        myPlayMath = platMath
        SingletonDPS.resetPlayMath(platMath)

        let contentView = this.refs['TCChongQingSSC']
        contentView.setPlayMathWith(platMath)

        let playMathName = platMath

        let navBar = this.refs['TopNavigationBar']
        navBar.setTitle(playMathName.replace('大小单双-',''))

        var popView = this.refs['TCSelectPopupView']
        popView._setModalSelectedIndex(parentIndex, itemIndex)

        this.clearSelectedNumbers()
    }

    GSBQWChange(checkList){
        SingletonDPS.resetGSBQW(checkList)
        this.refreshBottomView()
    }

    checkNumbers() {
        if (!NavigatorHelper.checkUserWhetherLogin()) {
            NavigatorHelper.pushToUserLogin()
            return
        }
        let res = SingletonDPS.getNumberOfUnits(myPlayMath)
        if (res == 0) {
            //验证未通过
            Toast.showShortCenter('号码选择有误')
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
        let betSettingView = this.refs['betSettingModal']
        betSettingView._setModalVisibleAndOddsAndMaxRebateAndNumberOfUnits(true,
            prizeSettings['prizeSettings'][0]['prizeAmount'],
            prizeSettings['ratioOfReturnAmount'] * 100,
            SingletonDPS._getNoAddNumberOfUnits())
    }

    betSetEndingEvent(json) {
        SingletonDPS.addNumbersDicToArray(json.odds, json.unitPrice, json.rebate)
        this.pushToBetBill()
    }

    pushToBetBill() {
        this.clearSelectedNumbers()
        let {navigator} = this.props
        if (navigator) {
            navigator.push({
                name: 'detail',
                component: TCBetBill,
                passProps: {
                    title: this.props.title,
                    gameName: 'SSL',
                    gameUniqueId: this.props.gameUniqueId,
                    cpInfoData: this.state.cpInfoData
                }
            })
        }
        this.refs['contentScrollView'].scrollTo({x: 0, y: 0, animated: false})
    }

    byShake() {
        this.clearSelectedNumbers()
        let tempDic = SingletonDPS._getRandomNumber()
        JXLog('shake = ' + JSON.stringify(tempDic))
        for (let ite in tempDic) {
            let tempArr = tempDic[ite]
            for (let i = 0; i < tempArr.length; i++) {
                RCTDeviceEventEmitter.emit('randomSelectedNumber', ite, tempArr[i]);
            }
        }
    }

    clearSelectedNumbers() {
        let checkList = SingletonDPS.config.getWhetherNeedShowGSBQW(myPlayMath)
        this.setState({showGSBQW:checkList})
        if (this.refs['GSBQW']){
            this.refs['GSBQW']._resetCheked(checkList)
        }
        SingletonDPS.resetGSBQW(checkList)


        SingletonDPS.clearCurrentSelectData()
        let contentView = this.refs.TCChongQingSSC
        RCTDeviceEventEmitter.emit('TCChongQing_numberSelectView_clear');
        let bottomView = this.refs.TCBetHomeBottomView
        bottomView.resetWithNumbers('', '0', '0')
    }

    showPopView() {
        var popView = this.refs.TCSelectPopupView
        if (popView.state.modalVisible) {
            popView._setModalVisible(false)
        } else {
            popView._setModalVisible(true)
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

    getShoppingCartView(){
        if (SingletonDPS.getAlreadyNumberArray().length>0){
            return (<TCBetGoBackShoppingCart style={{position: 'absolute', top: 0}} cc={SingletonDPS.getAlreadyNumberArray().length} shakeEvent={()=>this.pushToBetBill()}/>)
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2'
    },
});