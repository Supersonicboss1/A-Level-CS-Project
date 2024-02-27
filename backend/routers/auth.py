"""File mainly responsible for handling user and admin authentication
- login and registration."""
from uuid import uuid4

import bcrypt
from fastapi import APIRouter, HTTPException
from main.db import engine
from main.schemas import (Admin, AdminCreate, AdminLogin, AdminRead, User,
                          UserCreate, UserLogin, UserRead)
from sqlmodel import Session

# admin_key = str(uuid4()) # https://i.kym-cdn.com/entries/icons/original/000/041/237/cover2.jpg
admin_key = "123"  # security is my passion
print(f"Admin key: {admin_key}")
router = APIRouter()

def hash_password(password: str) -> str:
    """Hash a password for storing."""
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt)
    print(f"Hashed password: {hashed_password}")
    return hashed_password.decode("utf-8")

@router.post("/user/register", response_model=UserRead)
def create_user_account(data: UserCreate):
    with Session(engine) as session:
        existing_user = session.get(User, data.email)
        if existing_user is not None:
            print(f"User with email {data.email} already exists")
            raise HTTPException(
                status_code=409, detail="A user with that email already exists"
            )
        user = User(
            firstName=data.firstName,
            lastName=data.lastName,
            email=data.email,
            dob=data.dob,
            password=hash_password(data.password),
            token=str(uuid4()),
        )
        session.add(user)
        session.commit()
        session.refresh(user)
        return user


@router.post("/admin/register", response_model=AdminRead)
def create_admin_account(data: AdminCreate):
    if data.admin_key != admin_key:
        print(f"Invalid admin key: {data.admin_key}")
        raise HTTPException(status_code=403, detail="Invalid admin key")
    with Session(engine) as session:
        existing_admin = session.get(Admin, data.email)
        if existing_admin is not None:
            print(f"Admin with email {data.email} already exists")
            raise HTTPException(
                status_code=409, detail="An admin with that email already exists"
            )

        admin = Admin(
            firstName=data.firstName,
            lastName=data.lastName,
            email=data.email,
            password=hash_password(data.password),
            token=str(uuid4()),
        )
        session.add(admin)
        session.commit()
        session.refresh(admin)
        return admin

@router.post("/user/login", response_model=UserRead)
def login_user_account(data: UserLogin):
    with Session(engine) as session:
        user = session.get(User, data.email)
        if not user:
            print(f"User with email {data.email} does not exist")
            raise HTTPException(status_code=403, detail="Invalid email or password")
        if not bcrypt.checkpw(
            data.password.encode("utf-8"), user.password.encode("utf-8")
        ):
            print(f"Invalid password for user with email {data.email}")
            raise HTTPException(status_code=403, detail="Invalid email or password")
        session.commit()
        return user

@router.post("/admin/login", response_model=AdminRead)
def login_admin_account(data: AdminLogin):
    with Session(engine) as session:
        admin = session.get(Admin, data.email)
        if not admin:
            print(f"Admin with email {data.email} does not exist")
            raise HTTPException(status_code=403, detail="Invalid email or password")
        if not bcrypt.checkpw(
            data.password.encode("utf-8"), admin.password.encode("utf-8")
        ):
            print(f"Invalid password for admin with email {data.email}")
            raise HTTPException(status_code=403, detail="Invalid email or password")
        session.commit()
        return admin