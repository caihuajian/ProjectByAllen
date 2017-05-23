import React, {Component, PropTypes,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Platform
} from 'react-native'
import {Size, Color, Window, Direction} from '../../../../Common/Style/AppStyle'

export default class TCUserBankRowView extends Component {



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

                <Image source={{uri:this.props.bankCode+'_bg'}} resizeMode={'stretch'} style={styles.bankBgStyle}>

                    <View>
                        <View style={styles.bankTitle}>
                            <Image source={{uri:this.props.bankCode}} resizeMode={'stretch'}
                                   style={styles.bankImgIcon}/>
                            <View>
                                <Text style={styles.bankTitleTxt}>{this.props.bankName} </Text>
                                <Text style={styles.bankTypeTxt}>储蓄卡</Text>
                            </View>
                        </View>
                        <View style={styles.bankNumItemStyle}>
                            <Text style={styles.bankNumStyle}>****  **** **** ****
                                <Text>{this.props.bankNum.substr(this.props.bankNum.length - 4, 4)}</Text></Text>
                        </View>
                    </View>
                </Image>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
    },
    bankBgStyle: {
        width: Window.width - 10,
        height: Window.height * 0.15,
        margin: 5,
        backgroundColor:Platform.OS ==='ios'?'green':'transparent',
        borderRadius:5
    }, bankImgIcon: {
        width: 60,
        height: 60,
        marginLeft: 20,
        marginTop: 10
    }, bankTitle: {
        flexDirection: Direction.row
    }, bankTitleTxt: {
        color: 'white',
        fontSize: Size.default,
        marginTop: 15,
        marginLeft: 15,
        backgroundColor: 'transparent'
    }, bankNumStyle: {
        color: 'white',
        fontSize: Platform.OS === 'ios'?Size.small:Size.large,
        backgroundColor: 'transparent',
    }, bankNumItemStyle: {
        alignItems: 'flex-end',
        marginRight: 20,
    }, bankTypeTxt: {
        color: 'white',
        marginLeft: 15,
        marginTop: 5,
        backgroundColor: 'transparent'
    }
})