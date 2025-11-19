from pydantic import BaseModel, Field, validator
import re

# 用于发送验证码的请求结构
class SendCodeRequest(BaseModel):
    phone: str = Field(..., description="11位手机号")

    # 1.1.1 验证规则：手机号格式正则校验
    @validator('phone')
    def validate_phone(cls, v):
        if not re.match(r"^1[3-9]\d{9}$", v):
            raise ValueError('手机号格式不正确')
        return v

# 用于用户注册的请求结构
class UserRegisterRequest(BaseModel):
    phone: str = Field(..., description="11位手机号")
    code: str = Field(..., min_length=6, max_length=6, description="6位数字验证码")
    
    # 1.1.1 验证规则：验证码必须是数字
    @validator('code')
    def validate_code(cls, v):
        if not v.isdigit():
            raise ValueError('验证码必须为数字')
        return v

# 登录成功后的响应结构
class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user_id: int
    nickname: str = None
