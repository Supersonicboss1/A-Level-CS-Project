from ninja import Schema


class BaseRegistrationSchema(Schema):
    email: str
    password: str


class UserRegistrationSchema(BaseRegistrationSchema):
    name: str
    dob: str


class AdminRegistrationSchema(BaseRegistrationSchema):
    admin_key: str


class CreateUserReturnSchema(Schema):
    token: str
    id: int
    