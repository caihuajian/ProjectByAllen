import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Tabs from 'react-native-tabs';
import DefaultRenderer from 'react-native-router-flux/src/DefaultRenderer';
import Actions from 'react-native-router-flux/src/Actions';
import TabbedView from 'react-native-router-flux/src/TabbedView';
import { deepestExplicitValueForKey } from 'react-native-router-flux/src/Util';

import * as tabBarActions from './state';
import store from '../../store';

/**
 * 该文件是从 react-native-router-flux/src/TabBar.js 复制过来的，以实现 Guesbook tab 对 operator 不可见
 */

class TabBar extends Component {

  static propTypes = {
    shouldHide: PropTypes.bool,
    navigationState: PropTypes.object,
    tabIcon: PropTypes.any,
    user: PropTypes.object,
    onNavigate: PropTypes.func,
  };

  static show = () => {
    store.dispatch(tabBarActions.show());
  }

  static hide = () => {
    store.dispatch(tabBarActions.hide());
  }

  constructor(props, context) {
    super(props, context);
    this.renderScene = this.renderScene.bind(this);
  }

  onSelect(el) {
    if (!Actions[el.props.name]) {
      throw new Error(
        `No action is defined for name=${el.props.name} ` +
        `actions: ${JSON.stringify(Object.keys(Actions))}`);
    }
    if (typeof el.props.onPress === 'function') {
      el.props.onPress();
    } else {
      Actions[el.props.name]();
    }
  }

  renderScene(navigationState) {
    return (
      <DefaultRenderer
        key={navigationState.key}
        onNavigate={this.props.onNavigate}
        navigationState={navigationState}
      />
    );
  }

  render() {
    const state = this.props.navigationState;

    const hideTabBar = deepestExplicitValueForKey(state, 'hideTabBar') || this.props.shouldHide;

    return (
      <View
        style={{ flex: 1 }}
      >
        <TabbedView
          navigationState={this.props.navigationState}
          style={{ flex: 1 }}
          renderScene={this.renderScene}
        />
        {!hideTabBar && state.children.filter(el => el.icon).length > 0 &&
          <Tabs
            style={state.tabBarStyle}
            selectedIconStyle={state.tabBarSelectedItemStyle}
            onSelect={this.onSelect} {...state}
            selected={state.children[state.index].sceneKey}
          >
            {state.children.filter(el => el.icon || this.props.tabIcon).map(el => {
              const operatorNotAllowedKeys = ['guestBook'];
              const isUserOperator = this.props.user && this.props.user.isOperator();
              if (operatorNotAllowedKeys.includes(el.sceneKey) && isUserOperator) {
                return null;
              }

              const Icon = el.icon || this.props.tabIcon;
              return <Icon {...this.props} {...el} />;
            })}
          </Tabs>
        }
      </View>
    );
  }

}

export default TabBar;
