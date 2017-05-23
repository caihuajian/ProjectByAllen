import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Actions, Scene } from 'react-native-router-flux';
import { UI, Color } from 'consts';

import { ReportItem } from './components';
import * as actions from './state';
import { getLang } from '../../i18n';

@connect(
  (state) => {
    return {
      ...state.report,
      i18n: getLang(),
      currentScheduleDate: state.app.currentScheduleDate,
    };
  },
  actions
)
class Report extends Component {
  static propTypes = {
    mode: PropTypes.string,
    updatedAt: PropTypes.string,
    totalOrders: PropTypes.number,
    reservedOrders: PropTypes.number,
    reservedGuests: PropTypes.number,
    walkInOrders: PropTypes.number,
    walkInGuests: PropTypes.number,
    totalGuests: PropTypes.number,
    vipGuests: PropTypes.number,
    regularGuests: PropTypes.number,
    repeatGuests: PropTypes.number,
    isOnBusiness: PropTypes.bool,
    needInitCalendar: PropTypes.bool,
    shifts: PropTypes.array,
    days: PropTypes.array,
    setState: PropTypes.func,
    clearState: PropTypes.func,
    fetchDailyReport: PropTypes.func,
    fetchWeeklyReport: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
  }

  static defaultProps = {
    setState: () => {},
    clearState: () => {},
    fetchDailyReport: () => {},
    fetchWeeklyReport: () => {},
  }

  componentDidMount = () => {

  }

  componentWillUnmount = () => {
    this.props.clearState();
  }

  render = () => {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          hitSlop={{ top: 20, bottom: 20, left: 0, right: 0 }}
          onPress={ ()=>{Actions.pop();}}
        >
          <View style={styles.backContainer}>
            <Text style={styles.backText}>
              {this.props.i18n('report', 'back')}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <Text>{this.props.i18n('report', 'report')}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: UI.TAB_BAR_HEIGHT,
  },
  backContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 21,
    paddingBottom: 36,
  },
  backText: {
    marginRight: 10,
    fontSize: 15,
    color: Color.GREY_5,
  },
});

export default(
  <Scene
    key="report"
    component={Report}
    hideNavBar
  />
);
