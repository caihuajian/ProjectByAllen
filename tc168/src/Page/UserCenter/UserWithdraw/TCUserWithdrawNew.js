import React, {Component, PropTypes,} from 'react'
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Modal,
    Platform,
    ScrollView,
    Picker,
    KeyboardAvoidingView
} from 'react-native'
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
import  BankList from './TCUserBankList'
import request from '../../../Common/Network/TCRequest'
import {config} from '../../../Common/Network/TCRequestConfig'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import BaseComponent from '../../Base/TCBaseComponent'
import Dialog from '../../../Common/View/TipDialog'
import AddBank from '../../UserCenter/UserAccount/TCUserAddBank'
import RequestUtils from '../../../Common/Network/TCRequestUitls'
import Toast from '@remobile/react-native-toast'
import  dismissKeyboard from 'dismissKeyboard'
import ModalDropdown from '../../../Common/View/ModalDropdown'
import LoadingSpinnerOverlay from 'react-native-smart-loading-spinner-overlay'
import NavigatorHelper from '../../../Common/JXHelper/TCNavigatorHelper'
import KeyboardAvoidingScrollView from '../../../Common/View/TCKeyboardAvoidingScrollView';
/**
 * 用户提现
 */

export default class TCUserWithdrawNew extends BaseComponent {



    // 构造函数
    constructor(props) {
        super(props)
    }


    componentDidMount() {
        super.componentDidMount();
        this.setState({
            bank: {},
            money: 0,
            totalMoney: 0,
            isDisabled: true,
            tipShow: false,
            tipWithdraw: false,
            renderPlaceholderOnly: true,
            withdrawSetting: null,
            canWithdraw: true,//是否可以提款
            exempt: 0.00,//手续费
            aggregateBetRequirements: 0.00,
            aggregateBets: 0.00,
            tipMsg: '',
            bankList: [],
            surplusSeconds: 0,
        });
        this.pwd = ''
        this.pwd1 = ''
        this.pwd2 = ''
        this.pwd3 = ''
        this.pwd4 = ''


        this.timer = setTimeout(() => {
            this.setState({renderPlaceholderOnly: false});
        }, 500)
        this.getDefaultBank(true);

        this.listener = RCTDeviceEventEmitter.addListener('userBankChange', () => {
            this.getDefaultBank(false)
        })
        this.listener = RCTDeviceEventEmitter.addListener('UpdateBankInfo', (bank) => {
            this.setBankInfo(bank)
        })
    }

    componentWillUnmount() {
        super.componentWillUnmount()
        this.listener && this.listener.remove()
        this.timer && clearTimeout(this.timer)
    }

    render() {
        let sp = super.render()
        if (sp) return sp;
        return (
            <View style={[styles.container]}>
                < TopNavigationBar
                    title={'账户提现'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.back()
                    }}
                />

                <KeyboardAvoidingScrollView
                    keyboardShouldPersistTaps={Platform.OS !== 'ios'}
                    keyboardDismissMode={Platform.OS ==='ios'?'on-drag':'none'}
                >
                    <TouchableOpacity onPress={()=>this.gotoBankList()}>

                        <View style={styles.bankItemStyle}>
                            <Image source={{uri: this.state.bank ? this.state.bank.bankCode : ''}} style={styles.img}/>
                            <Text style={styles.itemTxt}>{this.state.bank ? this.state.bank.bankName : ''}</Text>
                            <Image source={require('image!icon_next')} style={styles.imgNext}/>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.infoitemStyle}>

                        <Text style={styles.leftTitleStyle}>卡号:</Text>
                        <Text
                            style={[styles.titleTxtStyle, {marginLeft: 20}]}>****** {this.state.bank.bankCardNo ? this.state.bank.bankCardNo.substr(this.state.bank.bankCardNo.length - 4, 4) : ''}</Text>

                    </View>

                    <View style={styles.infoitemStyle}>

                        <Text style={styles.leftTitleStyle}>可提取余额:</Text>
                        <Text style={[styles.titleTxtStyle, {marginLeft: 10}]}>{this.state.totalMoney.toFixed(2)}</Text>

                    </View>

                    <View style={{marginTop: 10, marginLeft: 20}}>
                        <Text style={[styles.titleTxtStyle, {fontSize: Size.default}]}>当前消费</Text>
                    </View>

                    <View style={[styles.infoitemStyle, {marginTop: 10}]}>

