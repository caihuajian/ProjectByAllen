import React, {Component, PropTypes,} from 'react'

import {View, StyleSheet, Text, TouchableOpacity, Image, ListView} from 'react-native'
import TopNavigationBar from '../../../Common/View/TCNavigationBar'
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
import  AddBank from '../UserAccount/TCUserAddBank'
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Toast from '@remobile/react-native-toast';
import request from '../../../Common/Network/TCRequest'
import {config} from '../../../Common/Network/TCRequestConfig'
import BaseComponent from '../../Base/TCBaseComponent'
import NetUtils from '../../../Common/Network/TCRequestUitls'
export default class TCUserBankList extends BaseComponent {



    // 构造函数
    constructor(props) {
        super(props)
    }

    static defaultProps = {};

    componentDidMount() {
        super.componentDidMount();
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.data = this.props.bankList;
        this.setState({
            dataSource: ds.cloneWithRows(this.data),
            selectIndex: this.props.bank.id,
            renderPlaceholderOnly: true
        })
        this.setState({
            renderPlaceholderOnly: false
        })
        this.listener = RCTDeviceEventEmitter.addListener('userBankChange', () => {
            this.getBankDataFromNet()
        })
    }

    render() {
        let sp = super.render()
        if (sp) return sp;
        return (
            <View style={styles.container}>
                <TopNavigationBar
                    title={'选择银行卡'}
                    needBackButton={true}
                    backButtonCall={()=> {
                        this.props.navigator.pop()
                    }}
                    rightTitle={'添加'}
                    rightButtonCall={()=> {
                        this.gotoAddBank()
                    }}
                />
                <View style={styles.mainViewStyle}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(rowData, sectionID, rowId)=>this.getRenderRow(rowData, sectionID, rowId)}
                    />
                </View>

            </View>
        )
    }

    gotoAddBank() {
        if (this.data.length >= 6) {
            Toast.showShortCenter("绑定银行卡不能超过6张！");
            return;
        }

        let {navigator} =this.props;
        if (navigator) {
            navigator.push({
                name: 'addBank',
                component: AddBank,
                passProps: {
                    ...this.props,
                }
            })
        }

    }

    getBankDataFromNet() {
        NetUtils.getUrlAndParamsAndCallback(config.api.userCards, null, (response) => {
            if (response.rs) {
                this.data = response.content;
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.data)
                })
            } else {

                if (response.status === 500) {
                    Toast.showShortCenter('服务器出错啦!')
                } else {
                    if (response.message) {
                        Toast.showShortCenter(response.message)
                    }
                }
            }
            this.setState({renderPlaceholderOnly: false});
        })

    }

    getRenderRow(rowData, sectionID, rowId) {
        return (
            <TouchableOpacity onPress={()=>this.onPressRow(rowData, sectionID, rowId)}>
                <View style={styles.itemViewStyle}>
                    <View style={styles.titleViewStyle}>
                        <Image
                            source={{uri: rowData.bankCode}}
                            style={styles.imgStyle}/>
                        <Text style={styles.titleTxtStyle}>{rowData.bankName}</Text>
                    </View>
                    <View style={this.getViewStyle(rowData.id)}>
                        <Image
                            source={require("image!bank_select")}
                            style={styles.gouImgStyle
                            }/>
                    </View>
                </View>

            </TouchableOpacity>
        );
    }

    onPressRow(rowData, sectionID, rowID) {
        // console.log("------------------sectionID:" + sectionID + ",rowID:" + rowID);
        // rowData.isSelected = true;
        //
        //
        // this.setState({
        //     selectIndex: rowData.bankId,
        //     dataSource: this.state.dataSource.cloneWithRows(this.getListData1())
        // });
        let newData = this.data;
        newData[rowID].isSelected = !newData[rowID].isSelected;
        this.setState({
            selectIndex: rowData.bankId,
            dataSource: this.state.dataSource.cloneWithRows(newData)
        });
        let bank = rowData;
        RCTDeviceEventEmitter.emit('UpdateBankInfo', bank);
        let {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    getViewStyle(bankId) {
        if (this.state.selectIndex == bankId) {
            return styles.imgViewStyle;
        } else {
            return styles.imgViewUnselectStyle;
        }
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
    },
    itemViewStyle: {
        flexDirection: Direction.row,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderBottomColor: Color.border.grey5,
        paddingTop: 10,
        paddingBottom: 10
    }, imgStyle: {
        width: 30,
        height: 30
    }, titleViewStyle: {
        flexDirection: Direction.row,
        alignItems: 'center',
        paddingLeft: 20
    }, gouImgStyle: {
        width: 20,
        height: 20
    }, titleTxtStyle: {
        fontSize: Size.default,
        paddingLeft: 10
    }, imgViewStyle: {
        justifyContent: 'center',
        paddingRight: 10
    }, mainViewStyle: {
        marginTop: 20
    }, imgViewUnselectStyle: {
        height: 0,
        width: 0
    }

})