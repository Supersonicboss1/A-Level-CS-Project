import sqlite3
from ninja import Router

from .schemas import AdminRegistrationSchema, CreateUserReturnSchema, UserRegistrationSchema
from uuid import uuid4

import bcrypt

def hash_password(password: str) -> str:
    """Hash a password for storing."""
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt)
    return str(hashed_password)

admin_key = uuid4()
print(f'Admin key: {admin_key}')
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
        (data.firstName, data.lastName, data.email, data.dob, hash_password(data.password), token),
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
    if data.admin_key != "LEONARD5":
        return 403, "Invalid admin key"
    # insert new user into database
    token = str(uuid4())
    cursor.execute(
        "INSERT INTO admin (firstName, lastName, email, password, token) VALUES (?, ?, ?, ?, ?)",
        (data.firstName, data.lastName, data.email, hash_password(data.password), token),
    )
    conn.commit()
    return 200, {
        "token": token,
        "id": cursor.lastrowid,
    }