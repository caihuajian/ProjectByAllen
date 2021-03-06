
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'

import {Color, Window} from '../../../../../Common/Style/AppStyle'

export default class TCHappyPokerSelectView extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            selectedButton: null,
            isSelected: false,
        };
    }

    static defaultProps = {
        titleName: '',
        itemName: '',
        icon: null,
        number: '',
    };

    componentDidMount() {
        this.listener = RCTDeviceEventEmitter.addListener('HappyPokerNumberCall_clear', () => {this.reset()})
        this.listener2 = RCTDeviceEventEmitter.addListener('randomHappyPokerSelectedNumber', (number) => {
            if (this.props.number == number) {
                RCTDeviceEventEmitter.emit('HappyPokerNumberCall', this.props.number, true);
                this.setState({isSelected: true})
            }
        })
    }

    componentWillUnmount() {
        this.listener && this.listener.remove()
        this.listener2&& this.listener2.remove()
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state != nextState) {
            return true;
        }

        return false;
    }

    render() {
        return(
            <TouchableOpacity onPress={() => this.onPressItem()}>
                {this.getContentView()}
            </TouchableOpacity>
        );
    }

    getContentView() {
        switch (this.props.titleName) {
            case '包选':
                return (
                    <View
                        style={[styles.singleContentContainer, this.state.isSelected && styles.singleContentSelected]}>
                        <Text style={styles.textMathType}>{this.props.itemName}</Text>
                        <View style={styles.exampleContainer}>
                            <Text style={styles.textExample}>如</Text>
                            <Image source={this.props.icon} style={styles.imgPokerStyle} resizeMode={'contain'}/>
                        </View>
                    </View>
                );
                break
            case '同花顺单选':
            case '同花单选':
                return(
                    <View style={[styles.singleTonghuaContainer, this.state.isSelected && styles.singleContentSelected]}>
                        <Image source={this.props.icon} style={styles.imgTonghuaPokerStyle} resizeMode={'contain'}/>
                    </View>
                );
                break
            case '顺子单选':
                return(
                    <View style={[styles.singleShunZiContainer, this.state.isSelected && styles.singleContentSelected]}>
                        <Image source={this.props.icon} style={styles.imgShunZiPokerStyle} resizeMode={'contain'}/>
                    </View>
                );
                break
            case '豹子单选':
                return(
                    <View style={[styles.singleBaoZiContainer, this.state.isSelected && styles.singleContentSelected]}>
                        <Image source={this.props.icon} style={styles.imgBaoZiPokerStyle} resizeMode={'contain'}/>
                    </View>
                );
                break
            case '对子单选':
                return(
                    <View style={[styles.singleDuiZiContainer, this.state.isSelected && styles.singleContentSelected]}>
                        <Image source={this.props.icon} style={styles.imgDuiZiPokerStyle} resizeMode={'contain'}/>
                    </View>
                );
                break
            case '任选一':
            case '任选二':
            case '任选三':
            case '任选四':
            case '任选五':
            case '任选六':
                return(
                    <View style={[styles.singleDanXuanContainer, this.state.isSelected && styles.singleContentSelected]}>
                        <Image source={this.props.icon}
                               style={styles.imgDanXuanPokerStyle}
                               resizeMode={'contain'}></Image>
                    </View>
                );
        }
    }

    onPressItem() {
        this.setState({isSelected: !this.state.isSelected})
        RCTDeviceEventEmitter.emit('HappyPokerNumberCall', this.props.number, !this.state.isSelected);
    }

    reset() {
        this.setState({isSelected: false})
    }
}

const styles = StyleSheet.create({
    singleContentContainer: {
        justifyContent: 'space-around',
        width: (Window.width - 60) / 3,
        height: (Window.width - 60) / 3 * 1.1,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        borderColor: Color.bg.grey1,
        borderWidth: 1,
        borderStyle: 'dashed',
        backgroundColor: 'transparent',
    },
    singleTonghuaContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: (Window.width - 80) / 4,
        height: (Window.width - 80) / 4 * 1.3,
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: 'transparent',
    },
    singleShunZiContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: (Window.width - 60) / 3,
        height: (Window.width - 60) / 3 * 0.64,
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: 'transparent',
    },
    singleBaoZiContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: (Window.width - 60) / 4,
        height: (Window.width - 60) / 4 * 0.88,
        marginVertical: 7.5,
        marginHorizontal: 7.5,
        backgroundColor: 'transparent',
    },
    singleDuiZiContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: (Window.width - 60) / 5,
        height: (Window.width - 60) / 5,
        marginVertical: 6,
        marginHorizontal: 6,
        backgroundColor: 'transparent',
    },
    singleDanXuanContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: (Window.width - 60) / 5,
        height: (Window.width - 60) / 5 * 1.25,
        marginVertical: 6,
        marginHorizontal: 6,
        backgroundColor: 'transparent',
    },
    singleContentSelected: {
        borderRadius: 5,
        borderColor: '#ffc583',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    textMathType: {
        alignSelf: 'center',
        fontSize: 25,
        color: '#333333',
        backgroundColor: 'transparent',
    },
    exampleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textExample: {
        color: '#666666',
        marginRight: 2,
    },
    imgPokerStyle: {
        height: 40,
        width: 70,
    },
    imgTonghuaPokerStyle: {
        width: (Window.width - 80) / 4 - 6,
        height: (Window.width - 80) / 4 * 1.3 - 6,
    },
    imgShunZiPokerStyle: {
        width: (Window.width - 60) / 3 - 6,
        height: (Window.width - 60) / 3 * 0.64 - 6,
    },
    imgBaoZiPokerStyle: {
        width: (Window.width - 60) / 4 - 6,
        height: (Window.width - 60) / 4 * 0.88 -6 ,
    },
    imgDuiZiPokerStyle: {
        width: (Window.width - 60) / 5 - 6,
        height: (Window.width - 60) / 5 - 6,
    },
    imgDanXuanPokerStyle: {
        width: (Window.width - 60) / 5 - 6,
        height: (Window.width - 60) / 5 * 1.25 - 6,
    },
});