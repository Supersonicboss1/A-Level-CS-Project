from pydantic import BaseModel


class UserInfoResponse(BaseModel):
    """Class to provide types for the response of the /api/auth/info endpoint"""

    email: str
    user_id: str
    logged_in: bool


class LoginData(BaseModel):
    """Class to provide types for logging in and registering an account"""

    email: str
    password: str

class SignupData(BaseModel):
    email: str
    password: str
    firstName: str
    lastName: str
    dob: str # unix timestamp for DoB