'use strict'
/**
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import  TimerMixin from 'react-timer-mixin'
import LoadingSpinnerOverlay from 'react-native-smart-loading-spinner-overlay'
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import  dismissKeyboard from 'dismissKeyboard';
import NetUtils from '../../../Common/Network/TCRequestUitls'
import {config} from '../../../Common/Network/TCRequestConfig'
import OrderDetail from './TCUserOrderDetail'
import OrderItem from './View/TCUserOrderChildrenItemRow'
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    ListView,
    RefreshControl
} from 'react-native';
var {width, height} = Dimensions.get('window');
import _ from 'lodash'
import BaseComponent from '../../../Page/Base/TCBaseComponent'
export  default  class TCUserOrderItemList extends BaseComponent {

    constructor(props) {
        super(props)
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.data = []
        this.currentPage = 1
        this.pageSize = 20
        this.orderInfo = {}
        this.state = {
            dataSource: ds.cloneWithRows(this.data),
            isRefreshing: false,
            loaded: false,//控制Request请求是否加载完毕
            renderPlaceholderOnly: true,
        };
    }

    static defaultProps = {};

    componentDidMount() {
        super.componentDidMount()
        this.getOrderListFromNet()
        this.timer = setTimeout(() => {
            this.dataLoadOver()
        }, 500)
    }

    componentWillUnmount() {
        super.componentWillUnmount()
        this.timer && clearTimeout(this.timer);
    }

    render() {
        let sp = super.render()
        if (sp) return sp;
        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={'彩票订单详情'}
                    needBackButton={true}
                    backButtonCall={() =>{this.props.navigator.pop()}}
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.getRenderRow.bind(this)}
                    enableEmptySections={true}
                    removeClippedSubviews={true}
                    scrollRenderAheadDistance={20}
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

    // renderFooter() {
    //     if (this.state.foot === 1) {//加载完毕
    //         return (
    //             <View style={{height:40,alignItems:'center',justifyContent:'flex-start',}}>
    //                 <Text style={{color:'#999999',fontSize:12,marginTop:10}}>
    //                     {this.state.moreText}
    //                 </Text>
    //             </View>);
    //     } else if (this.state.foot === 2) {//加载中
    //         return (
    //             <View style={{height:40,alignItems:'center',justifyContent:'center',}}>
    //                 <Text style={{color:'#999999',fontSize:12,marginTop:10}}>
    //                     加载中...
    //                 </Text>
    //             </View>)
    //     } else if (this.state.foot === 0) {
    //         return (<View></View>)
    //     }
    // }

    updateData() {
        this.data = []
        this.setState({isRefreshing: true})
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.data),
        })
        this.getOrderListFromNet()
    }

    getOrderListFromNet() {

        let type = {
            transactionTimeuuid: this.props.transactionTimeuuid,
        }
        NetUtils.getUrlAndParamsAndCallback(config.api.orderDetail, type,
            (data) => {
                if (data.rs) {
                    if (data.content != null) {
                        this.data = _.concat(this.data, data.content.subOrders)
                        this.orderInfo = data.content.orderInfo
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

    getRenderRow(rowData, sectionID, rowID) {
        return <TouchableOpacity onPress={()=>{this.pressRow(rowData)}}>
            <OrderItem orderChildrenData={rowData} gameName={this.orderInfo.gameNameInChinese}/>
        </TouchableOpacity>

    }

    dataLoadOver() {
        this.setState({renderPlaceholderOnly: false});
    }

    pressRow(rowData) {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'orderDetail',
                component: OrderDetail,
                passProps: {
                    orderData: rowData,
                    orderInfo: this.orderInfo,
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
});