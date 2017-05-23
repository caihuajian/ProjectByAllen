/**
 * 修改用户交易密码
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
    Image
} from 'react-native';
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
import Toast from '@remobile/react-native-toast';
import LoadingSpinnerOverlay from 'react-native-smart-loading-spinner-overlay'
import {config} from '../../../Common/Network/TCRequestConfig'
import  NetUtils from '../../../Common/Network/TCToolNetWork'
import RequestUtils from '../../../Common/Network/TCRequestUitls'
import BackBaseComponent from '../../Base/TCBaseBackComponent'
import  dismissKeyboard from 'dismissKeyboard'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'

export default class TCModifySecurityPwd extends BackBaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            oldPwd: '',
            newPwd1: '',
            newPwd2: '',
            isClose: false,
        }
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
                    title={'修改交易密码'}
                    needBackButton={true}
                    backButtonCall={() => {
                        this.props.navigator.pop()
                    }}
                />
                {this.renderTip()}
                <View style={{marginTop: 40, flexDirection: 'column'}}>

                    <View style={styles.inputItem}>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder='请输入旧密码'
                            placeholderTextColor='#cccccc'
                            secureTextEntry={true}
                            keyboardType={'numeric'}
                            maxLength={4}
                            underlineColorAndroid='transparent'
                            onChangeText={(text)=>this.changeOldPwd(text)}
                        />
                    </View>
                    <View style={styles.inputItem}>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder='请输入新密码'
                            placeholderTextColor='#cccccc'
                            secureTextEntry={true}
                            maxLength={4}
                            keyboardType={'numeric'}
                            underlineColorAndroid='transparent'
                            onChangeText={(text)=>this.changeNewPwd1(text)}
                        />
                    </View>
                    <View style={styles.inputItem}>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder='确定密码'
                            secureTextEntry={true}
                            maxLength={4}
                            keyboardType={'numeric'}
                            placeholderTextColor='#cccccc'
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
        let reg = /^[0-9]{4}$/
        if (!oldPwd.match(reg)) {
            Toast.showShortCenter('旧密码格式错误')
            return
        }

        if (!newPwd1.length) {
            Toast.showShortCenter("请输入新密码");
            return;
        }
        if (!newPwd1.match(reg)) {
            Toast.showShortCenter('新密码格式错误')
            return
        }

        if (!newPwd2.length) {
            Toast.showShortCenter("请输入确认密码");
            return;
        }

        if (newPwd1 !== newPwd2) {
            Toast.showShortCenter("两次输入密码不一致");
            return;
        }
        dismissKeyboard()
        this.modifyPwd(oldPwd, newPwd1);
    }

    modifyPwd(oldPwd, newPwd) {
        this._modalLoadingSpinnerOverLay.show()
        let data = {'password': oldPwd, 'newPassword': newPwd, 'mode': 'SECURITY_PASSWORD'};

        RequestUtils.PostUrlAndParamsAndCallback(config.api.changePwd, data, (response) => {
            this._modalLoadingSpinnerOverLay.hide();
            if (response.rs) {
                RCTDeviceEventEmitter.emit('realNameChange', this.state.realName)
                Toast.showShortCenter("密码修改成功！");
                this.timer = setTimeout(()=> {
                    this.finsh();
                }, 1000)
            } else {
                if (response.status === 500) {
                    Toast.showShortCenter('服务器出错啦!')
                } else {
                    if (response.message) {
                        Toast.showShortCenter(response.message)
                    }
                }
            }
        })
    }

    finsh() {
        let {navigator} = this.props;
        if (navigator) {
            if (this.props.isFirst) {
                navigator.popToTop();
            } else {
                navigator.popN(2)
            }
        }
    }

    renderTip() {
        if (this.state.isClose) {
            return;
        } else {
            return (<View style={styles.tipViewStyle}>
                <Image source={require('image!warn')} style={styles.tipIconStyle}/>
                <Text style={styles.tipTextStyle}>交易密码会影响您的充值和提现，请谨慎填写！</Text>
                <View>
                    <TouchableOpacity onPress={()=>this.close()}>
                        <Image source={require('image!close')}
                               style={styles.closeIconStyle}/>
                    </TouchableOpacity></View>
            </View>);
        }
    }

    close() {
        let isClose = this.state.isClose;
        this.setState({
            isClose: !isClose
        });
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
    tipViewStyle: {
        flexDirection: Direction.row,
        backgroundColor: Color.bg.topTipBg,
        justifyContent: 'center',
        alignItems: 'center',
    }, tipTextStyle: {
        color: Color.text.red1,
        fontSize: Size.small,
        textAlign: 'center',
        padding: 10
    }, closeIconStyle: {
        width: 20,
        height: 20,
    }, tipIconStyle: {
        width: 25,
        height: 25,
    },
});
