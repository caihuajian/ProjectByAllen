'use strict'
/**
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import  TimerMixin from 'react-timer-mixin'
import LoadingSpinnerOverlay from 'react-native-smart-loading-spinner-overlay'
import  dismissKeyboard from 'dismissKeyboard';
import UserDetailMsg from './UserInfo/TCUserDetailMsg'
import UserSetting from './TCUserSetting'
var {width, height} = Dimensions.get('window');
import UserWithdraw from './UserWithdraw/TCUserWithdrawNew'
import UserManger from './UserInfo/TCPwdManager'
import  UserPay from './UserPay/TCUserPayNew'
import  BankManager from './UserAccount/TCUserBankManager'
import  MessageList from './UserMessage/TCUserMessagePage'
import Helper from '../../Common/JXHelper/TCNavigatorHelper'
import  InitHelper from '../../Common/JXHelper/TCInitHelper'
import SoundHelper from '../../Common/JXHelper/SoundHelper'
import NavigatorHelper from '../../Common/JXHelper/TCNavigatorHelper'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import UserInfo from '../UserCenter/UserInfo/TCAddUserInfo'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    Platform,
} from 'react-native';
import {Size, Color, Window, Direction} from '../../Common/Style/AppStyle'
import RequestUtils  from '../../Common/Network/TCRequestUitls'
import {config} from '../../Common/Network/TCRequestConfig'
import UserCollects from '../UserCenter/UserCollect/TCUserCollect'
import Moment from 'moment'
import AgentTeamList from '../UserCenter/Agent/Team/TCAgentTeamList'
import AgentCommissionList from '../UserCenter/Agent/Commission/TCAgentCommissionList'
import Toast from '@remobile/react-native-toast'
let helper = new InitHelper()
export  default  class TCUserCenter extends Component {

    constructor(props) {
        super(props)
        this.lastRequestTime = 0
        this.state = {
            isShow: false,
            isSee: true,
            balance: TCUSER_BALANCE,

        }
    }

    static defaultProps = {};

    componentDidMount() {
        this.listener = RCTDeviceEventEmitter.addListener('balanceChange', () => {
            this.freshBalance()
        })
    }

    componentWillUnmount() {
        this.listener && this.listener.remove()
    }

    render() {


        return (
            <View style={styles.container}>

                <ScrollView bounces={false}>
                    <View>
                        <Image source={{uri: 'usercentr_default_background'}} style={styles.imgTop}>

                            <View >

                                <TouchableOpacity style={{alignItems: 'flex-end'}} onPress={()=> {
                                    if (TC_BUTTON_SOUND_STATUS) {
                                        SoundHelper.playSoundBundle();
                                    }

                                    Helper.gotoSetting()
                                }}>
                                    <Image source={{uri: 'top_bar_tools'}} style={styles.imgSet}/>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=> {
                                    this.gotoUserDetail()
                                }
                                }>

                                    <View style={{flexDirection: 'row', height: 80}}>
                                        <Image source={require('../../Page/resouce/user_default_icon.png')}
                                               style={styles.imgUser}/>
                                        <View style={styles.userTitle}>
                                            <Text style={styles.userName}>{TCUSER_DATA.username}</Text>
                                            {/*<View style={styles.userDes}>*/}
                                            {/*<Text style={styles.userTxt}>会员积分：</Text>*/}
                                            {/*<Text style={styles.userTxt}>100</Text>*/}
                                            {/*</View>*/}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Image>

                    </View>
                    <View style={{backgroundColor: 'white'}}>

                        <View style={styles.account}>

                            <View style={styles.accountData}><Text
                                style={styles.accountTxt}>{this.state.isSee ? this.state.balance : '******'}</Text>

                                <TouchableOpacity onPress={()=> {
                                    this.setMoneyVisible()
                                }}>
                                    <Image
                                        source={this.state.isSee ? require('image!icon_eye') : require('image!icon_eye2')}
                                        style={styles.imgAccount}/>
                                </TouchableOpacity>

                            </View>
                            <TouchableOpacity style={styles.accountDetail} onPress={()=> {
                                this.freshBalance()
                            }
                            }>
                                <View style={styles.freshView}>
                                    <Text
                                        style={styles.accountDetailTxt}>刷新余额</Text></View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.userPay}>
                            <TouchableOpacity onPress={()=> {
                                this.gotoPay()
                            }}>
                                <View style={styles.payItem}>
                                    <Image source={require('image!icon_pay')}
                                           style={styles.imgPay}
                                    />
                                    <Text style={styles.payTxt}>充值</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> {
                                this.gotoWithdraw()
                            }}>
                                <View style={styles.payItem}>
                                    <Image source={require('image!icon_drawings')} style={styles.imgOut}/>
                                    <Text style={styles.payTxt}>提款</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.myOrder}>
                        <TouchableOpacity onPress={()=> {
                            this.gotoUserOrderRecord(0)
                        }
                        }>
                            <View style={styles.myOrderTitle}>
                                <Text style={styles.myOrderLeftTitle}>我的彩票</Text>
                                <View style={styles.myOrderRightTitle}>
                                    <Text style={styles.myOrderRightTxt}>查看全部订单</Text>
                                    <Image source={require('image!icon_next')} style={styles.imgNext}/></View>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.myOrderBtmView}>
                            <TouchableOpacity onPress={()=> {
                                this.gotoUserOrderRecord(2)
                            }
                            }>
                                <View style={styles.orderIconItemStyle}>
                                    <Image source={require('image!dai')} style={styles.orderIconStyle}/>
                                    <Text style={styles.myOrderBtmTxt}>待开奖订单</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> {
                                this.gotoUserOrderRecord(1)
                            }
                            }>
                                <View style={styles.orderIconItemStyle}>
                                    <Image source={require('image!jiangli')} style={styles.orderIconStyle}/>
                                    <Text style={styles.myOrderBtmTxt}>中奖订单</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=> {
                                this.gotoUserOrderRecord(4)
                            }
                            }>
                                <View style={styles.orderIconItemStyle}>
                                    <Image source={require('image!dingdan')} style={styles.orderIconStyle}/>
                                    <Text style={styles.myOrderBtmTxt}>已开奖订单</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.mySettingStyle}>

                        <TouchableOpacity onPress={()=> {
                            this.gotoUserAccount(0)
                        }
                        }>
                            <View style={styles.myOrderTitle}>
                                <View style={styles.mySetttingLeftStyle}>
                                    <Image source={require('image!account')} style={styles.img}/>
                                    <Text style={styles.mySettingLeftTxtStyle}>账户明细</Text>
                                </View>
                                <View style={{paddingRight: 10}}>
                                    <Image source={require('image!icon_next')} style={styles.imgNext}/>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=> {
                            this.gotoUserPayAndWithdraw(1)
                        }
                        }>
                            <View style={styles.myOrderTitle}>
                                <View style={styles.mySetttingLeftStyle}>
                                    <Image source={require('image!pay_records')} style={styles.img}/>
                                    <Text style={styles.mySettingLeftTxtStyle}>充值记录</Text>
                                </View>
                                <View style={{paddingRight: 10}}>
                                    <Image source={require('image!icon_next')} style={styles.imgNext}/>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=> {
                            this.gotoUserPayAndWithdraw(2)
                        }
                        }>
                            <View style={styles.myOrderTitle}>
                                <View style={styles.mySetttingLeftStyle}>
                                    <Image source={require('image!withdraw_withdraw')} style={styles.img}/>
                                    <Text style={styles.mySettingLeftTxtStyle}>提款记录</Text>
                                </View>
                                <View style={{paddingRight: 10}}>
                                    <Image source={require('image!icon_next')} style={styles.imgNext}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> {
                            this.gotoPwdManager()
                        }}>
                            <View style={styles.myOrderTitle}>
                                <View style={styles.mySetttingLeftStyle}>
                                    <Image source={require('image!secure')} style={styles.img}/>
                                    <Text style={styles.mySettingLeftTxtStyle}>账户安全</Text>
                                </View>
                                <View style={{paddingRight: 10}}>
                                    <Image source={require('image!icon_next')} style={styles.imgNext}/>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=> {
                            this.gotoBankManager()
                        }}>
                            <View style={styles.myOrderTitle}>
                                <View style={styles.mySetttingLeftStyle}>
                                    <Image source={require('image!bank_manage')} style={styles.img}/>
                                    <Text style={styles.mySettingLeftTxtStyle}>银行卡管理</Text>
                                </View>
                                <View style={{paddingRight: 10}}>
                                    <Image source={require('image!icon_next')} style={styles.imgNext}/>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=> {
                            this.gotoMessagelist()
                        }}>
                            <View style={styles.myOrderTitle}>
                                <View style={styles.mySetttingLeftStyle}>
                                    <Image source={require('image!person_news')} style={styles.img}/>
                                    <Text style={styles.mySettingLeftTxtStyle}>个人消息</Text>
                                </View>
                                <View style={{paddingRight: 10}}>
                                    {this.getMsgTip()}
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=> {
                            this.gotoUserCollect()
                        }}>
                            <View style={styles.myOrderTitle}>
                                <View style={styles.mySetttingLeftStyle}>
                                    <Image source={require('../../Page/resouce/shoucang.png')} style={styles.img}/>
                                    <Text style={styles.mySettingLeftTxtStyle}>个人收藏</Text>
                                </View>
                                <View style={{paddingRight: 10}}>
                                    <Image source={require('image!icon_next')} style={styles.imgNext}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>


                    {this.isAgent()}

                    <TouchableOpacity onPress={()=> {
                        Helper.gotoSetting()
                    }}>
                        <View style={styles.mySettingItemStyle}>
                            <View style={styles.mySetttingLeftStyle}>
                                <Image source={require('image!set')} style={styles.img}/>
                                <Text style={styles.mySettingLeftTxtStyle}>设置</Text>
                            </View>
                            <View style={{paddingRight: 10}}>
                                <Image source={require('image!icon_next')} style={styles.imgNext}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </ScrollView>

                {/*
                 <Dialog show={this.state.isShow}
                 setModalVisible={()=>this.closeDialog()}
                 dialogTitle={'温馨提示'}
                 dialogContent={'绑定银行卡需要补全个人信息\n及真实姓名，现在去补全。'}
                 btnTxt={'好'}
                 />*/}

            </View>

        );

    };


    gotoWithdraw() {
        if (helper.isGuestUser()) {
            Toast.showShortCenter('对不起，试玩账号不能进行存取款操作!')
            return
        }
        let {navigator} = this.props;
        if (navigator) {
            var page = UserWithdraw
            if (!TCUSER_DATA.realname) {
                page = UserInfo
            }
            navigator.push({
                name: 'userWithdraw',
                component: page,
                passProps: {
                    ...this.props,
                }
            })
        }
    }

    gotoPay() {
        //
        // let {navigator} = this.props;
        // if (navigator) {
        //     navigator.push({
        //         name: 'userPay',
        //         component: UserPay,
        //         passProps: {
        //             ...this.props,
        //         }
        //     })
        // }
        NavigatorHelper.pushToPay()
    }


    gotoUserDetail() {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'userDetailMsg',
                component: UserDetailMsg,
                passProps: {
                    ...this.props,
                }
            })
        }
    }

    gotoUserAccount(page) {
        NavigatorHelper.pushToUserAccount(page)
    }

    gotoUserPayAndWithdraw(type) {
        NavigatorHelper.pushToUserPayAndWithDraw(type)
    }

    freshBalance() {

        if (!TCUSER_DATA.username) {
            return
        }
        if (this.lastRequestTime == 0) {
            this.lastRequestTime = Moment().format('X')
        } else {
            let temp = Moment().format('X') - this.lastRequestTime
            if (temp < 1) {
                return
            } else {
                this.lastRequestTime = Moment().format('X')
            }
        }
        RequestUtils.getUrlAndParamsAndCallback(config.api.userBalance, null, (response) => {
            if (response.rs) {
                storage.save({
                    key: 'balance',
                    rawData: response.content.balance
                })
                TCUSER_BALANCE = response.content.balance
                this.setState({
                    balance: response.content.balance
                })
            } else {

            }
        })
    }

    //跳转到用户投注记录界面
    gotoUserOrderRecord(page) {
        NavigatorHelper.pushToOrderRecord(page);
    }

    gotoOrder() {

    }

    gotoPwdManager() {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'userManager',
                component: UserManger,
                passProps: {
                    ...this.props,
                }
            })
        }
    }

    gotoBankManager() {
        let {navigator} = this.props;
        if (navigator) {
            let page = BankManager
            if (!TCUSER_DATA.realname) {
                page = UserInfo
            }
            navigator.push({
                name: 'bankManager',
                component: page,
                passProps: {
                    ...this.props,
                }
            })
        }
    }

    gotoMessagelist() {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'messageList',
                component: MessageList,
                passProps: {
                    ...this.props,
                }
            })
        }
    }

    gotoUserCollect() {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'messageList',
                component: UserCollects,
                passProps: {
                    ...this.props,
                }
            })
        }
    }

    setMoneyVisible() {
        this.setState({
            isSee: !this.state.isSee
        })
    }

    getMsgTip() {

        if (TC_NEW_MSG_COUNT == 0) {
            return (<View style={styles.itemRight}>
                <Image source={require('image!icon_next')} style={styles.imgNext}/>
            </View>)
        } else {
            return (   <View style={styles.itemRight}>
                <Text style={styles.itemRightTxt}>您有新的消息</Text>
                <View style={styles.pointStyle}><Text style={styles.pointTxt}>{TC_NEW_MSG_COUNT}</Text></View>
                <Image source={require('image!icon_next')} style={styles.imgNext}/>
            </View>)
        }
    }

    isAgent() {
        if (!TCUSER_DATA.oauthRole) {
            return null
        }

        if (TCUSER_DATA.oauthRole == 'AGENT' || TCUSER_DATA.oauthRole == 'GENERAL_AGENT') {
            return (
                <View style={styles.mySettingStyle}>
                    <TouchableOpacity onPress={()=> {
                        this.goToTeam()
                    }}>
                        <View style={styles.myOrderTitle}>
                            <View style={styles.mySetttingLeftStyle}>
                                <Image source={require('../resouce/agent/group.png')} style={styles.img}/>
                                <Text style={styles.mySettingLeftTxtStyle}>团队</Text>
                            </View>
                            <View style={{paddingRight: 10}}>
                                <Image source={require('image!icon_next')} style={styles.imgNext}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> {
                        this.goToCommissionList()
                    }}>
                        <View style={styles.myOrderTitle}>
                            <View style={styles.mySetttingLeftStyle}>
                                <Image source={require('../resouce/agent/commission.png')} style={styles.img}/>
                                <Text style={styles.mySettingLeftTxtStyle}>每日佣金</Text>
                            </View>
                            <View style={{paddingRight: 10}}>
                                <Image source={require('image!icon_next')} style={styles.imgNext}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return null
        }
    }

    goToTeam() {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'userAgentTeam',
                component: AgentTeamList,
                passProps: {
                    ...this.props,
                }
            })
        }
    }

    goToCommissionList() {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'agentCommissionList',
                component: AgentCommissionList,
                passProps: {
                    ...this.props,
                }
            })
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
    },
    imgTop: {
        width: Window.width,
        height: Platform.OS == 'ios' ? Window.height * 0.22 + 40 : Window.height * 0.22
    },
    imgSet: {
        width: 50,
        height: 50,
        justifyContent: 'flex-end',
        marginTop: Platform.OS == 'ios' ? 20 : 0,
    },
    imgUser: {
        width: 80,
        height: 80,
        marginLeft: 30,
    },
    userTitle: {
        marginLeft: 20,
        justifyContent: 'center',
        backgroundColor: 'transparent'

    },
    userTxt: {
        color: '#dddddd'
    },
    userDes: {
        flexDirection: 'row',
        marginTop: 5
    },
    userName: {
        color: '#ffffff',
        fontSize: Size.xlarge
    },
    imgAccount: {
        width: 25,
        height: 15,
        marginLeft: 10
    },
    imgRight: {
        width: 25,
        height: 25
    },
    imgPay: {
        width: 35,
        height: 30
    },
    imgOut: {
        width: 35,
        height: 30
    },
    account: {
        height: Window.height * 0.09,
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: Color.border.grey4,
        marginLeft: 10,
        marginRight: 10
    },

    accountData: {
        width: Window.width * 0.5,
        alignItems: 'center',
        flexDirection: 'row',
    },
    accountTxt: {
        fontSize: 20,
        color: Color.text.black1,
        paddingLeft: 5,
        textAlign: 'right'
    },
    accountDetailTxt: {
        fontSize: Size.small,
        color: Color.text.black1,
        padding: 5,
    },
    freshView: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 2
    },

    accountDetail: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginLeft: 20
    },

    userPay: {
        height: Window.height * 0.1,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    payTxt: {
        color: '#333333',
        fontSize: Size.xlarge,
        marginLeft: 10
    },
    payItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: Window.width * 0.5,

    }, imgNext: {
        width: 10,
        height: 15,
        // position: 'absolute',
        // top: 23,
        // left: Window.width * 0.9
    }, myOrder: {
        backgroundColor: 'white',
        marginTop: 10
    }, myOrderTitle: {
        flexDirection: Direction.row,
        borderBottomWidth: 0.5,
        borderBottomColor: Color.border.grey4,
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between'
    }, myOrderLeftTitle: {
        paddingLeft: 15,
        fontSize: Size.default,
        color: Color.text.black1
    },
    myOrderRightTitle: {
        flexDirection: Direction.row,
        paddingRight: 15
    }, myOrderBtmView: {
        flexDirection: Direction.row,
        justifyContent: 'space-around'
    }, myOrderRightTxt: {
        color: Color.text.black1
    }, myOrderBtmTxt: {
        fontSize: Size.default,
        paddingBottom: 10,
        color: Color.text.black1
    }, img: {
        width: 30,
        height: 30,
        marginLeft: 15
    },
    mySettingStyle: {
        marginTop: 10,
        backgroundColor: 'white'
    },
    mySettingItemStyle: {
        flexDirection: Direction.row,
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        backgroundColor: 'white',
        marginBottom: 50
    }, mySetttingLeftStyle: {
        flexDirection: Direction.row,
        alignItems: 'center',
    }, mySettingLeftTxtStyle: {
        marginLeft: 10,
        fontSize: Size.default,
        color: Color.text.black1
    }, orderIconStyle: {
        width: 50,
        height: 50,

    }, orderIconItemStyle: {
        alignItems: 'center',
    }, itemRight: {
        flexDirection: 'row', alignItems: 'center'
    }, itemRightTxt: {
        fontSize: Size.small,
        marginRight: 10,
        color: '#ddd'
    },
    pointStyle: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    }, pointTxt: {
        color: 'white',
        fontSize: 10
    }
})