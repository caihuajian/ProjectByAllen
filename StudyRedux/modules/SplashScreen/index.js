import React, { Component } from 'react';
import { AsyncStorage, NativeModules, Platform, View, StyleSheet, DeviceEventEmitter } from 'react-native';
import RNSplashScreen from 'rn-splash-screen';
import { Actions, Scene } from 'react-native-router-flux';
import { UI, Color } from 'consts';

class SplashScreen extends Component {
  componentDidMount = async () => {
    Actions.login();
  }

  render = () => {
      return null;
  }
}

const styles = StyleSheet.create({
});

export default (
  <Scene key="splashScreen" component={SplashScreen} initial hideNavBar />
);
