from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# 使用 SQLite 数据库（会自动在根目录生成一个 sql_app.db 文件）
# 这种方式最简单，不需要你安装 MySQL 软件
SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"

# 创建数据库引擎
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    # SQLite 需要这个特殊参数，其他数据库不需要
    connect_args={"check_same_thread": False} 
)

# 创建会话工厂（用于后续生成数据库会话）
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
