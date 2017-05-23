import React, {Component, PropTypes,} from 'react'
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import {View, StyleSheet, Text, TouchableOpacity, Image, TextInput, Modal, Platform} from 'react-native'
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
import NavigatorHelper from '../../../Common/JXHelper/TCNavigatorHelper'
/**
 * 用户提现
 */

export default class TCUserWithdraw extends BaseComponent {



    // 构造函数
    constructor(props) {
        super(props)
    }


    componentDidMount() {
        super.componentDidMount();
        this.setState({
            bank: {},
            show: false,
            money: '',
            totalMoney: 0,
            isDisabled: true,
            tipShow: false,
            tipWithdraw: false,
            withDrawCode: '',
            renderPlaceholderOnly: true
        });
        this.timer = setTimeout(() => {
            this.setState({renderPlaceholderOnly: false});
        }, 500)
        this.getDefaultBank();

        this.listener = RCTDeviceEventEmitter.addListener('userBankChange', () => {
            this.getDefaultBank()
        })
        this.listener = RCTDeviceEventEmitter.addListener('UpdateBankInfo', (bank) => {
            this.setBankInfo(bank)
        })
    }

    componentWillUnmount() {
        super.componentWillUnmount()
         this.listener&&this.listener.remove()
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
                <TouchableOpacity onPress={()=>this.gotoBankList()}>

                    <View style={styles.bankItemStyle}>
                        <Image source={{uri: this.state.bank ? this.state.bank.bankCode : ''}} style={styles.img}/>
                        <Text style={styles.itemTxt}>{this.state.bank ? this.state.bank.bankName : ''}</Text>
                        <Image source={require('image!icon_next')} style={styles.imgNext}/>
                    </View>
                </TouchableOpacity>
                <View style={styles.inputItemStyle}>
                    <Text style={styles.moneyIcon}>￥</Text>
                    <TextInput
                        placeholder={'请输入金额'}
                        placeholderTextColor='#cccccc'
                        underlineColorAndroid='transparent'
                        style={styles.inputStyle}
                        keyboardType={'numeric'}
                        defaultValue={this.state.money}
                        onChangeText={(text)=>this.changeMoney(text)}
                    />


                    <Text style={styles.allWithdraw}>可提取余额:{this.state.totalMoney.toFixed(2)}</Text>
                    {/*  <TouchableOpacity onPress={()=>this.allWithdraw()}>
                     <Text style={styles.allWithdraw}>全部提现</Text>
                     </TouchableOpacity>*/}
                </View>
                {/*<View style={styles.itemStyle}>*/}
                {/*<Text style={{color:'#cccccc',marginTop:20}}>本次转出所需手续费8元</Text>*/}
                {/*</View>*/}
                <View style={styles.itemStyle}>
                    <TouchableOpacity
                        style={this.getBtnStyle()}
                        onPress={()=>this.showModal()}
                        activeOpacity={this.state.isDisabled ? 1 : 0.2}
                    >
                        <Text style={{color: 'white', fontWeight: 'bold'}}>
                            确认转出
                        </Text>
                    </TouchableOpacity>
                </View>


                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={this.state.show}
                    onRequestClose={() => {
                    }}
                >
                    <View style={styles.modalStyle}>

                        <View style={styles.modalMain}>
                            <View style={styles.modalTitle}>
                                <TouchableOpacity style={styles.cancelBtn} onPress={()=>this.setModalVisible()}>
                                    <Image source={require('image!shut')} style={styles.closeIcon}/>
                                </TouchableOpacity>
                                <Text style={{fontSize: Size.large}}>输入交易密码</Text>
                            </View>
                            <View style={styles.withdrawMoney}>
                                <Text style={{color: '#cccccc'}}>转出{this.state.money}元</Text>

                            </View>

                            <View style={{alignItems: 'center'}}>
                                <View style={styles.inputModalItemStyle}>
                                    <TextInput
                                        secureTextEntry={true}
                                        placeholderTextColor='#cccccc'
                                        underlineColorAndroid='transparent'
                                        keyboardType={'numeric'}
                                        maxLength={4}
                                        onChangeText={(text)=>this.changeWithDrawCodeText(text)}
                                        style={styles.inputModalStyle}
                                    />
                                    <TouchableOpacity onPress={()=>this.applyWithDraw()}>
                                        <Text style={styles.queryModalStyle}>确认</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>


                <Dialog show={this.state.tipShow}
                        setModalVisible={()=>this.gotoAddBank()}
                        dialogTitle={'温馨提示'}
                        dialogContent={'您没有添加银行卡还不能提现哦！'}
                        btnTxt={'现在就去'}
                />

                <Dialog show={this.state.tipWithdraw}
                        setModalVisible={()=>this.gotoTop()}
                        dialogTitle={'温馨提示'}
                        dialogContent={'您的提款申请已提交，请耐心等待！'}
                        btnTxt={'好 的'}
                />
            </View>
        )
    }

    setDialogVisible() {
        let isShow = this.state.tipShow;
        this.setState({
            tipShow: !isShow,
        });
    }

    // 显示/隐藏 modal
    setModalVisible() {
        let isShow = this.state.show;
        this.setState({
            show: !isShow,
        });
    }

    back() {
        dismissKeyboard()
        this.props.navigator.pop()
    }

    changeWithDrawCodeText(text) {
        this.state.withDrawCode = text
    }

    setWithdrawModalVisible() {
        let isShow = this.state.tipWithdraw;
        this.setState({
            tipWithdraw: !isShow,
        });
    }

    showModal() {


        if (this.state.isDisabled) {
            return
        }

        let reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/

        if (!this.state.money.match(reg)) {
            Toast.showShortCenter('您输入的金额格式不正确!')
            return
        }
        if (this.state.money < 10) {
            Toast.showShortCenter('取款金额必须大于10元!')
            return
        }
        this.setModalVisible();
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


    applyWithDraw() {
        if (!this.state.withDrawCode.length) {
            Toast.showShortCenter('请输入交易密码')
            return
        }

        RequestUtils.PostUrlAndParamsAndCallback(config.api.userWithDraw,
            {
                amount: this.state.money,
                userBankId: this.state.bank.id,
                withDrawCode: this.state.withDrawCode
            },
            (response) => {
                if (response.rs) {
                    this.setModalVisible()
                    this.setWithdrawModalVisible()
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
                    ...this.props,
                }
            })
        }
    }

    getCanWithDrawMoney() {
        RequestUtils.getUrlAndParamsAndCallback(config.api.userBalance, null, (response) => {
            if (response.rs) {
                // let money = response.content.balance - response.content.aggregateBonus
                // this.setState({
                //     totalMoney: money > 0 ? money : 0
                // })

                let money = response.content.balance
                this.setState({
                    totalMoney: money > 0 ? money : 0
                })
            } else {
                Toast.showShortCenter('余额获取失败，请稍候再试!')
            }
        })
    }

    changeMoney(text) {
        this.state.money = text;
        if (text && (text <= this.state.totalMoney) && text > 0) {
            this.setState({
                isDisabled: false
            });
        } else {
            this.setState({
                isDisabled: true
            });
        }
    }

    allWithdraw() {
        if (this.state.totalMoney > 0) {
            this.setState({
                money: this.state.totalMoney + ''
            })
            this.setState({
                isDisabled: false
            });
        }
    }

    getBtnStyle() {
        if (!this.state.isDisabled) {
            return styles.bottomBarButtonStyle;
        } else {
            return styles.bottomBarButtonUnableStyle
        }
    }

    getDefaultBank() {
        RequestUtils.getUrlAndParamsAndCallback(config.api.userCards, null, (response) => {
            if (response.rs) {
                if (response.content && response.content.length > 0) {
                    response.content.forEach((b) => {
                        if (b.isDefault) {
                            this.setState({
                                bank: b
                            });
                            this.getCanWithDrawMoney()
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
        width: 30,
        height: 30,
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
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    moneyIcon: {
        fontSize: Size.xlarge,
        fontWeight: 'bold',
        paddingLeft: 15
    },
    allWithdraw: {
        color: Color.text.blue,
    },
    inputStyle: {
        width: Window.width * 0.5,
        paddingLeft: 5
    },
    modalTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 60,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    modalStyle: {
        backgroundColor: 'rgba(52,52,52,0.5)',
        flex: 1,
        justifyContent: Platform.OS === 'ios' ? 'center' : 'flex-end',
    },
    modalMain: {
        backgroundColor: 'white',
        height: Window.height * 0.4
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
        borderColor: '#cccccc',
        alignItems: 'center',
        borderRadius: 5
    }, inputModalStyle: {
        width: Window.width * 0.75,
        paddingLeft: 10
    }, queryModalStyle: {
        color: Color.text.blue,
        fontSize: Size.large
    }, closeIcon: {
        width: 30,
        height: 30
    }
})