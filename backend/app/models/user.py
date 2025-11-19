from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.sql import func
from backend.app.db.base_class import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    # 1.1.1 需求：输入手机号（11位）
    phone = Column(String(11), unique=True, index=True, nullable=False)
    # 1.1.3 需求：密码设置 (存储加密后的哈希值)
    hashed_password = Column(String(255), nullable=True)
    
    # 1.1.3 需求：用户名/昵称
    nickname = Column(String(30), index=True)
    # 头像 URL
    avatar = Column(String(255))
    
    # 1.1.2 需求：微信登录关联字段
    wechat_openid = Column(String(100), unique=True, index=True, nullable=True)
    
    # 账户状态
    is_active = Column(Boolean(), default=True)
    # 实名认证状态 (对应 1.3 模块)
    is_verified = Column(Boolean(), default=False)
    
    # 创建时间 (对应 1.1.1 需求：created_at)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
