import React, {Component, PropTypes,} from 'react'

import {View, StyleSheet, Text, TouchableOpacity, Image, Platform} from 'react-native'
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import UserAccount from '../UserAccount/TCUserAccountList'
import BackBaseComponent from '../../Base/TCBaseBackComponent'
import Helper from '../../../Common/JXHelper/TCNavigatorHelper'
/**
 * 充值进度界面
 */
export default class TCUserPayProgress extends BackBaseComponent {



    // 构造函数
    constructor(props) {

        super(props)

        this.state = {}
    }

    static defaultProps = {};

    componentDidMount() {
        super.componentDidMount()
    }

    componentWillUnmount() {
        super.componentWillUnmount()
    }

    render() {

        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={'充值进度'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.props.navigator.popToTop()
                    }}/>
                <View style={{alignItems: 'center', marginBottom: 20}}>


                    <View style={styles.mainViewStyle}>
                        <View style={styles.leftViewStyle}>

                            <Image source={require('image!bank_select')} style={styles.firstImgStyle}/>
                            <View style={styles.itemViewLineStyle}/>
                            <Image source={require('image!paidui22')} style={styles.firstImgStyle}/>
                            <View style={styles.itemViewGrayLineStyle}/>
                            <Image source={require('image!win')} style={styles.firstImgStyle}/>
                        </View>

                        <View>
                            <View>
                                <Text style={styles.itemTitleTxtStyle}>恭喜您，您的充值申请已经提交成功！</Text>
                                <Text style={styles.itemContentStyle}>充值金额<Text
                                    style={{color: 'red'}}>{this.props.topupAmount}</Text>元</Text>
                            </View>

                            <View style={styles.itemViewStyle}>
                                <Text style={styles.itemTitleTxtStyle}>正在排队，等待客服进行确认。</Text>
                            </View>

                            <View style={styles.itemViewStyle}>
                                <Text style={styles.itemTitleTxtStyle}>充值成功</Text>
                                <Text style={styles.itemContentStyle}>充值成功后，您的余额将在1分钟{'\n'}内更新，请稍后查看，若届时未{'\n'}更新，请联系在线客服</Text>
                            </View>
                        </View>
                    </View>


                    <TouchableOpacity
                        style={styles.bottomBarButtonStyle}
                        onPress={()=> {
                            this.gotoPayRecord()
                        }}
                    >
                        <Text style={{color: 'white', fontWeight: 'bold'}}>
                            确定
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    gotoPayRecord() {
        let {navigator} = this.props
        if (navigator) {
            navigator.push({
                name: 'userAccount', component: UserAccount, passProps: {accountType: 1, isBackToTop: true}
            });
        }

    }


    onBackAndroid() {
        Helper.popToTop()
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
    }, bottomBarButtonStyle: {
        backgroundColor: Color.bg.red,
        justifyContent: 'center',
        flexDirection: Direction.row,
        height: 40,
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
        width: Window.width * 0.8,
        marginTop: 40
    }, mainViewStyle: {
        flexDirection: Direction.row,
        marginTop: 50
    }, itemTitleTxtStyle: {
        fontSize: Platform.OS === 'ios' ? Size.small : Size.default,
        fontWeight: 'bold'
    }, itemContentTxtStyle: {
        color: Color.text.grey5
    }, itemViewStyle: {
        marginTop: Platform.OS === 'ios' ? 55 : 40
    }, leftViewStyle: {
        marginLeft: 20,
        marginRight: 10,
        alignItems: 'center'
    }, firstImgStyle: {
        width: 35,
        height: 35
    }, itemViewLineStyle: {
        width: 1,
        height: 50,
        borderColor: Color.border.green,
        borderWidth: 0.5
    }, itemViewGrayLineStyle: {
        width: 1,
        height: 50,
        borderColor: Color.border.grey5,
        borderWidth: 0.5
    }
})