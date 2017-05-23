import React, {Component, PropTypes,} from 'react'
import  Dialog from '../../../Common/View/TipDialog'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    Modal,
    Image,
    ScrollView,
    Platform
} from 'react-native'
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import LoadingSpinnerOverlay from 'react-native-smart-loading-spinner-overlay'
import Toast from '@remobile/react-native-toast';
import  dismissKeyboard from 'dismissKeyboard'
import  BankUtils from '../../UserCenter/UserAccount/BankUtils'
import BackBaseComponent from '../../Base/TCBaseBackComponent'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import  UserMessage from '../../UserCenter/UserInfo/TCUserMessage'
import ModalDropdown from '../../../Common/View/ModalDropdown'
import NetUtils from '../../../Common/Network/TCRequestUitls'
import {config} from '../../../Common/Network/TCRequestConfig'
let bankUtils = new BankUtils();
import  InitHelper from '../../../Common/JXHelper/TCInitHelper'
let helper = new InitHelper()
/**
 * 添加用户信息
 */
export default class TCAddUserInfo extends BackBaseComponent {



    // 构造函数
    constructor(props) {

        super(props)

        this.state = {
            show: false,
            accountName: '',
            accountNum: '',
            realName: '',
            bankAddress: '',
            bankCode: '',
            bankName: '',
            showAddBankSuccess: false,
            password: '',
            showPwd: false,
        }
    }

    static defaultProps = {};

    componentDidMount() {
        super.componentDidMount();
    }

    componentWillUnmount() {
        super.componentWillUnmount()
    }

    render() {

        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={'添加银行信息'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.back()
                    }}/>

                <ScrollView
                    keyboardShouldPersistTaps={Platform.OS !== 'ios'}
                    keyboardDismissMode={'on-drag'}
                >
                    <View >
                        <Text style={styles.titleTipTxtStyle}>请绑定持卡人本人银行卡</Text>
                    </View>

