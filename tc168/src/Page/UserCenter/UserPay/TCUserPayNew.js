import React, {Component, PropTypes} from "react";
import TopNavigationBar from "../../../Common/View/TCNavigationBar";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Modal,
    ScrollView,
    ListView,
    Linking,
} from "react-native";
import {Size, Color, Window} from "../../../Common/Style/AppStyle";
import BankPay from "./TCUserBankPayNew";
import Pay from "./TCUserAliAndWechatPay";
import AlipayAndWechatTransfer from "./TCUserAliAndWechatTransfer";
import Toast from "@remobile/react-native-toast";
import BaseComponent from "../../../Page/Base/TCBaseComponent";
import TCKeyboardView from "../../../Common/View/TCKeyboardView";
import RequestUtils from "../../../Common/Network/TCRequestUitls";
import {config} from "../../../Common/Network/TCRequestConfig";
import Dialog from "../../UserCenter/UserPay/Dialog";
import HTMLPay from "./TCUserHTMLPay";
import LoadingSpinnerOverlay from "react-native-smart-loading-spinner-overlay";
import NavigatorHelper from "../../../Common/JXHelper/TCNavigatorHelper";
import UserLogin from "../TCUserLoginNew";
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import ScrollableTabView, {DefaultTabBar,} from 'react-native-scrollable-tab-view'
import TCUserPayPage from './TCUserPayPage'
import _ from 'lodash';
/**
 * 用户充值
 */
export default class TCUserPay extends BaseComponent {



    // 构造函数
    constructor(props) {

        super(props)

    }

    static defaultProps = {};

    componentDidMount() {
        super.componentDidMount();

        this.payData = {}
        this.payTansferList = []
        this.state = {
            money: '',
            selectedIndex: -1,
            show: false,
            tipShow: false,
            payUrl: '',
            renderPlaceholderOnly: true,
            isEmpty: false,
            payList: null,
        }
        this.timer = setTimeout(() => {
            this.setState({renderPlaceholderOnly: false});
        }, 500)
        /*    this.listener = RCTDeviceEventEmitter.addListener('userStateChange', (state) => {
         if (state !== 'logout') {
         this.loadDataFromNet()
         }
         })*/
        this.getBankList()
        this.loadDataFromNet()

    }

    componentWillUnmount() {
        super.componentWillUnmount()
        this.timer && clearTimeout(this.timer);
    }

