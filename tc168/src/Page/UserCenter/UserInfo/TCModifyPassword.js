/**
 * 修改用户登录密码
 * Created by Allen on 2016/12/13.
 */
'user strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native';
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
import Toast from '@remobile/react-native-toast';
import LoadingSpinnerOverlay from 'react-native-smart-loading-spinner-overlay'
import {config} from '../../../Common/Network/TCRequestConfig'
import _ from 'lodash';
import  Dialog from '../../../Common/View/TipDialog'
import  NetUtils from '../../../Common/Network/TCToolNetWork'
import  RequestUtils from '../../../Common/Network/TCRequestUitls'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Helper from '../../../Common/JXHelper/TCNavigatorHelper'
import  dismissKeyboard from 'dismissKeyboard'
export default class TCModifyPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            oldPwd: '',
            newPwd1: '',
            newPwd2: '',
            show: false,
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
                    title={'修改登录密码'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.props.navigator.pop()
                    }}
                />


                <View style={{marginTop: 40, flexDirection: 'column'}}>
                    <View style={styles.inputItem}>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder='旧密码'
                            placeholderTextColor='#cccccc'
                            secureTextEntry={true}
                            maxLength={15}
                            underlineColorAndroid='transparent'
                            onChangeText={(text)=>this.changeOldPwd(text)}
                        />
                    </View>
                    <View style={styles.inputItem}>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder='新密码(6-15位)'
                            secureTextEntry={true}
                            maxLength={15}
                            placeholderTextColor='#cccccc'
                            underlineColorAndroid='transparent'
                            onChangeText={(text)=>this.changeNewPwd1(text)}
                        />
                    </View>

                    <View style={styles.inputItem}>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder='再次输入新密码'
                            placeholderTextColor='#cccccc'
                            secureTextEntry={true}
                            maxLength={15}
                            underlineColorAndroid='transparent'
                            onChangeText={(text)=>this.changeNewPwd2(text)}
                        />
                    </View>
                </View>
                <View style={{alignItems: 'center'}}>

                    <TouchableOpacity
                        style={styles.bottomBarButtonStyle}
                        onPress={()=>this.newPwdVal()}
                    >
                        <Text style={{color: 'white', fontWeight: 'bold'}}>
                            确定
                        </Text>
                    </TouchableOpacity>
                </View>

                <LoadingSpinnerOverlay
                    ref={ component => this._modalLoadingSpinnerOverLay = component }/>
                <Dialog show={this.state.show}
                        setModalVisible={()=>this.gotoLogin()}
                        dialogTitle={'温馨提示'}
                        dialogContent={'您的密码已经修改成功，请重新登录！'}
                        btnTxt={'好的'}/>
            </View>
        );
    }


    changeOldPwd(text) {
        this.state.oldPwd = text;
    }

    changeNewPwd1(text) {
        this.state.newPwd1 = text;
    }

    changeNewPwd2(text) {
        this.state.newPwd2 = text;
    }


    newPwdVal() {
        let {oldPwd, newPwd1, newPwd2} = this.state;
        if (!oldPwd.length) {
            Toast.showShortCenter("请输入旧密码");
            return;
        }
        if (!newPwd1.length || !newPwd2.length) {
            Toast.showShortCenter("请输入新密码");
            return;
        }

        if (newPwd1.length < 6) {
            Toast.showShortCenter("密码格式错误(6-15)");
            return;
        }
        if (newPwd1 !== newPwd2) {
            Toast.showShortCenter("两次输入新密码不一致");
            return;
        }
        dismissKeyboard()
        this.modifyPwd(oldPwd, newPwd2);
    }

    modifyPwd(oldPwd, newPwd) {
        this._modalLoadingSpinnerOverLay.show()

        let data = {'password': oldPwd, 'newPassword': newPwd, 'mode': 'PASSWORD'};
        RequestUtils.PostUrlAndParamsAndCallback(config.api.changePwd, data, (response) => {
            this._modalLoadingSpinnerOverLay.hide()
            if (response.rs) {
                this.timer = setTimeout(() => {
                    Alert.alert(
                        '温馨提示',
                        '您的密码已经修改成功，请重新登录!',
                        [
                            {text: '确定', onPress: () => this.modifySuccess()},
                        ]
                    )
                }, 500)
            } else {
                if (response.status === 500) {
                    Toast.showShortCenter("服务器出错啦")
                } else {
                    if (response.message) {
                        Toast.showShortCenter(response.message)
                    } else {
                        Toast.showShortCenter("修改失败，请输入正确密码!")
                    }
                }
            }
        })

    }


    modifySuccess() {
        storage.remove({
            key: 'user',
        });
        TCUSER_DATA = {}
        RCTDeviceEventEmitter.emit('setSelectedTabNavigator', 'home');
        RCTDeviceEventEmitter.emit('userStateChange', 'logout');
        Helper.pushToUserLogin(true)
    }

    // 显示/隐藏 modal
    setModalVisible() {
        let isShow = this.state.show;
        this.setState({
            show: !isShow,
        });
    }

    gotoLogin() {
        this.setModalVisible();
        TCUSER_DATA = {};
        this.modifySuccess();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
    },
    inputItem: {
        flexDirection: 'row',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: Color.bg.mainBg,
        paddingLeft: 10,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    bottomBarButtonStyle: {
        backgroundColor: '#cc0000',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
        width: Window.width * 0.8,
        marginTop: 20
    },
    inputStyle: {
        flex: 1,
        marginLeft: 20
    },
    tipTextStyle: {
        marginTop: 30,
        marginLeft: Window.width * 0.1,
    }
});

{/*  <View style={{marginTop:20,flexDirection:'column'}}>
 <View style={styles.inputItem}>
 <Text>真实姓名</Text>
 <TextInput
 style={styles.inputStyle}
 placeholder='请填写注册时的用户名'
 placeholderTextColor='#cccccc'
 underlineColorAndroid='transparent'
 />
 </View>
 <View  style={styles.inputItem}>
 <Text>身份证号</Text>
 <TextInput
 style={styles.inputStyle}
 placeholder='请填写正确的身份证号码'
 placeholderTextColor='#cccccc'
 underlineColorAndroid='transparent'
 />

 </View>
 <View  style={styles.inputItem}>
 <Text>手机号码</Text>
 <TextInput
 style={styles.inputStyle}
 placeholder='请填写当前用户名下的手机号'
 placeholderTextColor='#cccccc'
 underlineColorAndroid='transparent'
 />
 </View>
 </View>
 <View style={{alignItems:'center'}}>

 <TouchableOpacity
 style={styles.bottomBarButtonStyle}
 >
 <Text style={{color:'white',fontWeight:'bold'}}>
 提交
 </Text>
 </TouchableOpacity>
 </View>*/
}
