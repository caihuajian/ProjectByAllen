/**
 * Created by allen-jx on 2017/3/30.
 */
import React, {Component, PropTypes,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    ScrollView,
    ListView,
    Image
} from 'react-native'
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
import Toast from "@remobile/react-native-toast";
import RequestUtils from "../../../Common/Network/TCRequestUitls";
import {config} from "../../../Common/Network/TCRequestConfig";
import _ from 'lodash'
import BaseComponent from "../../../Page/Base/TCBaseComponent";
/**
 * 提示对话框
 */
export default class TCUserPayPage extends BaseComponent {

    // 构造函数
    constructor(props) {

        super(props)
        this.data = []
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds.cloneWithRows(this.data),
            isEmpty: false,
            renderPlaceholderOnly: true,
        }

        this.payList = this.props.payList;
    }

    componentWillReceiveProps(nextProps) {
        this.payList = nextProps.payList
        this.loadDataFromNet()
    }

    componentDidMount() {
        super.componentDidMount();
        if (this.props.payList) {
            this.loadDataFromNet()
        }
    }

    componentWillUnmount() {
        super.componentWillUnmount()
    }

    render() {
        let sp = super.render()
        if (sp) return sp;
        return (
            <View>
                <ScrollView
                    keyboardShouldPersistTaps={true}
                    keyboardDismissMode={'on-drag'}
                >
                    {!this.state.isEmpty ? (<ListView
                        dataSource={this.state.dataSource}
                        enableEmptySections={true}
                        renderRow={this.renderListRow.bind(this)}
                    />) : this.getEmptyTip()}
                </ScrollView>
            </View>
        )
    }


    getEmptyTip() {
        return (
            <View style={styles.emptyTip}>
                <Image
                    source={require('../../resouce/pay_error.png')} style={styles.payErrorImg}
                />
                <Text>该支付方式目前无法使用</Text>
                <Text>敬请谅解!请选择其它支付方式!</Text>
            </View>
        )
    }

    _renderPlaceholderView() {
        return (
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F2F2F2',
                marginTop:Window.width*0.25
            }}>
                        <Text style={{color: '#999999'}}> 努力加载中... </Text>
            </View>
        )
    }

    /**
     * 渲染listView item
     * @param rowData
     * @returns {XML}
     */
    renderListRow(rowData) {
        return (
            <TouchableOpacity onPress={()=>this.props.payItemSelected(rowData)}>
                <View style={styles.payItemStyle}>
                    {this.getPayImage(rowData)}
                    <View style={styles.payTypeTxt}>
                        <Text
                            style={styles.payTypeTitleStyle}>{rowData.type ? rowData.merchantName : rowData.receiptName}</Text>
                        <Text style={styles.payRemarkTxt}>{rowData.remarks}</Text>
                    </View>
                </View>
            </TouchableOpacity>)
    }


    getPayImage(rowData) {
        let payType = rowData.type ? rowData.type : rowData.bankCode
        if (payType === 'THIRD_PARTY') {
            return <Image source={require('../../resouce/third_pay.png')} style={styles.payTypeImg}/>
        }
        return <Image source={{uri: this.getPayTypeIcon(payType)}} style={styles.payTypeImg}/>
    }

    getPayTypeIcon(payType) {
        if (payType === 'THIRD_PARTY') {
            return 'third_pay.png'
        } else if (payType === 'WX') {
            return 'wechat'
        } else if (payType === 'ZHB') {
            return 'alipay'
        }
    }

    /**
     * 加载支付方式
     */
    loadDataFromNet() {

        this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.parseData(this.props.type, this.payList)),
                renderPlaceholderOnly: false,
            }
        )
    }

    parseData(type, data) {
        let res = []
        if (data) {
            for (var i = 0; data[i] != null; i++) {
                let item = data[i]
                let payType = item.type ? item.type : item.bankCode
                if (payType === type) {
                    res.push(item)
                }
            }
        }
        this.setState(
            {
                isEmpty: res.length == 0
            }
        )
        return res
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
    },
    payTypeImg: {
        height: 50,
        width: 50,
    },
    payTypeTxt: {
        justifyContent: 'center',
        paddingLeft: 15
    }, payTypeTitleStyle: {
        fontSize: Size.large
    }, payRemarkTxt: {
        color: Color.text.grey1
    },
    payItemStyle: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: 5,
        height: 60,
        paddingLeft: 15,
        alignItems: 'center'
    }, payTypeContentStyle: {
        color: '#cccccc',
        width: Window.width * 0.7
    },
    emptyTip: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    }, payErrorImg: {
        height: 100,
        width: 100,
    }
})