import React, { Component, PropTypes } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Color } from 'consts';

import store from '../../store';
import * as loadingActions from './state';
@connect(
  (state) => state.loading
)
export default class Loading extends Component {
  static _callbacks = [];

  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
  }

  static show = (callback) => {
    if (callback) {
      Loading._callbacks.push(callback);
    }

    store.dispatch(loadingActions.show());
    setTimeout(Loading._runCallback, 100);
  }

  static hide = () => {
    store.dispatch(loadingActions.hide());
  }

  static _runCallback = () => {
    const callbacks = [...Loading._callbacks];
    Loading._callbacks = [];
    for (const callback of callbacks) {
      callback();
    }
  }

  render = () => {
    if (!this.props.isVisible) {
      return null;
    }

    return (
      <View style={styles.overlay}>
        <View style={styles.indicatorContainer}>
          <ActivityIndicator style={styles.indicator} animating />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  indicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Color.BLACK,
  },
  indicator: {
    padding: 20,
    transform: [{ scale: 1.4 }],
  },
});
