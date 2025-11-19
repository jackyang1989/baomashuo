import { authStorage } from '../utils/storage';

// 注意：这里要把 user_id 传过去，或者在 headers 里带 Token
// 开发阶段为了配合后端那个模拟的 get_current_user_id，我们暂时不做复杂认证头
const API_URL = 'http://127.0.0.1:8000/api/babies'; 

export const addBaby = async (babyData) => {
  try {
    const response = await fetch(`${API_URL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}` // 实际开发中需要加 Token
      },
      body: JSON.stringify(babyData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || '添加宝宝信息失败');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const getBabies = async () => {
  try {
    const response = await fetch(`${API_URL}/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
