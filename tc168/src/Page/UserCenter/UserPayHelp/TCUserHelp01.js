import React, {Component, PropTypes,} from 'react'

import {View, StyleSheet, Text, TouchableOpacity, Modal, Image,Platform} from 'react-native'
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
/**
 * 扫一扫帮助页面
 */
export default class TCUserHelp01 extends Component {



    // 构造函数
    constructor(props) {

        super(props)

        this.state = {}
    }


    render() {

        return (

            <Modal
                animationType='fade'
                transparent={true}
                visible={this.props.show}
                onRequestClose={() => {}}
            >
                <View style={styles.modalStyle}>

                </View>
                <View style={{flexDirection:Direction.row}}>

                    <View style={styles.modalLeftStyle}>

                    </View>
                    <View style={styles.modalMidStyle}>

                    </View>
                    <View style={styles.modalLeftStyle}>

                    </View>
                </View>

                <View style={styles.modalBtmStyle}>
                    <Image source={require('image!alipay01')} style={styles.imgViewStyle} resizeMode={'contain'}/>

                    <View style={styles.btmBtnViewStyle}>

                        <TouchableOpacity onPress={()=>this.props.next()}><Text
                            style={styles.btmBtnTxtStyle}>下一步</Text></TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
    },
    modalStyle: {
        height: Platform.OS == 'ios'?Window.height * 0.25:Window.height * 0.20,
        backgroundColor: 'rgba(0,0,0,0.6)',
    }, imgViewStyle: {
        width: 50,
        height: 50,
        backgroundColor: 'rgba(52,52,52,0)',
    }, modalLeftStyle: {
        width: 40,
        backgroundColor: 'rgba(0,0,0,0.6)',
        height: Window.height * 0.35,
        flex: 1
    }, modalBtmStyle: {
        height: Window.height * 0.5,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center'
    }, modalMidStyle: {
        width: Window.width * 0.6,
    }, imgViewStyle: {
        width: 160,
        height: 100
    },
    btmBtnTxtStyle: {
        backgroundColor: 'white',
        marginTop: 15,
        alignSelf: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 8,
        color: Color.text.green
    }, btmBtnViewStyle: {
        flexDirection: 'row',
        width:Window.width,
        justifyContent: 'flex-end',
        paddingTop: Platform.OS == 'ios'? 30:70,
        paddingRight:30
    }
})