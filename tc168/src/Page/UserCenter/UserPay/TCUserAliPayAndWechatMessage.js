import React, {Component, PropTypes,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    ListView,
    ScrollView,
    Clipboard,
    Platform,
    TextInput,

} from 'react-native'
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import  PayProgress from './TCUserPayProgress'
import Toast from '@remobile/react-native-toast';
import _ from 'lodash';
import RequestUtils from '../../../Common/Network/TCRequestUitls'
import {config} from '../../../Common/Network/TCRequestConfig'
import NavigatorHelper from '../../../Common/JXHelper/TCNavigatorHelper'
import LoadingSpinnerOverlay from 'react-native-smart-loading-spinner-overlay'
import DatePicker from 'react-native-datepicker'
import Moment from 'moment'
var moment = new Moment()
import dismissKeyboard from 'dismissKeyboard'

/**
 * 银行充值
 */
export default class TCUserAliPayAndWechatMessage extends Component {



    // 构造函数
    constructor(props) {

        super(props)
        this.state = {
            typeSelect: 0,
            topupAmount: this.props.money,
            name: '',
            date: Moment().format('YYYY-MM-DD HH:mm:ss'),
            orderNo: ''
        }
    }

    static defaultProps = {};

    componentDidMount() {
    }


    render() {

        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={this.props.type === 'ZHB' ? '支付宝充值提单' : '微信充值提单'}
                    needBackButton={true}
                    rightTitle={'充值明细'}
                    rightButtonCall={()=> {
                        this.gotoPayRecord()
                    }}
                    backButtonCall={() => {
                        this.props.navigator.pop()
                    }}/>
                {/*  {this.renderTip()}*/}

                <ScrollView
                    keyboardDismissMode={'on-drag'}
                    onScroll={()=> {
                        dismissKeyboard()
                    }}
                >
                    {
                        /*
                         * 入款信息
                         * */
                    }
                    <View style={styles.mainItemStyle}>

                        <View style={styles.itemStyle}>
                            <View><Text style={styles.itemTitleTxtStyle}>存入时间</Text></View>
                            <View>
                                <DatePicker
                                    style={{width: Window.width * 0.58, backgroundColor: 'white'}}
                                    date={this.state.date}
                                    mode="datetime"
                                    format="YYYY-MM-DD HH:mm:ss"
                                    confirmBtnText="确认"
                                    cancelBtnText="取消"
                                    showIcon={false}
                                    is24Hour={true}
                                    customStyles={{
                                        dateIcon: null,
                                        dateInput: {
                                            height: 30,
                                            borderColor: Color.border.grey1,
                                            borderWidth: 0.5,
                                            alignItems: 'flex-start',

                                            backgroundColor: 'white'
                                        },
                                        dateText: {
                                            width: Window.width * 0.58 - 2,
                                            height: 29,
                                            padding: 5,
                                        }
                                    }}
                                    onDateChange={(date) => {
                                        this.setState({date: date})
                                    }}
                                />

                            </View>
                        </View>
                        <View style={styles.itemStyle}>
                            <View><Text style={styles.itemTitleTxtStyle}>存入金额</Text></View>
                            <View style={styles.inputStyle}>
                                <TextInput
                                    style={styles.inputTxtStyle}
                                    keyboardType={'numeric'}
                                    underlineColorAndroid='transparent'
                                    maxLength={6}
                                    defaultValue={this.props.topupAmount}
                                    onChangeText={(text)=> {
                                        this.changeMoney(text)
                                    }}
                                    multiline={false}
                                /></View>
                        </View>
                        <View style={styles.itemStyle}>
                            <View><Text style={styles.itemTitleTxtStyle}>账号昵称</Text></View>
                            <View style={styles.inputStyle}>
                                <TextInput
                                    style={styles.inputTxtStyle}
                                    underlineColorAndroid='transparent'
                                    multiline={false}
                                    maxLength={20}
                                    placeholder={this.props.type === 'ZHB' ? '请输入支付宝账号昵称' : '请输入微信账号昵称'}
                                    onChangeText={(text)=> {
                                        this.changeName(text)
                                    }}
                                /></View>
                        </View>

                        <View style={styles.itemStyle}>
                            <View><Text style={styles.itemTitleTxtStyle}>验证信息</Text></View>
                            <View style={styles.inputStyle}>
                                <TextInput
                                    style={styles.inputTxtStyle}
                                    underlineColorAndroid='transparent'
                                    multiline={false}
                                    maxLength={4}
                                    onChangeText={(text)=> {
                                        this.changeOrder(text)
                                    }}
                                    keyboardType={'numeric'}
                                    placeholder='请输入订单号后四位'
                                /></View>
                        </View>
                    </View>

                    <View style={{alignItems:'center',marginTop:10}}>
                        <Text style={styles.tiptxtStyle}>*请输入您的交易订单号后4位数字</Text>
                    </View>

                    <View style={styles.btmStyle}>

                        <View style={{alignItems: 'center', marginBottom: 20}}>

                            <TouchableOpacity
                                style={[styles.bottomBarButtonStyle, {paddingLeft: 25, paddingRight: 25}]}
                                onPress={() => {
                                    this.props.navigator.pop()
                                }}
                            >
                                <Text style={{color: 'white', fontWeight: 'bold'}}>
                                    上一步
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{alignItems: 'center', marginBottom: 20, marginLeft: 30}}>
                            <TouchableOpacity
                                style={styles.bottomBarButtonStyle}
                                onPress={()=>this.submitPay()}
                            >
                                <Text style={{color: 'white', fontWeight: 'bold'}}>
                                    提  单
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <LoadingSpinnerOverlay
                            ref={ component => this._modalLoadingSpinnerOverLay = component }/>
                    </View>
                    <View>
                        {this.getTransferTip()}
                    </View>
                </ScrollView>
            </View>
        )
    }

    changeMoney(text) {
        this.state.topupAmount = text
    }

    changeName(text) {
        this.state.name = text
    }

    changeOrder(text) {
        this.state.orderNo = text
    }

    validateInfo() {
        let reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/
        if (!this.state.topupAmount.match(reg)) {
            Toast.showShortCenter('您输入的金额格式不正确!')
            return false
        }

        //
        if (this.state.name.length < 2 || this.state.name.length > 20) {
            Toast.showShortCenter("请输入正确账号昵称!")
            return false
        }
        let reg1 = /[0-9]{4,}/
        if (!this.state.orderNo.match(reg1)) {
            Toast.showShortCenter('请输入订单号后四位!')
            return false
        }

        return true
    }


    submitPay() {

        if (!this.validateInfo()) {
            return
        }

        this._modalLoadingSpinnerOverLay.show()
        let params = {
            adminBankId: this.props.data.adminBankId,
            topupAmount: this.state.topupAmount,
            topupCardRealname: this.state.name,
            topupTime: this.state.date,
            transferToupType: this.props.type === 'ZHB' ? 'ALIPAY' : 'WECHATPAY',
            paymentPlatformOrderNo: this.state.orderNo
        }
        RequestUtils.PutUrlAndParamsAndCallback(config.api.banktransfersQueryv3, params, (response) => {
            this._modalLoadingSpinnerOverLay.hide()
            if (response.rs) {
                this.gotoProgress()
            } else {

                if (response.status === 500) {
                    Toast.showShortCenter('服务器出错啦!')
                } else {
                    if (response.message) {
                        Toast.showShortCenter(response.message)
                    } else {
                        Toast.showShortCenter('转账确认失败,请您联系客服!')
                    }
                }
            }
        })
    }

    gotoProgress() {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'payProgress',
                component: PayProgress,
                passProps: {
                    topupAmount: this.state.topupAmount,
                    ...this.props,
                }
            })
        }
    }

    /**
     * 跳转到充值历史界面
     */
    gotoPayRecord() {
        NavigatorHelper.pushToUserPayAndWithDraw(1)
    }

    getTransferTip() {
        if (Platform.OS == 'ios1111') {
            return (<Text style={styles.tipTxtStyle}>扫码步骤：{'\n'}
                1.同时按下【开机电源】键+【Home】截屏保存到相册。{'\n'}
                2.点“扫码加好友”同时打开{this.props.type == 'ZHB' ? '支付宝' : '微信'}。{'\n'}
                3.请在{this.props.type == 'ZHB' ? '支付宝' : '微信'}中打开“扫一扫”。{'\n'}
                4.在扫一扫中点击右上角，选择“从相册选取二维码”选取截屏的图片。{'\n'}
                5.输入您欲充值的金额并进行转账。如充值未及时到账，请联系客服。{'\n'}</Text>)
        } else {
            return (<Text style={styles.tipTxtStyle}>扫码步骤：{'\n'}
                1.点“扫码加好友”将自动为您截屏并保存到相册,同时打开{this.props.type == 'ZHB' ? '支付宝' : '微信'}。{'\n'}
                (若图片未保存至相册，请手动截屏){'\n'}
                2.请在{this.props.type == 'ZHB' ? '支付宝' : '微信'}中打开“扫一扫”。{'\n'}
                3.在扫一扫中点击右上角，选择“从相册选取二维码”选取截屏的图片。{'\n'}
                4.输入您欲充值的金额并进行转账。如充值未及时到账，请联系客服。{'\n'}</Text>)
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
    },
    bottomBarButtonStyle: {
        backgroundColor: Color.bg.btnBg,
        justifyContent: 'center',
        flexDirection: Direction.row,
        alignItems: 'center',
        borderRadius: 4,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 40
    }, tipViewStyle: {
        flexDirection: Direction.row,
        backgroundColor: Color.bg.topTipBg,
        justifyContent: 'center',
        alignItems: 'center',
    }, tipTextStyle: {
        color: Color.text.red1,
        fontSize: Size.default,
        textAlign: 'center',
        padding: 10
    }, closeIconStyle: {
        width: 20,
        height: 20,
    }, closeViewStyle: {
        marginLeft: Platform.OS == 'ios' ? 10 : 30,
    }, tipIconStyle: {
        width: 25,
        height: 25,
    }, mainItemStyle: {
        backgroundColor: 'white',
        marginTop: 10
    }, firstItemTxtStyle: {
        color: Color.text.black1,
        paddingLeft: 5,
        fontSize: Size.default
    }, firstItemStyle: {
        borderBottomWidth: 1,
        borderBottomColor: Color.border.grey4,
        padding: 10
    }, itemStyle: {
        flexDirection: Direction.row,
        borderBottomWidth: 1,
        borderBottomColor: Color.border.grey4,
        alignItems: 'center',
        paddingLeft: 10
    }, itemTitleTxtStyle: {
        fontSize: Size.default,
        padding: 10,
    }, itemMidTxtStyle: {
        color: Color.text.grey3,
        fontSize: Size.default,
        padding: 10,
    },
    transferNoTxt: {
        color: Color.text.grey3,
        fontSize: Size.default,
        padding: 10,
        width: Window.width * 0.58
    },
    itemBtnStyle: {
        marginRight: 10,

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
    }, itemColumnStyle: {
        flexDirection: Direction.row,
        borderBottomWidth: 1,
        borderBottomColor: Color.border.grey4,
    }, itemRightStyle: {
        marginRight: 20,
        alignItems: 'center',

    }, btmStyle: {
        flexDirection: Direction.row,
        justifyContent: 'center'
    }, tipBtmTxt: {
        color: 'red',
        margin: 10
    }, inputStyle: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }, inputTxtStyle: {
        fontSize: Size.default,
        borderColor: Color.border.grey1,
        width: Window.width * 0.58,
        borderWidth: 0.5,
        height: 30,
        padding: 4,
    }, itemContainer: {
        flexDirection: 'row',
        height: 50,
        width: Window.width / 2 - 20,
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 0.5,
        marginLeft: 20
    }, itemImageStyle: {
        flexDirection: Direction.row,
        width: 20,
        height: 20,
        paddingLeft: 10,
    }, listViewStyle: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: Window.width,
    }, tiptxtStyle: {
        color:'red'
    }, tipTxtStyle: {
        color: 'red',
        padding: 10,
        fontSize: Size.small
    }
})