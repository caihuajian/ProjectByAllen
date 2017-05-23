/**
 * Created by Sam on 2016/11/29.
 */
import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';

var {
    width
} = Dimensions.get('window');

export default class TCBetHomeBottomView extends React.Component {
    constructor(state) {
        super(state);
        this.state = {};
    }

    static defaultProps = {
        leftButtonCallEvent: null,
        rightButtonCallEvent: null,
        clearButtonCallEvent:null
    };

    componentDidMount() {

    }

    resetWithNumbers(numbersStr, numberOfUnits, price) {
        this.setState({
            numbers: numbersStr,
            numberOfUnits: numberOfUnits,
            price: price
        })
    }

    render() {
        return (
            <View style={styles.bottomBarStyle}>

                {this.getLeftButton()}

                <View style={styles.container}>
                    <Text style={{color: 'white', marginTop: 3, fontSize: 16}} ellipsizeMode='tail' numberOfLines={1}>{this.state.numbers}</Text>
                    {this.getBottomTitleView()}
                </View>

                <TouchableOpacity
                    style={styles.rightTitleStyle}
                    onPress={()=>this.checkNumbers()}>
                    <Text style={{fontWeight: 'bold', marginLeft: 5, marginRight: 5, fontSize: 19}}>确定</Text>
                </TouchableOpacity>
            </View>
        );
    }

    getLeftButton() {
        if (this.state.numbers && this.state.numbers.length > 0) {
            return (
                <TouchableOpacity
                    style={styles.leftTitleClearStyle} onPress={()=>this.clearButtonCall()}>
                    <Text style={{fontWeight: 'bold', marginLeft: 5, marginRight: 5, fontSize: 19}}>清空</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity
                    style={styles.leftTitleStyle} onPress={()=>this.randomSelect()}>
                    <Text style={{fontWeight: 'bold', marginLeft: 5, marginRight: 5, fontSize: 19}}>机选</Text>
                </TouchableOpacity>
            )
        }
    }

    getBottomTitleView() {
        if (this.state.numbers != null && this.state.numbers.length > 0) {
            return <View style={{flexDirection: 'row'}}>
                <Text style={{color: 'white', marginRight: 5, fontSize: 16}}>共{this.state.numberOfUnits}注 </Text>
                <Text style={{color: 'yellow', fontSize: 16}}>{this.state.price}元 </Text>
            </View>
        }
    }

    randomSelect() {
        if (this.props.leftButtonCallEvent == null) return
        this.props.leftButtonCallEvent()
    }

    checkNumbers() {
        if (this.props.rightButtonCallEvent == null) return
        this.props.rightButtonCallEvent()
    }

    clearButtonCall() {
        if (this.props.clearButtonCallEvent == null) return
        this.props.clearButtonCallEvent()
    }
}

const styles = StyleSheet.create({
    bottomBarStyle: {
        backgroundColor: '#2B2B2B',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 49,
    },
    leftTitleClearStyle: {
        backgroundColor: '#ececec',
        justifyContent: 'center',
        margin: 5,
        padding: 5,
        borderRadius: 5,
    },
    leftTitleStyle: {
        backgroundColor: '#d48f08',
        justifyContent: 'center',
        margin: 5,
        padding: 5,
        borderRadius: 5,
    },
    rightTitleStyle: {
        backgroundColor: '#d48f08',
        borderRadius: 5,
        justifyContent: 'center',
        margin: 5,
        padding: 5,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 49,
        width: width - 140
    }
});