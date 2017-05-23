import React, {Component, PropTypes,} from 'react'

import {View, StyleSheet, Text, TouchableOpacity, Modal, Image,Platform} from 'react-native'
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
/**
 * 扫一扫帮助页面
 */
export default class TCUserHelp02 extends Component {



    // 构造函数
    constructor(props) {

        super(props)

        this.state = {

        }
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
                    <Image source={!this.props.isWeChat?require('image!alipay02'):require('image!wechat02')} style={styles.imgViewStyle} resizeMode={'contain'}/>

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
        flex: 1,
        backgroundColor: 'rgba(52,52,52,0.7)',
        alignItems: 'center'
    }, imgViewStyle: {
        width: Window.width * 0.7,
        height: Window.height * 0.6,
        marginTop: Platform.OS == 'ios'?Window.height * 0.1+30:Window.height * 0.1+10
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
        width: Window.width,
        justifyContent: 'flex-end',
        marginTop: 40,
        paddingRight: 30
    }
})