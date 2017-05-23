import React, { Component, PropTypes } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Color, UI } from 'consts';
import moment from 'moment';

const WeekDay = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

export default class ReportItem extends Component {
  static propTypes = {
    currentDate: PropTypes.instanceOf(moment),
    reportItem: PropTypes.shape({
      name: PropTypes.string,
      weekday: PropTypes.string,
      totalOrders: PropTypes.number,
      reservedOrders: PropTypes.number,
      walkInOrders: PropTypes.number,
      totalGuests: PropTypes.number,
      reservedGuests: PropTypes.number,
      walkInGuests: PropTypes.number,
      vipGuests: PropTypes.number,
      regularGuests: PropTypes.number,
      repeatGuests: PropTypes.number,
    }),
  }

  static defaultProps = {
    reportItem: {
      name: null,
      weekday: null,
      totalOrders: 0,
      reservedOrders: 0,
      walkInOrders: 0,
      totalGuests: 0,
      reservedGuests: 0,
      walkInGuests: 0,
      vipGuests: 0,
      regularGuests: 0,
      repeatGuests: 0,
    },
  }

  state = {
    isOnBusiness: true,
  }

  componentDidMount = () => {

  }

  render = () => {
    return (
      <View>
        <Text>ReportItem</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    paddingTop: 10.5,
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 8,
    backgroundColor: 'rgba(100, 189, 168, 0.1)',
  },
  title: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  titleText: {
    flex: 1,
    fontSize: 14,
    fontWeight: UI.FontWeight.MEDIUM,
    color: Color.GREY_4,
  },
  parties: {
    fontSize: 14,
    fontWeight: UI.FontWeight.MEDIUM,
    color: Color.GREY_4,
  },
  separator: {
    backgroundColor: Color.GREY_25,
  },
  reservedContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 9.5,
  },
  ordersTitle: {
    flex: 1,
  },
  ordersTitleText: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: UI.FontWeight.MEDIUM,
    color: Color.GREY_24,
  },
  orders: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: UI.FontWeight.MEDIUM,
    color: Color.GREEN_1,
  },
  columnSeparator: {
    flexDirection: 'column',
    width: UI.PIXEL_SIZE,
    height: null,
    backgroundColor: Color.GREY_25,
  },
  guestContainer: {
    alignItems: 'center',
  },
  guest: {
    flexDirection: 'row',
  },
  guestImage: {
    alignSelf: 'center',
  },
  guestsNumber: {
    fontSize: 12.5,
    color: Color.GREY_5,
  },
  guestTypeContainer: {
    flex: 1,
    marginTop: 8.5,
    flexDirection: 'row',
  },
  guestType: {
    flex: 1,
    alignItems: 'center',
  },
  guestTypeText: {
    marginBottom: 4,
    fontSize: 12,
    color: Color.GREY_8,
  },
  offBusinessContainer: {
    flex: 1,
    marginTop: 16,
    paddingTop: 10.5,
    paddingRight: 16,
    paddingLeft: 16,
    backgroundColor: 'rgba(187, 187, 187, 0.1)',
  },
  offBusinessImage: {
    alignSelf: 'center',
    marginTop: 22.5,
  },
  offBusinessText: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
    fontSize: 16,
    color: Color.GREY_11,
  },
});
