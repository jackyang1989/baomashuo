import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { authStorage } from '../../utils/storage';

const HomeScreen = ({ navigation }) => {
  
  const handleLogout = async () => {
    await authStorage.logout();
    // 这里可以通过重加载 App 或者使用 Context 更新状态来退回到登录页
    // 简单起见，我们在真实 App.js 中通常会传递 setToken 方法下来，或者使用 Context
    alert("请重启 App 以查看退出效果 (开发阶段临时方案)");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>登录成功！</Text>
      <Text style={styles.subText}>这里是主要功能区</Text>
      <Text style={styles.subText}>下一步：开发 1.2 宝宝信息填写</Text>
      
      <TouchableOpacity style={styles.btn} onPress={handleLogout}>
        <Text style={styles.btnText}>退出登录</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f9ff' },
  text: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  subText: { fontSize: 16, color: '#666', marginTop: 10 },
  btn: { marginTop: 50, padding: 15, backgroundColor: '#ff4444', borderRadius: 8 },
  btnText: { color: '#fff', fontWeight: 'bold' }
});

export default HomeScreen;
