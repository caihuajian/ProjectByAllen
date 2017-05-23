/**
 * Created by Joyce on 2017/03/25.
 */

import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    Modal,
    TouchableOpacity,
    Dimensions,
    Animated,
    Easing,
    Image,
} from 'react-native';


export default class TCKeyboardView extends React.Component {
    constructor(state) {
        super(state);
        this.state = {
            animationType: 'none',//none slide fade
            modalVisible: false,//模态场景是否可见
            transparent: true,//是否透明显示
            marginTop: new Animated.Value(Dimensions.get('window').height),
            closeEvent:null
        };
    }

    static defaultProps = {
        showMarginTop:Dimensions.get('window').height - Dimensions.get('window').height  / 2.6 - (Platform.OS == 'ios' ? 0 : 15),
        hiddenMarginTop:Dimensions.get('window').height,
        setInputValue: null,

    };

    componentDidMount() {

    }

    render() {
        return (
            <Modal
                animationType={this.state.animationType}
                transparent={this.state.transparent}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    {{this._setModalVisible(false)}}
                } }
            >
                <TouchableOpacity
                    onPress={() => {this._setModalVisible(false)}}
                    style={styles.modalBackgroundStyle}
                    activeOpacity = {1}
                    underlayColor = 'red'
                >
                        <Animated.View style={[styles.contentStyle, {
                                marginTop: this.state.marginTop,
                            }
                        ]}>
                            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                {this.getKeyBoardList()}
                            </View>
                        </Animated.View>
                </TouchableOpacity>
            </Modal>
        )
    }

    getKeyBoardList() {
        let boardList = []
        let numberArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, '删除', 0, '确认']
        for (let i = 0; i < numberArr.length; i++) {
            boardList.push(
                <TouchableOpacity
                    key={i}
                    style={styles.inputKeyStyle}
                    onPress={(e)=>this.numberCall(numberArr[i])}
                    textIndex={i}
                >
                    <View style={styles.inputKeyContainer}>
                        {this.getKeyBoardContent(numberArr[i])}
                    </View>
                </TouchableOpacity>
            )
        }
        return boardList
    }

    getKeyBoardContent(content){
        if (content == '删除'){
            return <Image source={require('../../Page/resouce/backspace.png')}/>
        } else {
            return <Text style={{fontSize: 26, color: '#333333'}}>{content}</Text>
        }
    }

    _setModalVisible(visible) {

        if (visible){
            this.setState({modalVisible: visible});
            this.animatedWithValue(this.props.showMarginTop)
        }else {
            this.props.closeEvent&&this.props.closeEvent()
            this.animatedWithValue(this.props.hiddenMarginTop,visible)
        }
    }

    animatedWithValue(value,visible) {
        Animated.timing(this.state.marginTop, {
            toValue:value,
            duration: 300,
            easing: Easing.linear
        }).start(()=>this.showModalVisible(visible));
    }

    showModalVisible(visible){
        if (!visible){
            this.setState({modalVisible: visible})
        }
    }

    numberCall(e) {
        if (e == '确认'){
            this._setModalVisible(false)
            if (this.props.setInputValue == null) return
        }

        this.props.setInputValue(e);
    }
}


const styles = StyleSheet.create({
    modalBackgroundStyle: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    contentStyle: {
        justifyContent: 'center',
        backgroundColor: '#EBEBEB',
    },
    inputKeyStyle: {
        backgroundColor: '#EBEBEB',
        height:  Dimensions.get('window').height / 2.6 / 4,
        width: Dimensions.get('window').width / 3,
        padding: 0.5,
    },
    inputKeyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    }
});