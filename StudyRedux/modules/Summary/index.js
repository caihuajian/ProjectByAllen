import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions, Scene } from 'react-native-router-flux';
import { AddOrderButton, ScenePadding, RestaurantSelector } from 'components';
import { UI, Color } from 'consts';
import moment from 'moment';

import { SummaryNoBusiness, SummaryOnBusiness } from './components';
import { getLang } from '../../i18n';
import * as actions from './state';

@connect(
  (state) => { return { ...state.summary, i18n: getLang() }; }
,
  actions
)
class Summary extends Component {
  static propTypes = {
    isOnBusiness: PropTypes.bool,
    updatedAt: PropTypes.string,
    turns: PropTypes.array,
    reservedOrders: PropTypes.number,
    repeatGuests: PropTypes.number,
    rank: PropTypes.number,
    maxReservedOrdersThisWeek: PropTypes.number,
    minReservedOrdersThisWeek: PropTypes.number,
    notificationUnreadCount: PropTypes.number,
    notificationNewUnreadCount: PropTypes.number,
    reservedGuests: PropTypes.number,
    walkInOrders: PropTypes.number,
    fetchSummary: PropTypes.func,
    setState: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    i18n: PropTypes.func,
    updateSummaryData: PropTypes.func,
  }

  componentDidMount = () => {

  }

  componentWillUnmount = () => {

  }

  render = () => {
    return (
      <View style={styles.container}>
        <Text>
            {this.props.i18n('summary', 'summary')}
        </Text>
        <TouchableWithoutFeedback onPress={() => { Actions.report(); }}>
          <View style={styles.analytics}>
            <Text style={styles.analyticsText}>
              {this.props.i18n('summary', 'analytics')}
            </Text>
            <Image source={require('./images/arrow_next_1.png')} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: UI.TAB_BAR_HEIGHT,
  },
  analytics: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 21,
    paddingBottom: 36,
  },
  analyticsText: {
    marginRight: 10,
    fontSize: 15,
    color: Color.GREY_5,
  },
});

export default(
  <Scene
    key="summary_1"
    type="reset"
    component={Summary}
    hideNavBar
  />
);
