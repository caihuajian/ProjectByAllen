/**
 * Created by Sam on 10/02/2017.
 * Copyright © 2017年 JX. All rights reserved.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Dimensions
} from 'react-native';

/**系统 npm类 */
import Toast from '@remobile/react-native-toast';

/**组件内部显示需要引入的类 */
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
var {width, height} = Dimensions.get('window');


/** 外部关系组件 如 页面跳转用 */
import {config, appId} from '../../../Common/Network/TCRequestConfig';
import NetUitls from '../../../Common/Network/TCRequestUitls'

export default class MyComponent extends React.Component {
    constructor(state) {
        super(state)
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
        }
    }

    static defaultProps = {}

    componentDidMount() {
        this.request()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <TopNavigationBar title='最新中奖榜' needBackButton={true} backButtonCall={()=> {
                        this.props.navigator.pop()
                    }}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ececec', padding: 5}}>
                        <Text style={{marginLeft: 10, fontSize: 15, color: '#666666',width:60}}>用户名</Text>
                        <Text style={{fontSize: 15, color: '#666666',width:80}}>中奖金额</Text>
                        <Text style={{marginRight: 20, fontSize: 15, color: '#666666',width:80}}>彩种</Text>
                    </View>
                    <ListView
                        style={{height: height - 104}}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData, sectionID, rowID)=>this.renderRow(rowData, sectionID, rowID)}
                        ref="ListView"
                    />
                </View>
            </View>
        )
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <TopWinnerLabel data={rowData} />
        )
    }

    request() {
        NetUitls.getUrlAndParamsAndCallback(config.api.findTopWinners, {clientId: appId}, (data) => {
            if (data && data.content) {

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(data.content),
                })
            } else {
                Toast.showShortCenter('网络异常 请稍后再试')
            }
        }, null, true)
    }

}

class TopWinnerLabel extends React.Component {
    constructor(state) {
        super(state)
        this.state = {}
    }

    static defaultProps = {
        data: {}
    }

    componentDidMount() {
    }

    render() {
        return (
                <View style={styles.labelStyle}>
                    <Text style={{width: 70, marginLeft: 10,marginRight:20,color: '#999999'}}>{this.props.data.username}</Text>
                    <Text style={{width: width / 3+20, color: 'red',fontSize:width>=375?15:13}}>喜中{this.props.data.winningAmount}元</Text>
                    <Text style={{width: width / 3+30, color: '#999999',fontSize:width>=375?15:13}}>购买{this.props.data.gameNameInChinese}</Text>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    labelStyle: {
        marginTop:0,
        backgroundColor:'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        borderBottomWidth:TCLineW,
        borderBottomColor:'#ccc',
        alignItems:'center'
    }
});
