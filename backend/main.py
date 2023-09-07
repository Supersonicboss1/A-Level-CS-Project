"""Main REST API"""
import auth
from classtypes import LoginData, SignupData, UserInfoResponse
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ! user authentication
@app.post("/api/auth/register", status_code=201)
def register(data: SignupData, response: Response) -> bool | tuple[bool, int]:
    # check both email and password are not empty
    if data.email == "" or data.password == "":
        response.status_code = 400
        return False
    elif len(data.password) < 8:
        return False
    # check if email is already taken
    for user in auth.users:
        if user == data.email:
            response.status_code = 400
            return False
    # register user
    auth.User(
        email=data.email,
        password=data.password,
        firstName=data.firstName,
        lastName=data.lastName,
        dob=data.dob,
    )
    token = auth.login(data.email, data.password)
    print(auth.users)
    return token


@app.post("/api/auth/login")
def login(data: LoginData, response: Response) -> bool:
    login_val = auth.login(data.email, data.password)
    response.status_code = login_val[1]
    return login_val[0]


@app.get("/api/auth/info", response_model=UserInfoResponse)
def get_user_info(email: str, response: Response) -> dict[str, str | bool]:
    print(email)
    info = auth.get_user_info(email)
    if info:
        return info
    response.status_code = 403
    return {
        "email": "",
        "user_id": "",
        "logged_in": False,
    }


@app.get("/api/auth/dev/clear")
def clear_users() -> bool:
    auth.users.clear()
    return True