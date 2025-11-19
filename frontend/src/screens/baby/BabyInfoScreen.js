import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Switch 
} from 'react-native';
import { addBaby } from '../../services/babyService';

const BabyInfoScreen = ({ navigation }) => {
  // 状态管理
  const [nickname, setNickname] = useState('');
  const [isBorn, setIsBorn] = useState(true); // 默认已出生
  const [dateInput, setDateInput] = useState('2023-10-01'); // 暂时用文本框模拟日期选择器
  const [gender, setGender] = useState('未知/保密');

  const handleSubmit = async () => {
    if (!nickname) {
      Alert.alert('提示', '请给宝宝起个昵称吧');
      return;
    }

    // 构造发送给后端的数据
    const payload = {
      nickname,
      gender,
      is_born: isBorn,
      // 根据状态，将日期赋值给 birth_date 或 due_date
      birth_date: isBorn ? dateInput : null,
      due_date: !isBorn ? dateInput : null
    };

    try {
      await addBaby(payload);
      Alert.alert('太棒了', '宝宝信息添加成功！', [
        { text: '进入首页', onPress: () => navigation.replace('Home') }
      ]);
    } catch (error) {
      Alert.alert('错误', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>告诉我们要照顾谁？</Text>
      <Text style={styles.subtitle}>我们将根据宝宝的阶段提供专属内容</Text>

      {/* 1. 状态切换：已出生 vs 孕期 */}
      <View style={styles.switchContainer}>
        <Text style={[styles.switchText, isBorn && styles.activeText]}>宝宝已出生</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={!isBorn ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={() => setIsBorn(!isBorn)}
          value={!isBorn} // 开关状态取反逻辑略显别扭，实际可用两个按钮代替
        />
        <Text style={[styles.switchText, !isBorn && styles.activeText]}>孕期中</Text>
      </View>

      {/* 2. 昵称输入 */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>宝宝昵称 / 小名</Text>
        <TextInput
          style={styles.input}
          placeholder="例如：小糯米"
          value={nickname}
          onChangeText={setNickname}
        />
      </View>

      {/* 3. 日期输入 (1.2.1 & 1.2.2) */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          {isBorn ? '出生日期' : '预产期'}
        </Text>
        {/* 注意：实际开发中这里应该用 DatePicker 组件 */}
        <TextInput
          style={styles.input}
          placeholder="格式：YYYY-MM-DD"
          value={dateInput}
          onChangeText={setDateInput}
        />
        <Text style={styles.hint}>
          {isBorn 
            ? '我们将根据出生日期计算宝宝月龄' 
            : '我们将根据预产期计算孕周'}
        </Text>
      </View>

      {/* 4. 性别选择 (仅在已出生时显示较合理，但孕期也可选) */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>性别</Text>
        <View style={styles.genderContainer}>
          {['男', '女', '未知/保密'].map((g) => (
            <TouchableOpacity 
              key={g}
              style={[styles.genderBtn, gender === g && styles.genderBtnActive]}
              onPress={() => setGender(g)}
            >
              <Text style={[styles.genderText, gender === g && styles.genderTextActive]}>
                {g}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 提交按钮 */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitBtnText}>开启育儿之旅</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff', paddingTop: 60 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 30 },
  switchContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  switchText: { fontSize: 16, color: '#999', marginHorizontal: 10 },
  activeText: { color: '#2563EB', fontWeight: 'bold' },
  inputGroup: { marginBottom: 24 },
  label: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: 10 },
  input: { 
    height: 50, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, 
    paddingHorizontal: 15, fontSize: 16, backgroundColor: '#F9FAFB' 
  },
  hint: { fontSize: 12, color: '#999', marginTop: 5 },
  genderContainer: { flexDirection: 'row', gap: 10 },
  genderBtn: { 
    flex: 1, height: 40, justifyContent: 'center', alignItems: 'center', 
    borderWidth: 1, borderColor: '#ddd', borderRadius: 20 
  },
  genderBtnActive: { backgroundColor: '#EFF6FF', borderColor: '#2563EB' },
  genderText: { color: '#666' },
  genderTextActive: { color: '#2563EB', fontWeight: 'bold' },
  submitBtn: { 
    height: 54, backgroundColor: '#2563EB', borderRadius: 27, 
    justifyContent: 'center', alignItems: 'center', marginTop: 20 
  },
  submitBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});

export default BabyInfoScreen;
