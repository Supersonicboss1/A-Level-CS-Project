


from ninja import Schema


class UserInfoSchema(Schema):
    id: int
    name: str
    email: str
    dob: str
    token: str
