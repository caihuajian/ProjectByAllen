import React, { Component, PropTypes } from 'react';
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Color } from 'consts';

export default class SummaryItem extends Component {
  static propTypes = {
    titleImage: PropTypes.number,
    titleText: PropTypes.string,
    renderContent: PropTypes.func,
    renderDescription: PropTypes.func,
    onPressSummaryItem: PropTypes.func,
    containerStyle: View.propTypes.style,
    titleStyle: View.propTypes.style,
    titleImageStyle: Image.propTypes.style,
    titleTextStyle: Text.propTypes.style,
  }

  static defaultProps = {
    titleImage: null,
    titleText: null,
    renderContent: () => {},
    renderDescription: () => {},
    onPressSummaryItem: () => {},
  }

  render = () => {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPressSummaryItem}>
        <View style={[styles.container, this.props.containerStyle]}>
          <View style={[styles.title, this.props.titleStyle]}>
            <Image style={this.props.titleImageStyle} source={this.props.titleImage} />
            <Text style={[styles.titleText, this.props.titleTextStyle]}>
             {this.props.titleText}
            </Text>
          </View>
          {this.props.renderContent()}
          {this.props.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingTop: 20,
    height: 187.5,
    backgroundColor: 'rgba(244, 156, 42, 0.1)',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  titleText: {
    marginLeft: 8,
    fontSize: 15,
    color: Color.ORANGE_1,
  },
});
