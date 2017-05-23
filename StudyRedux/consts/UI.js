import { Platform, Dimensions, PixelRatio, StatusBar } from 'react-native';

export default class UI {
  static SCREEN_WIDTH = Dimensions.get('window').width
  static SCREEN_HEIGHT = Dimensions.get('window').height
  static DATE_NAVIGATOR = Dimensions.get('window').width * 0.44
  static NAV_BAR_HEIGHT = Platform.select({ android: 54, ios: 64 })
  static TAB_BAR_HEIGHT = 44.5
  static NAV_TITLEVIEW_HEIGHT = Platform.select({ android: 54, ios: 44 })
  static NAV_TITLEVIEW_HEIGHT_AND_STATUS_HEIGHT = Platform.select({ android: 84, ios: 64 })
  static NAV_BAR_BUTTON_GROUP_PADDING_TOP = Platform.select({ android: 0, ios: 17 })
  static ANDROID_STATUS_HEIGHT = Platform.select({ android: StatusBar.currentHeight, ios: 0 })
  static STATUS_HEIGHT = Platform.select({ android: 0, ios: 20 })
  // 在模拟器上运行时，若使用此常量作为线宽，请以100%窗口比观察边界线是否绘制正常
  static PIXEL_SIZE = 1 / PixelRatio.get()

  static GOLDEN_SECTION_HEIGHT = Dimensions.get('window').height * 0.618

  static FILTER_TRSECTED_ITEM_WIDTH = (Dimensions.get('window').width - 16 * 4) / 3.0

  // http://www.webtype.com/info/articles/fonts-weights
  static FontWeight = {
    LIGHT: '200',
    REGULAR: '400',
    MEDIUM: '500',
    SEMIBOLD: '600',
    HEAVY: '800',
  }

  static TabIndex = {
    SUMMARY: 0,
    OPERATIONS: 1,
    GUESTBOOK: 2,
    NOTIFICATION: 3,
    MORE: 4,
  }
}
