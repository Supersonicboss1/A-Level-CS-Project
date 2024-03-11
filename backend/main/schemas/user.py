from typing import Optional

from sqlmodel import Field, SQLModel


class UserBase(SQLModel):
    firstName: str
    lastName: str
    email: str
    dob: str

class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    password: str
    token: str

# Used when sending data to the client
class UserRead(UserBase):
    id: int
    token: str

# Used when receiving data from the client
class UserCreate(UserBase):
    password: str

class UserLogin(SQLModel):
    email: str
    password: str
