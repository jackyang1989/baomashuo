from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
# 假设有一个 get_db 依赖
# from backend.app.api.deps import get_db, get_current_user
from backend.app.models.baby import Baby
from backend.app.models.user import User
from backend.app.schemas.baby import BabyCreate, BabyResponse

router = APIRouter()

# 模拟依赖：获取数据库会话 (实际开发中请从 deps 导入)
def get_db():
    from backend.app.db.session import SessionLocal
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 模拟依赖：获取当前登录用户ID (实际开发中会解析 Token)
# 这里为了简化演示，我们假设前端会在 Header 里传 user_id，或者我们先硬编码
def get_current_user_id():
    return 1 # 假设当前是 ID 为 1 的用户

# 接口 1：添加宝宝信息
@router.post("/", response_model=BabyResponse)
def create_baby(
    baby_in: BabyCreate, 
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    # 1. 检查是否是该用户的第一个宝宝
    existing_babies = db.query(Baby).filter(Baby.user_id == user_id).count()
    
    # 2. 如果是第一个，默认设为“当前关注”(is_primary=True)
    is_primary = (existing_babies == 0)
    
    # 3. 创建数据
    db_baby = Baby(
        **baby_in.dict(),
        user_id=user_id,
        is_primary=is_primary
    )
    db.add(db_baby)
    db.commit()
    db.refresh(db_baby)
    
    print(f"==> [Database] 用户 {user_id} 添加了宝宝: {db_baby.nickname}")
    return db_baby

# 接口 2：获取宝宝列表
@router.get("/", response_model=List[BabyResponse])
def read_babies(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    babies = db.query(Baby).filter(Baby.user_id == user_id).all()
    return babies
