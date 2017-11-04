import React, {Component} from 'react';
import {AppRegistry, Animated, Image, Platform, StyleSheet, View, Text, ListView} from 'react-native';
import data from './data';

const NAVBAR_HEIGHT = 150;
const STATUS_BAR_HEIGHT = Platform.select({ios: 20, android: 24});

const AnimatedListView = Animated.createAnimatedComponent(ListView);
/**
 *
 */

export  default  class ReactNativeCollapsibleMenu extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(data),
            scroll: new Animated.Value(0),
        };
    }

    onScroll(e) {
        const {y} = e.nativeEvent.contentOffset;

        this.animate(null, Math.floor(y, 2) / 100);
    }

    onScrollEndDrag(e = null) {
        const {y} = e.nativeEvent.contentOffset;
    };

    animate(expand = null, gesture = null, animationType = 'timing') {
        const {scroll} = this.state;

        Animated[animationType](
            scroll,
            {
                toValue: gesture ? gesture : expand ? 1 : 0,
                duration: 300,
                useNativeDriver: false
            }
        ).start();
    }

    renderRow(rowData, sectionId, rowId) {
        return (
            <Image key={rowId} style={styles.row} source={{uri: rowData.image}} resizeMode="cover">
                <Text style={styles.rowText}>{rowData.title}</Text>
            </Image>
        );
    };

    render() {
        const {scroll} = this.state;

        const navbarHeight = scroll.interpolate({
            inputRange: [0, 1],
            outputRange: [NAVBAR_HEIGHT, 0]
        });

        const navbarOpacity = scroll.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
        });

        return (
            <View style={styles.container}>
                <Animated.View style={[styles.nav, {height: navbarHeight}]}>
                    <Animated.Text style={[styles.title, {opacity: navbarOpacity}]}>
                        Example
                    </Animated.Text>
                </Animated.View>
                <AnimatedListView
                    contentContainerStyle={styles.contentContainer}
                    dataSource={this.state.dataSource}
                    renderRow={(data) => this.renderRow(data)}
                    scrollEventThrottle={16}
                    onScrollEndDrag={(e) => this.onScrollEndDrag(e)}
                    onScroll={(e) => this.onScroll(e)}
                    bounces={false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    nav: {
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderBottomColor: '#dedede',
        borderBottomWidth: 1,
        justifyContent: 'center',
        paddingTop: STATUS_BAR_HEIGHT,
        zIndex: 99
    },

    title: {
        color: '#000',
    },

    row: {
        height: 300,
        width: null,
        marginBottom: 1,
        padding: 16,
        backgroundColor: 'transparent',
    },

    rowText: {
        color: '#fff',
        fontSize: 18,
    },
});
