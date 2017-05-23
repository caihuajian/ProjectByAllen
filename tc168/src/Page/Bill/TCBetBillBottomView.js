/**
 * Created by Sam on 2016/11/29.
 */
import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';

var {
    width
} = Dimensions.get('window');

export default class TCBetHomeBottomView extends React.Component {
    constructor(state) {
        super(state);
        this.state = {};
    }

    static defaultProps = {
        leftButtonCallEvent: null,
        rightButtonCallEvent: null
    };

    componentDidMount() {

    }

    _resetWithNumbers(multiple, numberOfUnits, price) {
        this.setState({
            multiple: multiple,
            numberOfUnits: numberOfUnits,
            price: price
        })
    }

    render() {
        return (
            <View style={styles.bottomBarStyle}>
                <TouchableOpacity style={styles.leftTitleStyle} onPress={()=>this.clearButtonCall()}>
                    <Text style={{fontWeight: 'bold', marginLeft: 5, marginRight: 5, fontSize: 17}}>清空列表</Text>
                </TouchableOpacity>

                <View style={styles.container}>
                    <Text style={{color: 'yellow', marginTop: 3, fontSize: 16}} ellipsizeMode='tail' numberOfLines={1}>共{this.state.price}元</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: 'white', fontSize: 12}}>共{this.state.numberOfUnits}注 </Text>
                        {/*<Text style={{color: 'white', fontSize: 12}}>{this.state.multiple}倍 </Text>*/}
                    </View>
                </View>
                <TouchableOpacity style={styles.rightTitleStyle} onPress={()=>this.payButtonCall()}>
                    <Text style={{fontWeight: 'bold', marginLeft: 5, marginRight: 5, fontSize: 19}}>付款</Text>
                </TouchableOpacity>
            </View>
        );
    }

    clearButtonCall() {
        if (this.props.leftButtonCallEvent == null) return
        this.props.leftButtonCallEvent()
    }

    payButtonCall() {
        if (this.props.rightButtonCallEvent == null) return
        this.props.rightButtonCallEvent()
    }

}

const styles = StyleSheet.create({
    bottomBarStyle: {
        backgroundColor: '#2B2B2B',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 49,
        width: width
    },
    leftTitleStyle: {
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        margin: 5,
        padding: 5,
        borderRadius: 5,
    },
    rightTitleStyle: {
        backgroundColor: '#d48f08',
        borderRadius: 5,
        justifyContent: 'center',
        margin: 5,
        padding: 5,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        width: width - 240
    }
});