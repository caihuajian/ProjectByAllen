import React, {Component, PropTypes,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ListView,
    Image,
    ActivityIndicator,
    ScrollView
} from 'react-native'
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import  ListRow from './View/TCUserBankRowView'
import AddBank from './TCUserAddBank'
import BaseComponent from '../../Base/TCBaseComponent'
import Toast from '@remobile/react-native-toast';
import request from '../../../Common/Network/TCRequest'
import NetUtils from '../../../Common/Network/TCRequestUitls'
import {config} from '../../../Common/Network/TCRequestConfig'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import  UserMessage from '../../UserCenter/UserInfo/TCUserMessage'
import Dialog from '../../../Common/View/TipDialog'
import NavigatorHelper from '../../../Common/JXHelper/TCNavigatorHelper'

/**
 * 银行卡管理
 */
export default class TCUserBankManager extends BaseComponent {

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
            dataSource: ds.cloneWithRows(this.data),
            renderPlaceholderOnly: true,

        });
        this.getBankListFromNet();
        this.timer = setTimeout(() => {
            this.setState({renderPlaceholderOnly: false});
        }, 500)
        this.listener = RCTDeviceEventEmitter.addListener('userBankChange', () => {
            this.getBankListFromNet();
        })
    }

    componentWillUnmount() {
         this.listener&&this.listener.remove()
        super.componentWillUnmount()
        this.timer && clearTimeout(this.timer);
    }

    render() {
        let sp = super.render()
        if (sp) return sp;
        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={'绑定银行卡'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.goBack()
                    }}
                />
                <ScrollView>
                    <View>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this.getRenderRow}
                            enableEmptySections={true}
                        />
                    </View>
                    <TouchableOpacity onPress={()=> {
                        this.gotoAddBank()
                    }}>
                        <View style={styles.addBankStyle}>
                            <Text style={styles.addBankTxtStyle}>+ 添加银行卡</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }

    gotoAddBank() {
        if (this.data.length >= 6) {
            Toast.showShortCenter("绑定银行卡不能超过6张！");
            return;
        }

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

    goBack() {
        RCTDeviceEventEmitter.emit('balanceChange')
        this.props.navigator.pop()
    }


    getRenderRow(rowData) {
        return <ListRow
            bankName={rowData.bankName}
            bankNum={rowData.bankCardNo}
            bankId={rowData.id}
            bankCode={rowData.bankCode}
        />;

    }

    getBankListFromNet() {

        NetUtils.getUrlAndParamsAndCallback(config.api.userCards, null, (res) => {
            if (res.rs) {
                this.data = res.content
                JXLog('bank:' + res.content)
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.data),

                })
            } else {


                if (res.status === 401) {
                    Toast.showShortCenter('登录状态过期，请重新登录!')
                } else {
                    if (res.status === 500) {
                        Toast.showShortCenter("服务器出错啦!")
                    } else {
                        if (res.message) {
                            Toast.showShortCenter(res.message)
                        }
                    }
                    this.goBack()
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
    addBankTxtStyle: {
        color: Color.text.grey1,
        fontSize: Size.large,
        marginLeft: 20,
        marginBottom: 5
    }, addBankStyle: {
        marginTop: 30,
        borderBottomColor: Color.border.grey5,
        borderBottomWidth: 1,
        marginBottom: 30
    }
})