/**
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
    View
} from 'react-native';
import {Size, Color, Window, Direction} from '../../../../../Common/Style/AppStyle'
export default class TCAgentCommissionListRow extends React.Component {
    constructor(state) {
        super(state)
        this.state = {}
    }

    static defaultProps = {};

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titleTxtStyle}>{this.props.rowData.issueNo}</Text>
                <Text
                    style={styles.titleTxtStyle}>{this.props.rowData.currentTopupAggregateAmount.toFixed(2)}</Text>
                <Text
                    style={styles.titleTxtStyle}>{this.props.rowData.currentWithdrawAggregateAmount.toFixed(2)}</Text>
                <Text
                    style={styles.titleTxtStyle}>{this.props.rowData.commissionAmount.toFixed(2)}</Text>
                <Text
                    style={styles.titleTxtStyle}>{this.getStatus()}</Text>
            </View>
        );
    }

    getStatus() {

        switch (this.props.rowData.commissionStatus) {
            case 'UNTREATED':
                return '待退佣'
            case 'NOT_REACHED_THRESHOLD':
                return '未达到门槛'
            case 'RETURNED_COMMISSION':
                return '已退佣'
            case 'BEING_STATISTICS':
                return '统计中'
        }
    }

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 1
    }, titleTxtStyle: {
        color: 'black',
        textAlign: 'center',
        fontSize: 14,
        marginTop: 3,
        width: Window.width * 0.3,
        marginBottom:3
    }
});