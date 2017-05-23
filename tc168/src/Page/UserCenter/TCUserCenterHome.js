/**
 * Created by Sam on 2016/11/11.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';
import UserCenter from './TCUserCenter'

export  default  class TCUserCenterHome extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {};

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    componentDidMount() {
    }

    render() {
        return (<UserCenter navigator={this.props.navigator}/>);
    }
}
