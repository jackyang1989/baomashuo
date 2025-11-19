from pydantic import BaseModel, validator
from typing import Optional
from datetime import date

# 基础字段
class BabyBase(BaseModel):
    nickname: str
    gender: str = "未知/保密"
    is_born: bool = True
    birth_date: Optional[date] = None
    due_date: Optional[date] = None

# 创建宝宝时的请求结构
class BabyCreate(BabyBase):
    # 验证规则：如果是已出生，必须传 birth_date；如果是孕期，必须传 due_date
    @validator('birth_date')
    def validate_dates(cls, v, values):
        if values.get('is_born') is True and not v:
            raise ValueError('已出生的宝宝必须填写出生日期')
        return v

# 更新宝宝信息时的结构
class BabyUpdate(BaseModel):
    nickname: Optional[str] = None
    gender: Optional[str] = None
    birth_date: Optional[date] = None
    is_primary: Optional[bool] = None

# 返回给前端的结构
class BabyResponse(BabyBase):
    id: int
    user_id: int
    is_primary: bool
    
    # 计算属性：后端可以直接算出月龄返回给前端，也可以前端算
    # 这里我们只返回基础数据，让前端展示
    
    class Config:
        orm_mode = True
