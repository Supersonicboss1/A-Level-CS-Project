"""Main REST API"""
from typing import Union

import auth
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

datav = []


class Data(BaseModel):
    username: str
    password: str


@app.get("/api")
def read_root():
    return datav


@app.get("/api/add", status_code=201)
def add_new_data(data):
    """adds data in request to datav"""
    datav.append(data)
    print(datav)
    return True


@app.get("/api/clear")
def clear_data():
    """clears datav"""
    datav.clear()
    return True


@app.get("/api/pop")
def pop_data():
    """pops last element from datav"""
    datav.pop()
    return True


# user authentication
@app.post("/api/auth/register", status_code=201)
def register(data: Data, response: Response) -> Union[str, bool]:
    """registers a user with the given username and password"""
    # check both username and password are not empty
    if data.username == "" or data.password == "":
        response.status_code = 400
        return "Username or password cannot be empty"
    # check if username is already taken
    for user in auth.users:
        if user == data.username:
            response.status_code = 400
            return "Username already taken"
    # register user
    auth.User(data.username, data.password)
    token = auth.login(
        data.username, data.password
    )  # maybe have this return a cookie instead of a bool
    return token


@app.post("/api/auth/login")
def login(data: Data) -> Union[str, bool]:
    """logs in a user with the given username and password"""
    return auth.login(
        data.username, data.password
    )  # maybe have this return a cookie instead of a bool


# i don't know how to handle a 'session'. so for now, handle it on the frontend,
# and they can communicate with the backend to check if they're logged in or not using a cookie or something


@app.get("/api/auth/info")
def get_user_info(token: str, response: Response) -> Union[dict, bool]:
    """gets the user info for the given username"""
    # search for user with the given username,
    # remove first and last character from token because of quotes
    token = token[1:-1]
    print(token)
    info = auth.get_user_info(token)
    if info:
        return info
    response.status_code = 403
    return False

@app.get("/api/auth/dev/clear")
def clear_users():
    """clears all users - for development purposes only"""
    auth.users.clear()
    return True

