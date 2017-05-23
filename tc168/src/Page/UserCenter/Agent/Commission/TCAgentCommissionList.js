/**
 * 投注号码
 * Created by Allen on 2017/2/7.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    RefreshControl,
    ScrollView
} from 'react-native'
import {Size, Color, Window, Direction} from '../../../../Common/Style/AppStyle'
import RowList from './View/TCAgentCommissionListRow'
import _ from 'lodash'
import NetUtils from '../../../../Common/Network/TCRequestUitls'
import {config} from '../../../../Common/Network/TCRequestConfig'
import TopNavigationBar from '../../../../Common/View/TCNavigationBar';
import Toast from '@remobile/react-native-toast'
export default class TCAgentCommissionList extends React.Component {
    constructor(state) {
        super(state)
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.data = []
        this.currentPage = 1
        this.pageSize = 20
        this.state = {
            dataSource: ds.cloneWithRows(this.data),
            loaded: false,//控制Request请求是否加载完毕
            foot: 0,// 控制foot， 0：隐藏foot  1：已加载完成   2 ：显示加载中
            moreText: '加载更多',
            isRefreshing: false,
        }
    }

    static defaultProps = {};

    componentDidMount() {
        this.getDataFromServer()
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    ref='TopNavigationBar'
                    title={'每日佣金统计列表'}
                    needBackButton={true}
                    backButtonCall={()=> {
                        this.props.navigator.pop()
                    }}
                />
                <ScrollView
                    showsHorizontalScrollIndicator={true}
                    horizontal={true}
                >
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.getRenderRow.bind(this)}
                        enableEmptySections={true}
                        removeClippedSubviews={true}
                        renderSectionHeader={(sectionData, sectionId) => this._renderHeader()}
                        initialListSize={50}
                        pageSize={50}
                        scrollRenderAheadDistance={20}
                        renderFooter={()=>this.renderFooter()}
                        onEndReachedThreshold={20}
                        onEndReached={()=>this.loadMore()}
                    />
                </ScrollView>
            </View>
        );
    }

    getRenderRow(rowData) {
        return (<RowList rowData={rowData}/>)
    }

    _renderHeader() {
        return (
            <View style={styles.titleViewStyle}>
                <Text style={styles.titleTxtStyle}>期数</Text>
                <Text style={styles.titleTxtStyle}>充值金额</Text>
                <Text style={styles.titleTxtStyle}>提款金额</Text>
                <Text style={styles.titleTxtStyle}>彩票退佣金额</Text>
                <Text style={styles.titleTxtStyle}>状态</Text>
            </View>
        )
    }

    getDataFromServer() {
        let type = {
            pageSize: this.pageSize,
            start: (this.currentPage - 1) * this.pageSize
        }
        NetUtils.getUrlAndParamsAndCallback(config.api.agentBrokerageCalculation, type,
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

                    Toast.showShortCenter('请求数据失败!')
                }
            }
        )
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
                this.getDataFromServer()
            }, 500);
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    }, titleViewStyle: {
        backgroundColor: '#ececec',
        flexDirection: 'row',
        alignItems: 'center'
    }, titleTxtStyle: {
        color: '#666666',
        textAlign: 'center',
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5,
        width: Window.width * 0.3
    }
});