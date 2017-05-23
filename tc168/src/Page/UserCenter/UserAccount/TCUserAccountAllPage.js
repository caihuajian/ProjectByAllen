'use strict'
/**
 * 全部账户记录
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import NoDataView from '../../../Common/View/TCNoDataView'
import  ListRow from './View/TCUserAccountRowView'
import AccountDetail from './TCUserAccountAllPageDetail'
import RequestUtils from '../../../Common/Network/TCRequestUitls'
import {config} from '../../../Common/Network/TCRequestConfig'
import Toast from '@remobile/react-native-toast'
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
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
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
export  default  class TCUserAccountAllPage extends Component {

    constructor(props) {
        super(props)
        this.data = []
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds.cloneWithRows(this.data),
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
                < TopNavigationBar
                    title={'账户明细'}
                    needBackButton={true}
                    backButtonCall={() => {
                        RCTDeviceEventEmitter.emit('balanceChange')
                        this.props.navigator.popToTop()
                    }}
                />
                {
                    this.getContentView()
                }
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
            return (   this.state.isNoData ? (<NoDataView
                titleTip="暂无账户明细"
                contentTip="大奖不等待，速去购彩吧~"
            />) : (
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.getRenderRow.bind(this)}
                    enableEmptySections={true}
                />))
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

    loadDataFromNet() {
        RequestUtils.getUrlAndParamsAndCallback(config.api.balanceHistory,
            null,
            (response) => {
                if (response.rs) {

                    if (response.content != null && response.content.length > 0) {
                        this.data = _.concat(this.data, response.content)
                    } else {

                        this.setState({
                            isNoData: true
                        })
                    }
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(this.data)
                    })
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
    },
});