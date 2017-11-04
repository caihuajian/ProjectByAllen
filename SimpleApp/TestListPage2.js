import React, {Component, PropTypes} from 'react'
import {
    View,
    Dimensions,
    ListView,
    TouchableOpacity,
} from 'react-native'

let {width, height} = Dimensions.get('window');
import {observer} from 'mobx-react';
import CarItem from './CartItem';
import CarItemState from './CarItemState';
const store = new CarItemState();

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

@observer
export default class TestListPage2 extends Component {

    //构造函数
    constructor(props) {
        super(props)

        this.state = {
            dataSource: [],
        }
    }


    componentDidMount() {
        //模拟请求后台返回的数据
        setTimeout(() => {
            //默认选中第二个
            let responseData = [{id: 100,checked:false}, {id: 101,checked:true}, {id: 102,checked:false}]
            store.initData(responseData);
            this.setState({
                dataSource: responseData
            });
        }, 2000);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ListView
                    enableEmptySections={true}
                    renderRow={this.renderRow}
                    dataSource={ds.cloneWithRows(this.state.dataSource)}/>
            </View>
        );
    }


    renderRow = (rowData, sectionID, rowID, highlightRow) => {
        return (
            <CarItem  selectIndex={1}  data={store.list[rowID]} key={rowID} store={store} onPress={this.onPress}/>
        )
    }

    onPress = (arrayIDS)=> {
        console.warn(arrayIDS.join('-'))
    }

}
