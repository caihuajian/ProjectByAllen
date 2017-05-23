import React, { Component } from 'react';
import { View, Animated, Easing } from 'react-native';

export default class MarqueeLabel extends Component {
    state = {
        started: false
    };

    componentWillMount() {
        this.animatedTransformX = new Animated.Value(0);
        this.bgViewWidth = 0;
        this.textWidth = 0;
        this.duration = 0;
        this.shouldFinish = false;
    }

    componentWillUnmount() {
        this.shouldFinish = true;
    }

    textOnLayout(e) {
        this.textWidth = e.nativeEvent.layout.width;

        if (this.bgViewWidth !== 0) {
            this.prepareToAnimate();
        }
    }

    bgViewOnLayout(e) {
        this.bgViewWidth = e.nativeEvent.layout.width;

        if (this.textWidth !== 0) {
            this.prepareToAnimate();
        }
    }

    prepareToAnimate() {
        const { duration, speed } = this.props;
        if (duration !== undefined) {
            this.duration = duration;
        } else if (speed !== undefined) {
            this.duration = ((this.bgViewWidth + this.textWidth) / speed) * 1000;
        }

        this.animate();
    }

    animate() {
        this.animatedTransformX.setValue(this.bgViewWidth);
        if (!this.state.started) {
            this.setState({
                started: true
            });
        }



        Animated.timing(this.animatedTransformX, {
            toValue: -this.textWidth,
            duration: this.duration,
            // useNativeDriver: true,
            easing: Easing.linear
        }).start(() => {
            if (!this.shouldFinish) {
                this.animate()
            }
        });
    }

    render() {
        const {
            children,
            text,
            bgViewStyle,
            textStyle,
            textContainerWidth = 10000,
            textContainerHeight = 35,
            textContainerStyle
        } = this.props;

        const { started } = this.state;

        return (
            <View
                style={{ ...styles.bgViewStyle, ...bgViewStyle }}
                onLayout={(event) => this.bgViewOnLayout(event)}
            >
                <View
                    style={{
                        ...styles.textContainerStyle,
                        width: textContainerWidth,
                        height: textContainerHeight,
                        opacity: started ? 1 : 0,
                        ...textContainerStyle
                    }}
                >
                    <Animated.Text
                        numberOfLines={1}
                        style={{
                            fontSize:16,
                            transform: [{ translateX: this.animatedTransformX }],
                            ...textStyle
                        }}
                        onLayout={(event) => this.textOnLayout(event)}
                    >
                        {children || text || ' '}
                    </Animated.Text>
                </View>
            </View>
        );
    }
}

const styles = {
    bgViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'scroll',
        backgroundColor:'white'
    },
    textContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
};