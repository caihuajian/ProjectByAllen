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
    View
} from 'react-native';

export default class MyComponent extends React.Component {
    constructor(state) {
        super(state)
        this.state = {
            y: 0
        };
    }

    static defaultProps = {};

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    ref='_ScrollView'
                    style={{height:80}}
                    scrollEnabled={false}
                >
                    <View><Text>{" "}</Text></View>
                    <View><Text>{" "}</Text></View>
                    <View><Text>{" "}</Text></View>
                    <View><Text>{" "}</Text></View>
                    <View><Text>{"I'm the first content and my delay is 2s"}</Text></View>
                    <View><Text>{"I'm the first content and my delay is 3s"}</Text></View>
                    <View><Text>{"I'm the first content and my delay is 4s"}</Text></View>
                    <View><Text>{"I'm the first content and my delay is 5s"}</Text></View>
                    <View><Text>{"I'm the first content and my delay is 6s"}</Text></View>
                    <View><Text>{"I'm the first content and my delay is 7s"}</Text></View>
                    <View><Text>{"I'm the first content and my delay is 8s"}</Text></View>
                    <View><Text>{"I'm the first content and my delay is 9s"}</Text></View>
                    <View><Text>{"I'm the first content and my delay is 10s"}</Text></View>
                    <View><Text>{"I'm the first content and my delay is 11s"}</Text></View>
                    <View><Text>{"I'm the first content and my delay is 12s"}</Text></View>
                    <View><Text>{"I'm the first content and my delay is 13s"}</Text></View>
                    <View><Text>{"I'm the first content and my delay is 14s"}</Text></View>
                    <View><Text>{"I'm the first content and my delay is 15s"}</Text></View>
                    <View><Text>{" "}</Text></View>
                    <View><Text>{" "}</Text></View>
                    <View><Text>{" "}</Text></View>
                    <View><Text>{" "}</Text></View>
                    <View><Text>{" "}</Text></View>
                </ScrollView>
            </View>
        );
    }

    _scrollTo(y) {
        var scrollView = this.refs._ScrollView
        scrollView.scrollTo({x: 0, y: y, animated: true})
    }

    componentDidMount() {
        // this.timer = setInterval(
        //     () => {
        //         console.log('----------y:' + this.state.y)
        //
        //         if (this.state.y > 260) {
        //             this.setState({
        //                 y: -10
        //             })
        //         } else {
        //             this.setState({
        //                 y: this.state.y + 3
        //             })
        //         }
        //
        //
        //         this._scrollTo(this.state.y)
        //     },
        //     100
        // );
        this.encode()

    }


    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
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