/**
 * Created by Allen on 2017/1/24.
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
import {connect} from 'react-redux'
import * as  counterAction from '../actions/counter'


class counter extends React.Component {
    constructor(state) {
        super(state)
        this.state = {
        }
    }

    static defaultProps = {
    };

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <View><Text>{this.props.state.count}</Text></View>
                <View>
                    <TouchableHighlight onPress={()=>this.props.add()} underlaycolor={'#000000'}>
                        <Text style={{fontSize:16,color:'#000000'}}>加数字</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
    }
});


export default connect(state => ({state: state.counter || {}}),
    (dispatch) => ({
        add: () => dispatch(counterAction.add()),
    }))(counter);