    render() {
        let sp = super.render()
        if (sp) return sp;
        return (
            <View style={styles.container}>
                <TCKeyboardView ref="tcKeyboardView" setInputValue={(number) => {
                    this.setTextInputValue(number)
                }}/>
                < TopNavigationBar
                    title={'充值'}
                    needBackButton={true}
                    rightTitle={'充值明细'}
                    rightButtonCall={()=> {
                        this.gotoPayRecord()
                    }}
                    backButtonCall={() => {
                        this.goBack()
                    }}
                />
                <View style={styles.payMoneyItemStyle}>
                    <Text style={styles.payTitleStyle}>充值金额</Text>
                    <TouchableOpacity style={styles.inputContainer} onPress={()=>this.showKeyBoard()}>
                        <Text style={styles.inputTextStyle}>{this.state.money}</Text>
                    </TouchableOpacity>
                    <Text style={{color: 'red'}}>元</Text>
                </View>

                <View style={styles.moneyLabel}>

                    <View style={styles.moneyStyle}>
                        <TouchableOpacity onPress={()=>this.checkMoney('50', 0)}>
                            <Text style={this.getMoneyTxtStyle(0)}>50元</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.moneyStyle}>
                        <TouchableOpacity onPress={()=>this.checkMoney('100', 1)}>
                            <Text style={this.getMoneyTxtStyle(1)}>100元</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.moneyStyle}>
                        <TouchableOpacity onPress={()=>this.checkMoney('300', 2)}>
                            <Text style={this.getMoneyTxtStyle(2)}>300元</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.moneyStyle}>
                        <TouchableOpacity onPress={()=>this.checkMoney('500', 3)}>
                            <Text style={this.getMoneyTxtStyle(3)}>500元</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.moneyLabel}>

                    <View style={styles.moneyStyle}>
                        <TouchableOpacity onPress={()=>this.checkMoney('1000', 4)}>
                            <Text style={this.getMoneyTxtStyle(4)}>1000元</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.moneyStyle}>
                        <TouchableOpacity onPress={()=>this.checkMoney('2000', 5)}>
                            <Text style={this.getMoneyTxtStyle(5)}>2000元</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.moneyStyle}>
                        <TouchableOpacity onPress={()=>this.checkMoney('3000', 6)}>
                            <Text style={this.getMoneyTxtStyle(6)}>3000元</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.moneyStyle}>
                        <TouchableOpacity onPress={()=>this.checkMoney('5000', 7)}>
                            <Text style={this.getMoneyTxtStyle(7)}>5000元</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.payTipView}>
                    <Text style={styles.payTip}>请选择充值方式</Text>
                </View>
                <ScrollableTabView
                    style={{marginTop: 10}}
                    renderTabBar={() => <DefaultTabBar style={{height: 45}} textStyle={{marginTop: 30}}/>}
                    tabBarUnderlineStyle={{backgroundColor: '#f3482c', height: 2}}
                    tabBarBackgroundColor='#FFFFFF'
                    locked={true}
                    initialPage={0}
                    tabBarActiveTextColor='#f3482c'
                    tabBarInactiveTextColor='#989898'
                    tabBarTextStyle={{fontSize: 15, fontWeight: 'normal', marginTop: 10}}
                >
                    <TCUserPayPage tabLabel='微信' type={'WX'}
                                   payItemSelected={(rowData)=>this.payItemSelected(rowData)}
                                   payList={this.state.payList}
                    />
                    <TCUserPayPage tabLabel='支付宝' type={'ZHB'}
                                   payItemSelected={(rowData)=>this.payItemSelected(rowData)}
                                   payList={this.state.payList}
                    />

                    <BankPay
                        tabLabel='银行卡转账'
                        navigator={this.props.navigator}
                        money={this.state.money}
                        showLoading={()=>this.showLoading()}
                        hideLoading={()=> {
                            this.hideLoading()
                        }}
                        validMoney={()=>this.validMoney()}
                    />
                    <TCUserPayPage tabLabel='在线支付' type={'THIRD_PARTY'}
                                   payItemSelected={(rowData)=>this.payItemSelected(rowData)}
                                   payList={this.state.payList}
                    />

                </ScrollableTabView>
                <Dialog
                    show={this.state.tipShow}
                    rightBtnClick={()=>this.payOk()}
                    leftBtnClick={()=>this.rePay()}
                    dialogTitle={'充值提示'}
                    dialogContent={'是否支付完成？'}
                    btnTxt={'支付完成'}
                    leftTxt={'重新支付'}
                />
                <LoadingSpinnerOverlay
                    ref={ component => this._partModalLoadingSpinnerOverLay = component }
                    modal={true}
                    marginTop={64}/>
            </View>
        )
    }

    showKeyBoard() {
        var popView = this.refs.tcKeyboardView
        if (popView.state.modalVisible) {
            popView._setModalVisible(false);
        } else {
            popView._setModalVisible(true);
        }
    }

    setTextInputValue(number) {
        let currentStr = this.state.money
        if (number == '确认') {
        } else if (number == '删除') {
            currentStr = currentStr.substring(0, currentStr.length - 1)
        } else {
            currentStr = currentStr + number
            if (currentStr.length > 6) {
                return
            }
        }

        if (this.state.selectedIndex !== -1 && this.state.money !== currentStr) {
            this.setState({
                money: currentStr,
                selectedIndex: -1,
            })
        } else {
            this.setState({
                money: currentStr
            })
        }
    }

    /**
     * 跳转到充值历史界面
     */
    gotoPayRecord() {
        NavigatorHelper.pushToUserPayAndWithDraw(1)
    }

    /**
     * 切换Modal显示状态
     */
    setModalVisible() {
        var dialog = this.refs.Dialog
        if (dialog.state.modalVisible) {
            dialog._setModalVisible(false);
        } else {
            dialog._setModalVisible(true);
        }
    }

    /**
     * 加载支付方式
     */
    loadDataFromNet() {
        RequestUtils.getUrlAndParamsAndCallback(config.api.paymentList, null, (response) => {
            if (response.rs) {
                if (response.content && response.content.length > 0) {
                    this.payTansferList = _.concat(this.payTansferList, response.content)
                    this.setState({
                        payList: this.payTansferList
                    })
                } else {
                    this.setState({
                        payList: this.payTansferList
                    })
                }
            } else {
                if (response.status === 401) {
                    Toast.showShortCenter('登录状态过期，请重新登录!')
                } else {
                    if (response.status == 500) {
                        Toast.showShortCenter('服务器出错啦!')
                    } else {
                        Toast.showShortCenter(response.message)
                    }
                    this.goBack()
                }
            }
        })
    }


    getBankList() {
        RequestUtils.getUrlAndParamsAndCallback(config.api.bankList, null, (response) => {
            if (response.rs) {
                this.parseBankList(response.content)
            } else {
                if (response.status === 500) {
                    Toast.showShortCenter('服务器出错啦!')
                } else {
                    if (response.message) {
                        Toast.showShortCenter(response.message)
                    }
                }
                this.goBack()
            }
        })
    }

    parseBankList(data) {
        if (data.length > 0) {
            for (var i = 0; data[i] != null; i++) {
                let item = data[i]
                if (item.bankCode === 'ZHB' || item.bankCode === 'WX') {
                    this.payTansferList.push(item)
                }
            }
        }
    }

    /**
     * 切换Modal显示状态
     */
    setModalTipVisible() {
        this.setState({
            tipShow: !this.state.tipShow
        })
    }

    getMoneyTxtStyle(index) {
        if (index == this.state.selectedIndex) {
            return styles.moneyCheckedStyle
        } else {
            return styles.moneyTxtStyle
        }

    }

    changeMoney(text) {
        this.setState({money: text});
    }


    checkMoney(text, index) {
        this.setState({
            money: text,
            selectedIndex: index
        });
    }

    showLoading() {
        this._partModalLoadingSpinnerOverLay.show()
    }

    hideLoading() {
        this._partModalLoadingSpinnerOverLay.hide()
    }


    /**
     * 银行卡转账
     */
    gotoPay() {
        if (!this.validMoney()) {
            return
        }
        let {navigator} = this.props;
        let componets = BankPay;
        if (navigator) {
            navigator.push({
                name: 'userPay',
                component: componets,
                passProps: {
                    money: this.state.money,
                    ...this.props,
                }
            })
        }
    }

    goBack() {
        RCTDeviceEventEmitter.emit('balanceChange')
        this.props.navigator.pop()
    }

    /**
     * 检查输入金额
     * @returns {boolean}
     */
    validMoney() {
        let reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/

        if (!this.state.money.match(reg)) {
            Toast.showShortCenter('您输入的金额格式不正确!')
            return false
        }

        if (this.state.money === '' || this.state.money < 0) {
            Toast.showShortCenter("充值金额不能小于1元!");
            return false
        }

        return true
    }

    /**
     * 点击支付方式
     * @param rowData
     */
    payItemSelected(rowData) {

        if (!this.validMoney()) {
            return
        }


        if (rowData.type) {
            this.payData = rowData
            let payType = rowData.type ? rowData.type : rowData.bankCode
            //
            // if (payType === 'WX') {
            //     if (this.state.money > 5000) {
            //         Toast.showShortCenter('微信最大充值金额不能超过5000元!')
            //         return
            //     }
            // } else if (payType === 'ZHB') {
            //     if (this.state.money > 3000) {
            //         Toast.showShortCenter('支付宝最大充值金额不能超过3000元!')
            //         return
            //     }
            // } else {
            //     if (this.state.money > 500000) {
            //         Toast.showShortCenter('网银最大充值金额不能超过500000元!')
            //         return
            //     }
            // }
            let paymentTypes = rowData.paymentType
            this._partModalLoadingSpinnerOverLay.show()
            if (payType === 'THIRD_PARTY') {
                this.otherPay()
            } else if (payType === 'WX' || payType === 'ZHB') {
                this.applayPay(paymentTypes)
            }
        } else {
            this.weChatAndAlipayTransfer(rowData)
        }
    }


    /**
     * 支付宝微信直接转账
     * @param data
     */
    weChatAndAlipayTransfer(data) {

        let {navigator} = this.props
        if (navigator) {
            navigator.push({
                name: 'alipay',
                component: AlipayAndWechatTransfer,
                passProps: {
                    type: data.bankCode,
                    money: this.state.money,
                    data: data,
                    ...this.props,
                }
            })
        }
    }

    /**
     * 第三方支付
     */
    otherPay() {
        this.applayPay('THIRD')
    }

    /**
     * 微信和支付宝支付
     */
    weChatAndAlipay(paymentTypes) {
        if (paymentTypes.length > 1) {
            this.setModalVisible()
            this._partModalLoadingSpinnerOverLay.hide()
        } else {
            if (paymentTypes[0] === 'SCAN') {
                this.applayPay('SCAN')
            } else {
                this.applayPay('WAP')
            }
        }
    }


    /**
     * 申请自动支付
     * @param type
     */
    applayPay(type) {
        RequestUtils.PostUrlAndParamsAndCallback(config.api.otherPay,
            {
                depositor: TCUSER_DATA.realname,
                paymentId: this.payData.paymentId,
                paymentType: type,
                topupAmount: this.state.money
            }, (response) => {

                this._partModalLoadingSpinnerOverLay.hide()
                if (response.rs) {
                    this.gotoPayWithPayment(response.content)
                } else {
                    if (response.message) {
                        if (response.message.indexOf('general') >= 0) {
                            Toast.showShortCenter('请求超时,请稍后再试!')
                        } else {
                            Toast.showShortCenter(response.message)
                        }
                    } else {
                        Toast.showShortCenter('服务器异常')
                    }
                }
            })
    }


    gotoWebView(url) {
        NavigatorHelper.pushToWebView(url, '充值')
    }


    /**
     * 重新支付
     */
    rePay() {
        this.setModalTipVisible()
    }

    /**
     * 支付完成
     */
    payOk() {
        this.setModalTipVisible()
        this.goBack()
    }


    /**
     * 二维码支付(str)
     * @param res
     * @constructor
     */
    QRpay(res) {
        let {navigator} = this.props
        let componets = Pay
        let payType = this.payData.type === 'ZHB' ? 1 : 2
        if (res.data && res.data.length !== 0) {
            if (navigator) {
                navigator.push({
                    name: 'userPay',
                    component: componets,
                    passProps: {
                        type: payType,
                        codeType: 'CODE_URL',
                        money: this.state.money,
                        codeValue: res.data,
                        ...this.props,
                    }
                })
            }
        } else {
            Toast.showShortCenter('二维码获取失败,请稍后再试!')
        }

    }


    gotoPayWithPayment(res) {
        let paymentMethod = res.paymentMethod
        if (paymentMethod === 'WECHAT_QR' || paymentMethod === 'ALIPAY_QR') {
            this.gotoQRpay(res)
        } else if (paymentMethod === 'BANK_ONLINE') {
            this.gotoWebView(res.data)
        } else if (paymentMethod === 'WECHAT_APP' || paymentMethod === 'ALIPAY_APP') {
            this.gotoUrl(res.data)
        } else {
            Toast.showShortCenter('该支付异常，请换一种支付方式！')
        }
    }


    gotoQRpay(res) {
        if (res.webview) {
            this.gotoUrl(res.data)
        } else {
            this.QRpay(res)
        }
    }

    gotoUrl(url) {
        if (url.match(/script/)) {
            url = url.replace(/'/g, '"')
            url = url.split('"')[1]
        }
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                Toast.showShortCenter('支付链接失效，请稍后再试！')

            }
        })
    }
}


