/**
 * Created by allen-jx on 2017/10/28.
 */
import React, {Component, PropTypes,} from 'react'

import {
    View,
    StyleSheet,
} from 'react-native'
import ReactExpandableListView from 'react-expandable-listview'
const DATA = [
    {
        headerName: 'ListA',
        isOpened: true,
        // isReactComponent: false,
        items: [{
            title: 'items1'
        },
            {
                title: 'items2'
            },
            {
                title: 'items3'
            },
            {
                title: 'items4'
            },
            {
                title: 'items5'
            },
            {
                title: 'items6'
            }],
        height: 120
    },
    {
        headerName: 'ListB is bravo',
        isOpened: true,
        // isReactComponent: false,
        items: [{
            title: 'items1'
        },
            {
                title: 'items2'
            },
            {
                title: 'items3'
            },
            {
                title: 'items4'
            },
            {
                title: 'items5'
            },
            {
                title: 'items6'
            }],
        height: 120
    },
    {
        headerName: 'ListC is Charlie',
        isOpened: true,
        // isReactComponent: false,
        items: [{
            title: 'items1'
        },
            {
                title: 'items2'
            },
            {
                title: 'items3'
            },
            {
                title: 'items4'
            },
            {
                title: 'items5'
            },
            {
                title: 'items6'
            }],
        height: 120
    },
    {
        headerName: 'ListD is Dynamic',
        isOpened: true,
        isReactComponent: false,
        items: [{
            title: 'items1'
        },
            {
                title: 'items2'
            },
            {
                title: 'items3'
            },
            {
                title: 'items4'
            },
            {
                title: 'items5'
            },
            {
                title: 'items6'
            }],
        height: 120
    },
    {
        headerName: 'ListE',
        isOpened: true,
        isReactComponent: false,
        items: [{
            title: 'items1'
        },
            {
                title: 'items2'
            },
            {
                title: 'items3'
            },
            {
                title: 'items4'
            },
            {
                title: 'items5'
            },
            {
                title: 'items6'
            }],
        height: 120
    }
]

/**
 * 提示对话框
 */
export default class ComponentName extends Component {

    // 构造函数
    constructor(props) {

        super(props)

        this.state = {}
    }

    render() {
        return (
            <ReactExpandableListView
                data={DATA}
                headerAttName="headerName"
                itemsAttName="items"
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})