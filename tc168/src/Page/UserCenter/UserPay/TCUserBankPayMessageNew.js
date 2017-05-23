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
import KeyboardAvoidingScrollView from '../../../Common/View/TCKeyboardAvoidingScrollView';
import Toast from '@remobile/react-native-toast';
import Dialog from './Dialog'
import _ from 'lodash';
import RequestUtils from '../../../Common/Network/TCRequestUitls'
import {config} from '../../../Common/Network/TCRequestConfig'
import NavigatorHelper from '../../../Common/JXHelper/TCNavigatorHelper'
import LoadingSpinnerOverlay from 'react-native-smart-loading-spinner-overlay'
import DatePicker from 'react-native-datepicker'
import Moment from 'moment'
var moment = new Moment()

const BANK_PAY_TYPES = [{typeId: 0, typeName: '网银转账', typeCode: 'BANK_ONLINE'},
    {typeId: 1, typeName: 'ATM自动柜员机', typeCode: 'BANK_ATM'},
    {typeId: 2, typeName: 'ATM现金入款', typeCode: 'BANK_ATM_CASH'},
    {typeId: 3, typeName: '银行柜台转账', typeCode: 'BANK_COUNTER'},
    {typeId: 4, typeName: '手机银行转账', typeCode: 'BANK_PHONE'},
    {typeId: 5, typeName: '其他', typeCode: 'OTHER'}]
/**
 * 银行充值
 */
export default class TCUserBankPay extends Component {



    // 构造函数
    constructor(props) {

        let ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
        super(props)
        this.transferToupType = BANK_PAY_TYPES[0].typeCode
        this.state = {
            isClose: false,
            show: false,
            dataSource: ds.cloneWithRows(BANK_PAY_TYPES),
            typeSelect: 0,
            topupAmount: this.props.money,
            name: '',
            date: Moment().format('YYYY-MM-DD HH:mm:ss')
        }
    }

    static defaultProps = {};

    componentDidMount() {
    }


