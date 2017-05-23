import React, {Component, PropTypes,} from 'react'

import {View, StyleSheet, Text, TouchableOpacity, Modal} from 'react-native'
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
/**
 * 提示对话框
 */
export default class Dialog extends Component {



    // 构造函数
    constructor(props) {

        super(props)

        this.state = {
            modalVisible: false
        }
    }


    render() {

        return (

            <Modal
                animationType='fade'
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {this._setModalVisible(false)}}
            >

                <TouchableOpacity style={styles.modalStyle} onPress={()=>this._setModalVisible(false)}>

                    <View style={styles.modalMain}>

                        <View style={{alignItems:'center',justifyContent:'center',   height: Window.height * 0.08}}><Text
                            style={styles.modalTitle}>{this.props.dialogTitle}</Text></View>

                        <View style={styles.modalContent}>
                            <Text style={{ textAlign: 'center',fontSize:Size.default}}>
                                {this.props.dialogContent}
                            </Text>
                        </View>
                        <View style={styles.queryBtnStyle}>
                            <View style={{justifyContent:'center'}}>
                                <TouchableOpacity onPress={()=>this.props.leftBtnClick()}>
                                    <Text style={styles.queryLeftTxtStyle}>{this.props.leftTxt}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{justifyContent:'center'}}>
                                <TouchableOpacity onPress={()=>this.props.rightBtnClick()}>
                                    <Text style={styles.queryTxtStyle}>{this.props.btnTxt}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
    },
    modalStyle: {
        backgroundColor: 'rgba(52,52,52,0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, modalTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: Size.large,
        textAlign: 'center',
    }, modalContent: {
        height: Window.height * 0.15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    queryBtnStyle: {
        height: Window.height * 0.07,
        borderTopWidth: 1,
        borderTopColor: '#cccccc',
        flexDirection: Direction.row,

    }, queryTxtStyle: {
        color: Color.text.blue,
        width: Window.width * 0.4,
        textAlign: 'center',
        fontSize: Size.default
    },
    modalMain: {
        backgroundColor: 'white',
        height: Window.height * 0.3,
        width: Window.width * 0.8,
        borderRadius: 5
    }, queryLeftTxtStyle: {
        color: Color.text.blue,
        width: Window.width * 0.4,
        textAlign: 'center',
        fontSize: Size.large
    },
})