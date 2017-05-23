/**
 * Created by Sam on 2016/11/16.
 */


import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    Dimensions,
    RefreshControl,
    InteractionManager
} from 'react-native';
import NoDataView from '../../../Common/View/TCNoDataView'
import BaseComponent from '../../Base/TCBaseComponent'
import TopNavigationBar from '../../../Common/View/TCNavigationBarSelectorStyle'
import MessageListItem from './TCUserMessageItemView'
import cashData from './tsconfig.json'
import Toast from '@remobile/react-native-toast'
import request from '../../../Common/Network/TCRequest';
import NetUitls from '../../../Common/Network/TCRequestUitls'

import {config} from '../../../Common/Network/TCRequestConfig';
import  PopView from '../../../Common/View/TCSelectModal'
import Moment from 'moment'
var {width, height} = Dimensions.get('window');
import _ from 'lodash';
const msgType = {
    normal: 'NORMAL',
    money: 'MONEY_RELATED',
    promote: 'PROMOTE'
}

import  RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
export default class TCUserMessagePage extends BaseComponent {

    constructor(state) {
        super(state)
        this.pageNum = 0
        this.pageSize = 20
        this.type = ''
        this.totalList = [];
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            isRefreshing: false,
            renderPlaceholderOnly: true,
            messageType: null,
            title: '全部消息',
            loaded: false,//控制Request请求是否加载完毕
            foot: 0,// 控制foot， 0：隐藏foot  1：已加载完成   2 ：显示加载中
            moreText: '加载更多',
            isNoData: false,
            isTimeOut: false,
            selectedIndex: -1,
        }
    }

    static defaultProps = {
        title: '',
        type: '',
        rowData: null,
    };

    componentDidMount() {
        super.componentDidMount();
        this.timer = setTimeout(() => {
            this.setState({renderPlaceholderOnly: false});
        }, 500)
        this.loadDataFormNet();
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
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
                {/*列表*/}
                {this.getContentView()}
            </View>
        );
    }


    getContentView() {

        if (!this.state.isTimeOut) {
            return this.state.isNoData ? (
                <NoDataView
                    ref='NoDataView'
                    titleTip={'暂无站内消息'}
                    contentTip="不要让大奖溜走，2元中千万大奖~"
                />
            ) : (
                <ListView
                    ref='listView'
                    style={{height: height - 64}}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData, sectionID, rowID)=>this.renderRow(rowData, sectionID, rowID)}
                    removeClippedSubviews={true}
                    scrollRenderAheadDistance={20}
                    renderFooter={()=>this._renderFooter()}
                    onEndReachedThreshold={20}
                    onEndReached={()=>this._endReached()}
                    enableEmptySections={true}
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
        } else {
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
        }
    }

    //CELL ROW DATA
    renderRow(rowData, sectionID, rowID) {
        return (
            <MessageListItem
                data={rowData}
            />
        )
    }


    initialMessageType() {
        return ['全部消息', '普通消息', '优惠消息', '出入款消息'];
    }

    selectMsgType(index) {
        var popView = this.refs.TCSelectPopupView
        popView._setModalSelectedIndex(index, 0);
        let navBar = this.refs.TopNavigationBar
        navBar.setTitle(this.initialMessageType()[index])
        this.setState({
            selectedIndex: index
        })
        switch (index) {
            case 0:
                this.type = ''
                break;
            case 1:
                this.type = msgType.normal
                break;
            case 2:
                this.type = msgType.promote
                break;
            case 3:
                this.type = msgType.money
                break;
        }
        this.updateData()
    }

    showPopView() {
        var popView = this.refs.TCSelectPopupView
        if (popView.state.modalVisible) {
            popView._setModalVisible(false);
        } else {
            popView._setModalVisible(true);
        }
        if (this.state.selectedIndex === -1)
            popView._setModalSelectedIndex(0, 0);
    }

    updateData() {
        var listView = this.refs.listView
        if (listView) {
            listView.scrollTo({x: 0, y: 0, animated: true});
        }
        this.pageNum = 0;
        this.totalList = []
        this.setState({
            isRefreshing: true,
            isTimeOut: false
        })
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.totalList),
        })
        this.loadDataFormNet()
    }

    loadDataFormNet() {
        let type = {
            type: this.type,
            start: this.pageSize * this.pageNum,
            pageSize: this.pageSize,
        }


        NetUitls.getUrlAndParamsAndCallback(config.api.getMessageList, type,
            (data) => {
                if (data.rs) {
                    if (TC_NEW_MSG_COUNT!=0) {
                        TC_NEW_MSG_COUNT = 0
                    }
                    if (data.content.datas.length < this.pageSize) {

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
                    // data.content.datas.forEach((e) => {
                    //     this.totalList.push(e)
                    // })
                    this.totalList = _.concat(this.totalList, data.content.datas)

                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(this.totalList),
                        isRefreshing: false
                    })
                    if (this.totalList.length <= 0) {
                        this.setState({
                            isNoData: true
                        })
                    } else {
                        this.setState({
                            isNoData: false
                        })
                    }

                } else {
                    this.setState({
                        isRefreshing: false
                    })
                    if (data.status === 422) {
                        this.setState({
                            foot: 1,
                            moreText: '没有更多数据'
                        })
                    } else {
                        Toast.showShortCenter('数据加载失败，请稍后再试!')
                        if (this.totalList.length === 0) {
                            this.setState({isTimeOut: true})
                        }
                    }
                }
            }
        )

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
        if (this.totalList.length < this.pageSize) {
            return;
        }

        this.setState({
            foot: 2,
        });
        this.timer = setTimeout(
            () => {
                this.pageNum = this.pageNum + 1;
                this.loadDataFormNet()
            }, 500);
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    bottomBarStyle: {
        backgroundColor: '#2B2B2B',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center'
    },
    bottomBarButtonStyle: {
        backgroundColor: '#cc0000',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
        borderRadius: 8,
        padding: 10,
        width: width * 0.7
    },
});

