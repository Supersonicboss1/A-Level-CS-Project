import sqlite3
from uuid import uuid4

import bcrypt
from ninja import Router

from userdata.schemas import AdminInfoSchema, UserInfoSchema

from .schemas import (
    AdminRegistrationSchema,
    CreateUserReturnSchema,
    LoginSchema,
    UserRegistrationSchema,
)


def hash_password(password: str) -> str:
    """Hash a password for storing."""
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed_password.decode("utf-8")


admin_key = str(uuid4())
print(f"Admin key: {admin_key}")
router = Router()
conn = sqlite3.connect("backend/db/accounts.sqlite", check_same_thread=False)


@router.post("/user/register", response={200: CreateUserReturnSchema, 409: str})
def create_user_account(request, data: UserRegistrationSchema):
    cursor = conn.cursor()
    print(data)
    # check if email already exists
    cursor.execute("SELECT * FROM user WHERE email=?", (data.email,))
    if cursor.fetchone():
        return 409, "A user with that email already exists"
    # insert new user into database
    token = str(uuid4())
    cursor.execute(
        "INSERT INTO user (firstName, lastName, email, dob, password, token) VALUES (?, ?, ?, ?, ?, ?)",
        (
            data.firstName,
            data.lastName,
            data.email,
            data.dob,
            hash_password(data.password),
            token,
        ),
    )
    conn.commit()
    return 200, {"token": token, "id": cursor.lastrowid}


@router.post(
    "/admin/register", response={200: CreateUserReturnSchema, 403: str, 409: str}
)
def create_admin_account(request, data: AdminRegistrationSchema):
    cursor = conn.cursor()
    # check if email already exists
    cursor.execute("SELECT * FROM admin WHERE email=?", (data.email,))
    if cursor.fetchone():
        return 409, "A user with that email already exists"
    # check if admin key is correct
    print(data.admin_key, admin_key)
    if data.admin_key != admin_key:
        return 403, "Invalid admin key"
    # insert new user into database
    token = str(uuid4())
    cursor.execute(
        "INSERT INTO admin (firstName, lastName, email, password, token) VALUES (?, ?, ?, ?, ?)",
        (
            data.firstName,
            data.lastName,
            data.email,
            hash_password(data.password),
            token,
        ),
    )
    conn.commit()
    return 200, {
        "token": token,
        "id": cursor.lastrowid,
    }


@router.post("/user/login", response={200: UserInfoSchema, 403: str})
def login_user_account(request, data: LoginSchema):
    cursor = conn.cursor()
    # check if email already exists
    cursor.execute("SELECT * FROM user WHERE email=?", (data.email,))
    user = cursor.fetchone()
    print(data.password.encode("utf-8"), user[5].encode("utf-8"))
    if not user or not bcrypt.checkpw(data.password.encode("utf-8"), user[5].encode("utf-8")):
        return 403, "Invalid email or password"

    return 200, {
        "id": user[0],
        "firstName": user[1],
        "lastName": user[2],
        "email": user[3],
        "dob": user[4],
        "token": user[6],
    }


@router.post("/admin/login", response={200: AdminInfoSchema, 403: str})
def login_admin_account(request, data: LoginSchema):
    cursor = conn.cursor()
    # check if email already exists
    cursor.execute("SELECT * FROM admin WHERE email=?", (data.email,))
    user = cursor.fetchone()
    if not user or not bcrypt.checkpw(data.password.encode("utf-8"), user[5].encode("utf-8")): 
        return 403, "Invalid email or password"

    return 200, {
        "id": user[0],
        "firstName": user[1],
        "lastName": user[2],
        "email": user[3],
        "token": user[5],
    }
