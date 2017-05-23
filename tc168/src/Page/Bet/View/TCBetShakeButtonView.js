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
    Image
} from 'react-native';

export default class MyComponent extends React.Component {

    static defaultProps = {};

    render() {
        return (
            <TouchableHighlight onPress={()=> {
                if (this.props.shakeEvent == null) return
                this.props.shakeEvent()
            }} style={{width: 120}} activeOpacity={0.5}
                                underlayColor='transparent'>
                <View style={{flexDirection: 'row', marginTop: 7, alignItems: 'center'}}>
                    <Image source={require('image!icon_shake')} style={{width: 25, height: 25, marginLeft: 10}}/>
                    <Text style={{color: '#666666', marginLeft: 5,fontSize:15}}>摇一摇机选</Text>
                </View>
            </TouchableHighlight>
        );
    };
}
