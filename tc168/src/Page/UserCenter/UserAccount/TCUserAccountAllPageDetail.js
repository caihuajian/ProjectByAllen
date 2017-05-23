'use strict'
/**
 * 账户明细
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import  TimerMixin from 'react-timer-mixin'
import LoadingSpinnerOverlay from 'react-native-smart-loading-spinner-overlay'
import  dismissKeyboard from 'dismissKeyboard';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    TextInput,
    ListView,
    Clipboard
} from 'react-native';

import Moment from 'moment'
import Toast from '@remobile/react-native-toast'
import BackBaseComponent from '../../Base/TCBaseBackComponent'
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
export  default  class TCUserAccountAllPageDetail extends BackBaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            orderData: this.props.orderData
        };
    }

    static defaultProps = {};


    componentDidMount() {
        super.componentDidMount()
    }

    componentWillUnmount() {
        super.componentWillUnmount()
    }

    render() {
        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={'账单详情'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.props.navigator.pop()
                    }}
                />

                <View>
                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitleStyle}>订单号：</Text>
                        <Text selectable={true}
                              style={styles.itemContentStyle}>{this.formatOrderId(this.state.orderData.crossReferenceId)}

                        </Text>
                        <TouchableOpacity onPress={()=> {
                            this.onCopy(this.state.orderData.crossReferenceId)
                        }}>
                            <View style={styles.itemBtnStyle}>
                                <Text style={styles.itemBtnTxtStyle}>复制</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitleStyle}>类型：</Text>
                        <Text style={styles.itemContentStyle}>{this.getType()}</Text>
                    </View>

                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitleStyle}>收入：</Text>
                        {this.getBalance()}
                    </View>

                    {/*   <View style={styles.itemStyle}>
                     <Text style={styles.itemTitleStyle}>支付方式：</Text>
                     <Text style={styles.itemContentStyle}>{this.getPayType()}</Text>
                     </View>*/}

                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitleStyle}>时间：</Text>
                        <Text
                            style={styles.itemContentStyle}>{Moment.unix(this.props.orderData.createdTime).format("YYYY-MM-DD HH:mm:ss")}</Text>
                    </View>

                    {/*     <View style={styles.itemStyle}>
                     <Text style={styles.itemTitleStyle}>余额：</Text>
                     <Text style={styles.itemContentStyle}>2888.00元</Text>
                     </View>*/}
                </View>
            </View>
        );

    };

    formatOrderId(orderId) {
        return orderId.substr(0, 6) + ' ****** ' + orderId.substr(orderId.length - 5, orderId.length)
    }

    onCopy(text) {
        Clipboard.setString(text);
        Toast.showShortCenter("已复制！")
    }

    getType() {
        let type = this.props.orderData.moneyOperationType
        let marks = this.props.orderData.remarks
        switch (type) {
            case 'WITHDRAW':
                return '提现'
            case 'TOPUP':
                return '充值'
            case 'WIN':
                if (marks === 'WIN') {
                    return '中奖'
                }
                else if (marks === 'REBATE') {
                    return '返水'
                } else {
                    return '中奖及返水'
                }
            case 'CHARGE':
                return '购彩'
            case 'TOPUP_FOR_CANCEL_WITHDRAWAL':
                return '取消提现'
        }
    }

    getBalance() {
        let type = this.props.orderData.moneyOperationType
        let balance = this.props.orderData.delta
        if (type === 'WITHDRAW' || type === 'CHARGE') {
            return (<Text style={styles.itemGreenTxt}>{'- ' + (balance).toFixed(2)}</Text>)
        } else if (type === 'TOPUP' || type === 'WIN'||type == 'TOPUP_FOR_CANCEL_WITHDRAWAL') {
            return (<Text style={styles.itemRedTxt}>{'+ ' + (balance).toFixed(2)}</Text>)

        }
    }

    getPayType() {
        let payType = this.state.orderData.subType
        if (payType === 'BANK_TRANSFER_TOPUP') {
            return '银行存款'
        } else if (payType === 'BANK_TRANSFER_WITHDRAWAL') {
            return '银行取款'
        } else if (payType === 'WECHAT_TOPUP') {
            return '微信'
        } else if (payType === 'ALIPAY_TOPUP') {
            return '支付宝'
        } else if (payType === 'THRIDPARTY_TOPUP') {
            return '第三方支付'
        }
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
    },
    itemStyle: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 15,
        marginTop: 1,
        alignItems:'center'
    }, itemTitleStyle: {
        fontSize: 18
    }, itemContentStyle: {
        fontSize: Size.small,
    }, itemGreenTxt: {
        fontSize: 18,
        color: Color.text.green
    }, itemRedTxt: {
        fontSize: 18,
        color: 'red'
    }, itemBtnStyle: {
        paddingLeft: 20
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
    }
});