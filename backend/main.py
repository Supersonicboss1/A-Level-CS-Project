"""Main REST API"""
import json
import os
import subprocess
from typing import Union

import auth
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel  # @pylint: disable=no-name-in-module

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

datav = []  # temp data storage - database soon™️


class LoginData(BaseModel):
    """Class to provide types for logging in and registering an account"""

    username: str
    password: str


@app.get("/api")
def read_root() -> list:
    """Root api endpoint

    Returns:
        list: list of data that has been added to it with the endpoint /api/add
    """
    return datav


@app.get("/api/add", status_code=201)
def add_new_data(data: str) -> bool:
    """adds data in request to datav"""
    datav.append(data)
    print(datav)
    return True


@app.get("/api/clear")
def clear_data() -> bool:
    """clears datav"""
    datav.clear()
    return True


@app.get("/api/pop")
def pop_data() -> bool:
    """pops last element from datav"""
    datav.pop()
    return True


#! user authentication
@app.post("/api/auth/register", status_code=201)
def register(data: LoginData, response: Response) -> Union[str, bool]:
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
def login(data: LoginData) -> Union[str, bool]:
    """logs in a user with the given username and password"""
    return auth.login(
        data.username, data.password
    )  # maybe have this return a cookie instead of a bool

class UserInfoResponse(BaseModel):
    """Class to provide types for the response of the /api/auth/info endpoint"""
    username: str
    user_id: str
    logged_in: bool

@app.get("/api/auth/info", response_model=UserInfoResponse)
def get_user_info(username: str, response: Response) -> UserInfoResponse:
    """gets the user info for the given username"""
    # search for user with the given username,
    # remove first and last character from token because of quotes
    print(username)
    info = auth.get_user_info(username)
    if info:
        return info
    response.status_code = 403
    return {
        "username": "",
        "user_id": "",
        "logged_in": False,
    }


@app.get("/api/auth/dev/clear")
def clear_users() -> bool:
    """clears all users - for development purposes only"""
    auth.users.clear()
    return True


# on app launch, call FastAPI.openapi() to generate the OpenAPI schema
# and use it in a npx command to generate the TS types
def generate_types():
    """Generates TypeScript types from the OpenAPI schema"""
    print("Generating types...")
    with open("openapi.json", "w", encoding="utf-8") as f:
        json.dump(app.openapi(), f)
    # move to frontend folder

    os.chdir("../frontend")
    # generate types

    subprocess.run(
        [
            "pnpx",
            "openapi-typescript-codegen",
            "--input",
            "../backend/openapi.json",
            "--output",
            "src/lib/api",
        ],
        check=True,
    )
    # move back to backend folder
    os.chdir("../backend")
    os.remove("openapi.json")


generate_types()
