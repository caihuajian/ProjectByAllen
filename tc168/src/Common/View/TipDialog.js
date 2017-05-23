import React, {Component, PropTypes,} from 'react'

import {View, StyleSheet, Text, TouchableOpacity, Modal} from 'react-native'
import {Size, Color, Window, Direction} from '../../Common/Style/AppStyle'
/**
 * 提示对话框
 */
export default class TipDialog extends Component {

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
                onRequestClose={() => {
                }}
            >
                <View style={styles.modalStyle}>

                    <View style={styles.modalMain}>

                        <View style={{alignItems: 'center', justifyContent: 'center', height: 40}}><Text
                            style={styles.modalTitle}>{this.props.dialogTitle}</Text></View>

                        <View style={styles.modalContent}>
                            <Text style={{textAlign: 'center'}}>
                                {this.props.dialogContent}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={()=>this.props.setModalVisible()}>
                        <View style={styles.queryBtnStyle}>

                                <Text style={styles.queryTxtStyle}>{this.props.btnTxt}</Text>

                        </View>
                        </TouchableOpacity>
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
        backgroundColor: 'rgba(52,52,52,0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, modalTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: Size.large,
        textAlign: 'center'
    }, modalContent: {
        height: Window.height * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth:0.5,
        borderTopColor: '#cccccc',
    },
    queryBtnStyle: {
        borderTopWidth: 0.5,
        borderTopColor: '#cccccc',
        height: Window.height * 0.15-40,
        justifyContent:'center',
    }, queryTxtStyle: {
        color: Color.text.blue,
        width: Window.width * 0.8,
        textAlign: 'center',
        fontSize: Size.large,
    },
    modalMain: {
        backgroundColor: 'white',
        height: Window.height * 0.3,
        width: Window.width * 0.8,
        borderRadius: 5
    }
})