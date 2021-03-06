/**
 * Created by Sam on 2017/1/12.
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
    TouchableHighlight
} from 'react-native';
import Moment from 'moment'
import {Size, Color, Window, Direction} from  '../../../Common/Style/AppStyle'

export default class MyComponent extends React.Component {
    constructor(state) {
        super(state)
        this.state = {}
    }

    static defaultProps = {
        selectedEvent: null
    };

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{marginLeft: 40, marginTop: 15, marginRight: 15, width: Window.width - 60}}>
                    <Text style={{fontSize: 15, color: '#333333', marginBottom: 10}}>{this.props.data.title}</Text>
                </View>
                <View style={{borderBottomWidth: 0.5, borderBottomColor: '#f5f5f5', width: Window.width - 30}}>
                    <Text style={{fontSize: 13, color: '#cccccc', marginLeft: 14, marginBottom: 5}}>{Moment.unix(this.props.data.createTime).format("YYYY年MM月DD号")}</Text>
                </View>
                <View style={{marginLeft: 15, marginTop: 15, marginRight: 15, marginBottom: 20}}>
                    <Text style={{fontSize: 15, color: '#999999'}}>{this.props.data.content}</Text>
                </View>
            </View>
        );
    }

    didSelected() {

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Window.width - 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 15,
        marginLeft: 10
    }
});
