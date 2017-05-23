import { init as initPlatform } from './Platform';

export default class extensions {
  static init = () => {
    initPlatform();
  }
}
