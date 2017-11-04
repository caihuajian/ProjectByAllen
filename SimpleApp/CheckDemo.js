/**
 * Created by allen-jx on 2017/10/21.
 */
import React, {Component, PropTypes,} from 'react'

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal
} from 'react-native'
class TodoListItem {
    @observable
    title;
    @observable
    finished = false;
    id

    @action
    toggleFinish() {
        this.finished = !this.finished;
    }


}
class TodoListHolder {
    @observable
    dataList = [];
    checkedIndex = -1;

    @computed
    get taskLeft() {
        return this.dataList.filter((it) => !it.finished).length
    }


}

@observer
class TodoList extends Component {
    todoList = new TodoListHolder();
    @observable
    checkedIndex = -1;

    @action
    checked(index) {
        console.warn('===================', index)
        if (index != this.checkedIndex) {
            this.checkedIndex = index
        }
    }

    constructor(props) {
        super(props);
        for (let i = 1; i < 30; i++) {
            let listItem = new TodoListItem();
            listItem.title = `待办事项${i}`;
            listItem.id = i;
            this.todoList.dataList.push(listItem)
        }
    }

    render() {
        return <View {...this.props}>
            <TodoListView todoListHolder={this.todoList} checked={(index) => {
                this.checked(index)
            }}
                          checkedIndex={this.checkedIndex}
            />
            <TodoSumView todoListHolder={this.todoList}/>
        </View>
    }
}
@observer
class TodoListView extends Component {
    ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => {
            return r1 !== r2
        }
    });

    render() {
        return <ListView
            style={{height: Dimensions.get('window').height * 0.9}}
            enableEmptySections={true}
            dataSource={this.ds.cloneWithRows(this.props.todoListHolder.dataList.slice())}
            renderRow={this.renderRow}
        />
    }

    renderRow = (rowData) => {
        return <TodoListItemView rowData={rowData} todoListHolder={this.props.todoListHolder} {...this.props}/>
    }
}

//列表行组件
@observer
class TodoListItemView extends Component {
    renderCount = 0;

    render() {
        this.renderCount++;
        return <TouchableOpacity style={{height: 50, flexDirection: 'row'}}
                                 onPress={() => this.props.checked(this.props.rowData.id)}>
            <Text
                style={{flex: 1}}> {this.props.rowData.title} {this.props.rowData.id === this.props.checkedIndex && '√'}</Text>
            <Text> {this.renderCount}次渲染</Text>
        </TouchableOpacity>
    }
}

//统计组件
@observer
class TodoSumView extends Component {
    render() {
        return <View style={{height: Dimensions.get('window').height * 0.1, backgroundColor: '#e4d3ff'}}>
            <Text>待办事项总数量：{this.props.todoListHolder.taskLeft}</Text>
        </View>
    }
}
