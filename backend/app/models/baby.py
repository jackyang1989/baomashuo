from sqlalchemy import Column, Integer, String, Date, Boolean, ForeignKey, Enum
from sqlalchemy.orm import relationship
from backend.app.db.base_class import Base
import enum

# 定义性别枚举
class GenderType(str, enum.Enum):
    MALE = "男"
    FEMALE = "女"
    UNKNOWN = "未知/保密"

class Baby(Base):
    __tablename__ = "babies"

    id = Column(Integer, primary_key=True, index=True)
    # 关联用户ID (外键)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # 1.2.4 需求：昵称
    nickname = Column(String(50), nullable=False)
    
    # 1.2.4 需求：性别
    gender = Column(String(10), default=GenderType.UNKNOWN)
    
    # 状态：True=已出生, False=孕期中 (对应 1.2.1 和 1.2.2)
    is_born = Column(Boolean, default=True)
    
    # 1.2.2 需求：出生日期 (已出生必填)
    birth_date = Column(Date, nullable=True)
    
    # 1.2.1 需求：预产期 (孕期必填)
    due_date = Column(Date, nullable=True)
    
    # 1.2.3 需求：是否为当前关注的宝宝 (默认显示这个宝宝的内容)
    is_primary = Column(Boolean, default=False)
    
    # 反向关联：方便通过 user.babies 找到所有宝宝
    owner = relationship("User", backref="babies")
