'use strict'
/**
 * 每注订单详情
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import  TimerMixin from 'react-timer-mixin'
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
import BaseComponent from '../../../Page/Base/TCBaseComponent'
import Helper from '../../../Common/JXHelper/TCNavigatorHelper'
import JXHelper from '../../../Common/JXHelper/JXHelper'
import Toast from '@remobile/react-native-toast'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'

import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    Clipboard,
} from 'react-native';
var {width, height} = Dimensions.get('window');
import TCUserOrderBetList from './TCUserOrderBetList'
import HappyPokerHelper from '../../../Common/JXHelper/HappyPokerHelper'

let happyPoker = new HappyPokerHelper()

export  default  class TCUserOrderDetail extends BaseComponent {

    constructor(props) {
        super(props)
    }

    static defaultProps = {};

    componentDidMount() {
        super.componentDidMount()
        this.timer = setTimeout(() => {
            this.setState({renderPlaceholderOnly: false});
        }, 500)
    }

    componentWillUnmount() {
        super.componentWillUnmount()
        this.timer && clearTimeout(this.timer);
    }

    render() {
        let sp = super.render()
        if (sp) return sp;
        let {orderData, orderInfo} = this.props
        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={'彩票详情'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.props.navigator.pop()
                    }}
                />

                <View style={styles.topItemStyle}>
                    <Image source={{uri: this.getIcon(orderInfo.gameUniqueId)}} style={styles.topImgStyle}/>
                    <View style={styles.topTitleStyle}>
                        <View style={styles.topTitleItemStyle}>
                            <Text style={styles.titleTxtStyle}>{orderInfo.gameNameInChinese}(<Text style={styles.openTimeStyle}>{orderData.gameMethodInChinese }</Text>)</Text>
                        </View>
                        <View style={{marginLeft:5}}>
                            <Text style={styles.openTimeStyle}>第 {orderInfo.gameIssueNo} 期</Text>
                            <View style={styles.topTitleItemStyle}>
                                <Text style={styles.grayTxtStyle}>开奖号码：</Text>
                                {this.getDrawNumberContent(orderInfo)}
                            </View>
                        </View>
                    </View>
                </View>
                <ScrollView style={{flex: 1}}>
                    <View style={styles.orderTitleStyle}>
                        <View style={styles.titleIconStyle}></View><Text style={styles.titleTxtStyle}>订单内容</Text>
                    </View>
                    <View style={styles.orderContentStyle}>

                        <View style={styles.orderRowStyle}>
                            <Text style={styles.orderLeftTxtStyle}>{'订单号    '}</Text>
                            <Text style={styles.orderRightTxtStyle}>{this.formatOrderId(orderInfo.transactionTimeuuid)}</Text>

                            <TouchableOpacity onPress={()=> {
                                this.onCopy(orderInfo.transactionTimeuuid)
                            }}>
                                <View style={styles.itemBtnStyle}>
                                    <Text style={styles.itemBtnTxtStyle}>复制</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.orderRowStyle}>
                            <Text style={styles.orderLeftTxtStyle}>投注金额</Text>
                            <Text style={styles.orderRightTxtStyle}>{(orderData.bettingAmount).toFixed(2)} 元</Text>
                        </View>
                        <View style={styles.orderRowStyle}>
                            <Text style={styles.orderLeftTxtStyle}>投注注数</Text>
                            <Text style={styles.orderRightTxtStyle}>{orderData.totalUnits} 注</Text>
                        </View>
                        <View style={styles.orderRowStyle}>
                            <Text style={styles.orderLeftTxtStyle}>投注返水</Text>
                            <Text style={styles.orderRightTxtStyle}>{orderData.returnMoneyRatio ? (orderData.returnMoneyRatio * orderData.bettingAmount).toFixed(2) : 0.00} 元</Text>
                        </View>
                        <View style={styles.orderRowStyle}>
                            <Text style={styles.orderLeftTxtStyle}>投注时间</Text>
                            <Text style={styles.orderRightTxtStyle}>{orderInfo.bettingTime}</Text>
                        </View>
                        <View style={styles.orderRowStyle}>
                            <Text style={styles.orderLeftTxtStyle}>是否中奖</Text>
                            <Text style={styles.orderRightTxtStyle}>{this.getOrderState(orderData)}</Text>
                        </View>
                    </View>

                    <View style={styles.orderBtmTitleStyle}>

                        <View style={styles.topTitleItemStyle}>
                            <View style={styles.titleIconStyle}></View>
                            <Text style={styles.titleTxtStyle}>投注号码</Text>
                        </View>
                        <TCUserOrderBetList
                            style={styles.listStyles}
                            ordeBetList={orderData.perBetUnits}
                            orderMoney={orderData.perBetUnit}
                            orderState={orderData.transactionState}
                        />
                        {/*   <Text style={styles.orderLeftTxtStyle}>{orderData.betString }</Text>*/}

                    </View>
                </ScrollView>

                <View style={styles.bottomStyle}>
                    <TouchableOpacity
                        style={styles.bottomBarButtonStyle}
                        onPress={()=> {
                            this.gotoOrderBet()
                        }}
                    >
                        <Text style={{color: 'white', fontWeight: 'bold'}}>
                            再来一注
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        );

    };

    getOrderState(orderData) {
        switch (orderData.transactionState) {
            case 'PENDING':
                return '待开奖'
            case 'WIN':
                return (<Text style={{color: Color.text.red1}}>中{(orderData.winningAmount).toFixed(2)}元</Text>)
            case 'LOSS':
                return '未中奖'
        }
    }

    getIcon(gameId) {
        let gameInfo = JXHelper.getGameInfoWithUniqueId(gameId)
        if (gameInfo === null) {
            return 'icon_cp_3'
        }
        return gameInfo.gameIconUrl
    }

    gotoOrderBet() {
        Helper.popToTop()
        RCTDeviceEventEmitter.emit('setSelectedTabNavigator', 'shoping');
        return
        let {orderInfo} =this.props
        let data = {gameUniqueId: orderInfo.gameUniqueId, gameNameInChinese: orderInfo.gameNameInChinese}
        // Helper.pushToBetHome(data)
    }

    getDrawNumberContent(orderInfo) {
        if(orderInfo.gameUniqueId == 'HF_LFKLPK' && orderInfo && orderInfo.drawNumber) {
            let drawNumbers = orderInfo.drawNumber.split("|");
            return(
                <View style={styles.drawNumberContainer}>
                    {happyPoker.getOpenCodeView(drawNumbers, true, true)}
                </View>
            );
        } else {
            return (
                <Text style={styles.redTxtStyle}>{orderInfo.drawNumber ? orderInfo.drawNumber : '未开奖'}</Text>
            );
        }
    }

    formatOrderId(orderId) {
        return orderId.substr(0, 6) + ' ****** ' + orderId.substr(orderId.length - 5, orderId.length)
    }

    onCopy(text) {
        Clipboard.setString(text);
        Toast.showShortCenter("已复制！")
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    bottomBarButtonStyle: {
        backgroundColor: Color.bg.red,
        justifyContent: 'center',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
        width: width * 0.8,
        marginTop: 20,
    },
    topItemStyle: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomColor: Color.bg.mainBg,
        borderBottomWidth: 0.5,
        paddingBottom: 10
    },
    topImgStyle: {
        width: width>=360?60:40,
        height: width>=360?60:40,
        margin: 5
    },
    bottomStyle: {
        alignItems: 'center',
        paddingTop: 10,
        marginBottom: 10
    },
    topTitleStyle: {
        flexDirection: 'column',
        flex: 1
    },
    topTitleItemStyle: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
    },
    orderContentStyle: {
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingTop: 5
    }, orderTitleStyle: {
        backgroundColor: 'white',
        paddingLeft: 20,
        marginTop: 20,
        flexDirection: 'row',
    }, titleTxtStyle: {
        color: 'black',
        fontSize: 18,
        paddingLeft: 5
    }, openTimeStyle: {
        color: '#666666',
        fontSize: 16,
        marginTop: 6,
    }, orderLeftTxtStyle: {
        color: '#666666',
        fontSize: 16,
        paddingLeft: 10,
        paddingTop: 5,
    },
    orderRightTxtStyle: {
        color: 'black',
        fontSize: Size.default,
        paddingLeft: 10,
        paddingTop: 5,
    },
    orderBtmTitleStyle: {
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingTop: 20,
        paddingRight: 20,
        flex: 1
    }, orderRowStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 20
    }, redTxtStyle: {
        color: Color.text.red1
    }, grayTxtStyle: {
        color: Color.text.grey2
    }, titleIconStyle: {
        backgroundColor: Color.bg.red,
        width: 6,
        height: 20
    }, itemBtnStyle: {
        paddingLeft: width>=360?20:2
    }, itemBtnTxtStyle: {
        color: Color.text.blue1,
        textAlign: 'center',
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
        borderWidth: 1,
        borderColor: Color.text.blue1,
        borderRadius: 5,
    }, listStyles: {
        marginTop: 10
    },
    drawNumberContainer: {
        flexDirection: 'row',
    },
});