from typing import List, Literal

from fastapi import APIRouter, HTTPException
from main.db import engine
from main.schemas import Admin, AdminRead, User, UserRead
from sqlmodel import Session

router = APIRouter()

@router.get("/users/{user_id}", response_model=UserRead)
def get_user_info(user_id: int, requester_user_id: int, token: str):
    with Session(engine) as session:
        user = session.get(User, user_id)
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        if user_id == requester_user_id and token == user.token:
            return user
        # check if user is admin
        admin = session.get(Admin, requester_user_id)
        if admin is None or admin.token != token:
            raise HTTPException(status_code=403, detail="Forbidden")

@router.get(
    "/admins/{user_id}", response_model=AdminRead
)
def get_admin_user_info(user_id: int, token: str):
    with Session(engine) as session:
        admin = session.get(Admin, user_id)
        if admin is None:
            raise HTTPException(status_code=404, detail="Admin not found")
        if admin.token != token:
            raise HTTPException(status_code=403, detail="Forbidden")
        return admin


@router.delete("/users/{user_id}", response_model=bool)
def delete_user_account(user_id: int, requester_user_id: int, token: str) -> Literal[True]:
    with Session(engine) as session:
        user = session.get(User, user_id)
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        if user_id == requester_user_id and token == user.token:
            session.delete(user)
            session.commit()
            return True
        # check if user is admin
        admin = session.get(Admin, requester_user_id)
        if admin is None or admin.token != token:
            raise HTTPException(status_code=403, detail="Forbidden")
        session.delete(user)
        session.commit()
        return True


@router.put("/users/{user_id}")
def edit_user_account(user_id: int, requester_user_id: int,
                      token: str, new_info: User) -> Literal[True]:
    with Session(engine) as session:
        user = session.get(User, user_id)
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        if user_id == requester_user_id and token == user.token:
            user.firstName = new_info.firstName
            user.lastName = new_info.lastName
            user.dob = new_info.dob
            session.commit() # TODO: check if this works
            return True
        # check if user is admin
        admin = session.get(Admin, requester_user_id)
        if admin is None or admin.token != token:
            raise HTTPException(status_code=403, detail="Forbidden")
        user.firstName = new_info.firstName
        user.lastName = new_info.lastName
        user.dob = new_info.dob
        session.commit()  # TODO: check if this works
        return True


@router.get("/all", response_model=List[UserRead])
def get_all_users(requester_user_id: int, token: str):
    with Session(engine) as session:
        admin = session.get(Admin, requester_user_id)
        if admin is None or admin.token != token:
            raise HTTPException(status_code=403, detail="Forbidden")
        users = session.scalars(User).all()
        return users # TODO: check if this works