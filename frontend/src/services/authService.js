// 定义后端的基础地址
// 注意：Android模拟器访问本机需用 10.0.2.2，真机需用局域网IP，iOS模拟器用 localhost
const API_URL = 'http://127.0.0.1:8000/api/auth'; 

/**
 * 发送验证码
 * @param {string} phone - 11位手机号
 */
export const sendVerifyCode = async (phone) => {
  try {
    const response = await fetch(`${API_URL}/send-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone }),
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || '发送失败');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * 登录/注册
 * @param {string} phone 
 * @param {string} code 
 */
export const loginOrRegister = async (phone, code) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, code }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || '登录失败');
    }
    return data;
  } catch (error) {
    throw error;
  }
};
