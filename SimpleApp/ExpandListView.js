/**
 * Created by allen-jx on 2017/11/3.
 */
import React, {Component, PropTypes,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    Dimensions,
    ScrollView
} from 'react-native'

import {observer} from 'mobx-react/native'
import {observable, computed, action} from 'mobx'
import Accordion from 'react-native-collapsible/Accordion';
/**
 *
 */

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

@observer
export default class ExpandListView extends Component {
    @observable
    titleList = [{title: 'Family', hide: true},
        {title: 'Friends', hide: true}, {
            title: 'Students',
            hide: true
        }, {title: 'Others', hide: true},
        {title: 'GoodFriends', hide: true},
        {title: 'Girls', hide: true},
        {
            title: 'Boys',
            hide: true
        }, {title: 'Mans', hide: true}]
    @observable
    sourceData = {
        "Family": [{name: 'aa'}, {name: 'bb'}, {name: 'cc'},
            {name: 'dd'}, {name: 'ee'}, {name: 'bb'},
            {name: 'bb'}, {name: 'bb'}, {name: 'bb'},
            {name: 'bb'}, {name: 'bb'}, {name: 'bb'}
            , {name: 'bb'}
            , {name: 'bb'}
            , {name: 'bb'}
            , {name: 'bb'}
            , {name: 'bb'}
            , {name: 'bb'}
            , {name: 'bb'}
            , {name: 'bb'}
            , {name: 'bb'}],
        "Friends": [{name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'},
            {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'},
            {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'},
            {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'},
            {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}
            , {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}
            , {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}
            , {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}
            , {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}],
        "Students": [{name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'},
            {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'},
            {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'},
            {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'},
            {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}
            , {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}
            , {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}
            , {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}
            , {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}],
        "Others": [{name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'},
            {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'},
            {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'},
            {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'},
            {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}
            , {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}
            , {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}
            , {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}
            , {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}],
        "GoodFriends": [{name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'},
            {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'},
            {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'},
            {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'},
            {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}
            , {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}
            , {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}
            , {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}
            , {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}],
        "Girls": [{name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'},
            {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'},
            {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'},
            {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'},
            {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}
            , {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}
            , {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}
            , {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}],
        "Boys": [{name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'},
            {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'},
            {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'},
            {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'},
            {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}
            , {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}
            , {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}
            , {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}
            , {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}],
        "Mans": [{name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'},
            {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'},
            {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'},
            {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'},
            {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}
            , {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}
            , {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}
            , {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}
            , {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}, {name: 'sbb'}]
    }


    @action
    clickPayTypeTitle(item) {
        this.titleList.map((payType, index) => {
            if (payType.title === item.title) {
                this.titleList[index].hide = !this.titleList[index].hide;
            } else {
                if (!this.titleList[index].hide) {
                    this.titleList[index].hide = true
                }
            }
        })
    }

    scrollTop(index) {
        let scrollView = this.refs.scrollView
        console.log('===========s=', this.headView[index])
        scrollView.scrollTo({x: 0, y: 0, animated: true})
    }

    static propTypes = {}

    static defaultProps = {}

    constructor(props) {
        super(props)
        this.headView = []
    }

    SECTIONS = [
        {
            title: 'Family',
            content: 'Lorem ipsum...',
        },
        {
            title: 'Friends',
            content: 'Lorem ipsum...',
        },
        {
            title: 'Students',
            content: 'Lorem ipsum...',
        },
        {
            title: 'Others',
            content: 'Lorem ipsum...',
        },
        {
            title: 'GoodFriends',
            content: 'Lorem ipsum...',
        },
        {
            title: 'Girls',
            content: 'Lorem ipsum...',
        },
        {
            title: 'Boys',
            content: 'Lorem ipsum...',
        },
        {
            title: 'Mans',
            content: 'Lorem ipsum...',
        }
    ];

    render() {
        return (
            <View>
                {/*<ScrollView ref='scrollView'>*/}
                {/*<View onLayout={this.onContainerLayout}>*/}
                {/*{this.getContentView()}*/}
                {/*</View>*/}
                {/*</ScrollView>*/}
                <ScrollView>
                    <Accordion sections={this.SECTIONS}
                               renderHeader={this.renderHeader}
                               renderContent={(section) => this.renderContent(section)}/>
                </ScrollView>
            </View>
        )
    }

    renderContent(section) {
        let listItem = []
        let rows = this.sourceData[section.title]
        rows.map((rowItem) => {
            listItem.push(this.renderFriendRow(rowItem))
        })
        return ( <View>
            {listItem}
        </View>)
    }

    onContainerLayout(e) {
        let params = e.nativeEvent.layout
    }

    onTitleViewLayout(e, index) {
        let params = e.nativeEvent.layout
        this.headView[index] = params.y
        console.log('==========onTitleViewLayout=', params)
    }

    getContentView() {
        let list = []
        this.titleList.map((item, index) => {
            list.push(this.renderSectionHeader(item, index))
        })
        return list
    }

    renderSectionHeader(item, index) {
        let listItem = []
        if (!item.hide) {
            let rows = this.sourceData[item.title]
            rows.map((rowItem) => {
                listItem.push(this.renderFriendRow(rowItem))
            })
        }
        return (<View
                onLayout={(e) => this.onTitleViewLayout(e, index)}
            >
                <TouchableOpacity
                    key={'000' + item.title}
                    style={styles.sectionHeader}
                    onPress={() => {
                        this.scrollTop(index)
                        this.clickPayTypeTitle(item)
                    }}>
                    <Text style={{color: 'black'}}>{item.title}</Text>
                </TouchableOpacity>
                {listItem}
            </View>
        )
    }

    renderHeader(section) {
        return (<View style={styles.sectionHeader}><Text style={{color: 'black'}}>{section.title}</Text></View>)
    }

    renderFriendRow(item) {
        return (
            <View style={styles.sectionHeader}
                  key={'000' + item.name}>
                <Text>{item.name}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, sectionHeader: {
        width: SCREEN_WIDTH,
        height: 44,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderBottomWidth: 0.5,
        borderColor: '#d9d9d9'
    }
})