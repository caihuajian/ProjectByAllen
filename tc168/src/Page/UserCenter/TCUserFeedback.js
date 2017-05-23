/**
 * Created by allen-jx on 2017/5/11.
 */
import React, {Component, PropTypes,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    TextInput,
    ScrollView,
    Platform
} from 'react-native'
import {Size, Color, Window, Direction} from '../../Common/Style/AppStyle'
import TopNavigationBar from '../../Common/View/TCNavigationBar';
import LoadingSpinnerOverlay from 'react-native-smart-loading-spinner-overlay'
import {userRegisterAndLogin} from  '../resouce/appColorsConfig'
import Toast from '@remobile/react-native-toast'
import  dismissKeyboard from 'dismissKeyboard'
import NetUtils from '../../Common/Network/TCRequestUitls'
import {config} from '../../Common/Network/TCRequestConfig'
import BackBaseComponent from '../Base/TCBaseBackComponent'
import Dialog from '../../Common/View/TipDialog'
/**
 * 意见反馈
 */
export default class TCUserFeddback extends BackBaseComponent {

    // 构造函数
    constructor(state) {
        super(state)
        this.state = {
            title: '',
            content: '',
            tipShow: false
        }
    }

    static defaultProps = {};

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View style={styles.container}>
                < TopNavigationBar
                    title={'意见反馈'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.gotoBack()
                    }}
                />
                <ScrollView
                    keyboardShouldPersistTaps={Platform.OS !== 'ios'}
                    keyboardDismissMode={Platform.OS == 'ios' ? 'on-drag' : 'none'}
                >
                    <View style={styles.contentStyle}>
                        <View style={styles.loginInputStyle}>
                            <Text>标题</Text>
                            <TextInput
                                style={styles.loginInput}
                                underlineColorAndroid='transparent'
                                maxLength={50}
                                onChangeText={(text)=>this.onchangeTitle(text)}
                            />
                        </View>

                        <View style={styles.contentView}>
                            <Text>内容</Text>
                            <TextInput
                                style={styles.contentInput}
                                multiline={true}
                                returnKeyType='done'
                                blurOnSubmit={true}
                                underlineColorAndroid='transparent'
                                maxLength={500}
                                onChangeText={(text)=>this.onchangeContent(text)}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.bottomBarButtonStyle}
                            onPress={()=>this.submitFeedback()}
                        >
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: Size.large}}>
                                提 交
                            </Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
                <Dialog show={this.state.tipShow}
                        setModalVisible={()=> {
                            this.setDialogVisible()
                            this.gotoBack()
                        }}
                        dialogTitle={'提交成功'}
                        dialogContent={'感谢您的意见反馈，我们会及时处理！'}
                        btnTxt={'确定'}
                />
                <LoadingSpinnerOverlay
                    ref={ component => this._partModalLoadingSpinnerOverLay = component }
                    modal={true}
                    marginTop={64}/>
            </View>
        );
    }

    onchangeTitle(text) {
        this.state.title = text
    }

    onchangeContent(text) {
        this.state.content = text
    }

    submitFeedback() {

        if (this.state.title.length == 0) {
            Toast.showShortCenter("请输入标题!")
            return
        }
        if (this.state.content.length == 0) {
            Toast.showShortCenter("请输入内容!")
            return
        }
        dismissKeyboard();
        this._partModalLoadingSpinnerOverLay.show()
        this.requestServer()
    }

    setDialogVisible() {
        let isShow = this.state.tipShow;
        this.setState({
            tipShow: !isShow,
        });
    }

    requestServer() {
        let data = {title: this.state.title, content: this.state.content}
        NetUtils.PostUrlAndParamsAndCallback(config.api.userFeedback, data, (res)=> {
            this._partModalLoadingSpinnerOverLay.hide()
            if (res.rs) {
                this.timer = setTimeout(()=> {
                    this.setDialogVisible()
                }, 500)
            } else {
                if (res.message) {
                    Toast.showShortCenter(res.message)
                } else {
                    Toast.showShortCenter('服务器错误，登录失败!')
                }
            }
        }, null, false)
    }

    gotoBack() {

        this.props.navigator.pop()
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
    },
    loginInput: {
        height: 50,
        flex: 1,
        paddingLeft: 5,
        fontSize: 17,
        width: Window.width * 0.8,
        color: userRegisterAndLogin.inputTxtStyle,
        borderBottomWidth: 1,
        borderBottomColor: userRegisterAndLogin.inputStyle,
        backgroundColor: 'white',
        borderRadius: 5,
        marginLeft: 10
    }, loginInputStyle: {
        flexDirection: 'row',
        height: 50,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: Window.width * 0.9,
        marginTop: 20
    }, contentStyle: {
        alignItems: 'center',

    }, contentView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Window.width * 0.8,
        marginTop: 10,
        height: Window.height * 0.4,
        flexDirection: 'row'
    }, contentInput: {
        height: Window.height * 0.4,
        paddingLeft: 5,
        fontSize: 17,
        color: userRegisterAndLogin.inputTxtStyle,
        borderBottomWidth: 1,
        borderBottomColor: userRegisterAndLogin.inputStyle,
        backgroundColor: 'white',
        borderRadius: 5,
        marginLeft: 10,
        width: Window.width * 0.8
    }, bottomBarButtonStyle: {
        backgroundColor: userRegisterAndLogin.btnBgColor,
        justifyContent: 'center',
        flexDirection: Direction.row,
        height: 40,
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
        width: Window.width * 0.6,
        marginTop: 30,
        marginLeft:5
    },
})