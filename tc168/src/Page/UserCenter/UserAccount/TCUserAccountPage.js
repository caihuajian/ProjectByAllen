'use strict'
/**
 * 全部账户记录
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';

import NoDataView from '../../../Common/View/TCNoDataView'
import  ListRow from './View/TCUserAccountListRowView'
import AccountDetail from './TCUserAccountDetail'
import RequestUtils from '../../../Common/Network/TCRequestUitls'
import {config} from '../../../Common/Network/TCRequestConfig'
import Helper from '../../../Common/JXHelper/TCNavigatorHelper'
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
import Toast from '@remobile/react-native-toast'
import _ from 'lodash'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    TextInput,
    ListView
} from 'react-native';

export  default  class TCUserAccountAllPage extends Component {

    constructor(props) {
        super(props)
        this.data = []
        this.pageNum = 0
        this.pageSize = 20
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds.cloneWithRows(this.data),
            loaded: false,//控制Request请求是否加载完毕
            foot: 0,// 控制foot， 0：隐藏foot  1：已加载完成   2 ：显示加载中
            moreText: '加载更多',
            isNoData: false,
            isTimeOut: false,
        }
    }

    static defaultProps = {};

    componentDidMount() {

        this.loadDataFromNet()
    }


    render() {
        return (
            <View style={styles.container}>
                {this.getContentView()}
            </View>
        );
    };


    getContentView() {
        if (this.state.isTimeOut) {
            return (  <NoDataView
                ref='TimeOutView'
                titleTip={'网络出问题啦~'}
                contentTip="网络或服务器出问题了，刷新一下试试吧~"
                btnTxt="刷新一下"
                unNetwork={true}
                gotoDoing={()=> {
                    this.loadDataFromNet()
                    this.setState({isTimeOut: false})
                }}
            />)
        } else {
            return (this.state.isNoData ? (this.getNodataView()) : (
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.getRenderRow.bind(this)}
                    renderFooter={()=>this._renderFooter()}
                    onEndReachedThreshold={20}
                    onEndReached={()=>this._endReached()}
                    enableEmptySections={true}
                />
            ))
        }
    }

    getNodataTip() {
        var titleStr = this.props.accountType === 1 ? '暂无充值' : '暂无提现'

        switch (this.props.type) {
            case 1:
                return titleStr + '记录'
            case 2:
                return titleStr + '完成记录'
            case 3:
                return titleStr + '失败记录'
        }

    }


    getNodataView() {
        if (this.props.accountType === 1) {
            return (
                <NoDataView
                    ref='NoDataView'
                    titleTip={this.getNodataTip()}
                    contentTip="大奖不等待，速去购彩吧~"
                    btnTxt="立即充值"
                    gotoDoing={()=> {
                        Helper.pushToPay()
                    }}
                />
            )
        } else {
            return (<NoDataView
                ref='NoDataView'
                titleTip={this.getNodataTip()}
                contentTip="大奖不等待，速去购彩吧~"
            />)
        }
    }

    getRenderRow(rowData, sectionID, rowID) {
        return <TouchableOpacity onPress={()=> {
            this.pressRow(rowData)
        }}>
            <ListRow rowData={rowData}/>
        </TouchableOpacity>
    }

    pressRow(rowData) {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'accountDetail',
                component: AccountDetail,
                passProps: {
                    ...this.props,
                    orderData: rowData,
                }
            })
        }
    }


    getAccountType() {
        return this.props.accountType === 1 ? 'TOPUP' : 'WITHDRAWAL'
    }

    getState() {

        switch (this.props.type) {
            case 1:
                return ''
            case 2:
                return 'COMPLETED'
            case 3:
                return 'FAILED'
        }
    }

    loadDataFromNet() {
        RequestUtils.getUrlAndParamsAndCallback(config.api.orderhistory,
            {
                type: this.getAccountType(),
                start: this.pageNum * this.pageSize,
                pageSize: this.pageSize,
                state: this.getState()
            },
            (response) => {
                if (response.rs) {
                    if (response.content.length < this.pageSize) {
                        if (this.pageNum === 0) {
                            this.setState({
                                foot: 0,
                            })
                        } else {
                            this.setState({
                                foot: 1,
                                moreText: '没有更多数据'
                            })
                        }
                    } else {
                        this.setState({
                            foot: 0
                        })
                    }
                    if (response.content != null) {
                        this.data = _.concat(this.data, response.content)
                    }


                    if (this.data.length === 0) {
                        this.setState({
                            isNoData: true
                        })
                    }
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(this.data)
                    });
                } else {
                    if (response.status === 422) {
                        this.setState({
                            foot: 1,
                            moreText: '没有更多数据'
                        })
                    } else {
                        Toast.showShortCenter('数据加载失败，请稍后再试!')
                        if (this.data.length === 0) {
                            this.setState({isTimeOut: true})
                        }
                    }
                }
            })

    }


    _renderFooter() {
        if (this.state.foot === 1) {//加载完毕
            return (
                <View style={{height: 40, alignItems: 'center', justifyContent: 'flex-start',}}>
                    <Text style={{color: '#999999', fontSize: 12, marginTop: 10}}>
                        {this.state.moreText}
                    </Text>
                </View>);
        } else if (this.state.foot === 2) {//加载中
            return (
                <View style={{height: 40, alignItems: 'center', justifyContent: 'center',}}>
                    <Text style={{color: '#999999', fontSize: 12, marginTop: 10}}>
                        加载中...
                    </Text>
                </View>)
        } else if (this.state.foot === 0) {
            return (<View></View>)
        }
    }

    _endReached() {
        if (this.state.foot != 0) {
            return;
        }
        if (this.data.length < this.pageSize) {
            return;
        }

        this.setState({
            foot: 2,
        });
        this.timer = setTimeout(
            () => {
                this.pageNum = this.pageNum + 1;
                this.loadDataFromNet()
            }, 500);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
    },
});