/**
 * Created by Sam on 2016/11/11.
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
    TouchableOpacity
} from 'react-native';
import SoundHelper from '../../Common/JXHelper/SoundHelper'

var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');
import _ from 'lodash';
import {NavigatorBarTitle} from '../../Page/resouce/appColorsConfig'
var  BackImage = require('../../Page/resouce/top_bar_back.png')

export default class TCNavigationBar extends React.Component {
    constructor(state) {
        super(state);
        this.state = {
            showBackButton: (this.props.needBackButton),
            showCloseButton: false
        };
    }

    static defaultProps = {
        title: '',
        needBackButton: true,
        rightTitle: '',
        rightImage: null,
        leftTitle: null,
        leftImage: null,
        rightButtonCall: null,
        closeButtonCall: null
    }

    componentDidMount() {

    }

    render() {
        return (
            <Image style={styles.navBarStyle} source={{uri: 'top_bg_640'}} resizeMode={'cover'}>
                {/*左边*/}
                {this.renderGetBackButton()}
                {/*中间*/}
                <TouchableOpacity disabled={this.props.midCall ? false : true} onPress={()=>this.props.midCall()}>
                    <View style={{width: width - 180, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.titleStyle} ellipsizeMode='tail' numberOfLines={1}> {this.props.title} </Text>
                    </View>
                </TouchableOpacity>
                {this.renderGetRightButton()}
                {/*<View style={styles.rightViewStyle}>*/}
                {/*</View>*/}
            </Image>
        );
    }

    renderGetBackButton() {

        if (this.state.showCloseButton) {
            return (
                <View style={{flexDirection: 'row', position: 'absolute', left: -5}}>
                    <TouchableOpacity
                        onPress={()=>this.backButtonCall()}
                        underlayColor='#DEDEDE'
                        style={styles.leftImageViewStyle}
                    >
                        <Image source={BackImage} style={styles.navLeftImgStyle}/>
                    </TouchableOpacity>

                    {/*<TouchableOpacity*/}
                    {/*onPress={()=> {this.closeButtonCall()}}*/}
                    {/*underlayColor='#DEDEDE'*/}
                    {/*style={{marginLeft: 5, backgroundColor: 'transparent'}}*/}
                    {/*>*/}
                    {/*<Text style={styles.leftTitleStyle}>关闭</Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>
            )
        }

        if (this.props.needBackButton == true) {
            return (
                <TouchableOpacity
                    onPress={this.backButtonCall}
                    underlayColor='#DEDEDE'
                    style={styles.leftImageViewStyle}
                >
                    {this.getBackImage()}
                </TouchableOpacity>
            )
        }

        if (this.props.leftTitle) {
            return <TouchableOpacity
                onPress={()=> {
                    this.backButtonCall()
                }}
                underlayColor='#DEDEDE'
                style={styles.leftViewStyle}
            >
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.leftTitleStyle}>{this.props.leftTitle}</Text>
                </View>
            </TouchableOpacity>
        }
    }

    getBackImage() {
        if (_.startsWith(this.props.leftImage, 'index_personal')) {
            return <Image source={require('../../Page/resouce/index_personal.png')} style={styles.navLeftImgStyle}/>
        } else if (this.props.leftImage) {
            return <Image source={{uri: this.props.leftImage}} style={styles.navLeftImgStyle}/>
        } else {
            return <Image source={BackImage} style={styles.navLeftImgStyle}/>
        }
    }

    backButtonCall = () => {
        if (this.props.backButtonCall == null) return;

        if (TC_BUTTON_SOUND_STATUS) {
            SoundHelper.playSoundBundle();
        }

        this.props.backButtonCall();
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
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text
                            style={this.props.rightTitle.length === 2 ? styles.rightBoldTitleStyle : styles.rightTitleStyle}>{this.props.rightTitle}</Text>
                    </View>
                </TouchableOpacity>
            )
        } else if (this.props.rightImage) {
            return (<TouchableOpacity
                onPress={()=> {
                    this.rightButtonCall()
                }}
                underlayColor='#DEDEDE'
                style={styles.rightViewStyle}
            >
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={{uri: this.props.rightImage}} style={styles.navRightImgStyle}/>
                </View>
            </TouchableOpacity>)
        }
    }

    closeButtonCall() {
        if (this.props.closeButtonCall == null) return;
        this.props.closeButtonCall();
    }

    rightButtonCall() {
        if (this.props.rightButtonCall == null) return;

        if (TC_BUTTON_SOUND_STATUS) {
            SoundHelper.playSoundBundle();
        }

        this.props.rightButtonCall();
    }

    _showCloseButton(show) {
        this.setState({showCloseButton: show})
    }
}

const styles = StyleSheet.create({
    navLeftImgStyle: {
        width: 45,
        height: 45,
        marginTop: Platform.OS == 'ios' ? 20 : 0,
    },
    navRightImgStyle: {
        width: 60,
        height: 60,
        marginTop: Platform.OS == 'ios' ? 20 : 0,
    },
    navBarStyle: {
        //导航条样式
        flexDirection: 'row',
        height: Platform.OS == 'ios' ? 64 : 44,
        // backgroundColor: '#d91d37',
        //垂
        alignItems: 'center',
        //设置主轴对齐方式
        justifyContent: 'center'
    },
    titleStyle: {
        marginTop: Platform.OS == 'ios' ? 20 : 0,
        fontSize: 20,
        color: NavigatorBarTitle.titleColor,
        fontWeight: 'bold',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    leftImageViewStyle: {
        position: 'absolute',
        left: 0,
        width: 100,
    },
    leftViewStyle: {
        position: 'absolute',
        left: 0,
        backgroundColor: 'transparent',
        width: 60,
        height: Platform.OS == 'ios' ? 64 : 44,
    },
    closeViewStyle: {
        backgroundColor: 'transparent'
    },
    rightViewStyle: {
        position: 'absolute',
        right: 0,
        backgroundColor: 'transparent',
        width: 80,
        height: Platform.OS == 'ios' ? 64 : 44,
    },
    rightTitleStyle: {
        fontSize: 16,
        color: 'white',
        alignItems: 'center',
        marginTop: Platform.OS == 'ios' ? 35 : 10,
    },
    leftTitleStyle: {
        fontSize: 18,
        color: 'white',
        alignItems: 'center',
        marginTop: Platform.OS == 'ios' ? 35 : 10,
        fontWeight: 'bold'
    }, rightBoldTitleStyle: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        alignItems: 'center',
        marginTop: Platform.OS == 'ios' ? 35 : 10,
    },
});