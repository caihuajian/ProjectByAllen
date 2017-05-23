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
import {Size, Color, Window, Direction} from '../../../../Common/Style/AppStyle'
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
                <Text style={styles.titleTxtStyle}>{this.props.rowData.betString}</Text>
                <Text style={styles.titleTxtStyle}>{(this.props.orderPerMoney).toFixed(2)}</Text>
                <Text style={styles.titleTxtStyle}>{this.getOrderState(this.props.rowData.bonus)}</Text>
            </View>
        );
    }

    getOrderState(bonus) {
        let {orderState} = this.props
        if (orderState === 'PENDING') {
            return '待开奖'
        } else {
            if (bonus !== 0) {
                return ( <Text style={{color:Color.text.red1}}>中{(bonus).toFixed(3)}元</Text>)
            } else {
                return '未中奖'
            }
        }
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
        flexDirection: 'row',
        width: Window.width - 40,
        alignItems:'center'
    }, titleTxtStyle: {
        color: 'black',
        textAlign: 'center',
        fontSize: 16,
        marginTop:5,
        width: (Window.width - 40)/3,
        marginBottom:5
    }
});