                        <View style={{flexDirection: 'row', flex: 1, marginLeft: 20}}>
                            <Text style={styles.leftTitleGrayStyle}>提款需达投注量:</Text>
                            <Text
                                style={[styles.titleTxtStyle, {
                                    marginLeft: 5,
                                    fontSize: Size.small
                                }]}>{this.state.aggregateBetRequirements}</Text>
                        </View>
                        <View style={{flexDirection: 'row', flex: 1}}>
                            <Text style={styles.leftTitleGrayStyle}>已达投注量:</Text>
                            <Text
                                style={[styles.titleTxtStyle, {
                                    marginLeft: 5,
                                    fontSize: Size.small
                                }]}>{this.state.aggregateBets}</Text>
                        </View>
                    </View>

                    <View style={[styles.infoitemStyle]}>

                        <View style={{flexDirection: 'row', flex: 1, marginLeft: 20}}>
                            <Text style={styles.leftTitleGrayStyle}>是 否 可 以 提 款:</Text>
                            <Text
                                style={[styles.titleTxtStyle, {
                                    marginLeft: 5,
                                    fontSize: Size.small
                                }]}>{this.getCanWithDrawStyle()}</Text>
                        </View>
                        <View style={{flexDirection: 'row', flex: 1}}>
                            <Text style={styles.leftTitleGrayStyle}>手续费:</Text>
                            <Text style={[styles.titleTxtStyle, {
                                marginLeft: 5,
                                color: 'red', fontSize: Size.small
                            }]}>{this.state.exempt.toFixed(2)}</Text>
                        </View>
                    </View>

                    <View style={styles.inputItemStyle}>
                        <Text style={styles.moneyIcon}>￥</Text>
                        <TextInput
                            placeholder={'请输入金额'}
                            placeholderTextColor='#cccccc'
                            underlineColorAndroid='transparent'
                            style={styles.inputStyle}
                            keyboardType={'numeric'}
                            onChangeText={(text)=>this.changeMoney(text)}
                        />
                    </View>
                    <View style={styles.infoitemStyle}>
                        <Text style={styles.leftTitleStyle}>交易密码:</Text>
                        <View style={styles.pwdStyle}>
                            <ModalDropdown
                                textStyle={styles.dropDownTxtStyle}
                                options={this.getDropDownData()}
                                defaultValue={'—'}
                                style={styles.dropStyle}
                                password={true}
                                dropdownStyle={styles.dropdownStyle}
                                renderRow={(rowData, rowID)=>this.renderDropDownRow(rowData, rowID)}
                                onSelect={(idx, value)=>this.onSelect(idx, value, 0)}
                            />

                            {/*      <Picker
                             selectedValue={'java'}
                             style={styles.dropStyle}
                             onValueChange={(lang) => this.setState({language: lang})}>
                             <Picker.Item label="Java" value="java"/>
                             <Picker.Item label="JavaScript" value="js"/>
                             </Picker>*/}

                        </View>
                        <View style={styles.pwdStyle}>
                            <ModalDropdown
                                textStyle={styles.dropDownTxtStyle}
                                options={this.getDropDownData()}
                                defaultValue={'—'}
                                style={styles.dropStyle}
                                password={true}
                                dropdownStyle={styles.dropdownStyle}
                                renderRow={(rowData, rowID)=>this.renderDropDownRow(rowData, rowID)}
                                onSelect={(idx, value)=>this.onSelect(idx, value, 1)}
                            />
                        </View>

                        <View style={styles.pwdStyle}>
                            <ModalDropdown
                                textStyle={styles.dropDownTxtStyle}
                                options={this.getDropDownData()}
                                defaultValue={'—'}
                                password={true}
                                style={styles.dropStyle}
                                dropdownStyle={styles.dropdownStyle}
                                renderRow={(rowData, rowID)=>this.renderDropDownRow(rowData, rowID)}
                                onSelect={(idx, value)=>this.onSelect(idx, value, 2)}
                            />
                        </View>

                        <View style={styles.pwdStyle}>
                            <ModalDropdown
                                textStyle={styles.dropDownTxtStyle}
                                options={this.getDropDownData()}
                                defaultValue={'—'}
                                password={true}
                                style={styles.dropStyle}
                                dropdownStyle={styles.dropdownStyle}
                                renderRow={(rowData, rowID)=>this.renderDropDownRow(rowData, rowID)}
                                onSelect={(idx, value)=>this.onSelect(idx, value, 3)}
                            />
                        </View>
                    </View>

