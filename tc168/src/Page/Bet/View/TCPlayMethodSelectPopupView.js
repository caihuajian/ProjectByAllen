/**
 * Created by Sam on 2016/11/14.
 */


import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    TouchableHighlight,
    Platform,
    Dimensions
} from 'react-native';

var {width} = Dimensions.get('window');

var TCPlayMethodSelectPopupView = React.createClass({

    getInitialState(){
        return {
            animationType: 'fade',//none slide fade
            modalVisible: false,//模态场景是否可见
            transparent: true,//是否透明显示
            selectedIndex: this.props.selectedIndex,
            areaIndex: 0,
        }
    },

    getDefaultProps(){
        return {
            topTitle: '选择玩法',
            showTopTitle: true,
            selectTitle: null,
            selectTitleArr: [],
            selectedFunc: null,
            selectedIndex: 0,
            areaIndex: 0,
            secondAreaTitle: null,
            secondAreaTitleArr: null
        }
    },

    componentDidMount() {

    },

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    },

    render() {
        return (
            <Modal
                animationType={this.state.animationType}
                transparent={this.state.transparent}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this._setModalVisible(false)
                } }
            >
                <TouchableHighlight onPress={() => {
                    this._setModalVisible(false)
                }} style={styles.modalBackgroundStyle} underlayColor='transparent'>
                    <View style={styles.contentStyle} onPress={this.emptyF()}>
                        <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F2F2'}}>
                            {this.getTitle()}
                        </View>
                        <View style={{backgroundColor: '#F2F2F2', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 10}} onPress={this.emptyF()}>
                            {this.getAllItems()}
                            {this.getSecondAreaViews()}
                        </View>
                    </View>
                </TouchableHighlight>
            </Modal>
        );
    },

    emptyF(){

    },

    getTitle(){
        if (this.props.showTopTitle)
            return <Text style={{fontSize: 20, color: '#696969', marginTop: 10, marginBottom: 10}}>{this.props.topTitle}</Text>
    },

    selectedCallBack(index, areaIndex) {
        if (this.props.selectedFunc == null) return
        this.props.selectedIndex = index
        this.props.selectedFunc(index, areaIndex)

        this.timer = setTimeout(() => {
            this._setModalVisible(false)
        }, 100)
    },

    getAllItems() {
        let itemArr = [];

        if (this.props.selectTitle) {
            itemArr.push(
                <Text key={6533} style={{width: width, height: 18, textAlign: 'center'} }> {this.props.selectTitle} </Text>
            )
        }

        let selectTitleArr = this.props.selectTitleArr;
        for (let i = 0; i < selectTitleArr.length; i++) {
            let selected = false
            if (this.state.areaIndex == 0 && this.state.selectedIndex == i) {
                selected = true
            }
            itemArr.push(
                <TCSelectView
                    selectedFunc={(e, areaIndex)=>this.selectedCallBack(e, areaIndex)}
                    title={selectTitleArr[i]}
                    key={i}
                    myIndex={i}
                    isSelected={selected}
                    areaIndex='0'
                />
            )
        }
        return itemArr;
    },

    getSecondAreaViews(){
        if (!this.props.secondAreaTitleArr)return

        let itemArr = [];

        itemArr.push(
            <Text key={6532} style={{width: width, height: 18, textAlign: 'center', marginTop: 5} }> {this.props.secondAreaTitle} </Text>
        )

        let selectTitleArr = this.props.secondAreaTitleArr;
        for (let i = 0; i < selectTitleArr.length; i++) {
            let selected = false
            if (this.state.areaIndex == 2 && this.state.selectedIndex == i) {
                selected = true
            }
            itemArr.push(
                <TCSelectView
                    selectedFunc={(e, areaIndex)=>this.selectedCallBack(e, areaIndex)}
                    title={selectTitleArr[i]}
                    key={i}
                    myIndex={i}
                    isSelected={selected}
                    areaIndex="2"
                />
            )
        }
        return itemArr;

    },

    _setModalVisible (visible){
        this.setState({modalVisible: visible});
    },

    _setModalSelectedIndex (selectedIndex, areaIndex){
        this.setState({selectedIndex: selectedIndex, areaIndex: areaIndex});
    },

});

module.exports = TCPlayMethodSelectPopupView;


class TCSelectView extends React.Component {

    constructor(state) {
        super(state);
        this.state = {
            selected: this.props.isSelected
        };
    }

    static defaultProps = {
        title: '',
        isSelected: false,
        myIndex: -1,
        selectedFunc: null,
        areaIndex: 0
    };

    render() {
        return (
            <TouchableOpacity style={this.getItemStyle()} onPress={this.onPressCallback}>
                <Text style={[this.getTitleStyle(), {fontSize: width >= 375 ? 16 : 13,fontWeight:'bold',color: '#696969'}]}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    };

    onPressCallback = () => {
        this.setState({
            selected: !this.state.selected
        });
        if (this.props.selectedFunc == null) return;
        this.props.selectedFunc(this.props.myIndex, this.props.areaIndex);
    }

    getItemStyle = () => {
        let styleArr = [];
        styleArr.push(
            styles.selectViewStyle
        );
        if (this.state.selected) {
            styleArr.push(
                {borderColor: 'red', borderWidth: 1}
            )
        }
        return styleArr;
    }

    getTitleStyle = () => {
        if (this.state.selected) {
            return {color: 'red'};
        }
        return {color: '#333333'}
    }
}

const styles = StyleSheet.create({

    modalBackgroundStyle: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginTop: 0,
    },
    contentStyle: {
        marginTop: Platform.OS == 'ios' ? 64 : 44,
        justifyContent: 'center',
        backgroundColor: '#F2F2F2',
    },
    selectViewStyle: {
        backgroundColor: 'white',
        height: 35,
        width: width / 3 - 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 5,
        borderColor: '#e5e5e5',
        borderWidth: 1,
        padding: 5
    },
});