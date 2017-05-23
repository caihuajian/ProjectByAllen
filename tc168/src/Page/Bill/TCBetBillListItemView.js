/**
 * Created by Sam on 2016/11/19.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';


export default class TCBetBillListItemView extends React.Component {
    constructor(state) {
        super(state);
        this.state = {};
    }

    static defaultProps = {
        jsonData: {},
        deleteButtonEvent: null,
        index: null
    };

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.leftViewStyle}>
                    <Text style={{color: 'red', fontWeight: 'bold', fontSize: 17, marginBottom: 2, flex: 1, marginTop: 10, marginLeft: 20}}> {this.props.jsonData.betString} </Text>
                    <Text style={{fontSize: 13, color: '#999999', marginTop: 5, marginLeft: 20, marginBottom: 10}}>
                        {this.props.jsonData.showGameplayMethod} {this.props.jsonData.numberOfUnits}注 {this.props.jsonData.amount}元
                    </Text>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, width: 40}}>
                    <TouchableOpacity onPress={()=>this.deleteButtonCall()} style={{width: 55, height: 70, justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={require('image!icon-qingchu')} style={{height: 22, width: 22}}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    deleteButtonCall() {
        if (this.props.deleteButtonEvent == null) return
        this.props.deleteButtonEvent(this.props.index)
    }
}


const styles = StyleSheet.create({
    container: {
        // height:80,
        flexDirection: 'row',
        borderTopWidth: TCLineW,
        borderTopColor: '#F2F2F2',
        width: Dimensions.get('window').width - 40,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftViewStyle: {
        width: Dimensions.get('window').width - 80,
        backgroundColor: 'white',
    },
    rightViewStyle: {},

});