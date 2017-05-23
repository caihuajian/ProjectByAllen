/**
 * Created by Sam on 2016/12/13.
 */
/**
 * Created by Sam on 2016/11/11.
 */

import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform
} from 'react-native';

export default class TCBetChoiceTitleView extends React.Component {

    static defaultProps = {
        titleName: '',
        isGrayBackground: false,
        style: []
    };

    render() {
        return (
            <Image source={this.props.isGrayBackground ? require('image!bg_place02') : require('image!bg_place')} style={[{width: 45*1.3, height: 20*1.3}, this.props.style]}>
                <Text style={[styles.leftTitleStyle, this.props.isGrayBackground ? {color: '#999999'} : {}]}>{this.props.titleName}</Text>
            </Image>
        );
    };
}


const styles = StyleSheet.create({
    leftTitleStyle: {
        fontSize: 15,
        textAlign: "center",
        height: 20*1.3,
        width: 50,
        marginTop:Platform.OS == 'ios'?5:0,
        marginLeft: 1,
        color: '#666666',
        backgroundColor: 'transparent'
    },
});