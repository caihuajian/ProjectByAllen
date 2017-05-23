import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Color } from 'consts';

export default class SettingItem extends Component {
  static ImageGravity = {
    LEFT: 0,
    RIGHT: 1,
  }

  static propTypes = {
    text: PropTypes.string,
    image: PropTypes.number,
    imageGravity: PropTypes.number,
    onPress: PropTypes.func,
    itemStyle: View.propTypes.style,
    textStyle: Text.propTypes.style,
  }

  static defaultProps = {
    imageGravity: 1,
    onPress: () => {},
  }

  render = () => {
    return (
      <TouchableWithoutFeedback
        {...this.props}
        hitSlop={{ top: 0, bottom: 0, left: 15, right: 15 }}
        onPress={this.props.onPress}
      >
        <View style={[styles.button, this.props.itemStyle]}>
          {
            this.props.imageGravity === SettingItem.ImageGravity.LEFT &&
              <Image source={this.props.image} />
          }
          <Text style={[styles.buttonText, this.props.textStyle]}>
            {this.props.text}
          </Text>
          {
            this.props.imageGravity === SettingItem.ImageGravity.RIGHT &&
              <Image source={this.props.image} />
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
  },
  buttonText: {
    flex: 1,
    fontSize: 17,
    color: Color.BLACK_1,
  },
});

