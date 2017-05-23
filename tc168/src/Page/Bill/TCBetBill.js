/**
 * Created by Sam on 2016/11/18.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ListView,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    AppState
} from 'react-native';

//系统 npm类
import LoadingSpinnerOverlay from 'react-native-smart-loading-spinner-overlay'
import Toast from '@remobile/react-native-toast';
import Moment from 'moment'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'

//组件内部显示需要引入的类
import TopNavigationBar from '../../Common/View/TCNavigationBar';
import AwardCoundtdownView from './TCBetBillAwardCountdown';
import BillViewButton from './TCBillViewButton';
import TCBetBillListItemView from './TCBetBillListItemView';
import TCBetBillListStyleEdit from './TCBetBillListItemStyleEdit';

import TCBillMultipleBar from './TCBillMultipleBar'
import TCBillKeyboard from  './TCBillKeyboard'
import TCBetBillBottomView from './TCBetBillBottomView'
import {config} from '../../Common/Network/TCRequestConfig';
import NetUitls from '../../Common/Network/TCRequestUitls'

// 外部关系组件 如 页面跳转用

import Helper from '../../Common/JXHelper/TCNavigatorHelper'

import TCBillSucceedPage from './TCBillSucceedPage'

import TCChongQingSSC_DPS from '../Bet/AllPlayingMethodView/ChongQingSSC/data/TCChongQingSSC_DPS'
let SingletonSSC_DPS = new TCChongQingSSC_DPS()

import TCMarkSix_DPS from '../Bet/AllPlayingMethodView/MarkSix/data/TCMarkSix_DPS'
let SingletonMarkSix_DPS = new TCMarkSix_DPS()

import TCShanDong115_DPS from '../Bet/AllPlayingMethodView/ShangDong_11_5/data/TCShanDong115_DPS'
let SingletonShanDong115_DPS = new TCShanDong115_DPS()

import TCBJPK10_DPS from '../Bet/AllPlayingMethodView/BJPK10/data/TCBJPK10_DPS'
let SingletonBJPK10_DPS = new TCBJPK10_DPS()

import TCFC3D_DPS from '../Bet/AllPlayingMethodView/FC_3D/data/TCFC3D_DPS'
let SingletonFC3D_DPS = new TCFC3D_DPS()

import TCKL10F_DPS from '../Bet/AllPlayingMethodView/KL10F/data/TCKL10F_DPS'
let SingletonKL10F_DPS = new TCKL10F_DPS()

import TCPCDD_DPS from '../Bet/AllPlayingMethodView/PCDD/data/TCPCDD_DPS'
let SingletonPCDD_DPS = new TCPCDD_DPS()

import TCSSL_DPS from '../Bet/AllPlayingMethodView/SSL/data/TCSSL_DPS'
let SingletonSSL_DPS = new TCSSL_DPS()

import TC_K3 from '../Bet/AllPlayingMethodView/K3/data/TCK3_DPS'
let SingletonK3_DPS = new TC_K3()

import TC_KLPK from '../Bet/AllPlayingMethodView/HappyPoker/data/TCHappyPoker_DPS'
let SingletonKLPK_DPS = new TC_KLPK()

const {width, height} = Dimensions.get('window')

export default class TCBetBill extends React.Component {
    constructor(state) {
        super(state);
        this.state = {
            // numbersArray: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            numbersArray: [],
            cpInfoData: this.props.cpInfoData
        };
    }

    static defaultProps = {
        title: '',
        gameName: '',
        cpInfoData: null
    };

    componentDidMount() {
        this.upDataUI()
        this.timer2 = setTimeout(() => {
            this.refs['contentScrollView'].scrollTo({x: 0, y: 1, animated: true})
        }, 500)

        AppState.addEventListener('change', this.handleAppStateChange);

        this.listener = RCTDeviceEventEmitter.addListener('goActiveRefreshBill', () => {
            this.getPlanNoDetailRequest()
        })
    }

    componentWillUnmount() {
        this.refs['contentScrollView'].scrollTo({x: 0, y: 0, animated: false})
        this.timer && clearTimeout(this.timer)
        this.timer2 && clearTimeout(this.timer2)
        this.listener.remove()
    }

    /*<ScrollView style={{height: height - 64 - 45 - 60}}>*/
    /*{this.getAllBillList()}*/
    /*</ScrollView>*/

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    title={this.props.title}
                    needBackButton={true}
                    backButtonCall={()=> {
                        this.goBack()
                    }}
                />

                <TCBillKeyboard ref="betBillKeyboard" multipleEventCall={(e)=>this._resetMultipleWith(e)}/>

                <AwardCoundtdownView
                    ref="AwardCountDownView"
                    lotteryNo={this.state.cpInfoData.planNo}
                    awardCountdown={this.state.cpInfoData.stopOrderTimeEpoch}
                    timeOutCallBack={()=> {
                        this.getPlanNoDetailRequest(true)
                    }}
                />
                <View style={styles.upButtonViewStyle}>
                    <BillViewButton title="自选号码" icon="bottom_home1" buttonCallBack={()=>this.addNumbersButtonCall()}/>
                    <BillViewButton title="机选一注" num='1' icon="bottom_home5"
                                    buttonCallBack={(num)=>this.addRandomNumbersButtonCall(num)}/>
                    <BillViewButton title="机选五注" num='5' icon="bottom_home5"
                                    buttonCallBack={(num)=>this.addRandomNumbersButtonCall(num)}/>
                </View>
                <Image key={725389} source={require('image!order_top')}
                       style={{width: width - 20, marginLeft: 10, marginRight: 10, height: 6}} resizeMode='contain'/>

                {/*列表*/}
                {/*<ListView*/}
                {/*enableEmptySections = {true}*/}
                {/*contentContainerStyle={{height: height - 64 - 45 - 60}}*/}
                {/*dataSource={this.state.numbersArray}*/}
                {/*renderRow={(rowData, sectionID, rowID)=>this.renderRow(rowData, sectionID, rowID)}*/}
                {/*removeClippedSubviews={true}*/}
                {/*scrollRenderAheadDistance={20}*/}
                {/*/>*/}


                <ScrollView ref="contentScrollView" style={{height: height - 64 - 49 - 60}}
                            removeClippedSubviews={true}
                            scrollRenderAheadDistance={20}
                >
                    {this.renderRow()}
                </ScrollView>

                {/* 倍投 */}
                {/*<TCBillMultipleBar ref='billMultipleBar' multipleNumber="1" inputEvent={()=>this.showKeyBoard()}/>*/}
                <TCBetBillBottomView ref="TCBetBillBottomView"
                                     leftButtonCallEvent={()=>this.clearButtonCall()}
                                     rightButtonCallEvent={()=>this.payCheck()}/>

                <LoadingSpinnerOverlay
                    ref={ component => this._modalLoadingSpinnerOverLay = component }
                />
            </View>
        );
    }

    renderRow(rowData, sectionID, rowID) {
        // let numbersArray = this.getAllNumbersArray()
        // let index = numbersArray.length - 1 - rowID
        // if (numbersArray[index].length < 1) return
        // let json = numbersArray[index]
        // JXLog('----', json)
        // return <TCBetBillListItemView index={index} jsonData={json} deleteButtonEvent={(e)=>this.deleteOneItem(e)}/>

        let itemArr = []
        let numbersArray = this.getAllNumbersArray()
        for (let i = 0; i < numbersArray.length; i++) {
            let index = numbersArray.length - 1 - i
            if (numbersArray[index].length < 1) return
            let json = numbersArray[index]
            if (this.props.gameName == 'MarkSix'||this.props.gameName == 'PCDD'){
                itemArr.push(<TCBetBillListStyleEdit key={i} index={index} jsonData={json}
                                                     dataSource = {this.getSingletonDataSource()}
                                                     callBackEvent = {()=>this.upDataUI()}
                                                     deleteButtonEvent={(e)=>this.deleteOneItem(e)}/>)

            }else {
                itemArr.push(<TCBetBillListItemView key={i} index={index} jsonData={json}
                                                    deleteButtonEvent={(e)=>this.deleteOneItem(e)}/>)
            }
        }
        if (itemArr.length > 0) {
            itemArr.push(<Image key={725388} source={require('image!order_bottom')}
                                style={{width: width - 40, marginLeft: 20, marginRight: 20, height: 9, marginTop: -1}}
                                resizeMode='contain'/>)
        }else {
            itemArr.push(<Text key={21321} style={{marginLeft:20,marginRight:20,marginTop:100,textAlign:'center',color:'#666666'}}>{' 您没有任何投注 \n 点击 +自选号码 可以返回加注哦'}</Text>)
        }

        return itemArr;
    }

    handleAppStateChange(nextAppState) {
        if (nextAppState === 'active') {
            RCTDeviceEventEmitter.emit('goActiveRefreshBill');
        }
    }

    upDataUI() {
        this.setState({
            // numbersArray: this.state.numbersArray.cloneWithRows(this.getAllNumbersArray())
            numbersArray: this.getAllNumbersArray()
        })

        let DPS = this.getSingletonDataSource()
        if (DPS) {
            {/* 倍投 */
            }
            this.refs.TCBetBillBottomView._resetWithNumbers(DPS._getMultipleNumber(), DPS._getNumberOfUnits(), DPS._getTotalAmount())
            // this.refs.billMultipleBar._resetTextWith(DPS._getMultipleNumber())
        }
    }

    deleteOneItem(index) {
        let DPS = this.getSingletonDataSource()
        if (DPS) {
            DPS.deleteOneItemWithJsonIndex(index)
        }
        this.upDataUI()
    }

    addNumbersButtonCall() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop()
        }
    }

    addRandomNumbersButtonCall(num) {
        let DPS = this.getSingletonDataSource()
        if (DPS) {
            DPS.randomSelect(num)
        }
        this.upDataUI()
    }

    // --------支付---------
    payCheck() {
        let downTime = this.refs['AwardCountDownView']._getAwardCountdownTime()
        if (downTime <= 2) {
            this.payAlert()
        } else {
            this.payButtonCall()
        }
    }

    payAlert() {
        Alert.alert(
            '当期已经封单，\n是否投注到下一期？', null,
            [{
                text: '投注', onPress: () => {
                    this.payButtonCall(true)
                }
            },
                {
                    text: '取消', onPress: () => {
                }
                },
            ])
    }

    payButtonCall(addToNextPlaNo) {
        let postJson = {}
        let numberArray = []

        let DPS = this.getSingletonDataSource()
        if (DPS) {
            numberArray = DPS.getAlreadyNumberArray()
        }
        postJson.betEntries = numberArray

        let surplusTime = this.state.cpInfoData.stopOrderTimeEpoch - Moment().format('X')
        if (surplusTime > 5) {
            addToNextPlaNo = false
        }

        //彩票信息
        postJson.drawIdentifier = {
            "gameUniqueId": this.state.cpInfoData.gameUniqueId,
            "issueNum": addToNextPlaNo ? (1 + this.state.cpInfoData.uniqueIssueNumber) : this.state.cpInfoData.uniqueIssueNumber
        }

        postJson.numberOfUnits = DPS._getNumberOfUnits()

        if (postJson.numberOfUnits > 1000) {
            Alert.alert('您要投注的注数过多，\n请分批投注 谢谢！')
            return
        } else if (postJson.numberOfUnits == 0) {
            Toast.showShortCenter('请您先添加注单后再付款谢谢');
            return
        }


        postJson.totalAmount = DPS._getTotalAmount()

        if (postJson.numberOfUnits > 100 && postJson.totalAmount / postJson.numberOfUnits < 0.1) {
            Alert.alert('投注单数大于100注时, \n单注的金额不能低于0.1元，\n请修改订单后重试 谢谢！')
            return
        }

        postJson.userSubmitTimestampMillis = Moment().format('X')
        postJson.purchaseInfo = {"purchaseType": "ONCE_ONLY"}
        this.freshBalance(postJson)
    }

    payRequest(json) {
        this._modalLoadingSpinnerOverLay.show()
        NetUitls.PostUrlAndParamsAndCallback(config.api.ordercap, json, (data)=> {
            this._modalLoadingSpinnerOverLay.hide()
            if (data && data.rs) {
                RCTDeviceEventEmitter.emit('balanceChange');
                if (this.props.navigator) {
                    this.props.navigator.push({
                        name: 'orderRecord',
                        component: TCBillSucceedPage,
                        passProps: {
                            cpName: this.state.cpInfoData.gameNameInChinese,
                            issue: json.drawIdentifier.issueNum
                        }
                    });
                }
                this.clearData()
            } else {
                let toastString = '投注失败，请检查网络后重试'
                if (data.message) {
                    toastString = data.message
                }
                this.timer = setTimeout(() => {
                    Toast.showShortCenter(toastString);
                }, 500)
            }
        })
    }

    freshBalance(postJson) {
        this._modalLoadingSpinnerOverLay.show()
        NetUitls.getUrlAndParamsAndCallback(config.api.userBalance, null, (response) => {
            if (response.rs) {
                let balance = parseFloat(response.content.balance)
                if (postJson.totalAmount > balance) {
                    this._modalLoadingSpinnerOverLay.hide()
                    this.timer = setTimeout(() => {
                        this.alertToTopUp()
                    }, 500)
                    return
                } else {
                    this.payRequest(postJson)
                }
            } else {
                this._modalLoadingSpinnerOverLay.hide()
                let toastString = '投注失败，请检查网络后重试'
                if (response.message) {
                    toastString = response.message
                }
                this.timer = setTimeout(() => {
                    Toast.showShortCenter(toastString);
                }, 500)
            }
        })
    }

    alertToTopUp() {
        Alert.alert(
            '余额不足,下单失败是否去充值？', null,
            [{
                text: '确定', onPress: () => {
                    Helper.pushToPay()
                }
            },
                {
                    text: '取消', onPress: () => {
                }
                },
            ])
    }


    getPlanNoDetailRequest() {
        NetUitls.getUrlAndParamsAndCallback(config.api.plannodetail, this.props.cpInfoData.gameUniqueId, (data)=> {
            if (data && data.rs && data.content) {
                let cpInfoData = {};
                cpInfoData.gameUniqueId = data.content.current.gameUniqueId
                cpInfoData.uniqueIssueNumber = data.content.current.uniqueIssueNumber
                cpInfoData.gameNameInChinese = data.content.current.gameNameInChinese
                cpInfoData.planNo = data.content.current.planNo
                let openCode = data.content.lastOpen.openCode
                cpInfoData.stopOrderTimeEpoch = data.content.current.stopOrderTimeEpoch
                cpInfoData.lastOpenCode = openCode
                cpInfoData.lastPlanNo = data.content.lastOpen.planNo
                this.setState({cpInfoData: cpInfoData})
                this.refs['AwardCountDownView']._resetDate(cpInfoData.stopOrderTimeEpoch)
            }
        })
    }

    clearButtonCall() {
        this.clearData()
        this.upDataUI()
    }

    clearData() {
        let DPS = this.getSingletonDataSource()
        if (DPS) {
            DPS.clearAllData()
        }
    }

    getAllNumbersArray() {
        let DPS = this.getSingletonDataSource()
        if (DPS) {
            return DPS.getAlreadyNumberArray()
        }
        return []
    }

    getSingletonDataSource() {
        switch (this.props.gameName) {
            case 'SSC' : {
                return SingletonSSC_DPS
            }
                break
            case 'MarkSix' : {
                return SingletonMarkSix_DPS
            }
                break
            case 'D115' : {
                return SingletonShanDong115_DPS
            }
                break
            case 'BJPK10': {
                return SingletonBJPK10_DPS
            }
                break
            case 'FC3D': {
                return SingletonFC3D_DPS
            }
                break
            case 'KL10F': {
                return SingletonKL10F_DPS
            }
                break
            case 'PCDD': {
                return SingletonPCDD_DPS
            }
                break
            case 'SSL': {
                return SingletonSSL_DPS
            }
                break
            case 'K3': {
                return SingletonK3_DPS
            }
                break
            case 'KLPK': {
                return SingletonKLPK_DPS
            }
                break
        }
        return null
    }

    showKeyBoard() {
        var popView = this.refs.betBillKeyboard
        if (popView.state.modalVisible) {
            popView._setModalVisible(false);
        } else {
            popView._setModalVisible(true);
        }
    }

    _resetMultipleWith(multiple) {
        let DPS = this.getSingletonDataSource()
        if (DPS) {
            DPS._setMultipleNumber(multiple)
        }
        this.refs.billMultipleBar._resetTextWith(multiple)
        this.upDataUI()
    }

    goBack() {
        this.props.navigator.pop()
        return
        Alert.alert(
            '退出页面会清空已选注单，\n是否退出？', null,
            [{
                text: '确定', onPress: () => {
                    this.clearData()
                    this.props.navigator.popN(2)
                }
            },
                {
                    text: '取消', onPress: () => {
                }
                },
            ])
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
    },
    upButtonViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    }
});