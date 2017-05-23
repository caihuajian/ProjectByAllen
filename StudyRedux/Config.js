export default class Config {
  static appVersion = '3.8.0'
  static appStoreVersion = '1.9'
  // 自动打包时会替换为打包时间，ISO 8601 格式
  static buildTime = '{buildTime}'
  // 生产环境打包时会自动修改为 true
  static isProductionRelease = false
  static appStoreReviewDemoRestaurantName = '测试餐厅1'
  static appStoreReviewEnv = 'staging'
  static bugsnagApiKey = 'ab0520bd752bdeaaa53ea8daca7723e4'
}
