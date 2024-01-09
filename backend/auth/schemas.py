from ninja import Schema


class BaseRegistrationSchema(Schema):
    email: str
    password: str
    firstName: str
    lastName: str


class UserRegistrationSchema(BaseRegistrationSchema):
    dob: str


class AdminRegistrationSchema(BaseRegistrationSchema):
    admin_key: str


class CreateUserReturnSchema(Schema):
    token: str
    id: int