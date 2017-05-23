'use strict'
/**
 * 全部下拉选择订单页面
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import  TimerMixin from 'react-timer-mixin'
import OrderItem from './View/TCUserOrderItemRow'
import OrderItemList from './TCUserOrderItemList'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    ListView,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import NetUtils from '../../../Common/Network/TCRequestUitls'
import {config} from '../../../Common/Network/TCRequestConfig'
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
import TopNavigationBar from '../../../Common/View/TCNavigationBarSelectorStyle'
import Toast from '@remobile/react-native-toast'
import _ from 'lodash'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import  PopView from '../../../Common/View/TCSelectModal'
import BaseComponent from '../../Base/TCBaseComponent'
import NoDataView from '../../../Common/View/TCNoDataView'
import Helper from '../../../Common/JXHelper/TCNavigatorHelper'
const msgType = {
    all: '',
    win: 'WIN',
    pending: 'PENDING',
    loss: 'LOSS',
    lossAndWin: 'WIN,LOSS'
}
export  default  class TCUserOrderSelectPage extends BaseComponent {

    constructor(props) {
        super(props)

        this.data = []
        this.currentPage = 1
        this.pageSize = 20
        this.type = ''
        this.selectIndex = -1

    }


    static defaultProps = {};

    componentDidMount() {
        super.componentDidMount()
        this.initPage = this.props.initPage ? this.props.initPage : 0
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds.cloneWithRows(this.data),
            loaded: false,//控制Request请求是否加载完毕
            foot: 0,// 控制foot， 0：隐藏foot  1：已加载完成   2 ：显示加载中
            moreText: '加载更多',
            isRefreshing: false,
            title: this.initialMessageType()[this.initPage],
            renderPlaceholderOnly: true,
            isNoData: false,
            isTimeOut: false,
        };
        this.timer = setTimeout(() => {
            this.setType(this.initPage)
            this.getOrderDataFromNet()
        }, 500)

    }

    componentWillUnmount() {
        super.componentWillUnmount()
        this.timer && clearTimeout(this.timer)
    }

    render() {
        let sp = super.render()
        if (sp) return sp
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    ref='TopNavigationBar'
                    title={this.state.title}
                    needBackButton={true}
                    centerButtonCall={()=> {
                        this.showPopView()
                    }}
                    backButtonCall={()=> {
                        RCTDeviceEventEmitter.emit('balanceChange')
                        this.props.navigator.pop()
                    }}
                />
                <PopView
                    ref='TCSelectPopupView'
                    SelectorTitleArr={this.initialMessageType()}
                    selectedFunc={(index) => {
                        this.selectMsgType(index)
                    }}
                    selectedIndex={-1}
                />
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
                    this.updateData()
                    this.setState({isTimeOut: false})
                }}
            />)
        } else {
            return this.state.isNoData ? (
                <NoDataView
                    ref='NoDataView'
                    titleTip={this.getNoDataTip()}
                    contentTip="不要让大奖溜走，赶紧购彩去~"
                    btnTxt="立即购彩"
                    gotoDoing={()=> {
                        this.gotoBugBet()
                    }}
                />
            ) : (
                <ListView
                    ref='listView'
                    pageSize={5}
                    initialListSize={5}
                    dataSource={this.state.dataSource}
                    renderRow={this.getRenderRow.bind(this)}
                    enableEmptySections={true}
                    removeClippedSubviews={true}
                    scrollRenderAheadDistance={20}
                    renderFooter={()=>this.renderFooter()}
                    onEndReachedThreshold={20}
                    onEndReached={()=>this.loadMore()}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={()=>this.updateData()}
                            tintColor="#ff0000"
                            title="下拉刷新"
                            titleColor="#999999"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffff00"
                        />
                    }
                />
            )
        }
    }

    getNoDataTip() {

        if (this.props.initPage) {
            this.selectIndex = this.props.initPage
        }
        if (this.selectIndex === 0 || this.selectIndex === -1) {
            return '暂无投注记录'
        } else {
            return '暂无' + this.initialMessageType()[this.selectIndex] + '记录'
        }
    }


    gotoBugBet() {
        let {navigator} = this.props;
        if (navigator) {
            navigator.popToTop();
            RCTDeviceEventEmitter.emit('setSelectedTabNavigator', 'shoping');
        }
    }

    showPopView() {
        var popView = this.refs.TCSelectPopupView

        if (popView.state.modalVisible) {
            popView._setModalVisible(false);
        } else {
            popView._setModalVisible(true);
        }
        if (this.selectIndex === -1) {
            this.setDefaultIndex()
        }
    }

    initialMessageType() {
        return ['全部订单', '中奖订单', '待开奖订单', '未中奖订单', '已开奖订单'];
    }

    setDefaultIndex() {
        var popView = this.refs.TCSelectPopupView
        popView._setModalSelectedIndex(this.initPage, 0);
        this.selectIndex = this.initPage
    }

    selectMsgType(index) {
        var popView = this.refs.TCSelectPopupView
        popView._setModalSelectedIndex(index, 0);
        let navBar = this.refs.TopNavigationBar
        navBar.setTitle(this.initialMessageType()[index])
        this.setType(index)
        var nodataView = this.refs.NoDataView
        if (nodataView) {
            nodataView._setTitle('暂无' + this.initialMessageType()[index] + '记录')
        }
        this.selectIndex = index
        this.updateData()
    }

    setType(index) {
        switch (index) {
            case 0:
                this.type = undefined
                break;
            case 1:
                this.type = msgType.win
                break;
            case 2:
                this.type = msgType.pending
                break;
            case 3:
                this.type = msgType.loss
                break
            case 4:
                this.type = msgType.lossAndWin
                break
        }
    }

    updateData() {
        var listView = this.refs.listView
        if (listView) {
            listView.scrollTo({x: 0, y: 0, animated: true});
        }
        this.currentPage = 1;
        this.data = []
        this.setState({isRefreshing: true, isTimeOut: false})
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.data),
        })
        this.getOrderDataFromNet()
    }

    getRenderRow(rowData, sectionID, rowID) {
        return <TouchableOpacity onPress={()=> {
            this.pressRow(rowData.transactionTimeuuid)
        }}>
            <OrderItem orderData={rowData}/>
        </TouchableOpacity>

    }

    getOrderDataFromNet() {

        let types = {

            currentPage: this.currentPage,
            pageSize: this.pageSize
        }
        if (this.type) {
            types.state = this.type
        }
        NetUtils.getUrlAndParamsAndCallback(config.api.orderRecord, types,
            (data) => {

                if (data.rs) {

                    if (data.content != null && data.content.datas && data.content.datas.length < this.pageSize) {


                        if (this.currentPage === 1) {
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
                    if (data.content.datas && data.content.datas != null) {
                        this.data = _.concat(this.data, data.content.datas)
                    }
                    if (this.data.length <= 0) {
                        this.setState({
                            isNoData: true
                        })
                    } else {
                        this.setState({
                            isNoData: false
                        })
                    }
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(this.data),
                        isRefreshing: false,
                        renderPlaceholderOnly: false
                    })
                } else {
                    this.setState({
                        isRefreshing: false,
                        renderPlaceholderOnly: false
                    })
                    if (data.rs.status) {
                        Toast.showShortCenter('加载数据失败,请稍后再试!')
                    } else {
                        this.setState({
                            isTimeOut: true
                        })
                    }
                }
            }
        )
    }

    pressRow(transactionTimeuuid) {
        let {navigator} = this.props;

        if (navigator) {
            navigator.push({
                name: 'orderItemList',
                component: OrderItemList,
                passProps: {
                    transactionTimeuuid: transactionTimeuuid,
                    ...this.props,
                }
            })
        }
    }

    renderFooter() {
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

    loadMore() {
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
                this.currentPage = this.currentPage + 1;
                this.getOrderDataFromNet()
            }, 500);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
    },
});