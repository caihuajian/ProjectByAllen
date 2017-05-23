/**
 * Created by allen-jx on 2017/5/3.
 */
import React, {Component, PropTypes,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    Platform,
    Image,
    ListView,
    Alert
} from 'react-native'
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
import TCUserCollectItem from './view/TCUserCollectItemView'
import NavigatorHelper from '../../../Common/JXHelper/TCNavigatorHelper'
import TopNavigationBar from '../../../Common/View/TCNavigationBar'
import BaseComponent from '../../Base/TCBaseComponent'
import  JXHelperC from '../../../Common/JXHelper/TCUserCollectHelper'
import _ from 'lodash';
let JXHelper = new JXHelperC()

/**
 * 收藏
 */


export default class TCUserCollect extends BaseComponent {

    // 构造函数
    constructor(props) {

        super(props)
        this.collects = []
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            isEmpty: false
        }
    }

    componentWillMount() {
        this.loadData()
    }

    render() {
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    title={'个人收藏'}
                    needBackButton={true}
                    backButtonCall={()=> {
                        this.props.navigator.pop()
                    }}
                    rightTitle={'清空收藏'}
                    rightButtonCall={()=> {
                        if (TCUSER_COLLECT && TCUSER_COLLECT.length > 0) {
                            Alert.alert(
                                '您是否要清空所有收藏？', null, [{
                                    text: '确定',
                                    onPress: () => {
                                        JXHelper.removeAllCollect()
                                        this.loadData()
                                    }
                                }, {
                                    text: '取消',
                                    onPress: () => JXLog('clear')
                                },])
                        }
                    }}
                />
                {this.state.isEmpty ? (this.getEmptyTip()) :
                    (<ListView style={{height: Window.height - 64}}
                               ref="ListView1"
                               dataSource={this.state.dataSource}
                               renderRow={(rowData, sectionID, rowID)=>this.renderRow(rowData, sectionID, rowID)}
                               scrollRenderAheadDistance={20}
                               enableEmptySections={true}
                               removeClippedSubviews={false}
                    />)
                }
            </View>
        )
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <TCUserCollectItem
                rowData={rowData}
                rowID={rowID}
                pushToEvent={ (rowData) => this._pushToBetHomePage(rowData)}
                removeCollect={(gameId)=> {
                    this.removeCollect(gameId)
                }}
            />
        )
    }

    _pushToBetHomePage(rowData) {
        NavigatorHelper.pushToBetHome(rowData)
    }

    loadData() {
        this.collects = []
        this.collects = _.concat(this.collects, TCUSER_COLLECT)
        if (this.collects.length == 0) {
            this.setState({
                isEmpty: true
            })
        } else {
            this.setState({
                isEmpty: false,
                dataSource: this.state.dataSource.cloneWithRows(this.collects),
            })
        }

    }

    removeCollect(gameId) {
        JXHelper.removeCollect(gameId)
        this.loadData()
    }

    getEmptyTip() {
        return (
            <View style={styles.emptyTip}>
                <Image
                    source={require('../../resouce/pay_error.png')} style={styles.payErrorImg}
                />
                <Text>您还没有添加收藏哦!</Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,

    }, payErrorImg: {
        height: Window.width * 0.4,
        width: Window.height * 0.4,
        marginBottom: 10
    }, emptyTip: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Platform.OS == 'ios' ? Window.height - 64 : Window.height - 44,
    }
})