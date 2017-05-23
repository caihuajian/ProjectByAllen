/**
 * Created by Sam on 2016/11/11.
 */


import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');
import HappyPokerHelper from '../../Common/JXHelper/HappyPokerHelper'
import {Mark_SixBallColor, PCDD_ballColor} from '../../Data/JXGameInfo'
import {lotteryLobby} from '../../Page/resouce/appColorsConfig'
let happyPoker = new HappyPokerHelper()
export default class TCLotteryNumbersView extends React.Component {

    constructor(state) {
        super(state);
        this.state = {};
    }

    static defaultProps = {
        cpNumbers: [1, 2, 3, 45, 22, 22, 2, 2, 12, 2, 1],
        width: null,
        marginRight: null,
        isHighlightStyle: true,
        showStyle: 'MARK_SIX'
    };

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                {this.getAllItems()}
            </View>
        );
    };

    getAllItems() {
        var itemArr = [];

        let num = 0

        let S = -1
        let G = -1
        if (this.props.showStyle.indexOf('K3') > 0) {
            for (let i = 0; i < this.props.cpNumbers.length; i++) {
                num += parseInt(this.props.cpNumbers[i]);
            }

            return(
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {
                        <View style={styles.imgDiceContainer}>
                            {this.getDiceImages()}
                        </View>
                    }
                    <Text style={styles.totalValueStyle}>和值:{num}</Text>
                </View>
            );
        }

        for (let i = 0; i < this.props.cpNumbers.length; i++) {
            itemArr.push(
                <View key={i} style={this.getMyBallStyle(this.props.cpNumbers[i])}>
                    <Text style={{
                        color: this.props.isHighlightStyle ? 'white' : (this.props.showStyle == 'MARK_SIX' ? Mark_SixBallColor[this.props.cpNumbers[i]] : lotteryLobby.highlightColor),
                        fontSize: 14,
                        backgroundColor: 'transparent'
                    }}> {this.props.cpNumbers[i]} </Text>
                </View>
            )
            if (this.props.showStyle == 'MARK_SIX' && i == 5) {
                itemArr.push(<Text key={i + 100} style={{fontSize: 18, marginBottom: 10}}> + </Text>)
            }

            if ((this.props.showStyle == 'HF_SG28' || this.props.showStyle == 'HF_BJ28' || this.props.showStyle == 'HF_LF28')) {
                num += parseInt(this.props.cpNumbers[i])

                if (i < 2) {
                    itemArr.push(<Text key={i + 100} style={{fontSize: 18, marginBottom: 10}}> + </Text>)
                } else {
                    itemArr.push(<Text key={i + 100} style={{fontSize: 18, marginBottom: 10}}> =  </Text>)
                    itemArr.push(
                        <View key={i + 300} style={this.getMyBallStyle(num < 10 ? ('0' + num) : num, true)}>
                            <Text key={i + 202} style={{fontSize: 14, marginBottom: 0, color: 'white'}}>{num}</Text>
                        </View>)
                }
                if (i == 2) {
                    itemArr.push(<Text key={i + 1022} style={{fontSize: 16, marginLeft: 10, marginBottom: 5, color: '#333333'}}>{this.getDXDS(num,true)}</Text>)
                }
            }

            if (this.props.showStyle.indexOf('SSC') >= 0) {
                if (i == 4) {
                    G = this.props.cpNumbers[i]
                    itemArr.push(<Text key={i + 112} style={{fontSize: 16, marginLeft: 10, marginBottom: 5, color: '#333333'}}>{this.getDXDS(S)} | {this.getDXDS(G)}</Text>)
                } else if (i == 3) {
                    S = this.props.cpNumbers[i]
                }
            }
        }

        if (this.props.showStyle.indexOf('LFKLPK') > 0) {
            return(
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {
                        <View style={styles.imgDiceContainer}>
                            {this.getPKView()}
                        </View>
                    }
                </View>
            );
        }
        return itemArr;
    }

    getDiceImages() {
        let imagesArr = [];
        for (let i = 0; i < this.props.cpNumbers.length; i++) {
            switch (this.props.cpNumbers[i].toString()) {
                case '1':
                    imagesArr.push(<Image key={i} source={require('../../Page/resouce/dice1.png')}
                                          style={styles.imgDiceStyle}
                                          resizeMode={'contain'}/>
                    );
                    break;
                case '2':
                    imagesArr.push(<Image key={i} source={require('../../Page/resouce/dice2.png')}
                                          style={styles.imgDiceStyle}
                                          resizeMode={'contain'}/>
                    );
                    break;
                case '3':
                    imagesArr.push(<Image key={i} source={require('../../Page/resouce/dice3.png')}
                                          style={styles.imgDiceStyle}
                                          resizeMode={'contain'}/>
                    );
                    break;
                case '4':
                    imagesArr.push(<Image key={i} source={require('../../Page/resouce/dice4.png')}
                                          style={styles.imgDiceStyle}
                                          resizeMode={'contain'}/>
                    );
                    break;
                case '5':
                    imagesArr.push(<Image key={i} source={require('../../Page/resouce/dice5.png')}
                                          style={styles.imgDiceStyle}
                                          resizeMode={'contain'}/>
                    );
                    break;
                case '6':
                    imagesArr.push(<Image key={i} source={require('../../Page/resouce/dice6.png')}
                                          style={styles.imgDiceStyle}
                                          resizeMode={'contain'}/>
                    );
                    break;
                default:
                    break;
            }
        }

        return imagesArr;
    }

    getPKView(){
        return (<View
            style={styles.openCodeContainer}>{happyPoker.getOpenCodeView(this.props.cpNumbers, true)}</View>)
    }


    getDXDS(number, JZ) {
        let str = ''
        if (JZ) {
            if (number < 6) {
                return '极小'
            } else if (number > 21) {
                return '极大'
            }
        }

        if (JZ){
            if (number > 13) {
                str += '大'
            } else {
                str += '小'
            }
        }else {
            if (number > 4) {
                str += '大'
            } else {
                str += '小'
            }
        }

        if ((parseInt(number) + 2) % 2 == 0) {
            str += '双'
        } else {
            str += '单'
        }
        return str
    }

    getMyBallStyle(number, dos) {
        let styArr = [];
        styArr.push(
            this.props.isHighlightStyle ? styles.ballStyle : styles.ballNoBackgroundStyle
        )

        if (this.props.showStyle == 'MARK_SIX' && this.props.isHighlightStyle) {
            styArr.push({backgroundColor: Mark_SixBallColor[number]});
        }


        if (dos && (this.props.showStyle == 'HF_SG28' || this.props.showStyle == 'HF_BJ28')) {
            styArr.push({backgroundColor: PCDD_ballColor[number]});
        }

        return styArr;
    }

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 5,
        flexWrap: 'wrap',
        marginBottom: 12,
        marginTop: 10
    },
    ballStyle: {
        backgroundColor: lotteryLobby.highlightColor,
        borderRadius: 20,
        height: 25,
        width: 25,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    },
    ballNoBackgroundStyle: {
        height: 35,
        width: 35,
        marginRight: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    },
    imgDiceContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        backgroundColor: '#289300',
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgDiceStyle: {
        marginVertical: 5,
        marginHorizontal: 5,
        height: 25,
        width: 25,
    },
    totalValueStyle: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333333',
    },openCodeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        width: width / 2 - 12,
        marginTop: 2,
    },
});

