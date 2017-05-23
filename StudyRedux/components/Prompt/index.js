import React, { Component, PropTypes } from 'react';
import { Text, TouchableWithoutFeedback, View, StyleSheet, Modal } from 'react-native';
import { Color, UI } from 'consts';
import { connect } from 'react-redux';

import * as promptActions from './state';
import TextInput from '../TextInput';
import Loading from '../Loading';
import store from '../../store';

@connect(
  (state) => state.prompt
)
export default class Prompt extends Component {
  static propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    isInput: PropTypes.bool,
    autoFocus: PropTypes.bool,
    autoHideWhenHideAllModals: PropTypes.bool,
    isCancelOnRight: PropTypes.bool,
    isCancelVisible: PropTypes.bool,
    isVisible: PropTypes.bool,
    text: PropTypes.string,
    maxLength: PropTypes.number,
    alertLength: PropTypes.number,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    cancelText: PropTypes.string,
    submitText: PropTypes.string,
    data: PropTypes.any,
    hasDefaultOverlay: PropTypes.bool,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    onChangeText: PropTypes.func,
    i18n: PropTypes.func,
    renderMessage: PropTypes.func,
    renderFooter: PropTypes.func,
    contentFilter: PropTypes.func,
    onPressOverlay: PropTypes.func,
    titleContainerStyle: View.propTypes.style,
    titleTextStyle: Text.propTypes.style,
    messageTextStyle: Text.propTypes.style,
    cancelTextStyle: Text.propTypes.style,
    submitTextStyle: Text.propTypes.style,
    submitDisabledTextStyle: Text.propTypes.style,
    footerStyle: View.propTypes.style,
  }

  static defaultProps = {
    hasDefaultOverlay: false,
    onPressOverlay: () => {},
  }

  state = {
    value: this.props.defaultValue || '',
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.defaultValue !== this.state.value) {
      this.setState({ value: nextProps.defaultValue });
    }
  }

  static show = (content) => {
    store.dispatch(promptActions.show(content));
  }

  static update = (content) => {
    store.dispatch(promptActions.update(content));
  }

  static hide = () => {
    store.dispatch(promptActions.hide());
  }

  static autoHide = () => {
    if (store.getState().prompt.autoHideWhenHideAllModals) {
      store.dispatch(promptActions.hide());
    }
  }

  _onChangeText = (value) => {
    this.setState({ value });
    this.props.onChangeText(value);
  }

  _isSubmitEnabled = () => {
    if (!this.props.isInput) {
      return true;
    } else if (!this.state.value) {
      return false;
    }

    return this.state.value.length !== 0;
  }

  _onCancel = () => {
    this.props.onCancel();
    this.setState({ value: '' });
  }

  _onSubmit = () => {
    if (this.props.isInput) {
      this.props.onSubmit(this.state.value);
    } else {
      this.props.onSubmit();
    }

    if (this.state.value && this.state.value.length > this.props.alertLength) {
      return;
    }

    this.setState({ value: '' });
  }

  _renderCancel = () => {
    return (
      <TouchableWithoutFeedback
        onPress={this._onCancel}
      >
        <View style={styles.cancel}>
          <Text
            style={[styles.cancelText, this.props.cancelTextStyle]}
          >
            {this.props.cancelText}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _renderFooter = () => {
    if (this.props.renderFooter) {
      return this.props.renderFooter(this.props.data);
    }

    return (
      <View style={[styles.footer, this.props.footerStyle]}>
        {
          this.props.isCancelVisible && !this.props.isCancelOnRight && this._renderCancel()
        }
        <TouchableWithoutFeedback onPress={this._onSubmit} disabled={!this._isSubmitEnabled()}>
          <View style={styles.submit}>
            <Text
              style={[
                styles.submitText,
                this.props.submitTextStyle,
                !this._isSubmitEnabled() && styles.submitDisabledText,
                !this._isSubmitEnabled() && this.props.submitDisabledTextStyle,
              ]}
            >
              {this.props.submitText}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        {
          this.props.isCancelVisible && this.props.isCancelOnRight && this._renderCancel()
        }
      </View>
    );
  }

  _renderPrompt = () => {
    return (
      <View
        style={[
          styles.positionWithKeyboard,
          !this.props.isInput && styles.positionWithoutKeyboard,
        ]}
      >
        <View style={[styles.title, this.props.titleContainerStyle]}>
          <Text style={[styles.titleText, this.props.titleTextStyle]}>
            {this.props.title}
          </Text>
        </View>
        {
            this.props.renderMessage && this.props.renderMessage()
        }
        {
          this.props.message !== '' &&
            <View style={styles.message}>
              <Text style={[styles.messageText, this.props.messageTextStyle]}>
                {this.props.message}
              </Text>
            </View>
        }
        {
          this.props.isInput &&
            <TextInput
              {...this.props}
              style={styles.input}
              text={this.props.text}
              returnKeyType="done"
              maxLength={this.props.maxLength}
              onChangeText={this._onChangeText}
              placeholder={this.props.placeholder}
              autoFocus={this.props.autoFocus}
              value={this.state.value || ''}
              contentFilter={this.props.contentFilter}
            />
        }
        {this._renderFooter()}
      </View>
    );
  }

  _renderContent= () => {
    if (this.props.hasDefaultOverlay) {
      return (
        <TouchableWithoutFeedback onPress={this.props.onPressOverlay}>
          <View style={styles.container}>
            <TouchableWithoutFeedback>
              {this._renderPrompt()}
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.overlay} />
        {this._renderPrompt()}
      </View>
    );
  }

  render = () => {
    return (
      <Modal onRequestClose={() => {}} transparent ref="modal" visible={this.props.isVisible}>
        {this._renderContent()}
        <Loading />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  positionWithKeyboard: {
    overflow: 'hidden',
    elevation: 5,
    marginTop: 122,
    width: UI.SCREEN_WIDTH - 105,
    borderRadius: 10,
    borderWidth: UI.PIXEL_SIZE,
    borderColor: Color.GREY_12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  positionWithoutKeyboard: {
    marginTop: (UI.SCREEN_HEIGHT - 145) / 2,
  },
  title: {
    paddingTop: 20,
  },
  titleText: {
    textAlign: 'center',
    fontWeight: UI.FontWeight.MEDIUM,
    fontSize: 17,
    color: Color.BLACK,
  },
  message: {
    paddingTop: 6.5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  messageText: {
    textAlign: 'center',
    fontSize: 13,
    color: Color.BLACK,
  },
  input: {
    height: 33,
    marginTop: 21.5,
    marginHorizontal: 16.5,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 4,
    borderWidth: UI.PIXEL_SIZE,
    fontSize: 13,
    borderColor: Color.GREY_12,
    backgroundColor: Color.WHITE,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 14,
    borderTopWidth: UI.PIXEL_SIZE,
    borderColor: Color.GREY_12,
  },
  cancel: {
    flex: 1,
    padding: 12,
    borderRightWidth: UI.PIXEL_SIZE,
    borderColor: Color.GREY_12,
  },
  submit: {
    flex: 1,
    padding: 12,
    borderRightWidth: UI.PIXEL_SIZE,
    borderColor: Color.GREY_12,
  },
  cancelText: {
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 20,
    color: Color.BLUE_4,
  },
  submitText: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: UI.FontWeight.SEMIBOLD,
    lineHeight: 20,
    color: Color.BLUE_4,
  },
  submitDisabledText: {
    textAlign: 'center',
    fontSize: 17,
    color: Color.GREY_10,
  },
});
