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
} from 'react-native';

import BaseComponent from '../Base/TCBaseComponent'
import TopNavigationBar from '../../Common/View/TCNavigationBar'
import TCListRowView from './View/TCLottertHistoryListRowView'
import _ from 'lodash';
import {config,trendServerAddress} from '../../Common/Network/TCRequestConfig';
import BetHomePage from '../Bet/AllPlayingMethodView/ChongQingSSC/TCChongQingSSCBetHome';
import NetUitls from '../../Common/Network/TCRequestUitls'
import Toast from '@remobile/react-native-toast';
import TCNavigatorHelper from '../../Common/JXHelper/TCNavigatorHelper'
import {lotteryLobby} from '../resouce/appColorsConfig'

import TCInitHelperC from '../../Common/JXHelper/TCInitHelper'
let TCInitHelper = new TCInitHelperC()

import JXHelpers from '../../Common/JXHelper/JXHelper'

var {width, height} = Dimensions.get('window');


export default class TCLotteryHistoryList extends BaseComponent {

    constructor(state) {
        super(state);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            isRefreshing: false,
            renderPlaceholderOnly: true
        };
        this.loadDataFormNet = this.loadDataFormNet.bind(this)
    }

    static defaultProps = {
        title: '',
        type: '',
        gameUniqueId: ''
    };

    componentDidMount() {
        super.componentDidMount();
        this.loadDataFormNet();
    }

    render() {
        let sp = super.render()
        if (sp) return sp

        return (
            <View style={styles.container}>
                {this.getTopNavigationBar()}
                <ListView style={{height: height - 64}}
                          ref="ListView1"
                          dataSource={this.state.dataSource}
                          renderRow={(rowData, sectionID, rowID)=>this.renderRow(rowData, sectionID, rowID)}
                          removeClippedSubviews={false}
                          scrollRenderAheadDistance={20}
                          refreshControl={
                              <RefreshControl
                                  refreshing={this.state.isRefreshing}
                                  onRefresh={()=>this.loadDataFormNet()}
                                  tintColor="#ff0000"
                                  title="下拉刷新"
                                  titleColor="#999999"
                                  colors={['#ff0000', '#00ff00', '#0000ff']}
                                  progressBackgroundColor="#ffff00"
                              />
                          }
                />
                <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}} onPress={()=> {
                    this.pushToBetHome(this.props.gameUniqueId)
                }}>
                    <View style={{width:width-40,justifyContent:'center',alignItems:'center',height:40,marginLeft:20,marginRight: 20,marginBottom:5,marginTop:5,backgroundColor:lotteryLobby.highlightColor,borderRadius:5}}>
                        <Text style={{width:100,color:'white',fontSize:20,fontWeight:'bold'}}>立即下注</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    getTopNavigationBar(){
        if(JXHelpers.checkHaveTrend(this.props.gameUniqueId)){
            return (<TopNavigationBar
                title={this.props.title}
                rightTitle={'走势图'}
                rightButtonCall={()=>{TCNavigatorHelper.pushToWebView(''+trendServerAddress+'/trend?gameUniqueId='+this.props.gameUniqueId+'&navigationBar=0',this.props.title)}}
                needBackButton={true}
                backButtonCall={()=> {
                    this.props.navigator.pop()
                }}
            />)
        }else {
            return (<TopNavigationBar
                title={this.props.title}
                needBackButton={true}
                backButtonCall={()=> {
                    this.props.navigator.pop()
                }}
            />)
        }
    }

    //CELL ROW DATA
    renderRow(rowData, sectionID, rowID) {
        return (
            <TCListRowView
                issue={rowData.uniqueIssueNumber}
                number={rowData.openCode}
                rowData={rowData}
                isFirstRow={rowID == 0 ? true : false}
            />
        )
    }

    pushToBetHome = (cpName) => {
        if (this.props.betBack){
            this.props.navigator.pop()
            return
        }
        let rowData = {}
        rowData.gameUniqueId = this.props.gameUniqueId
        rowData.gameNameInChinese = this.props.title
        TCNavigatorHelper.pushToBetHome(rowData)
    }

    loadDataFormNet() {
        NetUitls.getUrlAndParamsAndCallback(config.api.getHistoryList, this.props.gameUniqueId, (data)=> {

            if (this.refs['ListView1']) {
                this.refs['ListView1'].scrollTo({x: 0, y: 0, animated: true})
            }

            if (data && data.rs && data.content) {

                data.content = _.sortBy(data.content, function (item) {
                    return -item.uniqueIssueNumber;
                });

                if (data.content.length > 0) {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(data.content),
                        renderPlaceholderOnly: false
                    });
                } else {
                    Toast.showShortCenter('暂无数据')
                    this.setState({
                        renderPlaceholderOnly: false
                    })
                }
            } else {
                Toast.showShortCenter('网络异常')
            }
        });
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
    },
    bottomBarStyle: {
        backgroundColor: '#2B2B2B',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center'
    },
    bottomBarButtonStyle: {
        backgroundColor: '#cc0000',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderRadius: 8,
        padding: 10,
        width: width * 0.7
    },
});

