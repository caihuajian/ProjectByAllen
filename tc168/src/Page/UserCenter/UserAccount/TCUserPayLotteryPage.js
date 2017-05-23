'use strict'
/**
 * 全部账户记录
 * Created by Allen on 2016/12/10.
 */
import React, {Component} from 'react';
import TopNavigationBar from '../../../Common/View/TCNavigationBar';
import  TimerMixin from 'react-timer-mixin'
import LoadingSpinnerOverlay from 'react-native-smart-loading-spinner-overlay'
import  dismissKeyboard from 'dismissKeyboard';
import  ListRow from './View/TCUserAccountListRowView'
import AccountDetail from './TCUserAccountDetail'
import {Size, Color, Window, Direction} from '../../../Common/Style/AppStyle'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    TextInput,
    ListView
} from 'react-native';

export  default  class TCUserPayLotteryPage extends Component {

    constructor(props) {
        super(props)

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.getListData()),
        };
    }

    static defaultProps = {};

    componentDidMount() {
    }


    render() {

        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.getRenderRow.bind(this)}/>
            </View>
        );

    };

    getListData() {
        const dataBlob = [];
        for (let i = 0; i < 10; i++) {
            dataBlob.push("aa" + i);
        }
        return dataBlob;
    }


    getRenderRow(rowData, sectionID, rowID) {
        return <TouchableOpacity onPress={()=>{this.pressRow()}}>
            <View><Text>{rowData}</Text></View>
        </TouchableOpacity>

    }


    pressRow() {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'accountDetail',
                component: AccountDetail,
                passProps: {
                    ...this.props,
                }
            })
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.mainBg,
    },
});