import random
import string
from datetime import datetime, timedelta

# 模拟内存缓存 (实际开发中应替换为 Redis)
# 格式: {'13800000000': {'code': '123456', 'expire_time': datetime_obj}}
fake_redis_cache = {}

def generate_verification_code(length=6):
    """
    1.1.1 安全措施：验证码采用6位随机数字
    """
    return ''.join(random.choices(string.digits, k=length))

def save_code_to_cache(phone: str, code: str):
    """
    1.1.1 技术实现：缓存存储验证码，有效期5分钟 (300秒)
    """
    expire_time = datetime.now() + timedelta(minutes=5)
    fake_redis_cache[phone] = {
        "code": code,
        "expire_time": expire_time,
        "last_sent": datetime.now() # 用于60秒防刷校验
    }
    print(f"==> [模拟Redis] 手机号 {phone} 的验证码是: {code}, 过期时间: {expire_time}")

def verify_code(phone: str, input_code: str) -> bool:
    """
    校验验证码逻辑
    """
    record = fake_redis_cache.get(phone)
    
    if not record:
        return False # 无记录
        
    if datetime.now() > record['expire_time']:
        return False # 已过期
        
    if record['code'] != input_code:
        return False # 验证码错误
        
    # 验证通过后清除，防止二次使用
    del fake_redis_cache[phone]
    return True

def check_resend_limit(phone: str) -> bool:
    """
    1.1.1 验证规则：同一手机号60秒内只能发送1次
    """
    record = fake_redis_cache.get(phone)
    if record:
        time_diff = datetime.now() - record['last_sent']
        if time_diff.total_seconds() < 60:
            return False # 距离上次发送不足60秒
    return True
