/**
 * Created by Sam on 2016/11/10.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import * as Progress from 'react-native-progress';

/** ***/
export default class Main extends Component {

    render() {
        return (
            <View  style={styles.launchImageStyle}>
                <Text style={styles.messages}>{this.state.progress.receivedBytes} of {this.state.progress.totalBytes} bytes received</Text>
                <Progress.Bar progress={0.3} width={200} />
            </View>
        );
    }

    componentDidMount(){

    }
};


const styles = StyleSheet.create({
    launchImageStyle:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
});

