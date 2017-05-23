'use strict'
/**
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import  TimerMixin from 'react-timer-mixin'
import LoadingSpinnerOverlay from 'react-native-smart-loading-spinner-overlay'
import  dismissKeyboard from 'dismissKeyboard';
import {Size, Color, Window, Direction} from '../../../../Common/Style/AppStyle'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    TextInput,
    Platform
} from 'react-native';
var {width, height} = Dimensions.get('window');
export  default  class TCUserOrderChildrenItemRow extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    static defaultProps = {};

    componentDidMount() {
    }

    render() {
        let {orderChildrenData, gameName} =this.props
        return (
            <View>
                <View style={styles.itemStyle}>
                    <View style={styles.itemLeftStyle}>
                        <Text style={styles.itemTitle}>{gameName}</Text>
                        <Text style={styles.itemContent}>共{orderChildrenData.totalUnits}注</Text>
                    </View>

                    <View style={styles.itemMidStyle}>
                        <Text style={styles.itemTitle}>{orderChildrenData.gameMethodInChinese}</Text>
                        <Text style={styles.itemContent}>{orderChildrenData.bettingTime}</Text>
                    </View>
                    <View style={styles.itemRightStyle}>
                        <Text style={styles.itemContent1}>{(orderChildrenData.bettingAmount).toFixed(2)} 元</Text>
                        <Text style={styles.itemContent}>{this.getOrderState(orderChildrenData)}</Text>
                    </View>
                    <Image source={require('image!icon_next')} style={styles.imgNext}/>
                </View>
            </View>

        );

    };

    getOrderState(orderData) {
        switch (orderData.transactionState) {
            case 'PENDING':
                return '待开奖'
            case 'WIN':
                return (<Text style={{color:Color.text.red1}}>中{(orderData.winningAmount).toFixed(2)}元</Text>)
            case 'LOSS':
                return '未中奖'
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
    },
    itemStyle: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: 1,
        padding: 10
    },
    imgNext: {
        width: 10,
        height: 15,
        position: 'absolute',
        top: 23,
        left: width * 0.95
    },
    itemLeftStyle: {
        alignItems: 'center',
        width: Platform.OS === 'ios' ? width * 0.26 : width * 0.22
    },
    itemRightStyle: {
        alignItems: 'center',
        marginRight: 20,
        marginLeft: 10,
        width: width * 0.2,
    }, itemTitle: {
        color: 'black',
        fontSize: 16
    }, itemContent: {
        marginTop: 5,
        color: '#999999',
        fontSize: 12
    }, itemMidStyle: {
        alignItems: 'center',
        width: width * 0.4,
        marginLeft: 10
    }, itemContent1: {
        color: '#999999',
        fontSize: 16,
        justifyContent: 'flex-end'
    }

});
