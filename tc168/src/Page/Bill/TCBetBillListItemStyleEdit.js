/**
 * Created by Sam on 2016/11/19.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import _ from 'lodash';
import TCKeyboardView from '../../Common/View/TCKeyboardView'


export default class TCBetBillListItemView extends React.Component {
    constructor(state) {
        super(state);
        this.state = {
            money: ''
        };
        this.keyboardDismissMode = false
    }

    static defaultProps = {
        jsonData: {},
        deleteButtonEvent: null,
        index: null,
        dataSource: null,
        callBackEvent: null
    };

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <TCKeyboardView ref="tcKeyboardView" setInputValue={(number) => {this.setTextInputValue(number)}}
                    closeEvent={()=>this.closeKeyBoard()}
                />
                <TouchableOpacity onPress={()=>this.deleteButtonCall()} style={{width: 55, height: 70, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('image!icon-qingchu')} style={{height: 22, width: 22}}/>
                </TouchableOpacity>
                <View style={styles.leftViewStyle}>
                    <Text style={{color: 'red', fontWeight: 'bold', fontSize: 17, marginBottom: 2, flex: 1, marginTop: 10, marginLeft: 0}}> {this.props.jsonData.betString} </Text>
                    <Text style={{fontSize: 13, color: '#666666', marginTop: 5, marginLeft: 0, marginBottom: 10}}>
                        {this.props.jsonData.showGameplayMethod} {this.props.jsonData.numberOfUnits}注 {this.props.jsonData.amount}元
                    </Text>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, width: 140,height:40, marginRight: 5}}>
                    <View style={{borderColor: '#ececec', borderWidth: 1,width:120,height:40, marginRight: 5}}>
                        <TouchableOpacity onPress={()=>this.showKeyBoard()}>
                            {this.getInputLabel()}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    getInputLabel(){
        if (this.keyboardDismissMode){
            return (<Text style={{ margin:10,width:80,fontSize:16,color:'#666666'}}>{this.state.money}</Text>)
        }else {
            return (<Text style={{ margin:10,width:105,height:20,fontSize:16,color:'#666666'}}>{this.getValue()}</Text>)
            {/*return(<TextInput ref={'TextInput'} style={{ marginLeft: 5,color:'#666666'}} editable={false}  keyboardType={'numeric'} placeholder={'2'} value={this.getValue()}/>)*/}
        }
    }

    getValue(){
        return String(this.props.jsonData.amount)
    }

    showKeyBoard() {
        var popView = this.refs['tcKeyboardView']
        if (popView.state.modalVisible) {
            popView._setModalVisible(false)
            this.keyboardDismissMode = false
        } else {
            if (this.refs['TextInput']){
                this.refs['TextInput'].clear()
            }
            this.setState({
                money: ''
            })
            this.keyboardDismissMode = true
            popView._setModalVisible(true);
        }
    }

    setTextInputValue(number) {
        let currentStr = this.state.money
        if (number == '确认') {
            this.onEndEditing(currentStr)

        } else if (number == '删除') {
            currentStr = currentStr.substring(0, currentStr.length - 1)
        } else {
            currentStr = currentStr +''+ number
        }

        if (currentStr.length>8) return

        this.setState({
            money: currentStr
        })
    }

    closeKeyBoard(){
        this.keyboardDismissMode = false
        this.setState({
            money: ''
        })
    }

    onEndEditing(e) {
        this.keyboardDismissMode = false
        let jsonData = _.cloneDeep(this.props.jsonData)
        let price = e;
        if (price.length == 0||parseFloat(price)==0) {
            price = 2
        } else {
            price = parseFloat(e).toFixed(2)
        }
        jsonData.amount = price
        jsonData.pricePerUnit = price
        this.props.dataSource.resetNumberArrayItemWithIndexAndItem(jsonData, this.props.index)
        this.props.callBackEvent && this.props.callBackEvent()
    }



    deleteButtonCall() {
        if (this.props.deleteButtonEvent == null) return
        this.props.deleteButtonEvent(this.props.index)
    }
}


const styles = StyleSheet.create({
    container: {
        // height:80,
        flexDirection: 'row',
        borderTopWidth: TCLineW,
        borderTopColor: '#F2F2F2',
        width: Dimensions.get('window').width - 40,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftViewStyle: {
        width: Dimensions.get('window').width - 230,
        backgroundColor: 'white',
    },
    rightViewStyle: {},

});