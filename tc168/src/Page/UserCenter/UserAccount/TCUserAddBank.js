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
    Platform,
    ScrollView
} from 'react-native'
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import LoadingSpinnerOverlay from 'react-native-smart-loading-spinner-overlay'
import  Luhn from './Luhn'
import Toast from '@remobile/react-native-toast';
import  dismissKeyboard from 'dismissKeyboard'
import  BankUtils from './BankUtils'
import BackBaseComponent from '../../Base/TCBaseBackComponent'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import  UserMessage from '../../UserCenter/UserInfo/TCUserMessage'
import ModalDropdown from '../../../Common/View/ModalDropdown'
import NetUtils from '../../../Common/Network/TCRequestUitls'
import {config} from '../../../Common/Network/TCRequestConfig'
let luhn = new Luhn();
let bankUtils = new BankUtils();

/**
 * 添加银行卡
 */
export default class TCUserAddBank extends BackBaseComponent {



    // 构造函数
    constructor(props) {

        super(props)

        this.state = {
            show: false,
            accountName: '',
            accountNum: '',
            isShow: false,
            realName: TCUSER_DATA.realname,
            bankAddress: '',
            bankCode: '',
            bankName: '',
            showAddBankSuccess: false
        }
    }

    static defaultProps = {};

    componentDidMount() {
        super.componentDidMount();
        if (!TCUSER_DATA.realname && TCUSER_DATA.islogin) {
            this.setDialogVisible();
        }
        this.listener = RCTDeviceEventEmitter.addListener('realNameChange', (realName) => {
            this.setState({
                realName: realName
            })
        })
    }

    componentWillUnmount() {
        super.componentWillUnmount()
        this.listener && this.listener.remove()
    }

    render() {

        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={'添加银行卡'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.props.navigator.pop()
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
                            <Text style={styles.inputStyle}>{this.state.realName}</Text>
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
                                onChangeText={(text)=>this.onChangeBankAddress(text)}
                            />
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

                <Dialog show={this.state.isShow}
                        setModalVisible={()=>this.closeDialog()}
                        dialogTitle={'温馨提示'}
                        dialogContent={'绑定银行卡需要补全个人信息\n及真实姓名，现在去补全。'}
                        btnTxt={'好'}
                />

                <Dialog show={this.state.showAddBankSuccess}
                        setModalVisible={()=>this.closeSuccess()}
                        dialogTitle={'温馨提示'}
                        dialogContent={'银行卡已添加成功'}
                        btnTxt={'确定'}
                />

                <LoadingSpinnerOverlay
                    ref={ component => this._modalLoadingSpinnerOverLay = component }/>
            </View>
        )
    }

    setDialogVisible() {
        let isShow = this.state.isShow;
        this.setState({
            isShow: !isShow,
        });
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

    closeDialog() {
        this.setDialogVisible();
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'userMessage',
                component: UserMessage,
                passProps: {
                    isBackToTop: false,
                    ...this.props,
                }
            })
        }
    }

    // 显示/隐藏 modal
    setModalVisible() {
        let isShow = this.state.show;
        this.setState({
            show: !isShow,

        });
    }

    setAddBankModalVisible() {
        let isShow = this.state.showAddBankSuccess;
        this.setState({
            showAddBankSuccess: !isShow,
        });
    }

    onChangeAccountName(text) {
        this.state.accountName = text;
    }

    onChangeAccountNum(text) {
        this.state.accountNum = text;
    }

    showModal() {
        this.setModalVisible();
    }

    /**
     * 银行卡
     * @param num
     * @returns {*}
     */
    validBankNum(num) {
        // if (num.length != 16 || num.length != 19) {
        //     return luhn.luhn(num);
        // } else {
        //     return false;
        // }
        if (num.length < 10) {
            return false
        } else {
            return true
        }
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


        dismissKeyboard()
        let data = {
            bankCardNo: this.state.accountNum,
            bankAccountName: TCUSER_DATA.realname,
            bankAddress: this.state.bankAddress,
            bankCode: this.state.bankCode,
            bankName: this.state.bankName,
        };
        this._modalLoadingSpinnerOverLay.show()

        NetUtils.PostUrlAndParamsAndCallback(config.api.userCards, data, (response) => {
            this._modalLoadingSpinnerOverLay.hide()
            if (response.rs) {
                this.timer = setTimeout(() => {
                    this.showSuccess()
                }, 500)
            } else {

                if (response.message) {
                    Toast.showShortCenter(response.message)
                } else {
                    Toast.showShortCenter("银行卡添加失败，请稍后再试！")
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
        this.setAddBankModalVisible()
        let {navigator} = this.props;
        if (navigator) {
            RCTDeviceEventEmitter.emit('userBankChange');
            navigator.popN(1)
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
        marginTop: 40,
        marginBottom: Platform.OS === 'ios' ? 100 : 0
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
        borderTopColor: '#cccccc',
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
        fontSize: Size.default
    }
})