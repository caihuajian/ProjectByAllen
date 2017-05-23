import React, { Component, PropTypes } from 'react';
import { Text, StyleSheet, Image, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Actions, Scene } from 'react-native-router-flux';
import { Color, UI } from 'consts';
import { Button } from 'components';

import * as actions from './state';
import { getLang } from '../../i18n';
import Config from '../../Config';

const defaultKeyboardTopPadding = 122;

@connect(
  (state) => {return { ...state.login, i18n: getLang() };}
  ,
  actions
)

class Login extends Component {
    static _isFirstMount = true
    static propTypes = {
    authData: PropTypes.object.isRequired,
    isSignInEnabled: PropTypes.bool,
    enableChainAccess: PropTypes.bool,
    keyboardTopPadding: PropTypes.number,
    setState: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    dispatch: PropTypes.func,
    i18n: PropTypes.func,
  }

  _onPressSignIn = () => {
    this.props.login(this.props.authData);
  }

  render = () => {
    return (
      <View style={styles.base}>
        <Text style={styles.loginText}>{this.props.i18n('login', 'login')}</Text>
        <Button
          style={styles.signIn}
          shouldStretch
          isEnabled={true}
          onPress={this._onPressSignIn}
          textStyle={styles.signInText}
        >
          {this.props.i18n('login', 'signIn')}
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    width: UI.SCREEN_WIDTH,
    height: UI.SCREEN_HEIGHT - UI.ANDROID_STATUS_HEIGHT,
    backgroundColor: 'rgb(74, 167, 230)',
    justifyContent: 'center',
    alignItems: 'center',
  },
   loginText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 23,
    marginBottom: 100,
  },
  signIn: {
    marginTop: 8,
    marginLeft: 37.5,
    marginRight: 37.5,
    height: 44,
  },
  signInText: {
    fontSize: 16,
  },
});

export default (
  <Scene key="login" type="reset" component={Login} hideNavBar />
);