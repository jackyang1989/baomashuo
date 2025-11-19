from typing import Any
from sqlalchemy.ext.declarative import as_declarative, declared_attr

@as_declarative()
class Base:
    id: Any
    __name__: str

    # 自动将类名转换为表名 (例如 User 类 -> users 表)
    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower()
