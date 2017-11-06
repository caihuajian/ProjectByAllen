import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ListView,
    ScrollView,
    LayoutAnimation,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';

class ExpandableList2 extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.initData()
    }

    static propTypes = {
        dataSource: PropTypes.array.isRequired,
        headerKey: PropTypes.string,
        memberKey: PropTypes.string,
        renderRow: PropTypes.func,
        renderSectionHeaderX: PropTypes.func,
        renderSectionFooterX: PropTypes.func,
        headerOnPress: PropTypes.func,
        isOpen: PropTypes.bool,
        openOptions: PropTypes.array,
        onlyOpenOne: PropTypes.bool,
        defaultOpen: PropTypes.string
    };

    static defaultProps = {
        headerKey: 'header',
        memberKey: 'member',
        isOpen: false,
        onlyOpenOne: false
    };


    initData() {
        let map = new Map();
        if (this.props.dataSource && this.props.isOpen) {
            this.props.dataSource.map((item, i) => map.set(i.toString(), true))
        } else if (this.props.onlyOpenOne) {
            this.props.dataSource.map((item, i) => {
                if (this.props.defaultOpen && i.toString() === this.props.defaultOpen) {
                    map.set(i.toString(), true)
                } else {
                    map.set(i.toString(), false)
                }
            })
        } else {
            this.props.dataSource.map((item, i) => {
                map.set(i.toString(), false)
            })
        }
        if (this.props.openOptions && !this.props.onlyOpenOne) {
            this.props.openOptions.map((item) => map.set(item.toString(), true))
        }
        this.state = {
            memberOpened: map
        }
    }

    _onPress = (i) => {
        this.setState((state) => {
            const memberOpened = new Map(state.memberOpened);
            state.memberOpened.forEach((value, key) => {
                if (i === key) {
                    memberOpened.set(i, !memberOpened.get(i));
                } else if (this.props.onlyOpenOne) {
                    if (memberOpened.get(key)) {
                        this.scrollToTop()
                        memberOpened.set(key, false);
                    }
                }
            })
            this.scrollToTop()
            return {memberOpened};
        });

        if (this.props.headerOnPress) {
            this.props.headerOnPress(i, this.state.memberOpened.get(i) || false);
        }

        LayoutAnimation.easeInEaseOut();
    };

    scrollToTop() {
        let listView = this.refs.listView
        listView.scrollTo({x: 0, y: 0, animated: true})
    }

    _renderRow = (rowData, sectionId, rowId) => { // eslint-disable-line
        const {renderRow, renderSectionHeaderX, renderSectionFooterX, headerKey, memberKey} = this.props;
        let memberArr = rowData[memberKey];
        if (!this.state.memberOpened.get(rowId) || !memberArr) {
            memberArr = [];
        }

        return (
            <View>
                <TouchableOpacity onPress={() => this._onPress(rowId)}>
                    { renderSectionHeaderX ? renderSectionHeaderX(rowData[headerKey], rowId) : null}
                </TouchableOpacity>
                <ScrollView scrollEnabled={false}>
                    {
                        memberArr.map((rowItem, index) => {
                            return (
                                <View key={index}>
                                    {renderRow ? renderRow(rowItem, index, sectionId) : null}
                                </View>
                            );
                        })
                    }
                    { memberArr.length > 0 && renderSectionFooterX ? renderSectionFooterX(rowData, sectionId) : null }
                </ScrollView>
            </View>
        );
    }

    render() {
        const {dataSource} = this.props;
        return (
            <ListView
                {...this.props}
                ref={'listView'}
                dataSource={this.ds.cloneWithRows(dataSource || [])}
                renderRow={this._renderRow}
                enableEmptySections={true}
            />
        );
    }
}

export default ExpandableList2;