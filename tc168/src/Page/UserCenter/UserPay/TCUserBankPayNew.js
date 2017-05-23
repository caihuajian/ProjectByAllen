import React, {Component, PropTypes,} from 'react'

import {View, StyleSheet, Text, TouchableOpacity, Image, ListView, ScrollView, Platform} from 'react-native'
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import BankItem from './View/TCUserBankItemView'

import  BankMsg from './TCUserBankPayMessageNew'
import Toast from '@remobile/react-native-toast';
import LoadingSpinnerOverlay from 'react-native-smart-loading-spinner-overlay'
import {config} from '../../../Common/Network/TCRequestConfig'
import BaseComponent from '../../../Page/Base/TCBaseComponent'
import NetUtils from '../../../Common/Network/TCRequestUitls'
import _ from 'lodash';
/**
 * 银行充值
 */
export default class TCUserBankPay extends BaseComponent {



    // 构造函数
    constructor(props) {

        super(props)

    }

    static defaultProps = {};

    componentDidMount() {
        super.componentDidMount();
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.data = [];
        this.setState({
            isClose: false,
            dataSource: ds.cloneWithRows(this.data),
            selectIndex: -1,
            bank: {},
            renderPlaceholderOnly: true
        });
        this.timer = setTimeout(() => {
            this.setState({renderPlaceholderOnly: false});
        }, 500)
        this.getBankList()
    }

    componentWillUnmount() {
        super.componentWillUnmount()
    }

    render() {
        let sp = super.render()
        if (sp) return sp;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this.getRenderRow.bind(this)}
                            enableEmptySections={true}
                        />
                    </View>

                    <View style={{alignItems: 'center', marginBottom: 20}}>

                        <TouchableOpacity
                            style={styles.bottomBarButtonStyle}
                            onPress={()=> {
                                this.applyForPay()
                            }}
                        >
                            <Text style={{color: 'white', fontWeight: 'bold'}}>
                                下一步
                            </Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
                <LoadingSpinnerOverlay
                    ref={ component => this._partModalLoadingSpinnerOverLay = component }
                    modal={true}
                    marginTop={64}/>
            </View>
        )
    }

    /**
     * 检查输入金额
     * @returns {boolean}
     */
    validMoney() {
        let reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/
        if (this.props.money === '' || this.props.money < 1) {
            Toast.showShortCenter("充值金额不能小于1元!");
            return false
        }
        if (!this.props.money.match(reg)) {
            Toast.showShortCenter('您输入的金额格式不正确!')
            return false
        }
        return true
    }

    _renderPlaceholderView() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#F2F2F2',
            }}>
                <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: '#999999'}}> 努力加载中... </Text>
                    </View>
                </View>
            </View>
        )
    }

    getBankList() {
        NetUtils.getUrlAndParamsAndCallback(config.api.bankList, null, (response) => {
            if (response.rs) {
                this.data = response.content;
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.parseBankList(this.data))
                });
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
        let bankLists = []
        if (data.length > 0) {
            for (var i = 0; data[i] != null; i++) {
                let item = data[i]
                if (item.bankCode === 'ZHB' || item.bankCode === 'WX') {
                } else {
                    bankLists.push(item)
                }
            }
        }
      return bankLists
    }
    getRenderRow(rowData, sectionID, rowID) {
        return <TouchableOpacity onPress={()=> {
            this.onPressRow(rowData, rowID)
        }}>
            <BankItem rowData={rowData} selectIndex={this.state.selectIndex}/>
        </TouchableOpacity>

    }

    onPressRow(rowData, rowID) {
        let newData = _.cloneDeep(this.parseBankList(this.data));
        newData[rowID].isSelected = !newData[rowID].isSelected
        this.setState({
            selectIndex: rowData.adminBankId,
            dataSource: this.state.dataSource.cloneWithRows(newData),
            bank: rowData
        });
    }

    close() {
        let isClose = this.state.isClose;
        this.setState({
            isClose: !isClose
        });
    }

    renderTip() {
        if (this.state.isClose) {
            return;
        } else {
            return (<View style={styles.tipViewStyle}>
                <Image source={require('image!warn')} style={styles.tipIconStyle}/>
                <Text style={styles.tipTextStyle}>提醒您，同行转账才能立即到账哦!</Text>
                <View style={styles.closeViewStyle}>
                    <TouchableOpacity onPress={()=>this.close()}>
                        <Image source={require('image!close')}
                               style={styles.closeIconStyle}/>
                    </TouchableOpacity></View>
            </View>);
        }
    }

    gotoBankMsg(code, transferNo) {

        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'bankMsg',
                component: BankMsg,
                passProps: {
                    topupCode: code,
                    money: this.props.money,
                    bank: this.state.bank,
                    adminBankId: this.state.selectIndex,
                    ...this.props,
                }
            })
        }
    }

    applyForPay() {
        if (!this.props.validMoney()) {
            return;
        }
        if (this.state.selectIndex === -1) {
            Toast.showShortCenter("请选择转入银行!");
            return;
        }
        this.props.showLoading()
        let params = {adminBankId: this.state.selectIndex}
        NetUtils.PostUrlAndParamsAndCallback(config.api.banktransfers, params, (response) => {
            this.props.hideLoading()
            if (response.rs) {
                this.gotoBankMsg(response.content.topupCode);
            } else {
                if (response.status === 400) {
                    if (response.message)
                        Toast.showShortCenter(response.message)
                } else {
                    Toast.showShortCenter("服务器异常!")
                }
                this.goBack()
            }
        })
    }


    goBack() {
        this.props.navigator.pop()
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
    }, payTip: {
        color: Color.text.black1,
        fontSize: Size.default,

    }, payTipView: {
        marginTop: 20,
        paddingLeft: 10
    }

})