                    <View style={styles.itemStyle}>
                        <TouchableOpacity
                            style={this.getBtnStyle()}
                            onPress={()=> {
                                this.applyWithDraw()
                            }}
                            activeOpacity={this.state.isDisabled ? 1 : 0.2}
                        >
                            <Text style={{color: 'white', fontWeight: 'bold'}}>
                                确认转出
                            </Text>
                        </TouchableOpacity>
                    </View>

                </KeyboardAvoidingScrollView>
                <Dialog show={this.state.tipShow}
                        setModalVisible={()=>this.gotoAddBank()}
                        dialogTitle={'温馨提示'}
                        dialogContent={'您没有添加银行卡还不能提现哦！'}
                        btnTxt={'现在就去'}
                />

                <Dialog show={this.state.tipWithdraw}
                        setModalVisible={()=>this.gotoTop()}
                        dialogTitle={'温馨提示'}
                        dialogContent={this.state.tipMsg}
                        btnTxt={'好 的'}
                />
                <LoadingSpinnerOverlay
                    ref={ component => this._modalLoadingSpinnerOverLay = component }/>
            </View>
        )
    }

    setDialogVisible() {
        let isShow = this.state.tipShow;
        this.setState({
            tipShow: !isShow,
        });
    }


    getCanWithDrawStyle() {
        if (this.state.canWithdraw) {
            return '是'
        } else {
            return (<Text style={{color: 'red'}}>{'否'}</Text>)
        }
    }

    getDropDownData() {
        let nums = [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9"
        ]
        return nums;
    }

    renderDropDownRow(rowData, rowId) {
        return (
            <TouchableOpacity>
                <View style={styles.dropDownItemStyle}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>{rowData}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    back() {
        dismissKeyboard()
        this.props.navigator.pop()
    }


    setWithdrawModalVisible() {
        let isShow = this.state.tipWithdraw;
        this.setState({
            tipWithdraw: !isShow,
        });
    }

    onSelect(idx, value, position) {

        switch (position) {
            case 0:
                this.pwd1 = value
                break
            case 1:
                this.pwd2 = value
                break
            case 2:
                this.pwd3 = value
                break
            case 3:
                this.pwd4 = value
                break

        }
        this.composePwd()
        this.setBtnEnable()
    }


    composePwd() {
        this.pwd = this.pwd1 + '' + this.pwd2 + '' + this.pwd3 + '' + this.pwd4
    }

    setBtnEnable() {
        if (this.state.canWithdraw && this.pwd.length === 4 && this.state.money > 0 && this.state.money <= this.state.totalMoney) {
            this.setState({
                isDisabled: false
            });
        } else {
            this.setState({
                isDisabled: true
            });
        }
    }

    setBankInfo(bank) {
        this.setState({
            bank: bank
        })
    }

    gotoAddBank() {
        this.setDialogVisible();
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'addBank',
                component: AddBank,
                passProps: {
                    ...this.props,
                }
            })
        }
    }

    gotoTop() {
        dismissKeyboard()
        this.setWithdrawModalVisible()
        let {navigator} = this.props
        if (navigator) {
            RCTDeviceEventEmitter.emit('balanceChange')
            navigator.popToTop()
        }
    }

    /**
     * 验证提款
     */
    validateWithDraw() {

        if (this.state.surplusSeconds < 0) {
            Toast.showShortCenter('您的操作过于频繁，请' + Math.abs(this.state.surplusSeconds) + '秒后再试!')
        }
        if (this.state.surplusMaxWithdraw < 0) {
            Toast.showShortCenter('您的当天最大取款额度不足，不能提款!')
        }


        if (this.state.surplusWithdrawCount <= 0) {
            Toast.showShortCenter('您的今天的提款次数已经使用完，请明天再来吧!')
        }
        if (this.state.isDisabled) {
            return
        }
        /*
         maxWithdrawCharge: setting.maxWithdrawCharge,   //最大出款手续费
         minimumWithdrawAmount: setting.minimumWithdrawAmount,  //最小出款额度
         ratioOfChargeExempt: setting.ratioOfChargeExempt, //出款手续费比例
         surplusFeeWithdrawCount: withdrawSetting.surplusFeeWithdrawCount,   //剩余免费出款次数
         sufficeAggregateBetRequirements: withdrawSetting.sufficeAggregateBetRequirements,    //打码量是否满足需求*/
        let reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/

        if (!this.state.money.match(reg)) {
            Toast.showShortCenter('您输入的金额格式不正确(例:1.01)!')
            return false
        }
        if (this.state.money < this.state.minimumWithdrawAmount) {
            Toast.showShortCenter('提款金额不能小于' + this.state.minimumWithdrawAmount + '元!')
            return false
        }

        if (this.state.maximumWithdrawAmount !== 0 && this.state.money > this.state.maximumWithdrawAmount) {
            Toast.showShortCenter('提款金额不能大于' + this.state.maximumWithdrawAmount + '元!')
            return false
        }
        let m = parseFloat(this.state.money)
        let e = this.state.exempt

        let money = m + e
        if (money > this.state.totalMoney) {
            Toast.showShortCenter('您的余额不足,请重新输入!')
            return false
        }
        return true
    }


    applyWithDraw() {

        if (!this.validateWithDraw()) {
            return
        }
        this._modalLoadingSpinnerOverLay.show()
        RequestUtils.PostUrlAndParamsAndCallback(config.api.userWithDraw,
            {
                amount: this.state.money,
                userBankId: this.state.bank.id,
                withDrawCode: this.pwd,
                charge: this.state.exempt.toFixed(2)
            },
            (response) => {
                this._modalLoadingSpinnerOverLay.hide()

                if (response.rs) {

                    this.timer = setTimeout(()=> {
                        this.setState({
                            tipMsg: '您的提款申请已提交，请耐心等待！'
                        })
                        this.setWithdrawModalVisible()
                    }, 500)
                } else {
                    if (response.message) {
                        Toast.showShortCenter(response.message)
                    } else {
                        Toast.showShortCenter('提款申请失败，请稍候再试!')
                    }
                }
            })

    }

    gotoBankList() {
        let {navigator} =this.props;
        if (navigator) {
            navigator.push({
                name: 'bankList',
                component: BankList,
                passProps: {
                    bank: this.state.bank,
                    bankList: this.state.bankList,
                    ...this.props,
                }
            })
        }
    }

    getCanWithDrawMoney(withdrawSetting) {
        //剩余最大出款金额
        let surplusMaxWithdraw = withdrawSetting.surplusMaxWithdraw
        // 多少秒之后才能取款
        let surplusSeconds = withdrawSetting.surplusSeconds

        let surplusWithdrawCount = withdrawSetting.surplusWithdrawCount
        //判断是否能提款
        let canWithdraw = true
        //厅主出款设定
        let setting = withdrawSetting.withdrawalSettings
        this.setState({
            surplusSeconds: surplusSeconds
        })
        if (withdrawSetting.balance <= 0 || surplusMaxWithdraw < 0 || surplusSeconds < 0 || surplusWithdrawCount <= 0) {
            canWithdraw = false
        }

        this.setState({
            totalMoney: withdrawSetting.balance,
            maximumWithdrawAmount: setting.maximumWithdrawAmount,  //最大出款额度
            maxWithdrawCharge: setting.maxWithdrawCharge,   //最大出款手续费
            minimumWithdrawAmount: setting.minimumWithdrawAmount,  //最小出款额度
            ratioOfChargeExempt: setting.ratioOfChargeExempt, //出款手续费比例
            canWithdraw: canWithdraw,
            surplusFeeWithdrawCount: withdrawSetting.surplusFeeWithdrawCount,   //剩余免费出款次数
            sufficeAggregateBetRequirements: withdrawSetting.sufficeAggregateBetRequirements,    //打码量是否满足需求
            aggregateBetRequirements: withdrawSetting.aggregateBetRequirements,
            aggregateBets: withdrawSetting.aggregateBets,
            surplusMaxWithdraw: surplusMaxWithdraw,
            surplusWithdrawCount: surplusWithdrawCount

        })

    }

    /**
     * 计算手续费
     * @param money
     */
    caclExempt(money) {


        if (this.state.surplusFeeWithdrawCount > 0 || this.state.sufficeAggregateBetRequirements) {
            return;
        }
        let {maxWithdrawCharge, ratioOfChargeExempt} = this.state
        let reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/

        if (this.state.money.match(reg)) {
            let tempExempt = money * ratioOfChargeExempt * 0.01
            let exempts = tempExempt >= maxWithdrawCharge ? maxWithdrawCharge : tempExempt
            let res = this.RoundNum(exempts, 2)
            this.setState({
                exempt: res
            })
            return
        }
        if (this.state.money.length === 0) {
            this.setState({
                exempt: 0
            })
            return
        }
    }

    RoundNum(num, length) {
        var number = Math.round(num * Math.pow(10, length)) / Math.pow(10, length);
        return number;
    }

    changeMoney(text) {
        this.state.money = text

        if (this.state.canWithdraw && text > 0 && text < this.state.totalMoney) {
            if (this.pwd.length === 4) {
                this.setState({
                    isDisabled: false
                });
            }

        } else {
            this.setState({
                isDisabled: true
            });
        }
        this.caclExempt(text)
    }


    getBtnStyle() {
        if (!this.state.isDisabled) {
            return styles.bottomBarButtonStyle;
        } else {
            return styles.bottomBarButtonUnableStyle
        }
    }

    getDefaultBank(isFirst) {
        RequestUtils.getUrlAndParamsAndCallback(config.api.getuserCardsAndWithdrawInfo, null, (response) => {
            if (response.rs) {
                if (response.content && response.content.bankAccounts.length > 0) {
                    this.setState({
                        bankList: response.content.bankAccounts
                    })
                    response.content.bankAccounts.forEach((b) => {
                        if (b.isDefault) {
                            this.setState({
                                bank: b,
                            });
                            if (isFirst) {
                                this.getCanWithDrawMoney(response.content.dailyWithdrawWithAdminSettingsResult)
                            }
                            return;
                        }
                    })


                } else {
                    this.setDialogVisible();
                }
            } else {

                if (response.status === 401) {
                    Toast.showShortCenter('登录状态过期，请重新登录!')
                } else {

                    if (response.status === 500) {
                        Toast.showShortCenter("服务器出错啦")
                    } else {
                        if (response.message) {
                            Toast.showShortCenter(response.message)
                        }
                    }
                    let {navigator} = this.props
                    if (navigator) {
                        RCTDeviceEventEmitter.emit('balanceChange')
                        navigator.popToTop()
                    }

                }
            }

        })
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
    },
    imgNext: {
        width: 10,
        height: 15,
        position: 'absolute',
        top: 20,
        left: Window.width * 0.9
    },
    img: {
        width: 40,
        height: 40,
        marginLeft: 20
    },
    itemTxt: {
        marginLeft: 10,
        fontSize: 16,

    },
    bottomBarButtonStyle: {
        backgroundColor: Color.bg.red,
        justifyContent: 'center',
        flexDirection: Direction.row,
        height: 40,
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
        width: Window.width * 0.8,
        marginTop: 40
    },
    bottomBarButtonUnableStyle: {
        backgroundColor: Color.bg.grey2,
        justifyContent: 'center',
        flexDirection: Direction.row,
        height: 40,
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
        width: Window.width * 0.8,
        marginTop: 40
    },
    itemStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    bankItemStyle: {
        flexDirection: 'row',
        height: 50,
        marginTop: 15,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    inputItemStyle: {
        flexDirection: 'row',
        height: 50,
        marginTop: 15,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    moneyIcon: {
        fontSize: Size.xlarge,
        fontWeight: 'bold',
        paddingLeft: 20
    },
    allWithdraw: {
        color: Color.text.blue,
    },
    inputStyle: {
        width: Window.width * 0.9,
        paddingLeft: 5,
        fontSize: Size.default
    },

    cancelBtn: {
        position: 'absolute',
        top: 10,
        left: 10
    },
    withdrawMoney: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 50,
        alignItems: 'center',

    },
    inputModalItemStyle: {
        flexDirection: 'row',
        height: 50,
        width: Window.width * 0.9,
        borderWidth: 1,
        borderColor: '#999999',
        alignItems: 'center',
        borderRadius: 5
    }, inputModalStyle: {
        width: Window.width * 0.75,
        paddingLeft: 10
    }, queryModalStyle: {
        color: Color.text.blue,
        fontSize: Size.large
    }, infoitemStyle: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: 0.5,
    }, leftTitleStyle: {
        paddingLeft: 20,
        color: '#333',
        fontSize: Size.default
    }, titleTxtStyle: {
        color: '#333',
        fontSize: Size.default
    }, leftTitleGrayStyle: {
        color: '#999',
        fontSize: Size.small
    }, pwdStyle: {
        width: Window.width * 0.15,
        height: 40,
        borderWidth: 0.5,
        borderColor: '#999999',
        backgroundColor: 'rgba(245,245,245,0.2)',
        flexDirection: 'row',
        marginLeft: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }, dropDownTxtStyle: {
        color: Color.text.black1,
        fontSize: Size.xlarge,
        textAlign: 'center',
        fontWeight: 'bold'
    }, dropdownStyle: {
        width: Window.width * 0.15,
        height: Window.height * 0.4,
        borderWidth: 1,
        borderRadius: 3,
    }, dropDownItemStyle: {
        alignItems: 'center',
        margin: 8,
    }, dropStyle: {
        width: Window.width * 0.15,
        flex: 1
    }, acontainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    }
})