import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'user_token';
const USER_INFO_KEY = 'user_info';

export const authStorage = {
  // 1. 保存 Token 和用户信息
  async setLoginData(token, userInfo) {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
      await AsyncStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
    } catch (e) {
      console.error('保存登录数据失败', e);
    }
  },

  // 2. 获取 Token (用于自动登录)
  async getToken() {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (e) {
      return null;
    }
  },

  // 3. 退出登录 (清除数据)
  async logout() {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(USER_INFO_KEY);
    } catch (e) {
      console.error('退出登录失败', e);
    }
  }
};
