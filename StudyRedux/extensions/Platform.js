import { Platform } from 'react-native';

export const init = () => {
  Platform.isAndroid = function () {
    return Platform.OS === 'android';
  };

  Platform.isIOS = function () {
    return Platform.OS === 'ios';
  };
};