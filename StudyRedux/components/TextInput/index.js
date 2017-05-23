import React, { Component, PropTypes } from 'react';
import { TextInput as BaseTextInput, StyleSheet, View, Platform } from 'react-native';
import { UI, Color } from 'consts';
import _ from 'lodash';

export default class TextInput extends Component {
  static propTypes = {
    value: PropTypes.string,
    returnKeyType: PropTypes.string,
    keyboardType: PropTypes.string,
    maxLength: PropTypes.number,
    isLarge: PropTypes.bool,
    isMedium: PropTypes.bool,
    onChangeText: PropTypes.func,
    onPasteCountryCode: PropTypes.func,
    onBlur: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    contentFilter: PropTypes.func,
    containerStyle: View.propTypes.style,
    style: BaseTextInput.propTypes.style,
  }

  static defaultProps = {
    value: '',
    isLarge: false,
    isMedium: false,
    onChangeText: () => {},
    onPasteCountryCode: () => {},
    onSubmitEditing: () => {},
    contentFilter: () => { return false; },
  }

  static KeyboardType = {
    NUMERIC: 'numeric',
    PHONE_NUMBER: 'phone-number',
  }

  constructor(props) {
    super(props);

    this.state = {
      text: props.value || '',
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ text: nextProps.value });
  }

  focus = () => {
    return this.refs.textInput.focus();
  }

  blur = () => {
    this.refs.textInput.blur();
  }

  isFocused = () => {
    return this.refs.textInput.isFocused();
  }

  _isBlurOnSubmit = () => {
    return this.props.returnKeyType !== 'next';
  }

  _onBlur = () => {
    const text = this.state.text ? this.state.text.trim() : '';
    if (this.state.text) {
      this.setState({ text });
      this.props.onChangeText(text);
    }

    if (this.props.onBlur) {
      this.props.onBlur(text);
    }

    this.refs.textInput.setNativeProps({ text });
  }

  _keyboardType = () => {
    if (this.props.keyboardType === TextInput.KeyboardType.NUMERIC
      || this.props.keyboardType === TextInput.KeyboardType.PHONE_NUMBER) {
      return Platform.select({ android: 'numeric', ios: 'numbers-and-punctuation' });
    }

    return this.props.keyboardType;
  }

  _setText = (text) => {
    if (this._shouldIgnore) {
      return;
    }

    if (this.props.contentFilter(text)) {
      return;
    }

    this.setState({ text });
    this.props.onChangeText(text);
  }

  _setValueWithNumber = (number) => {
    const isNumericAll = /^[0-9]*$/;
    this._shouldIgnore = this._shouldIgnore || !isNumericAll.test(number);
    this._setText(number);
  }

  _analysisPastingPhone = (text) => {
    const intlPhoneNumberResolver = /^(?:(\+\d+)(\s|\())?(.*)$/;
    const resolve = intlPhoneNumberResolver.exec(text);
    const legalIdentifiers = /[^\d]/g;
    if (resolve) {
      const countryCode = resolve[1];
      const phoneNumber = `${resolve[2] || ''}${resolve[3] || ''}`;
      if (countryCode) {
        this.props.onPasteCountryCode(countryCode.replace(legalIdentifiers, ''));
      }

      this._shouldIgnore = false;
      return phoneNumber.replace(legalIdentifiers, '');
    }

    return '';
  }

  _onChangeText = (text) => {
    const hasLengthOverMax = this.props.maxLength && _.size(text) > this.props.maxLength;
    const hasLengthDecreased = _.size(this.state.text) > _.size(text);
    this._shouldIgnore = hasLengthOverMax && !hasLengthDecreased;

    switch (this.props.keyboardType) {
      case TextInput.KeyboardType.PHONE_NUMBER: {
        const phoneNumber = this.state.text ? text : this._analysisPastingPhone(text);
        this._setValueWithNumber(phoneNumber);
        break;
      }

      case TextInput.KeyboardType.NUMERIC:
        this._setValueWithNumber(text);
        break;

      default:
        this._setText(text);
        break;
    }
  }

  // 解决 android 不会自动 blur 的问题
  // https://github.com/facebook/react-native/issues/7047
  _onSubmitEditing = (event) => {
    if (this._isBlurOnSubmit()) {
      this.blur();
    }

    this.props.onSubmitEditing(event);
  }

  render = () => {
    return (
      // TextInput 在 Android 上不能直接设置圆角，必须用 View 处理
      <View style={[(this.props.isLarge || this.props.isMedium) && styles.container, this.props.containerStyle]}>
        <BaseTextInput
          ref="textInput"
          underlineColorAndroid="transparent"
          autoCorrect={false}
          autoCapitalize="none"
          blurOnSubmit={this._isBlurOnSubmit()}
          {...this.props}
          onSubmitEditing={this._onSubmitEditing}
          keyboardType={this._keyboardType()}
          onBlur={this._onBlur}
          onChangeText={this._onChangeText}
          style={[
            styles.base,
            this.props.isLarge && styles.large,
            this.props.isMedium && styles.middle,
            this.props.style,
          ]}
          maxLength={undefined}
          placeholderTextColor={Color.GREY_13}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    borderWidth: UI.PIXEL_SIZE,
    borderColor: Color.GREY_3,
    backgroundColor: Color.WHITE,
  },
  base: {
    alignSelf: 'stretch',
    // iOS 默认会有 padding，需要清除
    height: 48,
    // [issue] https://github.com/facebook/react-native/issues/3596
    // 没有从根本解决问题，设置paddingRight或paddingLeft都可以让中文在未充满时不向下移动
    // paddingRight或paddingLeft的最小值在直接用TextInput和在SearchBox组件中不同，不同设备不同
    paddingLeft: 0,
    paddingRight: 1,
    paddingBottom: 0,
    paddingTop: 0,
  },
  large: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  middle: {
    height: 36,
    paddingLeft: 16,
    paddingRight: 16,
  },
});
