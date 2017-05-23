import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    Platform,
    ScrollView,
    ListView,
    TouchableHighlight,
    RefreshControl
} from 'react-native';

import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'

import RowCell from './View/TCLotteryLobbyRowView'
import TopNavigationBar from '../../Common/View/TCNavigationBar'
import LotteryHistoryList from './TCLotteryHistoryList'

import {config} from '../../Common/Network/TCRequestConfig'
import NetUitls from '../../Common/Network/TCRequestUitls'

import * as gameNameEnum from '../../Data/JXPlayMathConfig'

let timeoutTime = 60000

var TCLotteryLobby = React.createClass({

    getInitialState() {
        return {
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            isRefreshing: false
        }
    },

    componentDidMount() {
        this.startTimer();
    },

    componentWillMount() {
        this.timer && clearTimeout(this.timer);
    },

    startTimer (){
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
        this.loadDataFormNet(false)
    }, timeoutTime)

    },

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar title='开奖大厅' needBackButton={true}
                                  backButtonCall={() =>{RCTDeviceEventEmitter.emit('setSelectedTabNavigator', 'home');}}
                />
                {/*列表*/}
                <ListView
                    ref="ListView"
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    removeClippedSubviews={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={()=>this.loadDataFormNet(true)}
                            tintColor="#ff0000"
                            title="下拉刷新"
                            titleColor="#999999"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffff00"
                        />
                    }
                />
            </View>
        )
    },

    //CELL ROW DATA
    renderRow(rowData) {
        return (
            <RowCell
                cpName={rowData.gameNameInChinese}
                cpDate={rowData.officialOpenTimeEpoch}
                cpNumbers={rowData.openCode}
                openStatus={rowData.openStatus}
                rowData={rowData}
                pushEvent={(cP)=>this._pushToBetHome3(rowData)}
            />
        )
    },

    _pushToBetHome3(rowData) {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'detail',
                component: LotteryHistoryList,
                passProps: {
                    title: rowData.gameNameInChinese,
                    gameUniqueId: rowData.gameUniqueId
                }
            })
        }
    },

    loadDataFormNet(manual) {
        NetUitls.getUrlAndParamsAndCallback(config.api.getAllHistory, null, (data)=> {
            this.startTimer()
            if (manual){
                this.refs['ListView'].scrollTo({x: 0, y: 0, animated: true})
            }
            if (data && data.rs) {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(data.content),
                    isRefreshing: false
                })
            }
        })
    },

    componentDidMount(){
        this.loadDataFormNet();
    },

    endRefreshing(){
        this.setState({isRefreshing: false});
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    }
});

module.exports = TCLotteryLobby;