"""Handles safely storing and checking user passwords, and the User class"""
import random
from typing import Tuple, Union

import bcrypt


def get_hashed_password(plain_text_password: str):
    return bcrypt.hashpw(plain_text_password.encode("utf-8"), bcrypt.gensalt())


def get_user_info(email: str) -> dict[str, str | bool]:
    print(email)
    for user in users:
        if email == user.email:
            print(user)
            return {
                "email": user.email,
                "user_id": user.user_id,
                "logged_in": user.logged_in,
            }
    return {
        "email": "",
        "user_id": "",
        "logged_in": False,
    }


def login(email: str, password: str,) -> Tuple[bool, int]:
    """logs in a user with the given email and password"""
    for user in users:
        if user == email:
            if user.check_password(password):
                user.logged_in = True
                print(user.logged_in)
                return True, 200
                # generate a session token - disabled for now
                # token = "".join(
                #     random.choices(string.ascii_letters + string.digits, k=16)
                # )
                # user.session_tokens.append(token)
                # print(user.session_tokens)
                # return token
            return False, 403
    return False, 404


users = []


class User:
    """Class which represents a basic user."""

    def __init__(self, firstName: str, password: str,
                 lastName: str, dob: str, email: str):
        self.user_id = self.generate_random_id()
        self.email = email
        self.firstName = firstName
        self.lastName = lastName
        self.password_hash = get_hashed_password(password)
        self.logged_in = False
        self.DateofBirth = int(dob)
        self.session_tokens = []
        users.append(self)

    def __eq__(self, other: Union[str, "User"]) -> bool:
        if isinstance(other, str):
            return self.email == other
        if isinstance(other, User):
            return self.email == other.email
        raise NotImplementedError

    def __repr__(self):
        return (
            f"User(email: {self.email}, password (hashed): {self.password_hash})"
        )

    def check_password(self, password: str) -> bool:
        return bcrypt.checkpw(password.encode("utf-8"), self.password_hash)

    @staticmethod
    def generate_random_id() -> int:
        id_str = ""
        for _ in range(8):
            id_str += str(random.randint(0, 9))
        return int(id_str)


User("test", "test", "test", "200200200200", "jogndoe@gmail.com")
