'use strict'
/**
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    Modal
} from 'react-native';
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'

export  default  class DialogView extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    static defaultProps = {};

    componentDidMount() {
    }

    render() {

        return (
            // <View style={styles.confirmCont}>
            //     <View style={styles.dialogStyle}>
            //         <View style={styles.titleStyle}>
            //             <Text style={styles.textPrompt}>
            //                 {this.props.promptToUser}
            //             </Text>
            //         </View>
            //         <View style={styles.btnStyle}>
            //
            //             <TouchableHighlight
            //                 style={styles.yesBtnStyle}
            //                 onPress={this.props.skip}>
            //                 <Text style={styles.yesButton}
            //                 >
            //                     {'\r\n'}跳过
            //                 </Text>
            //             </TouchableHighlight>
            //             <TouchableHighlight
            //                 onPress={this.props.gotoWriteMsg}
            //                 style={styles.cancelBtnStyle}
            //             >
            //                 <Text style={styles.cancelButton}
            //                 >
            //                     {'\r\n'}去填写资料
            //                 </Text>
            //             </TouchableHighlight>
            //         </View>
            //     </View>
            //
            // </View>
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.props.show}
                onRequestClose={() => {
                }}
            >
                <View style={styles.modalStyle}>

                    <View style={styles.modalMain}>
                        <View style={styles.modalContent}>
                            <Text style={styles.dialogContextStyle}>
                                {this.props.promptToUser}
                            </Text>
                        </View>
                        <View style={styles.btmStyle}>
                            <TouchableOpacity onPress={()=>this.props.skip()}>
                                <View style={styles.btmLeftView}>
                                    <Text style={styles.queryTxtStyle}>跳过</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>this.props.gotoWriteMsg()} style={styles.btmRightView}>
                                <View >
                                    <Text style={[styles.queryTxtStyle,{color:'white'}]}>去填写资料</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal>
        );

    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
    },
    modalStyle: {
        borderRadius: 8,
        backgroundColor: 'rgba(52,52,52,0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, modalTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: Size.large,
        textAlign: 'center'
    }, modalContent: {
        height: Window.height * 0.22+2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.bg.grey5,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    }, queryTxtStyle: {
        color: Color.text.black1,
        height: 50,
        textAlign: 'center',
        paddingTop: 15,
        fontSize: Size.default
    },
    modalMain: {
        backgroundColor: 'white',
        height: Window.height * 0.3,
        width: Window.width * 0.8,
        borderRadius: 8
    }, dialogContextStyle: {
        fontSize: Size.large,
        textAlign: 'center'
    }, btmStyle: {
        flexDirection: 'row',

    }, btmLeftView: {
        width: Window.width * 0.4,
        borderRadius: 8
    },btmRightView: {
        width: Window.width * 0.4,
        backgroundColor:Color.bg.red,
        borderBottomRightRadius:8
    }
})