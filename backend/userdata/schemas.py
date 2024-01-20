from ninja import Schema


class UserInfoSchema(Schema):
    id: int
    firstName: str
    lastName: str
    email: str
    dob: str
    token: str


class AdminInfoSchema(Schema):
    id: int
    firstName: str
    lastName: str
    email: str
    token: str
