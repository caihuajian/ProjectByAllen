import React, { Component, PropTypes } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Color } from 'consts';
import { getLang } from '../../i18n';

const icons = {
  summary: {
    image: require('./images/nav_1_inactive.png'),
    selectedImage: require('./images/nav_1_active.png'),
  },
  operations: {
    image: require('./images/nav_2_inactive.png'),
    selectedImage: require('./images/nav_2_active.png'),
  },
  guestBook: {
    image: require('./images/nav_3_inactive.png'),
    selectedImage: require('./images/nav_3_active.png'),
  },
  notification: {
    image: require('./images/nav_4_inactive.png'),
    selectedImage: require('./images/nav_4_active.png'),
    hasUnreadImage: require('./images/nav_4_new_inactive.png'),
    hasUnreadSelectedImage: require('./images/nav_4_new_active.png'),
  },
  more: {
    image: require('./images/nav_6_inactive.png'),
    selectedImage: require('./images/nav_6_active.png'),
  },
};

@connect(
  (state) => { return { notification: state.notification, i18n: getLang() }; }
)

export default class TabIcon extends Component {
  static propTypes = {
    selected: PropTypes.bool,
    title: PropTypes.string.isRequired,
    notification: PropTypes.object,
    i18n: PropTypes.func.isRequired,
  }

  _getIconByTitle = () => {
    const icon = icons[this.props.title];
    if (this.props.title === 'notification' &&
        !this.props.notification.hasRead) {
      return this.props.selected ? icon.hasUnreadSelectedImage : icon.hasUnreadImage;
    }

    return this.props.selected ? icon.selectedImage : icon.image;
  }

  _getImageKey = () => {
    if (this.props.notification) {
      return `${this.props.title}${this.props.notification.hasRead}${this.props.selected}`;
    }

    return `${this.props.title}${this.props.selected}`;
  }

  render = () => {
    return (
      <View>
        <Image key={this._getImageKey()} style={styles.icon} source={this._getIconByTitle()} />
        <Text style={[styles.textBase, this.props.selected && styles.textSelected]}>
          {this.props.i18n('tabIcon', this.props.title)}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
  },
  textBase: {
    alignSelf: 'center',
    marginTop: 1,
    color: Color.GREY_8,
    fontSize: 10,
  },
  textSelected: {
    color: Color.GREEN_1,
  },
});
