/**
 * Created by Sam on 2016/11/16.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import NumbersView from '../../../Common/View/TCLotteryNumbersView'
import Moment from 'moment'

export default class MyComponent extends React.Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    static defaultProps = {
        issue: '',
        date: '',
        number: '',
        type: '',
        rowData: null,
        isFirstRow: false
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.leftViewStyle}>
                        <Text style={{color: '#999999'}}>{'第' + this.props.issue + '期' + '   ' + Moment(this.props.rowData.openTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                    {this.getNumberView()}
                </View>
                <View style={{justifyContent: 'center', position: 'absolute', right: 10, width: 30}}>
                    <Image source={{uri: 'image!icon_next'}} style={styles.imageStyle }/>
                </View>
            </View>
        );
    };

    getNumberView() {
        return (
            <NumbersView
                cpNumbers={this.props.number.split(',')}
                isHighlightStyle={this.props.isFirstRow ? true : true}
                showStyle={this.props.rowData.gameUniqueId}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        borderBottomWidth: TCLineW,
        borderBottomColor: '#E8E8E8',
    },

    leftViewStyle: {
        justifyContent: 'center',
        flex: 1,
        marginLeft: 10,
        marginTop:10
    },

    imageStyle: {
        width: 25,
        height: 25,
    },

});