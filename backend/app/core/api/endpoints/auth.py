from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from backend.app.schemas.auth import SendCodeRequest, UserRegisterRequest, TokenResponse
from backend.app.core.utils import generate_verification_code, save_code_to_cache, check_resend_limit, verify_code
from backend.app.models.user import User
# 假设有一个 get_db 依赖用于获取数据库会话
# from backend.app.api.deps import get_db 

router = APIRouter()

# 接口 1：发送验证码
# POST /api/auth/send-code
@router.post("/send-code")
def send_verification_code(request: SendCodeRequest):
    # 1. 防刷校验：60秒限制
    if not check_resend_limit(request.phone):
        raise HTTPException(status_code=429, detail="请求过于频繁，请60秒后再试")
    
    # 2. 生成6位验证码
    code = generate_verification_code()
    
    # 3. 存入缓存 (Redis)
    save_code_to_cache(request.phone, code)
    
    # 4. 调用短信API (此处仅打印模拟)
    print(f"==> [SMS Service] 向 {request.phone} 发送短信验证码: {code}")
    
    return {"message": "验证码发送成功", "dev_code": code} # dev_code仅用于开发调试

# 接口 2：手机号注册/登录
# POST /api/auth/register
@router.post("/register", response_model=TokenResponse)
def register_or_login(request: UserRegisterRequest): # db: Session = Depends(get_db)
    # 1. 校验验证码
    if not verify_code(request.phone, request.code):
        raise HTTPException(status_code=400, detail="验证码错误或已过期")
    
    # 2. 检查数据库中是否存在用户 (伪代码)
    # user = db.query(User).filter(User.phone == request.phone).first()
    user = None # 假设目前没查到，代表新用户
    
    if not user:
        # 3. 如果是新用户，创建账号
        new_user = User(phone=request.phone)
        # db.add(new_user)
        # db.commit()
        print(f"==> [Database] 创建新用户: {request.phone}")
        user_id = 1 # 模拟ID
        is_new = True
    else:
        user_id = user.id
        is_new = False
        
    # 4. 生成登录 Token (JWT)
    # access_token = create_access_token(subject=user.id)
    access_token = f"mock-jwt-token-for-{request.phone}"
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user_id,
        "nickname": f"用户{str(request.phone)[-4:]}", # 默认昵称
        "is_new_user": is_new
    }
