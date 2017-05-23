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
    ListView
} from 'react-native'
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
import RowList from './View/TCUserOrderBetListRow'
export default class TCUserOrderBetList extends React.Component {
    constructor(state) {
        super(state)
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props.ordeBetList),
        }
    }

    static defaultProps = {};

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleViewStyle}>
                    <Text style={styles.titleTxtStyle}>投注号码</Text>
                    <Text style={styles.titleTxtStyle}>投注金额</Text>
                    <Text style={styles.titleTxtStyle}>中奖情况</Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.getRenderRow.bind(this)}
                    enableEmptySections={true}
                    removeClippedSubviews={true}
                    initialListSize={50}
                    pageSize={50}
                />
            </View>
        );
    }

    getRenderRow(rowData) {
        return (<RowList rowData={rowData} orderPerMoney={this.props.orderMoney} orderState={this.props.orderState}/>)
    }

    data() {
        let data = []
        for (let i = 0; i < 20; i++) {
            data.push({betString: '12' + i, money: 2, bonus: i * i})
        }
        return data
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
    }, titleViewStyle: {
        backgroundColor: Color.text.blue1,
        flexDirection: 'row',
        alignItems: 'center',
        width: Window.width - 40,
        justifyContent: 'space-around',

    }, titleTxtStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: Size.default,
        paddingTop: 5,
        paddingBottom: 5
    }
});