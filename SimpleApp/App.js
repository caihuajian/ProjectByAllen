/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    AppRegistry,
    Button,
    TextInput,
    TouchableOpacity,
    ListView,
    Dimensions
} from 'react-native';
import {observer} from 'mobx-react/native'
import {observable, computed, action} from 'mobx'
import ListPage from './TestListPage2'
import {StackNavigator} from 'react-navigation'
import  {TabNavigator} from 'react-navigation'
import {NavigationActions} from 'react-navigation'
import {Actions, Router, Scene} from 'react-native-router-flux'
// import FriendsList from './FriendsList'
// import ExpandableList from './ExpandListView'
import DictStyle from './StyleDict';
import Menu from './Menu'
import ExpandableList2 from './ExpandableList2'
import Data from './mockData'
/*const resetActions = NavigationActions.reset({
 index: 0,
 actions: [NavigationActions.navigate({routeName: 'Home'})]
 });

 const backAction = NavigationActions.back({
 key: 'Home'
 })

 class App extends Component<{}> {
 // static navigationOptions = {
 //     header: null
 // }

 constructor(props) {
 super(props)
 this.state = {
 money: 0
 }
 }

 render() {
 const {navigate} = this.props.navigation;
 return (
 <View style={styles.container}>
 <Text style={styles.welcome}>
 Welcome to React Native!
 </Text>
 <TextInput

 placeholderTextColor={'#ccc'}
 underlineColorAndroid='transparent'
 style={{width: 200}}
 keyboardType={'numeric'}
 value={1000}
 onChangeText={(text) => this.changeText(text)}/>
 <TouchableOpacity
 onPress={() => {
 this.changeText(null, true)
 }}>
 <Text style={{
 borderWidth: 0.5,
 padding: 8,
 borderRadius: 3,
 marginRight: 10
 }}>全部提现</Text>
 </TouchableOpacity>
 </View>
 );
 }

 changeText(text, isall) {
 if (isall) {
 this.setState({
 money: 10000
 })
 } else {
 this.setState({money: text})
 }
 }
 }

 class ChatScreen extends Component {
 // static navigationOptions = ({navigation}) => ({
 //     title: `Chat with ${this.props.name} `,
 //     headerRight: <Button title="Info" onPress=""/>
 // })

 render() {
 return (
 <View>
 <Text>Chat with {this.props.userName}</Text>
 <Button title="gotoNext" onPress={() => {
 //this.props.navigation.navigate('Recent')
 Actions.recent()
 }}/>
 </View>)
 }
 }
 class RecentChatScreen extends Component {
 render() {
 return (<View>
 <Text>List of recent chats</Text>
 <Button title="gotoBack" onPress={() => {
 // this.props.navigation.dispatch(backAction)
 Actions.popTo('app')
 }}/></View>)
 }
 }

 class AllContactsScreen extends Component {
 render() {
 return <Text>List of all contacts</Text>
 }
 }
 const MainScreenNavigator = TabNavigator({
 App: {
 screen: App,

 },
 All: {screen: AllContactsScreen}
 })
 export const Simple = StackNavigator({
 Home: {screen: MainScreenNavigator},
 Chat: {screen: ChatScreen},
 Recent: {screen: RecentChatScreen}
 })

 const scenes = Actions.create(
 <Scene key="root">
 <Scene key="app" component={App} title="app"/>
 <Scene key="chat" component={ChatScreen} title="chat"/>
 <Scene key="recent" component={RecentChatScreen} title="recent"/>
 </Scene>
 );
 */

class Test extends React.PureComponent {
    render() {
        return <ExpandableList2
            dataSource={Data.workbenchData}
            headerKey="title"
            memberKey="member"
            renderRow={this._renderRow}
            renderSectionHeaderX={this._renderSection}
            onlyOpenOne={true}
            defaultOpen={'2'}
        />
    }

    _renderRow = (rowItem, rowId, sectionId) => (
        <TouchableOpacity key={rowId} onPress={() => {
        }}>
            <View
                style={{
                    alignItems: 'center', margin: 5, padding: 5,
                    borderWidth: 0.5, borderColor: DictStyle.colorSet.lineColor
                }}
            >
                <Text style={{fontSize: DictStyle.fontSet.mSize, color: DictStyle.colorSet.normalFontColor}}>
                    {rowItem.title}
                </Text>
            </View>
        </TouchableOpacity>
    );

    _renderSection = (section, sectionId) => {
        return (
            <View
                style={{
                    marginVertical: 10, marginHorizontal: 15, height: 30, flexDirection: 'row',
                    justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 0.5,
                    borderBottomColor: DictStyle.colorSet.lineColor
                }}
            >
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: DictStyle.fontSet.mSize, color: DictStyle.colorSet.normalFontColor}}>
                        {section}
                    </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: DictStyle.fontSet.xSize, color: DictStyle.colorSet.weakFontColor}}>
                        {'更多 '}
                    </Text>
                </View>
            </View>
        );
    };
}

AppRegistry.registerComponent('SimpleApp', () => Test);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
