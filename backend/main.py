from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.api.endpoints import auth
# from backend.app.db.base import Base
# from backend.app.db.session import engine

# 创建 FastAPI 应用实例
app = FastAPI(
    title="宝妈说 (MomTalk) API",
    description="为宝妈提供的一站式社区后端服务",
    version="1.0.0"
)

# 配置跨域 (CORS) - 允许前端访问
# 在开发阶段，允许所有来源 ("*")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册我们之前写的 auth (认证) 路由
# 前缀 /api/auth 对应 1.1.1 需求中的 API 设计
app.include_router(auth.router, prefix="/api/auth", tags=["认证模块"])

@app.get("/")
def root():
    return {"message": "欢迎访问宝妈说后端 API，服务已启动！"}

# 启动命令提示 (新手备注):
# 在终端运行: uvicorn backend.main:app --reload