                    <View>
                        <View style={styles.inputItemStyle}>
                            <View style={styles.inputTitleTxt}>
                                <Text>{'持 卡 人  '}</Text>
                            </View>
                            {/* <Text style={styles.inputStyle}>{this.state.realName}</Text>*/}
                            <TextInput
                                style={styles.inputStyle}
                                placeholder='请输入开户名'
                                placeholderTextColor={Color.text.grey2}
                                underlineColorAndroid='transparent'
                                maxLength={15}
                                onChangeText={(text)=>this.onChangeRealName(text)}/>
                            <TouchableOpacity onPress={()=>this.showModal()}>
                                <Image source={require('image!warn')} style={styles.tipIconStyle}/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputItemStyle}>

                            <View style={styles.inputTitleTxt}><Text>银行名称</Text></View>

                            <ModalDropdown
                                textStyle={styles.dropDownTxtStyle}
                                options={this.getDropDownData()}
                                defaultValue={'请选择开户银行'}
                                style={styles.dropStyle}
                                dropdownStyle={styles.dropdownStyle}
                                renderRow={(rowData, rowID)=>this.renderDropDownRow(rowData, rowID)}
                                onSelect={(idx, value)=>this.onSelect(idx, value)}
                            />
                        </View>

                        <View style={styles.inputItemStyle}>
                            <View style={styles.inputTitleTxt}><Text>银行卡号</Text></View>
                            <TextInput
                                style={styles.inputStyle}
                                placeholder='请输入银行卡号'
                                keyboardType={'numeric'}
                                placeholderTextColor={Color.text.grey2}
                                underlineColorAndroid='transparent'
                                maxLength={21}
                                onChangeText={(text)=>this.onChangeAccountNum(text)}/>
                        </View>


                        <View style={styles.inputItemStyle}>
                            <View style={styles.inputTitleTxt}><Text>开户支行</Text></View>
                            <TextInput
                                style={styles.inputStyle}
                                placeholder='请输入开户支行'
                                placeholderTextColor={Color.text.grey2}
                                underlineColorAndroid='transparent'
                                maxLength={30}
                                onChangeText={(text)=>this.onChangeBankAddress(text)}
                            />
                        </View>

                        <View style={styles.inputItemStyle}>
                            <View style={styles.inputTitleTxt}><Text>交易密码</Text></View>
                            <TextInput
                                style={styles.inputStyle}
                                placeholder='请设置交易密码'
                                keyboardType={'numeric'}
                                secureTextEntry={true}
                                placeholderTextColor={Color.text.grey2}
                                underlineColorAndroid='transparent'
                                maxLength={4}
                                onChangeText={(text)=>this.onChangePassword(text)}
                            />
                            <TouchableOpacity
                                onPress={()=>this.setPwdDialogVisible()}>
                                <Image source={require('image!warn')} style={styles.tipIconStyle}/>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity
                            style={styles.bottomBarButtonStyle}
                            onPress={()=>this.addBank()}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>
                                完成
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <Dialog show={this.state.show}
                        setModalVisible={()=>this.setModalVisible()}
                        dialogTitle={'持卡人说明'}
                        dialogContent={' 为了您的账户资金安全，只能绑定持卡人\n本人的银行卡。获取帮助，请联系在线客服'}
                        btnTxt={'我知道了'}/>

                <Dialog show={this.state.showAddBankSuccess}
                        setModalVisible={()=>this.closeSuccess()}
                        dialogTitle={'温馨提示'}
                        dialogContent={'银行卡已添加成功'}
                        btnTxt={'确定'}
                />
                <Dialog show={this.state.showPwd}
                        setModalVisible={()=>this.setPwdDialogVisible()}
                        dialogTitle={'交易设置提示'}
                        dialogContent={'交易密码用于余额提现，\n可以在账户安全中修改'}
                        btnTxt={'我知道了'}
                />
                <LoadingSpinnerOverlay
                    ref={ component => this._modalLoadingSpinnerOverLay = component }/>
            </View>
        )
    }

    back() {
        dismissKeyboard()
        this.props.navigator.popToTop()
    }

    onBackAndroid() {
        this.back()
    }

    getDropDownData() {

        let banks = [
            "中国银行",
            "工商银行",
            "农业银行",
            "建设银行",
            "交通银行",
            "中国邮政",
            "中信银行",
            "光大银行",
            "华夏银行",
            "民生银行",
            "广发银行",
            "平安银行",
            "招商银行",
            "兴业银行",
            "浦发银行",
            "渤海银行",
            "上海银行",
            "北京银行",
            "北京农商银行",
            "上海农商银行",

        ]
        return banks;
    }


    // 显示/隐藏 modal
    setModalVisible() {
        let isShow = this.state.show;
        this.setState({
            show: !isShow,

        });
    }

    setPwdDialogVisible() {
        this.setState({
            showPwd: !this.state.showPwd
        })
    }

    setAddBankModalVisible() {
        let isShow = this.state.showAddBankSuccess;
        this.setState({
            showAddBankSuccess: !isShow,
        });
    }

    onChangeAccountNum(text) {
        this.state.accountNum = text;
    }

    onChangeRealName(text) {
        this.state.realName = text
    }

    onChangePassword(text) {
        this.state.password = text
    }

    showModal() {
        this.setModalVisible();
    }


    renderDropDownRow(rowData, rowId) {
        return (
            <TouchableOpacity>
                <View style={styles.dropDownItemStyle}>
                    <Text style={{fontSize: 16}}>{rowData}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    addBank() {

        if (!this.state.realName) {
            Toast.showShortCenter("请输入开户名")
            return
        }
        let reg =/^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/
        if (!this.state.realName.match(reg)) {
            Toast.showShortCenter("请输入正确的开户名")
            return
        }

        if (!this.state.accountNum.length) {
            Toast.showShortCenter("请输入银行卡号")
            return
        }
        let regs = /^[0-9]{10,}$/
        if (!this.state.accountNum.match(regs)) {
            Toast.showShortCenter("请输入正确的银行卡号")
            return
        }

        if (!this.state.bankName.length) {
            Toast.showShortCenter("请选择开户银行")
            return
        }
        if (!this.state.bankAddress.length) {
            Toast.showShortCenter("请输入开户支行")
            return
        }

        if (!this.state.password) {
            Toast.showShortCenter("请输入交易密码")
            return
        }
        regs = /^[0-9]{4}$/
        if (!this.state.password.match(regs)) {
            Toast.showShortCenter("交易密码格式错误")
            return
        }

        dismissKeyboard()

        if (helper.isGuestUser()) {
            Toast.showShortCenter('对不起，试玩账号没有不能添加银行卡信息!')
            return
        }
        this.addUserBankInfo()
    }


    addUserBankInfo() {
        let data = {
            realName: this.state.realName,
            securityPassword: this.state.password,
            userBankCardDto: {
                bankCardNo: this.state.accountNum,
                bankAccountName: this.state.realName,
                bankAddress: this.state.bankAddress,
                bankCode: this.state.bankCode,
                bankName: this.state.bankName,
            }
        };
        this._modalLoadingSpinnerOverLay.show()

        NetUtils.PutUrlAndParamsAndCallback(config.api.register_info, data, (response) => {
            this._modalLoadingSpinnerOverLay.hide()
            if (response.rs) {
                TCUSER_DATA.realname = this.state.realName
                this.timer = setTimeout(() => {
                    this.showSuccess()
                }, 500)
            } else {

                if (response.status === 500) {
                    Toast.showShortCenter("服务器出错啦")
                } else {
                    if (response.message) {
                        Toast.showShortCenter(response.message)
                    } else {
                        Toast.showShortCenter("添加信息失败，请稍后再试！")
                    }
                }
            }
        })
    }


    onChangeBankAddress(text) {
        this.state.bankAddress = text;
    }

    onSelect(idx, value) {
        this.state.bankName = value;
        this.state.bankCode = bankUtils.getBankById(idx).code;
    }

    showDialog() {

        this.setDialogVisible();
    }

    showSuccess() {
        this.setAddBankModalVisible()
    }

    closeSuccess() {
        dismissKeyboard()
        this.setAddBankModalVisible()
        let {navigator} = this.props;
        if (navigator) {
            RCTDeviceEventEmitter.emit('userBankChange');
            navigator.popToTop()
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
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
    titleTipTxtStyle: {
        color: Color.text.black1,
        marginTop: 20,
        marginLeft: 5,
        marginBottom: 5
    },
    inputItemStyle: {
        backgroundColor: 'white',
        height: 50,
        marginTop: 1,
        flexDirection: Direction.row,
        alignItems: 'center'
    },
    inputStyle: {
        flex: 1,
        paddingLeft: 10,
        color: Color.text.black1,
        fontSize: Size.default
    }, inputTitleTxt: {
        justifyContent: 'center',
        paddingLeft: 15,
    }, modalMain: {
        backgroundColor: 'white',
        height: Window.height * 0.3,
        width: Window.width * 0.8,
        borderRadius: 5
    }, modalStyle: {
        backgroundColor: 'rgba(52,52,52,0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, modalTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: Size.large,
        textAlign: 'center'
    }, modalContent: {
        height: Window.height * 0.15,
        justifyContent: 'center',
        alignItems: 'center'
    }, queryBtnStyle: {
        borderTopWidth: 1,
        borderTopColor: '#333333',
    }, queryTxtStyle: {
        color: Color.text.blue,
        height: 50,
        width: Window.width * 0.8,
        textAlign: 'center',
        paddingTop: 15
    }, tipIconStyle: {
        width: 35,
        height: 35,
        marginRight: 10
    }, dropdownStyle: {
        width: Window.width * 0.6,
        height: Window.height * 0.6,
        borderWidth: 1,
        borderRadius: 3,
    }, dropDownItemStyle: {
        alignItems: 'center',
        margin: 20,

    }, dropStyle: {
        marginLeft: 10,
    }, dropDownTxtStyle: {
        color: Color.text.black1,
    }
})