const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Color.bg.mainBg,
        },

        payMoneyItemStyle: {
            flexDirection: 'row',
            height: 50,
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: Color.bg.red,
            margin: 10
        },
        payTitleStyle: {
            fontSize: Size.large,
            marginLeft: 5
        },
        inputContainer: {
            marginLeft: 10,
            width: Window.width * 0.6,
            height: 50,
            justifyContent: 'center',
        },
        inputTextStyle: {
            color: 'red',
            fontSize: Size.default,
        },
        moneyLabel: {
            flexDirection: 'row',
            height: 50,
            justifyContent: 'space-around'
        }, moneyStyle: {
            justifyContent: 'center',
            height: 50,
            width: Window.width / 5
        },
        moneyTxtStyle: {
            color: 'red',
            backgroundColor: 'white',
            borderRadius: 5,
            fontSize: Size.default,
            textAlign: 'center',
            paddingTop: 10,
            paddingBottom: 10
        }, moneyCheckedStyle: {
            color: 'white',
            backgroundColor: 'red',
            borderRadius: 5,
            fontSize: Size.default,
            textAlign: 'center',
            paddingTop: 10,
            paddingBottom: 10
        },
        payTypeImg: {
            height: 50,
            width: 50,
        }, payTypeTxt: {
            justifyContent: 'center',
            paddingLeft: 15
        }, payTip: {
            color: Color.text.grey1,
            fontSize: Size.default,

        }, payTipView: {
            marginTop: 10,
            paddingLeft: 5
        }, payRemarkTxt: {
            color: Color.text.grey1
        },
    })