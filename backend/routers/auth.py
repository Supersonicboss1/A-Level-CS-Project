"""File mainly responsible for handling user and admin authentication
- login and registration."""

import smtplib
import ssl
import time
from email.message import EmailMessage
from typing import Literal
from uuid import uuid4

import bcrypt
from fastapi import APIRouter, HTTPException
from main.db import engine
from main.schemas.admin import (
    Admin,
    AdminCreate,
    AdminLogin,
    AdminRead,
)
from main.schemas.user import (
    User,
    UserCreate,
    UserLogin,
    UserRead,
)
from main.sensitive_info import email_user
from sqlmodel import Session, select


def send_email(to_addr, subject, body):
    smtpserver = "smtp.gmail.com"
    port = 465
    em = EmailMessage()
    em["From"] = "Cineverse Support"
    em["To"] = to_addr
    em["Subject"] = subject
    em.set_content(body)
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtpserver, port, context=context) as server:
        server.login(email_user["username"], email_user["password"])
        server.sendmail(email_user["username"], to_addr, em.as_string())


# admin_key = str(uuid4()) # https://i.kym-cdn.com/entries/icons/original/000/041/237/cover2.jpg
admin_key = "d2a0c3ad-210d-4e21-aa54-398520b53f57"
print(f"Admin key: {admin_key}")
router = APIRouter()
active_tokens = {
    # EXAMPLE
    # tokenValue: {
    # email: "example@example.com"
    # expiry: 1234567890 // Unix timestamp
    # }
}


def hash_password(password: str) -> str:
    """Hash a password for storing."""
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt)
    print(f"Hashed password: {hashed_password}")
    return hashed_password.decode("utf-8")


@router.post("/user/register", response_model=UserRead)
def create_user_account(data: UserCreate):
    with Session(engine) as session:
        existing_user = session.scalar(select(User).where(User.email == data.email))
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
        existing_admin = session.scalar(select(Admin).where(Admin.email == data.email))
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
    print(data)
    with Session(engine) as session:
        user = session.scalar(select(User).where(User.email == data.email))
        print(user)
        if not user:
            print(f"User with email {data.email} does not exist")
            raise HTTPException(status_code=403, detail="Invalid email or password")
        if not bcrypt.checkpw(
            data.password.encode("utf-8"), user.password.encode("utf-8")
        ):
            print(f"Invalid password for user with email {data.email}")
            raise HTTPException(status_code=403, detail="Invalid email or password")
        return user


@router.post("/admin/login", response_model=AdminRead)
def login_admin_account(data: AdminLogin):
    with Session(engine) as session:
        admin = session.scalar(select(Admin).where(Admin.email == data.email))
        if not admin:
            print(f"Admin with email {data.email} does not exist")
            raise HTTPException(status_code=403, detail="Invalid email or password")
        if not bcrypt.checkpw(
            data.password.encode("utf-8"), admin.password.encode("utf-8")
        ):
            print(f"Invalid password for admin with email {data.email}")
            raise HTTPException(status_code=403, detail="Invalid email or password")

        return admin


@router.get("/user/reset/email", response_model=Literal[True])
def send_reset_email(email: str):
    with Session(engine) as session:
        user = session.scalar(select(User).where(User.email == email))
        if not user:
            print(f"User with email {email} does not exist")
            raise HTTPException(status_code=403, detail="Invalid email")
        reset_token = str(uuid4())
        active_tokens[reset_token] = {
            "email": email,
            "expiry": int(time.time()) + 1800,  # 30 minutes
        }
        send_email(
            email, "Password reset", f"Your password reset token is: {reset_token}"
        )
        return True


# ffic uend xfad rwzy -> Google app password
@router.patch("/user/reset/set", response_model=Literal[True])
def set_new_password(reset_token: str, new_password: str):
    if reset_token not in active_tokens:
        print(f"Invalid token: {reset_token}")
        raise HTTPException(status_code=403, detail="Invalid token")
    token_data = active_tokens[reset_token]
    if token_data["expiry"] < int(time.time()):
        print(f"Expired token: {reset_token}")
        raise HTTPException(status_code=403, detail="Expired token")
    with Session(engine) as session:
        user = session.scalar(select(User).where(User.email == token_data["email"]))
        if not user:
            print(
                f"User with email {token_data['email']} does not exist"
            )  # this should never happen
            raise HTTPException(status_code=403, detail="Invalid email")
        user.password = hash_password(new_password)
        session.commit()
        return True
