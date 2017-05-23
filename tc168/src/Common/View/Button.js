import React, {Component, PropTypes,} from 'react'

import {View, StyleSheet, Text, TouchableOpacity,} from 'react-native'

const systemButtonOpacity = 0.2;
export default class Button extends Component {



    // 构造函数
    constructor(props) {

        super(props)
        this.state = {}
    }

    static propTypes = {
        ...TouchableOpacity.propTypes,
        containerStyle: View.propTypes.style,
        disabled: PropTypes.bool,
        style: Text.propTypes.style,
        styleDisabled: Text.propTypes.style,
        text:PropTypes.string.isRequired,
        txtstyle:Text.propTypes.style,
        txtstyleDisabled:Text.propTypes.style,
    };


    computeActiveOpacity() {
        if (this.props.disabled) {
            return 1;
        }
        return this.props.activeOpacity != null ?
            this.props.activeOpacity :
            systemButtonOpacity;
    }


    getBtnStyle() {
        if (this.props.disabled) {
            return this.props.style;
        } else {
            return this.props.styleDisabled;
        }
    }

    getTxtStyle() {
        let { disabled } = this.props;
        let style = [
            this.props.txtstyle,
            disabled ? styles.disabledText : null];
        return style;
    }

    render() {
        let touchableProps = {
            activeOpacity: this.computeActiveOpacity(),
        };

        if (!this.props.disabled) {
            touchableProps.onPress = this.props.onPress;
            touchableProps.onPressIn = this.props.onPressIn;
            touchableProps.onPressOut = this.props.onPressOut;
            touchableProps.onLongPress = this.props.onLongPress;
        }
        return (
            <TouchableOpacity
                {...touchableProps}
                style={this.getBtnStyle()}
                activeOpacity={this.computeActiveOpacity()}
            >
                <Text style={this.getTxtStyle()}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        color: '#007aff',
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
    },

})