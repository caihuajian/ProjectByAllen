import React, {Component, PropTypes,} from 'react'

import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native'
import {Size, Color, Window, Direction} from '../../Common/Style/AppStyle'
/**
 * 提示对话框
 */
export default class TCNoDataView extends Component {

    // 构造函数
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.titleTip
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.mainView}>
                    {
                        this.props.unNetwork ? (<Image
                            source={require('../../Page/resouce/broken_network.png')}
                            style={styles.imageStyle}/>) :
                            (<Image
                                source={require('../../Page/resouce/no_data.png')}
                                style={styles.imageStyle}/>)
                    }

                    <Text style={styles.txtTitleStyle}>{this.state.title}</Text>
                    <Text style={styles.txtContentStyle}>{this.props.contentTip}</Text>
                    {this.props.btnTxt ? (  <TouchableOpacity
                        style={styles.bottomBarButtonStyle}
                        onPress={()=> {
                            this.props.gotoDoing()
                        }}
                    >
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: Size.default}}>
                            {this.props.btnTxt}
                        </Text>
                    </TouchableOpacity>) : null}
                </View>

            </View>
        )
    }

    _setTitle(title) {
        this.setState({
            title: title
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg.grey5,
    }, imageStyle: {
        marginTop: Window.height * 0.2,
        width: Window.width * 0.3,
        height: Window.height * 0.2,
    }, mainView: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
    },
    bottomBarButtonStyle: {
        backgroundColor: Color.bg.btnBg,
        justifyContent: 'center',
        flexDirection: Direction.row,
        height: 40,
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
        width: Window.width * 0.6,
        marginTop: 20
    }, txtTitleStyle: {
        fontSize: Size.large,
        color: Color.text.black1,
        fontWeight: 'bold',
        marginTop: 10
    }, txtContentStyle: {
        color: Color.text.grey2,
        fontSize: Size.default,
        marginTop: 5
    }
})