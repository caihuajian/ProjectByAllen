/**
 * Created by Sam on 2016/11/16.
 */


import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    Dimensions,
    RefreshControl,
    InteractionManager,
    WebView
} from 'react-native';
import TopNavigationBar from '../../Common/View/TCNavigationBarSelectorStyle'
import Toast from '@remobile/react-native-toast'
import  PopView from '../../Common/View/TCSelectModal'
import Moment from 'moment'
var {width, height} = Dimensions.get('window');
import _ from 'lodash';
const lotteryType = ['HF_LFSSC', 'HF_CQSSC', 'HF_XJSSC', 'HF_TJSSC', 'X3D']
const lotteryName = ['二分时时彩', '重庆时时彩', '新疆时时彩', '天津时时彩', '福彩3D']
import  RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import LoadingSpinnerOverlay from 'react-native-smart-loading-spinner-overlay'
export default class TCTrend extends Component {

    constructor(state) {
        super(state)
        this.type = ''
        this.baseUrl = 'http://trend.106cp1.com/trend?navigationBar=0&gameUniqueId='
        this.state = {
            lotteryType: null,
            title: lotteryName[0],
            url: this.baseUrl + lotteryType[0]
        }
    }

    static defaultProps = {
        title: '',
        type: '',
    };

    componentDidMount() {
        this._modalLoadingSpinnerOverLay.show()
    }

    componentWillUnmount() {
        this._modalLoadingSpinnerOverLay && this._modalLoadingSpinnerOverLay.hide()
    }

    render() {

        return (
            <View style={styles.container}>
                <TopNavigationBar
                    ref='TopNavigationBar'
                    title={this.state.title}
                    needBackButton={false}
                    centerButtonCall={()=> {
                        this.showPopView()
                    }}

                    backButtonCall={()=> {
                        RCTDeviceEventEmitter.emit('balanceChange')
                        this.props.navigator.pop()
                    }}
                    rightTitle={'刷新'}
                    rightButtonCall={()=> {
                        this.refresh()
                    }
                    }
                />

                <PopView
                    ref='TCSelectPopupView'
                    SelectorTitleArr={this.initialMessageType()}
                    selectedFunc={(index) => {
                        this.selectMsgType(index)
                    }}
                    selectedIndex={0}
                />
                <WebView
                    automaticallyAdjustContentInsets={true}
                    style={styles.webView}
                    source={{uri: this.state.url}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true}
                    scalesPageToFit={false}
                    onNavigationStateChange={this.onNavigationStateChange}
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                    onLoadEnd={()=>this.onLoadEnd()}
                />
                <LoadingSpinnerOverlay
                    ref={ component => this._modalLoadingSpinnerOverLay = component }/>

            </View>
        );
    }


    initialMessageType() {
        return lotteryName
    }


    refresh() {
        this.setState({
            url: this.state.url+'&temp='+Moment().format('X')
        })
        this._modalLoadingSpinnerOverLay && this._modalLoadingSpinnerOverLay.show()
    }

    selectMsgType(index) {
        var popView = this.refs.TCSelectPopupView
        popView._setModalSelectedIndex(index, 0);
        let navBar = this.refs.TopNavigationBar
        navBar.setTitle(this.initialMessageType()[index])
        this.setState({
            url: this.baseUrl + lotteryType[index]
        })
        this._modalLoadingSpinnerOverLay && this._modalLoadingSpinnerOverLay.show()
    }

    onShouldStartLoadWithRequest = (event) => {
        return true;
    };

    onLoadEnd() {
        this._modalLoadingSpinnerOverLay && this._modalLoadingSpinnerOverLay.hide()
    }

    onNavigationStateChange = (navState) => {
        JXLog(navState)
        this.setState({
            backButtonEnabled: navState.canGoBack,
            title: navState.title,
            scalesPageToFit: true
        });
    };

    backButtonCall() {
        if (this.state.backButtonEnabled) {
            this.refs['topNavigation']._showCloseButton(true)
        } else {
            this.props.navigator.pop()
        }
    }

    showPopView() {
        var popView = this.refs.TCSelectPopupView
        if (popView.state.modalVisible) {
            popView._setModalVisible(false);
        } else {
            popView._setModalVisible(true);
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    webView: {
        marginTop: 0,
        width: width
    }
});

