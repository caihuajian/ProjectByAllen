/**
 * Created by Sam on 2016/11/19.
 */
/**
 * Created by Sam on 2016/11/11.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window')

export default class TCBillViewButton extends React.Component {
    constructor(state) {
        super(state);
        this.state = {};
    }

    static defaultProps = {
        title: '',
        icon: '',
        buttonCallBack: null,
        num: 1
    };

    componentDidMount() {

    }

    render() {
        return (
            <TouchableOpacity style={{width: ((width-60)/3), height: 30,}} onPress={()=>this.buttonCall()}>
                <View style={styles.container}>
                    {/*<Image source={{uri: this.props.icon}} style={{width: 25, height: 25, marginTop: 5}}/>*/}
                    <Text style={{fontSize:14,color:'#333333'}}>{'+ '+this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    buttonCall() {
        if (this.props.buttonCallBack == null) return
        this.props.buttonCallBack(this.props.num)
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        width: ((width - 60) / 3),
        height: 30,
        borderColor: '#E8E8E8',
        borderWidth: 0.5,
        borderRadius: 5,
    }
});