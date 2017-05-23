import { AppRegistry } from 'react-native';

import UIExtenstions from './extensions';

UIExtenstions.init();

AppRegistry.registerComponent('StudyRedux', () => require('./StudyRedux').default);

