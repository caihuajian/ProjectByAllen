/**
 * Created by Sam on 2016/11/14.
 */



/*

 ** use for import **
 import TopNavigationBar from '../../Common/View/TCNavigationBar'

 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    Image,
    Button,
    TouchableOpacity,
} from 'react-native';
import SoundHelper from '../JXHelper/SoundHelper'


var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');

export default class TCBetBar extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            showBackButton: (this.props.needBackButton),
            title: this.props.title,
        };
    }

    static defaultProps = {
        title: '',
        needBackButton: true,
        backButtonCall: null,
        centerButtonCall: null,
        rightButtonCall:null,
        rightTitle: '',
    }

    componentDidMount() {

    }

    render() {
        return (
            <Image style={styles.navBarStyle} source={{uri:'top_bg_640'}} resizeMode={'cover'}>
                {/*左边*/}
                {this.renderGetBackButton()}
                {/*中间*/}
                <TouchableOpacity onPress={this.centerButtonCall} style={{
                    borderRadius: 3,
                    borderWidth: 0.8,
                    borderColor: 'white',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: Platform.OS == 'ios' ? 20 : 0,
                    padding: 5
                }}>
                    <Text style={styles.titleStyle}>{this.state.title}</Text>
                    <Image source={require('image!top_bar_arrow')} style={styles.arrowImgStyle}/>
                </TouchableOpacity>

                {this.renderGetRightButton()}
            </Image>
        );
    }

    renderGetBackButton() {

        if (this.state.showBackButton == true) {
            return (
                <TouchableOpacity
                    onPress={this.backButtonCall.bind(this)}
                    underlayColor='#DEDEDE'
                    style={styles.leftViewStyle}
                >
                    <View  >
                        <Image source={require('image!top_bar_back')} style={styles.navLeftImgStyle}/>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    renderGetRightButton() {
        if (this.props.rightTitle) {
            return (
                <TouchableOpacity
                    onPress={()=> {
                        this.rightButtonCall()
                    }}
                    underlayColor='#DEDEDE'
                    style={styles.rightViewStyle}
                >
                    <View>
                        <Text style={styles.rightTitleStyle}>{this.props.rightTitle}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    backButtonCall() {
        if (this.props.backButtonCall == null) return;

        if (TC_BUTTON_SOUND_STATUS) {
            SoundHelper.playSoundBundle();
        }

        this.props.backButtonCall();
    }

    rightButtonCall() {
        if (this.props.rightButtonCall == null) return;
        this.props.rightButtonCall();
    }

    centerButtonCall = () => {
        if (this.props.centerButtonCall == null) return;
        this.props.centerButtonCall();
    };

    setTitle(playMathName) {
        this.setState({
            title: playMathName
        })
    }
}


const styles = StyleSheet.create({
    navLeftImgStyle: {
        width: 45,
        height: 45,
        marginTop: Platform.OS == 'ios' ? 20 : 0,

    },
    arrowImgStyle: {
        width: Platform.OS === 'ios' ?12:14.5,
        height: Platform.OS === 'ios' ?7:9,
        marginLeft: 5,
        marginRight: 5
    },
    navBarStyle: {
        //导航条样式
        flexDirection: 'row',
        height: Platform.OS == 'ios' ? 64 : 44,
        // backgroundColor: '#d91d37',
        //垂
        alignItems: 'center',
        //设置主轴对齐方式
        justifyContent: 'center',
        backgroundColor:'transparent'
    },
    titleStyle: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        alignItems: 'center',
        paddingLeft: 10,
        backgroundColor:'transparent'
    },
    leftViewStyle: {
        position: 'absolute',
        left: 0,
    },
    rightViewStyle: {
        marginTop: Platform.OS == 'ios' ? 25 : 5,
        position: 'absolute',
        right: 5,
    },
    rightTitleStyle: {
        marginTop: 10,
        fontSize: 15,
        color: 'white',

    }
});