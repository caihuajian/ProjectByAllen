/**
 * Created by Sam on 16/01/2017.
 * Copyright © 2016年 JX. All rights reserved.
 */

import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableOpacity,
    PixelRatio,
    Animated,
    Easing
} from 'react-native';
var px = PixelRatio.get()
var Marquee = require('@remobile/react-native-marquee');
import MarqueeLabel from './MarqueeLabel'
import JXHelper from '../JXHelper/TCNavigatorHelper'
var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');
import {homePageStyle} from '../../Page/resouce/appColorsConfig'
import MarqueeLabel2 from './TCMarqueeLabel';

let noticeText = ''
export default class MyComponent extends React.Component {
    constructor(state) {
        super(state)
        this.state = {}
    }

    static defaultProps = {
        announcement: []
    };

    componentDidMount() {
        noticeText = this.getTextWithAnnouncement()
    }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={()=> {
                JXHelper.pushToNotice(this.props.announcement)
            }}>
                <Text style={{marginLeft: 5, color: homePageStyle.noticeTitleColor}}>公告</Text>
                {this.getMarquee()}
            </TouchableOpacity>
        );
    }

    getMarquee() {
        if (Platform.OS === 'ios') {
           return (<MarqueeLabel2
                speed={25}
                text={this.getTextWithAnnouncement()}
                textContainerWidth={999999999999}
                textContainerHeight={35}
                textStyle={{ fontSize: 14,color: '#666666' }}
                textContainerStyle={{height:35}}
            />)
        } else {
            return (<MarqueeLabel style={styles.marqueeLabel} scrollDuration={1.0}>
                {this.getTextWithAnnouncement()}
            </MarqueeLabel>)
        }
    }

    getTextWithAnnouncement() {
        let str = ''
        let l = this.props.announcement.length
        l = l>2?2:l
        for (let i = 0; i < l; i++) {
            str += (this.props.announcement[i].content + ' ')
        }
        return str
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 35,
        width: width,
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: TCLineW
    },
    label: {
        marginLeft: 3,
        marginRight: 5,
        color: homePageStyle.noticeInfoColor,
        marginTop: 5,
        fontSize: 14,
        width: width,
        backgroundColor: 'white',
        overflow: 'hidden',
    }, marqueeLabel: {
        flex: 1,
        marginLeft: 3,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: '#ffffff',
        width: width - 50,
        height: 40,
        fontSize: 15*px,
        color: homePageStyle.noticeInfoColor,
    }
});