    render() {

        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={'转账资料'}
                    needBackButton={true}
                    rightTitle={'充值明细'}
                    rightButtonCall={()=> {
                        this.gotoPayRecord()
                    }}
                    backButtonCall={() => {
                        this.props.navigator.pop()
                    }}/>
                {/*  {this.renderTip()}*/}

                <KeyboardAvoidingScrollView>
                    <View style={styles.mainItemStyle}>

                        <View style={styles.firstItemStyle}>
                            <Text style={styles.firstItemTxtStyle}>收款账号信息</Text>
                        </View>

                        <View style={styles.itemStyle}>
                            <View><Text style={styles.itemTitleTxtStyle}>收款银行</Text></View>
                            <View><Text style={styles.transferNoTxt}>{this.props.bank.bankName}</Text></View>
                            <TouchableOpacity style={styles.itemRightStyle}
                                              onPress={()=>this.onCopy(this.props.bank.bankName)}>
                                <View style={styles.itemBtnStyle}>
                                    <Text style={styles.itemBtnTxtStyle}>复制</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.itemStyle}>
                            <View><Text style={styles.itemTitleTxtStyle}>{'收 款 人  '}</Text></View>
                            <View><Text style={styles.transferNoTxt}>{this.props.bank.receiptName}</Text></View>
                            <TouchableOpacity style={styles.itemRightStyle}
                                              onPress={()=>this.onCopy(this.props.bank.receiptName)}>
                                <View style={styles.itemBtnStyle}>
                                    <Text style={styles.itemBtnTxtStyle}>复制</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemStyle}>
                            <View><Text style={styles.itemTitleTxtStyle}>收款账号</Text></View>
                            <View><Text style={styles.transferNoTxt}>{this.props.bank.bankCardNo}</Text></View>
                            <TouchableOpacity style={styles.itemRightStyle}
                                              onPress={()=>this.onCopy(this.props.bank.bankCardNo)}>
                                <View style={styles.itemBtnStyle}>
                                    <Text style={styles.itemBtnTxtStyle}>复制</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.itemStyle}>
                            <View><Text style={styles.itemTitleTxtStyle}>开户网点</Text></View>
                            <View><Text style={styles.transferNoTxt}>{this.props.bank.bankAddress}</Text></View>
                            <TouchableOpacity style={styles.itemRightStyle}
                                              onPress={()=>this.onCopy(this.props.bank.bankAddress)}>
                                <View style={styles.itemBtnStyle}>
                                    <Text style={styles.itemBtnTxtStyle}>复制</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.itemStyle}>
                            <View><Text style={styles.itemTitleTxtStyle}>{'充 值 码  '}</Text></View>
                            <View><Text style={styles.transferNoTxt}>{this.props.topupCode}</Text></View>
                            <TouchableOpacity style={styles.itemRightStyle}
                                              onPress={()=>this.onCopy(this.props.topupCode)}>
                                <View style={styles.itemBtnStyle}>
                                    <Text style={styles.itemBtnTxtStyle}>复制</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/*    <View>
                         <Text style={styles.tipBtmTxt}>
                         注意：请将您的充值码填写在银行转账的备注中，以便转账金额快速到账!
                         </Text>
                         </View>*/}
                    </View>

                    {
                        /*
                         * 入款信息
                         * */
                    }
                    <View style={styles.mainItemStyle}>

                        <View style={styles.itemStyle}>
                            <View><Text style={styles.itemTitleTxtStyle}>存入时间{'    '}</Text></View>
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
                            <View><Text style={styles.itemTitleTxtStyle}>存入金额{'    '}</Text></View>
                            <View style={styles.inputStyle}>
                                <TextInput
                                    style={styles.inputTxtStyle}
                                    keyboardType={'numeric'}
                                    underlineColorAndroid='transparent'
                                    maxLength={6}
                                    defaultValue={this.props.money}
                                    onChangeText={(text)=> {
                                        this.changeMoney(text)
                                    }}
                                    multiline={false}
                                /></View>
                        </View>
                        <View style={styles.itemStyle}>
                            <View><Text style={styles.itemTitleTxtStyle}>存款人姓名</Text></View>
                            <View style={styles.inputStyle}>
                                <TextInput
                                    style={styles.inputTxtStyle}
                                    underlineColorAndroid='transparent'
                                    multiline={false}
                                    maxLength={15}
                                    onChangeText={(text)=> {
                                        this.changeName(text)
                                    }}
                                /></View>
                        </View>
                    </View>

                    {
                        /*
                         * 入款方式
                         * */
                    }
                    <View style={styles.mainItemStyle}>

                        <ListView
                            ref="ListView"
                            contentContainerStyle={styles.listViewStyle}
                            dataSource={this.state.dataSource}
                            renderRow={(rowData, sectionID, rowID) => this.getPayTypeView(rowData, sectionID, rowID)}
                            initialListSize={6}
                            stickyHeaderIndices={[0]}
                            horizontal={false}
                            removeClippedSubviews={false}
                            keyboardShouldPersistTaps={true}
                        />
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
                                    我已转账
                                </Text>
                            </TouchableOpacity>

                        </View>

                        <Dialog
                            ref='Dialog'
                            dialogTitle={'温馨提示'}
                            dialogContent={'是否已记住转账信息？'}
                            leftTxt={'是'}
                            btnTxt={'否'}
                            show={this.state.show}
                            rightBtnClick={()=>this.setModalVisible()}
                            leftBtnClick={()=>this.submitPay()}
                        />
                        <LoadingSpinnerOverlay
                            ref={ component => this._modalLoadingSpinnerOverLay = component }/>
                    </View>

                </KeyboardAvoidingScrollView>
            </View>
        )
    }

    close() {
        let isClose = this.state.isClose;
        this.setState({
            isClose: !isClose
        });
    }

    // 显示/隐藏 modal
    setModalVisible() {
        // let isShow = this.state.show;
        // this.setState({
        //     show: !isShow,
        // });
        let dialog = this.refs.Dialog
        if (dialog.state.modalVisible) {
            dialog._setModalVisible(false);
        } else {
            dialog._setModalVisible(true);
        }
    }

    changeMoney(text) {
        this.state.topupAmount = text
    }

    changeName(text) {
        this.state.name = text
    }

    onCopy(text) {
        Clipboard.setString(text);
        Toast.showShortCenter("已复制！")
    }


    getPayTypeView(rowData, sectionID, rowID) {
        return (
            <PayTypeItemView
                rowData={rowData}
                rowId={rowID}
                selectIndex={this.state.typeSelect}
                btnClick={(typeId)=> {
                    this.transferToupType = BANK_PAY_TYPES[typeId].typeCode
                    this.setState({
                        typeSelect: typeId
                    })
                }}/>
        )
    }

    validateInfo() {
        let reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/
        if (!this.state.topupAmount.match(reg)) {
            Toast.showShortCenter('您输入的金额格式不正确!')
            return false
        }

        reg = /^[\u4e00-\u9fa5]{2,15}$/
        //
        if (!this.state.name.match(reg)) {
            Toast.showShortCenter("请输入正确的存款人姓名!")
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
            adminBankId: this.props.adminBankId,
            topupAmount: this.state.topupAmount,
            topupCardRealname: this.state.name,
            topupTime: this.state.date,
            transferToupType: this.transferToupType
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
        // this.setModalVisible();
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

    /* renderTip() {
     if (this.state.isClose) {
     return;
     } else {
     return (<View style={styles.tipViewStyle}>
     <Image source={require('image!warn')} style={styles.tipIconStyle}/>
     <Text style={styles.tipTextStyle}>提醒您，同行转账才能立即到账哦</Text>
     <View style={styles.closeViewStyle}>
     <TouchableOpacity onPress={()=>this.close()}>
     <Image source={require('image!close')}
     style={styles.closeIconStyle}/>
     </TouchableOpacity></View>
     </View>);
     }
     }*/

    /**
     * 跳转到充值历史界面
     */
    gotoPayRecord() {
        NavigatorHelper.pushToUserPayAndWithDraw(1)
    }

    formatOrderId(orderId) {
        return orderId.substr(0, 6) + ' ****** ' + orderId.substr(orderId.length - 5, orderId.length)
    }
}


class PayTypeItemView extends React.Component {
    constructor(state) {
        super(state);
        this.state = {};
    }

    render() {
        return (  <TouchableOpacity style={styles.itemContainer} onPress={()=> {

            this.props.btnClick && this.props.btnClick(this.props.rowData.typeId)
        }}>
            <Image
                source={this.props.selectIndex === this.props.rowData.typeId ? require('image!bank_select') : require('image!bank_select2')}
                style={styles.itemImageStyle}/>
            <View style={{marginLeft: 10, justifyContent: 'center', width: Window.width / 2 - 80} }>
                <Text> {this.props.rowData.typeName} </Text>
            </View>

        </TouchableOpacity>)
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
    },
})