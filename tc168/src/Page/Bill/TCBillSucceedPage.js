/**
 * Created by Sam on 18/01/2017.
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
    Image,
    TouchableOpacity
} from 'react-native';

import {Window} from '../../Common/Style/AppStyle'
import TopNavigationBar from '../../Common/View/TCNavigationBar';

export default class MyComponent extends React.Component {
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
                <TopNavigationBar title='投注成功' needBackButton={true} backButtonCall={()=> {
                    this.props.navigator.popN(2)
                }}/>

                <View style={styles.innerView}>
                        <Image source={require('image!bank_select')} style={{width:60,height:60,marginTop:30}}/>
                        <Text style={{fontSize:18, marginTop:20,color:'#333333'}}>投注成功，祝您中奖</Text>
                        <Text style={{fontSize:14, marginTop:20,color:'#333333'}}>当前投注彩种：{this.props.cpName}</Text>
                        <Text style={{fontSize:14, marginTop:10,color:'#333333'}}>当前投注期数：第{this.props.issue}期</Text>
                </View>

                <TouchableOpacity style={{marginTop:20}} onPress={()=>{this.props.navigator.popN(2)}}>
                    <View style={{width:Window.width - 80,height:45,backgroundColor:'#3056b2',justifyContent:'center',alignItems:'center',borderRadius:8,marginLeft:40}}>
                        <Text style={{fontSize:15,color:'white'}}>确定</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    innerView:{
        padding:10,
        margin:10,
        justifyContent:'center',
        alignItems:'center',
        width:Window.width-20,
        backgroundColor:'white',
        height:220
    }
});
