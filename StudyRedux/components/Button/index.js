
import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

import { Color } from 'consts';
export default class Button extends Component {
  static propTypes = {
    children: PropTypes.any,
    shouldStretch: PropTypes.bool,
    isBare: PropTypes.bool,
    isEnabled: PropTypes.bool,
    onPress: PropTypes.func,
    style: View.propTypes.style,
    disabledButtonStyle: View.propTypes.style,
    textStyle: Text.propTypes.style,
    textDisableStyle: Text.propTypes.style,
  }

  static defaultProps = {
    shouldStretch: true,
    isBare: false,
    isEnabled: true,
  }

  render = () => {
    return (
      <TouchableOpacity
        {...this.props}
        style={[
          styles.buttonBase,
          this.props.shouldStretch && styles.buttonStretch,
          this.props.isBare && styles.buttonBare,
          this.props.style,
          !this.props.isEnabled && !this.props.isBare && styles.buttonDisable,
          !this.props.isEnabled && this.props.disabledButtonStyle,
        ]}
        disabled={!this.props.isEnabled}
        onPress={this.props.onPress}
      >
        {
          typeof this.props.children === 'string' ? (
            <Text
              style={[
                styles.textBase,
                this.props.isBare && styles.textBare,
                this.props.textStyle,
                this.props.isBare && !this.props.isEnabled && styles.textBareAndDisable,
                this.props.isBare && !this.props.isEnabled && this.props.textDisableStyle,
              ]}
            >
              {this.props.children}
            </Text>
          ) : this.props.children
        }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonBase: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 48,
    borderRadius: 6,
    backgroundColor: Color.ORANGE_1,
  },
  buttonStretch: {
    alignSelf: 'stretch',
  },
  buttonBare: {
    backgroundColor: undefined,
  },
  textBase: {
    fontSize: 17,
    color: Color.WHITE,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBare: {
    color: Color.GREEN_1,
  },
  buttonDisable: {
    backgroundColor: Color.GREY_13,
  },
  textBareAndDisable: {
    color: Color.GREY_13,
  },
});
