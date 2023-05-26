"""Main REST API"""
import json
import os
import subprocess

import auth
from classtypes import LoginData, UserInfoResponse
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

datav = []  # temp data storage - database soon™️


@app.get("/api")
def read_root() -> list:
    """Root api endpoint

    Returns:
        list: list of data that has been added to it with the endpoint /api/add
    """
    return datav


@app.get("/api/add", status_code=201)
def add_new_data(data: str) -> bool:
    """add a specified string to datav

    Args:
        data (str): the data to be added

    Returns:
        bool: whether the data was added successfully (only returns True)
    """
    datav.append(data)
    print(datav)
    return True


@app.get("/api/clear")
def clear_data() -> bool:
    """Clears the data in datav

    Returns:
        bool: whether the data was cleared successfully (only returns True)
    """
    datav.clear()
    return True


@app.get("/api/pop")
def pop_data() -> bool:
    """remove the last element from datav

    Returns:
        bool: whether the data was popped successfully (only returns True)"""
    datav.pop()
    return True


#! user authentication
@app.post("/api/auth/register", status_code=201)
def register(data: LoginData, response: Response) -> bool:
    """register a new user with the given username and password
    and add them to the database

    Args:
        data (LoginData): a dict with the username and password

    Returns:
        bool: Whether the user was registered successfully
    """
    # check both username and password are not empty
    if data.username == "" or data.password == "":
        response.status_code = 400
        return False
    # check if username is already taken
    for user in auth.users:
        if user == data.username:
            response.status_code = 400
            return False
    # register user
    auth.User(data.username, data.password)
    token = auth.login(data.username, data.password)
    return token


@app.post("/api/auth/login")
def login(data: LoginData) -> bool:
    """Logs in a user with the given username and password

    Args:
        data (LoginData): username and password

    Returns:
        bool: whether the user was logged in successfully
    """
    return auth.login(data.username, data.password)


@app.get("/api/auth/info", response_model=UserInfoResponse)
def get_user_info(username: str, response: Response) -> dict[str, str | bool]:
    """Get the info for a user given they are logged in

    Args:
        username (str): the username of the user

    Returns:
        dict[str, str | bool]: a dict with the username, user_id, and
        whether the user is logged in
    """
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
    """Clears the users database

    Returns:
        bool: whether the users database was cleared successfully (only returns True)
    """
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
