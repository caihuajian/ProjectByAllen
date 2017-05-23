import React, {Component} from 'react';
import {
    StyleSheet,
    TextInput,
    Text,
    View,
    TouchableHighlight,
    ActivityIndicator,
} from 'react-native';

import {connect} from 'react-redux';//将我们的页面和action链接起来
import {bindActionCreators} from 'redux';//将要绑定的actions和dispatch绑定到一起
import * as actionCreators from '../actions/login';//导入需要绑定的actions
import Modal from 'react-native-modalbox';
import Home from './home';


/**
 登陆页面
 **/
class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {}

        // this.login = this.login.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangePswd = this.onChangePswd.bind(this);
    }

    onChangePhone(text) {
        this.setState({'phone': text,});
    }

    onChangePswd(text) {
        this.setState({'password': text,});
    }

    login() {
        if (!this.state.phone || !this.state.password) {
            alert('用户名或密码不能为空！');
        } else {
            const {dispatch} = this.props;
            this.refs.modal.open();//loading 状态
            dispatch(actionCreators.login({'phone': this.state.phone, 'password': this.state.password}))
            // this.props.login({'phone': this.state.phone, 'password': this.state.password});//dispath 登陆
        }
    }

    //该方法首次不会执行，如果返回false，则reduer不会执行，，
    // shouldComponentUpdate(nextProps, nextState) {
    //     const {isLoggedIn, navigator}=nextProps;
    //     console.log('isLoggedIn' + isLoggedIn)
    //     if (isLoggedIn) {
    //         this.setState({phone: '', password: ''});
    //         navigator.push({
    //             component: Home,
    //             name: 'Home',
    //         });
    //     }
    //     return true;
    // }

    componentDidUpdate() {
        const {isLoggedIn}=this.props;
        console.log('isLoggedIn' + isLoggedIn)
    }

    render() {
        console.log('render..this.props.status.' + this.props.status)
        return (
            <View style={{flex:1}}>
                <View style={{padding:20,marginTop:50}}>
                    <View style={styles.item}>
                        <Text style={{width:70}}>手机号码</Text>
                        <TextInput
                            onChangeText={this.onChangePhone}
                            placeholder={'请输入手机号码'}
                            style={styles.input}
                            defaultValue={this.state.phone}/>
                    </View>
                    <View style={styles.item}>
                        <Text style={{width:70}}>密码</Text>
                        <TextInput onChangeText={this.onChangePswd}
                                   secureTextEntry={true}
                                   placeholder={'请输入密码'}
                                   style={styles.input}
                                   defaultValue={this.state.password}>
                        </TextInput>
                    </View>

                    <TouchableHighlight onPress={()=>this.login()} style={styles.button} underlaycolor={'#000000'}>
                        <Text style={{fontSize:16,color:'#fff'}}>登陆</Text>
                    </TouchableHighlight>
                </View>

                <Modal animationDuration={0}
                       isOpen={this.props.isLoggedIn?true:false}
                       position={'center'}
                       ref='modal'
                       style={styles.modal}>
                    <Text style={{marginTop:15,fontSize:16,color:'#444444'}}>登录成功!</Text>
                </Modal>
                <Modal animationDuration={0}
                       isOpen={this.props.status=='doing'?true:false}
                       position={'center'}
                       ref='modal'
                       style={styles.modal}>
                    <Text style={{marginTop:15,fontSize:16,color:'#444444'}}>登陆中...</Text>
                    <ActivityIndicator/>
                </Modal>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    input: {
        fontSize: 14,
        width: 200
    },
    button: {
        backgroundColor: '#1a191f',
        height: 50,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 150,
        borderRadius: 10,
    },
});

//根据全局state返回当前页面所需要的信息,（注意以props的形式传递给Login）
function mapStateToProps(state) {
let {loginReducer} = state
    return {
        isLoggedIn: loginReducer.isLoggedIn,
        status: loginReducer.status,
    };
}
//返回可以操作store.state的actions,(其实就是我们可以通过actions来调用我们绑定好的一系列方法)
// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators(actionCreators, dispatch)
//     };
// }

//链接起来
export default connect(mapStateToProps)(Login);