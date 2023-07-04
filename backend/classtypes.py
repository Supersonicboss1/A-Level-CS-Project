from pydantic import BaseModel


class UserInfoResponse(BaseModel):
    """Class to provide types for the response of the /api/auth/info endpoint"""

    username: str
    user_id: str
    logged_in: bool


class LoginData(BaseModel):
    """Class to provide types for logging in and registering an account"""

    username: str
    password: str

class SignupData(BaseModel):
    email: str
    password: str
    firstName: str
    lastName: str
    age: int