"""Main REST API"""
import json
import os
import subprocess

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

#! user authentication
@app.post("/api/auth/register", status_code=201)
def register(data: SignupData, response: Response) -> bool:
    # check both username and password are not empty
    if data.email == "" or data.password == "":
        response.status_code = 400
        return False
    elif len(data.password) < 8:
        return False
    # check if username is already taken
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
def login(data: LoginData) -> bool:
    return auth.login(data.username, data.password)


@app.get("/api/auth/info", response_model=UserInfoResponse)
def get_user_info(username: str, response: Response) -> dict[str, str | bool]:
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
    subprocess.run("git apply apipatch.patch -v", shell=True, check=True)
    # move back to backend folder
    os.chdir("../backend")
    os.remove("openapi.json")
    print("Types generated!")


generate_types()
