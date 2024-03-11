from typing import Optional

from sqlmodel import Field, SQLModel


class AdminBase(SQLModel):
    firstName: str
    lastName: str
    email: str

class Admin(AdminBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    password: str
    token: str

class AdminRead(AdminBase):
    id: int
    token: str

class AdminCreate(AdminBase):
    password: str
    admin_key: str

class AdminLogin(SQLModel):
    email: str
    password: str