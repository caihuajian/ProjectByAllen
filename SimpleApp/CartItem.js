import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

// 注意: 这里子组件必须监听
@observer
export default class CartItem extends Component {
    renderCount = 0;

    render() {
        const {data, store} = this.props;
        this.renderCount++
        return (
            <TouchableOpacity onPress={() => {
                this.onPress(store, data)
            }}>
                <View style={styles.rowContainer}>
                    <Text>{data.checked && '√'}</Text>
                    <Text>{data.id}</Text>
                    <Text>渲染次数{this.renderCount}</Text>
                </View>
            </TouchableOpacity>
        );
    }


    //左边图片选择
    renderLeftImage(data, store, checkIcon) {
        return (
            <TouchableOpacity onPress={() => {
                this.onPress(store, data)
            }}>
                <Text>{data.checked && '√'}</Text>
            </TouchableOpacity>
        )
    }

    onPress = (store, data) => {
        store.onChecked(data.id)
        this.props.onPress ? this.props.onPress(store.getSelectArray()) : () => {
        }
    }


}

const styles = StyleSheet.create({
    thumb: {
        marginRight: 10
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10,
        height: 70,
        // justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eef0f3'
    },
})