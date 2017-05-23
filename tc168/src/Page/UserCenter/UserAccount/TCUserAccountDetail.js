'use strict'
/**
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
import Toast from '@remobile/react-native-toast'
import Moment from 'moment'
import BackBaseComponent from '../../Base/TCBaseBackComponent'
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
export  default  class TCUserAccoutnDetail extends BackBaseComponent {

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
                        <Text
                            style={styles.itemContentStyle}>{this.formatOrderId(this.state.orderData.transactionId)}</Text>
                        <TouchableOpacity onPress={()=> {
                            this.onCopy(this.state.orderData.transactionId)
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

                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitleStyle}>支付方式：</Text>
                        <Text style={styles.itemContentStyle}>{this.getPayType()}</Text>
                    </View>

                    <View style={styles.itemStyle}>
                        <Text style={styles.itemTitleStyle}>时间：</Text>
                        <Text style={styles.itemContentStyle}>{this.getTime()}</Text>
                    </View>

                    {/*     <View style={styles.itemStyle}>
                     <Text style={styles.itemTitleStyle}>余额：</Text>
                     <Text style={styles.itemContentStyle}>2888.00元</Text>
                     </View>*/}
                </View>
            </View>
        );

    };

    getTime() {
        return Moment(this.state.orderData.createTime).format("YYYY-MM-DD HH:mm:ss")
    }

    getType() {
        let type = this.state.orderData.type
        let subType = this.state.orderData.subType
        let manualOperatorType = this.state.orderData.manualOperatorType
        if (subType === 'MANUAL_TOPUP' || subType === 'MANUAL_WITHDRAWAL') {
            switch (manualOperatorType) {
                case 'TOPUP_PREFERENTIAL':
                    return '充值优惠'
                case 'REGISTER_PREFERENTIAL':
                    return '注册优惠'
                case 'WITHDRAWAL_ERROR':
                    return '出款错误'
                case 'TOPUP_ERROR':
                    return '入款错误'
            }
        } else {
            if (type === 'WITHDRAWAL') {
                return '提现'
            } else if (type === 'TOPUP') {
                return '充值'
            }
        }

    }

    getBalance() {
        let type = this.state.orderData.type
        let balance = this.state.orderData.amount
        if (type === 'WITHDRAWAL') {
            return (<Text style={styles.itemGreenTxt}>{'- ' + (balance).toFixed(2)}</Text>)
        } else if (type === 'TOPUP') {
            return (<Text style={styles.itemRedTxt}>{'+ ' + (balance).toFixed(2)}</Text>)

        }
    }

    formatOrderId(orderId) {
        return orderId.substr(0, 6) + ' ****** ' + orderId.substr(orderId.length - 5, orderId.length)
    }

    onCopy(text) {
        Clipboard.setString(text);
        Toast.showShortCenter("已复制！")
    }

    getPayType() {
        let payType = this.state.orderData.subType
        switch (payType) {
            case 'BANK_TRANSFER_TOPUP':
                let bankType = this.state.orderData.transferToupType
                return this.getyBankType(bankType)
            case 'BANK_TRANSFER_WITHDRAWAL':
                return '银行取款'
            case 'WECHAT_TOPUP':
                return '微信支付'
            case 'ALIPAY_TOPUP':
                return '支付宝支付'
            case 'THRIDPARTY_TOPUP':
                return '第三方支付'
            case 'MANUAL_TOPUP':
                return '人工充值'
            case 'MANUAL_WITHDRAWAL':
                return '人工提款'
            case 'UNRECOGNIZED':
                return '未识别'
        }
    }

    getyBankType(type) {
        switch (type) {
            case 'BANK_ONLINE':
                return '网银转账'
            case 'BANK_ATM':
                return 'ATM自动柜员机'
            case 'BANK_ATM_CASH':
                return 'ATM现金入款'
            case 'BANK_COUNTER':
                return '银行柜台转账'
            case 'BANK_PHONE':
                return '手机银行转账'
            case 'WECHATPAY':
                return '微信账号转账'
            case 'ALIPAY':
                return '支付宝账号转账'
            case 'OTHER':
                return '其他'
            case 'UNRECOGNIZED':
                return '未识别'
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
        alignItems: 'center'
    }, itemTitleStyle: {
        fontSize: 16
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