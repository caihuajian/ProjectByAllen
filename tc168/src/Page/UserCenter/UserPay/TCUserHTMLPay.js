/**
 * Created by Allen on 2017/1/17.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native'
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
var WEBVIEW_REF = 'webview'
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
export default class TCUserHTMLPay extends React.Component {
    constructor(state) {
        super(state)
        this.state = {}
    }

    static defaultProps = {};

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar title={this.state.title}
                                  ref="topNavigation"
                                  backButtonCall={()=> {this.backButtonCall()}}
                                  closeButtonCall={()=>{this.closeButtonCall()}}
                />
                <WebView
                    ref={WEBVIEW_REF}
                    automaticallyAdjustContentInsets={true}
                    style={styles.webView}
                    source={{html: this.props.html}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true}
                    scalesPageToFit={this.state.scalesPageToFit}
                    onNavigationStateChange={this.onNavigationStateChange}
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                />
            </View>

        );
    }

    onShouldStartLoadWithRequest = (event) => {
        return true;
    };

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
            this.refs[WEBVIEW_REF].goBack()
        } else {
            this.props.navigator.pop()
        }
    }

    closeButtonCall() {
        this.props.navigator.pop()
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
    }, webStyle: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
    }
});