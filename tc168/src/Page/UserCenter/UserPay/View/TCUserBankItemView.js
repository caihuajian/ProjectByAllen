import React, {Component, PropTypes,} from 'react'

import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native'

import {Size, Color, Window, Direction} from '../../../../Common/Style/AppStyle'
export default class TCUserBankItemView extends Component {



    // 构造函数
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

                <View style={styles.itemMainStyle}>

                    <View style={styles.itemLeftStyle}>
                        {/*<View>
                         <Text style={styles.itemTitleStyle}>收款银行</Text>
                         <Text style={styles.itemTitleStyle}>收款账号</Text>
                         <Text style={styles.itemTitleStyle}>收款人</Text>
                         <Text style={styles.itemTitleStyle}>收款支行</Text>
                         </View>
                         <View>
                         <Text style={styles.itemTitleRightStyle}>{this.props.rowData.bankName}</Text>
                         <Text style={styles.itemTitleRightStyle}>{this.props.rowData.bankCardNo}</Text>
                         <Text style={styles.itemTitleRightStyle}>{this.props.rowData.receiptName}</Text>
                         <Text style={styles.itemTitleRightStyle}>{this.props.rowData.bankAddress}</Text>
                         </View>*/}
                        <View style={styles.bankRowStyle}>
                            <Text style={styles.itemTitleStyle}>收款银行</Text>
                            <Text style={styles.itemTitleRightStyle}>{this.props.rowData.bankName}</Text>
                        </View>

                        <View style={styles.bankRowStyle}>
                            <Text style={styles.itemTitleStyle}>收款账号</Text>
                            <Text style={styles.itemTitleRightStyle}>{this.props.rowData.bankCardNo}</Text>
                        </View>
                        <View style={styles.bankRowStyle}>
                            <Text style={styles.itemTitleStyle}>{'收款人    '}</Text>
                            <Text style={styles.itemTitleRightStyle}>{this.props.rowData.receiptName}</Text>
                        </View>

                        <View style={styles.bankRowStyle}>
                            <Text style={styles.itemTitleStyle}>收款支行</Text>
                            <Text style={styles.itemTitleRightStyle}>{this.props.rowData.bankAddress}</Text>
                        </View>
                    </View>
                    <View style={{flex:1,alignItems: 'center', justifyContent: 'center',}}>
                        <Image source={this.props.selectIndex === this.props.rowData.adminBankId?require('image!bank_select'):require('image!bank_select2')} style={styles.itemImageStyle}/>
                    </View>
                </View>
            </View>
        )
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
    },
    itemMainStyle: {
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 10,
        flexDirection: Direction.row,

    }, itemTitleStyle: {
        color: Color.text.grey1,
        fontSize: Size.default,
        paddingLeft: 10,
        paddingTop: 10,
    }, itemLeftStyle: {
        padding: 10
    }, itemTitleRightStyle: {
        color: Color.text.black1,
        fontSize: Size.default,
        paddingLeft: 10,
        paddingTop: 10,
        width: Window.width * 0.58
    }, itemImageStyle: {
        flexDirection: Direction.row,
        width: 20,
        height: 20,
        paddingLeft: 10,
    }, itemRightViewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    }, bankRowStyle: {
        flexDirection: Direction.row,
    }

})