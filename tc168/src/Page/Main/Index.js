/**
 * Created by Sam on 2016/12/29.
 */
import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    Alert,
    Image,
    TouchableOpacity
} from 'react-native';

import Main from './TCMain';
import UserData from '../../Data/UserData'
import Storage from '../../Common/Storage/TCStorage'
import CodePush from 'react-native-code-push'
import LaunchImage from './TCLaunchImage'
import * as Progress from 'react-native-progress';
import {config,AppName} from '../../Common/Network/TCRequestConfig';
import TopNavigationBar from '../../Common/View/TCNavigationBar';
import TCInitHelperC from '../../Common/JXHelper/TCInitHelper'
import TCUserCollectHelper from '../../Common/JXHelper/TCUserCollectHelper'
import NetUitls from '../../Common/Network/TCRequestUitls'
import Toast from '@remobile/react-native-toast';
import Base64 from '../../Common/JXHelper/Base64'
let TCInitHelper = new TCInitHelperC()
let UserCollectHelper = new TCUserCollectHelper()
let NavigatorHelper = require('../../Common/JXHelper/TCNavigatorHelper')

var isUpDateNewApp = false;

export default class TC168 extends Component {

    constructor() {
        super();
        this.state = {
            updateFinished: false,
            syncMessage: "初始化配置中..."
        };
    }

    componentDidMount() {
        TCInitHelper.getDefaultDomainCacheData((e) => {
            JXLog('')
        })

        TCInitHelper.checkDomain((e) => {
            if (e == 'ErrorNetwork') {
                this.setUpdateFinished()
                this.sync()
            } else {
                if (e) {
                    if (__DEV__) {
                        this.setUpdateFinished()
                    } else {
                        this.setUpdateFinished()
                        this.sync()
                    }
                } else {
                    this.setUpdateFinished()
                }
            }
        })
        TCInitHelper.getUserData()
        if (TC_LOGINED_USER_NAME && TC_LOGINED_USER_NAME.length == 0) {
            TCInitHelper.getLoginUserNames()
        }

        if (TCUSER_COLLECT) {
            UserCollectHelper.getUserCollects()
        }

        TCInitHelper.getButtonSoundStatus();

    }

    componentWillUnmount() {
    }

    domainCheckFinish() {
        if (!isUpDateNewApp) {
            this.checkIpInfo()
        } else {
            this.setUpdateFinished()
        }
    }

    setUpdateFinished() {
        this.setState({
            syncMessage: "已安装最新更新包.",
            progress: false,
            updateFinished: true
        });
    }

    checkIpInfo() {
        let url = (TCInitHelper.baseDomain ? TCInitHelper.baseDomain : TCInitHelper.defaultBaseDomain) + config.api.checkIpInfo
        NetUitls.getUrlAndParamsAndCallback(url, null, (data) => {
            if (data && data.rs && data.content.allowAppUpdate) {
                JXLog('checkIpInfo allowAppUpdate ' + url)
                this.sync()
            } else {
                this.setState({
                    syncMessage: "已安装最新更新包.",
                    progress: false,
                    updateFinished: true
                });
            }
        })
    }

    sync() {
        CodePush.sync({
                installMode: CodePush.InstallMode.IMMEDIATE,
                checkFrequency: CodePush.CheckFrequency.MANUAL
            },
            this.codePushStatusDidChange.bind(this),
            this.codePushDownloadDidProgress.bind(this)
        );
        CodePush.allowRestart()
    }

    render() {
        if (!this.state.updateFinished) {
            return this.getLoadingView();
        } else {
            return ( < Navigator initialRoute={
                {
                    name: '启动页',
                    component: Main
                }
                }
                                 configureScene={
                                     () => {
                                         return Navigator.SceneConfigs.PushFromRight;
                                     }
                                 }
                                 renderScene={
                                     (route, navigator) => {
                                         let Compoment = route.component;
                                         NavigatorHelper.setNavigator(navigator)
                                         return <Compoment {...route.passProps} navigator={navigator}/>
                                     }
                                 }
                />
            );
        }
    }

    codePushDownloadDidProgress(progress) {
        this.setState({
            progress
        });
    }

    codePushStatusDidChange(syncStatus) {
        switch (syncStatus) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE: {
                this.setState({
                    syncMessage: "初始化配置中..."
                });
            }
                break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE: {
                this.setState({
                    syncMessage: "下载最新配置",
                    updateFinished: false
                });
            }
                break;
            case CodePush.SyncStatus.AWAITING_USER_ACTION: {
                this.setState({
                    syncMessage: "Awaiting user action."
                });
            }
                break;
            case CodePush.SyncStatus.INSTALLING_UPDATE: {
                this.setState({
                    syncMessage: "安装中..."
                });
            }
                break;
            case CodePush.SyncStatus.UP_TO_DATE: {
                this.setState({
                    syncMessage: "升级成功.",
                    progress: false,
                    updateFinished: true
                });
            }
                break;
            case CodePush.SyncStatus.UPDATE_IGNORED: {
                this.setState({
                    syncMessage: "Update cancelled by user.",
                    progress: false,
                    updateFinished: true
                });
            }
                break;
            case CodePush.SyncStatus.UPDATE_INSTALLED: {
                this.setState({
                    syncMessage: "已安装最新更新包.",
                    progress: false,
                    updateFinished: true
                });
            }
                break;
            case CodePush.SyncStatus.UNKNOWN_ERROR: {
                this.setState({
                    syncMessage: "网络错误.",
                    progress: false,
                    updateFinished: true
                });

                // Alert.alert(
                //     '网络链接失败，请检查网络是否异常？', null, [{
                //         text: '重试',
                //         onPress: () => {
                //             this.sync()
                //         }
                //     }, {
                //         text: '取消',
                //         onPress: () => JXLog('clear')
                //     },])
            }
                break;
            case CodePush.SyncStatus.SYNC_IN_PROGRESS: {
                this.setState({
                    syncMessage: "初始化中....",
                    progress: false
                });
            }
                break;
        }
    }

    getLoadingView() {
        let progressView;
        if (this.state.progress) {
            progressView = (
                <Text style={{fontSize: 16, marginBottom: 20}}>
                    更新中 { (parseFloat(this.state.progress.receivedBytes / this.state.progress.totalBytes).toFixed(2) * 100).toFixed(1)}%</Text>
            );
        } else {
            return <View style={styles.launchImageStyle}>
                <TopNavigationBar title={AppName} needBackButton={false}/>
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <Text style={{fontSize: 16}}>{this.state.syncMessage}</Text>
                </View>
            </View>
        }
        return (
            <View style={styles.launchImageStyle}>
                <TopNavigationBar title={AppName} needBackButton={false}/>
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    {progressView}
                    <Progress.Bar
                        progress={(this.state.progress.receivedBytes / this.state.progress.totalBytes).toFixed(2)}
                        width={200}/>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    launchImageStyle: {
        flex: 1
    },

    messages: {
        textAlign: "center",
    },
    restartToggleButton: {
        color: "blue",
        fontSize: 17
    },
    syncButton: {
        color: "green",
        fontSize: 17
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    },
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        paddingTop: 50
    },
});


TC168 = CodePush({
    checkFrequency: CodePush.CheckFrequency.MANUAL,
    installMode: CodePush.InstallMode.IMMEDIATE
})(TC168);

AppRegistry.registerComponent('TC168', () => TC168);