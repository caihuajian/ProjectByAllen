'use strict'
/**
 * 全部订单页面
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
import _ from 'lodash'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
export  default  class TCUserOrderPage extends Component {

    constructor(props) {
        super(props)
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.data = []
        this.currentPage = 1
        this.pageSize = 20
        this.state = {
            dataSource: ds.cloneWithRows(this.data),
            loaded: false,//控制Request请求是否加载完毕
            foot: 0,// 控制foot， 0：隐藏foot  1：已加载完成   2 ：显示加载中
            moreText: '加载更多',
            isRefreshing: false,
        };

    }


    static defaultProps = {};

    componentDidMount() {
        this.getOrderDataFromNet()
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }

    render() {

        return (
            <View style={styles.container}>
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
            </View>

        );

    };


    updateData() {
        var listView = this.refs.listView
        listView.scrollTo({x: 0, y: 0, animated: true});
        this.currentPage = 1;
        this.data = []
        this.setState({isRefreshing: true})
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.data),
        })
        this.getOrderDataFromNet()
    }

    getRenderRow(rowData, sectionID, rowID) {
        return <TouchableOpacity onPress={()=>{this.pressRow(rowData.transactionTimeuuid)}}>
            <OrderItem orderData={rowData}/>
        </TouchableOpacity>

    }

    getOrderDataFromNet() {

        let type = {
            state: this.props.orderType,
            currentPage: this.currentPage,
            pageSize: this.pageSize
        }
        NetUtils.getUrlAndParamsAndCallback(config.api.orderRecord, type,
            (data) => {
                if (data.rs) {
                    if (data.content != null && data.content.datas.length < this.pageSize) {


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
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(this.data),
                        isRefreshing: false
                    })
                } else {
                    this.setState({
                        isRefreshing: false
                    })
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
                <View style={{height:40,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#999999',fontSize:12,marginTop:10}}>
                        {this.state.moreText}
                    </Text>
                </View>);
        } else if (this.state.foot === 2) {//加载中
            return (
                <View style={{height:40,alignItems:'center',justifyContent:'center',}}>
                    <Text style={{color:'#999999',fontSize:12,marginTop:10}}>
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