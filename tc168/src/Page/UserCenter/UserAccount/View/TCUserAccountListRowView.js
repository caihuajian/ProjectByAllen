'use strict'
/**
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import  TimerMixin from 'react-timer-mixin'
import LoadingSpinnerOverlay from 'react-native-smart-loading-spinner-overlay'
import  dismissKeyboard from 'dismissKeyboard'
import Moment from 'moment'
import {Size, Color, Window, Direction} from '../../../../Common/Style/AppStyle'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';

export  default  class TCUserAccountListRowView extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    static defaultProps = {};

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.itemStyle}>
                    <View style={styles.itemLeftStyle}>
                        <Text style={styles.itemTitle}>{this.getType()}<Text style={styles.orderState}> (<Text
                            style={styles.orderStateTxt}>{this.getState()}</Text>)</Text></Text>
                        {/* <Text style={styles.itemContent}>余额：￥5.00</Text>*/}
                    </View>
                    <View style={styles.itemRightStyle}>
                        <Text style={styles.itemTitle}>{this.getBalance()} 元</Text>
                        <Text style={styles.itemContent}>{this.getTime()}</Text>
                    </View>
                    <Image source={require('image!icon_next')} style={styles.imgNext}/>
                </View>
            </View>

        );

    };

    getTime() {
        return Moment(this.props.rowData.createTime).format("YYYY-MM-DD HH:mm:ss")
    }

    getType() {
        let type = this.props.rowData.type
        if (type === 'WITHDRAWAL') {
            return '提现'
        } else if (type === 'TOPUP') {
            return '充值'
        }else if (type == 'TOPUP_FOR_CANCEL_WITHDRAWAL'){
            return '取消提现'
        }
    }

    getState() {
        let state = this.props.rowData.state
        if (state === 'INITIALIZED' || state === 'IN_PROGRESS' || state === 'LOCK') {
            return '待审核'
        } else if (state === 'COMPLETED') {
            return '已完成'
        } else if (state === 'AUTO_TOPUP_FAILED' || state === 'FAILED') {
            return '失败'
        } else if (state === 'CLOSE') {
            return '关闭'
        }
    }

    getBalance() {
        let type = this.props.rowData.type
        let balance = this.props.rowData.amount
        if (type === 'WITHDRAWAL') {
            return (<Text style={styles.itemGreenTxt}>{'- ' + (balance).toFixed(2)}</Text>)
        } else if (type === 'TOPUP'||type === 'TOPUP_FOR_CANCEL_WITHDRAWAL') {
            return (<Text style={styles.itemRedTxt}>{'+ ' + (balance).toFixed(2)}</Text>)
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
    },
    itemStyle: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: 1
    },
    imgNext: {
        width: 10,
        height: 15,
        position: 'absolute',
        top: 23,
        left: Window.width * 0.9
    },
    itemLeftStyle: {
        margin: 10,
        alignSelf: 'flex-start'
    },
    itemRightStyle: {
        margin: 10,
        alignItems: 'flex-end',
        marginRight: 50
    }, itemTitle: {
        color: 'black',
        fontSize: 18
    }, itemContent: {
        marginTop: 5,
        color: '#999999',
        fontSize: 12
    }, orderState: {
        fontSize: Size.small,

    }, orderStateTxt: {
        fontSize: Size.small,
        color: 'red'
    }, itemGreenTxt: {
        color: 'green',
        fontSize: 18
    }, itemRedTxt: {
        color: 'red',
        fontSize: 18
    }

});
