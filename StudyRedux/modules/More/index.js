import React, { Component, PropTypes } from 'react';
import { TabIcon } from 'components';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions, Scene } from 'react-native-router-flux';
import { UI, Color } from 'consts';

import { SettingItem } from './components';
import * as actions from './state';
import { getLang } from '../../i18n';
import Config from '../../Config';

@connect(
  (state) => { return { ...state.more, i18n: getLang() }; }
,
  actions
)
class More extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    setState: PropTypes.func,
  }

  render = () => {
    return (
      <View style={styles.container}>
        <Text>{this.props.i18n('more', 'more')}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default (
  <Scene
    key="more"
    title="more"
    icon={TabIcon}
    component={More}
    hideNavBar
  />
);
