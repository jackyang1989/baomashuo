import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';

// 引入页面
import RegisterScreen from './src/screens/auth/RegisterScreen';
// 暂时先写一个简单的占位首页，后面会替换成真实的“宝宝信息填写页”
import HomeScreen from './src/screens/home/HomeScreen'; 
import { authStorage } from './src/utils/storage';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  // App 启动时检查是否已登录
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await authStorage.getToken();
        setUserToken(token);
      } catch (e) {
        console.log('恢复Token失败');
      }
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  // 等待检查登录状态时的加载动画
  if (isLoading) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken == null ? (
          // 没登录：显示注册页
          <Stack.Screen name="Register">
            {props => (
              <RegisterScreen 
                {...props} 
                // 传递一个回调函数，登录成功后更新 App 状态
                onLoginSuccess={(token) => setUserToken(token)} 
              />
            )}
          </Stack.Screen>
        ) : (
          // 已登录：显示首页 (或者下一步：宝宝信息填写)
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
