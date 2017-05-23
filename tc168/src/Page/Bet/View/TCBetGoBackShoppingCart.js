/**
 * Created by Sam on 2016/12/22.
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
    TouchableHighlight,
    Image,
    Platform,
} from 'react-native';

export default class MyComponent extends React.Component {

    static defaultProps = {
    };

    constructor(state) {
        super(state);
        this.state = {
            cc:this.props.cc
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            cc:nextProps.cc
        })
    }

    render() {
        return (
            <TouchableHighlight onPress={()=> {
                if (this.props.shakeEvent == null) return
                this.props.shakeEvent()
            }} style={{width: Platform.OS =='ios'?120:130, borderWidth: 1, borderColor: '#d3d3d3', marginTop: 5, marginRight: 5, borderRadius: 8}} activeOpacity={0.5}
                                underlayColor='transparent'>
                <View style={{flexDirection: 'row', marginTop: 4, marginRight: 5, marginBottom: 4, alignItems: 'center'}} removeClippedSubviews={false}>
                    <Image source={require('../../resouce/fanhui2.png')} style={{width: 18, height: 18, marginLeft: 5}}/>
                    <Text style={{color: '#666666', marginLeft: 5, fontSize: 15}}>返回购物车</Text>
                    <View style={{borderRadius: 16, width: 16, height: 16,backgroundColor: '#f28f34',position: 'absolute',overflow:'visible',right:Platform.OS =='ios'?-8:0,top:Platform.OS =='ios'?-8:0,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white',fontSize:10}}>{this.state.cc>99?99:this.state.cc}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };
}
