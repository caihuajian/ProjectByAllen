import React, { Component } from 'react';
import { View, AsyncStorage, BackAndroid, Platform, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { Actions, Scene } from 'react-native-router-flux';
import { TabIcon, Loading, Prompt, TabBar } from 'components';
import { Color, UI } from 'consts';

import store from '../store';
import * as appActions from './state';
import Router from '../modules/Router';
import SplashScreen from '../modules/SplashScreen';
import Login from '../modules/Login';
import Summary from '../modules/Summary';
import Report from '../modules/Report';
import More from '../modules/More';

class StudyRedux extends Component {
  componentDidMount = () => {
    this._init();
  }

  _init = () => {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      Actions.pop();
      return true;
    });
  }

  render = () => {
    return (
      <Provider store={store}>
        <View
          style={styles.container}
        >
          <Router sceneStyle={styles.scene}>
            <Scene key="root">
              {SplashScreen}
              {Login}
              <Scene key="main" type="reset" tabs tabBarStyle={styles.tabBar} component={TabBar}>
                <Scene key="summary" title="summary" icon={TabIcon} hideNavBar>
                  {Summary}
                  {Report}
                </Scene>
                {More}
              </Scene>
            </Scene>
          </Router>
          <Prompt />
          <Loading />
        </View>
      </Provider>
    );
  }
}

export default StudyRedux;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    backgroundColor: Color.WHITE,
  },
  tabBar: {
    height: UI.TAB_BAR_HEIGHT,
    borderTopWidth: UI.PIXEL_SIZE,
    borderTopColor: Color.GREY_13,
  },
});
