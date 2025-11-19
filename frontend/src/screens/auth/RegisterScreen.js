import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  SafeAreaView 
} from 'react-native';
import { sendVerifyCode, loginOrRegister } from '../../services/authService';

const RegisterScreen = () => {
  // 状态管理
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0); // 倒计时状态
  const [loading, setLoading] = useState(false);

  // 倒计时逻辑：当 countdown > 0 时，每秒减 1
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  // 处理：点击发送验证码
  const handleSendCode = async () => {
    // 简单的手机号正则校验
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      Alert.alert('提示', '请输入正确的11位手机号');
      return;
    }

    try {
      setLoading(true);
      const res = await sendVerifyCode(phone);
      Alert.alert('成功', `验证码已发送 (开发测试: ${res.dev_code})`);
      setCountdown(60); // 需求：60秒倒计时
    } catch (error) {
      Alert.alert('错误', error.message);
    } finally {
      setLoading(false);
    }
  };

  // 处理：点击登录/注册
  const handleLogin = async () => {
    if (phone.length !== 11 || code.length !== 6) {
      Alert.alert('提示', '请填写完整的手机号和验证码');
      return;
    }

    try {
      setLoading(true);
      const data = await loginOrRegister(phone, code);
      Alert.alert('欢迎', `登录成功，用户ID: ${data.user_id}`);
      // TODO: 这里应该跳转到主页 (Home) 并存储 Token
    } catch (error) {
      Alert.alert('登录失败', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>欢迎来到宝妈说</Text>
        <Text style={styles.subtitle}>手机号快捷登录/注册</Text>

        {/* 手机号输入区域 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>手机号</Text>
          <TextInput
            style={styles.input}
            placeholder="请输入11位手机号"
            keyboardType="phone-pad"
            maxLength={11}
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        {/* 验证码输入区域 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>验证码</Text>
          <View style={styles.codeContainer}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="6位数字"
              keyboardType="number-pad"
              maxLength={6}
              value={code}
              onChangeText={setCode}
            />
            {/* 获取验证码按钮 */}
            <TouchableOpacity 
              style={[
                styles.codeButton, 
                (countdown > 0 || loading) && styles.disabledButton
              ]}
              onPress={handleSendCode}
              disabled={countdown > 0 || loading}
            >
              <Text style={styles.codeButtonText}>
                {countdown > 0 ? `${countdown}s后重发` : '获取验证码'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 登录按钮 */}
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>
            {loading ? '处理中...' : '进入社区'}
          </Text>
        </TouchableOpacity>
        
        {/* 1.1.4 隐私协议提示 */}
        <Text style={styles.agreementText}>
          登录即代表您已同意《用户协议》和《隐私政策》
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 24, marginTop: 40 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 40 },
  inputGroup: { marginBottom: 24 },
  label: { fontSize: 14, color: '#333', marginBottom: 8, fontWeight: '500' },
  input: { 
    height: 50, 
    borderWidth: 1, 
    borderColor: '#E5E7EB', 
    borderRadius: 8, 
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#F9FAFB'
  },
  codeContainer: { flexDirection: 'row', gap: 12 },
  codeButton: { 
    width: 110, 
    height: 50, 
    backgroundColor: '#E0F2FE', 
    borderRadius: 8, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  disabledButton: { backgroundColor: '#F3F4F6' },
  codeButtonText: { color: '#0284C7', fontSize: 14, fontWeight: '600' },
  loginButton: { 
    height: 50, 
    backgroundColor: '#2563EB', 
    borderRadius: 25, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#2563EB',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 }
  },
  loginButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  agreementText: { 
    textAlign: 'center', 
    marginTop: 20, 
    color: '#9CA3AF', 
    fontSize: 12 
  }
});

export default RegisterScreen;
