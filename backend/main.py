"""Main REST API"""
from typing import Union

from pydantic import BaseModel

import auth
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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


@app.get("/api/add")
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
@app.post("/api/auth/register")
def register(data: Data) -> bool:
    """registers a user with the given username and password"""
    auth.User(data.username, data.password)
    return True


@app.post("/api/auth/login")
def login(data: Data) -> Union[dict, bool]:
    """logs in a user with the given username and password"""
    user = auth.login(data.username, data.password) # maybe have this return a cookie instead of a bool
    if user:
        return user.get_user_info()
    return False
# i don't know how to handle a 'session'. so for now, handle it on the frontend, 
# and they can communicate with the backend to check if they're logged in or not using a cookie or something

@app.get("/api/auth/info")
def get_user_info(username: str) -> Union[dict, bool]:
    """gets the user info for the given username"""
    # search for user with the given username
    for user in auth.users:
        if user == username and user.logged_in:
            return user.get_user_info()
    return False
