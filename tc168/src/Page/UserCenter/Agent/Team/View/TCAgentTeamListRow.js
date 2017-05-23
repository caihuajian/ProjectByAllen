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
export default class TCUserOrderBetListRow extends React.Component {
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
                <Text style={styles.titleTxtStyle}>{this.props.rowData.username}</Text>
                <Text
                    style={styles.titleTxtStyle}>{this.props.rowData.userBalance ? (this.props.rowData.userBalance.balance).toFixed(2) : 0.00}</Text>
                <Text style={styles.titleTxtStyle}>{this.props.rowData.createTime}</Text>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 1
    }, titleTxtStyle: {
        color: 'black',
        fontSize: 13,
        marginTop: 3,
        width: Window.width * 0.3,
        marginBottom: 3
    }
});