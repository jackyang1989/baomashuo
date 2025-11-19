from backend.app.db.base_class import Base
from backend.app.db.session import engine
from backend.app.models.baby import Baby
# 必须导入所有定义好的 Model，否则无法自动创建表
from backend.app.models.user import User 

def init_db():
    print("正在创建数据库表...")
    # 这行代码会检查数据库，如果表不存在，就根据 Model 自动创建
    Base.metadata.create_all(bind=engine)
    print("数据库表创建成功！")

if __name__ == "__main__":
    init_db()
